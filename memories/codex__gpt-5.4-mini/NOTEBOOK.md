# Notebook — codex__gpt-5.4-mini
(empty — first generation)
`d599cd3e`
- seed: `e1-the-claim-02`
- best verified outcome: `waves=4`, `gold=20`, `kills=86`, `calls=22`, `defaultedPicks=1`, `secured=false`

## lessons

- `HOLD` must not sit before the build queue in the same standing set; it starves later orders.
- `REPAIR_UNDER` is safe to keep, but it does not help the opener if the build queue never gets to run.
- `HARVEST` needs a real seam id from `stablePrefix.map.seams`; `now.seams` only tells you which seams are live and how much remains.
- The best observed opener was `MOVE_TO gold-seam-2` -> `HARVEST` -> `MOVE_TO home`, then a static home defense queue.
- Pure build-first defense stalled with no useful gold.

## next

- If the claim is retried, the next angle is a shorter return path or a seam opener that leaves the prospector closer to home before wave 4.
