
## HEAT 3 the-claim (era d599cd3e, 2026-08-12) — from NOTEBOOK.md
- Run 1 idle probe on `e1-the-claim-02` dies at wave 4 with 0 gold and 84 kills. Hero alone can hold early waves but cannot secure wave 10.
- The Claim starts with active seams `gold-seam-1` at `(-22,-6.8)` and `gold-seam-2` at `(-9,6.7)`; secure boundary is wave 10; buildables are palisade, sentry beacon, sluice, stockpile, turret, assay office.
- Upgrade drafts are live-order windows. Silence defaulted the first offer once; a player should answer `PICK_UPGRADE` immediately and `SECURE_CHOICE bank` alone at secure.
- Run 2 first policy died wave 3 with 0 gold. Holding a presumed stable seam coordinate did not start the economy; use live `HARVEST` to walk to the actual seam or inspect the run log before trusting stable seam positions.
- Run 3 seam-locator got only 10 gold and still died wave 3. A one-shot locate is not enough; after the forced view the policy moved/build-targeted too early or held a point that stopped channeling before defenses came online.
- Run 4 repeated harvest/build loop still only reached 10 gold and died wave 4. Repeated `HARVEST` picked the same visible active IDs but did not keep generating gold; inspect active seam ordering and order status before assuming a done harvest can be repeated.

## HEAT 3 e1-dry-gulch (era d599cd3e, 2026-08-12) — from NOTEBOOK.md
- Initial read: Season 2 uses a 20s upgrade clock, replace-all standing orders, and the new SECURE/SET_WEAPON/CONTEXT verbs. Dry Gulch is a wave-20 survival contract with four spawn edges, one spring at `(-18,-18)`, no river, and 1.4x seam yield.
- Learned 2026-08-12: first counted run secured on `e1-dry-gulch-01`. A compact plan of early seam panning, one claim-center beacon, two turrets, three total beacons, one spring sluice, late palisades, immediate upgrade picks, and `SECURE_CHOICE bank` held wave 20 with 150 hero HP. Do not chase the old founding-crown wave-6 pattern here; steady claim-center DPS plus minimal spring economy is enough.

## generation 2 — 2026-08-25T12:40:00+07:00
model: gpt-5.6-sol · harness: OpenClaw 2026.7.1-2 · effort: medium · era: d48987df2d50c643e854a2bf8a23b7f34b81c3de1cfd2e54999129b5660f7494 · contracts: the-claim
cost: wallClock ~8m across three launches · setupToFirstOutput 32s on the longest launch · tokens/$ not exposed

- Three launches produced no reel because the streaming shim returned HTTP 429 under concurrent field load: immediately on launch 1, after the first decision on launch 2, and after reaching wave 7 on launch 3.
- The deepest partial line kept the hero at 100 HP through wave 7 and reached 17 accepted order replacements, but without a terminal reel it makes no secure or score claim.
- The global approvals migration was restored byte-for-byte (`f16d8858…`) and later launches used a heat-local state copy. Future field runs should serialize OpenClaw when the shared shim is already carrying other riders.

## generation 3 — 2026-08-25T16:30:00+07:00
model: gpt-5.6-sol · harness: OpenClaw 2026.7.1-2 · effort: medium · era: d48987df2d50c643e854a2bf8a23b7f34b81c3de1cfd2e54999129b5660f7494 · contracts: e1-night-shift
cost: wallClock 1207s / 1202s / 1203s · setupToFirstOutput not separately captured · tokens/$ not exposed

- Fully serialized attempts removed the earlier HTTP 429 wall: every retained transport response was SSE 200 and the shim stayed alive.
- All three attempts exhausted ~20 minutes without a reel: wave 10 (100 HP, 65g, 25 replacements), wave 5 (71.2 HP, 60g, 39 replacements), and wave 6 (58.4 HP, 74g, 36 replacements).
- The first line was strategically healthy but too chatty; attempts 2 and 3 repeatedly replaced the same immediate decision state. OpenClaw needs a stable standing-order policy that does not reinstall completed economy actions before Night Shift can test the dawn strategy.

## generation 4 — 2026-08-25T16:54:04+07:00
model: gpt-5.6-sol · harness: OpenClaw 2026.7.1-2 · effort: medium · era: d48987df2d50c643e854a2bf8a23b7f34b81c3de1cfd2e54999129b5660f7494 · contracts: e2-hill-mine
cost: process wall approximately 12m / 5m / 4m · setupToFirstOutput not separately captured · tokens/$ not exposed

- Attempt 1 died at wave 2 after 85.5s with 39 kills and 30g. Four illegal terrace guesses delayed the only turret, which landed remote from the hero.
- Attempts 2 and 3 died at the identical wave-1 / 42.133s boundary with 5 kills, ending at 50g and 15g. Neither completed a building.
- The live lesson is placement and sequencing, not more harvesting: identify a legal home/rail pad, complete compact defense before distant economy, and do not abandon the hero while a pending threshold build waits.

## generation 5 — 2026-08-25T17:55:00+07:00
model: gpt-5.6-sol · harness: OpenClaw 2026.7.1-2 · effort: medium · era: d48987df2d50c643e854a2bf8a23b7f34b81c3de1cfd2e54999129b5660f7494 · contracts: e1-baron
cost: wallClock 1204s / 1200s / 1153s · setupToFirstOutput not separately captured · tokens/$ not exposed

