---
source: codex
project: gold-rush
date: 2026-08-13
type: digest
---

# e1-baron attempt — codex-6-sol-r19

## Hypothesis (stated before play)

The failed variants changed the protected geometry, broadened repair selection, or surrendered Spark Rig firing time. I will keep the combined fort that the source supports: three T3 sluices, four concentrated T3 turrets, six protected beacons, two stockpiles, and three separated wave-19 palisades.

Palisade 0 at `(0,11)` is the cheap route blocker and only intentional boss repair sink. The panels at `(-10,11)` and `(10,11)` are disposable shot-decoys, not a wall. Heavy drafting favors Split Spark, Heavy Spark, Double-Tap Coil, Long Resonator, Powder Charge, Quick Fuse, and Beacon Dynamo.

The Spark Rig will remain selected. Bounded batches of idempotent `SET_WEAPON rig` orders will advance each explicit Blast cooldown before a directed charge, preserving continuous Rig fire while avoiding the failed toggle and busy-polling lines. This should secure on the first run and exceed the original 319-gold agent win.

## Result

**SECURED on run 1; stopped immediately.**

```json
{"secured":true,"waves":22,"timeMs":595100,"gold":386,"kills":985,"calls":516,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:3c4b530d"}
```

## What I did

- Built three sluices and upgraded all to T3, then completed four concentrated T3 turrets, six protected beacons, and two stockpiles before the Baron phase.
- Built center palisade 0 first at `(0,11)` on wave 19, followed by disposable side shot-decoys at `(-10,11)` and `(10,11)`.
- Drafted three Heavy Spark, two Split Spark, three Double-Tap Coil, two Long Resonator, two Powder Charge, two Quick Fuse, two Beacon Dynamo, three Tinker's Plating, and the strongest remaining offered cards.
- Kept the Spark Rig selected. Batches of at most 26 idempotent Rig orders advanced the Blast cooldown before explicit charges, aimed at `(0,11)` during the Baron fight.
- Repaired only fully wrecked works before wave 19 and only the center blocker below 31% during the boss phase, then explicitly banked the secure choice.

## Why it won

The three T3 sluices financed the complete four-T3-turret damage engine. Protected beacon placement kept earlier-family entries out of the generic repair path. Both side palisades absorbed shots and wrecked, while repeated cheap repairs restored the center panel and kept the Baron in melee lock inside the turret kill box. Continuous Rig fire plus center-stop Blast charges finished the Baron and controlled the add pile.

At the secure boundary the Prospector had **157.4/175 HP**, center palisade 0 was **172/172**, all six beacons and all four T3 turrets were standing, and **386 gold** remained. That is 67 gold above the original 319-gold agent win.

## Source-grounded note for the next rig

`StandingOrdersExecutor.tick()` executes only the first actionable order each fixed tick, and an idempotent `SET_WEAPON rig` completes successfully (`src/agent/StandingOrders.ts:188-205,301-306`). Explicit `BLAST_AT` is independently legal and resets the Blast timer (`src/sim/HeadlessContractSim.ts:1474-1503`). Bounded Rig batches therefore consume cooldown without disabling the Rig.

Keep the center panel first and the beacons protected. The Baron follows a palisade blocking his route to the hero (`src/entities/Enemy.ts:944-960`), while `REPAIR_UNDER` selects the first eligible work (`src/agent/StandingOrders.ts:268-276`). The cheap center blocker is worth restoring; the separated side panels are not.

## Verification and artifacts

- `node --check player.mjs` and `node player.mjs --self-check` passed.
- `outcome.json`, `run-1-tape.json`, and the transcript agree on secure, wave 22, 595.1 seconds, 386 gold, and 516 accepted order replacements.
- The transcript contains one explicit bank choice; the outcome reports zero defaulted upgrade or secure choices.
- `run-1.stderr.log` contains only the speed diagnostic; no order was rejected.
- Deterministic controller: `player.mjs`
- Winning outcome: `outcome.json`
- Winning tape: `run-1-tape.json`
- Compact decision transcript: `run-1.jsonl`
- Simulator stderr: `run-1.stderr.log`
