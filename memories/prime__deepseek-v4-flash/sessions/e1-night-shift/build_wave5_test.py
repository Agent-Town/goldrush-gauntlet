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

    now = obj.get('now', {})
    wave = now.get('wave', 0)
    gold = now.get('gold', 0)
    works = now.get('works', {})
    hero = now.get('hero', {})
    orders_info = now.get('orders', [])

    beacon_orders = [o for o in orders_info if o.get('order', {}).get('what') == 'sentry_beacon']

    print(f'wave={wave} gold={gold} hero_hp={hero.get("hp")} beacons={works.get("byKind",{}).get("sentry_beacon",0)} beacon_orders={json.dumps(beacon_orders)}')

    if wave == 5 and hero.get('hp', 0) > 0:
        orders = [
            {"verb": "BUILD", "what": "sentry_beacon", "where": {"x": 0, "z": 8}, "when": {"goldGte": 25}}
        ]
    else:
        orders = [{"verb": "HARVEST", "seam": "gold-seam-2"}]

    proc.stdin.write(json.dumps(orders) + '\n')
    proc.stdin.flush()

proc.kill()
