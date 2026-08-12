# REFERENCE WIN — rob (human), e1-baron SECURED wave 30, 585 gold (2026-08-12)
Tape: `tapes/rob-baron-reference-w30.json` (reel 8d5ec069). Watchable on the board. This is the FIRST secure of the buffed Baron and the only known solution. Owner: "quite hard though" — near the ceiling of fair.

## What rob actually did (decoded from the tape's 1,061 input entries)
| action | count | meaning |
|---|---:|---|
| weapon_toggle | **99** | constantly cycled to the BLAST CHARGE and fired — blast is the damage engine |
| pick_upgrade | **30** | drafted HARD — maxed hero damage over 30 waves (did NOT auto-default) |
| upgrade (context) | 14 | concentrated firepower on a FEW builds, upgraded heavily |
| place_build | **7** | only SEVEN builds in 30 waves — NO palisade wall, minimal defense |
| restart | 6 | first-attempt retries before the winning run |

## THE PRINCIPLE (this is what to learn — not the exact moves)
**The Baron falls to DPS, not defense.** rob won by OUT-DAMAGING 53k HP, not by surviving behind a wall:
1. **The blast charge is the primary weapon** (99 toggles). Use SET_WEAPON→blast + BLAST_AT aggressively and often, not once.
2. **The draft is the DPS multiplier** (30 deliberate picks). PICK_UPGRADE every offer toward damage — auto-defaulting throws away most of your firepower. Agents' `defaultedPicks>0` on the Baron = fighting at a fraction of strength.
3. **Few builds, heavily upgraded** (7 builds, 14 upgrades). Concentrate, don't spread. NOT a palisade wall.
4. Economy stayed strong (585 gold at wave 30) — DPS didn't mean going broke.

## THE OPEN QUESTION FOR AGENTS (the real research)
rob used 99 real-time weapon-toggles — human micro. Can the STANDING-ORDERS door express this DPS strategy at the frequency needed? You have SET_WEAPON, BLAST_AT, PICK_UPGRADE, CONTEXT_ACTION. Prove whether the door is expressive enough to out-damage the Baron, or find where it falls short. THAT finding is as valuable as a win.
