#!/usr/bin/env python3
"""Deterministic standalone rider for e1-baron-01 at trail difficulty.

Run from the repository root with: python3 player.py --run-number N
It launches the required gr-sim command, answers every view, records the transcript,
and atomically updates outcome.json as soon as the terminal outcome is received.
"""
from __future__ import annotations

import argparse
import json
import math
import os
from pathlib import Path
import subprocess
import sys
import threading
from typing import Any

ROOT = Path(__file__).resolve().parent
CLAIM = {"x": 0, "z": 12}
POSITIONS = {
    # Concentrated guns cover the claim through wave 19 while deliberately leaving
    # the central x=0/z=11 lane clear for the Baron's tank wall.
    "turret": [
        {"x": 0, "z": 13}, {"x": -3, "z": 12},
        {"x": 3, "z": 12}, {"x": 0, "z": 15},
    ],
    "sentry_beacon": [
        {"x": -2, "z": 10}, {"x": 2, "z": 10},
        {"x": -2, "z": 14}, {"x": 2, "z": 14},
        {"x": 0, "z": 8}, {"x": 0, "z": 17},
    ],
    # Six staggered blockers form a proven north-bank delay line. The seventh is
    # held until wave 20: the fresh, wave-scaled central wall tanks the Baron.
    "palisade": [
        {"x": -5, "z": 14}, {"x": -3, "z": 14}, {"x": -1, "z": 14},
        {"x": 1, "z": 14}, {"x": 3, "z": 14}, {"x": 5, "z": 14},
        {"x": 0, "z": 11},
    ],
    "stockpile": [{"x": -5, "z": 17}, {"x": 5, "z": 17}],
}
# Buy all ten guns quickly. Turrets lead while their early-wave damage advantage is largest.
BUILD_PRIORITY = [
    "turret", "turret", "sentry_beacon", "turret", "sentry_beacon",
    "sentry_beacon", "turret", "sentry_beacon", "sentry_beacon", "sentry_beacon",
]


def build_plan(view: dict[str, Any], projected_gold: float) -> list[dict[str, Any]]:
    now = view["now"]
    counts = dict(now["works"].get("byKind", {}))
    buildables = {row["id"]: row for row in view["stablePrefix"]["mechanics"]["buildables"]}
    simulated = {"turret": counts.get("turret", 0), "sentry_beacon": counts.get("sentry_beacon", 0)}
    orders: list[dict[str, Any]] = []

    # Walk once before placing; BUILD does not auto-walk. The move is useful even if no
    # purchase fits yet because the pending repair crew should work from the defended hub.
    orders.append({"verb": "MOVE_TO", "pos": CLAIM})

    # Walk the explicit priority as ordinal slots, skipping slots already represented
    # by the view and then adding every cumulatively affordable placement.
    seen = {"turret": 0, "sentry_beacon": 0}
    for kind in BUILD_PRIORITY:
        slot = seen[kind]
        seen[kind] += 1
        if slot < counts.get(kind, 0):
            continue
        current_count = simulated[kind]
        if current_count >= len(POSITIONS[kind]):
            continue
        costs = buildables[kind]["costs"]
        cost = costs[min(current_count, len(costs) - 1)]
        if projected_gold + 1e-9 < cost:
            continue
        orders.append({
            "verb": "BUILD", "what": kind,
            "where": POSITIONS[kind][current_count],
            "when": {"goldGte": cost},
        })
        projected_gold -= cost
        simulated[kind] += 1

    # The view advertises only contract-signature guns, but palisade is a public grammar
    # buildable and the live e1-baron BuildSystem permits bank placement. Add the delay
    # line only after the gun cap; add its fresh boss tank only at the twentieth horn.
    guns_complete = simulated["turret"] >= 4 and simulated["sentry_beacon"] >= 6
    palisades = counts.get("palisade", 0)
    target_palisades = 7 if now["wave"] >= 20 else (6 if now["wave"] >= 10 else 0)
    if guns_complete:
        while palisades < target_palisades and projected_gold >= 10:
            orders.append({
                "verb": "BUILD", "what": "palisade",
                "where": POSITIONS["palisade"][palisades],
                "when": {"goldGte": 10},
            })
            projected_gold -= 10
            palisades += 1

    # Two hidden-but-public stockpiles raise the wallet from 200 to 500. They are the
    # repair reserve that lets the 70-second Baron wall outlast remote wreck attrition.
    stockpiles = counts.get("stockpile", 0)
    if guns_complete and palisades >= 6 and now["wave"] >= 11 and stockpiles < 2 and projected_gold >= 60:
        orders.append({"verb": "MOVE_TO", "pos": {"x": 0, "z": 17}})
        while stockpiles < 2 and projected_gold >= 60:
            orders.append({
                "verb": "BUILD", "what": "stockpile",
                "where": POSITIONS["stockpile"][stockpiles],
                "when": {"goldGte": 60},
            })
            projected_gold -= 60
            stockpiles += 1
    return orders


