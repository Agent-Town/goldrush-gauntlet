
## generation — 2026-08-09 the-claim

<!-- harvested auto · model: deepseek/deepseek-v4-flash · harness: eliza v2.0.3-beta.11 · effort: n/a · contract: the-claim · verdict: {"secured":false,"waves":3,"timeMs":99033,"gold":0,"kills":5 · wallClock: 5s -->

## generation — 2026-08-09 e1-dry-gulch

<!-- harvested auto · model: deepseek/deepseek-v4-flash · harness: eliza v2.0.3-beta.11 · effort: n/a · contract: e1-dry-gulch · verdict: {"secured":false,"waves":4,"timeMs":143267,"gold":0,"kills": · wallClock: 6s -->

## generation — 2026-08-09 e1-twin-banks

<!-- harvested auto · model: deepseek/deepseek-v4-flash · harness: eliza v2.0.3-beta.11 · effort: n/a · contract: e1-twin-banks · verdict: {"secured":false,"waves":3,"timeMs":99700,"gold":0,"kills":4 · wallClock: 5s -->

## generation — 2026-08-09 e1-night-shift

<!-- harvested auto · model: deepseek/deepseek-v4-flash · harness: eliza v2.0.3-beta.11 · effort: n/a · contract: e1-night-shift · verdict: {"secured":false,"waves":5,"timeMs":155300,"gold":0,"kills": · wallClock: 12s -->

## generation — 2026-08-09 e2-pressure-garden

<!-- harvested auto · model: deepseek/deepseek-v4-flash · harness: eliza v2.0.3-beta.11 · effort: n/a · contract: e2-pressure-garden · verdict: {"secured":false,"waves":4,"timeMs":148900,"gold":0,"kills": · wallClock: 5s -->

## generation — 2026-08-09 e3-canyon-works

<!-- harvested auto · model: deepseek/deepseek-v4-flash · harness: eliza v2.0.3-beta.11 · effort: n/a · contract: e3-canyon-works · verdict: {"secured":false,"waves":3,"timeMs":101600,"gold":0,"kills": · wallClock: 5s -->

## generation — 2026-08-10 the-claim

<!-- harvested auto · model: deepseek/deepseek-v4-flash · harness: eliza v2.0.3-beta.11 · effort: n/a · contract: the-claim · verdict: {"secured":false,"waves":5,"timeMs":160433,"gold":0,"kills": · wallClock: 947s -->

## generation — 2026-08-10 the-claim

<!-- harvested auto · model: deepseek/deepseek-v4-flash · harness: eliza v2.0.3-beta.11 · effort: n/a · contract: the-claim · verdict: {"secured":false,"waves":5,"timeMs":160433,"gold":0,"kills": · wallClock: 946s -->

## generation — 2026-08-10 the-claim
- On e1-the-claim-02, the run reached wave 5 but did not secure the claim after 160.433 seconds.
- Scoring 104 kills while still failing shows that eliminating enemies alone is insufficient; claim preservation and economy must remain priorities.
- The run ended with 0 gold, leaving no reserve for emergency builds or repairs; preserve or regenerate gold through the later waves.
- Across recorded the-claim attempts, survival improved from wave 3 to wave 5, but wave 5 remains a repeated failure plateau that requires an earlier strategic change.
<!-- harvested auto · model: deepseek/deepseek-v4-flash · harness: eliza v2.0.3-beta.11 · effort: n/a · contract: the-claim · verdict: {"secured":false,"waves":5,"timeMs":160433,"gold":0,"kills": · wallClock: 967s -->

## generation — 2026-08-10 the-claim

<!-- harvested auto · model: deepseek/deepseek-v4-flash · harness: eliza v2.0.3-beta.11 · effort: n/a · contract: the-claim · verdict: {"secured":false,"waves":5,"timeMs":160433,"gold":0,"kills": · wallClock: 964s -->

## generation — 2026-08-10 the-claim

<!-- harvested auto · model: deepseek/deepseek-v4-flash · harness: eliza v2.0.3-beta.11 · effort: n/a · contract: the-claim · verdict: {"secured":false,"waves":5,"timeMs":160433,"gold":0,"kills": · wallClock: 949s -->

---
## CORRECTION (attended, 2026-08-10) — the rounds above were never played
Post-mortem of the Sol arm found every order file from BOTH flash rounds contains only `[]` lines: the benchmark envelope returned `response:""` (per-task default timeout 120000ms, error field unread by the adapter), and the adapter's `[]` fallback masked it as a "do nothing" choice. **All flash-round outcomes here are the idle baseline, not Eliza's play.** Lessons above describe what an unmanned run looks like on these maps; treat them as baseline data only. The cure (explicit `--timeout`, envelope-error logging) shipped in `eliza-adapter/play.mjs` the same day; her first REAL rows will land in a fresh generation dir.
