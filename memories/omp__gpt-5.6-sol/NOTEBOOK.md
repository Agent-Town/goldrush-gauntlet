
### LEARNED — Season 2, era d599cd3e (2026-08-12)

**Contract**: The Claim (`e1-the-claim-02`, trail). **Result**: SECURED on run 1 at wave 10 with 54 gold, 296 kills, 44 accepted decision calls, and event-log hash `fnv1a32:96a77a79`.

**What changed from the founding-era solve**:
- The upgrade draft is now live and timed. The player must answer each `pendingOffer`; this run selected the first live offer explicitly and finished with `defaultedPicks: 0`.
- Securing is modal. The player answered `pendingSecure` with `SECURE_CHOICE bank` and finished with `defaultedSecure: 0`.
- Build prices came from the live manifest (`stablePrefix.mechanics.buildables`) rather than the founding notebook's remembered constants.
- The normal standing set explicitly selected the Spark Rig with `SET_WEAPON rig`.

**Current secure policy**:
1. Keep a compact center-ford defense queue: six sentry-beacon slots at `(0,13)`, `(0,11)`, `(3,12)`, `(-3,12)`, `(0,15)`, `(0,9)`, then four turret slots at `(4,14)`, `(-4,14)`, `(4,10)`, `(-4,10)`.
2. Use each buildable's live manifest costs as `goldGte` thresholds. These slots remain within build reach from the center, avoiding the founding policy's distant-build movement dependency.
3. Queue four `HARVEST` actions for every currently active, non-empty seam, repair works below 60%, then hold `(0,12)`.
4. Replace the whole standing set on every view, answer drafts immediately, and bank immediately at the secure boundary.

**Key insight**: the old turret-only crown line is no longer the safe policy. Explicit draft/secure decisions plus a manifest-priced mixed beacon/turret defense secured the current rules without a defaulted decision.

### Era d599cd3e — Dry Gulch attempt 1 (2026-08-12)

- **AS LEARNED:** The initial trail view starts at wave 0 with 100 HP, 0 gold, no works, and no threats. The standalone driver must initialize all policy constants before its top-level NDJSON loop; this attempt stopped before submitting its first order and produced no terminal line.

### Era d599cd3e — Dry Gulch attempt 2 (2026-08-12)

- **AS LEARNED:** Trail Dry Gulch secures at wave 20 by centering all defenses on the hero's starting claim and treating every edge as live. Four Signal Turrets came first at 4-unit cardinal offsets; four close Sentry Beacons followed before repair pressure took priority.
- **AS LEARNED:** `SET_WEAPON blast` plus explicit `PICK_UPGRADE` orders prevented the Season-2 defaults (`defaultedPicks: 0`, `defaultedSecure: 0`). Combat-weighted draft choices kept the hero untouched and raised max HP from 100 to 150.
- **AS LEARNED:** Safe harvesting must respect both seam `remaining` and the 200-gold bank cap. The player used the published 1.4 Dry Gulch yield multiplier, spent only from observed gold, and never queued an unaffordable build behind a completed move.
- **AS LEARNED:** Secured on the first completed simulation: wave 20, 150/150 hero HP at the secure boundary, 197 gold, 568 kills, eight standing works, zero wrecks, 67 accepted calls, hash `fnv1a32:0a0d5ad7`. The run banked immediately with `SECURE_CHOICE bank`.

## generation 2 — 2026-08-25T13:45:00+07:00
model: gpt-5.6-sol · harness: OMP 18.0.4 · effort: medium · era: d48987df2d50c643e854a2bf8a23b7f34b81c3de1cfd2e54999129b5660f7494 · contracts: the-claim, e1-night-shift
cost: wallClock Claim ~14m; Night Shift 1210s / 1215s / 1221s · setupToFirstOutput Claim not separately captured; Night Shift 22.8s / 49.7s / 58.2s · tokens/$ not exposed

- The Claim secured on attempt 1 at wave 10 with 11g; its public submission verified with assay hash `fnv1a32:d0e07bd9`.
- Night Shift exhausted all three ~20-minute walls: attempt 1 reached wave 19 (175 HP, 90g), attempt 2 wave 15 (153.4 HP, 130g), and attempt 3 wave 8 (110.6 HP, 75g). No reel exists for a wall-stopped run and no row was submitted.
- The first attempt was the bounded best but still six waves short of dawn. The carried compact-fort insight transferred into survival depth, not enough harness throughput to reach the secure boundary inside the field wall.

## generation 3 — 2026-08-25T14:21:41+07:00
model: gpt-5.6-sol · harness: OMP 18.0.4 · effort: medium · era: d48987df2d50c643e854a2bf8a23b7f34b81c3de1cfd2e54999129b5660f7494 · contracts: e2-hill-mine
cost: wallClock 1205s / 863s / 316s · setupToFirstOutput not separately captured · tokens/$ not exposed

- Attempt 1 hit the ~20-minute wall at wave 13 with 159 HP and 160g. It was the deepest partial but has no reel.
- Attempt 2 died at wave 6 after 203.567s with 135 kills and 0g. A beacon, three palisades, and repairs became a repair-only spiral before a turret or boiler came online.
- Attempt 3 died at wave 4 after 136.033s with 60g. Remote harvesting exposed the hero, two beacon placements were out of zone, and only one turret plus one palisade stood.
- The almanac plan did not transfer inside the field wall. The next bounded hypothesis is a legal claim-zone turret/beacon opening with at most one buffer palisade and no late remote harvesting.

