#!/usr/bin/env node
// Altero showcase server — zero dependencies.
// Usage: node serve.mjs <run-folder> [--port 4173] [--host 127.0.0.1]
// Serves the run folder. compare.html falls back to this skill's assets/ folder
// when the run folder does not contain it.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(here, '..', 'assets');

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const positional = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--')));
const root = path.resolve(positional[0] || '.');
const host = flag('--host', '127.0.0.1');
let port = Number(flag('--port', 4173));

if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
  console.error(`[altero] run folder not found: ${root}`);
  process.exit(1);
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.glsl': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const FALLBACK = new Set(['/compare.html']);

function inside(base, target) {
  const rel = path.relative(base, target);
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

// A snapshot folder (altero snapshot) keeps a map of query-keyed files and each file's real content type.
const snapshots = new Map();
function snapshotOf(dir) {
  if (!snapshots.has(dir)) {
    let data = null;
    try { data = JSON.parse(fs.readFileSync(path.join(dir, 'snapshot.json'), 'utf8')); } catch {}
    snapshots.set(dir, data);
  }
  return snapshots.get(dir);
}

function locate(base, urlPath, search) {
  const snap = snapshotOf(base);
  const mapped = snap && snap.queryMap && snap.queryMap[urlPath + search];
  let file = path.resolve(base, '.' + (mapped || urlPath));
  if (!inside(base, file)) return null;
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  return fs.existsSync(file) ? file : null;
}

function resolveFile(urlPath, search = '', referer = '') {
  const direct = locate(root, urlPath, search);
  if (direct) return { file: direct, base: root };
  // A page inside a folder (the snapshot, a stylist) asks for root-relative files: look in that folder.
  try {
    const seg = new URL(referer).pathname.split('/')[1];
    if (seg) {
      const dir = path.join(root, decodeURIComponent(seg));
      if (inside(root, dir) && fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
        const viaReferer = locate(dir, urlPath, search);
        if (viaReferer) return { file: viaReferer, base: dir };
      }
    }
  } catch {}
  // The browser may send no Referer (a strict referrer policy): try any snapshot folder.
  try {
    for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
      if (!entry.isDirectory() || !snapshotOf(path.join(root, entry.name))) continue;
      const found = locate(path.join(root, entry.name), urlPath, search);
      if (found) return { file: found, base: path.join(root, entry.name) };
    }
  } catch {}
  if (FALLBACK.has(urlPath)) {
    const asset = path.join(assetsDir, urlPath.slice(1));
    if (fs.existsSync(asset)) return { file: asset, base: root };
  }
  return null;
}

const server = http.createServer((req, res) => {
  let urlPath, search = '';
  try {
    const u = new URL(req.url, 'http://x');
    urlPath = decodeURIComponent(u.pathname);
    search = u.search;
  } catch {
    res.writeHead(400).end('Bad request');
    return;
  }
  if (urlPath === '/') {
    res.writeHead(302, { Location: '/compare.html' }).end();
    return;
  }
  const hit = resolveFile(urlPath, search, req.headers.referer || '');
  const file = hit && hit.file;
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
    return;
  }
  res.writeHead(200, {
    'Content-Type': MIME[path.extname(file).toLowerCase()] || (snapshotOf(hit.base)?.types?.['/' + path.relative(hit.base, file).split(path.sep).join('/')]) || 'application/octet-stream',
    'Cache-Control': 'no-store'
  });
  fs.createReadStream(file).pipe(res);
});

let attempts = 0;
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE' && attempts < 20) {
    attempts += 1;
    port += 1;
    server.listen(port, host);
  } else {
    console.error(`[altero] server error: ${err.message}`);
    process.exit(1);
  }
});

server.listen(port, host, () => {
  console.log(`Altero showcase: http://${host}:${port}/compare.html`);
  console.log(`Serving: ${root}`);
});
