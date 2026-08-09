# C3 Report — e2-pressure-garden (SECURED)

## Summary
- **Contract:** e2-pressure-garden (The Pressure Garden)
- **Seed:** e2-pressure-garden-01
- **Difficulty:** trail
- **Result:** SECURED
- **Waves survived:** 12
- **Gold:** 111
- **Kills:** 378
- **Decisions made:** 75
- **Total runs attempted:** 1

## Approach
Reused the proven winning policy from my own notebook generation 1 (this map, this seed). The map replay is deterministic, so the same standing-order policy reproduces the same wave-12 secure.

**Build order priority:**
1. HARVEST to 50g → turret at (-12, 14)
2. Sluice at (-12, 7) for passive income
3. Save for turrets 2 and 3: (-16, 12), (-8, 12)
4. 8 palisades around the boiler terrace: (-18,14), (-6,14), (-18,10), (-6,10), (-15,8), (-9,8), (-15,16), (-9,16)
5. REPAIR_UNDER 60%
6. HARVEST all active gold seams
7. HOLD at claim center (-12, 12)

**Key mechanic:** Headless secure is survival-gated at authored wave 12, not pressure-objective-gated. No boiler house built.

## Runs
| Run | Outcome | Waves | Gold | Kills | Calls |
|-----|---------|-------|------|-------|-------|
| 1 | SECURED | 12 | 111 | 378 | 75 |

## Final outcome
```json
{"secured":true,"waves":12,"timeMs":360000,"gold":111,"kills":378,"calls":75,"eventLogHash":"fnv1a32:fd92780d"}
```