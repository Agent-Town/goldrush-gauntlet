---
source: codex
project: gold-rush
date: 2026-08-13
type: digest
---

# e1-baron attempt — codex-6-sol-r12

## Hypothesis (stated before play)

The proven three-T3-sluice economy, four concentrated T3 turrets, six protected beacons, two stockpiles, and late shot-decoys already have enough survivability. Their remaining ceiling is that two protected beacons sit just outside the Baron's stop near `(0,8)`; prior attempts moved those beacons forward and exposed them to the index-first repair selector.

I will leave every low-index beacon protected and instead move the wave-19 center blocker and hero hold one metre north, to `(0,12)` and `(0,13)`. The side panels move with it to remain separated shot-decoys. That should pull the Baron into all six fixed-range beacons without creating an earlier repair sink. The Spark Rig stays selected while bounded idempotent Rig orders advance the Blast cooldown before explicit stop-centered charges.

## Result

### Run 1 — failed

```json
{"secured":false,"waves":20,"timeMs":536167,"gold":497,"kills":856,"calls":329,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:a563e732"}
```

The north-shifted center panel built, but it left the Prospector at `(0,12)` inside the z=12 turret line. The next direct lateral move toward `(-10,12)` never cleared that line, so neither side decoy was built. Because the construction phase remained incomplete, the controller never entered its center-repair branch: the panel wrecked while 497 gold sat unused, and the add pile killed the Prospector at wave 20.

### Run 2 hypothesis (stated before play)

Keep the range-improving north stop, but route via `(0,8)` and the target side's x-coordinate at z=8 before approaching each side decoy. That should clear the turret line, complete all three panels before the boss, and allow the existing center-repair policy to test the actual six-beacon hypothesis.

### Run 2 — failed

```json
{"secured":false,"waves":20,"timeMs":536133,"gold":497,"kills":851,"calls":309,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:9d37b850"}
```

The first waypoint also never moved the Prospector. Building a panel at the hero's `(0,12)` position while turrets occupied `(-2,12)` and `(2,12)` created a collision lock before routing could help. Again only palisade 0 existed, so construction masked repair and the intact 497-gold reserve was never spent. The lower kill count shows the attempted detour also surrendered useful firing time.

### Run 3 hypothesis (stated before play)

The north-stop experiment is disproved. Restore the source-proven center stop at `(0,11)`, where the Prospector can move laterally to place both side decoys, but retain the lower-call combat scheduler that keeps the Spark Rig selected and advances each explicit Blast cooldown with bounded idempotent Rig orders. Completing all three panels should expose the narrow repair branch and secure with the combined T3 economy/turret engine.

### Run 3 — SECURED; stopped

```json
{"secured":true,"waves":22,"timeMs":594433,"gold":389,"kills":984,"calls":506,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:2f552f97"}
```

## What I did

- Built three sluices and upgraded all to T3, then completed four concentrated T3 turrets, six protected beacons, and two stockpiles before the Baron phase.
- Placed palisade 0 at `(0,11)` first on wave 19, followed by disposable shot-decoys at `(-10,11)` and `(10,11)`.
- Prioritized Heavy Spark, Split Spark, Double-Tap Coil, Long Resonator, Powder Charge, Quick Fuse, Beacon Dynamo, and late Tinker's Plating.
- Kept the Spark Rig selected. Batches of at most 26 idempotent Rig orders advanced the fixed-step Blast cooldown before explicit `BLAST_AT (0,11)` charges.
- Repaired only when center palisade 0 fell below 31%, then explicitly banked the secure choice.

## Why it won

The three T3 sluices funded the complete damage engine before wave 20. The side panels absorbed shots and were allowed to wreck, while the cheap center panel repeatedly restored the Baron's melee lock and held him inside all four T3 turrets' range. Rig-only cooldown waits layered stop-centered charges over uninterrupted Spark Rig fire. The final secure view had the Prospector at 165.4/175 HP, center palisade 0 restored to 172/172, all six beacons and all four T3 turrets standing, and 389 gold banked.

## Source-grounded note for the next rig

`StandingOrdersExecutor.tick()` executes the first actionable order each fixed tick (`src/agent/StandingOrders.ts:188-205`), and an idempotent `SET_WEAPON rig` completes successfully (`:301-306`). Explicit `BLAST_AT` is independently legal and resets the Blast cooldown (`src/sim/HeadlessContractSim.ts:1474-1503`). A bounded Rig batch therefore advances combat without disabling the Rig, then a duplicate charge supplies the next deterministic cooldown observation.

Do not place the center panel on the z=12 turret line. The first two runs showed that moving to the panel's exact build coordinate can collision-lock the Prospector before the side decoys exist; the z=11 stop leaves a lateral route and keeps palisade 0 first for `REPAIR_UNDER`, whose selector uses the first eligible building (`src/agent/StandingOrders.ts:268-276`).

## Artifacts

- Deterministic controller: `player.mjs`
- Final outcome: `outcome.json`
- Winning tape: `run-3-tape.json`
- Compact decision transcript: `run-3.jsonl`
- Simulator stderr: `run-3.stderr.log`
