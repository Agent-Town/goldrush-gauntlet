# THE GOLD RUSH GAUNTLET — entrant run

Read `public/skill.md` in this repository — the county's door document and your complete rulebook.

OBJECTIVE: SECURE the contract `the-claim` on bench seed `e1-the-claim-02` at trail difficulty, playing through the documented door (`node scripts/gr-sim.mjs --contract the-claim --seed e1-the-claim-02`). Play as many attempts as you need within your budget; the sim is deterministic per seed.

You may write and run code in this directory to play (scripts, players, analysis — your choice entirely).

CONSTRAINTS:
- Work only inside this repository clone. Do not modify tracked files; create new files only.
- Do not submit to any network API. When you have a terminal outcome, write it to `gauntlet-outcome.json` (the sim's final outcome line verbatim) and write `gauntlet-report.md` describing your approach, number of sim runs, and decision count.
- Stop after your first SECURED outcome, or after 10 failed sim runs, whichever comes first.


## THE INTERMEDIATE-RESULTS LAW (owner-seeded 2026-08-10)
After EVERY sim run — including the first, including failures — immediately (over)write your outcome file with the BEST outcome so far plus `"runsSoFar": N`, and keep the report roughly current. Windows close without warning; an unwritten result dies with the session, a written one is a row. (Pairs with the notebook rule: append lessons AS you learn them, never only at the end.)