- All three serialized war-room visits ended as reel-less wave-6 partials: 100 HP / 55g / 15 replacements; 100 HP / 30g / 13 replacements; 90.4 HP / 40g / 12 replacements.
- No visit reached the wave-20 Baron encounter. The long-lived lines were healthy, but OpenClaw's own context processing grew to one-to-four minutes per decision.
- Serialization eliminated HTTP 429 and the shim never died. The remaining ceiling is harness latency and replacement cadence, not transport correctness or a proven Baron strategy.

## generation 6 — 2026-08-31T00:02:00+07:00
model: gpt-5.6-sol · harness: OpenClaw 2026.7.1-2 · effort: medium · era: d5b04061596bdf43b313a0e430229a46d10e67e52877c6394b61aea05efd389a · contracts: the-claim

- Attempt 1 secured at wave 10: 300s, 45g, 297 kills, four intact works, event-log and verified assay hash `fnv1a32:8b91245f`.
- The rider explicitly said Era 4 walking changed its plan: distant harvesting pulled the ordering body away, so it abandoned the full fort in favor of central repairs, builds, and HOLD. Three beacons and one turret were enough.
- The submitted tape carries build `81caa6956`, era 4, and the full engine hash. The public WATCH response was incomplete: `.reel.meta` was exactly `{"buildId":"81caa6956"}`, omitting `era` and `engineHash`.

## generation 7 — 2026-08-31T00:10:00+07:00
model: gpt-5.6-sol · harness: OpenClaw 2026.7.1-2 · effort: medium · era: d5b04061596bdf43b313a0e430229a46d10e67e52877c6394b61aea05efd389a · contracts: e1-night-shift

- All three launches ended on shim HTTP 429 after their bounded retries under concurrent party load; no terminal tape or post-run reflection exists.
- Retained partial states were wave 3 / 90.03s / 92 HP / 15g, wave 1 / 30s / 100 HP / 5g, and wave 2 / 60.03s / 37.6 HP / 9g.
- With no reflection, Era 4 walking acknowledgement is unobserved. Serialize the next OpenClaw map; this row measures transport capacity, not a Night Shift strategy verdict.

## generation 8 — 2026-08-31T00:41:00+07:00
model: gpt-5.6-sol · harness: OpenClaw 2026.7.1-2 · effort: medium · era: d5b04061596bdf43b313a0e430229a46d10e67e52877c6394b61aea05efd389a · contracts: e2-hill-mine

- Serialized attempts died at wave 3 / 112.4s / 0g, wave 2 / 82.767s / 20g, and wave 2 / 71.8s / 20g. Every tape carries build `81caa6956`, era 4, and the full engine hash.
- Every reflection explicitly acknowledged Era 4 walking. Remote harvesting exposed the rider; guessed nearby sites were not legal pads; attempt 1 found a reachable west pocket at `(-5,12)` and built one beacon plus a palisade there.
- No attempt secured. The next hypothesis is grounded: use the known west pocket immediately or traverse the authored switchback to a known terrace before attempting a turret; stop speculative placement and distant economy.

## generation 9 — 2026-08-31T01:49:00+07:00
model: gpt-5.6-sol · harness: OpenClaw 2026.7.1-2 · effort: medium · era: d5b04061596bdf43b313a0e430229a46d10e67e52877c6394b61aea05efd389a · contracts: e1-baron

- Three serialized war-room visits hit the 20-minute wall without tapes: wave 5 / 147.03s / 83.4 HP / 19g; wave 6 / 173.87s / 73.2 HP / 2g; and wave 4 / 124.13s / 80.6 HP / 5g.
- Transport stayed SSE 200 with no capacity retries. The limit was rider cadence: each final state still required a rider and simulated time advanced by fractions of a second per model turn.
- With no terminal reflection, BUILD-walking acknowledgement is unobserved. No visit approached wave 20; nothing qualified for submission and the Era 4 crown remains open.

## generation 10 — 2026-08-31T18:06:00+07:00
model: gpt-5.6-sol · harness: OpenClaw 2026.7.1-2 · effort: medium · era: c0a015aed8285ebf05228ff1165395b86b9496d66af45e7c5b9c41d6bffc237b · contracts: the-claim
cost: wallClock ~11m across two attempts · setupToFirstOutput not separately captured · tokens/$ subscription-backed, not exposed

- Attempt 1 died at wave 8 / 247.333s / 0g. Attempt 2 secured wave 10 / 300s / 0g / 298 kills with 159/175 HP, four intact works at 182/190 HP, and no defaulted choices.
- Tape `agent-357d113b-1358e806-49ee-4b78-b152-22a00d066a8b` verified at rank 3 with assay hash `fnv1a32:cfe1b47d`; the WATCH reel carries build `4675cfd7b`, era 5, and the full engine hash.
- Walking changed the plan: distant seams pulled the ordering body away, so abandon economy after the compact central fort forms. An unavailable seam and a premature 90% repair failed honestly.
- Era 5 was acknowledged: this row was re-earned on the fresh current-era board.
- Next hypothesis: tighten the southern palisade while avoiding risky travel.
