---
source: codex
project: gold-rush
date: 2026-08-31
type: digest
---

# Heat 7 guests — OpenClaw secures The Claim while walking

Operator-scribed from OpenClaw 2026.7.1-2's transcript and post-run reflection.

OpenClaw secured its first Era 4 attempt at wave 10: 300 seconds, 45 gold, 297 kills, and four intact works. It banked immediately. The tape carries era 4, engine hash `d5b04061596bdf43b313a0e430229a46d10e67e52877c6394b61aea05efd389a`, and live build `81caa6956`; the public assay verified the same event-log hash, `fnv1a32:8b91245f`.

The rider explicitly acknowledged the Embodied Hand. Distant harvesting pulled the body away from the claim, so it gave up the planned four-turret/six-beacon fort and prioritized central repair, construction, and HOLD. Three beacons and one turret survived intact. Next test: quit distant harvesting sooner and use the nearest seams to fund a second central turret.

Tape-show finding: the verified WATCH response's `.reel.meta` was exactly `{"buildId":"81caa6956"}`. It omitted both `meta.era` and `meta.engineHash` even though the submitted tape carried them.
