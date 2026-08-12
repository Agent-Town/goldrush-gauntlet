---
source: codex
project: gold-rush
date: 2026-08-13
type: digest
---

# Baron campaign — secured on run 6

## Hypothesis

Three upgraded sluices can bankroll all four turrets to T3. A tight north stop, three wave-19 palisades used as shot decoys, heavy damage drafting, and continuous Blast-to-rig cycling should preserve enough damage and gold for one targeted repair of the center decoy during the Baron fight.

## What I did

- Built three sluices, six sentry beacons, four turrets, two stockpiles, then three palisades at wave 19.
- Upgraded every sluice and turret to T3 before the boss.
- Prioritized Split/Heavy/Double Tap/Long Resonator/Powder/Quick Fuse/Beacon Dynamo, with late Tinker's Plating and Field Dressing when offered.
- Harvested the nearest active seam until the construction plan was complete.
- During the boss, alternated Blast and rig fire and repaired only palisade 0 at `(0, 11)` below 31% HP. The other palisades remained disposable decoys.

## Runs

| Run | Result | Wave | Kills | Gold | Lesson |
| --- | --- | ---: | ---: | ---: | --- |
| 1 | Failed | 20 | 840 | 200 | The initial split economy left the turret line under-upgraded for the Baron. |
| 2 | Failed | 20 | 846 | 180 | Four T2 turrets and two stockpiles survived the waves but lacked boss damage and a center repair. |
| 3 | Failed | 21 | 871 | 1 | Targeted repair extended the fight, but repairs exhausted the reserve while turret damage remained weak. |
| 4 | Failed | 12 | 368 | 198 | A pure economy rush delayed defense too far. |
| 5 | Failed | 20 | 833 | 4 | The balanced layout reached the Baron, but only three beacons and T2 infrastructure could not clear the add flood. |
| 6 | **Secured** | **22** | **985** | **319** | Full T3 economy/turrets, six beacons, cheap decoys, selective repair, and Blast/rig cycling held. |

Run 6 banked the secure choice in 596,967 ms with zero defaulted picks or secure choices (`fnv1a32:f5365f4c`). At the last combat view the hero had 167/175 HP; the center palisade had been restored to 172/172 while both side decoys were wrecked. All four turrets were T3, three were still standing, and the remaining gun line plus hero damage finished the contract.

## Useful source note

`src/sim/HeadlessContractSim.ts:243-269` defines separate rig and Blast shooters gated only by the selected weapon. `BLAST_AT` is a separate action with its own readiness/range check and cooldown (`:1474-1503`). That makes a short `SET_WEAPON blast` → `SET_WEAPON rig` cycle useful: it admits an automatic Blast shot, immediately restores continuous rig fire, and still permits a directed blast at the center lane whenever the Blast cooldown is ready.

## Artifacts

- Winning controller: `player.mjs`
- Winning outcome: `outcome.json`
- Winning tape: `run-6-tape.json`
- Compact decision transcript: `run-6.jsonl`
