---
source: codex
project: gold-rush
date: 2026-08-13
type: digest
---

# e1-baron attempt — codex-6-sol-r13

## Hypothesis (stated before play)

The combined fort already has enough damage. The failed variants lost by moving the center stop into the turret line, exposing a low-index beacon to generic repair, or broadening pre-Baron repair until construction thrashed.

I will reuse the source-proven build order and protected coordinates: three T3 sluices, four concentrated T3 turrets, six protected beacons, two stockpiles, then three separated wave-19 palisades. Palisade 0 at `(0,11)` is the cheap route blocker and only intentional boss repair sink; the side panels at `(-10,11)` and `(10,11)` are disposable shot-decoys, not a wall.

The Spark Rig will stay selected. Batches of at most 26 idempotent `SET_WEAPON rig` orders will advance the fixed-step Blast cooldown before explicit charges, preserving continuous Rig fire and avoiding the failed weapon-mode and busy-polling lines. Heavy drafting favors Split Spark, Heavy Spark, Double-Tap Coil, Long Resonator, Powder Charge, Quick Fuse, and Beacon Dynamo.

## Result — SECURED

Run 1 secured, so I stopped immediately:

```json
{"secured":true,"waves":22,"timeMs":594433,"gold":389,"kills":984,"calls":506,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:2f552f97"}
```

`outcome.json` and `run-1-tape.json` agree on the contract, seed, secure result, wave, time, and gold. The tape contains all 506 accepted order replacements, matching the outcome's call count. Simulator stderr contains only the speed diagnostic; no order was rejected.

## What I did

- Built three sluices and upgraded all to T3, then completed four concentrated T3 turrets, six protected beacons, and two stockpiles before the Baron phase.
- Placed palisade 0 first at `(0,11)` on wave 19, followed by disposable side shot-decoys at `(-10,11)` and `(10,11)`.
- Drafted three Heavy Spark, two Split Spark, three Double-Tap Coil, two Long Resonator, two Powder Charge, two Quick Fuse, two Beacon Dynamo, three Tinker's Plating, and the strongest remaining offered damage/economy cards.
- Kept the Spark Rig selected. Batches of at most 26 idempotent Rig orders advanced the reported Blast cooldown before explicit edge-directed charges, switching to `(0,11)` during the Baron fight.
- Repaired only fully wrecked works before wave 19 and only the center blocker below 31% during the boss phase, then explicitly banked the secure choice.

## Why it won

The three T3 sluices funded the complete T3 turret engine before wave 20. Protected beacon placement kept the earlier-family entries out of the generic repair path, so the cheap center panel repeatedly restored the Baron's melee lock while both side panels absorbed shots and were allowed to wreck. The lock suppressed rocket volleys and held the Baron in the concentrated gun line; uninterrupted Rig fire plus center-stop Blast charges controlled the remaining adds.

At the secure boundary the Prospector had **165.4/175 HP**, palisade 0 was restored to **172/172**, all six beacons and all four T3 turrets were standing, and **389 gold** remained.

## Source-grounded note for the next rig

`StandingOrdersExecutor.tick()` executes only the first actionable order each fixed tick, and an idempotent `SET_WEAPON rig` completes successfully (`src/agent/StandingOrders.ts:188-205,301-306`). Explicit `BLAST_AT` is legal independently and resets the Blast shooter's timer (`src/sim/HeadlessContractSim.ts:1474-1503`). A bounded Rig batch therefore consumes cooldown without disabling the Rig, and a duplicate Blast supplies the next deterministic cooldown observation.

Keep low-index beacons protected and the center palisade first: `REPAIR_UNDER` selects the first eligible building (`src/agent/StandingOrders.ts:268-276`), while the Baron's pursuit explicitly selects a palisade blocking his route to the hero (`src/entities/Enemy.ts:948-960`). The late T1 center panel is cheap to restore and holds the melee lock; the side panels should remain disposable.

## Artifacts

- Deterministic controller: `player.mjs`
- Outcome: `outcome.json`
- Winning tape: `run-1-tape.json`
- Decision transcript: `run-1.jsonl`
- Simulator stderr: `run-1.stderr.log`
