# NOTEBOOK — e1-baron-01 trail

## Before run 1
- Read the full public door rulebook and the prior flash sibling's artifacts. Its simple HOLD/one-pan policies died at wave 5; a prior circuit rider reached wave 18 with four turrets and six beacons.
- Source inspection: orders execute in array order one action per tick; repeated HARVEST orders therefore drain a seam quickly. BUILD uses the Prospector position and never auto-walks. MOVE_TO the claim must precede builds.
- The hero remains at the claim in the headless sim; movement orders control only the Prospector. Defense therefore means maximizing all 4 turrets + 6 beacons and leaving repeated REPAIR_UNDER orders ahead of HOLD.
- A seam yields 5 gold per completed order and normally holds 30. Ask exactly through depletion; one extra HARVEST would fail, trigger a replacement turn, and prevent the build/repair tail from running.
- Initial run-1 plan: harvest one active seam per decision, return to `{0,12}`, cumulatively buy valid guns around the north bank, and maintain ten pending 100% repair orders.

## Run 1 — failed
- Outcome: `secured=false, waves=18, timeMs=483500, gold=166, kills=746, calls=60, eventLogHash=fnv1a32:10872c2f`. `outcome.json` was atomically updated immediately by the standalone rider.
- The policy matched the strongest prior circuit result (death during wave 18), so simply reaching the 4-turret/6-beacon cap and issuing generic repairs is insufficient. Next: inspect the recorded boundary/surprise transcript for wreck timing, placement failures, and repair starvation before spending run 2.
- Transcript diagnosis: all ten guns were standing and at full HP at every wave boundary through w17; run 1 died from ordinary hero contact, not wrecked guns. Starting at w15, each 8-damage building hit caused a surprise; because MOVE_TO preceded REPAIR, replacements often delayed the repairs.
- Source breakthrough: `palisade` is in the public grammar and the live BuildSystem permits it on e1-baron bank cells even though the derived mechanics advertises only its signature guns. Ordinary enemies gap-route/gnaw around palisade blockers; the Baron specifically attacks a palisade crossing its hero line.
- Run-2 change: wide gun ring; five late north-bank palisades at `z=15`; repair orders moved before movement once guns are complete; reserve a fresh central `{0,11}` palisade for wave 20, where wave-scaled HP plus immediate cheap repairs should suppress rockets and tank the Baron.

## Run 2 — failed
- Outcome: `secured=false, waves=18, timeMs=477233, gold=178, kills=723, calls=64, eventLogHash=fnv1a32:089b6543`; outcome.json immediately retained run 1 as best and advanced `runsSoFar` to 2.
- The first palisade-line/wide-ring arm was worse than run 1 (26.3s earlier death and 23 fewer kills). Inspect placement receipts and late-wave state before revising.
- Inspection confirmed all five hidden palisades built legally at w10 and remained fully standing; no placement/order failure occurred. The loss correlated with the wide gun ring: 723 kills vs run 1's 746, hero only 55 HP at w17 vs 103.
- Run-3 change: restore run 1's concentrated gun geometry (moving only the central turret from z10 to z13 to preserve the boss-wall lane), retain repair-first, and use Terra's proven staggered six-palisade line at z14 (odd x positions).

## Run 3 — failed, new best
- Outcome: `secured=false, waves=21, timeMs=552767, gold=38, kills=896, calls=165, eventLogHash=fnv1a32:9dee686c`; outcome.json immediately advanced to this new best with `runsSoFar:3`.
- Breakthrough validated: concentrated guns + staggered palisade line survived through the boss spawn and the fresh central tank extended the run to wave 21, three waves beyond the former ceiling. The boss was not killed before the repair economy/hero failed. Next: inspect w20+ hit cadence, wall HP and gold burn; optimize the tank rather than reverting the proven architecture.
- Boss transcript diagnosis: the fresh wall had exactly 180 HP; each Baron strike left 52 HP (28.89%) and a full repair cost 2g. But `REPAIR_UNDER 100` also chased every incidental 8-damage scratch across the other 16 works, wrecking several, pulling the crew off the central wall, and burning 126g in ~29s.
- Run-4 change: post-w20 repairs use `pct:30`, which selects the 52/180 boss wall but ignores normal scratches; keep all harvesting disabled during the fight. Pre-w20 seam work now tops the wallet whenever below 200 so the fight starts as near cap as repair traffic permits. Source DPS arithmetic predicts ~70.5s to kill and ~157g tank cost, within a 200g bank if incidental repairs are excluded.

