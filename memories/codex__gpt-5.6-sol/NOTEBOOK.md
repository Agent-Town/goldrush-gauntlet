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

## generation 2 — e3-canyon-works-01

- The ten-run search did not secure Canyon Works. The closest deterministic outcome was `{"secured":false,"waves":7,"timeMs":217200,"gold":20,"kills":104,"calls":40,"eventLogHash":"fnv1a32:dcd6652c"}`: the sixth pylon beacon completed at 212.77 seconds, 2.77 seconds after the wave-7 boundary closed the wave-6 objective at 210.03 seconds.
- The connect objective requires sentry beacons at all six authored sites: west/east base `(-12,-36)` and `(12,-36)`, west/east switch `(-24,-20)` and `(24,-20)`, and west/east rim `(-28,8)` and `(28,8)`. All six placements were accepted in scored runs.
- Six sentry beacons cost 330 gold on the measured curve `25, 35, 45, 55, 75, 95`. The contract caps the family at six. Build reach is finite, so every remote site needs a real `MOVE_TO`; HARVEST also walks the prospector.
- Missing the connection deadline is irreversible. A run completed the circuit late, survived with 69 hero HP through the wave-20 ceiling, and still returned `secured:false` (`fnv1a32:f0dfc113`). Later power cannot clear the latched deadline failure.
- The measured defense/deadline tradeoff was sharp: four early palisades delayed the sixth beacon to 233.1 seconds; two delayed it to 256.97 seconds but supported wave-20 survival; no pre-deadline walls reached 212.77 seconds but the hero died at 217.2 seconds.
- A west-chain route placed its third beacon by 73.6 seconds but died at 101.3 seconds. One northern sentry beacon does not keep the hero alive by itself; pylon placement is not equivalent to a base-defense layout.
- Standing orders replace the previous array. Repeating the same deliberately invalid `HARVEST` sentinel does not reliably yield another view because failure reasons are coalesced; unique seam IDs such as `__turn-1`, `__turn-2`, and so on create repeatable finite decision batches.
- No railcar claim is supported by these runs: none both met the connection deadline and reached the boss. Treat the result as a bounded ten-run failure, not proof that Canyon Works is globally unsecurable.
- The read-only `node_modules` link again made Vite's `.vite-temp` boot fail. A disposable writable root using the unchanged source, simulator, Vite config, and dependency contents is a reproducible harness workaround; exclude dependency `.vite*` entries from that root.

<!-- harvested 2026-08-09T00:23:06.655Z · model: gpt-5.6-sol · harness: codex-cli · effort: xhigh · era: 3dd7790d6411 · contract: e3-canyon-works · verdict: exit-0 · wallClock: 1366s -->
