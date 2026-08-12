#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { createWriteStream, renameSync, writeFileSync } from 'node:fs';

const runNumber = Number.parseInt(process.argv[2] ?? '1', 10);
if (!Number.isInteger(runNumber) || runNumber < 1 || runNumber > 6) throw new Error('usage: node player.mjs <run 1..6>');
const tapePath = `run-${runNumber}-tape.json`;
const transcriptPath = `run-${runNumber}.jsonl`;
const stderrPath = `run-${runNumber}.stderr.log`;
const child = spawn(process.execPath, ['scripts/gr-sim.mjs', '--contract', 'e1-baron', '--seed', 'e1-baron-01', '--tape', tapePath], {
  stdio: ['pipe', 'pipe', 'pipe'],
});
const transcript = createWriteStream(transcriptPath, { flags: 'w' });
const errors = createWriteStream(stderrPath, { flags: 'w' });
child.stderr.pipe(errors);
let stdoutBuffer = '';
let outcome = null;

const SLUICES = [
  { id: 'sluice', pos: { x: -10, z: 7 }, cost: 40 },
  { id: 'sluice', pos: { x: -6, z: 7 }, cost: 40 },
  { id: 'sluice', pos: { x: -2, z: 7 }, cost: 40 },
];
const TURRETS = [
  { id: 'turret', pos: { x: -6, z: 12 }, cost: 50 },
  { id: 'turret', pos: { x: -2, z: 12 }, cost: 70 },
  { id: 'turret', pos: { x: 2, z: 12 }, cost: 95 },
  { id: 'turret', pos: { x: 6, z: 12 }, cost: 130 },
];
const BEACONS = [
  { id: 'sentry_beacon', pos: { x: 0, z: 15 }, cost: 25 },
  { id: 'sentry_beacon', pos: { x: -6, z: 14 }, cost: 35 },
  { id: 'sentry_beacon', pos: { x: -4, z: 15 }, cost: 45 },
  { id: 'sentry_beacon', pos: { x: 2, z: 15 }, cost: 55 },
  { id: 'sentry_beacon', pos: { x: 3, z: 14 }, cost: 75 },
  { id: 'sentry_beacon', pos: { x: 3, z: 16 }, cost: 95 },
];
const STOCKPILES = [
  { id: 'stockpile', pos: { x: -10, z: 14 }, cost: 60 },
  { id: 'stockpile', pos: { x: 10, z: 14 }, cost: 60 },
];
const PALISADES = [
  { id: 'palisade', pos: { x: 5, z: -12 }, rotationSteps: 1, cost: 10 },
  { id: 'palisade', pos: { x: -1, z: -12 }, rotationSteps: 1, cost: 10 },
  { id: 'palisade', pos: { x: 0, z: -9 }, rotationSteps: 1, cost: 10 },
];
const BUILD_STEP = (plan) => ({ type: 'build', plan });
const UPGRADE_STEP = (id, index, fromTier, cost) => ({ type: 'upgrade', id, index, fromTier, cost });
const PLAN = [
  BUILD_STEP(SLUICES[0]),
  BUILD_STEP(BEACONS[0]),
  BUILD_STEP(SLUICES[1]),
  BUILD_STEP(SLUICES[2]),
  ...TURRETS.map(BUILD_STEP),
  BUILD_STEP(STOCKPILES[0]),
  UPGRADE_STEP('sluice', 0, 1, 120),
  UPGRADE_STEP('sluice', 0, 2, 240),
  UPGRADE_STEP('sluice', 1, 1, 120),
  UPGRADE_STEP('sluice', 1, 2, 240),
  UPGRADE_STEP('sluice', 2, 1, 120),
  UPGRADE_STEP('sluice', 2, 2, 240),
  BUILD_STEP(BEACONS[1]),
  BUILD_STEP(BEACONS[2]),
  ...[0, 1, 2, 3].map((index) => UPGRADE_STEP('turret', index, 1, 150)),
  ...[0, 1, 2, 3].map((index) => UPGRADE_STEP('turret', index, 2, 300)),
  ...BEACONS.slice(3).map(BUILD_STEP),
  BUILD_STEP(STOCKPILES[1]),
];

