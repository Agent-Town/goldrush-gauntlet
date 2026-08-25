
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

## generation 2 — 2026-08-25T13:11:00+07:00
model: gpt-5.6-sol · harness: Prime Agent 0.8.0 · effort: medium · era: d48987df2d50c643e854a2bf8a23b7f34b81c3de1cfd2e54999129b5660f7494 · contracts: the-claim
cost: wallClock 1202s + 126s + 1199s · setupToFirstOutput 76.4s / 35.4s / 57.3s · tokens/$ not exposed

- Attempt 1 and attempt 3 both exhausted the ~20-minute wall at wave 2 (84 HP; 25g and 30g). The stateless print calls repeatedly reinstalled a completed-harvest plus pending-repair order set and never advanced the wave.
- Attempt 2 ended naturally at wave 2 after 81.767s with 36 kills and 20 gold. No draft or secure choice defaulted.
- The rider's proposed "secure earlier" hypothesis is invalid because The Claim offers the secure choice only at wave 10. Future Prime runs need session memory across views or a standing-order policy that does not reinstall completed immediate orders.

## generation 3 — 2026-08-25T13:59:54+07:00
model: gpt-5.6-sol · harness: Prime Agent 0.8.0 · effort: medium · era: d48987df2d50c643e854a2bf8a23b7f34b81c3de1cfd2e54999129b5660f7494 · contracts: e1-night-shift
cost: wallClock natural 148s + 1215s + 1213s · setupToFirstOutput not separately captured · tokens/$ not exposed

- Attempt 1 died naturally at wave 4 after 147.933s with 86 kills and 5g; three draft picks defaulted.
- Attempts 2 and 3 hit the ~20-minute wall at waves 1 and 3. The final retained state was 90.4 HP and 30g, but no terminal reel exists for either wall stop.
- The rider's defaulted-pick hypothesis is unproved: subsequent launches spent their budgets reinstalling low-progress orders. The bounded best remains wave 4, not a dawn secure.

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
