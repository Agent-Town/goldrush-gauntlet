# e1-baron attempt — prime-r4

## Hypothesis (stated before play)

The proven three-sluice economy and late T1 center blocker are sufficient, but switching into Blast mode costs Spark Rig firing ticks and busy-polling the cooldown wastes rider submissions. I will instead finish three T3 sluices, four tightly concentrated T3 turrets, six nearby beacons, and two stockpiles before wave 20; place a wave-19 center palisade plus two separated disposable shot-decoys; and keep the Rig selected continuously. Bounded batches of idempotent `SET_WEAPON rig` orders will advance the fixed-step Blast cooldown before each explicit wall-centered `BLAST_AT`, preserving sustained rig damage. Only the first, center palisade may trigger `REPAIR_UNDER 31`; the side panels are never repaired.

The draft will heavily prioritize Split/Heavy/Double Tap/Long Resonator/Powder/Quick Fuse/Beacon Dynamo, with late plating or field dressing when survival warrants it. This attacks the failed runs' two resource leaks—generic repairs and weapon-mode downtime—without turning the decoys into an expensive wall.

## Result — SECURED

The first and only run secured, so I stopped immediately:

```json
{"secured":true,"waves":22,"timeMs":594433,"gold":389,"kills":984,"calls":506,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:2f552f97"}
```

## What I did

- Built three sluices and took all three to T3 by wave 10. Built four turrets on z=12 and completed all four at T3 by wave 17.
- Added six nearby sentry beacons and two stockpiles by wave 18. At wave 19, placed palisade 0 at `(0,11)` first, then disposable side shot-decoys at `(-10,11)` and `(10,11)`.
- Drafted three Heavy Spark, two Split Spark, three Double-Tap Coil, two Long Resonator, two Powder Charge, two Quick Fuse, two Beacon Dynamo, three Tinker's Plating, and the strongest remaining offered damage/economy picks.
- Never selected Blast weapon mode. I kept the Rig firing while batches of up to 26 idempotent Rig orders consumed cooldown ticks, then threw explicit charges at the center blocker. A duplicate `BLAST_AT` supplied the next deterministic cooldown observation.
- Used `REPAIR_UNDER 31` only while center palisade 0 was under the threshold, and explicitly banked the secure choice.

## Why it won

The T3 sluices compounded early enough to pay for the complete T3 turret engine, while the stockpiles retained the boss-fight reserve. The late center panel entered with 172 HP and repeatedly absorbed the Baron's 128-damage melee strikes; narrow, index-first repairs restored it for only 2–3 gold at a time. The distant side panels absorbed shots and were allowed to wreck, so they never became repair drains. Wall-centered Blast charges controlled the add pile while uninterrupted Spark Rig and four surviving T3 turrets supplied sustained damage.

At the final secure view the Prospector had **165.4/175 HP**, center palisade 0 was **172/172**, both side decoys and the now-expendable sluices were wrecked, and **all four T3 turrets were still standing**. The run banked **389 gold** with no defaulted draft or secure choices.

## Source-grounded note for the next rig

`src/agent/StandingOrders.ts:188-205,301-306` executes one `SET_WEAPON` order per fixed tick even when the Rig is already selected. The Rig shooter is enabled only in Rig mode (`src/sim/HeadlessContractSim.ts:243-254`), but explicit `BLAST_AT` is legal independently and resets the Blast shooter's timer (`:1474-1503`). Therefore bounded idempotent Rig batches can wait out that timer without sacrificing Rig fire. Keep the center panel first: the Baron explicitly takes a valid palisade blocker on his route to the hero (`src/entities/Enemy.ts:944-960`), and palisade HP snapshots the placement wave (`src/systems/BuildSystem.ts:1953-1965`), making a cheap wave-19 panel a reliable melee lock rather than a permanent wall.

## Artifacts

- Deterministic controller: `player.mjs`
- Outcome: `outcome.json`
- Winning tape: `run-1-tape.json`
- Decision transcript: `run-1.jsonl`
- Simulator stderr: `run-1.stderr.log`