function atPos(entry, plan) {
  return entry.id === plan.id && Math.abs(entry.position.x - plan.pos.x) < 0.2 && Math.abs(entry.position.z - plan.pos.z) < 0.2;
}
function buildOrders(plan) {
  return [
    { verb: 'MOVE_TO', pos: plan.pos },
    { verb: 'BUILD', what: plan.id, where: plan.pos, when: { goldGte: plan.cost }, ...(plan.rotationSteps === undefined ? {} : { rotationSteps: plan.rotationSteps }) },
  ];
}
function upgradeOrders(entry) {
  return [
    { verb: 'MOVE_TO', pos: entry.position },
    { verb: 'CONTEXT_ACTION', action: 'upgrade', target: { id: entry.id, index: entry.index } },
  ];
}
function pickUpgrade(view) {
  const hpRatio = view.now.hero.hp / Math.max(1, view.now.hero.maxHp);
  const scores = {
    split_spark: 130,
    heavy_spark: 124,
    double_tap_coil: 121,
    long_resonator: 116,
    powder_charge: 113,
    quick_fuse: 111,
    beacon_dynamo: 109,
    chain_spark_arc: 106,
    beacon_handoff: 104,
    tinkers_plating: view.now.wave >= 16 || hpRatio < 0.72 ? 145 : 101,
    sharpen: 100,
    wide_ring: 94,
    spark_pressure_ring: 92,
    field_dressing: view.now.wave >= 18 || hpRatio < 0.72 ? 142 : 60,
    prospectors_luck: 52,
    rich_seam_pact: 48,
    stockpile_seam_survey: 45,
    pan_legend: 40,
    assay_bonus: 38,
    spring_heels: 20,
    prospector_policy_slot: 5,
  };
  return [...view.now.pendingOffer].sort((a, b) => (scores[b.id] ?? 50) - (scores[a.id] ?? 50))[0].id;
}
function harvestOrders(view) {
  const seams = view.now.seams.filter((s) => s.active && s.remaining > 0);
  if (!seams.length || view.now.gold >= 480) return null;
  const map = new Map(view.stablePrefix.map.seams.map((s) => [s.id, s]));
  const p = view.now.prospector ?? { x: 0, z: 12 };
  seams.sort((a, b) => {
    const pa = map.get(a.id); const pb = map.get(b.id);
    const da = pa ? Math.hypot(pa.x - p.x, pa.z - p.z) : 999;
    const db = pb ? Math.hypot(pb.x - p.x, pb.z - p.z) : 999;
    return db === da ? b.remaining - a.remaining : da - db;
  });
  const seam = seams[0];
  const repeats = Math.min(12, Math.max(2, Math.ceil(seam.remaining / 5) + 1));
  return Array.from({ length: repeats }, () => ({ verb: 'HARVEST', seam: seam.id }));
}
function cycleOrders(view) {
  const boss = view.now.wave >= 19;
  if (boss) {
    // Continuous auto-Blast owns the add flood. The T3 turrets remain the boss engine.
    return [
      { verb: 'SET_WEAPON', weapon: 'blast' },
      { verb: 'HOLD', pos: view.now.prospector ?? { x: 0, z: 12 } },
    ];
  }
  const edge = view.now.threats.edge;
  const aim = edge === 'north' ? { x: 0, z: 20 }
    : edge === 'south' ? { x: 0, z: 4 }
      : edge === 'east' ? { x: 8, z: 12 }
        : edge === 'west' ? { x: -8, z: 12 }
          : { x: 0, z: 9 };
  const direct = { verb: 'BLAST_AT', pos: aim };
  return view.now.blastReadyInMs <= 80 ? [direct, direct] : [direct];
}
function repairCostEstimate(entry) {
  if (entry.id === 'sluice') return Math.ceil((40 + (entry.tier >= 2 ? 120 : 0) + (entry.tier >= 3 ? 240 : 0)) * 0.25);
  if (entry.id === 'turret') {
    const bases = [50, 70, 95, 130];
    return Math.ceil(((bases[entry.index] ?? 50) + (entry.tier >= 2 ? 150 : 0) + (entry.tier >= 3 ? 300 : 0)) * 0.25);
  }
  if (entry.id === 'sentry_beacon') return Math.ceil(([25, 35, 45, 55, 75, 95][entry.index] ?? 25) * 0.25);
  return 15;
}
function decide(view) {
  if (view.now.pendingSecure) return [{ verb: 'SECURE_CHOICE', choice: 'bank' }];
  const prefix = view.now.pendingOffer?.length ? [{ verb: 'PICK_UPGRADE', id: pickUpgrade(view) }] : [];
  const entries = view.now.works.entries;

  if (view.now.wave >= 19) {
    const missingPalisade = PALISADES.find((plan) => !entries.some((entry) => atPos(entry, plan)));
    if (missingPalisade) {
      if (view.now.gold >= missingPalisade.cost) return [...prefix, ...buildOrders(missingPalisade), ...cycleOrders(view)].slice(0, 32);
      const harvest = harvestOrders(view);
      if (harvest) return [...prefix, ...harvest].slice(0, 32);
    }
    // Do not let a generic repair order walk south through accumulated wrecks. The three cheap
    // panels are consumable shot-decoys; the Prospector kites behind the compact gun cluster.
    return [...prefix, ...cycleOrders(view)].slice(0, 32);
  }

  const wreckedCritical = entries.find((e) => e.wrecked && e.id !== 'palisade');
  if (wreckedCritical) {
    const cost = repairCostEstimate(wreckedCritical);
    if (view.now.gold >= cost) return [...prefix, { verb: 'REPAIR_UNDER', pct: 1 }, ...cycleOrders(view)].slice(0, 32);
    const harvest = harvestOrders(view);
    if (harvest) return [...prefix, ...harvest].slice(0, 32);
    return [...prefix, ...cycleOrders(view)].slice(0, 32);
  }

  const nextStep = PLAN.find((step) => {
    if (step.type === 'build') return !entries.some((entry) => atPos(entry, step.plan));
    const entry = entries.find((candidate) => candidate.id === step.id && candidate.index === step.index);
    return entry && entry.tier === step.fromTier;
  });
  if (nextStep?.type === 'build') {
    if (view.now.gold >= nextStep.plan.cost) return [...prefix, ...buildOrders(nextStep.plan), ...cycleOrders(view)].slice(0, 32);
    const harvest = harvestOrders(view);
    if (harvest) return [...prefix, ...harvest].slice(0, 32);
    return [...prefix, ...cycleOrders(view)].slice(0, 32);
  }
  if (nextStep?.type === 'upgrade') {
    const entry = entries.find((candidate) => candidate.id === nextStep.id && candidate.index === nextStep.index);
    if (entry && view.now.gold >= nextStep.cost) return [...prefix, ...upgradeOrders(entry), ...cycleOrders(view)].slice(0, 32);
    const harvest = harvestOrders(view);
    if (harvest) return [...prefix, ...harvest].slice(0, 32);
  }

  return [...prefix, ...cycleOrders(view)].slice(0, 32);
}

