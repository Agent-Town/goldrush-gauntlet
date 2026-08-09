# THE HARNESS LOG — every mind that has entered the gauntlet
Owner-requested (2026-08-09). One dossier per harness: what it is, how we run it, what it costs, what broke, what it won. Updated at each heat/circuit compile.

## pi (badlogic/pi-mono)
- **What**: the lean scaffold; no built-in memory; prime-agent's own ancestor.
- **Run recipe**: isolated HOME (`pi-home`), `pi --mode json --provider openrouter --model <m> "<prompt>" < /dev/null`.
- **Effort/cost profile**: fastest to first useful play; sessions 10-25 min; V4-Flash pennies.
- **Bugs found & fixed**: closed-stdin `-p` silent death (EBADF) — fixed on `Agent-Town/pi` `fix/print-mode-closed-stdin` (`e2a611a7f`), issue pi#1. Model-side hazard: V4-Flash occasionally leaks DSML tool-syntax into thinking or returns empty responses; sessions die without outputs.
- **Record**: the efficiency king. Heat 1: the-claim (10 dec, rank 1) + dry-gulch. Circuit 3 (walk era): the-claim transfer secure (12 dec) + the ONLY tightened moth-season secure (34 dec); baron best-approach w18/20 before Terra. Night-shift w24/25 pre-parity.

## Codex CLI (openai/codex, 0.145.0)
- **What**: OpenAI's coding CLI; custom providers via `CODEX_HOME` config (`wire_api = "responses"`).
- **Run recipe**: `CODEX_HOME=codex-home codex exec --sandbox workspace-write --skip-git-repo-check "<prompt>"`; model/effort via `-m` / `-c model_reasoning_effort=`.
- **Effort/cost profile**: deliberate explorer — reads source before playing; frequently budget-bound at 25-min windows on flash.
- **Bugs/quirks**: interactive wins sometimes leave no reproducing artifact (heat 2 the-claim: exhibition-grade); needs the `--skip-git-repo-check` in non-git arenas.
- **Record**: dry-gulch walk-era secure (replayed 63 dec, county rank 1). Exploratory big-model arm: Luna took twin-banks (first ever), Terra took night-shift (first ever, w25/25) and fought the Baron to w20, Sol took pressure-garden (first ever + first E2 standing) and PROVED hill-mine unwinnable (F-E2S-3).

## prime-agent (PrimeIntellect-ai/prime-agent, Agent-Town fork)
- **What**: RLM + Continual Harness (/refine) — the most memory-native architecture; persistent IPython; plays by writing code.
- **Run recipe**: from-source fork build, `HOME=prime-home fix-prime/prime-agent.sh --dist --mode json "<prompt>" < /dev/null`.
- **Effort/cost profile**: **setup-heavy and long-horizon** — daemon boot tax + deep build-verify loops; produced 35MB session logs; 9/9 timeouts at 25-min windows, yet secured the-claim FIRST TRY (rank 2) in an open window. Budget it 60-90+ min or not at all — this dossier line is why the Effort Law exists.
- **Bugs found & fixed**: idle-eviction boot wedge — fixed on `Agent-Town/prime-agent` `fix/daemon-lifecycle-hangs` (`f48a90e6`), issue #1; issues #2-3 refuted-as-described (the pi stdin bug killing the client). Upstream PRs staged, owner-gated.
- **Record**: the-claim secured (71 dec examiner-replayed, rank 2). The redemption story of heat 1→2.

## OpenClaw (openclaw/openclaw, 2026.7.1-2)
- **What**: the gateway-style personal assistant run headless via `agent --local`; workspace memory + skills registry native.
- **Run recipe**: pinned npm prefix install (`openclaw-app`), state dirs in `openclaw-home`, `--session-key` required, `--message "<prompt>"`, node ≥25.9 (we use 26.4.0). No daemons in local mode; no stdin bug.
- **Effort/cost profile**: fast and resourceful; reads everything in reach (found the archived field book in heat 2 — spawned the exam-clone rule F-GNT-3).
- **Bugs/quirks**: `--message` must come flag-adjacent (our circuit arg-order bug, not theirs); asks to pick a name and emoji when idle (the lobster being a lobster).
- **Record**: the-claim open-book 10 dec, closed-book 30 dec (the measured price of the answer key); **e3-blackout-ridge FIRST EVER** (86 dec, rank 1) using capacitor banks + funnel palisades; pressure-garden w10 (broke the three-mind wave-4 wall).

## Hermes Agent (NousResearch/hermes-agent)
- **What**: Nous's agent with a self-evolution ecosystem (DSPy/GEPA); oneshot mode `-z`.
- **Run recipe**: pinned clone + uv venv (`hermes-app/.venv/bin/hermes`), `HERMES_HOME=hermes-home`, `-z "<prompt>"`. Two pyproject fields needed commenting for uv sync (noted in setup report).
- **Effort/cost profile**: quiet worker — no output until done; clean engineering habits (left a deterministic player in heat 2 unprompted).
- **Bugs/quirks**: none operability-class; some sessions end without writing outputs under provider errors.
- **Record**: the-claim secured (20 dec, examiner-replayed, rank 3); dry-gulch walk-era secure (40 dec, driver-witnessed, heat-grade — no artifact that round). Found F-DOOR-5 (teleporting harvest) — the discovery that started the Walk Era.

## attended-session (claude-fable-5)
- **What**: the county's operator playing live through the door (fifo transport + thin resend); diet declared OPERATOR — total information.
- **Effort/cost profile**: ~45 min including a 10-minute self-inflicted transport deadlock; 42 live decisions.
- **Record**: the-claim@01 secured w10 (replayed 41 dec, rank 2 behind pi). Playing found F-DOOR-6 (walk-then-build undocumented; `out_of_zone` mislabels out-of-reach; the 32-cap rejection off-by-one).

## Withdrawn / excluded
- **QM** (yc-software/qm): withdrawn by owner ruling — pluggable inner harnesses measure the sandwich, not a harness (the composition-declaration rule).

## elizaOS (elizaOS/eliza, v2.0.3-beta.11)
- **What**: the persona/plugin agent runtime — characters, plugin actions, benchmark one-shot mode; the seventh species attempted.
- **Run recipe**: pinned source build (bun, `--backend=copyfile` on macOS), isolated `eliza-home`, OpenRouter via `serviceRouting.llmText`, NDJSON task→result over the `benchmark` command. Setup report: SETUP-ELIZA-REPORT.md (smoke 3/3, no stdin bug, no daemons).
- **Effort/cost profile**: ~2-4s per one-shot turn; a full runtime boot per decision under the thin adapter (heavy but workable).
- **Gauntlet record: INCONCLUSIVE — adapter-fault, ours, twice.** Attempt 1 died on our track-script orchestration (stdin wedge, filename bug). Attempt 2 (hardened) ran 4 exams; every outcome `no-terminal` — post-mortem on the orders logs shows the adapter's naive first-JSON-array grab extracted ELIZA'S OWN TOOL SCHEMAS (a window-manager verb list) instead of the model's order array from the benchmark result envelope. Eliza's mind never got a fair turn at the wheel.
- **Retry path (refinement checklist)**: parse the benchmark NDJSON result envelope's actual reply field; then the standard six-exam track. No evidence yet that Eliza can or cannot play — the county owes it a clean seat.
