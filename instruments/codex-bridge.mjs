#!/usr/bin/env node
// codex-bridge v2: localhost OpenAI-compatible server over the owner's codex subscription
// OAuth (~/.codex/auth.json, kept fresh by the codex CLI). Now speaks TOOLS both ways —
// chat tool_calls ⇄ responses function_call items (shapes ported from
// fix-prime/packages/ai/src/providers/openai-responses-shared.ts). Serves:
//   GET  /health · GET /v1/models · POST /v1/chat/completions · POST /v1/embeddings (stub)
// Binds 127.0.0.1 only. Never logs tokens.
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { homedir } from 'node:os';

const PORT = Number(process.env.BRIDGE_PORT || 5399);
const MODEL = process.env.BRIDGE_MODEL || 'gpt-5.6-sol';
const EFFORT = process.env.BRIDGE_EFFORT || 'xhigh';
const AUTH_PATH = `${homedir()}/.codex/auth.json`;
const ENDPOINT = 'https://chatgpt.com/backend-api/codex/responses';

function auth() {
  const a = JSON.parse(readFileSync(AUTH_PATH, 'utf8'));
  const t = a.tokens || {};
  if (!t.access_token || !t.account_id) throw new Error('codex auth.json missing tokens');
  return { token: t.access_token, accountId: t.account_id };
}

function contentText(c) {
  return Array.isArray(c) ? c.map((p) => p.text ?? '').join('\n') : String(c ?? '');
}

// OpenAI chat messages+tools → responses-API {instructions, input, tools}
function toResponses(parsed) {
  let instructions = 'You are a helpful assistant.';
  const input = [];
  for (const m of parsed.messages || []) {
    if (m.role === 'system') {
      const text = contentText(m.content);
      instructions = instructions === 'You are a helpful assistant.' ? text : `${instructions}\n\n${text}`;
      continue;
    }
    if (m.role === 'tool') {
      input.push({ type: 'function_call_output', call_id: m.tool_call_id, output: contentText(m.content) });
      continue;
    }
    if (m.role === 'assistant' && Array.isArray(m.tool_calls) && m.tool_calls.length) {
      const text = contentText(m.content);
      if (text) input.push({ type: 'message', role: 'assistant', content: [{ type: 'output_text', text }] });
      for (const tc of m.tool_calls) {
        input.push({ type: 'function_call', call_id: tc.id, name: tc.function?.name, arguments: tc.function?.arguments ?? '{}' });
      }
      continue;
    }
    const text = contentText(m.content);
    input.push({
      type: 'message',
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: [{ type: m.role === 'assistant' ? 'output_text' : 'input_text', text }],
    });
  }
  const tools = Array.isArray(parsed.tools)
    ? parsed.tools
        .filter((t) => t.type === 'function' && t.function?.name)
        .map((t) => ({ type: 'function', name: t.function.name, description: t.function.description ?? '', parameters: t.function.parameters ?? { type: 'object', properties: {} }, strict: false }))
    : undefined;
  return { instructions, input, tools };
}

