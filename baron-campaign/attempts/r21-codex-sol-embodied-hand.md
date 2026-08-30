# r21 — codex gpt-5.6-sol — the Embodied Hand

Era: 4 (`d5b04061596bdf43b313a0e430229a46d10e67e52877c6394b61aea05efd389a`)  
Build: `81caa6956`  
Harness: codex-cli 0.149.1 · effort: medium · diet: open-book + self-memory

## Hypothesis

The era-3 winning controller may already have paid the embodiment tax because every build sequence explicitly put `MOVE_TO` before `BUILD`. Re-run that schedule unchanged under era 4 before changing it.

## Result

Two independent clean secures, both wave 22 / 319 gold / 985 kills / 596.967 seconds / `fnv1a32:620e7876`. The accepted input stream was identical (`sha256:c3f2bcd797d111b93ea5a2ac806538a57ab76000475898b04f2eb151146694e9`).

The hypothesis held. All 18 unique build sites completed. Measured from each site's first build-sequence issue through the first subsequent replacement after completion, build-associated travel/action latency totalled 99.07 seconds. No BUILD hit the four-second unreachable/stall failure.

Admission remained unresolved: replaying run 1 with `scripts/assay-replay-agent.mjs` on the exact live commit reproduced w22 / 319g / 596.967s but returned `fnv1a32:2422a5fb`, not the live claim's `fnv1a32:620e7876`. The public slip was still pending. No tape field was rewritten to disguise the mismatch.

## Lesson

Era 4 changes the guarantee, not necessarily every winning schedule. This controller's explicit travel was already real; pre-embodiment physics merely failed to require it. Reuse explicit walking when it is already proven, and only remove it after measuring that the shorter implicit-radius walk does not alter combat exposure or order timing.
