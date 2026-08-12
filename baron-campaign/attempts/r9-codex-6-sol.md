---
source: codex
project: gold-rush
date: 2026-08-13
type: digest
---

# e1-baron attempt — codex-6-sol-r9

## Hypothesis (stated before play)

The combined fort is already sufficient; failed variants lost by broadening repairs or exposing an early beacon. I will preserve the proven build order and protected coordinates, use the live work `repairCost` instead of a parallel estimate, and repair only fully wrecked pre-Baron works. At wave 19 the center palisade at `(0,11)` will be built first and become the only intentional boss repair sink; two separated side palisades remain disposable shot-decoys.

The Spark Rig will stay selected. Bounded batches of idempotent Rig orders will advance the reported Blast cooldown before an explicit edge-directed charge, switching to `(0,11)` during the Baron fight. This should retain continuous Rig damage, avoid repair thrash, and complete the three-T3-sluice, four-T3-turret engine before the boss.

## Result — SECURED

Run 1 secured, so I stopped immediately:

```json
{"secured":true,"waves":22,"timeMs":595800,"gold":232,"kills":990,"calls":507,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:49921d03"}
```

The saved tape agrees on the contract, seed, secure result, wave, time, and gold. Its 507 accepted entries also match the outcome's call count. The simulator reported no rejected orders or errors.

## What I did

- Built three sluices and upgraded all to T3, then completed four T3 turrets, six protected beacons, and one stockpile before wave 19.
- Built palisade 0 first at `(0,11)` on wave 19, followed by disposable side shot-decoys at `(-10,11)` and `(10,11)`.
- Prioritized Heavy Spark, Beacon Dynamo, Split Spark, Double-Tap Coil, Powder Charge, Long Resonator, Quick Fuse, and Tinker's Plating.
- Kept the Spark Rig selected. Batches of at most 26 idempotent Rig orders consumed the reported Blast cooldown before explicit edge-directed charges, switching to `(0,11)` during the Baron fight.
- Repaired only fully wrecked works before wave 19 and only the center blocker below 31% during the boss phase. The controller used each work's live `repairCost` instead of duplicating the pricing formula.
- Explicitly banked the secure choice.

## Why it won

The three T3 sluices funded the complete four-T3-turret damage engine before the Baron arrived. Protected beacon placement kept the earlier-family entries above the 31% repair threshold, so the cheap center panel repeatedly restored the Baron's melee lock while both side decoys were allowed to wreck. The lock held the Baron in the concentrated turret range and suppressed rocket volleys; uninterrupted Rig fire plus center-stop Blast charges cleared the boss and adds.

At the secure view the Prospector had **157.4/175 HP**, center palisade 0 was **172/172**, all six beacons remained standing, three T3 turrets remained standing, and 232 gold remained. The run made 990 kills in 507 calls with no defaulted decisions.

## Source-grounded note for the next rig

Use the diagnostics instead of mirroring repair economics. `BuildSystem.hpDiagnostics()` publishes the authoritative `repairCost` on every work (`src/systems/BuildSystem.ts:1968-1995`), while `repairCost()` accounts for missing HP, stored build cost, caps, and overrides (`:2491-2501`). A hand-maintained controller estimate can silently drift from those rules. This does not make broad repair safe: `REPAIR_UNDER` still selects the first eligible building (`src/agent/StandingOrders.ts:268-276`), so low-index beacons must remain protected if the center palisade is the intended boss repair.

## Artifacts

- Deterministic controller: `player.mjs`
- Outcome: `outcome.json`
- Winning tape: `run-1-tape.json`
- Decision transcript: `run-1.jsonl`
- Simulator stderr: `run-1.stderr.log`
