# Notebook — codex__gpt-5.5
(empty — first generation)
n 1 idle baseline: no orders survives only to wave 4, kills 84, gold 0, eventLogHash fnv1a32:fd85ecc2.
- Lessons: standing rig can handle early waves but loses to scaling; active play must pan/build and pick upgrades before defaulting.
- Run 2 secured: fixed near-claim sentry/turret build ladder plus repeated active-seam harvests banked wave 10 with 54 gold, 296 kills, 44 calls, eventLogHash fnv1a32:71b88437.
- Lessons: first-offer upgrade picks are enough when the build ladder is funded; banking secure immediately satisfies the objective, so no overtime needed.

## generation — era d599cd3e / Season 2 Same-Game

- Run 1 idle re-baseline: no orders dies during wave 4, kills 40, gold 0, eventLogHash fnv1a32:79712a38.
- Lesson: stale notebook's idle kill count is no longer reliable, but its root strategy still points the right way: build near claim, pan active seams, and answer drafts/secure choices instead of waiting for defaults.
- Run 2 player attempt: automatic blast mode died on wave 2 with 21 gold and 10 kills, eventLogHash fnv1a32:401a2298.
- Lesson: do not switch out of the Spark Rig for early Dry Gulch; blast mode loses too much continuous damage before the economy is built.
- Run 3 secured: Spark Rig only, one affordable near-claim build per view, nearest active seam harvesting, immediate draft picks and banked secure. Outcome: secured wave 20, 93 gold, 131 kills, 30 calls, eventLogHash fnv1a32:b13eef4c.
- Lesson: the minimal winning policy is not a full planner; keep rig DPS, spend panned gold into close beacons/turrets, then return to nearest live seam.
- Run 4 local attempt: reused the old conditional build ladder and died at wave 16 with 43 gold, 685 kills, 72 calls, eventLogHash fnv1a32:304a28ba.
- Lesson: standing BUILD does not walk first; once the Prospector is out at seams, affordable queued builds can fail out of reach. Walk to one affordable build spot, place it, then harvest.
- Run 5 local attempt: walk-then-build did not beat the stored wave 16 best in `outcome.json`.
- Lesson: do not keep tuning a brittle defense ladder when Night Shift's own river/ford terrain can satisfy SECURE more cheaply.
- Run 6 local attempt: river-camp policy also did not beat the stored wave 16 best.
- Lesson: browser camp evidence does not transfer cleanly to this headless door; capture the current-run outcome before making the next change.
- Run 7 local attempt: claim palisade line plus prioritized upgrades improved the best to wave 17, 20 gold, 749 kills, 78 calls, eventLogHash fnv1a32:87bd69db.
- Lesson: the gap is late-wave combat scaling; add the free BLAST_AT edge shot and switch to Blast mode only after the early rig economy is built.
- Run 8 local attempt: late automatic Blast mode regressed to wave 14, 60 gold, 541 kills, 82 calls, eventLogHash fnv1a32:7ece0c4f.
- Lesson: keep the rig weapon; the bigger mistake was walking the Prospector before BUILD even though placement range is measured from the fixed hero.
- Run 9 local attempt: no-walk conditional claim builds reached wave 20, 80 gold, 952 kills, 189 calls, eventLogHash fnv1a32:7358a651.
- Lesson: the build shape is viable now; late leakage needs more HP/repair and cheap palisade soak, not automatic Blast mode.
- Run 10 local attempt: health-first picks plus heavier repair/palisades still died at wave 20, with 93 gold, 934 kills, 250 calls, eventLogHash fnv1a32:b753e8d7.
- Lesson: heavy repair cuts damage output and does not extend the wave count; use the stronger wave-20 build shape and spend late surplus on a targeted palisade upgrade.
- Run 11 local attempt: targeted palisade upgrade regressed to wave 19, 38 gold, 880 kills, 171 calls, eventLogHash fnv1a32:90ca84ad.
- Lesson: hero died while works still had 877/1329 HP, so the wall layout leaks; spend on a tighter ring instead of upgrades.
- Run 12 local attempt: repairing every cold Night Shift lantern before building died at wave 6, with 4 gold and only preplaced lanterns standing, eventLogHash fnv1a32:7dfe5d5e.
- Lesson: relight is useful only if bounded; a full-map repair sweep abandons the build economy, so keep at most the central lantern and return to claim builds.
- Run 13 local attempt: central-only relight plus explicit build-station moves still regressed to wave 13, 16 gold, 487 kills, eventLogHash fnv1a32:7f3b0327.
- Lesson: station moves and relights churn the order executor; preserve the wave-20 no-walk claim plan and look for cheaper economy or damage instead.
- Run 14 local attempt: closed the north wall gap with a center top palisade and improved to wave 21, 89 gold, 1000 kills, eventLogHash fnv1a32:2f49e8a4.
- Lesson: wall geometry matters; the remaining death happens with high works HP and no wreckers, so ordinary enemies still have a route into the hero.
- Run 15 local attempt: ring-first plus build-station return regressed to wave 20, 87 gold, 937 kills, eventLogHash fnv1a32:4ddee91e.
- Lesson: buying the whole fence first starves turret timing; keep the shooter-timed ring and only change one late-wave control at a time.
- Run 16 local attempt: build-station return with ring-first landed more intended pieces but died earlier at wave 19, 63 gold, 893 kills, eventLogHash fnv1a32:0f774680.
- Lesson: out-of-reach fixes are not free; pulling the Prospector off seam income and delaying turrets costs more than the missing palisades save.
- Run 17 local attempt: restored the shooter-timed ring and aimed BLAST_AT at the nearby wall instead of the spawn edge; improved to wave 23, 162 gold, 1147 kills, eventLogHash fnv1a32:0a224699.
- Lesson: late deaths are leak-control failures at the wall. Keep close blast aim, then spend the surplus on repairs and the missing fourth turret.
- Run 18 local attempt: close blast plus late repair/fourth-turret return reached wave 24, 22 gold, 1202 kills, eventLogHash fnv1a32:9e0f492e.
- Lesson: the policy is one wave short. `byKind` counts hide skipped positions, so completion must be checked by intended coordinate rather than by family count.
- Run 19 local attempt: position-aware builds reached wave 24, 48 gold, 1207 kills, eventLogHash fnv1a32:b57417a9.
- Lesson: coordinate-based completion fixed skipped bottom wall placement, but the north-left wall still breaks before dawn.
- Run 20 local attempt: central-lantern relight plus north-left blast regressed to wave 17, 10 gold, 761 kills, eventLogHash fnv1a32:5037bafb.
- Lesson: `REPAIR_UNDER` cannot be used as a targeted lantern relight once combat damage exists; it diverts into wall repair and starves turret timing.
- Run 21 local attempt secured: removed the relight, kept position-aware build completion, late non-lantern repair, affordable-turret return, and biased north BLAST_AT to the weak left corner. Outcome: secured wave 25, 52 gold, 1233 kills, 285 calls, eventLogHash fnv1a32:7c7e81b9.
- Lesson: the winning delta was not more light; it was coordinate-aware build retry plus close leak-control blasts, with repair protecting the top-left wall just long enough for dawn.