async function complete(parsed) {
  const { token, accountId } = auth();
  const { instructions, input, tools } = toResponses(parsed);
  const session = randomUUID();
  const body = {
    model: MODEL, store: false, stream: true, instructions, input,
    text: { verbosity: 'low' }, include: ['reasoning.encrypted_content'],
    prompt_cache_key: session, tool_choice: 'auto', parallel_tool_calls: true,
    reasoning: { effort: EFFORT, summary: 'auto' },
    ...(tools && tools.length ? { tools } : {}),
  };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json', accept: 'text/event-stream',
      authorization: `Bearer ${token}`, 'chatgpt-account-id': accountId,
      originator: 'pi', session_id: session,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`codex backend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  let text = '';
  const toolCalls = [];
  let usage = null;
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split('\n');
    buf = lines.pop();
    for (const line of lines) {
      if (!line.startsWith('data:')) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === '[DONE]') continue;
      let ev;
      try { ev = JSON.parse(payload); } catch { continue; }
      if (ev.type === 'response.output_text.delta' && typeof ev.delta === 'string') text += ev.delta;
      if (ev.type === 'response.output_item.done' && ev.item?.type === 'function_call') {
        toolCalls.push({ id: ev.item.call_id || `call_${randomUUID()}`, type: 'function', function: { name: ev.item.name, arguments: ev.item.arguments || '{}' } });
      }
      if (ev.type === 'response.completed' && ev.response?.usage) usage = ev.response.usage;
      if (ev.type === 'response.failed') throw new Error(`codex response.failed: ${JSON.stringify(ev.response?.error || {}).slice(0, 200)}`);
    }
  }
  return { text, toolCalls, usage };
}

function unitVec(text) {
  let h = 2166136261 >>> 0;
  for (const ch of String(text)) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619) >>> 0; }
  const v = new Array(1536);
  for (let i = 0; i < 1536; i++) { h ^= h << 13; h >>>= 0; h ^= h >> 17; h ^= h << 5; h >>>= 0; v[i] = (h / 0xffffffff) - 0.5; }
  const norm = Math.hypot(...v) || 1;
  return v.map((x) => x / norm);
}

const server = createServer((req, res) => {
  const chunks = [];
  req.on('data', (c) => chunks.push(c));
  req.on('end', async () => {
    const url = req.url || '';
    if (req.method === 'GET' && url === '/health') {
      res.writeHead(200, { 'content-type': 'application/json' });
      return res.end(JSON.stringify({ ok: true, model: MODEL, effort: EFFORT, tools: true }));
    }
    if (req.method === 'GET' && /\/models$/.test(url)) {
      res.writeHead(200, { 'content-type': 'application/json' });
      return res.end(JSON.stringify({ object: 'list', data: [{ id: MODEL, object: 'model', created: 1700000000, owned_by: 'codex-bridge' }] }));
    }
    if (req.method === 'POST' && /\/embeddings$/.test(url)) {
      let eb = {};
      try { eb = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); } catch { /* fall through */ }
      const inputs = Array.isArray(eb.input) ? eb.input : [eb.input ?? ''];
      res.writeHead(200, { 'content-type': 'application/json' });
      return res.end(JSON.stringify({
        object: 'list', model: eb.model || 'stub-embedding',
        data: inputs.map((t, i) => ({ object: 'embedding', index: i, embedding: unitVec(t) })),
        usage: { prompt_tokens: 0, total_tokens: 0 },
      }));
    }
    if (req.method !== 'POST' || !/\/chat\/completions$/.test(url)) {
      res.writeHead(404, { 'content-type': 'application/json' });
      return res.end(JSON.stringify({ error: { message: 'codex-bridge serves /v1/chat/completions, /v1/embeddings, /v1/models' } }));
    }
    let parsed;
    try { parsed = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); } catch {
      res.writeHead(400, { 'content-type': 'application/json' });
      return res.end(JSON.stringify({ error: { message: 'bad json' } }));
    }
    const started = Date.now();
    try {
      const { text, toolCalls, usage } = await complete(parsed);
      const u = {
        prompt_tokens: usage?.input_tokens ?? 0,
        completion_tokens: usage?.output_tokens ?? 0,
        total_tokens: usage?.total_tokens ?? 0,
      };
      const finish = toolCalls.length ? 'tool_calls' : 'stop';
      console.log(`[bridge] ok ${Date.now() - started}ms in=${u.prompt_tokens} out=${u.completion_tokens} chars=${text.length} tools=${toolCalls.length} finish=${finish}`);
      const id = `chatcmpl-${randomUUID()}`;
      const msg = { role: 'assistant', content: toolCalls.length && !text ? null : text, ...(toolCalls.length ? { tool_calls: toolCalls } : {}) };
      if (parsed.stream) {
        res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-cache' });
        const chunk = (delta, fin) => res.write(`data: ${JSON.stringify({ id, object: 'chat.completion.chunk', created: Math.floor(started / 1000), model: parsed.model || MODEL, choices: [{ index: 0, delta, finish_reason: fin ?? null }] })}\n\n`);
        const streamDelta = { role: 'assistant' };
        if (msg.content) streamDelta.content = msg.content;
        if (toolCalls.length) streamDelta.tool_calls = toolCalls.map((tc, i) => ({ index: i, ...tc }));
        chunk(streamDelta);
        chunk({}, finish);
        res.write('data: [DONE]\n\n');
        return res.end();
      }
      res.writeHead(200, { 'content-type': 'application/json' });
      return res.end(JSON.stringify({
        id, object: 'chat.completion', created: Math.floor(started / 1000), model: parsed.model || MODEL,
        choices: [{ index: 0, message: msg, finish_reason: finish }],
        usage: u,
      }));
    } catch (err) {
      console.error(`[bridge] FAIL ${Date.now() - started}ms ${String(err.message).slice(0, 200)}`);
      res.writeHead(502, { 'content-type': 'application/json' });
      return res.end(JSON.stringify({ error: { message: String(err.message).slice(0, 300) } }));
    }
  });
});

server.listen(PORT, '127.0.0.1', () => console.log(`[bridge] codex-bridge v2 (tools) on 127.0.0.1:${PORT} → ${MODEL} @ ${EFFORT}`));
