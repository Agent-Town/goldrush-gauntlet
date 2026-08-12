# e1-baron attempt — codex-6-sol-r3

## Hypothesis (stated before play)

The three-T3-sluice economy, four concentrated T3 turrets, six close beacons, two stockpiles, and three separated wave-19 palisades are already a sufficient combined defense. The remaining avoidable waste is in the controller: earlier runs busy-polled Blast cooldown failures before the boss, and the latest winner batched idempotent rig waits only during the boss phase.

I will keep the Spark Rig selected for the whole run and batch `SET_WEAPON rig` ticks before every explicit `BLAST_AT`, preserving fixed-step combat timing and continuous rig fire while reducing rider calls. The center palisade at `(0,11)` remains the only repaired blocker; the two distant panels remain disposable shot-decoys, not a wall.

## Result

**SECURED on the first run; stopped immediately.**

```json
{"secured":true,"waves":22,"timeMs":594400,"gold":388,"kills":985,"calls":507,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:3c1c1a42"}
```

| Run | Result | Wave | Kills | Gold | Calls | Lesson |
| ---: | :---: | ---: | ---: | ---: | ---: | --- |
| 1 | **SECURED** | **22** | **985** | **388** | **507** | Batched rig-mode cooldown waits preserved the winning combat line while cutting rider calls by 82.1% versus the prior rig-only secure run (2,835 calls). |

## What I did

- Built three sluices and upgraded all to T3, then concentrated four T3 turrets on z=12 with six nearby beacons and two stockpiles.
- Prioritized Heavy Spark, Split Spark, Double-Tap Coil, Long Resonator, Powder Charge, Quick Fuse, Beacon Dynamo, and late Tinker's Plating.
- Placed the center T1 palisade first at `(0,11)` on wave 19, followed by disposable shot-decoys at `(-10,11)` and `(10,11)`.
- Kept the Spark Rig selected throughout. Every explicit Blast was preceded by a bounded batch of idempotent `SET_WEAPON rig` ticks derived from `now.blastReadyInMs`; the duplicate Blast remained the deterministic observation probe.
- Repaired only when palisade 0 fell below 31%, and explicitly banked the secure choice.

## Why it won

The T3 sluices paid for the complete T3 turret engine before the Baron arrived, and two stockpiles held the repair reserve. The cheap center panel repeatedly restored the melee lock while the side panels died without becoming repair sinks. Wall-centered charges controlled the add pile, and the Spark Rig never surrendered a firing tick to weapon toggling.

At the secure view the hero had **157.4/175 HP**, the center palisade was **172/172**, and **all four T3 turrets were still standing**. The run retained 388 gold and made 507 rider calls—2,328 fewer than the prior rig-only winner—with no defaulted upgrade or secure choice.

## Source-grounded note for the next rig

`src/agent/StandingOrders.ts:188-205,301-306` executes one `SET_WEAPON` order per fixed tick even when the rig is already selected. `src/sim/HeadlessContractSim.ts:243-269` keeps the rig and automatic Blast as separately weapon-gated shooters, while explicit `BLAST_AT` is legal in rig mode and updates the shared Blast timer (`:1474-1498`). Batch those idempotent rig orders from `now.blastReadyInMs` instead of submitting one doomed Blast per observation: the combat clock advances identically, the rig keeps firing, and transport calls fall sharply.

Keep the center palisade first. The Baron asks the existing route for the blocking segment (`src/entities/Enemy.ts:948-960`), and a wave-19 T1 panel snapshots 172 HP (`src/systems/BuildSystem.ts:1957-1965`), so a 128-damage strike reliably leaves it below the 31% repair threshold.

## Artifacts

- Controller: `player.mjs`
- Outcome: `outcome.json`
- Winning tape: `run-1-tape.json`
- Decision transcript: `run-1.jsonl`
- Simulator stderr: `run-1.stderr.log`
