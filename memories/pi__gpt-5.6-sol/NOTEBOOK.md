
## generation — era d599cd3e
Generated: 2026-08-12
Contract: the-claim | Seed: e1-the-claim-02
Outcome: SECURED at wave 10 on run 4

Lessons learned in era d599cd3e:
- The Claim secures at wave 10; answer `pendingSecure` with an explicit `bank` rather than relying on the decision clock.
- Live map data is under `stablePrefix.map`, while seam activity is in `now.seams`; using guessed legacy field names silently selected invalid targets.
- Keep the automatic weapon on `rig`. Automatic `blast` collapsed at wave 1 on this seed, while the rig line reached wave 9 before final tuning.
- Drafts are frequent and can stack at one wave. Explicitly prioritize rig offense (`split_spark`, `double_tap_coil`, `heavy_spark`) and then durability/range; never let the 20-second clock default.
- The Prospector executes movement/build/harvest orders separately while the defending hero remains at the claim. Continuous harvesting can therefore fund defenses without pulling the hero away.
- A close ring of 10g palisades is more timely than saving 25–50g for advanced works at the observed ~5g harvest cadence.
- Keep build points within short reach of the claim; nominal points about 4.2 units away caused repeated `out_of_reach` failures.
- `BLAST_AT` can supplement the rig without switching weapons. Submit it only when `now.blastReadyInMs === 0`; targeting the claim punishes enemies already leaking into the defense.
- Successful line: rig-focused draft + repair-under-65 + close palisade ring + active seam harvesting + explicit ready-state blasts; 296 kills, 8 gold, no defaulted choices.

## generation — era d599cd3e (Heat 3, run 1)
Generated: 2026-08-12
Contract: e1-dry-gulch | Seed: e1-dry-gulch-01
Outcome: FAILED at wave 2 (hero down)
Lessons learned:
- Season 2 headless Dry Gulch starts with 0 gold and ZERO works, unlike the founding browser rehearsal's eight palisades; old turret-first scheduling is not viable.
- Switching the automatic weapon to blast immediately killed too slowly (8 kills, 23 alive by wave 2); retain the Spark Rig and use explicit BLAST_AT only opportunistically.
- `BUILD when goldGte:0` attempts immediately and fails for insufficient gold. Conditions must use actual manifest prices.
- Two active seams produce 14g per harvest pass (+40% yield), enough to start one 10g palisade before saving for turrets.

## generation — era d599cd3e (Heat 3, run 2)
Generated: 2026-08-12
Outcome: FAILED at wave 5 (65 kills)
Lessons learned:
- One/two active seam harvest orders yield 14g per decision pass. Five early palisades delayed all lethal works; enemies accumulated to 60 alive and crushed them.
- `REPAIR_UNDER 75` became a trap once works were damaged: it repeatedly consumed every new gold piece, repeatedly failed at 0g, raised `needsRider`, and inflated the run to 169 calls. Do not repair before lethal infrastructure is complete.
- Explicit BLAST_AT plus Spark Rig improved kills substantially and kept hero HP at 100 while palisades stood, but nonlethal walls alone cannot control scaling.
- Revised priority: at most one cheap palisade, then save directly for the first turret; no repairs in the early economy.

## generation — era d599cd3e (Heat 3, run 3)
Generated: 2026-08-12
Outcome: FAILED at wave 16 (370 kills)
Lessons learned:
- One palisade then turret is a viable opening: first turret landed at wave 4, second at wave 12, hero stayed healthy into wave 14, and the line reached wave 16 with only 46 calls.
- Seams can both go inactive for several waves (income froze at 5g during waves 5–7), so expensive turret scaling makes the third turret unlikely before secure.
- Enemy population caps around 60; late Spark Rig kills fell behind despite max Heavy Spark and Double-Tap stacks. Blast Charge base damage scales +28% per wave and is AoE, so switch the automatic weapon to blast after the first turret/when the crowd forms rather than at boot.
- Upgrade offers use actual ids `split_spark`, `long_resonator`, `powder_charge`, `wide_ring`, and `quick_fuse`. The first two are Spark Rig upgrades; the latter three are the relevant blast package. Prioritize the blast package plus Tinker's Plating for the post-wave-12 hold.

