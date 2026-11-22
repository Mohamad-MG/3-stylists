#!/usr/bin/env node
// env-probe.mjs: step 0 of an Explore run. Probes what this machine can actually do and writes
// RUN_DIR/env.json and RUN_DIR/env.md, which every stylist reads before running its engine.
// Machine facts only, never design input. Zero dependencies.
//
// Usage: node env-probe.mjs <RUN_DIR> [--image-generation yes|no]
//   --image-generation: the orchestrator states it from its own tool list (a shell cannot see it).
import { execSync, spawnSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromePath, findPlaywright, onPath } from './lib.mjs';

const RUN = process.argv[2];
if (!RUN || !existsSync(RUN)) { console.error('usage: node env-probe.mjs <RUN_DIR> [--image-generation yes|no]'); process.exit(2); }
const ig = process.argv.indexOf('--image-generation');
const imageGen = ig >= 0 ? process.argv[ig + 1] : 'unknown';
const PLUGIN = join(dirname(fileURLToPath(import.meta.url)), '..');

const sh = (cmd, t = 20000) => { try { return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'], timeout: t }).toString().trim(); } catch { return null; } };
const DEVNULL = process.platform === 'win32' ? 'NUL' : '/dev/null';
// Reachability through the machine's own proxy settings: curl honours HTTPS_PROXY, node's fetch does not.
function reach(url) {
  if (onPath('curl')) { const c = sh(`curl -sS -o ${DEVNULL} -m 12 -w "%{http_code}" "${url}"`, 15000); return c && c !== '000' ? Number(c) : 0; }
  return null;
}

const env = { probed: new Date().toISOString(), platform: process.platform, node: process.version, checks: {} };
const C = env.checks;

// Browser
C.chrome = chromePath();

// Playwright: local, NODE_PATH, global
const playwright = findPlaywright();
C.playwright_core = playwright ? { module: playwright.module, root: playwright.root } : null;

// Network
C.npm_registry = sh('npm view playwright-core version', 25000) ? 'ok' : 'blocked';
C.github_git = spawnSync('git', ['ls-remote', 'https://github.com/google/fonts', 'HEAD'], { timeout: 30000 }).status === 0 ? 'ok' : 'blocked';
C.google_fonts_api = reach('https://fonts.googleapis.com/css2?family=Inter');
C.impeccable_service = reach('https://impeccable.style/');
C.cdn_jsdelivr = reach('https://cdn.jsdelivr.net/npm/gsap/package.json');
C.unsplash = reach('https://images.unsplash.com/');

// Tools
C.ffmpeg = onPath('ffmpeg');
// On Windows `python3` is often a store stub, so ask each candidate for its version.
const python = ['python3', 'python'].find((bin) => (sh(`${bin} --version`) || '').startsWith('Python 3')) || null;
C.python3 = python;
C.fonttools = python ? !!sh(`${python} -c "import fontTools; print(fontTools.version)"`) : false;
C.python_brotli = python ? !!sh(`${python} -c "import brotli"`) : false;
C.image_generation = imageGen;

const ok = v => v === 'ok' || (typeof v === 'number' && v > 0 && v < 400);
const lines = [];
const P = s => lines.push(s);
P('# Environment notes (machine facts, not design input)');
P(`Probed ${env.probed} by scripts/env-probe.mjs. Plugin root: ${PLUGIN}`);
P('');
P('## What works here');
P(`- Node ${env.node}. Chrome: ${C.chrome || 'NOT FOUND (set CHROME_PATH)'}.`);
P(C.playwright_core ? `- Playwright: \`${C.playwright_core.module}\` found under ${C.playwright_core.root}. If an engine asks for \`npm i playwright-core\`${C.npm_registry === 'ok' ? ', npm works too' : ' and npm is blocked'}, set NODE_PATH=${C.playwright_core.root} or symlink it into your folder's node_modules.`
  : `- Playwright: not found. ${C.npm_registry === 'ok' ? 'Install it with npm as the engine says.' : 'npm is blocked too: browser checks cannot run. Stop and report.'}`);
P(`- npm registry: ${C.npm_registry}. GitHub over git: ${C.github_git}.`);
P(`- Fonts: ${C.github_git === 'ok' ? `fetch any Google Fonts family with \`node ${join(PLUGIN, 'scripts/fetch-font.mjs')} <folder>\` (google/fonts at a pinned commit).` : 'git to GitHub is blocked: use only fonts already on disk.'} Google Fonts API: ${ok(C.google_fonts_api) ? 'reachable' : 'blocked'} (pages must self-host fonts either way).`);
P(`- WOFF2: ${C.python_brotli ? 'fontTools can write WOFF2.' : `fontTools has no Brotli here: subset with fontTools to TTF, then \`node ${join(PLUGIN, 'scripts/ttf2woff2.mjs')} in.ttf out.woff2\`.`} fontTools: ${C.fonttools ? 'yes' : 'no'}. ffmpeg: ${C.ffmpeg ? 'yes' : 'no'}.`);
P(`- Libraries from CDNs (jsDelivr): ${ok(C.cdn_jsdelivr) ? 'reachable' : 'blocked: self-host libraries (for example GSAP from its GitHub release over git)'}.`);
P('');
P('## Engine services');
P(`- Impeccable roll service (impeccable.style): ${ok(C.impeccable_service) ? 'reachable: full roll with challengers and QUALITY BAR boards' : '**blocked: Impeccable will run its degraded roll (no challengers, no QUALITY BAR boards). Record it in NOTES.md and stylist.json → degraded.**'}`);
P(`- Stock photographs (Unsplash): ${ok(C.unsplash) ? 'reachable' : 'blocked: Taste\'s photo search cannot run; photo frames become client slots unless real photographs were supplied'}.`);
P(`- Image generation: ${imageGen === 'yes' ? 'available: Impeccable can take its comp-led path when policy.ai_assets allows' : imageGen === 'no' ? '**none: Impeccable runs code-led (no comps, no plates); cinematic-ui has no generated stills**' : 'unknown: the orchestrator did not state it'}.`);
P('');
P('## Serving pages');
P(`- Serve your own folder with \`node ${join(PLUGIN, 'skills/altero/scripts/serve.mjs')} <folder>\`; it picks a free port. Never open another stylist's folder.`);

env.degraded = [];
if (!ok(C.impeccable_service)) env.degraded.push('impeccable-roll');
if (imageGen !== 'yes') env.degraded.push('no-image-generation');
if (!ok(C.unsplash)) env.degraded.push('no-stock-photos');
if (!C.playwright_core && C.npm_registry !== 'ok') env.degraded.push('no-browser-checks');
writeFileSync(join(RUN, 'env.json'), JSON.stringify(env, null, 1));
writeFileSync(join(RUN, 'env.md'), lines.join('\n') + '\n');
console.log(lines.join('\n'));
console.log('\nDEGRADED: ' + (env.degraded.join(', ') || 'none'));
