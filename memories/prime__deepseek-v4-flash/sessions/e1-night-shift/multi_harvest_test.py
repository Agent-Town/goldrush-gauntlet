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
    seams = obj['now']['seams']
    print(f'wave={wave} gold={gold}')
    for s in seams:
        print(f'  seam={s["id"]} active={s.get("active")} remaining={s.get("remaining")}')

    # Send 6 HARVEST orders for seam-2
    orders = [{"verb": "HARVEST", "seam": "gold-seam-2"} for _ in range(6)]
    proc.stdin.write(json.dumps(orders) + '\n')
    proc.stdin.flush()

proc.kill()
