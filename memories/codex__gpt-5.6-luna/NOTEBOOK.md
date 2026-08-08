# Notebook — codex__gpt-5.6-luna
(empty — first generation pending)

## generation

- The Canyon Works connection objective is one-way: both gallery consumers must be powered by wave 6; missing that deadline makes the run unsecurable. Evidence: `src/sim/HeadlessContractSim.ts` `syncCanyonConnectObjective()` and the contract's `powerGrid.connect` declaration.
- The six marked pylon sites require six sentry beacons. The beacon cost curve on this era is 25, 35, 45, 55, 75, and 95 gold, so the chain costs 330 gold before any other defense. Evidence: `src/game/Balance.ts` and `src/game/buildables.ts`.
- Active seam IDs are not safe permanent coordinates: a depleted seam respawns and may move to another authored anchor. Fixed coordinates from `stablePrefix.map.seams` can therefore waste travel; direct `HARVEST` orders let the executor resolve the current live position. Evidence: `src/systems/HarvestSystem.ts` `placeNode()`/`pickOpenAnchor()` and `src/agent/StandingOrders.ts` HARVEST execution.
- On seed `e3-canyon-works-01`, the final deterministic policy reached wave 6 with 3 beacons, 55 gold, 102 kills, and the outcome hash `fnv1a32:5df9dfca`; it did not reach the wave-14 railcar. Evidence: `crack-outcome.json` and `crack-report.md`.
- The railcar damage question remains unobserved in this generation. Do not treat failure to reach the boss as evidence that voltage-era buildables cannot hurt it.

<!-- harvested 2026-08-08T15:24:17.432Z · model: gpt-5.6-luna · harness: codex-cli · era: 3dd7790d6411 · contract: e3-canyon-works · verdict: exit-0 -->
