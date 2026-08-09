
import json, sys, math

def read_view():
    line = sys.stdin.readline()
    if not line:
        return None
    try:
        return json.loads(line.strip())
    except json.JSONDecodeError:
        return None

def send_orders(orders):
    print(json.dumps(orders), flush=True)

def distance(a, b):
    return math.hypot(a['x'] - b['x'], a['z'] - b['z'])

def run():
    while True:
        view = read_view()
        if view is None:
            break
        if isinstance(view, dict) and view.get('secured') is not None:
            # outcome
            with open('outcome.json', 'w') as f:
                json.dump(view, f)
            break
        # compute orders
        now = view.get('now', {})
        gold = now.get('gold', 0)
        wave = now.get('wave', 0)
        seams = now.get('seams', [])
        works = now.get('works', {})
        hero = now.get('hero', {})
        prospector = now.get('prospector', {})
        orders = []
        # Always harvest nearest active seam
        active_seams = [s for s in seams if s.get('active')]
        if active_seams:
            nearest = min(active_seams, key=lambda s: distance(s, prospector))
            orders.append({"verb": "HARVEST", "seam": nearest["id"]})
        # Repair wrecked lanterns if affordable
        wrecked_lanterns = [w for w in works.get('byKind', {}).get('lantern_post', []) if w.get('wrecked')]
        # Actually works.byKind only gives count, not list. We need to inspect build.hp in the view.
        # The view has now.works with hp list? Let's check.
        # From the view, now.works has hp array? In the idle run view, works had hp:0, maxHp:245, standing:0, wrecked:7, byKind:{lantern_post:7}.
        # It does not list individual buildings in the view's now. But mechanics have interactables.
        # We can send REPAIR_UNDER and it will find them.
        if gold >= 8:
            orders.append({"verb": "REPAIR_UNDER", "pct": 100})
        # Build beacons near ford when affordable
        # Let's build beacons at strategic positions.
        # We need to know current beacon count. The view mechanics have buildables with costs array and maxCount.
        # We can infer count from now.score.buildingsBuilt? No, that counts all.
        # Actually view now.works has 'standing' and 'byKind'. So we can check byKind.sentry_beacon count.
        beacon_count = works.get('byKind', {}).get('sentry_beacon', 0)
        turret_count = works.get('byKind', {}).get('turret', 0)
        # Build positions: near ford (0,0) and near claim stake (0,12)
        # We'll queue builds with goldGte conditions.
        build_positions = {
            'sentry_beacon': [(0, 8), (-4, 8), (4, 8), (0, 4), (-4, 4), (4, 4)],
            'turret': [(0, 10), (-5, 10), (5, 10), (0, 6)],
        }
        for kind, positions in build_positions.items():
            for i, (x, z) in enumerate(positions):
                # Determine cost from mechanics
                mechanics = view.get('stablePrefix', {}).get('mechanics', {})
                buildables = mechanics.get('buildables', [])
                defn = next((b for b in buildables if b['id'] == kind), None)
                if not defn:
                    continue
                costs = defn.get('costs', [])
                idx = beacon_count if kind == 'sentry_beacon' else turret_count
                if i < len(costs):
                    cost = costs[i]
                else:
                    # compute growth
                    cost = costs[-1] if costs else 9999
                if (kind == 'sentry_beacon' and beacon_count <= i) or (kind == 'turret' and turret_count <= i):
                    orders.append({"verb": "BUILD", "what": kind, "where": {"x": x, "z": z}, "when": {"goldGte": cost}})
        send_orders(orders)

if __name__ == '__main__':
    run()
