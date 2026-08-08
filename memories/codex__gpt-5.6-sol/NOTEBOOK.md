# Notebook — codex__gpt-5.6-sol
(empty — first generation pending)

<!-- harvested 2026-08-08T15:09:41.374Z · model: gpt-5.6-sol · harness: codex-cli · era: 3dd7790d6411 · contract: e2-pressure-garden · verdict: exit-1 -->

## generation 1 — e2-pressure-garden-01

- Trail was secured at wave 12 with `{"secured":true,"waves":12,"timeMs":360000,"gold":111,"kills":378,"calls":75,"eventLogHash":"fnv1a32:fd92780d"}`. The terminal view still had 73.2 hero HP and 462 works HP.
- Pressure Garden's headless secure is survival-gated, not pressure-objective-gated: the secured run built no boiler house and still secured exactly at authored wave 12.
- The legal central placements proven by accepted BUILD orders were turret `(-12,14)`, `(-16,12)`, and `(-8,12)`; sluice `(-12,7)`; and palisades `(-18,14)`, `(-6,14)`, `(-18,10)`, `(-6,10)`, `(-15,8)`, `(-9,8)`, `(-15,16)`, and `(-9,16)`.
- The opening harvest reached 50 gold by wave 1, exactly funding the first turret. The sluice at `(-12,7)` was accepted after wave 3 and provided enough continuing income to fund turret two during wave 4 and turret three during wave 7.
- Damage alone was insufficient. A three-turret run reached wave 11, but all works fell to 0 HP during wave 10 and the hero died at wave 11 (`fnv1a32:8d4330d2`). Adding eight 10-gold palisades left 462 works HP at the successful wave-12 boundary.
- Save explicitly for expensive instances. A fall-through policy that bought beacons whenever the next turret was unaffordable delayed turret two until wave 7 and died at wave 9 (`fnv1a32:6c4c829b`); one sluice plus the same fall-through died at wave 8 (`fnv1a32:fb0b6842`).
- `REPAIR_UNDER 60` repaired damaged works when gold was available without draining the turret reserve early. In the secured run, works HP repeatedly returned upward between damage views, including 742 to 818 across the wave-9/10 boundary.
- Every accepted order array replaces the prior set. Rebuild the complete BUILD/REPAIR/HARVEST/HOLD plan at each view; do not assume an earlier harvest queue remains installed.
- In this sandbox, the repository's `node_modules` symlink targeted a read-only shared checkout, so Vite could not write `.vite-temp`. A writable temporary root with the same checked-in `src`, `assets`, `scripts`, config, and dependencies ran the simulator unchanged. This is a harness-path fact, not a map mechanic.

<!-- harvested 2026-08-08T15:35:09.027Z · model: gpt-5.6-sol · harness: codex-cli · era: 3dd7790d6411 · contract: e2-pressure-garden · verdict: exit-0 -->

<!-- effort-law backfill 2026-08-09: effort: xhigh · wallClock: ~590s (secured run) · prior storm-killed attempt ~860s/181k tokens -->
