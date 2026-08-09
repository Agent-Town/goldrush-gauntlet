import json, subprocess

proc = subprocess.Popen(
    ['node', 'scripts/gr-sim.mjs', '--contract', 'e1-night-shift', '--seed', 'e1-night-shift-01', '--difficulty', 'trail'],
    stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE, text=True, cwd='.'
)

# Read wave 0
line = proc.stdout.readline().strip()
obj = json.loads(line)
print('WAVE 0, gold=', obj['now']['gold'])

# Test various positions
test_positions = [
    (0, 8), (0, 6), (0, 10), (-3, 10), (3, 10), 
    (-5, 10), (5, 10), (0, 14), (-2, 8), (2, 8),
    (-6, 12), (6, 12), (0, 16), (-4, 8), (4, 8),
    (0, 4), (-8, 8), (8, 8), (-10, 12), (10, 12),
    (-15, 0), (15, 0), (0, -2), (0, 20)
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
print('WAVE 1, gold=', now['gold'])
print('orders=', json.dumps(now.get('orders', [])))
print('works=', json.dumps(now.get('works', {})))

# Also check for any surprises or appendLog about rejected builds
for entry in obj.get('appendLog', []):
    print('appendLog entry:', json.dumps(entry))

proc.kill()
