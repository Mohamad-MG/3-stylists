// Package checks: the things that broke before, or would break silently. Run with `node --test`.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';
import { hostManifests } from '../scripts/sync-manifests.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const at = (p) => path.join(root, p);
const read = (p) => readFileSync(at(p), 'utf8');
const json = (p) => JSON.parse(read(p));
const walk = (dir) => readdirSync(at(dir), { withFileTypes: true }).flatMap((e) => {
  if (e.name === '.git' || e.name === 'node_modules') return [];
  const p = dir === '.' ? e.name : dir + '/' + e.name;
  return e.isDirectory() ? walk(p) : [p];
});

const MODES = ['audit', 'polish', 'enhance', 'build', 'explore'];
const SKILL = 'skills/altero';
const REFS = SKILL + '/references';
const files = walk('.');
const text = files.filter((f) => /\.(md|mjs|js|json|html|yml)$/.test(f));
const stylists = json('engines/registry.json').engines.filter((e) => e.role.primary).map((e) => ({ id: e.role.primary, engine: e.id }));

test('host manifests are generated from plugin.json', () => {
  const source = json('plugin.json');
  for (const [file, expected] of Object.entries(hostManifests(source))) {
    assert.deepEqual(json(file), JSON.parse(JSON.stringify(expected)), file + ' is out of date: run node scripts/sync-manifests.mjs');
  }
  assert.match(source.repository, /^https:\/\/github\.com\/[A-Za-z0-9-]+\/altero$/);
  assert.equal(source.homepage, source.repository);
  // The install commands people copy must name the same repository.
  const slug = source.repository.replace('https://github.com/', '');
  const readme = read('README.md');
  for (const command of ['claude plugin marketplace add ' + slug, 'codex plugin marketplace add ' + slug, `install ${source.name}@${source.name}`]) {
    assert.ok(readme.includes(command), 'README is missing: ' + command);
  }
});

test('one public skill, and one thin Claude command per mode', () => {
  assert.deepEqual(readdirSync(at('skills')), ['altero']);
  assert.deepEqual(readdirSync(at('commands')).sort(), MODES.map((m) => m + '.md').sort());
  const skill = read(SKILL + '/SKILL.md');
  for (const mode of MODES) {
    assert.ok(skill.includes('| ' + mode + ' |'), 'SKILL.md has no row for ' + mode);
    const command = read('commands/' + mode + '.md');
    assert.ok(command.includes(SKILL + '/SKILL.md') && command.includes('its ' + mode + ' mode'), 'commands/' + mode + '.md does not delegate to the skill');
  }
  // The four standard modes must work with no engine setup.
  assert.doesNotMatch(read(REFS + '/workflow.md'), /engines\.mjs|npm install/);
});

test('every path a document points to exists', () => {
  const missing = [];
  const expand = (p) => (p.includes('<id>') ? stylists.map((s) => p.replaceAll('<id>', s.id)) : [p]);
  for (const file of files.filter((f) => f.endsWith('.md') && f !== 'CHANGELOG.md')) {
    const body = read(file);
    const targets = [];
    for (const m of body.matchAll(/\]\((?!https?:|#|mailto:)([^)\s]+)\)/g)) targets.push(path.join(path.dirname(file), m[1].split('#')[0]));
    for (const m of body.matchAll(/`<(plugin|refs)>\/([^`\s]+)`/g)) targets.push(path.join(m[1] === 'refs' ? REFS : '.', m[2]));
    for (const m of body.matchAll(/\bsrc="(?!https?:)([^"\s]+)"/g)) targets.push(path.join(path.dirname(file), m[1])); // README art
    for (const target of targets.flatMap(expand)) {
      if (/[<>*…]/.test(target)) continue; // a placeholder the reader fills in
      if (!existsSync(at(target))) missing.push(file + ' → ' + target.replaceAll('\\', '/'));
    }
  }
  assert.deepEqual(missing, []);
});

test('no residue from earlier layouts', () => {
  // Old folder names, the name before Altero, placeholder owners, and an account name that never existed on GitHub.
  const residue = /three-stylists|3 Stylists|3-stylists|.3stylists|STYLISTS_|bilingual-core|phone-core|stylist-(atelier|manifesto|cinema)|adapters\/codex|\bOWNER\b|emarketbank|owner rule|owner-approved|Thuluth/;
  const hits = text.filter((f) => f !== 'CHANGELOG.md' && f !== 'test/package.test.mjs' && residue.test(read(f)));
  assert.deepEqual(hits, []);
});

test('every stylist in the registry is wired end to end', () => {
  assert.deepEqual(readdirSync(at('internal/adapters')).sort(), stylists.map((s) => s.id + '.md').sort());
  for (const { id, engine } of stylists) {
    assert.ok(read('internal/adapters/' + id + '.md').includes('engines.mjs entry ' + engine), id + ' adapter does not load ' + engine);
    assert.ok(read(REFS + '/engine-inputs.md').includes('`' + id + '/'), 'engine-inputs.md has no input file for ' + id);
    assert.ok(read(REFS + '/explore.md').includes(id), 'explore.md does not name ' + id);
    assert.ok(read(SKILL + '/assets/compare.html').includes("'" + id + "'"), 'compare.html does not list ' + id);
  }
});

test('Explore asks five questions, from a snapshot of the real page', () => {
  const interview = read(REFS + '/interview.md');
  assert.deepEqual([...interview.matchAll(/^### Q(\d) /gm)].map((m) => m[1]), ['1', '2', '3', '4', '5']);
  const explore = read(REFS + '/explore.md');
  for (const needle of ['scripts/snapshot.mjs', 'directions.md', 'Five questions', 'Apply one']) assert.ok(explore.includes(needle), 'explore.md does not mention ' + needle);
  assert.ok(existsSync(at('scripts/snapshot.mjs')));
});

test('every engine in the registry is credited in SOURCES.md', () => {
  const sources = read('SOURCES.md');
  for (const engine of json('engines/registry.json').engines) {
    assert.ok(sources.includes(engine.repo) && sources.includes(engine.license), 'SOURCES.md does not credit ' + engine.repo);
  }
});

test('scripts parse, and the probe is one function', () => {
  for (const script of files.filter((f) => f.endsWith('.mjs'))) execFileSync(process.execPath, ['--check', at(script)]);
  // Browser tools evaluate the probe as a single expression, so it must compile as one (compiled here, never run).
  const probe = read(SKILL + '/assets/probe.js');
  assert.match(probe.replace(/^\/\*[\s\S]*?\*\/\s*/, ''), /^\(options = \{\}\) => \{/);
  assert.doesNotThrow(() => new Script('(' + probe + '\n)'));
});
