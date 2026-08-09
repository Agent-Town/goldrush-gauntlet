import json, sys, math, subprocess, os

def run():
    cwd = os.getcwd()
    proc = subprocess.Popen(
        ['node', 'scripts/gr-sim.mjs', '--contract', 'e1-night-shift', '--seed', 'e1-night-shift-01', '--difficulty', 'trail'],
        stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE, text=True, cwd=cwd
    )

    outcome = None
    turn_count = 0
    seam_positions = {}

    while True:
        line = proc.stdout.readline()
        if not line:
            break
        line = line.strip()
        if not line:
            continue
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            print('PARSE ERROR:', line[:200], file=sys.stderr)
            continue

        if isinstance(obj, dict) and obj.get('secured') is not None:
            outcome = obj
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
        threats = now.get('threats', {})
        mechanics = view.get('stablePrefix', {}).get('mechanics', {})
        buildables = {b['id']: b for b in mechanics.get('buildables', [])}

        if not seam_positions:
            for s in view.get('stablePrefix', {}).get('map', {}).get('seams', []):
                seam_positions[s['id']] = {'x': s['x'], 'z': s['z']}

        by_kind = works.get('byKind', {})
        beacon_count = by_kind.get('sentry_beacon', 0)
        turret_count = by_kind.get('turret', 0)
        wrecked = works.get('wrecked', 0)

        print(f'WAVE={wave} gold={gold} hero_hp={hero.get("hp")} threats_alive={threats.get("alive")} wrecked={wrecked} beacons={beacon_count} turrets={turret_count} prospector=({prospector.get("x"):.1f},{prospector.get("z"):.1f})', file=sys.stderr)

        orders = []

        active_seams = [s for s in seams if s.get('active')]
        if active_seams and seam_positions:
            def seam_dist(s):
                pos = seam_positions.get(s['id'], {'x': 0, 'z': 0})
                return math.hypot(pos['x'] - prospector['x'], pos['z'] - prospector['z'])
            nearest = min(active_seams, key=seam_dist)
            orders.append({"verb": "HARVEST", "seam": nearest["id"]})

        if wrecked > 0 and gold >= 5:
            orders.append({"verb": "REPAIR_UNDER", "pct": 100})

        beacon_positions = [(0, 6), (-6, 12), (6, 12), (0, 16), (-4, 8), (4, 8)]
        turret_positions = [(0, 10), (-5, 10), (5, 10), (0, 14)]

        for i, (x, z) in enumerate(beacon_positions):
            if beacon_count <= i:
                defn = buildables.get('sentry_beacon')
                if defn:
                    costs = defn.get('costs', [])
                    cost = costs[i] if i < len(costs) else (costs[-1] if costs else 9999)
                    orders.append({"verb": "BUILD", "what": "sentry_beacon", "where": {"x": x, "z": z}, "when": {"goldGte": cost}})

        for i, (x, z) in enumerate(turret_positions):
            if turret_count <= i:
                defn = buildables.get('turret')
                if defn:
                    costs = defn.get('costs', [])
                    cost = costs[i] if i < len(costs) else (costs[-1] if costs else 9999)
                    orders.append({"verb": "BUILD", "what": "turret", "where": {"x": x, "z": z}, "when": {"goldGte": cost}})

        if threats.get('alive', 0) >= 5:
            orders.append({"verb": "MOVE_TO", "pos": {"x": 0, "z": 6}})

        print(f'ORDERS: {json.dumps(orders)}', file=sys.stderr)
        proc.stdin.write(json.dumps(orders) + "\n")
        proc.stdin.flush()

    proc.stdin.close()
    proc.stdout.close()
    stderr = proc.stderr.read()
    proc.kill()

    print('STDERR FROM SIM:', file=sys.stderr)
    print(stderr, file=sys.stderr)
    print(f'OUTCOME: {json.dumps(outcome)}', file=sys.stderr)

    return outcome

if __name__ == '__main__':
    run()
