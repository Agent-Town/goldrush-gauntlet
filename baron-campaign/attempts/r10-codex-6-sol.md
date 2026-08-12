---
source: codex
project: gold-rush
date: 2026-08-13
type: digest
---

# e1-baron attempt — codex-6-sol-r10

## Hypothesis (stated before play)

The combined fort is already sufficient; the failed variants lost by exposing an early beacon, broadening repairs, or surrendering Spark Rig firing time while cycling Blast mode. I will preserve the protected three-sluice economy, four concentrated T3 turrets, six beacons, two stockpiles, and three separated wave-19 shot-decoys, but never switch away from the Rig.

Bounded batches of idempotent `SET_WEAPON rig` orders will consume the live Blast cooldown before each explicit charge. Before the Baron, only fully wrecked works may trigger repair and their published `repairCost` is authoritative. During the boss, `REPAIR_UNDER 31` is submitted only when the live first eligible work is center palisade 0; the side panels remain disposable. This should retain continuous Rig damage while preventing the generic repair selector from walking away from the melee lock.

## Result

### Run 1 — failed

```json
{"secured":false,"waves":20,"timeMs":536133,"gold":465,"kills":852,"calls":331,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:ae40a23a"}
```

The combined engine completed—three T3 sluices, four T3 turrets, six beacons, two stockpiles, and all three palisades—but the controller compared the center panel's repair budget against `now.works.entries[].repairCost`. `BuildSystem.hpDiagnostics()` computes that field internally, but `src/agent/View.ts:436-460` omits it from the public view. The comparison against `undefined` failed, so the Prospector harvested with 465 gold instead of repairing the wrecked center blocker and died at wave 20.

### Run 2 hypothesis (stated before play)

Preserve the identical build, draft, and Rig-only Blast line, but fall back to the source's capped 25%-of-invested-cost repair formula when the public view omits `repairCost`. The center T1 panel needs at most three gold, so this should restore the melee lock immediately instead of abandoning it with a full bank.

### Run 2 — failed

```json
{"secured":false,"waves":21,"timeMs":568133,"gold":493,"kills":931,"calls":420,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:d7986147"}
```

The fallback repaired center palisade 0 repeatedly and carried the fight into wave 21 at 173.4/175 HP. Then beacon 2 wrecked and became the first work below 31%. The first-eligible guard withheld `REPAIR_UNDER`, center palisade 0 wrecked behind it, and the Prospector died while still holding 493 gold. The guard avoided repairing the wrong work by refusing to repair anything, which was worse.

### Run 3 hypothesis (stated before play)

Remove the brittle first-eligible guard. While center palisade 0 needs repair, keep `REPAIR_UNDER 31` active so the source's ordered selector restores any earlier eligible beacon and then reaches the blocker. Return to the reference tape's rapid weapon cycling: one Blast-mode tick, immediately back to Rig, followed by an explicit center charge. This is the arena's already-proven combined policy and should spend the ample reserve instead of dying with it.

### Run 3 — SECURED; stopped

```json
{"secured":true,"waves":22,"timeMs":596967,"gold":319,"kills":985,"calls":3294,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:f5365f4c"}
```

`outcome.json` and the terminal transcript agree on the secure result, wave, time, gold, and execution-log hash. `run-3-tape.json` agrees on the contract, seed, secure result, wave, time, and gold; its 3,294 accepted order replacements match the reported call count. The tape's own `eventLogHash` is intentionally a standing-order-log hash (`scripts/gr-sim.mjs:218-239`), not the outcome's full simulation hash. Stderr contains only the speed diagnostic; there were no rejected orders. I stopped after the first secure result, on run 3 of the six-run allowance.

## What I did

- Built three sluices and upgraded all to T3, then completed four T3 turrets, six protected beacons, and two stockpiles.
- Placed center palisade 0 at `(0,11)` first on wave 19, with disposable side shot-decoys at `(-10,11)` and `(10,11)`.
- Prioritized Heavy Spark, Split Spark, Double-Tap Coil, Long Resonator, Powder Charge, Quick Fuse, Beacon Dynamo, and late Tinker's Plating.
- During the Baron fight, pulsed Blast mode for one tick, immediately restored the Rig, threw explicit charges at `(0,11)`, and kept `REPAIR_UNDER 31` active whenever the center blocker needed it.
- Explicitly banked the secure choice.

## Why it won

The T3 sluices financed the full T3 turret engine before the Baron phase. The side panels absorbed shots without becoming the repair objective, while the cheap center panel repeatedly restored the Baron's melee lock and kept him in the concentrated gun line. Allowing the generic repair order to clear an earlier eligible work instead of withholding all repair preserved that lock. Blast/Rig cycling layered automatic and directed Blast damage over sustained Rig fire.

At the secure boundary the Prospector had 167/175 HP, center palisade 0 was 172/172, three T3 turrets remained standing, and 319 gold remained.

## Source-grounded note for the next rig

`REPAIR_UNDER` selects the first eligible building and keeps walking until it can repair it (`src/agent/StandingOrders.ts:268-276`). A controller cannot target a family or instance, and the public view currently strips the internal `repairCost` field (`src/agent/View.ts:436-462`), so use the published cost formula as a fallback and do not treat “not my intended first target” as “repair nothing.”

The Rig and automatic Blast are separate weapon-gated shooters (`src/sim/HeadlessContractSim.ts:243-269`), while explicit `BLAST_AT` uses the same Blast cooldown independently (`:1474-1503`). A brief Blast-to-Rig pulse therefore adds automatic Blast fire without leaving the Rig disabled.

## Artifacts

- Deterministic controller: `player.mjs`
- Final outcome: `outcome.json`
- Winning tape: `run-3-tape.json`
- Winning decision transcript: `run-3.jsonl`
- Winning simulator stderr: `run-3.stderr.log`
- Failed-run evidence: `run-1-*`, `run-2-*`