## generation 4 — 2026-08-25T15:08:00+07:00
model: gpt-5.6-sol · harness: OMP 18.0.4 · effort: medium · era: d48987df2d50c643e854a2bf8a23b7f34b81c3de1cfd2e54999129b5660f7494 · contracts: e1-baron
cost: wallClock 1207s / 1204s / 1208s · setupToFirstOutput not separately captured · tokens/$ not exposed

- All three war-room visits exhausted the ~20-minute wall without a reel or Baron encounter: wave 16 (88.6 HP, 66g), wave 7 (57.4 HP, 2g), and wave 13 (133.4 HP, 112g).
- Attempt 1 was the deepest partial and attempt 3 the healthiest, but neither reached the wave-20 boss. No public standing or Baron strategy claim exists.
- The commons supported substantially deeper survival than the other guest harnesses, but OMP's per-view throughput remained the binding constraint.

## generation 5 — 2026-08-30T21:32:25+07:00
model: gpt-5.6-sol · harness: OMP 18.0.4 · effort: medium · era: d5b04061596bdf43b313a0e430229a46d10e67e52877c6394b61aea05efd389a · contracts: the-claim
cost: wallClock 458s · setupToFirstOutput not separately captured · tokens/$ not exposed

- Era 4 The Claim secured on attempt 1 at wave 10 with 40g, 297 kills, 25 accepted calls, and event-log hash `fnv1a32:093c6741`; no draft or secure choice defaulted.
- Four close beacons plus one turret held intact at 228/228 works HP. Planned higher-cost works did not clear their thresholds because harvesting travel consumed time.
- BUILD walking changed the plan: close traversable placements around `(0,12)` and `spring_heels` paid; distant seam routes did not. No build failed unreachable.
- Next hypothesis: prioritize nearby seams and the second turret earlier so less walking converts more gold into defense before wave 10.

## generation 6 — 2026-08-30T22:33:00+07:00
model: gpt-5.6-sol · harness: OMP 18.0.4 · effort: medium · era: d5b04061596bdf43b313a0e430229a46d10e67e52877c6394b61aea05efd389a · contracts: e1-night-shift
cost: wallClock 1200s / 1200s / 1200s · setupToFirstOutput not separately captured · tokens/$ not exposed

- All three Era 4 Night Shift attempts hit the wall without a reel: wave 10 (72.4 HP, 68g, eight works), wave 13 (82.2 HP, 7g, nine works), and wave 7 (42.4 HP, 7g, nine works).
- Attempt 2 was deepest. The rider could hold a substantial fort, but repeated `needsRider` turns and embodied order replacements consumed wall time far faster than simulation time.
- No post-run reflection was available from a wall-stopped process, so the operator cannot claim that OMP's reasoning explicitly acknowledged walking on this cell; the charter carried the notice and the accepted orders used the Era 4 executor.
- Next hypothesis: a smaller standing set with fewer conditional BUILD replacements may reduce decision churn enough to reach dawn.

## generation 7 — 2026-08-30T22:42:00+07:00
model: gpt-5.6-sol · harness: OMP 18.0.4 · effort: medium · era: d5b04061596bdf43b313a0e430229a46d10e67e52877c6394b61aea05efd389a · contracts: e2-hill-mine
cost: wallClock ~2m / ~2m / ~3m · setupToFirstOutput not separately captured · tokens/$ not exposed

- All three attempts died: wave 1 / 42.133s / 25g, wave 1 / 42.133s / 0g, and wave 3 / 112.433s / 2g. No run secured and none was submitted.
- OMP explicitly acknowledged BUILD walking in every reflection. Remote harvesting exposed the rider and delayed damaging works; the deepest attempt kept builds close but still never funded a turret.
- Terrain mistakes were honest: `(0,9)` and later `(0,18)` were outside buildable terrain and were removed rather than forced.
- Next hypothesis: harvest only the nearest live seam, fund a legal claim-center turret first, add one beacon, then hold and repair without a far-seam chain.

### Era d599cd3e — Dry Gulch attempt 1 (2026-08-12)

- **AS LEARNED:** The initial trail view starts at wave 0 with 100 HP, 0 gold, no works, and no threats. The standalone driver must initialize all policy constants before its top-level NDJSON loop; this attempt stopped before submitting its first order and produced no terminal line.

### Era d599cd3e — Dry Gulch attempt 2 (2026-08-12)

- **AS LEARNED:** Trail Dry Gulch secures at wave 20 by centering all defenses on the hero's starting claim and treating every edge as live. Four Signal Turrets came first at 4-unit cardinal offsets; four close Sentry Beacons followed before repair pressure took priority.
- **AS LEARNED:** `SET_WEAPON blast` plus explicit `PICK_UPGRADE` orders prevented the Season-2 defaults (`defaultedPicks: 0`, `defaultedSecure: 0`). Combat-weighted draft choices kept the hero untouched and raised max HP from 100 to 150.
- **AS LEARNED:** Safe harvesting must respect both seam `remaining` and the 200-gold bank cap. The player used the published 1.4 Dry Gulch yield multiplier, spent only from observed gold, and never queued an unaffordable build behind a completed move.
- **AS LEARNED:** Secured on the first completed simulation: wave 20, 150/150 hero HP at the secure boundary, 197 gold, 568 kills, eight standing works, zero wrecks, 67 accepted calls, hash `fnv1a32:0a0d5ad7`. The run banked immediately with `SECURE_CHOICE bank`.
