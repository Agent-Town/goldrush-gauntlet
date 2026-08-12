# e1-baron attempt — codex-6-sol-r4

## Hypothesis (stated before play)

The proven three-T3-sluice economy, four T3 turrets, two stockpiles, and late center blocker already secure the contract. The remaining damage leak is beacon range: the prior protected layout leaves roughly half of the six range-8 beacons outside the Baron's stop near `(0,8)`.

I will keep the combined defense and rig-mode Blast cycling, but compress all six beacons into a protected pocket at z=14–16 where each is within eight metres of the stop. The center wave-19 palisade at `(0,11)` remains the only repair target; side panels remain disposable shot-decoys. If placement holds, six Beacon-Dynamo guns instead of roughly three should shorten the boss phase and spend less of the 500-gold reserve on repeated two-gold blocker repairs.

This tests a different lever from the failed long-wall runs and the prior secure controller: concentrate already-purchased range rather than add works, upgrades, or repair complexity.

## Result

### Run 1 — failed

```json
{"secured":false,"waves":21,"timeMs":566533,"gold":310,"kills":932,"calls":410,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:c7d1af38"}
```

The close pocket disproved the hypothesis. It delayed the build plan enough that wave 19 pre-empted the sixth beacon and second stockpile. More importantly, beacon 0 took forward damage, wrecked, and became the first eligible `REPAIR_UNDER 31` target before the center palisade. The repair order restored the wrong work while the blocker wrecked; rocket volleys then took the Prospector from 109.4 HP to zero. The fifth beacon's extra range did not compensate for losing the melee lock and 500-gold reserve.

### Run 2 hypothesis (stated before play)

Restore the proven protected beacon positions so low-index beacons cannot steal the generic repair, and fix the controller's real scheduling flaw: wave 19 builds the three decoys first, then may finish any missing economy-plan work until wave 20. This keeps the complete combined engine while making the phase transition robust to a slower build schedule.

### Run 2 — SECURED

```json
{"secured":true,"waves":22,"timeMs":594433,"gold":389,"kills":984,"calls":506,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:2f552f97"}
```

I stopped on the first secure, after two total runs.

## What I did

- Built three sluices and upgraded all to T3, then built four turrets on z=12 and upgraded all to T3.
- Added six protected beacons and two stockpiles. At wave 19, placed the center T1 palisade at `(0,11)` first and disposable shot-decoys at `(-10,11)` and `(10,11)`.
- Prioritized Heavy Spark, Split Spark, Double-Tap Coil, Long Resonator, Powder Charge, Quick Fuse, Beacon Dynamo, and late Tinker's Plating.
- Kept the Spark Rig selected while bounded batches of idempotent Rig orders advanced the Blast cooldown, then threw explicit charges at the center stop.
- Used `REPAIR_UNDER 31` only when center palisade 0 was damaged, and explicitly banked the secure choice.

## Why it won

The protected layout kept every beacon above the generic repair threshold, so `REPAIR_UNDER 31` consistently restored the cheap center blocker instead of walking to a damaged gun. The blocker held the Baron in four T3 turrets' range and suppressed his rocket volley while wall-centered Blast charges cleared adds. Both side panels were allowed to wreck.

At the secure view the Prospector had 165.4/175 HP, center palisade 0 was fully restored at 172/172, all six beacons and all four T3 turrets were standing, and 389 gold remained. No upgrade or secure choice defaulted.

## Source-grounded note for the next rig

`REPAIR_UNDER` uses the first eligible entry (`src/agent/StandingOrders.ts:268-276`). Those entries come from `BuildSystem.hpDiagnostics()` in `buildableIds` order (`src/systems/BuildSystem.ts:1968-1995`), and sentry beacons precede palisades in the registry (`src/game/buildables.ts:37-64`). A damaged or wrecked beacon below the threshold therefore steals the repair intended for palisade 0. Keep early, low-HP beacons protected; extra nominal range is not worth breaking the melee lock.

## Artifacts

- Controller: `player.mjs`
- Final outcome: `outcome.json`
- Winning tape: `run-2-tape.json`
- Winning decision transcript: `run-2.jsonl`
- Winning simulator stderr: `run-2.stderr.log`
- Failed range-pocket tape and transcript: `run-1-tape.json`, `run-1.jsonl`
