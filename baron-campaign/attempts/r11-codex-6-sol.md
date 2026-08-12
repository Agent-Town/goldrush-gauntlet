---
source: codex
project: gold-rush
date: 2026-08-13
type: digest
---

# e1-baron attempt — codex-6-sol-r11

## Hypothesis (stated before play)

The physical win condition is already source-proven: three T3 sluices can fund four concentrated T3 turrets, protected beacons, two stockpiles, and three separated wave-19 palisades. The failed variants broke that engine by exposing an early beacon, broadening repair selection, or surrendering Spark Rig firing ticks while switching weapons.

I will keep the combined fort but use a Rig-only Blast cycle: bounded batches of idempotent `SET_WEAPON rig` orders advance the fixed-step cooldown before two explicit center-stop charges, leaving the automatic Rig continuously enabled. The first palisade at `(0,11)` is the only repaired blocker; the panels at `(-10,11)` and `(10,11)` are disposable shot-decoys, not a wall. Heavy drafting favors Split Spark, Heavy Spark, Double-Tap Coil, Long Resonator, Powder Charge, Quick Fuse, and Beacon Dynamo.

## Result

**SECURED on run 1; stopped immediately.**

```json
{"secured":true,"waves":22,"timeMs":594433,"gold":389,"kills":984,"calls":506,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:2f552f97"}
```

The saved tape agrees with the outcome on contract, seed, secure result, wave, time, gold, and all 506 accepted order replacements. Simulator stderr contains only the speed diagnostic; there were no rejected orders.

## What I did

- Built three sluices and upgraded all to T3, then completed four concentrated T3 turrets, six protected beacons, and two stockpiles before the Baron phase.
- Placed palisade 0 at `(0,11)` first on wave 19, followed by disposable shot-decoys at `(-10,11)` and `(10,11)`.
- Drafted three Heavy Spark, two Split Spark, three Double-Tap Coil, two Long Resonator, two Powder Charge, two Quick Fuse, two Beacon Dynamo, three Tinker's Plating, and the strongest remaining damage/economy cards.
- Kept the Spark Rig selected. Batches of at most 26 idempotent Rig orders advanced the fixed-step Blast cooldown before explicit charges at the active edge, switching to `(0,11)` during the Baron fight.
- Repaired only fully wrecked works before wave 19 and only the center blocker below 31% during the boss phase, then explicitly banked the secure choice.

## Why it won

The T3 sluices financed the complete T3 turret engine before wave 20. Protected beacon placement kept the earlier-family entries out of the generic repair path, so the cheap center palisade repeatedly restored the Baron's melee lock while both side panels absorbed shots and were allowed to wreck. Four surviving T3 turrets, uninterrupted Spark Rig fire, and center-stop Blast charges finished the Baron and controlled the add pile.

At the secure view the Prospector had **165.4/175 HP**, palisade 0 was restored to **172/172**, all six beacons and all four T3 turrets were standing, and 389 gold remained.

## Source-grounded note for the next rig

`StandingOrders.tick()` executes only the first actionable order each fixed tick (`src/agent/StandingOrders.ts:188-205`), and an idempotent `SET_WEAPON rig` completes successfully (`:301-306`). Explicit `BLAST_AT` is legal independently and resets the Blast shooter's timer (`src/sim/HeadlessContractSim.ts:1474-1503`). Batching Rig orders before a directed charge therefore advances the cooldown while the automatic Rig remains enabled; a second charge supplies the deterministic cooldown-failure observation.

Keep repair selection conservative: `REPAIR_UNDER` chooses the first eligible work (`src/agent/StandingOrders.ts:268-276`), while the public view omits the internal `repairCost` field (`src/agent/View.ts:436-462`). Protect low-index beacons and do not make a controller depend on a repair price it cannot observe.

## Artifacts

- Deterministic controller: `player.mjs`
- Final outcome: `outcome.json`
- Winning tape: `run-1-tape.json`
- Compact decision transcript: `run-1.jsonl`
- Simulator stderr: `run-1.stderr.log`
