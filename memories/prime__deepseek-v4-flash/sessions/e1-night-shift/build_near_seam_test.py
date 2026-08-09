import json, subprocess

proc = subprocess.Popen(
    ['node', 'scripts/gr-sim.mjs', '--contract', 'e1-night-shift', '--seed', 'e1-night-shift-01', '--difficulty', 'trail'],
    stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE, text=True, cwd='.'
)

# Read wave 0
line = proc.stdout.readline().strip()
obj = json.loads(line)

# Send prospector to seam-2 with multiple harvests and try to build at various positions
test_positions = [(-9, 7), (-8, 7), (-7, 7), (-6, 7), (-9, 8), (-9, 6), (-10, 7), (-5, 10), (-6, 12)]
orders = []
for x, z in test_positions:
    orders.append({"verb": "BUILD", "what": "sentry_beacon", "where": {"x": x, "z": z}, "when": {"goldGte": 0}})
orders.extend([{"verb": "HARVEST", "seam": "gold-seam-2"} for _ in range(6)])

proc.stdin.write(json.dumps(orders) + '\n')
proc.stdin.flush()

# Read wave 1
line = proc.stdout.readline().strip()
obj = json.loads(line)
now = obj.get('now', {})

for o in now.get('orders', []):
    order = o.get('order', {})
    if order.get('verb') == 'BUILD':
        pos = order.get('where', {})
        status = o.get('status', '')
        reason = o.get('reason', '')
        print(f"({pos.get('x')},{pos.get('z')}): {status} - {reason}")

proc.kill()
