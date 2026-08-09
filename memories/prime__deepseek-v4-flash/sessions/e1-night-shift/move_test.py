import json, subprocess

proc = subprocess.Popen(
    ['node', 'scripts/gr-sim.mjs', '--contract', 'e1-night-shift', '--seed', 'e1-night-shift-01', '--difficulty', 'trail'],
    stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE, text=True, cwd='.'
)

for _ in range(3):
    line = proc.stdout.readline().strip()
    if not line:
        continue
    obj = json.loads(line)
    if isinstance(obj, dict) and obj.get('secured') is not None:
        print('OUTCOME:', json.dumps(obj))
        break
    now = obj.get('now', {})
    wave = now.get('wave', 0)
    prospector = now.get('prospector', {})
    hero = now.get('hero', {})
    print(f'wave={wave} hero=({hero.get("x"):.1f},{hero.get("z"):.1f}) prospector=({prospector.get("x"):.1f},{prospector.get("z"):.1f})')
    orders = [{"verb": "MOVE_TO", "pos": {"x": -9, "z": 7}}]  # near seam-2
    proc.stdin.write(json.dumps(orders) + '\n')
    proc.stdin.flush()

proc.kill()
