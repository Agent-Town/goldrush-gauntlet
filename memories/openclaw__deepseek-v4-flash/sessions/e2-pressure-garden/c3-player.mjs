#!/usr/bin/env node
// c3-player.mjs — OpenClaw (c3) policy for e2-pressure-garden-01 @ trail.
// Proven winning build order from notebook generation 1.
import { spawn } from 'node:child_process';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const contract = 'e2-pressure-garden';
const seed = 'e2-pressure-garden-01';

const placements = {
  turret: [
    { x: -12, z: 14 }, { x: -16, z: 12 }, { x: -8, z: 12 }, { x: -12, z: 9 },
  ],
  sluice: [{ x: -12, z: 7 }],
  palisade: [
    { x: -18, z: 14 }, { x: -6, z: 14 }, { x: -18, z: 10 }, { x: -6, z: 10 },
    { x: -15, z: 8 }, { x: -9, z: 8 }, { x: -15, z: 16 }, { x: -9, z: 16 },
  ],
  sentry_beacon: [
    { x: -16, z: 16 }, { x: -8, z: 16 }, { x: -16, z: 8 },
    { x: -8, z: 8 }, { x: -12, z: 16 }, { x: -12, z: 7 },
  ],
};
const costs = {
  palisade: Array(8).fill(10),
  sluice: [40],
  turret: [50, 70, 95, 125],
  sentry_beacon: [25, 35, 45, 55, 75, 95],
};

function ordersFor(view) {
  const orders = [];
  let gold = view.now.gold;
  let turrets = view.now.works.byKind.turret ?? 0;
  const build = (kind, index, list) => {
    const where = list[kind][index];
    orders.push(
      { verb: 'MOVE_TO', pos: where },
      { verb: 'BUILD', what: kind, where, when: { goldGte: 0 } },
    );
    gold -= costs[kind][index];
  };
  while (turrets < 3 && gold >= costs.turret[turrets]) {
    build('turret', turrets++, placements);
  }
  if (turrets >= 1 && !(view.now.works.byKind.sluice ?? 0) && gold >= costs.sluice[0]) {
    build('sluice', 0, placements);
  }
  if (turrets >= 3) {
    const built = view.now.works.byKind.palisade ?? 0;
    for (let index = built; index < placements.palisade.length && gold >= costs.palisade[index]; index += 1) {
      build('palisade', index, placements);
    }
  }
  if ((view.now.works.byKind.palisade ?? 0) === placements.palisade.length
      && turrets < placements.turret.length && gold >= costs.turret[turrets]) {
    build('turret', turrets++, placements);
  }
  if (turrets === placements.turret.length) {
    const built = view.now.works.byKind.sentry_beacon ?? 0;
    for (let index = built; index < placements.sentry_beacon.length && gold >= costs.sentry_beacon[index]; index += 1) {
      build('sentry_beacon', index, placements);
    }
  }
  orders.push({ verb: 'REPAIR_UNDER', pct: 60 });
  for (const seam of view.now.seams.filter(({ active, remaining }) => active && remaining > 0)) {
    for (let count = 0; count < 5 && orders.length < 31; count += 1) {
      orders.push({ verb: 'HARVEST', seam: seam.id });
    }
  }
  orders.push({ verb: 'HOLD', pos: { x: -12, z: 12 } });
  return orders.slice(0, 32);
}

const root = dirname(fileURLToPath(import.meta.url));
const child = spawn(process.execPath, [
  'scripts/gr-sim.mjs', '--contract', contract, '--seed', seed,
  '--difficulty', 'trail',
], { cwd: root, stdio: ['pipe', 'pipe', 'inherit'] });

let buffer = '';
child.stdout.setEncoding('utf8');
child.stdout.on('data', (chunk) => {
  buffer += chunk;
  let newline;
  while ((newline = buffer.indexOf('\n')) >= 0) {
    const line = buffer.slice(0, newline);
    buffer = buffer.slice(newline + 1);
    if (!line) continue;
    const message = JSON.parse(line);
    if (message.schema === 'goldrush.view.v1') {
      const { wave, gold, hero, threats, works, needsRider } = message.now;
      process.stderr.write(`${JSON.stringify({ wave, gold, hp: Math.round(hero.hp), threats: threats.alive, works: works.byKind, worksHp: works.hp, needsRider })}\n`);
      child.stdin.write(`${JSON.stringify(ordersFor(message))}\n`);
    } else {
      process.stdout.write(`${line}\n`);
    }
  }
});
child.on('close', (code) => process.exitCode = code ?? 1);