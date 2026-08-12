---
source: codex
project: gold-rush
date: 2026-08-13
type: digest
---

# e1-baron attempt — codex-6-sol-r14

## Hypothesis

The proven fort is overbuilt by one beacon. Prior source-grounded campaign notes showed that only three of the six protected beacons can reach the wall-stopped Baron; moving one forward exposed it to damage and diverted the index-first repair order. I will instead delete the late, 95-gold sixth beacon and keep the other five protected.

The rest of the combined win condition stays intact: three T3 sluices, four concentrated T3 turrets, two stockpiles, three separated wave-19 palisades, a heavy offensive draft, continuous Spark Rig fire, explicit Blast charges, and center-only boss repair. If five beacons still control the adds, the smaller fort should secure without the failed repair trap.

## Result — SECURED

Run 1 secured, so I stopped immediately:

```json
{"secured":true,"waves":22,"timeMs":595767,"gold":389,"kills":985,"calls":514,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:8c438d12"}
```

`outcome.json` and `run-1-tape.json` agree on the contract, seed, secure result, wave, time, gold, and all 514 accepted order replacements. Simulator stderr contains only the speed diagnostic; there were no rejected orders.

## What I did

- Built three sluices and upgraded all to T3, then completed four T3 turrets, five protected beacons, and two stockpiles before the Baron phase.
- Placed palisade 0 first at `(0,11)` on wave 19, followed by disposable side shot-decoys at `(-10,11)` and `(10,11)`.
- Prioritized Heavy Spark, Split Spark, Double-Tap Coil, Long Resonator, Powder Charge, Quick Fuse, Beacon Dynamo, and late Tinker's Plating.
- Kept the Spark Rig selected. Batches of at most 26 idempotent Rig orders advanced the Blast cooldown before explicit edge-directed charges, switching the aim to `(0,11)` for the Baron.
- Repaired only fully wrecked works before wave 19 and only center palisade 0 below 31% during the boss phase, then explicitly banked the secure choice.

## Why it won

The three T3 sluices financed the complete four-T3-turret damage engine before wave 20. Five protected beacons were enough to control the approach without adding an exposed, earlier-family repair sink. The two side palisades absorbed shots and were allowed to wreck, while repeated two-gold repairs restored the center panel and kept the Baron in melee lock inside the turret kill box. Bounded Rig waits layered center-stop Blast charges over uninterrupted Spark Rig fire.

At the secure boundary the Prospector had **157.4/175 HP**, center palisade 0 had **44/172 HP**, all five beacons and all four T3 turrets were standing, and **389 gold** remained. The deletion hypothesis succeeded as a simpler win, but did not improve the bank over the best six-beacon run; it took 1.334 seconds longer and finished with 8 less hero HP.

## Source-grounded note for the next rig

`StandingOrdersExecutor.tick()` executes only the first actionable order each fixed tick, and idempotent `SET_WEAPON rig` completes successfully (`src/agent/StandingOrders.ts:188-205,301-306`). Explicit `BLAST_AT` is legal independently of weapon mode and resets the Blast shooter's timer (`src/sim/HeadlessContractSim.ts:1474-1503`). A bounded batch of Rig orders therefore advances the cooldown without disabling the Rig; a duplicate Blast supplies the next deterministic cooldown-failure observation.

Deleting the sixth protected beacon is safe on this seed, but it is not a free performance gain: the five-beacon run matched the 389-gold best while losing a little time and health. Keep the deletion only when minimizing fort size matters; restore the sixth beacon when margin matters more.

## Artifacts

- Deterministic controller: `player.mjs`
- Outcome: `outcome.json`
- Winning tape: `run-1-tape.json`
- Decision transcript: `run-1.jsonl`
- Simulator stderr: `run-1.stderr.log`
