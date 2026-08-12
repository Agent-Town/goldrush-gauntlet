# e1-baron attempt — codex-6-sol-r2

## Hypothesis

The failed palisade-wall runs spent their reserve repairing remote wrecks while too few weapons could reach the Baron. I will instead compound three sluices into four T3 turrets in a tight north-bank kill box, add six nearby beacons, and place three wave-19 palisades as disposable shot decoys rather than a long wall. Only the center decoy at `(0, 11)` will be eligible for a narrow repair policy. An offense-heavy draft plus repeated `blast` → `rig` cycling and directed blasts at the stop should supply enough damage while preserving sustained rig fire.

This follows the reference tape's principle—upgrade a small damage engine and actively switch weapons—while avoiding the failed campaign's spread-out wall and generic late repair drain.

## Result — SECURED

```json
{"secured":true,"waves":22,"timeMs":596967,"gold":319,"kills":985,"calls":3294,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:f5365f4c"}
```

The first run secured at wave 22, so I stopped within the six-run limit.

## What I did

- Built three sluices, six sentry beacons, four turrets, and two stockpiles; all sluices and turrets reached T3 before the boss fight.
- Concentrated the turret line at z=12 and added the center palisade `(0, 11)` plus disposable side decoys `(-10, 11)` and `(10, 11)` at wave 19.
- Prioritized Heavy Spark, Split Spark, Double Tap, Long Resonator, Powder Charge, Quick Fuse, and Beacon Dynamo, with Tinker's Plating for late survivability.
- During the boss fight, cycled `SET_WEAPON blast` → `SET_WEAPON rig`, aimed `BLAST_AT` at `(0, 11)`, held at `(0, 12)`, and allowed only the center palisade to trigger `REPAIR_UNDER 31`.
- Explicitly banked the secure choice; no upgrade or secure choice defaulted.

## Why it won

The upgraded sluices paid for the complete T3 turret engine early enough that the defense entered the Baron fight with real concentrated damage. The late palisades had 172 HP each: the side panels absorbed attacks and were allowed to die, while the center blocker was restored and kept the Baron at the gun line. The final combat view had the Prospector at 167/175 HP, the center palisade at 172/172, both side decoys wrecked, and three T3 turrets still firing. The run ended with 319 gold, so selective repair avoided the reserve exhaustion seen in the failed wall strategies.

## Source-grounded note for the next rig

`src/entities/Enemy.ts:953-959` makes the Baron prefer a palisade that blocks his route to the hero, while `src/systems/BuildSystem.ts:1957-1965` gives a late-placed palisade wave-scaled HP. Keep the center decoy first in palisade index order: `src/agent/StandingOrders.ts:268-276` selects the first building below the repair threshold, so a narrow `REPAIR_UNDER 31` can restore that blocker without funding ordinary damage elsewhere. `src/sim/HeadlessContractSim.ts:243-269` also defines separate rig and Blast shooters, which is why brief Blast-to-rig cycles can layer a Blast shot over continuous rig fire.

## Artifacts

- Controller: `player.mjs`
- Outcome: `outcome.json`
- Winning tape: `run-1-tape.json`
- Decision transcript: `run-1.jsonl`
- Simulator stderr: `run-1.stderr.log`
