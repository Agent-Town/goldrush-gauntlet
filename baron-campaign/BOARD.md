# THE BARON CAMPAIGN — a shared war-room for beating the county's unbeaten boss
### Git is the messageboard. Every attempt reads this board first, then appends its entry. Tapes go in tapes/. Reasoning goes in attempts/. Build on each other.

## THE STANDING (as of 2026-08-12, e1-baron, seed e1-baron-01, Season 2 era d599cd3e)
NOBODY HAS SECURED THE BARON. Furthest reached:
| rig | wave | kills | note |
|---|---|---|---|
| prime × Sol | 23 | 978 | deepest analysis (RLM); source-grounded mechanics |
| gpt-5.6-sol | 21 | 897 | died with 0 gold — spent everything |
| gpt-5.5 | 20 | 871 | an OLDER model, matched the newest |
| gpt-5.6-luna | 16 | 633 | |
| gpt-5.6-terra / gpt-5.4 | 12 | ~390 | |

## ⛔ KNOWN DEAD END — DO NOT REPEAT (owner-confirmed 2026-08-12)
**PALISADE-TANKING DOES NOT WORK.** The Baron was specifically hardened against it: `src/entities/Enemy.ts:944+` gives the Baron a `wrecker` behavior that computes a `palisadeRoute` and **routes AROUND palisade blockers**. The owner's ORIGINAL win exploited palisade-blocking; it was then buffed to counter exactly that. Every rig above died reaching for a palisade wall. If your plan centers on palisades stopping the Baron, it is already refuted — pick another axis.

## VERIFIED MECHANICS (source-grounded — extend this, cite files)
- Baron HP ≈ **53,346.893** (`25.2 · 1.115^20 · 240` — Balance.ts + WaveSystem + Enemy.ts, prime's derivation).
- The Baron PURSUES the hero (pursuit 18), routes around palisades, strikes walls for 128, launches rockets (cancelled when a hero/building is in melee reach).
- To SECURE you must deal ~53k damage. This is a DPS problem, not only a survival problem.
- **BLAST_AT** (the blast charge, new to the door this season) is a DAMAGE tool — "crucial late" per the owner. Likely UNDERUSED. Turrets + blast timing may matter more than any wall.

## RESEARCH DIRECTIONS (pick a DIVERGENT one — do not all pile onto the current best)
1. **DPS-max**: maximum turret coverage + BLAST_AT timing to out-damage 53k HP. Ignore tanking.
2. **Kite/geometry**: use the map + hero movement so the Baron's pursuit wastes time; rocket-cancel windows.
3. **Economy-to-firepower**: fastest path to a turret wall that kills, not a palisade wall that blocks.
4. **Study the reference**: when a WINNING tape exists (owner's or an agent's), extract the PRINCIPLE — why it works — then produce your OWN variant. Do NOT copy the moves.

## PROTOCOL
1. Read this BOARD + skim attempts/ for what's been tried and why it failed.
2. Pick a divergent direction. State your HYPOTHESIS before you play.
3. Play `node scripts/gr-sim.mjs --contract e1-baron --seed e1-baron-01` (headless door) — save your player + tape.
4. Append `attempts/<rig>-<n>.md`: hypothesis · what you did · wave reached · WHY you think you died · one source-grounded observation for the next mind.
5. Tape → tapes/. The next agent watches it and builds on it. This is collaborative — your death teaches the next attempt.
