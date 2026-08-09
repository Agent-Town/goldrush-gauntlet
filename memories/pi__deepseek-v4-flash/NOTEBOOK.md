# Notebook — pi__deepseek-v4-flash
(empty — first generation pending)

<!-- harvested 2026-08-09T00:09:15.592Z · model: deepseek/deepseek-v4-flash · harness: pi · effort: n/a · era: 3dd7790d6411 · contract: e1-twin-banks · verdict: TIMEOUT · wallClock: 1500s · setupToFirstOutput: 20s -->


## generation

Generated: 2026-08-09T00:16:46.148Z
Contract: e1-night-shift | Seed: e1-night-shift-01
Outcome: FAILED after 6 runs

Lessons from this map/era:
- Night Shift: survive to wave 25 DAWN for victory
- Dark cycle: full light → dusk (wave 5) → dark (wave 10) → dawn (wave 25 = win)
- Build priority: turrets (defense + muzzle glow light) first, then sentry beacons (light + slow)
- Lantern posts are pre-placed wrecked; REPAIR_UNDER 100 restores them for free light
- Seams: 6 total, 2 active at start, harvest closest first (seam-3 at -1.5,-6.4 is nearest to claim)
- Spawn from all 4 edges (north/south/east/west); need 360° coverage
- River with 1 center ford; enemies cross at ford
- Keep gold flowing through HARVEST to fund turret/beacon construction
- Fall back to claim when overwhelmed (low HP + many enemies)


## generation
Generated: 2026-08-09T00:23:06.194Z
Contract: e1-night-shift | Seed: e1-night-shift-01
Outcome: FAILED after 6 runs
Lessons:
- V3 (no HOLD): Removing HOLD eliminates ping-ponging between seam and claim, improving gold rate
- Seam-2 (-9,6.7) is the closest active seam initially; seam-3 (-1.5,-6.4) is closest to claim but INACTIVE
- Gold rate: ~5g/wave mining seam-2; thieves steal gold if left alive
- Need 25g for sentry_beacon, 50g for turret — must mine aggressively early


## generation
Generated: 2026-08-09T00:26:50.724Z
Outcome: FAILED after 6 runs

<!-- harvested 2026-08-09T00:34:33.011Z · model: deepseek/deepseek-v4-flash · harness: pi · effort: n/a · era: 3dd7790d6411 · contract: e1-night-shift · verdict: TIMEOUT · wallClock: 1500s · setupToFirstOutput: 1s -->

<!-- harvested 2026-08-09T00:59:51.109Z · model: deepseek/deepseek-v4-flash · harness: pi · effort: n/a · era: 3dd7790d6411 · contract: e1-baron · verdict: TIMEOUT · wallClock: 1500s · setupToFirstOutput: 1s -->


## generation
Generated: 2026-08-09T01:02:48.331Z
Contract: e2-pressure-garden | Seed: e2-pressure-garden-01
Outcome: FAILED after 6 runs
Lessons:
- e2-pressure-garden: secure at wave 12, need 2+ boilers hot waves 8-12 (PRESSURIZE objective)
- Boilers cost 70g each, max 3, same price each
- Gold seams: 6 total, 2 active initially (seam-1 at -30,24 and seam-2 at -18,27)
- HARVEST + HOLD at seam pays ~5g/wave; depletes and recharges
- Spawn from all 4 edges: south (rail toughs), east/west (steam wreckers target buildings), north (coal thieves)
- Palisades are cheapest defense; turrets are expensive but needed against wreckers
- Coal seams for boilers are on highest terrace near (-12,39), (-5,43), (3,39)
- Ford at x=0 (garden-crossing) is the water crossing point
- Works (turrets) die fast vs steam wreckers (buildingDamageScale 2.5)
- REPAIR_UNDER is essential to keep boilers/walls alive
- FALLBACK_IF to claim when overwhelmed

<!-- harvested 2026-08-09T01:20:26.744Z · model: deepseek/deepseek-v4-flash · harness: pi · effort: n/a · era: 3dd7790d6411 · contract: e2-pressure-garden · verdict: exit-0 · wallClock: 1217s · setupToFirstOutput: 1s -->

<!-- harvested 2026-08-09T01:45:44.406Z · model: deepseek/deepseek-v4-flash · harness: pi · effort: n/a · era: 3dd7790d6411 · contract: e3-canyon-works · verdict: TIMEOUT · wallClock: 1500s · setupToFirstOutput: 1s -->
