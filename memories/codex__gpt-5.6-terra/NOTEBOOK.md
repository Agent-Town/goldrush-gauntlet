# Notebook — codex__gpt-5.6-terra
(empty — first generation pending)

<!-- harvested 2026-08-08T15:10:42.254Z · model: gpt-5.6-terra · harness: codex-cli · era: 3dd7790d6411 · contract: e1-baron · verdict: exit-1 -->

## generation 1

- `e1-baron-01` starts the hero at `(0,12)`; legal bank construction in the tested camp is north of the river at `z >= 7`. Evidence: the live headless view and direct `Terrain.isBuildable` survey.
- Headless construction range is measured from the Prospector embodiment, not the hero. A build plan submitted after the Prospector mined a remote seam was rejected as `out_of_zone`; issuing `MOVE_TO (0,12)` first made all 29 tested coordinates legal.
- One `HARVEST` standing order completes after one five-gold action. Repeating it seven times mines a 30-gold seam and the seventh order fails after depletion, producing a new decision view with another active seam.
- The final tested enclosure used 20 palisades, four turrets, four beacons, one stockpile, and repeated repair orders. On `e1-baron-01` it reached wave 20 with 861 kills but did not secure, so this layout is a survival baseline rather than a winning policy.
- In this clone, Vite's shared `node_modules` is read-only. The standalone player needs the local `crack-vite-loader.mjs` config-file bypass and `.crack-vite-cache` to start `gr-sim` without mutating shared dependencies.

<!-- harvested 2026-08-08T15:55:37.774Z · model: gpt-5.6-terra · harness: codex-cli · era: 3dd7790d6411 · contract: e1-baron · verdict: exit-0 -->

<!-- effort-law backfill 2026-08-09: effort: xhigh · wallClock: ~1210s (boss fight to w20, 557 calls) -->

## generation 2

- A `BUILD` whose gold threshold is not yet met must not share an order set with `HARVEST`: once harvesting moves the Prospector to a seam, the waiting build can become actionable there and is rejected as `out_of_zone`. Evidence: runs 1–4 failed from wave 5 after this exact order sequence.
- The safe loop is: build only from gold already held, then harvest a full six five-gold pans, then `HOLD (0,12)` so the next construction turn starts home. Evidence: the phase-separated rider eliminated the range rejection and reached waves 7–14.
- On `e1-baron-01`, the best generation-2 result was run 7: wave 14, 502 kills, 379767 ms, event hash `fnv1a32:fecb1652`. It used four beacons before the turret ramp and no full enclosure; both a turret-first policy (wave 12) and a twelve-wall-first policy (wave 14, 496 kills) were worse on kills or held no longer.
- Ten generation-2 runs were attempted and none secured. The final required outcome was wave 13, 427 kills, `fnv1a32:850a82a9`; do not claim a standing from this generation.

<!-- harvested 2026-08-09T00:00:20.621Z · model: gpt-5.6-terra · harness: codex-cli · effort: xhigh · era: 3dd7790d6411 · contract: e1-baron · verdict: exit-0 · wallClock: 1105s -->
seam-2`, each holding 30 gold in six five-gold pans.
- The unbuilt harvest baseline reached wave 5 with 104 kills and 180 gold; it cannot secure. The Claim's published secure boundary is wave 10, with four-edge pressure.
- The available early roster is two-or-more sentry beacons (cost curve 25, 35, ...) and turrets (50, 70, 95, ...). The next policy uses the north-bank cluster around the claim rather than carrying blocked builds through a harvest phase.
- The first successful policy bought two beacons at `(-3,11)` and `(3,11)`, then turrets at `(-3,14)` and `(3,14)`, while repeatedly panning six actions and returning to the claim. It secured wave 10 with 296 kills and 60 gold.
- Upgrade drafts were answered immediately with the offered first option; `defaultedPicks: 0` and `defaultedSecure: 0`. Stop here: run 2 is the first SECURE.

<!-- harvested 2026-08-09T00:00:20.621Z · model: gpt-5.6-terra · harness: codex-cli · effort: xhigh · era: 3dd7790d6411 · contract: e1-baron · verdict: exit-0 · wallClock: 1105s -->
 4 but still died at that wave because its first purchase waited for wave 6. The simulation's threat curve makes that gate fatal; defenses must be allowed as soon as their price is held.
- Six ordered pans followed by a return hold reliably converts the active seam into an early build budget without leaving the Prospector stranded for the next construction phase.

## generation 4 — era d599cd3e

- Pulling the first beacon and turret forward produced a material improvement: wave 11, 322 kills, 195 gold, and 42 decision calls. The selected sites and move-then-build phase are legal and effective.
- The run still failed before the wave-20 secure boundary, so remaining work is resilience (repair, coverage, or upgrade priority), not economy or basic placement.

## generation 5 — era d599cd3e

- The diagnostic replay exposed the real wave-11 failure: the plan's duplicate-kind counter made every later beacon/turret look like the first, leaving only one beacon and one turret built while 195 gold remained banked.
- Both works held at full health through wave 8, then the lone beacon was wrecked and the Prospector fell at wave 11. Correct instance accounting plus repair precedence is the minimal corrective, rather than changing the proven sites or economy loop.

## generation 6 — era d599cd3e

- The corrected instance counter built the expanded defensive curve and advanced the result to wave 12 with 371 kills, 105 gold, and 43 calls. It still did not reach the wave-20 secure boundary.
- Six permitted runs are now complete. The remaining issue is combat resilience after the expanded build order, not a rejected input or missed Same-Game decision; stop without submitting a standing.
seam-2`, each holding 30 gold in six five-gold pans.
- The unbuilt harvest baseline reached wave 5 with 104 kills and 180 gold; it cannot secure. The Claim's published secure boundary is wave 10, with four-edge pressure.
- The available early roster is two-or-more sentry beacons (cost curve 25, 35, ...) and turrets (50, 70, 95, ...). The next policy uses the north-bank cluster around the claim rather than carrying blocked builds through a harvest phase.
- The first successful policy bought two beacons at `(-3,11)` and `(3,11)`, then turrets at `(-3,14)` and `(3,14)`, while repeatedly panning six actions and returning to the claim. It secured wave 10 with 296 kills and 60 gold.
- Upgrade drafts were answered immediately with the offered first option; `defaultedPicks: 0` and `defaultedSecure: 0`. Stop here: run 2 is the first SECURE.

