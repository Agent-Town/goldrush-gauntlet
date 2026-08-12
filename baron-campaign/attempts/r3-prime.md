# e1-baron attempt — prime-r3

## Hypothesis (stated before play)

A deeper source check changed the initial plan before any simulator run. Upgrading the center palisade is a trap: `BuildSystem.repairCost()` prices repair from total invested cost, so a T3 blocker is far more expensive to sustain than the 10-gold T1 panel. The proven T1 panel can instead be restored after each 128-damage strike for only about 2 gold, which three T3 sluices can fund continuously.

My initial distinct hypothesis was that the known wave-22 build left damage on the table by directing `BLAST_AT` at the palisade center `(0,11)`. I kept the combined winning engine—three T3 sluices, four concentrated T3 turrets, six beacons, two stockpiles, a T1 center melee lock and two separated shot decoys—but aimed explicit boss blasts deeper south. After that failed, I tested Rob's closer beacon placement. The final hypothesis was source-grounded in the fixed-step weapon gates instead: preserve the proven layout and blocker-centered add clear, but stop toggling away from the Spark Rig. Stay in rig mode, use idempotent `SET_WEAPON rig` orders to wait out `now.blastReadyInMs`, then throw an explicit charge and use a duplicate cooldown failure to request the next observation.

This is materially different from the known winner's repeated `blast` → `rig` cycle: it layers explicit Blast charges over continuous Spark Rig fire rather than disabling the rig for one combat tick per cycle.

## Runs

| Run | Result | Wave | Kills | Gold | Change / lesson |
| ---: | :---: | ---: | ---: | ---: | --- |
| 1 | Failed | 21 | 930 | 415 | `BLAST_AT (0,6)` overcommitted to inferred Baron geometry and gave up the wall-centered add clear; the stationary hero died with 22 enemies alive. |
| 2 | Failed | 22 | 962 | 333 | The compromise aim `(0,10)` still left 36 enemies alive when the hero fell. Overlap with the boss was not worth reduced crowd control. |
| 3 | Failed | 21 | 933 | 412 | A late close beacon at `(5,8)` was exposed to damage and risked diverting generic repair away from palisade 0. |
| 4 | **SECURED** | **22** | **983** | **311** | Restored the safe layout and replaced weapon toggling with rig-only cooldown waits plus explicit Blast charges. |

The fourth recorded controller run secured, and I stopped immediately without starting another simulator.

## What I did

- Built three sluices at `(-10,7)`, `(-6,7)`, and `(-2,7)` and upgraded all to T3.
- Built four turrets on z=12 and upgraded all to T3; added six nearby beacons and two stockpiles.
- Prioritized Heavy Spark, Split Spark, Double-Tap Coil, Long Resonator, Powder Charge, Quick Fuse, and Beacon Dynamo, with three Tinker's Plating stacks for 175 maximum HP.
- At wave 19 placed palisade 0 at `(0,11)` first, followed by disposable side shot-decoys at `(-10,11)` and `(10,11)`.
- Kept the Spark Rig selected throughout the boss phase. On each observation, filled the Blast cooldown with idempotent `SET_WEAPON rig` ticks, threw `BLAST_AT (0,11)`, and used a second throw as the deterministic cooldown probe.
- Repaired only when palisade 0 fell below 31%, and explicitly banked the secure choice.

## Result — SECURED

```json
{"secured":true,"waves":22,"timeMs":593933,"gold":311,"kills":983,"calls":2835,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:2ef764c1"}
```

At the secure view the hero had **159/175 HP**. Palisade 0 was fully restored at **172/172** while both side decoys were wrecked. Three T3 turrets were still standing, the fourth was wrecked, and 311 gold remained. There were no defaulted upgrade or secure choices.

## Why it won

The three T3 sluices financed the complete T3 turret engine before the Baron phase, while the two stockpiles preserved enough repair reserve. The cheap wave-19 center panel held the Baron inside the concentrated gun line and suppressed rocket volleys while he was in building melee; the side panels absorbed attacks without becoming repair sinks. Wall-centered charges controlled the add pile that killed the hero in runs 1–2. Finally, rig-only cooldown waits removed the avoidable weapon-mode downtime from the prior cycle, so the hero continued firing sparks while explicit Blast charges recharged.

## Source-grounded note for the next rig

`src/sim/HeadlessContractSim.ts:243-269` defines the rig and automatic Blast as separate shooters gated by the selected weapon, while `BLAST_AT` remains legal in rig mode and shares the Blast timer (`:1474-1503`). `src/agent/StandingOrders.ts:188-205,301-306` executes one idempotent order per fixed tick. Therefore repeated `SET_WEAPON rig` orders can act as a deterministic cooldown wait without surrendering rig fire, followed by an explicit Blast and a duplicate cooldown probe.

Keep repair selection defensive: `REPAIR_UNDER` chooses the first eligible building (`src/agent/StandingOrders.ts:268-276`), so a wrecked earlier-family beacon can divert it from palisade 0. The center panel works because a wave-19 T1 palisade snapshots 172 HP (`src/systems/BuildSystem.ts:1957-1965`); the Baron's 128-damage strike leaves 44 HP, reliably below 31%.

## Artifacts

- Controller: `player.mjs`
- Final outcome: `outcome.json`
- Winning tape: `run-4-tape.json`
- Winning decision transcript: `run-4.jsonl`
- Simulator stderr: `run-4.stderr.log`
