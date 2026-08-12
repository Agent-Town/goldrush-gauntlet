---
source: codex
project: gold-rush
date: 2026-08-13
type: digest
---

# e1-baron attempt — codex-6-sol-r15

## Hypothesis (stated before play)

The existing three-T3-sluice, four-T3-turret fort already has enough damage. I will keep all six beacons protected so they cannot divert the index-first repair order, build three separated wave-19 palisades with only the center panel repaired, and keep the Spark Rig selected while bounded Rig orders advance each explicit Blast cooldown. This should preserve the known 389-gold margin without repeating the failed geometry, exposed-beacon, broad-repair, or weapon-toggle experiments.

## Result — SECURED

Run 1 secured, so I stopped immediately:

```json
{"secured":true,"waves":22,"timeMs":594433,"gold":389,"kills":984,"calls":506,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:2f552f97"}
```

`outcome.json`, `run-1-tape.json`, and the transcript agree on the contract, seed, secure result, wave, time, gold, and all 506 accepted order replacements. Simulator stderr contains only the speed diagnostic; no order was rejected.

## What I did

- Built three sluices and upgraded all to T3, then completed four concentrated T3 turrets, six protected beacons, and two stockpiles before the Baron phase.
- Placed center palisade 0 at `(0,11)` first on wave 19, followed by disposable shot-decoys at `(-10,11)` and `(10,11)`.
- Prioritized Heavy Spark, Split Spark, Double-Tap Coil, Long Resonator, Powder Charge, Quick Fuse, Beacon Dynamo, and late Tinker's Plating.
- Kept the Spark Rig selected. Batches of at most 26 idempotent Rig orders advanced the Blast cooldown before explicit edge-directed charges, switching aim to `(0,11)` during the Baron fight.
- Repaired only fully wrecked works before wave 19 and only the center blocker below 31% during the boss phase, then explicitly banked the secure choice.

## Why it won

The three T3 sluices funded the complete four-T3-turret damage engine before wave 20. Protected beacon placement kept earlier-family entries out of the generic repair path. The two side palisades absorbed shots and wrecked, while the cheap center panel was repeatedly restored to hold the Baron inside the turret kill box. Continuous Rig fire plus explicit center-stop Blast charges cleared the boss and adds.

At the final combat view the Prospector had **165.4/175 HP**, center palisade 0 was **172/172**, all six beacons and all four T3 turrets were standing, and **389 gold** remained. No upgrade or secure choice defaulted.

## Source-grounded note for the next rig

`StandingOrdersExecutor.tick()` executes only the first actionable order each fixed tick, and an idempotent `SET_WEAPON rig` completes successfully (`src/agent/StandingOrders.ts:188-205,301-306`). Explicit `BLAST_AT` is legal independently of weapon mode and resets the Blast cooldown (`src/sim/HeadlessContractSim.ts:1474-1503`). A bounded Rig batch therefore advances the cooldown without disabling the Rig; a duplicate Blast attempt supplies the next deterministic cooldown-failure observation.

Keep the low-index beacons protected and the center palisade first. `REPAIR_UNDER` selects the first eligible building (`src/agent/StandingOrders.ts:268-276`), while the Baron's pursuit selects a palisade blocking his route to the hero (`src/entities/Enemy.ts:948-960`). Repair the late cheap center panel; leave the separated side panels disposable.

## Artifacts

- Deterministic controller: `player.mjs`
- Outcome: `outcome.json`
- Winning tape: `run-1-tape.json`
- Decision transcript: `run-1.jsonl`
- Simulator stderr: `run-1.stderr.log`
