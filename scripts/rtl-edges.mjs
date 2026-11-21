#!/usr/bin/env node
// rtl-edges.mjs: the right-to-left complement to an engine's left-edge layout checks.
//
// Some engine checkers (Taste Skill's layout-check.js and consistency.mjs) measure every text block from its
// left edge and have no right-to-left handling. On an RTL page they report every correctly start-aligned
// heading as "off the line". This script measures the same family in logical terms (inline-start), so a
// stylist can show which of those findings are an artefact of direction and which are real.
//
// It checks, at each width:
//   start-line      in each section, the first heading and the lead that follows it share one inline-start edge (±2px)
//   page-lines      section headings across the page start on at most 2 distinct inline-start lines (±2px)
//   physical-align  no heading or paragraph is aligned to the physical end (text-align:left in RTL, right in LTR)
//   overflow        no horizontal scroll
// It does not reproduce an engine's grid, rhythm or spacing checks. Centered text is skipped.
//
// Usage: node rtl-edges.mjs <url> [--widths 390,1440] [--json]
// Needs playwright-core (local, global, or NODE_PATH) and Chrome (CHROME_PATH, or the usual paths).
import { chromePath, findPlaywright } from './lib.mjs';

const args = process.argv.slice(2);
const url = args.find(a => !a.startsWith('--'));
if (!url) { console.error('usage: node rtl-edges.mjs <url> [--widths 390,1440] [--json]'); process.exit(2); }
const wi = args.indexOf('--widths');
const widths = (wi >= 0 ? args[wi + 1] : '390,1440').split(',').map(Number);
const asJson = args.includes('--json');


const MEASURE = () => {
  const rtl = getComputedStyle(document.documentElement).direction === 'rtl';
  const visible = e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && !e.closest('[aria-hidden="true"],nav,header,footer,[data-ui]'); };
  const startEdge = e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
    return rtl ? r.right - parseFloat(s.paddingRight) : r.left + parseFloat(s.paddingLeft); };
  const label = e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + ' «' + e.textContent.trim().slice(0, 40) + '»';
  const out = { dir: rtl ? 'rtl' : 'ltr', findings: [], measured: 0 };
  const sections = [...document.querySelectorAll('main section, main > div, body > section')].filter(visible);
  const headStarts = [];
  for (const sec of sections) {
    const h = [...sec.querySelectorAll('h1,h2')].find(e => visible(e) && getComputedStyle(e).textAlign !== 'center');
    if (!h) continue;
    out.measured++;
    const hs = startEdge(h); headStarts.push({ x: hs, el: label(h) });
    let lead = h.nextElementSibling;
    while (lead && !(lead.matches('p') && visible(lead))) lead = lead.nextElementSibling;
    if (lead && getComputedStyle(lead).textAlign !== 'center') {
      const d = Math.abs(startEdge(lead) - hs);
      if (d > 2) out.findings.push({ check: 'start-line', where: label(h) + ' / ' + label(lead), delta: Math.round(d) });
    }
  }
  const lines = [];
  for (const { x } of headStarts) if (!lines.some(l => Math.abs(l - x) <= 2)) lines.push(x);
  if (lines.length > 2) out.findings.push({ check: 'page-lines', where: lines.length + ' heading start lines', lines: lines.map(Math.round) });
  for (const e of document.querySelectorAll('h1,h2,h3,p')) {
    if (!visible(e)) continue;
    const ta = getComputedStyle(e).textAlign;
    if ((rtl && ta === 'left') || (!rtl && ta === 'right')) out.findings.push({ check: 'physical-align', where: label(e), textAlign: ta });
  }
  const ov = document.documentElement.scrollWidth - innerWidth;
  if (ov > 0) out.findings.push({ check: 'overflow', where: 'document', px: ov });
  return out;
};

const found = findPlaywright();
if (!found) { console.error('playwright-core not found: install it, or set NODE_PATH to a folder that has it'); process.exit(2); }
const pw = found.load();
const exe = chromePath();
const browser = await pw.chromium.launch(exe ? { executablePath: exe, args: ['--no-sandbox'] } : { args: ['--no-sandbox'] });
const report = { url, widths: {}, pass: true };
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: w < 600 ? 844 : 900 } });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const r = await page.evaluate(MEASURE);
  report.widths[w] = r;
  if (r.findings.length) report.pass = false;
  await page.close();
}
await browser.close();

if (asJson) console.log(JSON.stringify(report, null, 1));
else {
  for (const [w, r] of Object.entries(report.widths)) {
    console.log(`${w}px  dir=${r.dir}  sections measured=${r.measured}`);
    for (const f of r.findings) console.log(`  FAIL ${f.check}: ${f.where}${f.delta ? ' (' + f.delta + 'px)' : ''}`);
  }
  console.log(report.pass ? 'RTL-EDGES: PASS' : 'RTL-EDGES: FAIL');
}
process.exit(report.pass ? 0 : 1);
