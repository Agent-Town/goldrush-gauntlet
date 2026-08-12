#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createWriteStream } from 'node:fs';
import { rename, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';

const RUN = Number(process.argv.find((arg) => arg.startsWith('--run='))?.slice(6) ?? 1);
const MAX_ORDERS = 32;
const RIG_TICK_MS = 1000 / 30;
const HOLD = { x: 0, z: 12 };
const STOP = { x: 0, z: 11 };
const SLUICES = [{ x: -10, z: 7 }, { x: -6, z: 7 }, { x: -2, z: 7 }];
const TURRETS = [{ x: -6, z: 12 }, { x: -2, z: 12 }, { x: 2, z: 12 }, { x: 6, z: 12 }];
const BEACONS = [{ x: 0, z: 15 }, { x: -6, z: 14 }, { x: -4, z: 15 }, { x: 2, z: 15 }, { x: 3, z: 14 }, { x: 3, z: 16 }];
const PALISADES = [STOP, { x: -10, z: 11 }, { x: 10, z: 11 }];
const STOCKPILES = [{ x: -10, z: 14 }, { x: 10, z: 14 }];
const COSTS = { sentry_beacon: [25, 35, 45, 55, 75, 95], sluice: 40, turret: [50, 70, 95, 125], stockpile: 60, palisade: 10 };
const TIER_COSTS = { sluice: [0, 120, 240], turret: [0, 150, 300] };

const buildStep = (id, index, positions) => ({ type: 'build', id, index, pos: positions[index], cost: Array.isArray(COSTS[id]) ? COSTS[id][index] : COSTS[id] });
const upgradeStep = (id, index, fromTier) => ({ type: 'upgrade', id, index, fromTier, cost: TIER_COSTS[id][fromTier] });
const PLAN = [
  buildStep('sluice', 0, SLUICES), buildStep('sentry_beacon', 0, BEACONS),
  buildStep('sluice', 1, SLUICES), buildStep('sluice', 2, SLUICES),
  ...TURRETS.map((_, index) => buildStep('turret', index, TURRETS)),
  buildStep('stockpile', 0, STOCKPILES),
  ...SLUICES.flatMap((_, index) => [upgradeStep('sluice', index, 1), upgradeStep('sluice', index, 2)]),
  buildStep('sentry_beacon', 1, BEACONS), buildStep('sentry_beacon', 2, BEACONS),
  ...TURRETS.map((_, index) => upgradeStep('turret', index, 1)),
  ...TURRETS.map((_, index) => upgradeStep('turret', index, 2)),
  ...BEACONS.slice(3).map((_, offset) => buildStep('sentry_beacon', offset + 3, BEACONS)),
  buildStep('stockpile', 1, STOCKPILES),
];

function pickUpgrade(view) {
  const hpRatio = view.now.hero.hp / Math.max(1, view.now.hero.maxHp);
  const scores = {
    split_spark: 130, heavy_spark: 124, double_tap_coil: 121, long_resonator: 116,
    powder_charge: 113, quick_fuse: 111, beacon_dynamo: 109, chain_spark_arc: 106,
    beacon_handoff: 104, tinkers_plating: view.now.wave >= 16 || hpRatio < 0.72 ? 145 : 101,
    sharpen: 100, wide_ring: 94, spark_pressure_ring: 92,
    field_dressing: view.now.wave >= 18 || hpRatio < 0.72 ? 142 : 60,
    prospectors_luck: 52, rich_seam_pact: 48, stockpile_seam_survey: 45,
    pan_legend: 40, assay_bonus: 38, spring_heels: 20, prospector_policy_slot: 5,
  };
  return [...view.now.pendingOffer].sort((a, b) => (scores[b.id] ?? 50) - (scores[a.id] ?? 50))[0];
}

function atPosition(entry, step) {
  return entry.id === step.id
    && Math.abs(entry.position.x - step.pos.x) < 0.2
    && Math.abs(entry.position.z - step.pos.z) < 0.2;
}

function nextGoal(view) {
  const palisadeCount = view.now.works.byKind.palisade ?? 0;
  if (view.now.wave >= 19 && palisadeCount < PALISADES.length) {
    const pos = PALISADES[palisadeCount];
    return { cost: COSTS.palisade, pos, order: { verb: 'BUILD', what: 'palisade', where: pos, when: { goldGte: COSTS.palisade } } };
  }
  if (view.now.wave >= 19) return null;

  const entries = view.now.works.entries;
  const step = PLAN.find((candidate) => candidate.type === 'build'
    ? !entries.some((entry) => atPosition(entry, candidate))
    : entries.some((entry) => entry.id === candidate.id && entry.index === candidate.index && entry.tier === candidate.fromTier));
  if (!step) return null;
  if (step.type === 'build') {
    return { cost: step.cost, pos: step.pos, order: { verb: 'BUILD', what: step.id, where: step.pos, when: { goldGte: step.cost } } };
  }
  const entry = entries.find((candidate) => candidate.id === step.id && candidate.index === step.index);
  return entry && { cost: step.cost, pos: entry.position, order: { verb: 'CONTEXT_ACTION', action: 'upgrade', target: { id: step.id, index: step.index } } };
}

function moneyOrders(view) {
  if (view.now.gold >= 480) return [];
  const positions = new Map(view.stablePrefix.map.seams.map((seam) => [seam.id, seam]));
  const origin = view.now.prospector ?? HOLD;
  const seam = view.now.seams
    .filter(({ active, remaining }) => active && remaining > 0)
    .sort((a, b) => {
      const left = positions.get(a.id); const right = positions.get(b.id);
      return Math.hypot((left?.x ?? 999) - origin.x, (left?.z ?? 999) - origin.z)
        - Math.hypot((right?.x ?? 999) - origin.x, (right?.z ?? 999) - origin.z);
    })[0];
  return seam
    ? Array.from({ length: Math.min(12, Math.ceil(seam.remaining / 5) + 1) }, () => ({ verb: 'HARVEST', seam: seam.id }))
    : [];
}

function repairCost(entry) {
  if (entry.id === 'sluice') return Math.ceil((40 + (entry.tier >= 2 ? 120 : 0) + (entry.tier >= 3 ? 240 : 0)) * 0.25);
  if (entry.id === 'turret') return Math.ceil(((COSTS.turret[entry.index] ?? 50) + (entry.tier >= 2 ? 150 : 0) + (entry.tier >= 3 ? 300 : 0)) * 0.25);
  if (entry.id === 'sentry_beacon') return Math.ceil((COSTS.sentry_beacon[entry.index] ?? 25) * 0.25);
  return 15;
}

function blastPosition(view, boss) {
  if (boss) return STOP;
  return { north: { x: 0, z: 20 }, south: { x: 0, z: 4 }, east: { x: 8, z: 12 }, west: { x: -8, z: 12 } }[view.now.threats.edge] ?? { x: 0, z: 9 };
}

function appendBlastCycle(view, orders, boss = false) {
  if (view.now.threats.alive === 0) {
    orders.push({ verb: 'SET_WEAPON', weapon: 'rig' });
    return;
  }
  const waits = Math.min(Math.ceil(view.now.blastReadyInMs / RIG_TICK_MS), Math.max(0, MAX_ORDERS - orders.length - 2));
  for (let index = 0; index < waits; index += 1) orders.push({ verb: 'SET_WEAPON', weapon: 'rig' });
  const blast = { verb: 'BLAST_AT', pos: blastPosition(view, boss) };
  orders.push(blast);
  if (orders.length < MAX_ORDERS) orders.push(blast);
}

function policy(view) {
  if (view.now.pendingSecure) return [{ verb: 'SECURE_CHOICE', choice: 'bank' }];
  const orders = view.now.pendingOffer?.length ? [{ verb: 'PICK_UPGRADE', id: pickUpgrade(view).id }] : [];
  const entries = view.now.works.entries;

  if (view.now.wave >= 19) {
    const goal = nextGoal(view);
    if (goal) {
      if (view.now.gold >= goal.cost) orders.push({ verb: 'MOVE_TO', pos: goal.pos }, goal.order);
      else orders.push(...moneyOrders(view));
      appendBlastCycle(view, orders);
      return orders.slice(0, MAX_ORDERS);
    }
    const centerDamaged = entries.some(({ id, index, hp, maxHp, wrecked }) => id === 'palisade' && index === 0 && (wrecked || hp / maxHp < 0.31));
    if (centerDamaged) orders.push({ verb: 'REPAIR_UNDER', pct: 31 });
    appendBlastCycle(view, orders, true);
    if (!centerDamaged && orders.length < MAX_ORDERS) orders.push({ verb: 'HOLD', pos: HOLD });
    return orders.slice(0, MAX_ORDERS);
  }

  const wrecked = entries.find(({ id, wrecked: isWrecked }) => isWrecked && id !== 'palisade');
  if (wrecked) {
    if (view.now.gold >= repairCost(wrecked)) orders.push({ verb: 'REPAIR_UNDER', pct: 1 });
    else orders.push(...moneyOrders(view));
    appendBlastCycle(view, orders);
    return orders.slice(0, MAX_ORDERS);
  }

  const goal = nextGoal(view);
  if (goal && view.now.gold >= goal.cost) orders.push({ verb: 'MOVE_TO', pos: goal.pos }, goal.order);
  else orders.push(...moneyOrders(view));
  appendBlastCycle(view, orders);
  assert.ok(orders.length <= MAX_ORDERS);
  return orders;
}

function selfTest() {
  const view = { now: { wave: 10, hero: { hp: 100, maxHp: 100 }, pendingOffer: [{ id: 'spring_heels' }, { id: 'heavy_spark' }] } };
  assert.equal(pickUpgrade(view).id, 'heavy_spark');
  const orders = [];
  appendBlastCycle({ now: { blastReadyInMs: 0, threats: { alive: 1, edge: 'north' } } }, orders);
  assert.deepEqual(orders.map(({ verb }) => verb), ['BLAST_AT', 'BLAST_AT']);
  assert.deepEqual(policy({ now: { pendingSecure: true } }), [{ verb: 'SECURE_CHOICE', choice: 'bank' }]);
  console.log('player self-test: ok');
}

async function play() {
  assert.ok(Number.isInteger(RUN) && RUN >= 1 && RUN <= 6, '--run must be 1..6');
  const tape = `run-${RUN}-tape.json`;
  const transcript = createWriteStream(`run-${RUN}.jsonl`);
  const stderr = createWriteStream(`run-${RUN}.stderr.log`);
  const child = spawn(process.execPath, ['scripts/gr-sim.mjs', '--contract', 'e1-baron', '--seed', 'e1-baron-01', '--tape', tape], { stdio: ['pipe', 'pipe', 'pipe'] });
  child.stderr.pipe(stderr);

  let outcome;
  const reader = createInterface({ input: child.stdout, crlfDelay: Infinity });
  for await (const line of reader) {
    const message = JSON.parse(line);
    if (message.schema === 'goldrush.view.v1') {
      const orders = policy(message);
      transcript.write(`${JSON.stringify({ wave: message.now.wave, timeMs: message.now.timeMs, gold: message.now.gold, hero: message.now.hero, threats: message.now.threats, works: message.now.works, orders })}\n`);
      child.stdin.write(`${JSON.stringify(orders)}\n`);
    } else {
      outcome = { ...message, runsSoFar: RUN, player: 'player.mjs', tape };
      const temporary = new URL('outcome.json.tmp', import.meta.url);
      await writeFile(temporary, `${JSON.stringify(outcome, null, 2)}\n`);
      await rename(temporary, new URL('outcome.json', import.meta.url));
    }
  }

  const code = await new Promise((resolve) => child.once('close', resolve));
  transcript.end();
  stderr.end();
  if (code !== 0 || !outcome) throw new Error(`gr-sim exited ${code} without an outcome`);
  console.log(JSON.stringify(outcome));
}

if (process.argv.includes('--self-test')) selfTest();
else await play();
