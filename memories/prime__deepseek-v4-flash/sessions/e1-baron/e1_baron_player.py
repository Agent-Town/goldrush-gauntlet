#!/usr/bin/env python3
"""Auto-player for e1-baron Gold Rush contract."""
import sys
import json
import math

def dist(a, b):
    return math.hypot(a['x'] - b['x'], a['z'] - b['z'])

def decide(view):
    now = view['now']
    sp = view['stablePrefix']
    mechanics = sp['mechanics']
    map_info = sp['map']

    gold = now['gold']
    wave = now['wave']
    hero = now['hero']
    works = now['works']
    threats = now['threats']
    seams = now['seams']
    prospector = now['prospector']

    orders = []

    # Get buildable costs
    buildables = {b['id']: b for b in mechanics['buildables']}

    # Count standing works by type
    standing = works.get('byKind', {})
    turret_count = standing.get('turret', 0)
    beacon_count = standing.get('sentry_beacon', 0)

    # Get current costs
    def cost(kind):
        arr = buildables[kind]['costs']
        idx = min(len(arr) - 1, standing.get(kind, 0))
        return arr[idx]

    # Base position
    base = map_info['claim']

    # Strategy: build turrets at base, harvest from nearest seam
    # Build turrets first for defense
    if turret_count < 4:
        turret_cost = cost('turret')
        # Place turrets around base at different positions
        positions = [
            {'x': 0, 'z': 14},
            {'x': -2, 'z': 12},
            {'x': 2, 'z': 12},
            {'x': 0, 'z': 10},
        ]
        if turret_count < len(positions):
            pos = positions[turret_count]
            orders.append({
                'verb': 'BUILD',
                'what': 'turret',
                'where': pos,
                'when': {'goldGte': turret_cost}
            })

    # Build sentry beacons too
    if beacon_count < 3:
        beacon_cost = cost('sentry_beacon')
        positions = [
            {'x': -5, 'z': 12},
            {'x': 5, 'z': 12},
            {'x': 0, 'z': 16},
        ]
        if beacon_count < len(positions):
            pos = positions[beacon_count]
            orders.append({
                'verb': 'BUILD',
                'what': 'sentry_beacon',
                'where': pos,
                'when': {'goldGte': beacon_cost}
            })

    # More turrets if we have gold
    if turret_count >= 4 and turret_count < 6:
        turret_cost = cost('turret')
        positions = [
            {'x': -4, 'z': 14},
            {'x': 4, 'z': 14},
        ]
        if turret_count - 4 < len(positions):
            pos = positions[turret_count - 4]
            orders.append({
                'verb': 'BUILD',
                'what': 'turret',
                'where': pos,
                'when': {'goldGte': turret_cost}
            })

    # Harvest from nearest active seam
    active_seams = [s for s in seams if s.get('active', False)]
    if active_seams:
        # Find seam positions from map
        seam_map = {s['id']: s for s in map_info['seams']}
        nearest = None
        nearest_dist = float('inf')
        for s in active_seams:
            spos = seam_map.get(s['id'])
            if spos:
                d = dist(prospector, spos)
                if d < nearest_dist:
                    nearest_dist = d
                    nearest = s
        if nearest:
            orders.append({'verb': 'HARVEST', 'seam': nearest['id']})

    # Repair if works are damaged
    works_hp = works['hp']
    works_max = works['maxHp']
    if works_max > 0 and works_hp / works_max < 0.5:
        orders.append({'verb': 'REPAIR_UNDER', 'pct': 50})

    # Fallback if many enemies
    if threats['alive'] >= 5:
        orders.append({'verb': 'FALLBACK_IF', 'threat': {'enemiesGte': 5}, 'pos': base})

    # Hold at base when not doing anything else
    orders.append({'verb': 'HOLD', 'pos': base})

    return orders

def main():
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            data = json.loads(line)
        except json.JSONDecodeError:
            continue

        if 'schema' in data and data['schema'] == 'goldrush.view.v1':
            orders = decide(data)
            print(json.dumps(orders), flush=True)
        elif 'secured' in data:
            # Terminal outcome
            print(json.dumps(data), file=sys.stderr, flush=True)
            break

if __name__ == '__main__':
    main()
