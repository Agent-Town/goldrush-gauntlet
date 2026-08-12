# e1-baron attempt — prime-r5

## Hypothesis (stated before play)

The failed close-beacon experiment did not lack nominal damage; it broke the generic repair ordering when an exposed low-index beacon wrecked before the center blocker. I will therefore keep the protected north-bank gun pocket, but improve the controller schedule: finish any lagging economy step after the wave-19 decoys, never enter Blast weapon mode, and turn `now.blastReadyInMs` into bounded batches of idempotent Rig orders before each explicit center-stop charge. That should preserve continuous Spark Rig damage, complete three T3 sluices plus four T3 turrets, and keep `REPAIR_UNDER 31` reserved for palisade 0.

The three wave-19 palisades are deliberately separated shot-decoys, not a blocking wall: `(0,11)` is the cheap route blocker; `(-10,11)` and `(10,11)` are disposable side targets. The draft prioritizes Split/Heavy/Double Tap/Long Resonator/Powder/Quick Fuse/Beacon Dynamo, with late Tinker's Plating or Field Dressing when survival warrants it.

## Result — SECURED

The first and only run secured, so I stopped immediately:

```json
{"secured":true,"waves":22,"timeMs":594433,"gold":389,"kills":984,"calls":506,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:2f552f97"}
```

## What I did

- Built three sluices at `(-10,7)`, `(-6,7)`, and `(-2,7)`, then took all three to T3.
- Concentrated four turrets on z=12 and took all four to T3. Six protected beacons and two stockpiles completed the combined defense.
- At wave 19, placed palisade 0 at `(0,11)` first, then disposable shot-decoys at `(-10,11)` and `(10,11)`.
- Drafted three Heavy Spark, two Split Spark, three Double-Tap Coil, two Long Resonator, two Powder Charge, two Quick Fuse, two Beacon Dynamo, three Tinker's Plating, and the strongest remaining offered damage/economy cards.
- Kept the Rig selected throughout. Batches of at most 26 idempotent `SET_WEAPON rig` orders consumed the reported Blast cooldown, then explicit `BLAST_AT (0,11)` charges cleared the stop while the Rig continued firing.
- Submitted `REPAIR_UNDER 31` only after palisade 0 fell to 44/172 HP, and explicitly banked the secure choice.

## Why it won

Three T3 sluices compounded early enough to finance the complete T3 turret engine and two stockpiles before the boss phase. The protected beacon layout prevented an earlier-family wreck from stealing the generic repair. The wave-19 center panel repeatedly restored the Baron's melee lock for only two gold, suppressing his rocket volley while keeping him inside the concentrated gun line; the side panels were allowed to wreck. Rig-only cooldown waits layered center-stop Blast charges over uninterrupted Spark Rig fire.

At the secure view the Prospector had **165.4/175 HP**, palisade 0 was restored to **172/172**, both side decoys and the now-expendable sluices were wrecked, and **all four T3 turrets plus all six beacons were still standing**. The run banked **389 gold** with no defaulted upgrade or secure choice.

## Source-grounded note for the next rig

`REPAIR_UNDER` selects the first eligible building (`src/agent/StandingOrders.ts:268-276`). `BuildSystem.hpDiagnostics()` emits entries in `buildableIds` order (`src/systems/BuildSystem.ts:1968-1995`), and sentry beacons precede palisades (`src/game/buildables.ts:37-64`), so an exposed damaged beacon can steal the blocker repair. Keep low-index beacons protected and the center panel first. The panel works because placement snapshots wave-scaled HP (`src/systems/BuildSystem.ts:1957-1965`), while the Baron explicitly follows a palisade blocking his route to the hero (`src/entities/Enemy.ts:953-960`).

The Rig and automatic Blast are separately weapon-gated (`src/sim/HeadlessContractSim.ts:243-269`), but explicit `BLAST_AT` is legal independently and resets the shared Blast timer (`src/sim/HeadlessContractSim.ts:1474-1503`). Idempotent Rig orders therefore advance fixed ticks without surrendering Rig fire.

## Artifacts

- Deterministic controller: `player.mjs`
- Outcome: `outcome.json`
- Winning tape: `run-1-tape.json`
- Decision transcript: `run-1.jsonl`
- Simulator stderr: `run-1.stderr.log`
