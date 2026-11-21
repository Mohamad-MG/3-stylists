#!/usr/bin/env node
// Writes every host manifest from the one source of truth, plugin.json at the plugin root.
// Edit plugin.json, then run this. Never edit the generated files by hand.
//
//   node scripts/sync-manifests.mjs           write the host manifests
//   node scripts/sync-manifests.mjs --check   exit 1 when one is out of date (the package test does the same)
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** The host manifests, keyed by path, for a parsed plugin.json. */
export function hostManifests(source) {
  const { name, version, description, author, license, repository, homepage, keywords } = source;
  const openai = (source.extensions && source.extensions['com.openai']) || {};
  const ui = openai.interface || {};
  const common = { name, version, description, author, license, repository, homepage, keywords };
  return {
    // Claude Code: the plugin, and a marketplace whose only plugin is this repository's root.
    '.claude-plugin/plugin.json': common,
    '.claude-plugin/marketplace.json': { name, description, owner: author, plugins: [{ name, source: './', description }] },
    // Codex and ChatGPT: releases that do not read the root plugin.json yet fall back to this one.
    '.codex-plugin/plugin.json': { ...common, skills: './skills/', interface: ui },
    '.agents/plugins/marketplace.json': {
      name,
      interface: { displayName: ui.displayName },
      plugins: [{ name, source: { source: 'local', path: './' }, policy: { installation: 'AVAILABLE', authentication: 'ON_USE' }, category: ui.category }],
    },
  };
}

const render = (manifest) => JSON.stringify(manifest, null, 2) + '\n';

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const check = process.argv.includes('--check');
  const source = JSON.parse(readFileSync(path.join(root, 'plugin.json'), 'utf8'));
  let stale = 0;
  for (const [file, manifest] of Object.entries(hostManifests(source))) {
    const target = path.join(root, file);
    let current = null;
    try { current = readFileSync(target, 'utf8'); } catch {}
    if (current === render(manifest)) continue;
    stale++;
    if (check) console.error('out of date: ' + file);
    else { mkdirSync(path.dirname(target), { recursive: true }); writeFileSync(target, render(manifest)); console.log('wrote ' + file); }
  }
  if (check && stale) { console.error('Run: node scripts/sync-manifests.mjs'); process.exit(1); }
  if (!stale) console.log('host manifests are up to date');
}
