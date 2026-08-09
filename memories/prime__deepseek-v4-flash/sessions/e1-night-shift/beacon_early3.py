import json, subprocess

proc = subprocess.Popen(
    ['node', 'scripts/gr-sim.mjs', '--contract', 'e1-night-shift', '--seed', 'e1-night-shift-01', '--difficulty', 'trail'],
    stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE, text=True, cwd='.'
)

while True:
    line = proc.stdout.readline().strip()
    if not line:
        break
    obj = json.loads(line)
    if isinstance(obj, dict) and obj.get('secured') is not None:
        print('OUTCOME:', json.dumps(obj))
        break

    wave = obj['now']['wave']
    gold = obj['now']['gold']
    works = obj['now']['works']
    hero = obj['now']['hero']
    orders_info = obj['now']['orders']

    beacons = works.get('byKind', {}).get('sentry_beacon', 0)

    print(f'wave={wave} gold={gold} hero_hp={hero.get("hp")} beacons={beacons}')
    for o in orders_info:
        print(f'  order: {json.dumps(o)}')

    if wave == 1:
        orders = [
            {"verb": "BUILD", "what": "sentry_beacon", "where": {"x": 0, "z": 8}, "when": {"goldGte": 25}},
            {"verb": "HOLD", "pos": {"x": -9, "z": 7}},
            {"verb": "HARVEST", "seam": "gold-seam-2"}
        ]
    else:
        orders = [
            {"verb": "HOLD", "pos": {"x": -9, "z": 7}},
            {"verb": "HARVEST", "seam": "gold-seam-2"}
        ]

    proc.stdin.write(json.dumps(orders) + '\n')
    proc.stdin.flush()

proc.kill()
