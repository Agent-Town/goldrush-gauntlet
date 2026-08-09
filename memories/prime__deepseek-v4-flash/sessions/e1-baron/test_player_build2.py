import sys, json

views = []

def decide(view):
    now = view['now']
    sp = view['stablePrefix']
    mechanics = sp['mechanics']

    gold = now['gold']
    wave = now['wave']
    works = now['works']
    seams = now['seams']

    orders = []

    active_seams = [s for s in seams if s.get('active', False)]
    if active_seams:
        seam_ids = [s['id'] for s in active_seams]
        if 'gold-seam-2' in seam_ids:
            orders.extend([{"verb":"HARVEST","seam":"gold-seam-2"} for _ in range(6)])
        elif 'gold-seam-3' in seam_ids:
            orders.extend([{"verb":"HARVEST","seam":"gold-seam-3"} for _ in range(6)])
        elif 'gold-seam-1' in seam_ids:
            orders.extend([{"verb":"HARVEST","seam":"gold-seam-1"} for _ in range(6)])

    standing = works.get('byKind', {})
    beacon_count = standing.get('sentry_beacon', 0)
    turret_count = standing.get('turret', 0)

    buildables = {b['id']: b for b in mechanics['buildables']}

    def cost(kind, count):
        arr = buildables[kind]['costs']
        idx = min(len(arr) - 1, count)
        return arr[idx]

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

    if beacon_count < len(beacon_positions):
        c = cost('sentry_beacon', beacon_count)
        orders.append({
            "verb": "BUILD",
            "what": "sentry_beacon",
            "where": beacon_positions[beacon_count],
            "when": {"goldGte": c}
        })

    if turret_count < len(turret_positions):
        c = cost('turret', turret_count)
        orders.append({
            "verb": "BUILD",
            "what": "turret",
            "where": turret_positions[turret_count],
            "when": {"goldGte": c}
        })

    works_hp = works['hp']
    works_max = works['maxHp']
    if works_max > 0 and works_hp / works_max < 0.5:
        orders.append({"verb": "REPAIR_UNDER", "pct": 50})

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
            with open('test_build_views.json', 'w') as f:
                json.dump(views, f)
            print(json.dumps(data), file=sys.stderr, flush=True)
            break

if __name__ == '__main__':
    main()
