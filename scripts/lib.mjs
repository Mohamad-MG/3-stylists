// Helpers shared by the 3 Stylists scripts. Zero dependencies.
import { execFileSync, execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

/** True when `bin` is on PATH. The name is passed as an argument, never spliced into a shell string. */
export function onPath(bin) {
  try {
    if (process.platform === 'win32') execFileSync('where', [bin], { stdio: 'ignore' });
    else execFileSync('sh', ['-c', 'command -v "$1"', 'sh', bin], { stdio: 'ignore' });
    return true;
  } catch { return false; }
}

/** The first installed Chrome, Chromium or Edge. CHROME_PATH (or CHROME) wins. */
export function chromePath() {
  const env = process.env;
  const windows = [env.PROGRAMFILES, env['PROGRAMFILES(X86)'], env.LOCALAPPDATA].filter(Boolean).flatMap((base) => [
    path.join(base, 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(base, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
  ]);
  const candidates = [
    env.CHROME_PATH, env.CHROME,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser',
    ...windows,
  ].filter(Boolean);
  return candidates.find((p) => existsSync(p)) || null;
}

/** Folders that may hold node_modules: the working folder, NODE_PATH, the global npm root. */
export function moduleRoots() {
  const roots = [process.cwd(), ...(process.env.NODE_PATH || '').split(path.delimiter).filter(Boolean)];
  try { roots.push(execSync('npm root -g', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()); } catch {}
  for (const extra of ['/opt/npm-tools/node_modules', '/usr/local/lib/node_modules', '/usr/lib/node_modules']) {
    if (existsSync(extra)) roots.push(extra);
  }
  return roots;
}

/** Where playwright-core (or playwright) is installed: { module, root, load() }, or null. */
export function findPlaywright() {
  const require = createRequire(import.meta.url);
  for (const root of moduleRoots()) {
    for (const name of ['playwright-core', 'playwright']) {
      try {
        const pkg = require.resolve(name + '/package.json', { paths: [root] });
        return { module: name, root: path.dirname(path.dirname(pkg)), load: () => require(require.resolve(name, { paths: [root] })) };
      } catch {}
    }
  }
  return null;
}
