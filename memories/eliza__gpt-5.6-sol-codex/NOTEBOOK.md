# NOTEBOOK — eliza × gpt-5.6-sol (codex subscription via codex-bridge)

## generation — 2026-08-10 the-claim@02 (FIRST REAL PLAY IN THIS HARNESS'S HISTORY)
- Track 7 attempt 1 is the first game Eliza ever actually played: eventLogHash `fnv1a32:2d9d7d13` (distinct from idle baseline `f0bfb983`), 20 gold banked at death, wave-5 terminal. Attempt 2 relapsed to the idle hash — her runtime returned empty replies mid-run and each silence wiped the standing set (sticky-orders fairness fix not yet applied).
- Her play, observed live: FALLBACK_IF retreat triggers (enemiesGte 5→10 tuned across decisions), named-seam HARVEST, BUILD sentry_beacon/turret with correct goldGte gates (25/35/50), REPAIR_UNDER 55-60%. Cross-attempt adaptation: beacons in early attempts, turrets later. One decision leaked a WEB_FETCH tool call trying to fetch the rulebook from GitHub mid-game.
- Death profile: dies at the wave-5 spike at the same tick as the idle baseline — economy works, defenses don't materialize in time (turret gates at 50g rarely open before the spike; beacons alone insufficient).
- Reliability: ~40% of decisions return empty replies (runtime hiccup, benchmark envelope empty with no error); cadence ~3 min/decision at bridge effort=medium; xhigh untenable (2-4 min per internal call, several per decision).
- The five-defect access chain that had to be cured before ANY of this: (1) benchmark default 120s timeout swallowing responses; (2) task classifier routing game prompts to the CODING pipeline on the keyword "build"; (3) zero-vector embedding stub crashing retrieval math; (4) missing /v1/models failing key validation; (5) missing tool-call translation tripping her v5 runtime's required-tool trajectory guard (4/3 misses). Cures live in `eliza-adapter/play.mjs` + `codex-bridge` v2 (goldrush-gauntlet/instruments).
<!-- harvested attended (her own lesson calls returned empty) · model: gpt-5.6-sol (codex subscription) · harness: eliza v2.0.3-beta.11 · effort: medium via codex-bridge · contract: the-claim@02 · verdict: played-unsecured w5 · wallClock: A1 ~1656s, A2 ~25min -->

## generation — 2026-08-10 the-claim

<!-- harvested auto · model: gpt-5.6-sol (codex subscription) · harness: eliza v2.0.3-beta.11 · effort: n/a · contract: the-claim · verdict: {"secured":false,"waves":5,"timeMs":160433,"gold":0,"kills": · wallClock: 572s -->

## generation — 2026-08-10 the-claim

<!-- harvested auto · model: gpt-5.6-sol (codex subscription) · harness: eliza v2.0.3-beta.11 · effort: n/a · contract: the-claim · verdict: {"secured":false,"waves":5,"timeMs":160433,"gold":0,"kills": · wallClock: 688s -->

## generation — 2026-08-10 the-claim

<!-- harvested auto · model: gpt-5.6-sol (codex subscription) · harness: eliza v2.0.3-beta.11 · effort: n/a · contract: the-claim · verdict: {"secured":false,"waves":5,"timeMs":160433,"gold":15,"kills" · wallClock: 1715s -->

## generation — 2026-08-10 the-claim

<!-- harvested auto · model: gpt-5.6-sol (codex subscription) · harness: eliza v2.0.3-beta.11 · effort: n/a · contract: the-claim · verdict: {"secured":false,"waves":9,"timeMs":279300,"gold":0,"kills": · wallClock: 3019s -->

## track-11 close — the configuration that works (attended consolidation, 2026-08-10)
- FINAL PROFILE: attempt 1 hash 86a5a4f9 (w5, 15g); attempt 2 hash dc97110c — **wave 9, 279s, 261 kills, 18 decisions, her best game ever, one wave short of securing**. 14 sticky-order saves across the track: the silence-wipes defect was real and the cure measurably carried her.
- Her own harvested lessons (verbatim from her lesson call): "On the-claim seed e1-the-claim-02, the run survived through wave 9 but did not secure, so merely reaching late waves is insufficient to satisfy the contract." · "The run recorded 261 kills yet still failed, strong evidence that combat output alone does not sec[ure]…"
- WORKING CONFIGURATION (empirical, tracks 6+11): full-rulebook prompt + type:research + codex-bridge v2 (tools both ways) + sticky orders + boot-collision retries + hour budget + effort medium. The slim native-skill prompt UNDERPERFORMS: it primes her VIEWS tool ("current view" name-collision) and a blanket no-tools law breaks her v5 reply-tool contract.
- REMAINING UPSTREAM DEFECTS (ours to file on the fork, not patch around): (1) benchmark envelope intermittently returns empty response when the reply is tool-mediated; (2) sequential benchmark invocations collide on the shared PGlite dir; (3) task classifier keyword regex (\bbuild\b) misroutes game prompts to the coding pipeline; (4) internal tool-call records leak into response text as prose.
<!-- consolidated attended · model: gpt-5.6-sol (codex subscription) · harness: eliza v2.0.3-beta.11 · contract: the-claim@02 · verdict: played-unsecured w9 peak · era: walk 3dd7790d -->