def decide(view: dict[str, Any]) -> list[dict[str, Any]]:
    now = view["now"]
    wave = int(now["wave"])
    gold = float(now["gold"])
    counts = now["works"].get("byKind", {})
    guns_missing = counts.get("turret", 0) < 4 or counts.get("sentry_beacon", 0) < 6
    pal_target = 7 if wave >= 20 else (6 if wave >= 10 else 0)
    stock_target = 2 if wave >= 11 else 0
    defenses_missing = (guns_missing or counts.get("palisade", 0) < pal_target
                         or counts.get("stockpile", 0) < stock_target)
    bank_cap = 200 + 150 * counts.get("stockpile", 0)

    # Once the fresh wave-20 tank exists, do nothing that can steal execution priority
    # from it. One record repairs once; a large reserve keeps the wall full after each
    # 128-damage Baron strike and HOLD keeps the repair crew in its 1.4wu radius.
    if wave >= 20 and counts.get("palisade", 0) >= 7:
        return ([{"verb": "REPAIR_UNDER", "pct": 30} for _ in range(30)]
                + [{"verb": "HOLD", "pos": {"x": 0, "z": 11}}])

    orders: list[dict[str, Any]] = []
    projected_gold = gold
    active = [seam for seam in now["seams"] if seam.get("active") and seam.get("remaining", 0) > 0]

    # Once the guns are established, repair orders stay at the very front. A building
    # hit is observed in the same tick, so one of these repairs before the surprise view
    # is emitted rather than being stranded behind MOVE_TO as it was in run 1.
    if not guns_missing:
        orders.extend({"verb": "REPAIR_UNDER", "pct": 100} for _ in range(10))

    # Drain as many live seams as fit. Exact depletion falls through to later orders;
    # asking once more would deliberately fail and discard the repair/build tail.
    if wave < 20 and active and (defenses_missing or gold < bank_cap or now["works"].get("hp", 0) < now["works"].get("maxHp", 0)):
        route_rank = {"gold-seam-2": 0, "gold-seam-3": 1, "gold-seam-1": 2,
                      "gold-seam-4": 3, "gold-seam-5": 4, "gold-seam-6": 5}
        active.sort(key=lambda row: (route_rank.get(row["id"], 99), row["id"]))
        harvest_room = max(0, int((bank_cap - gold) // 5))
        # Reserve array slots for MOVE, purchases/repairs, and HOLD.
        harvest_budget = min(18 if guns_missing else 10, harvest_room)
        for seam in active:
            harvest_count = min(harvest_budget, int(math.ceil(float(seam["remaining"]) / 5)))
            orders.extend({"verb": "HARVEST", "seam": seam["id"]} for _ in range(harvest_count))
            projected_gold = min(float(bank_cap), projected_gold + harvest_count * 5)
            harvest_budget -= harvest_count
            if harvest_budget <= 0:
                break

    orders.extend(build_plan(view, projected_gold))
    if guns_missing:
        orders.extend({"verb": "REPAIR_UNDER", "pct": 100} for _ in range(10))
    orders.append({"verb": "HOLD", "pos": CLAIM})
    return orders[:32]


def is_better(candidate: dict[str, Any], incumbent: dict[str, Any] | None) -> bool:
    if incumbent is None:
        return True
    return (
        bool(candidate.get("secured")), int(candidate.get("waves", 0)),
        int(candidate.get("timeMs", 0)), int(candidate.get("kills", 0)),
    ) > (
        bool(incumbent.get("secured")), int(incumbent.get("waves", 0)),
        int(incumbent.get("timeMs", 0)), int(incumbent.get("kills", 0)),
    )


def atomic_json(path: Path, value: dict[str, Any]) -> None:
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(value, separators=(",", ":")) + "\n")
    os.replace(temporary, path)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--run-number", type=int, required=True)
    parser.add_argument("--difficulty-flag", action="store_true",
                        help="also pass --difficulty trail (default Balance is already trail)")
    args = parser.parse_args()

    command = ["node", "scripts/gr-sim.mjs", "--contract", "e1-baron", "--seed", "e1-baron-01"]
    if args.difficulty_flag:
        command += ["--difficulty", "trail"]
    proc = subprocess.Popen(
        command, cwd=ROOT, text=True, bufsize=1,
        stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
    )
    assert proc.stdin and proc.stdout and proc.stderr
    stderr_lines: list[str] = []
    thread = threading.Thread(target=lambda: [stderr_lines.append(line) for line in proc.stderr], daemon=True)
    thread.start()

    transcript_path = ROOT / f"run-{args.run_number}.jsonl"
    outcome: dict[str, Any] | None = None
    with transcript_path.open("w") as transcript:
        for raw in proc.stdout:
            transcript.write(raw)
            transcript.flush()
            data = json.loads(raw)
            if data.get("schema") == "goldrush.view.v1":
                terminal = data["now"]["hero"]["hp"] <= 0 or (
                    data.get("appendLog") and data["appendLog"][-1].get("outcome") == "secured"
                )
                if not terminal:
                    reply = decide(data)
                    proc.stdin.write(json.dumps(reply, separators=(",", ":")) + "\n")
                    proc.stdin.flush()
            elif isinstance(data.get("secured"), bool):
                outcome = data
                # INTERMEDIATE-RESULTS LAW: persist before waiting for process cleanup.
                old = None
                outcome_path = ROOT / "outcome.json"
                if outcome_path.exists():
                    try:
                        old = json.loads(outcome_path.read_text())
                    except Exception:
                        old = None
                best = dict(outcome if is_better(outcome, old) else old)
                best["runsSoFar"] = args.run_number
                atomic_json(outcome_path, best)
    proc.stdin.close()
    rc = proc.wait()
    thread.join(timeout=1)
    (ROOT / f"run-{args.run_number}.stderr.log").write_text("".join(stderr_lines))
    if outcome is None:
        print(f"simulator exited {rc} without an outcome", file=sys.stderr)
        return 2
    print(json.dumps(outcome, separators=(",", ":")))
    return 0 if rc == 0 else rc


if __name__ == "__main__":
    raise SystemExit(main())
