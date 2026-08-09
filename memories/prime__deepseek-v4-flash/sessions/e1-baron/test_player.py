import sys, json
for line in sys.stdin:
    line = line.strip()
    if not line: continue
    try:
        data = json.loads(line)
    except: continue
    if data.get('schema') == 'goldrush.view.v1':
        orders = [{"verb":"HARVEST","seam":"gold-seam-2"},{"verb":"HOLD","pos":{"x":0,"z":12}}]
        print(json.dumps(orders), flush=True)
    elif 'secured' in data:
        print(json.dumps(data), file=sys.stderr, flush=True)
        break
