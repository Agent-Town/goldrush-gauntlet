
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
