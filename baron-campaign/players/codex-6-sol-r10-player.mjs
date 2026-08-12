#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createWriteStream } from 'node:fs';
import { rename, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';

const ROOT = new URL('.', import.meta.url);
const HOLD = { x: 0, z: 12 };
const SLUICES = [{ x: -10, z: 7 }, { x: -6, z: 7 }, { x: -2, z: 7 }];
const TURRETS = [{ x: -6, z: 12 }, { x: -2, z: 12 }, { x: 2, z: 12 }, { x: 6, z: 12 }];
const BEACONS = [{ x: 0, z: 15 }, { x: -6, z: 14 }, { x: -4, z: 15 }, { x: 2, z: 15 }, { x: 3, z: 14 }, { x: 3, z: 16 }];
const STOCKPILES = [{ x: -10, z: 14 }, { x: 10, z: 14 }];
const PALISADES = [{ x: 0, z: 11 }, { x: -10, z: 11 }, { x: 10, z: 11 }];
const COSTS = { sentry_beacon: [25, 35, 45, 55, 75, 95], sluice: 40, turret: [50, 70, 95, 125], stockpile: 60, palisade: 10 };

const build = (id, index, positions) => ({ type: 'build', id, index, pos: positions[index], cost: Array.isArray(COSTS[id]) ? COSTS[id][index] : COSTS[id] });
const upgrade = (id, index, tier, cost) => ({ type: 'upgrade', id, index, tier, cost });
const PLAN = [
  build('sluice', 0, SLUICES), build('sentry_beacon', 0, BEACONS),
  build('sluice', 1, SLUICES), build('sluice', 2, SLUICES),
  ...TURRETS.map((_, index) => build('turret', index, TURRETS)),
  build('stockpile', 0, STOCKPILES),
  ...SLUICES.flatMap((_, index) => [upgrade('sluice', index, 1, 120), upgrade('sluice', index, 2, 240)]),
  build('sentry_beacon', 1, BEACONS), build('sentry_beacon', 2, BEACONS),
  ...TURRETS.map((_, index) => upgrade('turret', index, 1, 150)),
  ...TURRETS.map((_, index) => upgrade('turret', index, 2, 300)),
  ...BEACONS.slice(3).map((_, index) => build('sentry_beacon', index + 3, BEACONS)),
  build('stockpile', 1, STOCKPILES),
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
  const palisades = view.now.works.byKind.palisade ?? 0;
  if (view.now.wave >= 19 && palisades < PALISADES.length) {
    const pos = PALISADES[palisades];
    return { cost: COSTS.palisade, pos, order: { verb: 'BUILD', what: 'palisade', where: pos, when: { goldGte: COSTS.palisade } } };
  }
  if (view.now.wave >= 19) return null;

  const entries = view.now.works.entries;
  const step = PLAN.find((candidate) => candidate.type === 'build'
    ? !entries.some((entry) => atPosition(entry, candidate))
    : entries.some((entry) => entry.id === candidate.id && entry.index === candidate.index && entry.tier === candidate.tier));
  if (!step) return null;
  if (step.type === 'build') {
    return { cost: step.cost, pos: step.pos, order: { verb: 'BUILD', what: step.id, where: step.pos, when: { goldGte: step.cost } } };
  }
  const entry = entries.find((candidate) => candidate.id === step.id && candidate.index === step.index);
  return entry && { cost: step.cost, pos: entry.position, order: { verb: 'CONTEXT_ACTION', action: 'upgrade', target: { id: step.id, index: step.index } } };
}

function blastTarget(view, boss) {
  if (boss) return { x: 0, z: 11 };
  if (view.now.threats.edge === 'north') return { x: 0, z: 20 };
  if (view.now.threats.edge === 'south') return { x: 0, z: 4 };
  if (view.now.threats.edge === 'east') return { x: 8, z: 12 };
  if (view.now.threats.edge === 'west') return { x: -8, z: 12 };
  return { x: 0, z: 9 };
}

function blastOrders(view, boss = false) {
  if (view.now.threats.alive === 0) return [{ verb: 'SET_WEAPON', weapon: 'rig' }];
  if (boss) return [
    { verb: 'SET_WEAPON', weapon: 'blast' },
    { verb: 'SET_WEAPON', weapon: 'rig' },
    { verb: 'BLAST_AT', pos: blastTarget(view, true) },
  ];
  const blast = { verb: 'BLAST_AT', pos: blastTarget(view, false) };
  return view.now.blastReadyInMs <= 80 ? [blast, blast] : [blast];
}

function harvestOrders(view) {
  if (view.now.gold >= 480) return [];
  const map = new Map(view.stablePrefix.map.seams.map((seam) => [seam.id, seam]));
  const prospector = view.now.prospector ?? HOLD;
  const seam = view.now.seams.filter(({ active, remaining }) => active && remaining > 0).sort((a, b) => {
    const left = map.get(a.id); const right = map.get(b.id);
    return Math.hypot((left?.x ?? 999) - prospector.x, (left?.z ?? 999) - prospector.z)
      - Math.hypot((right?.x ?? 999) - prospector.x, (right?.z ?? 999) - prospector.z);
  })[0];
  return seam ? Array.from({ length: Math.min(12, Math.ceil(seam.remaining / 5) + 1) }, () => ({ verb: 'HARVEST', seam: seam.id })) : [];
}

function repairCost(entry) {
  if (Number.isFinite(entry.repairCost)) return entry.repairCost;
  if (entry.id === 'palisade') return 3;
  const base = entry.id === 'turret' || entry.id === 'sentry_beacon'
    ? COSTS[entry.id][entry.index]
    : COSTS[entry.id];
  const upgrades = entry.id === 'sluice' ? [0, 120, 360][entry.tier - 1]
    : entry.id === 'turret' ? [0, 150, 450][entry.tier - 1] : 0;
  return Math.ceil((base + upgrades) * 0.25);
}

function ordersFor(view) {
  if (view.now.pendingSecure) return [{ verb: 'SECURE_CHOICE', choice: 'bank' }];
  const prefix = view.now.pendingOffer?.length ? [{ verb: 'PICK_UPGRADE', id: pickUpgrade(view).id }] : [];
  const entries = view.now.works.entries;

  if (view.now.wave >= 19) {
    const goal = nextGoal(view);
    if (goal) {
      if (view.now.gold >= goal.cost) return [...prefix, { verb: 'MOVE_TO', pos: goal.pos }, goal.order, ...blastOrders(view)].slice(0, 32);
      const harvest = harvestOrders(view);
      if (harvest.length) return [...prefix, ...harvest].slice(0, 32);
    }
    const center = entries.find((entry) => entry.id === 'palisade' && entry.index === 0);
    if (center && (center.wrecked || center.hp / center.maxHp < 0.31)) {
      if (view.now.gold >= repairCost(center)) return [...prefix, { verb: 'REPAIR_UNDER', pct: 31 }, ...blastOrders(view, true)].slice(0, 32);
      const harvest = harvestOrders(view);
      if (harvest.length) return [...prefix, ...harvest].slice(0, 32);
    }
    return [...prefix, ...blastOrders(view, true), { verb: 'HOLD', pos: HOLD }].slice(0, 32);
  }

  const wrecked = entries.find((entry) => entry.wrecked && entry.id !== 'palisade');
  if (wrecked) {
    if (view.now.gold >= repairCost(wrecked)) return [...prefix, { verb: 'REPAIR_UNDER', pct: 1 }, ...blastOrders(view)].slice(0, 32);
    const harvest = harvestOrders(view);
    if (harvest.length) return [...prefix, ...harvest].slice(0, 32);
  }

  const goal = nextGoal(view);
  if (goal && view.now.gold >= goal.cost) return [...prefix, { verb: 'MOVE_TO', pos: goal.pos }, goal.order, ...blastOrders(view)].slice(0, 32);
  const harvest = harvestOrders(view);
  if (harvest.length) return [...prefix, ...harvest].slice(0, 32);
  return [...prefix, ...blastOrders(view)].slice(0, 32);
}

function selfCheck() {
  const view = { now: { wave: 10, hero: { hp: 100, maxHp: 100 }, pendingOffer: [{ id: 'spring_heels' }, { id: 'heavy_spark' }] } };
  assert.equal(pickUpgrade(view).id, 'heavy_spark');
  assert.equal(blastOrders({ now: { blastReadyInMs: 800, threats: { alive: 1, edge: 'north' } } }).length, 1);
  assert.equal(blastOrders({ now: { blastReadyInMs: 800, threats: { alive: 1, edge: 'north' } } }, true)[0].weapon, 'blast');
  assert.equal(repairCost({ id: 'palisade', index: 0, tier: 1 }), 3);
  console.log('player self-check: ok');
}

if (process.argv.includes('--self-check')) {
  selfCheck();
  process.exit(0);
}

const run = Number(process.argv[2] ?? 1);
if (!Number.isInteger(run) || run < 1 || run > 6) throw new Error('run must be an integer from 1 to 6');

const transcript = createWriteStream(new URL(`run-${run}.jsonl`, ROOT));
const errors = createWriteStream(new URL(`run-${run}.stderr.log`, ROOT));
const tape = `run-${run}-tape.json`;
const child = spawn(process.execPath, ['scripts/gr-sim.mjs', '--contract', 'e1-baron', '--seed', 'e1-baron-01', '--tape', tape], {
  cwd: ROOT,
  stdio: ['pipe', 'pipe', 'pipe'],
});

let buffer = '';
let outcome;
child.stdout.on('data', (chunk) => {
  buffer += chunk;
  let newline;
  while ((newline = buffer.indexOf('\n')) >= 0) {
    const line = buffer.slice(0, newline);
    buffer = buffer.slice(newline + 1);
    if (!line) continue;
    const message = JSON.parse(line);
    if (message.schema === 'goldrush.view.v1') {
      const orders = ordersFor(message);
      transcript.write(`${JSON.stringify({ type: 'turn', wave: message.now.wave, timeMs: message.now.timeMs, gold: message.now.gold, hero: message.now.hero, threats: message.now.threats, works: message.now.works, orders })}\n`);
      child.stdin.write(`${JSON.stringify(orders)}\n`);
    } else {
      outcome = message;
      transcript.write(`${JSON.stringify({ type: 'outcome', outcome: message })}\n`);
    }
  }
});
child.stderr.pipe(errors);

child.on('close', async (code) => {
  transcript.end();
  errors.end();
  if (code !== 0 || !outcome) {
    console.error(`gr-sim exited ${code} without an outcome`);
    process.exitCode = 1;
    return;
  }
  const result = { ...outcome, runsSoFar: run, player: 'player.mjs', tape };
  const temporary = new URL('outcome.json.tmp', ROOT);
  await writeFile(temporary, `${JSON.stringify(result, null, 2)}\n`);
  await rename(temporary, new URL('outcome.json', ROOT));
  console.log(JSON.stringify(result));
});
