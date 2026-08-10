# ElizaOS issue drafts — from the Gold Rush gauntlet (2026-08-10, pinned v2.0.3-beta.11 / d84b58a)

County law: these file as issues on OUR fork when it exists (Agent-Town tradition — never upstream without per-item owner word). Each was found while seating Eliza at the Gold Rush gauntlet and reproduced; full evidence in `bench/gauntlet/heat2/eliza-sol/` (game repo) and the memories notebooks.

## 1. benchmark: envelope `response` intermittently empty when the reply is tool-mediated
`packages/agent/dist/cli/benchmark.js` captures callback/stream/responseContent text, but a v5 tool-mediated reply sometimes closes with `response: ""` and `success: true` — the reply text lives only in the reply tool's arguments and is never surfaced. Downstream consumers cannot distinguish "agent chose silence" from "harness lost the reply". Repro: game-view prompts, ~40% of calls across ~60 decisions.

## 2. benchmark: sequential invocations collide on the shared PGlite dir
Each one-shot `benchmark` boots a fresh runtime against `ELIZA_STATE_DIR/workspace/.elizadb`; a back-to-back second invocation lands while the first still holds the lock → `Runtime boot failed: PGlite data dir is already in use`, envelope `response:""`. A benchmark driver looping tasks hits this constantly. Suggest: retry-with-backoff on the lock inside benchmark boot, or a documented per-invocation `PGLITE_DATA_DIR` isolation flag.

## 3. benchmark: `detectTaskType` keyword regex misroutes prompts containing "build"
`/\b(implement|build|create|write|code|…)\b/i` routes any prompt containing the word "build" to the coding pipeline, which appends "write the complete code implementation in ```typescript blocks". Game/agent prompts about *building things in a world* are misclassified wholesale. The explicit `task.type` field works and is the workaround; suggest weighting or an opt-out env.

## 4. message service: internal tool-call records leak into reply text as prose
Replies of the shape `On it.{"type":"tool_call","toolCall":{…VIEWS/WEB_FETCH…},"contextEvent":{…}}` — a pending internal tool call serialized into the user-visible reply. Also observed: prompt section header "CURRENT VIEW" name-primes the `VIEWS` tool. Suggest: never serialize pending tool state into reply text; resolve or drop.

## 5. v5 runtime: `Trajectory limit exceeded: required_tool_misses (4/3)` surfaces as a silent canned apology
When the model repeatedly answers in plain text instead of calling the required reply tool (e.g., because the provider lacks tool support), the run dies with the trajectory error in logs but the user-facing reply is only "Something went wrong…". The error should reach the benchmark envelope's `error` field (it reaches logs today).
