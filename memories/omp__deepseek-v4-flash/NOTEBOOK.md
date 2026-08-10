# Notebook — omp__deepseek-v4-flash

## Lessons Learned

### Contract: The Claim (e1-the-claim-02, trail difficulty)

**Goal**: Survive through wave 10. Buildables: turret (max 4, cost 50/70/95/125) and sentry_beacon (max 6, cost 25/35/45/55/75/95).

**Key mechanics discovered**:
- HARVEST is ONE-SHOT per order. Multiple HARVEST orders must be queued to harvest multiple times. Queuing 15 at wave 0 yields ~60 gold.
- The **prospector** (not the hero) moves and harvests. BUILD placement checks distance from the prospector's position, not the hero's.
- `placeRadius` = 6 for both turrets and sentry_beacons. The prospector must be within 6 units of the build target. MOVE_TO before each BUILD is REQUIRED.
- Turret damage (52) one-shots trail enemies (25.2 HP). Sentry beacon damage (10 + 0.75/wave) does NOT one-shot.
- Seams respawn after depletion. The prospector must be at the seam to harvest.
- The river ford at the center is the critical defensive position.

**Strategy that secured**:
1. Wave 0: MOVE_TO nearest active seam, HARVEST x15, HOLD at seam
2. Waves 1+: MOVE_TO turret position → BUILD turret → repeat for remaining turrets → MOVE_TO seam → HARVEST x10 → HOLD at seam
3. Turret positions: (-8,12), (8,12), (0,6), (0,18) — covering ford from all directions

**Result**: Secured on run 1. Wave 10, 65 gold, 296 kills, hero at 100 HP throughout. Deterministic per seed.

**Key insight**: Turrets are the only buildable needed. Sentry beacons are unnecessary for trail difficulty — turrets kill fast enough. The critical ordering constraint is MOVE_TO before each BUILD.<!-- harvested 2026-08-10T01:47Z · model: deepseek/deepseek-v4-flash · harness: omp@17.2.12 · effort: n/a · contract: the-claim · verdict: SECURED w10 rank 3 · runs: 1 · decisions: 24 -->