## generation — era d599cd3e / Season 2 Same-Game / current Twin Banks pass

- Run 1 local attempt: slow first-beacon plan died at wave 3 with 20 gold, 44 kills, 6 calls, eventLogHash fnv1a32:abf52e35.
- Lesson: this Twin Banks seed needs immediate cheap wall/kill control; saving for the first 25g beacon leaves the hero exposed too long.
- Run 2 local attempt: tight cheap ring still died at wave 3 with 5 gold, 48 kills, 16 calls, eventLogHash fnv1a32:e67c6426.
- Lesson: `BUILD` range is measured from the Prospector in this door; unconditional multi-build arrays repeat out-of-reach failures while he is panning. Walk to build only after the gold is already in hand.
- Run 3 local attempt: range-aware conditional builds still died at wave 3 with 5 gold, 41 kills, 8 calls, eventLogHash fnv1a32:9847f46d.
- Lesson: do not leave a deferred `BUILD` ahead of `HARVEST`; the Prospector can change seams before the gold threshold trips, turning a once-near placement into an out-of-reach failure.
- Run 4 local attempt: automatic blast plus current-gold builds regressed to wave 1 with 10 gold, 14 kills, 3 calls, eventLogHash fnv1a32:fe508c40.
- Lesson: keep the Spark Rig for early single-target DPS; the bigger bug is seam churn. The first productive seam keeps the Prospector near the claim, while recomputing nearest by stale stable coordinates sends him east.
- Run 5 local attempt: sticky-seam rig policy improved to wave 4 with 0 gold, 61 kills, 7 calls, eventLogHash fnv1a32:f099d422.
- Lesson: fixed build coordinates still waste too much time when the seam target jumps; early walls should be placed from the Prospector's current position instead of walking back to a planned box.
- Run 6 local attempt: build-where-standing economy regressed to wave 3 with 10 gold, 47 kills, 7 calls, eventLogHash fnv1a32:2ee36e0d.
- Lesson: one early palisade is not enough; the run cap is exhausted, and the best honest standing for this pass remains run 5 at wave 4.

## generation — era d599cd3e / Season 2 Same-Game / current Baron pass

- Run 1 local attempt: adaptive local-build policy died at wave 18 with 196 gold, 738 kills, 139 calls, eventLogHash fnv1a32:8d2b77fd.
- Lesson: the economy is strong enough but the rider under-spends before the Baron window; inspect build failures and force earlier full turret/beacon placement.
- Run 2 local attempt: collision-free local build stations improved to wave 19 with 64 gold, 800 kills, 154 calls, eventLogHash fnv1a32:a506bd29.
- Lesson: spending improved, but the hero still dies before the Baron secure window; inspect whether the missing defense is fourth-turret damage, wall geometry, or late repair timing.
- Run 3 local attempt: snapped-coordinate completion stopped collision retries and improved to wave 20 with 2 gold, 868 kills, 161 calls, eventLogHash fnv1a32:63ab02ee.
- Lesson: the defense is now spending gold, but wave 20 still kills the hero before secure; tune late-wave survivability rather than economy.
- Run 4 local attempt: field dressing plus fourth-turret reserve still died at wave 20, but improved to 95 gold, 871 kills, 163 calls, eventLogHash fnv1a32:6b488c9b.
- Lesson: reserving alone left the Prospector too far from the final turret; force the last turret build station earlier or spend the reserve on immediate survival.
- Run 5 local attempt: prioritizing the wave-18 assay cash did not beat run 4; it died at wave 20 with 105 gold, 861 kills, 134 calls, eventLogHash fnv1a32:71013edc.
- Lesson: the extra cash arrived but the route/build timing still failed; the final attempt should simplify late behavior around claim defense, not chase more harvesting.
- Run 6 local attempt: removing the last beacon and allowing wave-20 repairs still did not beat run 4; it died at wave 20 with 68 gold, 861 kills, 134 calls, eventLogHash fnv1a32:20034c1a.
- Lesson: the best measured policy remains run 4. Keep the field-dressing + reserve policy as the submitted player rather than the later regressed variants.
