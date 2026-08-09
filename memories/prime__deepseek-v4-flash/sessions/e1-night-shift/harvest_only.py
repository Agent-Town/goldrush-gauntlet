import json, math, subprocess

proc = subprocess.Popen(
    ['node', 'scripts/gr-sim.mjs', '--contract', 'e1-night-shift', '--seed', 'e1-night-shift-01', '--difficulty', 'trail'],
    stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE, text=True, cwd='.'
)

seam_positions = {}

while True:
    line = proc.stdout.readline()
    if not line:
        break
    line = line.strip()
    if not line:
        continue
    obj = json.loads(line)

    if isinstance(obj, dict) and obj.get('secured') is not None:
        print('OUTCOME:', json.dumps(obj))
        break

    now = obj.get('now', {})
    gold = now.get('gold', 0)
    wave = now.get('wave', 0)
    seams = now.get('seams', [])
    prospector = now.get('prospector', {})

    if not seam_positions:
        for s in obj.get('stablePrefix', {}).get('map', {}).get('seams', []):
            seam_positions[s['id']] = {'x': s['x'], 'z': s['z']}

    active_seams = [s for s in seams if s.get('active')]
    if active_seams and seam_positions:
        def dist(s):
            pos = seam_positions.get(s['id'], {'x': 0, 'z': 0})
            return math.hypot(pos['x'] - prospector['x'], pos['z'] - prospector['z'])
        nearest = min(active_seams, key=dist)
        orders = [{"verb": "HARVEST", "seam": nearest["id"]}]
    else:
        orders = []

    print(f'wave={wave} gold={gold} pos=({prospector.get("x"):.1f},{prospector.get("z"):.1f})')

    proc.stdin.write(json.dumps(orders) + '\n')
    proc.stdin.flush()

proc.kill()
