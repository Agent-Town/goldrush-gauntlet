import json, subprocess

proc = subprocess.Popen(
    ['node', 'scripts/gr-sim.mjs', '--contract', 'e1-night-shift', '--seed', 'e1-night-shift-01', '--difficulty', 'trail'],
    stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE, text=True, cwd='.'
)

# Read wave 0
line = proc.stdout.readline().strip()
obj = json.loads(line)

# Try building at different positions with goldGte=0 to see which fail for what reason
test_positions = [
    (0, 0), (0, 2), (0, 4), (0, 6), (0, 8), (0, 10),
    (-5, 0), (5, 0), (-5, 5), (5, 5), (-5, 10), (5, 10),
    (-10, 0), (10, 0), (-10, 5), (10, 5), (-10, 10), (10, 10),
    (0, 12), (-3, 12), (3, 12), (0, 14), (0, 16)
]

orders = []
for x, z in test_positions:
    orders.append({"verb": "BUILD", "what": "sentry_beacon", "where": {"x": x, "z": z}, "when": {"goldGte": 0}})

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
        if status != 'pending':
            print(f"({pos.get('x')},{pos.get('z')}): {status} - {reason}")
        else:
            print(f"({pos.get('x')},{pos.get('z')}): {status}")

proc.kill()
