---
source: codex
project: gold-rush
date: 2026-08-13
type: digest
---

# e1-baron attempt — codex-6-sol-r16

## Hypothesis (stated before play)

The proven combined fort carries two protected beacons that cannot reach the Baron's stop. I will keep four protected beacons—three in range plus one rear add-control beacon—while preserving the three T3 sluices, four concentrated T3 turrets, two stockpiles, and three separated wave-19 shot-decoys.

The Spark Rig will remain selected. Bounded idempotent Rig orders will advance each explicit Blast cooldown, heavy drafting will prioritize the damage engine, and only the center palisade at `(0,11)` will intentionally trigger boss repair. This tests a smaller fort without repeating the exposed-beacon, moved-stop, broad-repair, or weapon-toggle failures.

## Result

### Run 1 — failed

```json
{"secured":false,"waves":21,"timeMs":566367,"gold":343,"kills":924,"calls":2934,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:35a14404"}
```

Four beacons were one deletion too far. The full economy and four T3 turrets landed, and the center panel kept repairing, but the add pile still held 19 enemies at the death boundary. One T3 turret wrecked and the Prospector fell with 343 gold still banked.

### Run 2 hypothesis (stated before play)

Restore the protected fifth beacon while continuing to omit the expensive sixth. Five is the smallest campaign-proven add-control battery on this seed; its protected position avoids the failed generic-repair diversion while supplying the damage the four-beacon run lacked. Keep the rest of the run-1 economy, turret, decoy, heavy-draft, Rig-only Blast, and center-repair policy unchanged.

### Run 2 — SECURED; stopped

```json
{"secured":true,"waves":22,"timeMs":597167,"gold":361,"kills":986,"calls":2847,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:089e0654"}
```

## What I did

- Built three sluices and upgraded all to T3, then completed four T3 turrets, five protected beacons, and two stockpiles before the Baron phase.
- Placed center palisade 0 first at `(0,11)` on wave 19, followed by disposable shot-decoys at `(-10,11)` and `(10,11)`.
- Prioritized Heavy Spark, Split Spark, Double-Tap Coil, Long Resonator, Powder Charge, Quick Fuse, Beacon Dynamo, and late Tinker's Plating.
- Kept the Spark Rig selected while bounded Rig orders advanced the explicit Blast cooldown; Baron-phase charges landed at `(0,11)`.
- Repaired only fully wrecked pre-Baron works and the center blocker below 31% during the boss fight, then explicitly banked the secure choice.

## Why it won

The four-beacon deletion proved the limit rather than the strategy: it left enough adds alive to wreck a turret and kill the Prospector at wave 21. Restoring the fifth protected beacon supplied the missing add control without reintroducing the expensive sixth beacon or exposing an earlier-family repair sink.

The three T3 sluices funded the complete T3 turret engine. The side palisades absorbed shots and wrecked, while the center panel repeatedly restored the Baron's melee lock inside the turret kill box. Run 2 secured at wave 22 with 159/175 hero HP, all five beacons, three standing T3 turrets, a fully restored center panel, and 361 gold.

## Source-grounded note for the next rig

`REPAIR_UNDER` selects the first eligible work (`src/agent/StandingOrders.ts:268-276`), while the Baron explicitly targets a palisade that blocks his route to the hero (`src/entities/Enemy.ts:953-959`). Keep low-index beacons protected and build the cheap center panel first. On this seed four beacons are insufficient, but the protected five-beacon battery secures; the sixth is not required.

## Verification and artifacts

- `outcome.json`, `run-2-tape.json`, and the transcript agree on secure, wave 22, 597.167 seconds, 361 gold, and 2,847 accepted order replacements.
- `run-2.stderr.log` contains only the speed diagnostic; no order was rejected.
- Deterministic controller: `player.mjs`
- Failed deletion evidence: `run-1-tape.json`, `run-1.jsonl`, `run-1.stderr.log`
- Winning evidence: `run-2-tape.json`, `run-2.jsonl`, `run-2.stderr.log`
