#!/usr/bin/env node
// ELIZA THIN TRANSPORT (tier-b chat arm, seed-ladder precedent): views go to eliza's
// benchmark one-shot as tasks (skill.md as the sole briefing); its order arrays feed
// gr-sim. TRANSPORT ONLY — no strategy, no game knowledge here.
import { spawn, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { createInterface } from 'node:readline';

const [contract, seed, outPrefix] = process.argv.slice(2);
const REPO = '/Users/robin/Claude/Projects/Gold Rush';
const BUN = '/Users/robin/Claude/Projects/gr-gauntlet/.bun/bun-darwin-aarch64/bun';
const BIN = '/Users/robin/Claude/Projects/gr-gauntlet/eliza-app/packages/agent/dist/bin.js';
const STATE = '/Users/robin/Claude/Projects/gr-gauntlet/eliza-home/state';
const SKILL = readFileSync(`${REPO}/public/skill.md`, 'utf8');
const NOTEBOOK = (() => { try { return readFileSync('/Users/robin/Claude/Projects/gr-gauntlet/memories/eliza__deepseek-v4-flash/NOTEBOOK.md', 'utf8'); } catch { return '(no notebook yet)'; } })();

function askEliza(view, note) {
  const prompt = `You are playing Gold Rush through its documented door. The complete rulebook follows, then your own notebook, then the current game view. Reply with EXACTLY ONE JSON array of standing orders and NOTHING else (no prose, no fences). The array REPLACES your whole order set; max 32 entries.\n\n=== RULEBOOK (skill.md) ===\n${SKILL}\n\n=== YOUR NOTEBOOK ===\n${NOTEBOOK}\n\n${note ? `=== NOTE ===\n${note}\n\n` : ''}=== CURRENT VIEW ===\n${JSON.stringify(view)}`;
  // type:'research' — REQUIRED. detectTaskType's keyword regex matches \b(build)\b, which
  // saturates the rulebook, so untyped game prompts route to the CODING pipeline ("write the
  // complete code implementation in ```typescript blocks") and burn past any timeout without
  // ever producing orders (the empty-orders post-mortem, 2026-08-10).
  const task = JSON.stringify({ id: `t${Date.now()}`, prompt, type: 'research' }) + '\n';
  // THE TIMEOUT LAW (found 2026-08-10, the empty-orders post-mortem): benchmark's per-task
  // default is 120000ms; a slow frontier pipeline dies mid-flight and returns response:""
  // with the error in a field nobody read. Pass an explicit generous budget, always.
  const r = spawnSync(BUN, [BIN, 'benchmark', '--timeout', String(process.env.ELIZA_TASK_TIMEOUT_MS || 900000)], {
    input: task,
    env: { ...process.env, ELIZA_STATE_DIR: STATE, LOG_LEVEL: 'error' },
    encoding: 'utf8', timeout: Number(process.env.ELIZA_CALL_TIMEOUT_MS || 90_000), killSignal: 'SIGKILL', maxBuffer: 32 * 1024 * 1024,
  });
  // THE ENVELOPE LAW (post-mortem 2026-08-10): the reply lives ONLY in the benchmark
  // result object's `response` field. Never fish the whole stdout — that is how four
  // sessions forwarded Eliza's own tool schemas as orders.
  let reply = '';
  for (const line of (r.stdout || '').split('\n')) {
    const t = line.trim();
    if (!t.startsWith('{')) continue;
    try { const o = JSON.parse(t); if (o && typeof o.response === 'string') { reply = o.response; if (o.error || !o.response) process.stderr.write(`[eliza-envelope] success=${o.success} error=${o.error ?? '(none)'} responseChars=${o.response.length}\n`); break; } } catch {}
  }
  process.stderr.write(`[eliza-reply] ${reply.slice(0, 260).replace(/\n/g, ' ⏎ ')}\n`);
  const m = /\[[\s\S]*\]/.exec(reply);
  return m ? m[0].replace(/\n/g, ' ') : '[]';
}

const sim = spawn('node', ['scripts/gr-sim.mjs', '--contract', contract, '--seed', seed], { cwd: REPO });
sim.stdin.on('error', () => {}); // a late write after sim-exit is EPIPE, not a failure
const rl = createInterface({ input: sim.stdout });
let last = ''; let calls = 0; let rejectNote = null;
const deadline = Date.now() + 25 * 60_000;
sim.stderr.on('data', (d) => { const s = String(d); if (s.includes('rejected orders')) rejectNote = s.slice(0, 300); });
rl.on('line', (l) => {
  last = l;
  let v; try { v = JSON.parse(l); } catch { return; }
  if (!v.now) return; // terminal handled at exit
  if (Date.now() > deadline || calls >= 60) { sim.kill(); return; }
  calls += 1;
  process.stderr.write(`decision ${calls} wave ${v.now.wave}
`);
  const orders = askEliza(v, rejectNote); rejectNote = null;
  if (!sim.stdin.destroyed && sim.stdin.writable) { try { sim.stdin.write(orders + '\n'); } catch {} }
  appendFileSync(`${outPrefix}-orders.ndjson`, orders + '\n');
});
sim.on('exit', () => {
  writeFileSync(`${outPrefix}-outcome.json`, last.startsWith('{') ? last : JSON.stringify({ secured: false, error: 'no-terminal' }));
  console.log(`ELIZA ${contract} calls=${calls} :: ${last.slice(0, 140)}`);
  // NOTEBOOK HARVEST (all-harness law): one lesson call, appended with the effort footer.
  try {
    const memFile = '/Users/robin/Claude/Projects/gr-gauntlet/memories/eliza__deepseek-v4-flash/NOTEBOOK.md';
    const lessons = askEliza({ finalOutcome: last.slice(0, 300), contract, seed }, 'The run is OVER. Reply with 3-6 durable lessons about this map and era as a plain JSON array of strings (facts with evidence, for your future self). Nothing else.');
    const wall = Math.round((Date.now() - (deadline - 25 * 60_000)) / 1000);
    appendFileSync(memFile, `\n## generation — ${new Date().toISOString().slice(0, 10)} ${contract}\n` +
      JSON.parse(lessons || '[]').map((l) => `- ${l}`).join('\n') +
      `\n<!-- harvested auto · model: deepseek/deepseek-v4-flash · harness: eliza v2.0.3-beta.11 · effort: n/a · contract: ${contract} · verdict: ${last.slice(0, 60)} · wallClock: ${wall}s -->\n`);
  } catch (e) { console.error('notebook harvest failed:', String(e).slice(0, 100)); }
  process.exit(0);
});
