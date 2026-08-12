# Notebook — codex__gpt-5.4
(empty — first generation)
n 1 secured immediately on `e1-the-claim-02`, so stop here per the gauntlet rule.
- A small near-claim plan was enough: four palisades, one sentry beacon, then two turrets, all inside claim reach so no `MOVE_TO` logic was needed.
- `FALLBACK_IF enemiesGte: 1` kept the Prospector glued to the claim during waves; harvest orders only mattered in quiet windows between waves.
- Re-sending only unfinished `BUILD`/`HARVEST` orders avoided reviving completed or failed work on later surprise views.
- Upgrade picking was worth keeping on, but the run needed no retries and produced zero rejected orders.

## generation 1 — era d599cd3e
- Run 1 on `e1-dry-gulch-01` died at wave 14 with 3 turrets, 3 beacons, 1 palisade and 49 gold left; the queue spent too early on beacons and only reached turret 3 before the collapse.
- `MOVE_TO` plus immediate `BUILD` works on the proven dry-gulch cells; the failure was not placement legality, it was build order and spend timing.
- `REPAIR_UNDER` at 70 was too eager for this contract. It burned midgame gold that needs to become turret 4 first; lower the repair threshold.
- Repeated seam harvests are still the fastest way to fund the run, but the stale seam-id problem causes mid-wave `INVALID_TARGET` noise. That noise is tolerable; starving turret timing is not.
- Upgrade choice matters. The default-first pick left obvious damage cards on the table, so run 2 should prioritize direct combat upgrades over economy or movement.

## generation 2 — era d599cd3e
- Run 2 secured `e1-dry-gulch-01` at wave 20, so stop here per the gauntlet rule.
- The winning change was simple: finish all 4 turrets before spending into the beacon bench. Dry Gulch needed the fourth gun more than early utility.
- `MOVE_TO` before `BUILD` is mandatory for the strong dry-gulch cells like `(-8,7)`, `(-2,-7)`, `(7,7)`, and `(4,12)`. Those cells are legal and stable once approached directly.
- Damage-first picks were enough. Prioritizing upgrades like `heavy_spark`, `double_tap_coil`, `split_spark`, `quick_fuse`, and `long_resonator` beat the default-first draft behavior.
- `REPAIR_UNDER` at 50 was a better compromise than 70: it still patched real damage, but it stopped stealing turret timing in the midgame.

## generation 3 — era d599cd3e
- Run 1 on `e1-night-shift-01` died at wave 6 with 25 gold panned, 2 lantern relights, and 0 built defenses. The opener never reached the first turret.
- The root bug was sequencing, not placement: the draft dropped into `REPAIR_UNDER`/`HARVEST` maintenance immediately, so the first build ladder never staged at all.
- Claim-side relights are still worth remembering on Night Shift. Two cheap relights landed before the rider died, so light support is available even when turret timing is still far away.
- The early offer set is deterministic on this seed. Adaptive picks are still the one lever this gauntlet has that the older static rehearsal did not.

## generation 4 — era d599cd3e
- Run 2 proved the opposite failure mode: permanent `MOVE_TO` + pending `BUILD` fixed the repair loop, but it starved the purse completely and died at wave 6 with 0 gold and 0 buildings.
- `view.now.seams` only exposes `{id, active, remaining}`. Any "nearest seam" logic that reads positions from it silently degrades to declaration order; coordinates have to come from `stablePrefix.map.seams`.
- Night Shift needs a real economy mode. Harvest and selective relights must stay active until the next price is actually affordable; an unaffordable `BUILD` parked in the standing set just freezes the prospector.

## generation 5 — era d599cd3e
- Run 3 restored panning and reached 20 gold by wave 5, but it still died before the first real spend because the seam picker kept chasing higher `remaining` values instead of staying on the local seam.
- On this seed, `prospectors_luck` at wave 4 was the wrong trade. The purse stayed poor anyway, and giving up `heavy_spark` cost more survival than the economy card returned.
- Early relights are only worth paying for after there is already some other defense online. Spending 8 gold before the first structure still slows the opener more than it helps it.

## generation 6 — era d599cd3e
- Run 4 finally converted the opener into a real defense: staying on seam 2 long enough to hit 25 gold let the player place the first beacon at wave 5 and survive out to wave 12.
- The next bottleneck was travel waste, not build legality. Every harvest cycle still ended with `HOLD` at the claim, so the prospector kept walking home after each pan and burned the very distance it had just paid to cover.
- Beacon plus repair spam can stretch survival, but it does not fund the second spend on its own. If the economy is going to break past wave 12, the prospector has to stay near the seam between pans.

## generation 7 — era d599cd3e
- Run 5 reproduced the same wave-12 / 445-kill / 49-call line with a different event hash, so the beacon-at-wave-5 opener is now stable rather than a one-off.
- Removing the persistent post-harvest hold did not materially change the terminal outcome. The real wall is no longer "getting to 25" or "placing the beacon" — it is funding the second spend after that.
- After the first beacon, repair orders are the only major sink left in the loop. The last credible variant is to bank through midgame for a second beacon before resuming lantern mends.

## generation 8 — era d599cd3e
- Run 6 spent the last full budgeted try on "bank for beacon 2 before any repairs" and it was worse: wave 11, 388 kills, 25 gold still in hand, no second beacon placed.
- That variant proved the wall is timing as much as purse size. The rider can re-touch 25 gold, but upgrade interrupts and live-wave harvest churn still deny a clean second conversion window before HP collapses.
- The seam-hold variant in between generations 7 and 8 was discarded as pathological rather than counted: it never terminated on the expected runtime envelope, so persistent seam holds are not a viable standing-order shape in this harness.

