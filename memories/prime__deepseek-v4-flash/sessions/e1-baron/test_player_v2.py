import sys, json, math

views = []

dist = lambda a, b: math.hypot(a['x'] - b['x'], a['z'] - b['z'])

def decide(view):
    now = view['now']
    sp = view['stablePrefix']
    mechanics = sp['mechanics']

    gold = now['gold']
    wave = now['wave']
    works = now['works']
    seams = now['seams']
    prospector = now['prospector']

    orders = []

    # Get current building counts
    standing = works.get('byKind', {})
    beacon_count = standing.get('sentry_beacon', 0)
    turret_count = standing.get('turret', 0)

    buildables = {b['id']: b for b in mechanics['buildables']}

    def cost(kind, count):
        arr = buildables[kind]['costs']
        idx = min(len(arr) - 1, count)
        return arr[idx]

    # Build positions near claim (0,12)
    beacon_positions = [
        {"x": -3, "z": 12},
        {"x": 3, "z": 12},
        {"x": 0, "z": 16},
        {"x": -5, "z": 8},
        {"x": 5, "z": 8},
        {"x": 0, "z": 8},
    ]

    turret_positions = [
        {"x": 0, "z": 14},
        {"x": -4, "z": 10},
        {"x": 4, "z": 10},
        {"x": 0, "z": 6},
    ]

    # Repair first if buildings are damaged or wrecked
    works_hp = works['hp']
    works_max = works['maxHp']
    if works_max > 0:
        pct = (works_hp / works_max) * 100
        if pct < 70:
            orders.append({"verb": "REPAIR_UNDER", "pct": 70})

    # Build first, before HARVEST
    # Only build if prospector is near claim (distance < 4) to avoid out_of_zone failures
    claim = sp['map']['claim']
    near_claim = dist(prospector, claim) < 4

    if near_claim:
        if beacon_count < len(beacon_positions):
            c = cost('sentry_beacon', beacon_count)
            if gold >= c:
                orders.append({
                    "verb": "BUILD",
                    "what": "sentry_beacon",
                    "where": beacon_positions[beacon_count],
                    "when": {"goldGte": c}
                })

        if turret_count < len(turret_positions):
            c = cost('turret', turret_count)
            if gold >= c:
                orders.append({
                    "verb": "BUILD",
                    "what": "turret",
                    "where": turret_positions[turret_count],
                    "when": {"goldGte": c}
                })

    # Harvest: prefer closest active seam
    active_seams = [s for s in seams if s.get('active', False)]
    if active_seams:
        seam_map = {s['id']: s for s in sp['map']['seams']}
        # Find closest seam to prospector
        best = None
        best_dist = float('inf')
        for s in active_seams:
            pos = seam_map.get(s['id'])
            if pos:
                d = dist(prospector, pos)
                if d < best_dist:
                    best_dist = d
                    best = s
        if best:
            orders.extend([{"verb":"HARVEST","seam":best['id']} for _ in range(6)])

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
            with open('test_v2_views.json', 'w') as f:
                json.dump(views, f)
            print(json.dumps(data), file=sys.stderr, flush=True)
            break

if __name__ == '__main__':
    main()
