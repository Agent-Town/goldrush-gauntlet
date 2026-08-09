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
