import json, subprocess

for seam_id in ['gold-seam-1', 'gold-seam-2']:
    proc = subprocess.Popen(
        ['node', 'scripts/gr-sim.mjs', '--contract', 'e1-night-shift', '--seed', 'e1-night-shift-01', '--difficulty', 'trail'],
        stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE, text=True, cwd='.'
    )

    golds = []
    while True:
        line = proc.stdout.readline().strip()
        if not line:
            break
        obj = json.loads(line)
        if isinstance(obj, dict) and obj.get('secured') is not None:
            break
        wave = obj['now']['wave']
        gold = obj['now']['gold']
        golds.append((wave, gold))
        orders = [{"verb": "HARVEST", "seam": seam_id}]
        proc.stdin.write(json.dumps(orders) + '\n')
        proc.stdin.flush()

    proc.kill()
    print(f'{seam_id}: {golds}')
