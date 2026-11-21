#!/usr/bin/env node
// fetch-font.mjs: fetch Google Fonts families from github.com/google/fonts at a pinned commit, by folder name.
// Works without the Google Fonts API or npm: git only. Families land in a shared sparse checkout and are
// reused across runs. Safe to call from several stylists at once (a lock serialises the git calls).
//
// Usage:  node fetch-font.mjs <folder> [<folder> ...]      e.g.  node fetch-font.mjs fraunces dmsans
// Prints: one line per family: "<folder> <licence dir> <absolute path>" then its font files, or "<folder> not-found".
// Folder names are google/fonts directory names (lowercase, no spaces): "Source Serif 4" → sourceserif4.
// Env: STYLISTS_GFONTS (default ~/.3stylists/gfonts), STYLISTS_GFONTS_COMMIT (default the pinned commit below).
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const COMMIT = process.env.STYLISTS_GFONTS_COMMIT || '29b4ec6df2522a8aee279414b78a07910b065874';
const ROOT = process.env.STYLISTS_GFONTS || join(homedir(), '.3stylists', 'gfonts');
const LOCK = ROOT + '.lock';
const names = process.argv.slice(2).map(s => s.toLowerCase().replace(/[^a-z0-9]/g, ''));
if (!names.length) { console.error('usage: node fetch-font.mjs <folder> [...]'); process.exit(2); }

const git = (...a) => execFileSync('git', ['-C', ROOT, ...a], { stdio: ['ignore', 'pipe', 'pipe'] }).toString();
const sleep = ms => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

function lock() {
  for (let i = 0; i < 600; i++) {
    try { mkdirSync(LOCK); return; } catch {
      try { if (Date.now() - statSync(LOCK).mtimeMs > 300000) rmSync(LOCK, { recursive: true }); } catch {}
      sleep(500);
    }
  }
  throw new Error('could not take ' + LOCK);
}
function ensureRepo() {
  if (existsSync(join(ROOT, '.git'))) return;
  mkdirSync(ROOT, { recursive: true });
  git('init', '-q');
  git('remote', 'add', 'origin', 'https://github.com/google/fonts');
  git('sparse-checkout', 'init', '--no-cone');
  git('sparse-checkout', 'set', '/LICENSE*');
  git('fetch', '-q', '--depth', '1', '--filter=blob:none', 'origin', COMMIT);
  git('checkout', '-q', '--detach', 'FETCH_HEAD');
}
const fontsIn = d => readdirSync(d).filter(f => /\.(ttf|otf)$/i.test(f)).map(f => join(d, f));

lock();
try {
  ensureRepo();
  const want = names.flatMap(n => ['ofl', 'apache', 'ufl'].map(l => `/${l}/${n}/`));
  git('sparse-checkout', 'add', ...want);
  for (const n of names) {
    const hit = ['ofl', 'apache', 'ufl'].map(l => [l, join(ROOT, l, n)]).find(([, d]) => existsSync(d) && fontsIn(d).length);
    if (!hit) { console.log(`${n} not-found`); continue; }
    console.log(`${n} ${hit[0]} ${hit[1]}`);
    for (const f of fontsIn(hit[1])) console.log('  ' + f);
  }
} finally { rmSync(LOCK, { recursive: true, force: true }); }
