---
source: codex
project: gold-rush
date: 2026-08-13
type: digest
---

# e1-baron attempt — codex-6-sol-r8

## Hypothesis (stated before play)

The proven combined fort has enough damage; its fragile seam is repair selection. `REPAIR_UNDER 31` repairs the first eligible work, so blindly leaving it active can send the Prospector to a wrecked beacon instead of the center blocker. I will build the three T3 sluices, four concentrated T3 turrets, six protected beacons, two stockpiles, and three separated wave-19 shot-decoys, but submit repair only when the live first eligible entry is palisade 0.

The Spark Rig will remain selected. Bounded idempotent Rig orders will consume the reported Blast cooldown before each explicit charge at `(0,11)`, and a duplicate charge will request the next deterministic observation. The heavy draft keeps Split Spark, Heavy Spark, Double-Tap Coil, Long Resonator, Powder Charge, Quick Fuse, and Beacon Dynamo ahead of utility picks.

## Result

### Run 1 — failed

```json
{"secured":false,"waves":20,"timeMs":534967,"gold":296,"kills":859,"calls":235,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:7585bf29"}
```

The controller withheld all pre-Baron repair. All three T2 sluices were wrecked by wave 6, so the planner treated them as unavailable for upgrades and moved on. The fort reached wave 20 with four T2 turrets, one wrecked stockpile, and two wrecked low-index beacons. Beacon 0 therefore preceded the center palisade in the generic repair order; the guarded policy correctly refused the wrong repair, but the 44/172 center blocker then wrecked and rocket/add damage killed the Prospector.

### Run 2 hypothesis (stated before play)

Keep the same combined build and center-only boss repair, but restore the source's missing lifecycle step: before wave 19, repair only the first work below 31% before pursuing another construction goal. At wave 19, build all three decoys first, then finish any pre-Baron repair. This should keep the sluices alive long enough to reach T3, preserve both stockpile capacity and the low-index beacons, and leave palisade 0 as the first eligible repair when the Baron strikes.

### Run 2 — failed

```json
{"secured":false,"waves":12,"timeMs":323400,"gold":126,"kills":366,"calls":210,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:b664409d"}
```

The broader repair rule caused thrash: repeated damage kept replacing the standing order while the Prospector walked between a stockpile and sluices. Construction stalled before the fort had enough static damage, and the Prospector died during wave 12.

### Run 3 hypothesis (stated before play)

Use the proven neighboring controller's exact build order and protected coordinates instead of re-deriving them: the first beacon comes before the later sluices, all four turrets precede economy upgrades, and only fully wrecked pre-Baron works trigger repair. Keep the lower-call Rig-only cooldown cycling, aim pre-Baron Blast at the active edge, and switch Blast aim to the center blocker for the Baron. This removes the run-2 repair thrash while preserving the combined T3-turret, decoy-wall, Blast, and heavy-draft win condition.

### Run 3 — secured; stopped

```json
{"secured":true,"waves":22,"timeMs":591667,"gold":225,"kills":977,"calls":500,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:a1b3e71a"}
```

The exact sequencing produced all three T3 sluices, all four T3 turrets, six beacons, two stockpiles, and the three wave-19 palisades. The side palisades absorbed shots and wrecked; `REPAIR_UNDER 31` repeatedly restored the center blocker, which finished at 164/172 HP. Edge-directed charges preserved the build through the early waves, while bounded Rig ticks plus center-directed charges cycled Blast during the Baron fight. The Prospector secured with 157.4 HP, 225 gold, no defaulted choices, and 500 calls—2,794 fewer calls than the original 3,294-call secure controller.

`outcome.json` and `run-3-tape.json` agree on secure, wave 22, 591.667 seconds, and 225 gold. The run stopped at the first secure result, after three attempts.

## Source note

The human reference tape `rob-baron-reference-w30-tape.json` established the durable shape—compound economy, upgraded static damage, and active weapon cycling—but used the browser seed `gold-rush`, so it was guidance rather than a replayable script. The decisive implementation baseline was the deterministic neighboring `../../codex-sol-r1/arena/player.mjs`; this attempt reused its proven plan and coordinates, then retained the Rig-only bounded-wait optimization to reduce calls.
