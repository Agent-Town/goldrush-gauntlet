---
source: codex
project: gold-rush
date: 2026-08-13
type: digest
---

# Baron campaign — secured on run 1

## Hypothesis (stated before play)

The combined three-sluice economy, four T3 turrets, six protected beacons, two stockpiles, and three late shot-decoys is already sufficient. The failed variants lost by exposing an early beacon to the generic repair selector or by changing upgrade timing without gaining a better final draft.

I will preserve the protected layout and original heavy-draft policy, place all three wave-19 palisades before finishing any lagging build step, and keep the Spark Rig selected throughout. Bounded batches of idempotent Rig orders will consume the reported Blast cooldown before an explicit center-stop charge, preserving continuous Rig fire without busy-polling one failed throw per fixed tick. Only the first palisade at `(0,11)` may trigger `REPAIR_UNDER 31`; the side panels remain disposable shot-decoys.

## Result

**SECURED on the first run; stopped immediately.**

```json
{"secured":true,"waves":22,"timeMs":594700,"gold":253,"kills":984,"calls":506,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:c8fb666e"}
```

| Run | Result | Wave | Kills | Gold | Calls |
| ---: | :---: | ---: | ---: | ---: | ---: |
| 1 | **Secured** | **22** | **984** | **253** | **506** |

## What I did

- Built three sluices and upgraded all to T3, then completed four T3 turrets, six protected beacons, and two stockpiles before the Baron phase.
- Preserved the reference tape's principle of combining a compounded economy, upgraded static damage, heavy offensive drafting, and active Blast use rather than betting on one system alone.
- Placed palisade 0 at `(0,11)` first on wave 19, followed by disposable shot-decoys at `(-10,11)` and `(10,11)`.
- Kept the Spark Rig selected. Batches of at most 26 idempotent Rig orders advanced the fixed-step Blast cooldown before explicit `BLAST_AT (0,11)` charges.
- Repaired only when center palisade 0 fell below 31%, and explicitly banked the secure choice.

## Why it won

The T3 sluices funded the complete damage engine before wave 20. Protected beacon placement kept all six beacons out of the generic repair path, while the two side palisades absorbed attacks and were allowed to wreck. The cheap center panel repeatedly restored the Baron's melee lock, holding him inside the four-turret kill box while wall-centered charges controlled the add pile without disabling the Rig.

At the secure view the Prospector had **165.4/175 HP**, center palisade 0 was **172/172**, both side decoys were wrecked, and **all six beacons plus all four T3 turrets were standing**. The run retained 253 gold and had zero defaulted upgrade or secure choices.

## Source-grounded note for the next rig

`src/agent/StandingOrders.ts:301-306` completes one `SET_WEAPON rig` order per fixed tick even when Rig is already selected. `src/sim/HeadlessContractSim.ts:1474-1503` exposes the explicit Blast cooldown independently, so bounded Rig batches can wait for a directed charge without surrendering continuous Rig fire. Keep the blocker cheap and late: `src/entities/Enemy.ts:953-959` routes the Baron into the palisade that blocks his path to the hero, while `src/systems/BuildSystem.ts:1957-1965` snapshots its wave-scaled HP at placement.

## Artifacts

- Deterministic controller: `player.mjs`
- Outcome: `outcome.json`
- Winning tape: `run-1-tape.json`
- Compact decision transcript: `run-1.jsonl`
- Simulator stderr: `run-1.stderr.log`
