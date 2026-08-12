#!/usr/bin/env node
// HERMES ACP DRIVER — the county's automated door into Hermes after its CLI retired batch
// mode (heat-3 operability saga, owner ruling 2026-08-12: "this has to be automated").
// Speaks Agent Client Protocol over stdio: initialize → authenticate → session/new(cwd) →
// session/prompt(task) → auto-approve permissions → harvest on end_turn.
// Usage: node drive.mjs <arena-dir> <task-text-file> [timeout-min]
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import path from 'node:path';

const [arenaDir, taskFile, timeoutMin] = process.argv.slice(2);
const TASK = readFileSync(taskFile, 'utf8');
const DEADLINE = Date.now() + (Number(timeoutMin || 60)) * 60_000;
const log = (s) => process.stderr.write(`[acp-drive] ${s}\n`);

const p = spawn('hermes', ['acp'], { stdio: ['pipe', 'pipe', 'pipe'] });
let nextId = 10;
const pending = new Map();
const send = (obj) => p.stdin.write(JSON.stringify(obj) + '\n');
const call = (method, params) => new Promise((resolve, reject) => {
  const id = nextId++;
  pending.set(id, { resolve, reject });
  send({ jsonrpc: '2.0', id, method, params });
});

let buf = '';
let agentText = '';
p.stdout.on('data', (d) => {
  buf += d;
  const lines = buf.split('\n');
  buf = lines.pop();
  for (const line of lines) {
    const t = line.trim();
    if (!t.startsWith('{')) continue;
    let m; try { m = JSON.parse(t); } catch { continue; }
    if (m.id !== undefined && (m.result !== undefined || m.error !== undefined) && pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id); pending.delete(m.id);
      m.error ? reject(new Error(JSON.stringify(m.error).slice(0, 300))) : resolve(m.result);
      continue;
    }
    if (m.method === 'session/update') {
      const u = m.params?.update;
      if (u?.sessionUpdate === 'agent_message_chunk' && u.content?.type === 'text') agentText += u.content.text;
      if (u?.sessionUpdate === 'tool_call') log(`tool: ${u.title ?? u.kind ?? '?'}`);
      continue;
    }
    if (m.method === 'session/request_permission' && m.id !== undefined) {
      const opts = m.params?.options ?? [];
      const allow = opts.find((o) => /allow|approve|yes/i.test(`${o.optionId} ${o.name}`)) ?? opts[0];
      log(`permission auto-granted: ${m.params?.toolCall?.title ?? '?'} -> ${allow?.optionId}`);
      send({ jsonrpc: '2.0', id: m.id, result: { outcome: { outcome: 'selected', optionId: allow?.optionId } } });
      continue;
    }
    if (m.method === 'fs/read_text_file' && m.id !== undefined) {
      try {
        const fp = path.resolve(m.params.path);
        if (!fp.startsWith(path.resolve(arenaDir))) throw new Error('outside arena');
        send({ jsonrpc: '2.0', id: m.id, result: { content: readFileSync(fp, 'utf8') } });
      } catch (e) { send({ jsonrpc: '2.0', id: m.id, error: { code: -32000, message: String(e.message) } }); }
      continue;
    }
    if (m.method === 'fs/write_text_file' && m.id !== undefined) {
      try {
        const fp = path.resolve(m.params.path);
        if (!fp.startsWith(path.resolve(arenaDir))) throw new Error('outside arena');
        writeFileSync(fp, m.params.content);
        send({ jsonrpc: '2.0', id: m.id, result: null });
      } catch (e) { send({ jsonrpc: '2.0', id: m.id, error: { code: -32000, message: String(e.message) } }); }
      continue;
    }
    if (m.id !== undefined && m.method) {
      send({ jsonrpc: '2.0', id: m.id, error: { code: -32601, message: `unhandled: ${m.method}` } });
    }
  }
});
p.stderr.on('data', (d) => { const s = String(d).trim(); if (/ERROR|WARN/i.test(s)) log(`hermes: ${s.slice(0, 160)}`); });

const watchdog = setInterval(() => {
  if (Date.now() > DEADLINE) { log('DEADLINE — closing'); appendFileSync(path.join(arenaDir, 'acp-final.md'), agentText); p.kill(); process.exit(3); }
}, 15_000);

try {
  const init = await call('initialize', { protocolVersion: 1, clientCapabilities: { fs: { readTextFile: true, writeTextFile: true } } });
  log(`initialized: ${init.agentInfo?.name} ${init.agentInfo?.version}`);
  if (init.authMethods?.some((a) => a.id === 'openai-codex')) {
    try { await call('authenticate', { methodId: 'openai-codex' }); log('authenticated (openai-codex)'); }
    catch (e) { log(`authenticate skipped: ${e.message.slice(0, 120)}`); }
  }
  const sess = await call('session/new', { cwd: path.resolve(arenaDir), mcpServers: [] });
  log(`session: ${sess.sessionId}`);
  const res = await call('session/prompt', { sessionId: sess.sessionId, prompt: [{ type: 'text', text: TASK }] });
  log(`prompt done: stopReason=${res?.stopReason}`);
  writeFileSync(path.join(arenaDir, 'acp-final.md'), agentText || '(no agent text)');
  clearInterval(watchdog);
  p.kill();
  process.exit(0);
} catch (e) {
  log(`FAIL: ${String(e.message).slice(0, 300)}`);
  clearInterval(watchdog);
  p.kill();
  process.exit(1);
}
