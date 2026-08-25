
## HEAT 3 the-claim (era d599cd3e, 2026-08-12) — from NOTEBOOK.md
LEARNED: secured at wave 10; 296 kills, 54 gold remaining, 0 defaulted draft picks, 0 defaulted secure choices. The live posting was secure@10. The line explicitly answered every draft, built a compact beacon/turret ring while harvesting, and banked the secure prompt.

## HEAT 3 e1-night-shift (era d599cd3e, 2026-08-12) — from NOTEBOOK.md
- Run 1, variant 1: died at wave 6 with 139 kills and 30 gold. Three sentry beacons plus early harvesting repeats the founding-crown failure exactly; beacons cannot carry the wave-6 damage spike. No draft or secure defaults occurred. Next: switch to blast weapon and turrets, retaining explicit draft and secure choices.
- Run 2, variant 2: blast weapon plus an unaffordable turret queue died at wave 2 (37 kills, 15 gold). Automatic blast alone is much weaker in the opening, and the first pending turret blocks all later standing orders because first-actionable order precedence makes waiting BUILD own the tick. Next: preserve the rig opening and use affordable beacons, then transition behavior later.
- Run 3, variant 3: standing at the claim with an affordability-gated turret/beacon policy died at wave 5 (95 kills, 0 gold). It avoided the waiting-order deadlock but produced less income and less survival than harvesting. The observed best remains run 1. Next: harvest accurately using map coordinates, build only at live boundaries, and retreat to claim under pressure.
- Run 4, variant 4: corrected seam coordinates and live affordability checks still died at wave 5 (95 kills, 30 gold). The turret threshold was never reached before combat overwhelmed the hero; income was too slow. Next: use the cheap palisade as a damage sink around the claim while keeping rig fire active.
- Run 5, variant 5: an eight-palisade ring increased time alive within wave 5 and kills to 110, but did not beat run 1's wave 6. Calls rose to 35 because movement/build attempts triggered extra boundaries; all choices remained explicit. Final attempt: exploit the run-1 beacon/harvest line but add palisade cover before its known wave-6 collapse.
- Run 6, variant 6: mixed beacons, palisade cover, harvesting, and early fallback reached wave 6 for 201.833s with 136 kills and 32 gold, narrowly becoming the best line by survival time but not securing. Six-run cap reached. Era-d599cd3e conclusion: static claim defense without stronger progression cannot cross the wave-6 spike; automatic blast is not an opening substitute for the rig, and waiting BUILD orders must never precede survival actions unless already affordable.

## generation 2 — 2026-08-25T12:33:00+07:00
model: gpt-5.6-sol · harness: Hermes 0.20.0 · effort: medium · era: d48987df2d50c643e854a2bf8a23b7f34b81c3de1cfd2e54999129b5660f7494 · contracts: the-claim
cost: wallClock 152s + 93s + 34s · setupToFirstOutput 43s / 22s / 20s · tokens/$ recorded in the retained per-call usage files

- Attempt 1 died at wave 2 after 81.767s with 36 kills and 20 gold; attempt 2 repeated the same death time and kill count with 5 gold. Neither defaulted a draft or secure choice.
- The rider's proposed lesson was to secure earlier, but the contract does not offer the secure choice until wave 10; this hypothesis is invalid and should not be re-burned without a concrete survival change.
- Attempt 3 produced no reel: the subscription shim returned HTTP 429 after three retries under concurrent field load. This is harness evidence, not a gameplay result.

## generation 3 — 2026-08-25T13:26:00+07:00
model: gpt-5.6-sol · harness: Hermes 0.20.0 · effort: medium · era: d48987df2d50c643e854a2bf8a23b7f34b81c3de1cfd2e54999129b5660f7494 · contracts: e1-night-shift
cost: wallClock 1224s + 103s + 1213s · setupToFirstOutput 33s / 40s / 45s · tokens/$ recorded in the retained per-call usage files

- Attempt 1 hit the wall at wave 4 with 53.6 HP and 20g; attempt 3 improved to wave 5 with 31.2 HP and 0g. Both repeatedly reinstalled immediate actions until the ~20-minute cap.
- Attempt 2 produced no reel after the shim returned HTTP 429 at wave 0.
- The carried almanac's compact-fort lesson did not transfer through this harness's order stream. The current bounded best is wave 5; do not claim the map secured.
