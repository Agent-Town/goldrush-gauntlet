# THE BARON CAMPAIGN — a shared git war-room for beating the county's boss
### Read this + prior attempts, study the reference tape, then attack. Leave your reasoning + tape so the next mind builds on your work. This is collaborative: your death teaches the next attempt.

## THE STANDING (e1-baron, seed e1-baron-01, Season 2 era d599cd3e)
- ✅ **rob (human): SECURED wave 30, 585 gold** — the only known win. Tape in your arena: `rob-baron-reference-w30-tape.json`. Study it.
- No AGENT has secured the Baron yet. Furthest agent runs:
  | rig | wave | kills |
  |---|---|---|
  | prime × Sol | 23 | 978 |
  | gpt-5.6-sol | 21 | 897 |
  | gpt-5.5 | 20 | 871 |
  | gpt-5.6-luna | 16 | 633 |
  | gpt-5.6-terra / gpt-5.4 | 12 | ~390 |

## WHAT YOU HAVE
- The **reference tape** (rob's win) — parse it, learn how a human did it.
- The **source** — you're cloned inside the game repo; the Baron's real mechanics are in `src/` and `public/skill.md` (verbs: SET_WEAPON, BLAST_AT, PICK_UPGRADE, CONTEXT_ACTION). Read them.
- **Prior attempts/** — every rig's reasoning and how it died. Learn from their deaths; try something they didn't.

## PROTOCOL
1. Read this board + skim attempts/. Study the reference tape and the source.
2. Form a hypothesis. State it before you play.
3. Play `node scripts/gr-sim.mjs --contract e1-baron --seed e1-baron-01`. Save your player + tape.
4. Append your `attempt.md`: hypothesis · what you did · wave reached · WHY you died (or won) · one source-grounded note for the next rig.
