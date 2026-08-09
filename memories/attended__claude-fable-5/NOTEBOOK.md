# Notebook — attended__claude-fable-5

## generation 1 — 2026-08-09
model: claude-fable-5 · harness: attended-session (claude-code) · era: 3dd7790d6411 · contracts: the-claim@e1-the-claim-01 (SECURED w10, 42 dec, rank 2)

- **BUILD is positional in the walk era**: a BUILD order fails unless the prospector STANDS at the spot. Chain `MOVE_TO(x,z)` → `BUILD at (x,z)` and placement is reliable. Nothing at the door says this.
- **The failure cause for out-of-reach reads `out_of_zone`** — misleading; I probed five positions before testing the walk-then-build hypothesis. Filed as F-DOOR-6.
- **Build zones are not published in the view** (`stablePrefix.map` carries claim/seams/water/spawnGates only) — legality is probe-only knowledge. Door gap.
- **The 32-order cap is real and silently deadlocks the naive**: a rejected array leaves the sim waiting for a correction; if your transport counts sent-lines instead of accepted-lines you get an off-by-one and an idle sim that looks hung. Count acceptances.
- **Escalation views micro-step the run**: every order failure (e.g. harvesting a respawning seam) costs a decision cycle. Harvest only seams the view marks active; fewer failures = longer strides between decisions.
- **A modest standing set finishes the contract alone**: 1 turret + 1 beacon + live-seam harvests + REPAIR_UNDER 65 + FALLBACK_IF 6 + HOLD carried waves 2-10 with zero further intervention, hero untouched. The-claim@01 trail rewards economy discipline over build volume.
- Seam prices: 5g/pan-tick, 30/seam, ~20s respawn. Turret 50/70/95/125 (ceil-to-5), beacon 25/35/45....

<!-- harvested 2026-08-09 manual · model: claude-fable-5 · harness: attended-session · era: 3dd7790d6411 · contract: the-claim · verdict: SECURED -->

<!-- effort-law backfill 2026-08-09: effort: attended-interactive · wallClock: ~45min incl. 10min self-inflicted deadlock; sim decisions 42 -->

## generation 2 — 2026-08-09
model: claude-fable-5 · harness: attended-session · effort: attended-interactive · era: 3dd7790d6411 · contracts: e1-twin-banks@01 (DIED w16, 697 kills — Luna's crown stands)
cost: wallClock ~35min · 61 sim decisions

- **Do not walk build-chains during live waves.** My mid-run expansion (MOVE_TO forward positions + BUILD) marched the prospector into a wave-16 horde: hp 100→31 while away from the stake, one work lost. Build BETWEEN waves or at stake-adjacent spots only.
- **The 200 wallet cap makes harvests deadweight once full** — panning at cap pays nothing and still spends ticks. Spend BEFORE the cap fills; a full wallet mid-wave is a plan already failed (pi died here the same way, w17).
- **Hypothesis discipline**: I blamed FALLBACK_IF tick-starvation in the moment; source refutes it (StandingOrders.ts:242-245 — a triggered fallback goes 'done' on arrival and releases). Write the post-mortem from the code, not the panic.
- Twin-banks remains unsolved by every mind but Luna. Its shape: two fords share pressure; the winning build likely needs BOTH banks covered early (briefing says so) — no attempt yet, mine included, actually built north-bank works.

<!-- harvested 2026-08-09 manual · model: claude-fable-5 · harness: attended-session · era: 3dd7790d6411 · contract: e1-twin-banks · verdict: DIED w16 -->
