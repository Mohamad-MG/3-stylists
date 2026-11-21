#!/usr/bin/env node
// 3 Stylists engines: fetch, verify and locate the pinned upstream engines used by Explore. Zero dependencies (needs git).
//
//   node scripts/engines.mjs doctor            check the machine (node, git, chrome, ffmpeg)
//   node scripts/engines.mjs fetch [id...]     clone each engine at its pinned commit (sparse where set)
//   node scripts/engines.mjs verify [id...]    confirm commit, entry files and licence
//   node scripts/engines.mjs path <id>         print the engine's folder (for agents)
//   node scripts/engines.mjs entry <id>        print the engine's entry file for this platform
//   node scripts/engines.mjs list              show the registry
//
// Engines live in $STYLISTS_ENGINES or ~/.3stylists/engines/<id>@<commit7>.
// Set STYLISTS_PLATFORM=codex to resolve Codex entry files (default: claude).

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromePath, onPath } from './lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const registryPath = path.resolve(here, '..', 'engines', 'registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const base = process.env.STYLISTS_ENGINES || path.join(os.homedir(), '.3stylists', 'engines');
const platform = process.env.STYLISTS_PLATFORM === 'codex' ? 'codex' : 'claude';

const [cmd, ...args] = process.argv.slice(2);

function dirOf(e) { return path.join(base, `${e.id}@${e.commit.slice(0, 7)}`); }
function find(id) {
  const e = registry.engines.find((x) => x.id === id);
  if (!e) { console.error(`[3stylists] unknown engine: ${id}`); process.exit(2); }
  return e;
}
function pick(ids) { return ids.length ? ids.map(find) : registry.engines; }
function git(cwd, ...a) { return execFileSync('git', a, { cwd, stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim(); }
function headOf(dir) { try { return git(dir, 'rev-parse', 'HEAD'); } catch { return null; } }

function fetchOne(e) {
  const dir = dirOf(e);
  if (headOf(dir) === e.commit) { console.log(`= ${e.id} already at ${e.commit.slice(0, 7)}`); return; }
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  git(dir, 'init', '-q');
  git(dir, 'remote', 'add', 'origin', e.repo);
  if (e.sparse && e.sparse.length) {
    git(dir, 'sparse-checkout', 'init', '--no-cone');
    git(dir, 'sparse-checkout', 'set', '--no-cone', ...e.sparse.map((p) => (p.endsWith('/') ? `/${p}` : `/${p}`)));
  }
  // With a sparse set, a blobless fetch downloads only the files the checkout needs.
  const filter = e.sparse && e.sparse.length ? ['--filter=blob:none'] : [];
  git(dir, 'fetch', '-q', '--depth', '1', ...filter, 'origin', e.commit);
  git(dir, 'checkout', '-q', '--detach', 'FETCH_HEAD');
  console.log(`+ ${e.id} fetched at ${e.commit.slice(0, 7)} -> ${dir}`);
}

function verifyOne(e) {
  const dir = dirOf(e);
  const problems = [];
  const head = headOf(dir);
  if (!head) problems.push('not fetched');
  else if (head !== e.commit) problems.push(`HEAD ${head.slice(0, 7)} != pinned ${e.commit.slice(0, 7)}`);
  if (head) {
    const entry = path.join(dir, e.entry[platform]);
    if (!fs.existsSync(entry)) problems.push(`missing entry ${e.entry[platform]}`);
    const lic = fs.existsSync(dir) && fs.readdirSync(dir).find((f) => /^licen[cs]e/i.test(f));
    if (!lic) problems.push('missing licence file');
    // Every path a 3 Stylists adapter relies on must exist at this commit.
    const missing = (e.requiredPaths || []).filter((p) => !fs.existsSync(path.join(dir, p)));
    if (missing.length) problems.push(`adapter paths missing: ${missing.join(', ')}`);
  }
  console.log(`${problems.length ? '✗' : '✓'} ${e.id.padEnd(18)} ${e.commit.slice(0, 7)} ${e.license.padEnd(11)} ${problems.join('; ') || 'ok'}`);
  return problems.length === 0;
}

switch (cmd) {
  case 'doctor': {
    const major = Number(process.versions.node.split('.')[0]);
    const rows = [
      ['node', `${process.versions.node}`, major >= 22 ? 'ok' : 'Taste Skill needs Node 22+'],
      ['git', onPath('git') ? 'found' : 'missing', onPath('git') ? 'ok' : 'required to fetch engines'],
      ['chrome', chromePath() || 'not found', chromePath() ? 'ok' : 'required by Taste Skill and cinematic-ui checks (set CHROME_PATH)'],
      ['ffmpeg', onPath('ffmpeg') ? 'found' : 'missing', 'optional (cinematic-ui render-film)'],
      ['engines dir', base, fs.existsSync(base) ? 'exists' : 'will be created by fetch']
    ];
    for (const [k, v, s] of rows) console.log(`${k.padEnd(12)} ${String(v).padEnd(40)} ${s}`);
    break;
  }
  case 'fetch': {
    if (!onPath('git')) { console.error('[3stylists] git is required'); process.exit(1); }
    let failed = 0;
    for (const e of pick(args)) {
      try { fetchOne(e); } catch (err) { failed++; console.error(`! ${e.id}: ${String(err.stderr || err.message).trim().split('\n').pop()}`); }
    }
    process.exit(failed ? 1 : 0);
  }
  case 'verify': {
    const ok = pick(args).map(verifyOne).every(Boolean);
    process.exit(ok ? 0 : 1);
  }
  case 'path': {
    const e = find(args[0]);
    console.log(dirOf(e));
    break;
  }
  case 'entry': {
    const e = find(args[0]);
    console.log(path.join(dirOf(e), e.entry[platform]));
    break;
  }
  case 'list': {
    for (const e of registry.engines) {
      const role = e.role.primary ? `primary: ${e.role.primary}` : e.role.support ? `support: ${e.role.support.join(', ')}` : `gate: ${e.role.gate.join(', ')}`;
      console.log(`${e.id.padEnd(18)} ${e.commit.slice(0, 7)} ${e.license.padEnd(11)} ${role}`);
    }
    break;
  }
  default:
    console.log('usage: node scripts/engines.mjs <doctor|fetch|verify|path|entry|list> [id...]');
    process.exit(cmd ? 2 : 0);
}
