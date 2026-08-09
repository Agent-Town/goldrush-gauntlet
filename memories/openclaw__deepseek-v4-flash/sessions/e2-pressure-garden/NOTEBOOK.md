# Notebook — openclaw__deepseek-v4-flash
(empty — first generation pending)

<!-- harvested 2026-08-09T02:11:02.233Z · model: deepseek/deepseek-v4-flash · harness: openclaw · effort: n/a · era: 3dd7790d6411 · contract: e1-twin-banks · verdict: TIMEOUT · wallClock: 1500s · setupToFirstOutput: 3s -->

<!-- harvested 2026-08-09T02:36:19.876Z · model: deepseek/deepseek-v4-flash · harness: openclaw · effort: n/a · era: 3dd7790d6411 · contract: e1-night-shift · verdict: TIMEOUT · wallClock: 1500s · setupToFirstOutput: 3s -->

<!-- harvested 2026-08-09T03:01:39.101Z · model: deepseek/deepseek-v4-flash · harness: openclaw · effort: n/a · era: 3dd7790d6411 · contract: e1-baron · verdict: TIMEOUT · wallClock: 1500s · setupToFirstOutput: 3s -->

## generation 1 — e2-pressure-garden-01 (SECURED)

Ride by openclaw (c3) on 2026-08-09, trail difficulty, bench seed `e2-pressure-garden-01`. Secured on the first counted ride with `{"secured":true,"waves":12,"timeMs":360000,"gold":111,"kills":378,"calls":75,"eventLogHash":"fnv1a32:fd92780d"}`. Terminal boundary: 73.2 hero HP, 462 works HP, 3 turrets + 1 sluice + 8 palisades standing.

- **Survival is HP-gated, not pressure-gated.** The secure condition fires at authored wave 12; no boiler house was built and the pressure ledger was never fed. Do not build boilers for a headless trail secure.
- **Damage alone is insufficient.** A 3-turret run loses all works during wave 10 and dies at wave 11. The 8-palisade ring around the boiler terrace is the difference between wave 11 death and the wave-12 secure.
- **Exact build cadence (proven):** harvest to 50g → turret (-12,14); sluice (-12,7); save turrets 2/3 at (-16,12), (-8,12); then 8 palisades at (-18,14), (-6,14), (-18,10), (-6,10), (-15,8), (-9,8), (-15,16), (-9,16); then optional 4th turret (-12,9) + beacons.
- **Never fall through to beacons when a turret is unaffordable.** Saving the turret reserve is what lands turret 3 by wave 7. A beacon-fall-through policy died at wave 9.
- **Instance costs (ceil-to-5):** turret 50/70/95/125; sluice 40; palisade 10 flat; sentry_beacon 25/35/45/55/75/95.
- **REPAIR_UNDER 60** keeps works HP drifting back up between damage views without draining the build reserve.
- **Order arrays are replace-semantics.** Always resend the full standing plan (MOVE_TO+BUILD per placement, REPAIR, HARVEST, HOLD) at every view.
- **Determinism:** this seed replays identically; the same policy yields the same 378-kill wave-12 secure with hash `fnv1a32:fd92780d`.
- **Harness note:** the arena's `node_modules` symlink points at a shared read-only checkout, but `scripts/gr-sim.mjs` runs fine here from the repo root (no writable-root workaround needed for this policy).

<!-- harvested 2026-08-09T03:05:19.716Z · model: deepseek/deepseek-v4-flash · harness: openclaw · effort: n/a · era: 3dd7790d6411 · contract: e2-pressure-garden · verdict: exit-0 · wallClock: 203s · setupToFirstOutput: 3s -->

<!-- harvested 2026-08-09T03:30:37.392Z · model: deepseek/deepseek-v4-flash · harness: openclaw · effort: n/a · era: 3dd7790d6411 · contract: e3-canyon-works · verdict: TIMEOUT · wallClock: 1500s · setupToFirstOutput: 3s -->

## generation 2 — e2-pressure-garden-01 (re-verified, SECURED)

Second instance of the same bench seed (fresh arena clone, 2026-08-09). Reused the generation-1 policy unchanged; it re-secured on the first ride with the identical outcome `{"secured":true,"waves":12,"timeMs":360000,"gold":111,"kills":378,"calls":75,"eventLogHash":"fnv1a32:fd92780d"}`.

- **Confirms full determinism.** This seed and standing-orders policy replay byte-for-byte to the same 378-kill wave-12 secure across independent arena clones. No adaptation needed between runs.
- **The policy is a complete standing-order recipe, not an interactive driver.** MOVE_TO+BUILD per placement, then REPAIR_UNDER 60, then HARVEST each active seam, then HOLD at (-12,12). It needs no per-wave rethinking — just resend the full replace-semantics array each view.
- **Fresh-clone note:** the arena re-checkout did not carry over my c3-*.mjs outputs; they had to be recreated. The winning placements/costs should be treated as the durable artifact (they live in generation 1 + this one), not the transient files.
- No new defects observed; the map and door behaved identically.
