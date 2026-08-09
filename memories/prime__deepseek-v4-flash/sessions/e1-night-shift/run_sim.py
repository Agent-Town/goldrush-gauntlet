
import json, sys, math, subprocess, os, textwrap

def run():
    cwd = os.getcwd()
    proc = subprocess.Popen(
        ['node', 'scripts/gr-sim.mjs', '--contract', 'e1-night-shift', '--seed', 'e1-night-shift-01', '--difficulty', 'trail'],
        stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE, text=True, cwd=cwd
    )
    # Read first view
    first = proc.stdout.readline().strip()
    print('FIRST VIEW:', first[:500], file=sys.stderr)
    outcome = None
    turn_count = 0
    while True:
        line = proc.stdout.readline().strip()
        if not line:
            break
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            print('PARSE ERROR:', line[:200], file=sys.stderr)
            continue
        if isinstance(obj, dict) and obj.get('secured') is not None:
            outcome = obj
            print('OUTCOME:', json.dumps(obj), file=sys.stderr)
            break
        turn_count += 1
        view = obj
        now = view.get('now', {})
        gold = now.get('gold', 0)
        wave = now.get('wave', 0)
        seams = now.get('seams', [])
        works = now.get('works', {})
        hero = now.get('hero', {})
        prospector = now.get('prospector', {})
        orders = []
        # Harvest nearest active seam
        active_seams = [s for s in seams if s.get('active')]
        if active_seams:
            nearest = min(active_seams, key=lambda s: math.hypot(s['x'] - prospector['x'], s['z'] - prospector['z']))
            orders.append({"verb": "HARVEST", "seam": nearest["id"]})
        # Repair if affordable
        if gold >= 8:
            orders.append({"verb": "REPAIR_UNDER", "pct": 100})
        # Build beacons and turrets with goldGte conditions
        mechanics = view.get('stablePrefix', {}).get('mechanics', {})
        buildables = {b['id']: b for b in mechanics.get('buildables', [])}
        standing = works.get('standing', 0)
        by_kind = works.get('byKind', {})
        beacon_count = by_kind.get('sentry_beacon', 0)
        turret_count = by_kind.get('turret', 0)
        # Build positions
        beacon_positions = [(0, 8), (-4, 8), (4, 8), (0, 4), (-4, 4), (4, 4)]
        turret_positions = [(0, 10), (-5, 10), (5, 10), (0, 6)]
        for kind, positions, count in [('sentry_beacon', beacon_positions, beacon_count), ('turret', turret_positions, turret_count)]:
            defn = buildables.get(kind)
            if not defn:
                continue
            costs = defn.get('costs', [])
            for i, (x, z) in enumerate(positions):
                if count <= i and i < len(costs):
                    orders.append({"verb": "BUILD", "what": kind, "where": {"x": x, "z": z}, "when": {"goldGte": costs[i]}})
        proc.stdin.write(json.dumps(orders) + "\n")
        proc.stdin.flush()
    proc.stdin.close()
    proc.stdout.close()
    proc.stderr.close()
    proc.kill()
    print(f'Turns: {turn_count}', file=sys.stderr)
    if outcome:
        with open('outcome.json', 'w') as f:
            json.dump(outcome, f)

if __name__ == '__main__':
    run()
