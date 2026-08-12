# e1-baron attempt — codex-6-sol-r5

## Hypothesis (stated before play)

The proven combined fort has excess late survivability: its latest secure ended at 165.4/175 HP after spending three picks on Tinker's Plating. I will keep the full three-T3-sluice economy, four concentrated T3 turrets, six protected beacons, two stockpiles, three late shot-decoys, center-only repair, and continuous-Rig explicit Blast cycle, but draft offensive and area cards ahead of Plating unless health actually falls below 55%.

The center wave-19 palisade at `(0,11)` remains the first and only repaired blocker. The panels at `(-10,11)` and `(10,11)` are disposable shot-decoys, not a wall. More late damage should clear the add pile faster, reduce the Baron's time on the center panel, and retain more of the 500-gold reserve.

## Result

### Run 1 — SECURED

```json
{"secured":true,"waves":22,"timeMs":594567,"gold":257,"kills":985,"calls":505,"defaultedPicks":0,"defaultedSecure":0,"eventLogHash":"fnv1a32:f94ad64e"}
```

I stopped on the first secure, as required.

## What I did

- Built three sluices and upgraded all to T3, then concentrated four T3 turrets on z=12 with six protected beacons and two stockpiles.
- Built the center T1 palisade first at `(0,11)` on wave 19, then disposable shot-decoys at `(-10,11)` and `(10,11)`.
- Kept the Spark Rig selected. Bounded batches of idempotent Rig orders advanced the reported Blast cooldown before each explicit `BLAST_AT (0,11)`.
- Put offensive and area upgrades ahead of Plating, taking Plating only when an offer contained no better combat card. The deterministic offers still produced all three Plating stacks: picks 8, 22, and 23 offered only Plating, Pan Like a Legend, and/or Spring Heels.
- Repaired only when center palisade 0 fell below 31%, then explicitly banked the secure choice.

## Why it won

The three T3 sluices financed the complete T3 turret engine before the Baron phase. The two side panels absorbed attacks and were allowed to wreck, while the first-index center panel repeatedly restored the Baron's melee lock. That kept him in the concentrated turret range and suppressed the rocket cadence while wall-centered charges cleared adds without disabling the Spark Rig.

At the secure view the Prospector had **165.4/175 HP**, center palisade 0 was restored to **172/172**, all six beacons and all four T3 turrets were standing, and 257 gold remained. There were no defaulted draft or secure choices.

The aggressive-draft hypothesis did **not** improve the bank. It secured with one more kill and one fewer rider call than the prior 389-gold run, but with 132 less gold. The final upgrade multiset was the same; only its acquisition order changed.

## Source-grounded note for the next rig

Do not treat the final upgrade multiset as a sufficient replay description. `Progression.applyUpgrade()` immediately recomputes and installs effective stats after every pick (`src/game/Progression.ts:153-162`), so changing when Wide Ring and Plating arrive changes combat, XP observations, and the standing-order schedule even if the run ends with identical stacks. Here that timing-only change moved the execution hash and reduced the wave-20 bank from the prior 499 to 295. Preserve the exact pick policy when reproducing an economic line.

The blocker itself remains reliable: the Baron resolves the palisade on his route to the hero (`src/entities/Enemy.ts:953-959`), and a wave-19 panel snapshots 172 HP from the placement-wave scale (`src/systems/BuildSystem.ts:1957-1965`).

## Artifacts

- Controller: `player.mjs`
- Outcome: `outcome.json`
- Winning tape: `run-1-tape.json`
- Decision transcript: `run-1.jsonl`
- Simulator stderr: `run-1.stderr.log`