## Run 4 — failed, new best
- Outcome: `secured=false, waves=22, timeMs=577433, gold=7, kills=944, calls=235, eventLogHash=fnv1a32:77f5f147`; outcome.json immediately advanced with `runsSoFar:4`.
- `pct:30` improved survival by ~24.7s to wave 22 but still exhausted an almost-full wallet before the ~70s nominal boss kill. Wrecked remote works always qualify regardless threshold, so the crew still spent/diverted beyond the intended 2g wall cadence. Need isolate repair target/order for the final two attempts.
- Run-4 transcript started the boss at 179g and kept the hero untouched through wave 21, proving `pct:30` targets the tank correctly most of the time. The remaining drain came from remote works that became fully wrecked (wrecks qualify at any pct); after gold fell to 14, seven works collapsed and hero contact followed.
- Run-5 plan: exploit another public grammar buildable the live contract permits. Two stockpiles cost 120 after guns/line and add 150 wallet capacity each, raising the repair reserve from 200 to 500. Build them by w12 behind the north line, keep them repaired pre-boss, and harvest to the dynamic cap. Even the measured ~3.1g/s total repair drain for a 70.5s kill fits comfortably.

## Run 5 — failed, new best
- Outcome: `secured=false, waves=23, timeMs=604133, gold=5, kills=978, calls=326, eventLogHash=fnv1a32:eedfbe03`; outcome.json immediately advanced with `runsSoFar:5`.
- Both stockpiles built and the larger reserve extended the fight another 26.7s to wave 23, but the run still exhausted gold and lost before securing. One final scored attempt remains; diagnose the missing boss DPS/repair sink precisely before spending it.
- Run-5 entered w20 with only 352/500g because pre-boss repair spend roughly matched the 50g/view seam budget. It then kept the hero at full HP for ~70s and lasted 82s total; thus the central geometry/tank is mechanically sound but underfunded and loses guns near the expected kill horizon.
- Final run-6 plan: retain the proven run-5 geometry and add all three hidden legal sluices after the stockpiles. Far-west river-adjacent cells `(-26,7),(-22,7),(-18,7)` avoid near-claim contest; 120g cost is repaid before the boss and their 1.8g/s continues during the fight. This targets the sole measured bottleneck without risking a wholly untested far-spawn defense relocation.

## Run 6 — failed; stop at budget
- Outcome: `secured=false, waves=20, timeMs=542800, gold=0, kills=848, calls=186, eventLogHash=fnv1a32:2586bc03`. `outcome.json` immediately kept run 5's wave-23 best and set `runsSoFar:6`.
- The far-west sluice arm regressed sharply: its construction/repair travel pulled the Prospector off the central economy and entered the boss with insufficient money, dying during wave 20. Three sluices did not repay under real contest/travel conditions.
- Six failed runs are now spent. Per the task law, stop running the simulator. Best measured result remains run 5: wave 23 at 604.133s, 978 kills, 5 gold.
- Post-budget source-only diagnosis (not scored): at the measured central-wall stop, three of run 5's six beacons were outside their 8wu range. Moving only those slots toward z7 would raise estimated boss DPS and is the most promising next experiment, but the six-run law forbids validating it here; it is not represented as a measured result.
- Run-6 transcript postmortem: only one of three sluices ever built, and the seventh/central boss palisade never landed. Thus run 6 tested neither the discarded far-south bait proposal nor the post-budget beacon-range correction.
