---
source: codex
project: gold-rush
date: 2026-08-13
type: digest
---

# e1-baron attempt — codex-6-sol-r17

## Hypothesis (stated before play)

The proven combined fort is still overbuilt. Five protected beacons are the measured minimum for add control on this seed, and one stockpile has independently carried enough repair reserve. I will combine those deletions: three T3 sluices, four concentrated T3 turrets, five protected beacons, one stockpile, and three separated wave-19 palisades.

The center palisade at `(0,11)` remains the only intentional boss repair sink; the side panels are disposable shot-decoys. The Spark Rig stays selected while bounded idempotent Rig orders advance each explicit Blast cooldown. Removing the sixth beacon and second stockpile saves 155 gold without changing the damage engine or repair ordering.

## Result

**SECURED on run 1; stopped immediately.**

```json
{"secured":true,"waves":22,"timeMs":594600,"gold":216,"kills":985,"calls":509,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:2ec5299b"}
```

## What I did

- Built three sluices and upgraded all to T3, then completed four concentrated T3 turrets, five protected beacons, and one stockpile before the Baron phase.
- Placed center palisade 0 first at `(0,11)` on wave 19, followed by disposable shot-decoys at `(-10,11)` and `(10,11)`.
- Prioritized Heavy Spark, Split Spark, Double-Tap Coil, Long Resonator, Powder Charge, Quick Fuse, Beacon Dynamo, and late Tinker's Plating.
- Kept the Spark Rig selected. Batches of at most 26 idempotent Rig orders advanced the Blast cooldown before explicit charges at the active edge and then `(0,11)` during the Baron fight.
- Repaired only fully wrecked works before wave 19 and only the center blocker below 31% during the boss phase, then explicitly banked the secure choice.

## Why it won

The three T3 sluices financed the complete four-T3-turret damage engine. Five protected beacons supplied enough add control without exposing an earlier-family repair sink. One stockpile raised the bank cap from 200 to 350, which was enough for the remaining build and selective two-gold center repairs; the second stockpile's additional capacity was unnecessary.

The side palisades absorbed shots and wrecked while the center panel repeatedly restored the Baron's melee lock inside the turret kill box. Continuous Rig fire and center-stop Blast charges finished the Baron at wave 22. The final combat view had the Prospector at 157.4/175 HP, the center panel restored to 172/172, all five beacons standing, two T3 turrets still firing, and 216 gold banked.

## Source-grounded note for the next rig

One stockpile supplies a deterministic 350-gold ceiling: the base cap is 200 (`src/game/Balance.ts:818-821`) and each stockpile adds 150 (`src/game/Balance.ts:572-576`). That is sufficient for this selective-repair line, so the second stockpile is not part of the physical win condition.

Keep the center panel first and the beacons protected. `REPAIR_UNDER` selects the first eligible work (`src/agent/StandingOrders.ts:268-276`), while the Baron's pursuit explicitly chooses a palisade blocking his route to the hero (`src/entities/Enemy.ts:953-959`). The lean fort works because none of the five earlier-family beacons crossed the 31% threshold before the center repair.

## Verification and artifacts

- `outcome.json` and `run-1-tape.json` agree on contract, seed, secure, wave 22, 594.6 seconds, and 216 gold.
- The tape contains 509 accepted order replacements, matching the outcome call count; the transcript contains one explicit bank choice.
- `run-1.stderr.log` contains only the speed diagnostic; there were no rejected orders.
- Deterministic controller: `player.mjs`
- Winning tape: `run-1-tape.json`
- Compact decision transcript: `run-1.jsonl`
