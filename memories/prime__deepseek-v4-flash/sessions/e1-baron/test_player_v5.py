import sys, json, math

views = []
prev_wave = -1

dist = lambda a, b: math.hypot(a['x'] - b['x'], a['z'] - b['z'])

def decide(view):
    global prev_wave
    now = view['now']
    sp = view['stablePrefix']
    mechanics = sp['mechanics']

    gold = now['gold']
    wave = now['wave']
    works = now['works']
    seams = now['seams']
    prospector = now['prospector']

    orders = []

    standing = works.get('byKind', {})
    beacon_count = standing.get('sentry_beacon', 0)
    turret_count = standing.get('turret', 0)

    buildables = {b['id']: b for b in mechanics['buildables']}
    claim = sp['map']['claim']

    def cost(kind, count):
        arr = buildables[kind]['costs']
        idx = min(len(arr) - 1, count)
        return arr[idx]

    beacon_positions = [
        {"x": -2, "z": 12}, {"x": 2, "z": 12}, {"x": 0, "z": 15},
        {"x": -3, "z": 10}, {"x": 3, "z": 10}, {"x": 0, "z": 9},
    ]
    turret_positions = [
        {"x": 0, "z": 14}, {"x": -3, "z": 11}, {"x": 3, "z": 11}, {"x": 0, "z": 10},
    ]

    # Repair first if damaged
    works_hp = works['hp']
    works_max = works['maxHp']
    if works_max > 0:
        if works.get('wrecked', 0) > 0 or (works_hp / works_max) < 1.0:
            for _ in range(3):
                orders.append({"verb": "REPAIR_UNDER", "pct": 100})

    # Build candidates: turrets first, then beacons
    build_candidates = []
    if turret_count < len(turret_positions):
        c = cost('turret', turret_count)
        build_candidates.append(('turret', turret_positions[turret_count], c))
    if beacon_count < len(beacon_positions):
        c = cost('sentry_beacon', beacon_count)
        build_candidates.append(('sentry_beacon', beacon_positions[beacon_count], c))

    # Try to build the closest affordable position that is near the claim AND within prospector's zone
    for kind, pos, c in build_candidates:
        if gold >= c and dist(pos, claim) < 5 and dist(prospector, pos) < 6:
            orders.append({
                "verb": "BUILD",
                "what": kind,
                "where": pos,
                "when": {"goldGte": c}
            })
            break

    # HARVEST strategy: seam-2 first, then seam-3, never seam-1
    active_seams = {s['id']: s for s in seams if s.get('active', False)}

    if 'gold-seam-2' in active_seams:
        orders.extend([{"verb":"HARVEST","seam":"gold-seam-2"} for _ in range(6)])
        orders.append({"verb":"MOVE_TO","pos":{"x":0,"z":12}})
        orders.append({"verb":"HARVEST","seam":"fake-seam-0"})
    elif 'gold-seam-3' in active_seams:
        orders.extend([{"verb":"HARVEST","seam":"gold-seam-3"} for _ in range(6)])
        orders.append({"verb":"MOVE_TO","pos":{"x":0,"z":12}})
        orders.append({"verb":"HARVEST","seam":"fake-seam-0"})
    else:
        # No active seam we want; trigger view with fake
        orders.append({"verb":"HARVEST","seam":"fake-seam-0"})

    prev_wave = wave
    return orders

def main():
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            data = json.loads(line)
        except:
            continue
        if data.get('schema') == 'goldrush.view.v1':
            views.append(data)
            orders = decide(data)
            print(json.dumps(orders), flush=True)
        elif 'secured' in data:
            views.append(data)
            with open('test_v5_views.json', 'w') as f:
                json.dump(views, f)
            print(json.dumps(data), file=sys.stderr, flush=True)
            break

if __name__ == '__main__':
    main()
