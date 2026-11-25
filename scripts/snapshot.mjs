#!/usr/bin/env node
// Altero snapshot: a light, front-end-only copy of a page, so Explore can work on the user's real page
// without their backend, database, secrets or repository. Zero dependencies beyond Playwright and a browser.
//
//   node scripts/snapshot.mjs <url> <outDir> [--page /path]... [--max-mb 40]
//
// Saves, for the pages asked for (default: the URL's own page): the rendered HTML, and every same-origin
// stylesheet, script, font, image and media file the page loads at phone and desktop width, after scrolling
// the whole page so lazy content is present. It does not save fetch or XHR responses, cookies, forms' targets
// or anything server-side. It also records the page's measured baseline (the probe) for the "before" side.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromePath, findPlaywright } from './lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const probeFile = path.resolve(here, '..', 'skills', 'altero', 'assets', 'probe.js');
const args = process.argv.slice(2);
const positional = [];
const pages = [];
let maxMb = 40;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--page') pages.push(args[++i]);
  else if (args[i] === '--max-mb') maxMb = Number(args[++i]);
  else positional.push(args[i]);
}
const [startUrl, outDir] = positional;
if (!startUrl || !outDir) {
  console.error('usage: node scripts/snapshot.mjs <url> <outDir> [--page /path]... [--max-mb 40]');
  process.exit(2);
}
const origin = new URL(startUrl).origin;
const entry = new URL(startUrl);
if (!pages.length) pages.push(entry.pathname + entry.search);

const pw = findPlaywright();
const chrome = chromePath();
if (!pw || !chrome) {
  console.error(`[altero] snapshot needs Playwright and Chrome. Playwright: ${pw ? 'ok' : 'missing (npm i -g playwright-core)'}. Chrome: ${chrome ? 'ok' : 'missing (set CHROME_PATH)'}.`);
  process.exit(1);
}

const out = path.resolve(outDir);
mkdirSync(out, { recursive: true });
const types = {};
const queryMap = {};
const skipped = [];
const saved = new Set();
let bytes = 0;

function target(u, contentType) {
  let p = decodeURIComponent(u.pathname);
  if (u.search) {
    // A resource keyed by its query (an image optimiser, say) gets a stable name and a map entry.
    const ext = path.extname(p) || '';
    const name = '/_q/' + createHash('sha1').update(u.pathname + u.search).digest('hex').slice(0, 12) + (ext || '');
    queryMap[u.pathname + u.search] = name;
    p = name;
  }
  if (p.endsWith('/')) p += 'index.html';
  if (!path.extname(p) && /html/.test(contentType)) p = p.replace(/\/?$/, '') + '/index.html';
  return p;
}

const { chromium } = pw.load();
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const probe = existsSync(probeFile) ? readFileSync(probeFile, 'utf8') : null;
const baseline = {};
let firstPage = '';
let firstLang = '';

for (const pagePath of pages) {
  for (const [name, width, height, mobile] of [['d1440', 1440, 900, false], ['m390', 390, 844, true]]) {
    const ctx = await browser.newContext({ viewport: { width, height }, isMobile: mobile, hasTouch: mobile });
    const page = await ctx.newPage();
    page.on('response', async (r) => {
      try {
        const u = new URL(r.url());
        const kind = r.request().resourceType();
        if (u.origin !== origin || r.status() !== 200 || r.request().method() !== 'GET') return;
        if (['fetch', 'xhr', 'websocket', 'eventsource', 'ping'].includes(kind)) return;
        const ct = r.headers()['content-type'] || '';
        const body = await r.body();
        if (body.length > 8 * 1048576) { skipped.push(u.pathname + ' (over 8 MB)'); return; }
        if (bytes + body.length > maxMb * 1048576) { skipped.push(u.pathname + ' (over the size budget)'); return; }
        const rel = target(u, ct);
        const file = path.join(out, rel);
        if (!path.resolve(file).startsWith(out)) return;
        if (!saved.has(rel)) { bytes += body.length; saved.add(rel); }
        mkdirSync(path.dirname(file), { recursive: true });
        writeFileSync(file, body);
        if (ct) types[rel] = ct.split(';')[0];
      } catch {}
    });
    await page.goto(new URL(pagePath, origin).href, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(1500);
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += Math.round(height * 0.6)) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(350);
    }
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo(0, 0));
    // The first page decides the manifest: where it was saved (after any redirect) and its language.
    if (!firstPage) {
      firstPage = target(new URL(page.url()), 'text/html').replace(/^\//, '');
      firstLang = (await page.evaluate(() => document.documentElement.lang || '')).slice(0, 2).toLowerCase();
    }
    if (probe) {
      try { baseline[pagePath + ' @' + name] = await page.evaluate('(' + probe + '\n)({})'); } catch {}
    }
    const prefix = pages.length > 1 ? pages.indexOf(pagePath) + 1 + '-' : '';
    await page.screenshot({ path: path.join(out, `before-${prefix}${name}.png`), fullPage: false });
    await ctx.close();
  }
}
await browser.close();

const manifest = {
  schema: 1,
  source: startUrl,
  captured: new Date().toISOString(),
  pages,
  files: saved.size,
  bytes,
  types,
  queryMap,
  skipped,
  note: 'Front end only. Fetch and XHR responses, cookies, server code, databases and secrets are not captured. Forms and live data will not work.',
};
writeFileSync(path.join(out, 'snapshot.json'), JSON.stringify(manifest, null, 1));
writeFileSync(path.join(out, 'baseline.json'), JSON.stringify(baseline, null, 1));
// The showcase lists the snapshot as "Current site", so it carries the same manifest every stylist does.
const pageLang = firstLang === 'ar' ? 'ar' : 'en';
writeFileSync(path.join(out, 'stylist.json'), JSON.stringify({
  engine: 'Current site, light copy',
  lead: pageLang,
  pages: { [pageLang]: firstPage || 'index.html' },
  tagline: { ar: 'الموقع زي ما هو دلوقتي، نسخة واجهة بس', en: 'The site as it is now, front end only' },
}, null, 1));
console.log(`snapshot: ${saved.size} files, ${(bytes / 1048576).toFixed(1)} MB, ${pages.length} page(s) → ${out}`);
if (skipped.length) console.log(`skipped: ${skipped.length} (see snapshot.json)`);
