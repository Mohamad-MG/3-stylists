/*
  3 Stylists probe: measured facts about the page in view. It reads the page and changes nothing.

  Evaluate this whole file as one function in the page, with any browser tool that can run a script
  (Playwright page.evaluate, a browser MCP's evaluate tool, the DevTools console). Run it at each
  width you report on: phones 360, 390 and 430 wide, desktop 1440. Scroll to the bottom and back to
  the top first, so lazy images and scroll-revealed sections exist.

  To name the page's primary action, wrap the call:  () => (<this file>)({ primaryAction: 'Book a visit' })

  Returns plain JSON. `gate` holds pass or fail lists: an empty list passes. Everything else is
  evidence for a reviewer to read, not a verdict.
*/
(options = {}) => {
  const root = document.documentElement;
  const dpr = window.devicePixelRatio || 1;
  const phone = innerWidth < 700;
  const ARABIC = /[؀-ۿ]/;
  const visible = (e) => {
    const r = e.getBoundingClientRect(), s = getComputedStyle(e);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
  };
  const shown = (e) => visible(e) && parseFloat(getComputedStyle(e).opacity) > 0.05;
  const text = (e) => (e.textContent || '').replace(/\s+/g, ' ').trim();
  const classOf = (e) => String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className || '').trim().split(/\s+/)[0];
  const where = (e) => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + (classOf(e) ? '.' + classOf(e) : '');
  const clipped = (e) => {
    for (let n = e.parentElement; n && n !== document.body; n = n.parentElement) if (getComputedStyle(n).overflowX !== 'visible') return true;
    return false;
  };
  const top = (counts, n) => Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => k + ' ×' + v);
  const all = (selector) => [...document.querySelectorAll(selector)];
  const out = {};

  out.page = {
    path: decodeURI(location.pathname), lang: root.lang || null, dir: getComputedStyle(root).direction,
    width: innerWidth, height: innerHeight, scrollHeight: root.scrollHeight, overflowX: Math.max(0, root.scrollWidth - innerWidth),
  };
  if (out.page.overflowX > 0) {
    out.page.overflowFrom = all('body *').filter((e) => {
      const r = e.getBoundingClientRect();
      return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1) && getComputedStyle(e).position !== 'fixed' && !clipped(e);
    }).slice(0, 8).map((e) => where(e) + ' ' + Math.round(e.getBoundingClientRect().left) + '..' + Math.round(e.getBoundingClientRect().right));
  }

  // Headings
  const headings = all('h1,h2,h3,h4,[role=heading]').filter(shown);
  out.headings = {
    h1: headings.filter((h) => h.tagName === 'H1' || h.getAttribute('aria-level') === '1').map((h) => text(h).slice(0, 80)),
    outline: headings.slice(0, 40).map((h) => (h.tagName.length === 2 ? h.tagName.toLowerCase() : 'h' + (h.getAttribute('aria-level') || '?')) + ' ' + text(h).slice(0, 48)),
    doubled: headings.map(text).filter((t) => t.length > 7 && t.length % 2 === 0 && t.slice(0, t.length / 2) === t.slice(t.length / 2)).slice(0, 8),
  };

  // Type and copy, from every element that holds its own visible text
  const sizes = {}, weights = {}, families = {}, seen = new Map();
  const small = [], smallBody = [], tracking = [], tightArabic = [], truncated = [];
  const minBody = root.lang && root.lang.startsWith('ar') ? 16 : 15;
  for (const e of all('body *:not(script):not(style):not(noscript)')) {
    if (![...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1) || !shown(e)) continue;
    const s = getComputedStyle(e), size = Math.round(parseFloat(s.fontSize) * 10) / 10, t = text(e);
    sizes[size + 'px'] = (sizes[size + 'px'] || 0) + 1;
    weights[s.fontWeight] = (weights[s.fontWeight] || 0) + 1;
    const family = s.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    families[family] = (families[family] || 0) + 1;
    if (size < 12) small.push(size + 'px ' + where(e) + ' «' + t.slice(0, 28) + '»');
    if (phone && size < minBody && e.matches('p,li') && t.length > 60) smallBody.push(size + 'px ' + where(e) + ' «' + t.slice(0, 28) + '»');
    if (ARABIC.test(t)) {
      if (s.letterSpacing !== 'normal' && Math.abs(parseFloat(s.letterSpacing)) > 0.01) tracking.push(s.letterSpacing + ' ' + where(e) + ' «' + t.slice(0, 28) + '»');
      const leading = parseFloat(s.lineHeight) / parseFloat(s.fontSize);
      if (leading < (e.matches('h1,h2,h3,h4') ? 1.2 : 1.5) && t.length > 12) tightArabic.push(leading.toFixed(2) + ' ' + where(e) + ' «' + t.slice(0, 28) + '»');
    }
    if (e.children.length === 0) {
      if (t.length >= 40) seen.set(t, (seen.get(t) || 0) + 1);
      if (s.overflow !== 'visible' && (e.scrollWidth > e.clientWidth + 2 || e.scrollHeight > e.clientHeight + 3)) truncated.push(where(e) + ' «' + t.slice(0, 32) + '»');
    }
  }
  const loaded = [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, '')))];
  const GENERIC = /^(serif|sans-serif|monospace|system-ui|ui-[a-z-]+|cursive|fantasy|inherit|-apple-system|BlinkMacSystemFont|Segoe UI|Arial|Helvetica|Times New Roman|Tahoma)$/i;
  out.type = {
    sizes: top(sizes, 30), distinctSizes: Object.keys(sizes).length,
    weights: top(weights, 14), distinctWeights: Object.keys(weights).length,
    families: top(families, 8), fontsLoaded: loaded,
    // A declared web face that never loaded: its text is rendering in a fallback.
    notLoaded: Object.keys(families).filter((f) => !GENERIC.test(f) && !loaded.some((l) => l.toLowerCase() === f.toLowerCase())),
    small: small.slice(0, 12), smallBody: smallBody.slice(0, 12),
    arabicLetterSpacing: tracking.slice(0, 12), tightArabicLeading: tightArabic.slice(0, 12),
  };
  out.copy = {
    duplicates: [...seen].filter(([, n]) => n > 1).map(([t, n]) => n + '× «' + t.slice(0, 64) + '»').slice(0, 12),
    truncated: truncated.slice(0, 10),
  };

  // Images
  const images = all('img').filter(visible), img = { total: images.length, broken: [], missingAlt: [], upscaled: [], oversized: [] };
  for (const i of images) {
    const r = i.getBoundingClientRect(), natural = i.naturalWidth, file = (i.currentSrc || i.src).split('/').pop().split('?')[0].slice(0, 48);
    if (i.complete && natural === 0) img.broken.push(file);
    if (!i.hasAttribute('alt')) img.missingAlt.push(file);
    if (natural > 0 && r.width * dpr > natural * 1.3) img.upscaled.push(file + ' shown ' + Math.round(r.width * dpr) + ' of ' + natural);
    if (natural > 700 && natural > r.width * dpr * 2.2) img.oversized.push(file + ' ' + natural + ' for ' + Math.round(r.width * dpr));
  }
  for (const k of ['broken', 'missingAlt', 'upscaled', 'oversized']) img[k] = img[k].slice(0, 10);
  out.images = img;

  // Sections of the main content, top to bottom, with the space between them
  const main = document.querySelector('main') || document.body;
  let blocks = [...main.children].filter(visible).flatMap((c) => {
    const kids = [...c.children].filter(visible);
    return kids.length > 1 && c.getBoundingClientRect().height > innerHeight * 1.6 ? kids : [c];
  });
  blocks.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
  let bottom = null;
  out.sections = blocks.slice(0, 40).map((b) => {
    const r = b.getBoundingClientRect(), y = Math.round(r.top + scrollY), h = Math.round(r.height), chars = text(b).length, media = b.querySelectorAll('img,video,canvas,svg,picture').length;
    const gap = bottom === null ? 0 : y - bottom;
    bottom = Math.max(bottom || 0, y + h);
    return where(b) + ' y' + y + ' h' + h + ' text' + chars + ' media' + media + (gap > 96 ? ' GAP' + gap : '') + (gap < -60 ? ' OVERLAP' + -gap : '') + (h > innerHeight * 1.3 && chars < 140 && media < 2 ? ' SPARSE' : '');
  });

  // Surfaces and controls: how many variants of the same thing exist
  const radii = {}, buttons = {}, labels = {}, shadows = new Set();
  let blurred = 0;
  for (const e of all('body *')) {
    if (!shown(e)) continue;
    const s = getComputedStyle(e);
    const blur = s.backdropFilter && s.backdropFilter !== 'none';
    if (blur) blurred++;
    const surface = s.backgroundColor !== 'rgba(0, 0, 0, 0)' || parseFloat(s.borderTopWidth) > 0 || blur || s.backgroundImage !== 'none';
    if (surface && parseFloat(s.borderTopLeftRadius) > 0) radii[s.borderTopLeftRadius] = (radii[s.borderTopLeftRadius] || 0) + 1;
    if (s.boxShadow !== 'none') shadows.add(s.boxShadow);
    if ((e.tagName === 'A' || e.tagName === 'BUTTON') && surface) {
      const r = e.getBoundingClientRect();
      if (r.height >= 28 && r.height <= 84 && r.width > 60) {
        const key = Math.round(r.height) + 'px high, radius ' + s.borderTopLeftRadius + ', ' + s.fontSize + '/' + s.fontWeight;
        buttons[key] = (buttons[key] || 0) + 1;
        const label = text(e).slice(0, 36);
        if (label) labels[label] = (labels[label] || 0) + 1;
      }
    }
  }
  out.surfaces = { radii: top(radii, 12), shadowVariants: shadows.size, backdropFilters: blurred, buttonShapes: top(buttons, 12), buttonLabels: top(labels, 24) };
  out.fixedBars = all('body *').filter((e) => ['fixed', 'sticky'].includes(getComputedStyle(e).position) && shown(e)).slice(0, 10).map((e) => {
    const r = e.getBoundingClientRect();
    return getComputedStyle(e).position + ' ' + where(e) + ' ' + Math.round(r.width) + '×' + Math.round(r.height) + ' at y' + Math.round(r.top);
  });

  // Gate lists: empty passes.
  const gate = {};

  // Interface text ends without a full stop. Long-form reading text is exempt when marked data-longform.
  gate.fullStops = all('body *:not(script):not(style):not(noscript)')
    .filter((e) => !e.closest('[data-longform]') && visible(e))
    .filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && /[.۔](\s|$)/.test(n.textContent.trim() + ' ')))
    .map((e) => where(e) + ': ' + text(e).slice(0, 60));

  // Assumed facts carry a visible marker (elements tagged data-assumed).
  const assumed = all('[data-assumed]').filter(visible);
  const marked = (e) => {
    const after = getComputedStyle(e, '::after').content, before = getComputedStyle(e, '::before').content;
    const near = (e.textContent + ' ' + ((e.nextElementSibling && e.nextElementSibling.textContent) || '')).toLowerCase();
    const words = ['للعرض', 'مفترض', 'display only', 'assumed'].concat(options.assumedMarkers || []);
    return (after && after !== 'none' && after !== 'normal') || (before && before !== 'none' && before !== 'normal') || words.some((w) => near.includes(w.toLowerCase()));
  };
  gate.assumed = { count: assumed.length, unmarked: assumed.filter((e) => !marked(e)).map((e) => text(e).slice(0, 50)) };

  // Phone checks. Read them at 360, 390 and 430 wide, at rest at the top of the page.
  const fails = [];
  if (out.page.overflowX > 0) fails.push('overflow ' + out.page.overflowX + 'px');
  if (options.primaryAction) {
    const actions = all('a,button,[role=button],input[type=submit]').filter((e) => visible(e) && (text(e) || e.value || '').includes(options.primaryAction));
    if (!actions.some((e) => e.getBoundingClientRect().top >= 0 && e.getBoundingClientRect().bottom <= innerHeight)) fails.push('primary action not on the first screen');
  }
  // A control a visitor can actually reach: not inert, not a decoy field, not parked off screen.
  const reachable = (e) => {
    if (!visible(e) || e.closest('[inert]')) return false;
    const r = e.getBoundingClientRect(), s = getComputedStyle(e);
    if (r.width <= 2 || r.height <= 2 || r.right <= 0 || r.left >= innerWidth) return false;
    return s.pointerEvents !== 'none' && !(parseFloat(s.opacity) < 0.05 && (e.tabIndex < 0 || e.closest('[aria-hidden="true"]')));
  };
  // A labelled checkbox or radio is tapped through its label, so the label is the target.
  const tapArea = (e) => (e.matches('input[type=checkbox],input[type=radio]') && (e.closest('label') || (e.id && document.querySelector('label[for="' + CSS.escape(e.id) + '"]')))) || e;
  for (const e of all('a,button,[role=button],input,select,textarea,summary')) {
    if (!reachable(e) || e.closest('p,li p,figcaption')) continue;
    const r = tapArea(e).getBoundingClientRect();
    if (r.height < 44 || r.width < 44) fails.push('tap ' + Math.round(r.width) + '×' + Math.round(r.height) + ' ' + (text(e) || e.getAttribute('aria-label') || e.name || e.type || e.tagName).slice(0, 30));
  }
  for (const i of all('input:not([type=checkbox]):not([type=radio]):not([type=file]):not([type=hidden]),select,textarea')) {
    if (reachable(i) && parseFloat(getComputedStyle(i).fontSize) < 16) fails.push('input font ' + getComputedStyle(i).fontSize + ' ' + (i.name || i.id || i.type));
  }
  for (const bar of all('body *').filter((e) => ['fixed', 'sticky'].includes(getComputedStyle(e).position) && visible(e))) {
    const r = bar.getBoundingClientRect();
    const under = document.elementsFromPoint(innerWidth / 2, r.top + r.height / 2).find((u) => !bar.contains(u) && !u.contains(bar) && u.matches('h1,h2,h3,p,li,a,button'));
    if (under && r.height < innerHeight * 0.5) fails.push('fixed bar over ' + under.tagName.toLowerCase() + ' «' + text(under).slice(0, 30) + '»');
  }
  gate.phone = [...new Set(fails)].slice(0, 30);
  gate.primaryAction = options.primaryAction ? 'checked: ' + options.primaryAction : 'not checked: pass { primaryAction } to check the first screen';
  out.gate = gate;
  return out;
}