<!-- harvested 2026-08-09T00:00:20.621Z · model: gpt-5.6-terra · harness: codex-cli · effort: xhigh · era: 3dd7790d6411 · contract: e1-baron · verdict: exit-0 · wallClock: 1105s -->

## generation 1 — era e1-night-shift

- Ended unsecured at wave 20; the rider used live seam availability, immediate draft picks, and blast at the final view.

## generation 1 correction — era d599cd3e

- The first current-era run died at wave 20 with 200 gold unspent. The next run therefore keeps the same successful harvest and draft loop, but spends that reserve on the remaining two beacons before adding a short north-bank palisade line.

## generation 2 correction — era d599cd3e

- Repeating the extended tail plan produced the identical event hash and still died at wave 20, proving that those tail builds are never reached before the loss. Move the four-turret ramp ahead of the optional beacon coverage so it lands before the darkness peak at wave 10.

## generation 3 — era d599cd3e

- Front-loading the turret ramp ended one wave earlier (19 instead of 20), so the original interleaved beacon/turret schedule remains the better economy-defense balance. Darkness speeds only wreckers outside light; turret targeting itself remains intact, so test the higher single-target Spark Rig before paying for the nearby lamp repair.

## generation 4 — era d599cd3e

- The Spark Rig experiment died at wave 18, two waves sooner than the blast policy; restore blast selection. The next direct lever is a single eight-gold repair of the nearest wrecked lamp, which reduces the declared 1.18x Night Shift wrecker speed outside light without changing the proven defense schedule.

## generation 2 — era d599cd3e

- Ended unsecured at wave 20; the rider used live seam availability, immediate draft picks, and blast at the final view.

## generation 3 — era d599cd3e

- Ended unsecured at wave 19; the rider used live seam availability, immediate draft picks, and blast at the final view.

## generation 4 — era d599cd3e

- Ended unsecured at wave 18; the rider used live seam availability, immediate draft picks, and rig at the final view.

## generation 5 — era d599cd3e

- Ended unsecured at wave 21; the rider used live seam availability, immediate draft picks, and blast at the final view.

## generation 5 correction — era d599cd3e

- One local lamp repair extended the run to wave 21 with 999 kills. Use the final permitted run to complete that local light corridor with the one remaining lantern-post slot at the south approach; the 196 unspent gold makes its 15-gold cost safe.

## generation 6 correction — era d599cd3e

- The local lantern-post corridor held wave 21 rather than reaching dawn, though it improved the same-wave kill count to 1,006. The six-run allowance is exhausted; retain this as the best outcome and do not call it secured.

## generation 6 — era d599cd3e

- Ended unsecured at wave 21; the rider used live seam availability, immediate draft picks, and blast at the final view.

## generation 1 — era d599cd3e · e1-twin-banks

- The south stake is `(0,-12)`, but its hero position is flat `{x,z}` rather than nested under `pos`; failing to read that shape sent the Prospector to `(0,0)` before the first build.
- `gold-seam-1` is far west of the stake and six pans there left the rider at 44 HP before the first draft. The near active `gold-seam-3` is the correct first economy target.
- The first run ended wave 1 with 30 gold and no works. The next policy must stop harvesting as soon as it can afford a first beacon and return to the south stake to build.

## generation 2 — era d599cd3e · e1-twin-banks

- Reading the flat hero coordinates and sorting active seams by the declared map positions fixed the economy loop: the rider built beacons at `(-3,-11)` and `(3,-11)` and reached wave 4.
- It still reached the first 50-gold turret threshold only as the Prospector died at 12 HP. Keep the valid home-return/build sequencing; test the automatic 16wu Spark Rig rather than short-range Blast while that threshold accumulates.

## generation 3 — era d599cd3e · e1-twin-banks

- `SET_WEAPON rig` is the decisive early survival choice: it preserved 76 HP through the second beacon, enabled the first turret on wave 5, and the deterministic policy secured wave 20.
- The secured build curve completed four beacons and four turrets around the south stake. First-offer upgrades and explicit `SECURE_CHOICE bank` produced `defaultedPicks: 0` and `defaultedSecure: 0`.
- Final outcome: secured, 20 waves, 922 kills, 10 gold, 73 calls, `fnv1a32:947dca3a`. Stop after this first secure as required.

## generation 6 — era d599cd3e · e1-baron-01 current rider

- Runs 1–3 died at wave 5 with 81 kills because the rider read `now.activeSeams`; the current live field is `now.seams`, so no harvest orders were installed.
- Run 4 reached wave 9 (258 kills, 45 gold) but a shared kind counter treated every later planned work as its first instance, leaving only one beacon and one turret.
- Run 5 reached wave 10 (281 kills, 96 gold); unconditional `REPAIR_UNDER` blocked later harvest orders even with no eligible repair, stranding the build budget.
- Run 6 removed that selector and used automatic Blast Charge. It is the best current result: unsecured at wave 12, 388 kills, 27 gold, 34 calls, `fnv1a32:c1e4e863`.
- The six-run allowance is exhausted. The next material lever is defense density before wave 12, not another repair-order variation.
