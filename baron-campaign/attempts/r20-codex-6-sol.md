---
source: codex
project: gold-rush
date: 2026-08-13
type: digest
---

# e1-baron attempt — codex-6-sol-r20

## Hypothesis (stated before play)

The repeated wave-22 fort has enough damage, but its center lock depends on untargeted `REPAIR_UNDER`: any earlier eligible beacon can make the Prospector repair the wrong work while the Baron breaks through.

I will keep the three-T3-sluice economy, four concentrated T3 turrets, six beacons, two stockpiles, and three wave-19 palisades, but use the final context verbs differently. When center palisade 0 falls below 31%, the Prospector will demolish that exact panel and rebuild it in place. The targeted hot-swap costs more than repair but completes much faster and cannot walk to another building. Only the last, high-index beacon moves from `(3,16)` to `(-2,15)`, adding a fourth beacon in range without exposing the low-index beacons that broke earlier range experiments.

The Spark Rig stays selected while bounded Rig orders advance explicit center-charge cooldowns. If the hot-swap keeps the melee lock, the extra in-range beacon should secure without the campaign's generic-repair failure mode.

## Result

### Run 1 — failed

```json
{"secured":false,"waves":21,"timeMs":557600,"gold":349,"kills":908,"calls":472,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:5807b769"}
```

The eager 31% hot-swap replaced the center panel 24 times. It never ran out of gold, but replacing a still-standing blocker after every 128-damage strike repeatedly opened the route; the Prospector died at wave 21 with 349 gold. Moving the sixth beacon did not compensate for that churn.

### Run 2 hypothesis (stated before play)

Restore the proven protected sixth-beacon position and hot-swap center palisade 0 only after it is fully wrecked. A wave-20 panel survives one 128-damage strike at 52/180 HP, so this uses both hits before paying for a replacement. Bounded ten-tick observations should still detect the wreck and finish exact demolish/rebuild before the Baron's 0.8-second blocked rocket telegraph resolves.

### Run 2 — failed

```json
{"secured":false,"waves":20,"timeMs":541167,"gold":496,"kills":875,"calls":392,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:7935ed7c"}
```

Waiting for the panel to wreck reduced hot-swaps to eight, but it exposed the fatal geometry. The Baron stepped through the inactive footprint before the replacement landed. The rebuilt panel was healthy behind him while already-telegraphed rockets hit the Prospector for 40 damage at a time; the run died with 496 gold.

### Run 3 hypothesis (stated before play)

The panel must remain physically active, so abandon demolition and use the existing in-place `REPAIR_UNDER 31` path as soon as the first 128-damage hit leaves it at 52/180 HP. Keep the sixth beacon at `(-2,15)`: it is a late, high-index placement behind the turret line, adding a fourth beacon in boss range without exposing the low-index beacons that diverted earlier repair experiments. Continuous Rig fire, frequent explicit center charges, and repair-before-wreck should keep the lock while testing that one safer range gain.

### Run 3 — SECURED; stopped

```json
{"secured":true,"waves":22,"timeMs":592333,"gold":372,"kills":981,"calls":603,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:376fce3b"}
```

## What I did

- Built three T3 sluices, four concentrated T3 turrets, six beacons, two stockpiles, and three separated wave-19 palisades.
- Kept beacons 0–4 in the protected layout and moved only beacon 5 to `(-2,15)`, within eight metres of the center stop.
- Kept the Spark Rig selected while bounded ten-tick batches advanced explicit Blast charges aimed at `(0,11)`.
- Repaired center palisade 0 below 31%, left the side panels disposable, and explicitly banked the first secure result.

## Why it won

In-place repair preserved the route blocker that both hot-swap variants briefly removed. The relocated high-index beacon stayed standing at 110/118 HP, so it added range without becoming an early repair sink. The center panel finished standing at 164/172 HP; three T3 turrets remained active, and the Prospector banked with 157.4/175 HP.

The result improves the campaign's original agent win by 4.634 seconds, 53 gold, and 2,691 rider calls. Against the later protected-layout 389-gold line, it is 2.100 seconds faster but holds 17 less gold and uses 97 more calls, so the range move is a speed trade rather than a universal upgrade.

## Source-grounded note for the next rig

Do not demolish a live Baron blocker as a targeted-repair substitute. `BuildSystem.demolish()` tears down and deactivates the slot immediately (`src/systems/BuildSystem.ts:1376-1428`), and the Baron recomputes his route from active palisades (`src/entities/Enemy.ts:944-960`). Once he crosses the old footprint, rebuilding at the same coordinate puts the panel behind him; the rocket telegraph then resolves against the Prospector (`src/sim/HeadlessContractSim.ts:997-1069`). Preserve the blocker with repair, and move only late beacons if testing range so low-index entries remain protected from the first-eligible selector (`src/agent/StandingOrders.ts:268-276`).

## Verification and artifacts

- `node --check player.mjs` and `node player.mjs --self-check` passed.
- `outcome.json`, `run-3-tape.json`, and `run-3.jsonl` agree on secure, wave 22, 592.333 seconds, 372 gold, and 603 accepted submissions.
- The tape records contract `e1-baron`, seed `e1-baron-01`, trail difficulty, and all 603 accepted entries.
- `run-3.stderr.log` contains only the speed diagnostic; there were no rejected orders or defaulted choices.
- Winning controller: `player.mjs`; failed evidence: `run-1-*`, `run-2-*`; winning evidence: `run-3-*`.
