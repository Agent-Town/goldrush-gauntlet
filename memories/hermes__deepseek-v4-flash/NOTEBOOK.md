# Notebook — hermes__deepseek-v4-flash

## generation

**Date:** 2026-08-09
**Contract:** e1-twin-banks
**Seed:** e1-twin-banks-01
**Outcome:** NOT SECURED (6 runs, all died at wave 3)

### Facts with evidence

1. **Build zone boundaries are essential but not in the view.** South bank build zone: `z ∈ [-30, -7]` (from `contracts.json`). Attempting builds at z > -7 fails with `invalid_position`. The view's `mechanics.rules` only says `banks: ["north","south"]` — not the actual AABB. Future rides must either read the contract JSON directly or probe positions.

2. **goldGte must equal the buildable cost, not 0.** When `goldGte: 0`, a BUILD order is always "actionable" (the condition gold≥0 is trivially met). The sim attempts to build, fails with `insufficient_gold`, but the failed order consumes the tick. HARVEST (placed after BUILD in the array) never fires, so gold never accumulates. Set `goldGte: <cost>` so the order only activates when gold is genuinely sufficient.

3. **Gold income is ~5 g/cycle from prospector harvest.** With ~2 cycles per 30-second wave, that's ~10g/wave. The almanac projects ~56g/wave — this assumes sluice/boiler house passive income that requires surviving ≥8 waves to afford (sluice=40g). Without a sluice, 50g for a turret takes 5 waves — but enemies kill the hero in 3.

4. **Orders are replace-semantics.** Every order array REPLACES all previous orders. Never send `[]` unless you mean to stand down. Every array must resend every order still wanted.

5. **Mid-wave `needsRider` views are decision opportunities.** When a BUILD fails, the sim emits a mid-wave view with `needsRider: true`. The agent should respond with a revised order set, not repeat the same failing order. Each mid-wave decision advances the HARVEST cycle, so gold grows with each interaction.

6. **`now.orders` carries execution status.** Check `now.orders[].status` and `now.orders[].reason` to know what succeeded, failed, or is pending. A `failed` order with `reason: "FAILED (invalid_position)"` means the coordinates are outside the build zone — try different positions.

7. **The `works.byKind` dict is ground truth for build counts.** Do not maintain local counters — read `now.works.byKind` from every view to know what's actually standing.

<!-- harvested 2026-08-09T02:06:38.072Z · model: deepseek/deepseek-v4-flash · harness: hermes · effort: n/a · era: 3dd7790d6411 · contract: e1-twin-banks · verdict: exit-0 · wallClock: 932s · setupToFirstOutput: 932s -->

<!-- harvested 2026-08-09T02:31:55.868Z · model: deepseek/deepseek-v4-flash · harness: hermes · effort: n/a · era: 3dd7790d6411 · contract: e1-night-shift · verdict: TIMEOUT · wallClock: 1500s · setupToFirstOutput: nulls -->

<!-- harvested 2026-08-09T02:57:14.526Z · model: deepseek/deepseek-v4-flash · harness: hermes · effort: n/a · era: 3dd7790d6411 · contract: e1-baron · verdict: TIMEOUT · wallClock: 1500s · setupToFirstOutput: nulls -->

## generation

**Date:** 2026-08-09
**Contract:** e2-pressure-garden
**Seed:** e2-pressure-garden-01
**Difficulty:** trail
**Outcome:** NOT SECURED (6 runs, all died at wave 4)

### Facts with evidence

1. **Boiler houses cannot generate pressure in headless sim.** The `PressureSystem.harvestCoal()` checks actors (the hero) within 1.35 units of coal seams at (-12,39), (-5,43), (3,39). But the hero is fixed at (-12,12) — the claim — and never moves. The MOVE_TO order only affects the Prospector (via `Embodiment.updateSimulation` consuming `{movement}`). The hero updates with `IDLE_INTENTS` in `HeadlessContractSim.step()`. Therefore, coal can never be harvested, boilers get zero fuel, and pressure generation is impossible. Source: `HeadlessContractSim.ts:621,636`, `Embodiment.ts:129-133`, `PressureSystem.ts:170-179`.

2. **BuildSystem place-radius origin is the prospector, not the hero.** `new BuildSystem(..., this.prospector.position, ...)` at `HeadlessContractSim.ts:297` uses the prospector's position as the range check origin. With `placeRadius=6` for non-special buildings, the prospector must be within 6 units of the build target. When the prospector is at a gold seam (-30,24) and the agent tries to build at (-12,12), the distance is ~25 units → `invalid_range` → `out_of_zone` failure. BUILD orders must specify positions near where the prospector will be (i.e., near the seams). Source: `HeadlessContractSim.ts:297`, `BuildSystem.ts:1602-1612`, `Balance.ts:524`.

3. **e2-pressure-garden has no defensive buildables.** The contract's buildables roster only declares `boiler_house` (cost=70, maxCount=3). There are no palisades, turrets, sentry_beacons, or sluices. Combined with issue #1 (boilers generate no pressure/defense), the hero has NO way to mitigate incoming damage. The only defensive mechanic is the 80 HP per boiler house as a Steam Wrecker distraction. Source: contract view `stablePrefix.mechanics.buildables`.

