# Notebook — codex__gpt-5.6-luna
(empty — first generation pending)

## generation

- The Canyon Works connection objective is one-way: both gallery consumers must be powered by wave 6; missing that deadline makes the run unsecurable. Evidence: `src/sim/HeadlessContractSim.ts` `syncCanyonConnectObjective()` and the contract's `powerGrid.connect` declaration.
- The six marked pylon sites require six sentry beacons. The beacon cost curve on this era is 25, 35, 45, 55, 75, and 95 gold, so the chain costs 330 gold before any other defense. Evidence: `src/game/Balance.ts` and `src/game/buildables.ts`.
- Active seam IDs are not safe permanent coordinates: a depleted seam respawns and may move to another authored anchor. Fixed coordinates from `stablePrefix.map.seams` can therefore waste travel; direct `HARVEST` orders let the executor resolve the current live position. Evidence: `src/systems/HarvestSystem.ts` `placeNode()`/`pickOpenAnchor()` and `src/agent/StandingOrders.ts` HARVEST execution.
- On seed `e3-canyon-works-01`, the final deterministic policy reached wave 6 with 3 beacons, 55 gold, 102 kills, and the outcome hash `fnv1a32:5df9dfca`; it did not reach the wave-14 railcar. Evidence: `crack-outcome.json` and `crack-report.md`.
- The railcar damage question remains unobserved in this generation. Do not treat failure to reach the boss as evidence that voltage-era buildables cannot hurt it.

<!-- harvested 2026-08-08T15:24:17.432Z · model: gpt-5.6-luna · harness: codex-cli · era: 3dd7790d6411 · contract: e3-canyon-works · verdict: exit-0 -->

<!-- effort-law backfill 2026-08-09: effort: high · wallClock: ~800s -->

- Era `d599cd3e`, seed `e1-the-claim-02`: the first usable deterministic policy secured wave 10 with 296 kills and 200 gold; it made 41 order submissions and defaulted neither upgrades nor the secure choice. Evidence: `outcome.json` and `report.md`.
- Repeated direct `HARVEST` orders against the fullest active seam are useful because they let the executor resolve the seam's live position; when a seam is exhausted, the next view can choose another active seam. Evidence: `player.mjs` and the run outcome.
- A compact build sequence of four turrets followed by beacons, with repairs before harvesting and one affordable build per view, was sufficient on this claim. The fixed policy used the rig through wave 5 and blast from wave 6, then banked at the secure boundary. Evidence: `player.mjs` and `report.md`.

### generation — era d599cd3e, seed e1-dry-gulch-01

- First real policy run secured nothing: it reached wave 4, built two palisades, and the rider died at 133967ms with 46 kills and 1 gold. Cheap palisades consumed the first available cash before any damage work was online.
- The current Dry Gulch view exposes build costs and live seam state; the next policy revision prioritizes sentry beacons, then turrets, and only then palisades.
- Run 3 matched run 2 exactly: merely ordering beacons first still fell through to palisades while the beacon threshold was unaffordable. Reserve logic is required; the revised policy waits for two beacons and uses charged `BLAST_AT` for early crowd damage.
- Run 4 secured wave 20 with two sentry beacons, charged `BLAST_AT`, rig through wave 5, blast from wave 6, 188 kills, 56 gold, and no defaulted decisions. Evidence: `outcome.json` and `report.md`.

### generation — era d599cd3e, seed e1-night-shift-01

- Run 1 reached wave 22 with 1100 kills and 200 gold before ending unsecured; the next revision should change the build/harvest priority.
- Run 2 reached wave 24 with 1216 kills and 586 gold before ending unsecured; late hero survival was the limiting factor, not gold.
- Run 3 reached wave 23 with 1126 kills and 588 gold because movement used `now.hero` instead of `now.prospector`, leaving late builds and harvests out of reach.
- Run 4 secured wave 25 with 1246 kills, 422 gold, 193 order calls, and 0 defaulted picks; using the Prospector position for build routing and banking explicitly closed the run.

### generation — era d599cd3e, contract e1-twin-banks

- Run 1 reached wave 3 with 20 gold and 43 kills before the rider died. Four-turret-first delayed the first affordable defense because this seed's direct seam routing produced gold too slowly; the next policy must reserve for the 25-gold beacon before waiting for a 50-gold turret.
- Run 2 harvested all currently active seams per view and built two beacons, reaching wave 4 with 30 gold and 74 kills. The extra harvest funded the beacons, but beacon-only defense still collapsed before wave 5; next run accelerates the first turret after one beacon.
- Run 3 built one beacon before turrets and switched to blast at wave 3, but still died at wave 4 with 40 gold and 75 kills. The near-identical result indicates the surviving bottleneck is movement/build execution or hero positioning, not just weapon timing; inspect boundary state before the final policy change.
- Debug trace confirmed the combat hero remains at the south stake while the Prospector travels to seams and build sites. The next policy must keep a nearby work alive as a sink while automatic blast handles the stationary hero's local crowd.
- Run 5 confirmed that blast-from-start is too weak for the first wave: the rider died at wave 1 with 6 kills, 10 gold, and 0 defaults. It also exposed that “nearest” must mean nearest to the combat hero for defensive placement, while movement still routes from `now.prospector`.
- Run 6 restored rig-through-wave-2 and hero-centered placement, reaching wave 4 with 65 kills and 20 gold. The six-run cap is exhausted without a secure; the remaining gap is an early stationary-hero defense that both survives wave 4 and preserves enough gold for the first turret.

### generation — era d599cd3e, seed e1-baron-01

- Run 1 reached wave 5 and died with 72 kills, 30 gold, and no order rejections. One `HARVEST` order completes after one pan tick, so a one-seam policy never funded the first 50-gold turret; queue all active seam ids in each replacement so completed harvests fall through to the next live seam.

- Run 1 (d599cd3e) on e1-baron/e1-baron-01: not secured at wave 5, 72 kills, 30 gold, 11 order calls, 0 defaulted picks, 0 defaulted secure choices.

- Run 2 (d599cd3e) on e1-baron/e1-baron-01: not secured at wave 9, 253 kills, 44 gold, 25 order calls, 0 defaulted picks, 0 defaulted secure choices.

- Runs 3 and 4 reached wave 5 with the same 72 kills and 200 gold but no works: the proposed sluice target snapped to about `z=6.09`, which is shallows and fails `out_of_zone`. Bank ground begins above `z=6.25`; move the sluice target to `z=7`.

- Run 5 built the sluice, four turrets, and two beacons; it reached wave 16 with 624 kills, 187 gold, and 6 hero hp before death. The late failure is stationary-hero pressure after the damage package is online; use spare gold for palisade sinks and repair any work below full health.

- Run 3 (d599cd3e) on e1-baron/e1-baron-01: not secured at wave 5, 72 kills, 200 gold, 21 order calls, 0 defaulted picks, 0 defaulted secure choices.

- Run 4 (d599cd3e) on e1-baron/e1-baron-01: not secured at wave 5, 72 kills, 200 gold, 21 order calls, 0 defaulted picks, 0 defaulted secure choices.

- Run 5 (d599cd3e) on e1-baron/e1-baron-01: not secured at wave 16, 624 kills, 187 gold, 87 order calls, 0 defaulted picks, 0 defaulted secure choices.

- Run 6 (d599cd3e) on e1-baron/e1-baron-01: not secured at wave 16, 633 kills, 195 gold, 120 order calls, 0 defaulted picks, 0 defaulted secure choices.
