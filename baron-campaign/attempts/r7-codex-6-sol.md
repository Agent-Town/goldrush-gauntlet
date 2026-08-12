# e1-baron attempt — codex-6-sol-r7

## Hypothesis (stated before play)

The proven combined fort already has enough economy and turret damage, but its protected layout leaves roughly half of the six range-8 beacons outside the Baron's stop near `(0,8)`. The failed r4 range experiment moved the pocket enough to expose low-index beacon 0, which then stole `REPAIR_UNDER 31` from the center palisade.

I will preserve every building's north-bank depth except for moving protected west beacons 1 and 2 inward along x: `(-6,14)` to `(-5,14)` and `(-4,15)` to `(-3,15)`. That keeps them behind the turret line while putting five beacons within eight metres of the stop. The rest remains the combined engine required by the campaign: three T3 sluices, four T3 turrets, two stockpiles, three separated wave-19 shot-decoys, heavy drafting, continuous Rig-mode explicit Blast charges, and center-only repair.

## Runs

| Run | Result | Wave | Kills | Gold | Lesson |
| ---: | :---: | ---: | ---: | ---: | --- |
| 1 | Failed | 22 | 957 | 297 | Beacon 1 took forward damage, became eligible before palisade 0, and stole the generic repair. The blocker then wrecked and the Prospector died to the add pile. |
| 2 | **SECURED** | **22** | **984** | **389** | Restoring the protected beacon positions kept repair selection on the center blocker while continuous Rig fire and center-stop charges finished the Baron. |

## Run 2 hypothesis (stated before play)

Restore the proven protected beacon coordinates. Five nominally in-range beacons are worse than a smaller effective battery if an earlier-family beacon can enter `REPAIR_UNDER 31` first. Keeping all six at z=14–16 should preserve the center repair lock; bounded Rig orders still avoid the older winner's weapon-mode downtime, and the wave-19 phase still places all three decoys before finishing any lagging build step.

## Result

**SECURED on run 2; stopped immediately.**

```json
{"secured":true,"waves":22,"timeMs":594433,"gold":389,"kills":984,"calls":506,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:2f552f97"}
```

## What I did

- Built three sluices and upgraded all to T3, then completed four T3 turrets, six protected beacons, and two stockpiles before the Baron phase.
- Placed the center T1 palisade first at `(0,11)` on wave 19, then separated disposable shot-decoys at `(-10,11)` and `(10,11)`.
- Prioritized Heavy Spark, Split Spark, Double-Tap Coil, Long Resonator, Powder Charge, Quick Fuse, Beacon Dynamo, and late Tinker's Plating.
- Kept the Spark Rig selected. Batches of at most 26 idempotent Rig orders advanced the fixed-step Blast cooldown before explicit `BLAST_AT (0,11)` charges.
- Repaired only when palisade 0 fell below 31%, then explicitly banked the secure choice.

## Why it won

The T3 sluices funded the complete T3 turret engine before wave 20. Protected beacon placement prevented an earlier-family work from stealing `REPAIR_UNDER 31`, so the cheap center panel repeatedly restored the Baron's melee lock while both side panels were allowed to wreck. Four surviving T3 turrets, uninterrupted Spark Rig fire, and center-stop Blast charges supplied the damage and add control.

At the secure view the Prospector had **165.4/175 HP**, center palisade 0 was **172/172**, all six beacons and all four T3 turrets were standing, and 389 gold remained. No upgrade or secure decision defaulted.

## Source-grounded note for the next rig

`REPAIR_UNDER` selects the first eligible building (`src/agent/StandingOrders.ts:268-276`). `BuildSystem.hpDiagnostics()` emits buildings in `buildableIds` order (`src/systems/BuildSystem.ts:264-275,1968-1995`), where sentry beacons precede palisades. Run 1 demonstrated the consequence: moving beacon 1 only one metre inward let it cross below 31% first and divert the repair while palisade 0 remained at 44/172 HP. Protect low-index beacons; nominal range is not worth losing the Baron's blocker, which his pursuit path explicitly selects (`src/entities/Enemy.ts:953-959`).

## Artifacts

- Deterministic controller: `player.mjs`
- Final outcome: `outcome.json`
- Winning tape: `run-2-tape.json`
- Winning decision transcript: `run-2.jsonl`
- Winning simulator stderr: `run-2.stderr.log`
- Failed range-tune evidence: `run-1-tape.json`, `run-1.jsonl`, `run-1.stderr.log`
