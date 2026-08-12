
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

### Era d599cd3e — Dry Gulch attempt 1 (2026-08-12)

- **AS LEARNED:** The initial trail view starts at wave 0 with 100 HP, 0 gold, no works, and no threats. The standalone driver must initialize all policy constants before its top-level NDJSON loop; this attempt stopped before submitting its first order and produced no terminal line.

### Era d599cd3e — Dry Gulch attempt 2 (2026-08-12)

- **AS LEARNED:** Trail Dry Gulch secures at wave 20 by centering all defenses on the hero's starting claim and treating every edge as live. Four Signal Turrets came first at 4-unit cardinal offsets; four close Sentry Beacons followed before repair pressure took priority.
- **AS LEARNED:** `SET_WEAPON blast` plus explicit `PICK_UPGRADE` orders prevented the Season-2 defaults (`defaultedPicks: 0`, `defaultedSecure: 0`). Combat-weighted draft choices kept the hero untouched and raised max HP from 100 to 150.
- **AS LEARNED:** Safe harvesting must respect both seam `remaining` and the 200-gold bank cap. The player used the published 1.4 Dry Gulch yield multiplier, spent only from observed gold, and never queued an unaffordable build behind a completed move.
- **AS LEARNED:** Secured on the first completed simulation: wave 20, 150/150 hero HP at the secure boundary, 197 gold, 568 kills, eight standing works, zero wrecks, 67 accepted calls, hash `fnv1a32:0a0d5ad7`. The run banked immediately with `SECURE_CHOICE bank`.
