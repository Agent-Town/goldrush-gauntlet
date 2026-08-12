# e1-baron attempt — prime-r2

## Hypothesis (stated before play)

The failed palisade-wall runs spent their reserve repairing remote wrecks while too few weapons could reach the Baron. I will instead compound three sluices into a completed damage engine before wave 20: all four turrets at tier III in a tight north-bank kill box, six close beacons, and an offense-heavy draft. At wave 19 I will place three separated 10-gold palisades as **shot decoys**, not a wall; only the center panel at `(0, 11)` intercepts the Baron, while the side panels absorb rocket targeting. A `REPAIR_UNDER 31` order will be used only when center palisade 0 drops below 31%, avoiding ordinary scratches. Repeated `blast` → `rig` pairs should admit an automatic Blast shot without giving up sustained Spark Rig fire, while directed Blast charges hit the center stop.

This is materially different from the failed long-wall/remote-repair approach: economy and T3 turret damage finish first, the north stop concentrates range, and disposable separated decoys localize the boss repair.

## Result — SECURED

```json
{"secured":true,"waves":22,"timeMs":596967,"gold":319,"kills":985,"calls":3294,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:f5365f4c"}
```

The first and only run secured at wave 22, so I stopped within the six-run limit. `outcome.json` records `runsSoFar: 1`; the deterministic evidence is `run-1-tape.json` and the compact decision transcript is `run-1.jsonl`.

## What I did

- Built three sluices at `(-10,7)`, `(-6,7)`, and `(-2,7)` and upgraded all three to T3 by wave 11.
- Concentrated four turrets along z=12 and completed all four at T3 by wave 18. Six nearby beacons and two stockpiles were also complete by wave 18.
- Prioritized Heavy Spark, Split Spark, Double Tap, Long Resonator, Powder Charge, Quick Fuse, and Beacon Dynamo, while taking late Tinker's Plating for survivability.
- At wave 19 built the center palisade `(0,11)` plus disposable side decoys `(-10,11)` and `(10,11)`.
- During the boss fight cycled `SET_WEAPON blast` → `SET_WEAPON rig`, repeatedly threw `BLAST_AT (0,11)`, held at `(0,12)`, and repaired only when center palisade 0 fell below 31%.
- Explicitly banked the secure choice; there were zero defaulted draft or secure decisions.

## Why it won

The sluice engine paid the 3,340-gold total needed to build three sluices and four turrets and take all seven works through T3 without starving the early defense. The damage remained concentrated on the Baron's north-bank stop rather than spread across a remote wall. Side palisades were allowed to die, while the center decoy received one full repair and kept the Baron inside three surviving T3 turrets' range. Blast/rig cycling layered automatic Blast fire, directed Blast charges, and continuous Spark Rig fire. At the final combat view the hero still had 167/175 HP, the center palisade was 172/172, both side decoys were wrecked, and three T3 turrets remained standing.

## Source-grounded note for the next rig

`src/entities/Enemy.ts:953-959` makes the Baron select a palisade that blocks his route to the hero, and `src/sim/HeadlessContractSim.ts:1006-1069` suppresses his rocket volley while he is in melee reach of the hero or nearest building. Build the center decoy late: `src/systems/BuildSystem.ts:1957-1965` snapshots wave-scaled HP when a work is placed. The wave-19 center panel therefore has 172 HP; the Baron's 128-damage building strike pushes it below 31%, making a narrow `REPAIR_UNDER 31` trigger reliable without paying for ordinary wear. Keep this decoy first in palisade index order so the generic repair selector (`src/agent/StandingOrders.ts:268-276`) chooses it before the disposable sides.