## generation — era d599cd3e (Heat 3, run 4)
Generated: 2026-08-12
Outcome: SECURED at wave 20 — STOPPED ON FIRST SECURE
Lessons learned:
- The winning pivot was automatic Blast Charge at wave 4 / crowd >=30, after the opening palisade had protected the 50g turret save. This line held through wave 20 with 393 kills and no wrecked works.
- Draft priority for this deterministic seed: max Quick Fuse, Powder Charge, Wide Ring, and Tinker's Plating before secondary Spark Rig upgrades. Final hero was 175/175 HP with all four key blast/defense upgrades maxed.
- The minimal economy was enough: one palisade, turret at wave 4, second turret at wave 12, third turret at wave 20. No repair orders were needed; all four works stood at the secure boundary (358/358 HP).
- Answer `pendingSecure` explicitly with `SECURE_CHOICE bank`; the run recorded zero defaulted picks and zero defaulted secure choices.

## generation — era d599cd3e (Heat 3, run 1)
Generated: 2026-08-12
Contract: e1-dry-gulch | Seed: e1-dry-gulch-01
Outcome: FAILED at wave 2 (hero down)
Lessons learned:
- Season 2 headless Dry Gulch starts with 0 gold and ZERO works, unlike the founding browser rehearsal's eight palisades; old turret-first scheduling is not viable.
- Switching the automatic weapon to blast immediately killed too slowly (8 kills, 23 alive by wave 2); retain the Spark Rig and use explicit BLAST_AT only opportunistically.
- `BUILD when goldGte:0` attempts immediately and fails for insufficient gold. Conditions must use actual manifest prices.
- Two active seams produce 14g per harvest pass (+40% yield), enough to start one 10g palisade before saving for turrets.

## generation — era d599cd3e (Heat 3, run 2)
Generated: 2026-08-12
Outcome: FAILED at wave 5 (65 kills)
Lessons learned:
- One/two active seam harvest orders yield 14g per decision pass. Five early palisades delayed all lethal works; enemies accumulated to 60 alive and crushed them.
- `REPAIR_UNDER 75` became a trap once works were damaged: it repeatedly consumed every new gold piece, repeatedly failed at 0g, raised `needsRider`, and inflated the run to 169 calls. Do not repair before lethal infrastructure is complete.
- Explicit BLAST_AT plus Spark Rig improved kills substantially and kept hero HP at 100 while palisades stood, but nonlethal walls alone cannot control scaling.
- Revised priority: at most one cheap palisade, then save directly for the first turret; no repairs in the early economy.

## generation — era d599cd3e (Heat 3, run 3)
Generated: 2026-08-12
Outcome: FAILED at wave 16 (370 kills)
Lessons learned:
- One palisade then turret is a viable opening: first turret landed at wave 4, second at wave 12, hero stayed healthy into wave 14, and the line reached wave 16 with only 46 calls.
- Seams can both go inactive for several waves (income froze at 5g during waves 5–7), so expensive turret scaling makes the third turret unlikely before secure.
- Enemy population caps around 60; late Spark Rig kills fell behind despite max Heavy Spark and Double-Tap stacks. Blast Charge base damage scales +28% per wave and is AoE, so switch the automatic weapon to blast after the first turret/when the crowd forms rather than at boot.
- Upgrade offers use actual ids `split_spark`, `long_resonator`, `powder_charge`, `wide_ring`, and `quick_fuse`. The first two are Spark Rig upgrades; the latter three are the relevant blast package. Prioritize the blast package plus Tinker's Plating for the post-wave-12 hold.

## generation — era d599cd3e (Heat 3, run 4)
Generated: 2026-08-12
Outcome: SECURED at wave 20 — STOPPED ON FIRST SECURE
Lessons learned:
- The winning pivot was automatic Blast Charge at wave 4 / crowd >=30, after the opening palisade had protected the 50g turret save. This line held through wave 20 with 393 kills and no wrecked works.
- Draft priority for this deterministic seed: max Quick Fuse, Powder Charge, Wide Ring, and Tinker's Plating before secondary Spark Rig upgrades. Final hero was 175/175 HP with all four key blast/defense upgrades maxed.
- The minimal economy was enough: one palisade, turret at wave 4, second turret at wave 12, third turret at wave 20. No repair orders were needed; all four works stood at the secure boundary (358/358 HP).
- Answer `pendingSecure` explicitly with `SECURE_CHOICE bank`; the run recorded zero defaulted picks and zero defaulted secure choices.
