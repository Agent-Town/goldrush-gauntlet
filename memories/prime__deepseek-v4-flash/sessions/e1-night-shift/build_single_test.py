import json, subprocess

proc = subprocess.Popen(
    ['node', 'scripts/gr-sim.mjs', '--contract', 'e1-night-shift', '--seed', 'e1-night-shift-01', '--difficulty', 'trail'],
    stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE, text=True, cwd='.'
)

# Read wave 0
line = proc.stdout.readline().strip()
obj = json.loads(line)

# Send 6 harvests + 1 build at a position near seam-2
orders = [
    {"verb": "BUILD", "what": "sentry_beacon", "where": {"x": -8, "z": 7}, "when": {"goldGte": 25}}
] + [{"verb": "HARVEST", "seam": "gold-seam-2"} for _ in range(6)]

proc.stdin.write(json.dumps(orders) + '\n')
proc.stdin.flush()

# Read wave 1
line = proc.stdout.readline().strip()
obj = json.loads(line)
now = obj.get('now', {})

for o in now.get('orders', []):
    print(f'wave=1: {json.dumps(o)}')

# Read wave 2
line = proc.stdout.readline().strip()
obj = json.loads(line)
now = obj.get('now', {})

for o in now.get('orders', []):
    print(f'wave=2: {json.dumps(o)}')

proc.kill()