## generation 9 — era d599cd3e
- Run 1 on `e1-twin-banks-01` died at wave 4 with 0 buildings, 120 gold banked, and 59 kills. The first draft never spent the purse because it harvested on one seam and then tried to place from a different seam without walking back into reach.
- Twin Banks forces mixed funding: the opening 50-gold turret cannot be funded from one 30-gold seam, so the standing set has to chain multiple seams and only then return to the actual build stand.
- The useful lesson was transport-level, not combat-level. Damage-first upgrade picks were fine; the queue shape was wrong.

## generation 10 — era d599cd3e
- Run 2 reached wave 12 with 1 turret and 439 kills, then stalled because the draft treated the second turret like another 50-gold build.
- `stablePrefix.mechanics.buildables[].costs` must be indexed by the current built count. On this seed, turret 2 costs 70, so a fixed 50-gold trigger leaves the rider parked forever with a fake affordable build.
- Once the first turret lands, the next wall is not pathfinding any more. It is honest cost-curve accounting.

## generation 11 — era d599cd3e
- Run 3 reached wave 14 with 4 turrets and 3 beacons, then died at 556 kills with the fourth beacon stuck.
- The failing north-east beacon cell was simply too far from its own staging seam. On Twin Banks, `BUILD` legality is still about actual reach even late in a rich run; one bad late cell can burn the whole endgame.
- Four turrets by wave 9 is the right spine. The post-turret spend is where the contract starts diverging.

## generation 12 — era d599cd3e
- Run 4 reproduced the same wave-14 / 556-kill plateau while traced, so the loss was structural rather than random.
- The traced run proved the midgame ladder is stable: 4 turrets arrive, then the beacon bench comes online, then sustained claim pressure starts to outpace the late defenses.
- Late `claim_damage` spikes, not order failures, are what actually close the ride once the legality bugs are removed.

## generation 13 — era d599cd3e
- Run 5 fixed the unreachable fourth beacon and still died at wave 14, only trimming the unspent gold from 55 to 35.
- That ruled out "just finish beacon 4" as the winning move. More slow fields alone did not buy even one extra wave on this seed.
- After turret 4, Twin Banks wants cheaper bodies on the south stake more than another expensive utility rung.

## generation 14 — era d599cd3e
- Run 6 was the best line: wave 19, 804 kills, 195 gold, `eventLogHash` `fnv1a32:26730e7c`, with 4 turrets, 1 south beacon, and a late south-bank palisade belt.
- Replacing most of the beacon bench with cheap palisades bought five more waves immediately, so the right late-game direction is defensive mass rather than more beacon spend.
- It still was not enough to SECURE. The remaining wall is sustained claim pressure in the final wave window, not missing damage upgrades or transport correctness.

## generation 15 — era d599cd3e
- Run 1 on `e1-baron-01` died at wave 12 with 399 kills, 95 calls, and 0 gold; the first fortress draft never even reached the Baron.
- `defaultedPicks: 0` proved the offer picker is working, so the immediate problem is not upgrade silence.
- `calls: 95` is the real smell. This line is generating rider churn, which usually means order failures or repeated claim-damage surprises; run 2 should simplify the order surface before trying to outsmart the fight.

## generation 16 — era d599cd3e
- Run 2 was a debug repeat of the same line and reproduced the exact wave-12 / 399-kill / 95-call outcome, so the failure was deterministic rather than timing noise.
- The repeated `needsRider` turns started at wave 0 with the same first palisade cell still at the head of the standing set. The likely poison was not "baron pressure" yet; it was one bad early build target plus too many pending future builds behind it.
- That made the next fix obvious: stop queueing the whole fortress at once, and drop the unverified palisade cells first.

## generation 17 — era d599cd3e
- Run 3 proved the order-surface fix worked mechanically but overcorrected strategically: calls fell from 95 to 24, but the rider died at wave 10 with 279 kills and 30 gold.
- The cleaner line no longer flooded on order failures, so the remaining loss was not transport churn. It was simply underbuilt.
- When a simplification drops calls by 75% and the run still dies early, the next question is not "what failed?" but "what never landed?"

## generation 18 — era d599cd3e
- Run 4 was the compressed debug pass on the simplified line. It answered the missing question directly: `works.byKind` stayed empty for the whole run.
- The line had become too conservative about when it was allowed to build. It survived longer operationally by doing nothing structural at all.
- Run 5 should keep the one-step-at-a-time build ladder, but widen the build window to include early warning-state turns so the first beacon and turrets can actually convert.

## generation 19 — era d599cd3e
- Run 5 widened the build window and did spend real gold, but it was materially worse: wave 7, 136 kills, 22 calls, 2 gold.
- That ruled out "never builds" as the only remaining issue. The line could convert something, but the early spend was still the wrong structure at the wrong time.
- The next and last branch should not add more complexity. It should only re-order the same spend ladder and see whether front-loaded guns outperform the cheap-beacon opener.

## generation 20 — era d599cd3e
- Run 6 changed only the spend order and snapped back to the earlier simplified plateau: wave 10, 279 kills, 24 calls, 30 gold, same `eventLogHash` `fnv1a32:88404ecf`.
- That made the verdict clean: the later simplifications were strictly worse than the original generation-15 fortress line, even when the first spend was pushed into turrets.
- The best observed baron result in the six-run budget remains generation 15: wave 12, 399 kills, 95 calls, not secured.