function atomicOutcome(value) {
  const tmp = 'outcome.json.tmp';
  writeFileSync(tmp, `${JSON.stringify({ ...value, runsSoFar: runNumber }, null, 2)}\n`);
  renameSync(tmp, 'outcome.json');
}
function handleLine(raw) {
  if (!raw.trim()) return;
  let value;
  try { value = JSON.parse(raw); } catch { throw new Error(`non-JSON simulator stdout: ${raw}`); }
  if (value.schema === 'goldrush.view.v1') {
    const orders = decide(value);
    transcript.write(`${JSON.stringify({ type: 'turn', view: value, orders })}\n`);
    child.stdin.write(`${JSON.stringify(orders)}\n`);
    return;
  }
  outcome = value;
  transcript.write(`${JSON.stringify({ type: 'outcome', outcome: value })}\n`);
  atomicOutcome(value);
}
child.stdout.on('data', (chunk) => {
  stdoutBuffer += chunk.toString();
  while (stdoutBuffer.includes('\n')) {
    const index = stdoutBuffer.indexOf('\n');
    const line = stdoutBuffer.slice(0, index);
    stdoutBuffer = stdoutBuffer.slice(index + 1);
    handleLine(line);
  }
});
child.on('error', (error) => { console.error(error); process.exitCode = 1; });
child.on('close', (code) => {
  if (stdoutBuffer.trim()) handleLine(stdoutBuffer);
  transcript.end(); errors.end();
  if (code !== 0 || !outcome) {
    console.error(`gr-sim exited ${code}; outcome=${outcome ? 'yes' : 'no'}`);
    process.exitCode = 1;
    return;
  }
  console.log(JSON.stringify(outcome));
});
