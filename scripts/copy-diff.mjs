#!/usr/bin/env node
// Altero copy lock: list the visible text in a variant that is not on the original page.
//
//   node scripts/copy-diff.mjs <original-url> <variant-url> [--allow "Skip to content"]...
//
// Both pages are loaded at 1440 px and scrolled to the end, so lazy and animated text is present.
// Every text piece of the variant must already exist on the original: cutting, reordering and splitting
// are fine, rewording is not. Exits 1 and lists the new pieces when there are any.
import { chromePath, findPlaywright } from './lib.mjs';

const args = process.argv.slice(2);
const allow = ['skip to content'];
const urls = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--allow') allow.push(String(args[++i]).toLowerCase());
  else urls.push(args[i]);
}
const [originalUrl, variantUrl] = urls;
if (!originalUrl || !variantUrl) {
  console.error('usage: node scripts/copy-diff.mjs <original-url> <variant-url> [--allow "text"]...');
  process.exit(2);
}
const pw = findPlaywright();
const chrome = chromePath();
if (!pw || !chrome) { console.error('[altero] copy-diff needs Playwright and Chrome'); process.exit(2); }

const { chromium } = pw.load();
const browser = await chromium.launch({ executablePath: chrome, headless: true });

async function pieces(url) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(1500);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 700) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(120); }
  // Text owned directly by each element, so a split headline is read as its words, not repeated per wrapper.
  const list = await page.evaluate(() => {
    const out = [];
    const seen = new Set();
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    while (walk.nextNode()) {
      const el = walk.currentNode;
      if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(el.tagName) || el.closest('svg')) continue;
      const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(' ').replace(/\s+/g, ' ').trim();
      if (own.length < 3 || seen.has(own.toLowerCase())) continue;
      seen.add(own.toLowerCase());
      out.push(own);
    }
    return out;
  });
  await page.close();
  return list;
}

const norm = (s) => s.toLowerCase().normalize('NFKC').replace(/[‘’]/g, "'").replace(/[^\p{L}\p{N}' ]/gu, ' ').replace(/\s+/g, ' ').trim();
const original = norm((await pieces(originalUrl)).join(' \u0000 '));
const variant = await pieces(variantUrl);
await browser.close();

const fresh = variant.filter((t) => {
  const n = norm(t);
  // A piece with no letters (a slide counter such as "03 / 03") is interface, not copy.
  return n.length > 2 && /\p{L}/u.test(n) && !original.includes(n) && !allow.includes(n);
});
console.log(JSON.stringify({ original: originalUrl, variant: variantUrl, pieces: variant.length, new: fresh }, null, 1));
process.exit(fresh.length ? 1 : 0);