4. **Trail difficulty hero death at wave 4 is a hard wall.** Every run (idle, harvest-only, 1 boiler, 2 boilers) dies at ~149s (wave 4) with hero HP going 100→76→76→28→0. Wave 4 composition (5 Rail Toughs + 4 Coal Thieves + 9+ Steam Wreckers) with `enemy.hp=25.2` overwhelms a 100-HP hero with spark upgrades. Without defensive structures that don't exist in this contract, wave 4 is a death floor.

5. **The contract briefing contradicts available mechanics.** It mentions "a broad north bank for legal sluice work" but `sluice` is not in the contract's buildables. The water agreement has `sluiceSamples` at (-30,7), (-12,7), (12,7), (30,7) but no sluice buildable is declared.

6. **Determinism confirmed.** Multiple runs with identical input produce identical output (same `eventLogHash`, same outcome line, same wave 4 death). The sim is deterministic per seed.

<!-- harvested 2026-08-09T07:20:00.000Z · model: deepseek/deepseek-v4-flash · harness: hermes · effort: n/a · era: 3dd7790d6411 · contract: e2-pressure-garden · verdict: exit-0-not-secured · wallClock: 1080s · setupToFirstOutput: 12s -->

<!-- harvested 2026-08-09T03:19:49.553Z · model: deepseek/deepseek-v4-flash · harness: hermes · effort: n/a · era: 3dd7790d6411 · contract: e2-pressure-garden · verdict: exit-0 · wallClock: 1337s · setupToFirstOutput: 1337s -->

## generation

**Date:** 2026-08-09
**Contract:** e3-canyon-works
**Seed:** e3-canyon-works-01
**Difficulty:** trail
**Outcome:** NOT SECURED (6 runs, all died at wave 3)

### Facts with evidence

1. **3× HARVEST orders = 15g per trip (undocumented).** Multiple identical
   HARVEST orders each call pan_at once (observed: gold went 0→15 in single
   wave with 3 orders). This is the only way to get >5g per trip. Source:
   `StandingOrders.ts:225-238` — each HARVEST is a separate record evaluated
   sequentially; after first HARVEST is "done", the next fires on the next tick
   while prospector is still at the seam (distance < arriveRadius).

2. **First sentry beacon costs 25g, hero dies at wave 3 (101.6s).** With
   15g/wave income, 25g requires 2 waves. But hero HP reaches 0 at wave 3
   even with 3 palisades blocking chokepoints (0,-48), (-4,-30), (4,-30).
   Palisades absorb some damage but don't prevent hero death by wave 3.

3. **BUILD fires immediately upon gold condition, regardless of range.**
   If goldGte=25 and gold reaches 25 after HARVEST pans, BUILD fires and
   calls place_building while the prospector is still at the seam (~25 units
   from the pylon site). The build fails with `invalid_range`, the order is
   marked "failed", and it never retries — even when the prospector drifts
   within range later. Source: `StandingOrders.ts:142-152` — records with
   status 'failed' are skipped on subsequent ticks.

4. **Workaround: MOVE_TO before BUILD forces positioning.** Place MOVE_TO
   targeting a position within 6 units of the build site BEFORE the BUILD
   order. MOVE_TO fires first (walking the prospector). Once arrived and
   MOVE_TO is done, BUILD fires with the prospector in range. Then HARVEST
   walks to the seam for gold generation. The full cycle: MOVE_TO → BUILD →
   HARVEST×N → MOVE_TO → BUILD succeeds on second MOVE_TO arrival. This
   costs ~11s of walking per pylon but is the only reliable build method.

5. **Full west pylon chain costs 105g (25+35+45 = 7 waves at 15g/wave).**
   Hero dies at wave 3. This contract's gold economy and survival timeline
   are unmatched at trail difficulty through the headless sim door. The e2e
   test (`e2e/e3-canyon-works.spec.ts`) cheats by granting 1000g and using
   `placeFree`, confirming the intended build sequence is all 6 pylons but
   the sim doesn't provide viable gold-income-to-survival ratio.

6. **Prospector drift wastes ~60% of panning time.** After HARVEST completes,
   the Embodiment's driftNearHero (0.9s work timer, then drift at 3.48 units/s)
   pulls the prospector from the seam (-34,30) toward the hero (-1.8,-45).
   Round-trip: 9s walk to seam + 0.17s (3 pan ticks) + ~16s drift back + 
   next-cycle walk. Only ~33% of time is productive. Source:
   `Embodiment.ts:137-144` — drift activates on `workRemaining=0`.

<!-- harvested 2026-08-09T09:45:00.000Z · model: deepseek/deepseek-v4-flash · harness: hermes · effort: n/a · era: 3dd7790d6411 · contract: e3-canyon-works · verdict: exit-0-not-secured · wallClock: 600s · setupToFirstOutput: 6s -->

<!-- harvested 2026-08-09T03:40:14.483Z · model: deepseek/deepseek-v4-flash · harness: hermes · effort: n/a · era: 3dd7790d6411 · contract: e3-canyon-works · verdict: exit-0 · wallClock: 1207s · setupToFirstOutput: 1207s -->
