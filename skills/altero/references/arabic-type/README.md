# Arabic type — approved faces and rules

## The rule
**In Explore, only the 8 faces in `catalog.json` may be used for Arabic.** They were approved on 2026-11-14 after a review of real renders. Outside Explore, an existing project keeps its own faces; use this catalog when a new build has no pinned Arabic face. Every other face is out, including those in the earlier 28-face catalog and the whole Arabic rut. If none of the 8 fits the world an engine committed, do not improvise: use the closest of the 8 and say so in `NOTES.md`.

| Face | Designer | Weights | Character |
|---|---|---|---|
| Alyamama | Yazeed Omar | 300–900 | Contemporary contrast with Naskh roots; strong headlines |
| Markazi Text | Borna Izadpanah, Florian Runge, Fiona Ross | 400–700 | Editorial Naskh; Arabic body reads small, so scale it up. Its own Latin is not used |
| Firjar | Yazeed Omar | 100–800, width 75–125 | Geometric; the only approved face with a width axis |
| Alan Sans | Raphaël Ronot, Samar Zureik | 300–900 | Robust contemporary grotesque with a matching Latin |
| Vazirmatn | Saber Rastikerdar | 100–900 | Clean, trusted sans; its own Latin is generic and not used |
| Beiruti | Boutros Fonts | 200–900 | Condensed; body reads small, so scale it up. Its own Latin is not used |
| Baloo Bhaijaan 2 | Ek Type | 400–800 | Rounded and warm |
| Playpen Sans Arabic | TypeTogether, Azza Alameddine, Laura Meseguer | 100–800 | Handwriting-based, playful without being cheap |

All are OFL-1.1, from `github.com/google/fonts` at commit `29b4ec6`. Review page: `specimen.html`, which renders every face and every pair in the browser.

**Exception:** a client's own licensed brand face, pinned in `facts.json → brand_commitments` with `policy.commercial_fonts: true`, replaces the list for that project only. The checks in section 4 still apply.

## 1. Tested pairs
Every approved Arabic face has one or two Latin partners, measured and rendered together in Chrome with the real files (open `specimen.html` to see them). The numbers are in `catalog.json → faces[].pairs`. The renders were reviewed on 2026-11-14 and six partners were removed.

| Arabic | Latin partner | Rank | Arabic size | Weights (Latin 400 / 700 → Arabic) |
|---|---|---|---|---|
| Alyamama | Spectral (static 400, 700) | primary | 104% | 500 / 900 |
| Markazi Text | Source Serif 4 | primary | 145% | 400 / 650 |
| Firjar | Firjar (own) | primary | 104% | 350 / 650 |
| Firjar | Sora | alternate | 126% | 400 / 700 |
| Alan Sans | Alan Sans (own) | primary | 103% | 400 / 700 |
| Alan Sans | Hanken Grotesk | alternate | 103% | 350 / 600 |
| Vazirmatn | Onest | primary | 133% | 250 / 500 |
| Beiruti | Sofia Sans Condensed | primary | 115% | 400 / 600 |
| Baloo Bhaijaan 2 | Baloo 2 (same family) | primary | 112% | 400 / 650 |
| Baloo Bhaijaan 2 | Nunito | alternate | 115% | 400 / 550 |
| Playpen Sans Arabic | Playpen Sans (same family) | primary | 105% | 400 / 700 |
| Playpen Sans Arabic | Nunito | alternate | 96% | 400 / 600 |

All 12 pairs are approved. **primary** is the default; **alternate** is the second choice where a face has two.

**Removed after review (never use):** Alyamama's own Latin, Bodoni Moda, Markazi Text's own Latin, Figtree, Albert Sans, Beiruti's own Latin.
**Rejected after rendering, before review:** Young Serif (a single heavy weight forces Arabic body text to 700), Literata and Piazzolla (Markazi's Arabic would need 170–183%), Manrope (Arabic body falls to 200), and Vazirmatn's own Latin (a generic Roboto derivative).

### How a pair meets the engine's own type choice
The engines choose Latin type themselves (Taste deals a pairing; Impeccable picks faces from the world). So:
- **Arabic leads** (`language.lead: "ar"`): the Arabic face is the page's primary voice and part of this layer. Choose it first from the 8, by the world the engine committed. The Latin is then one of that face's listed partners; where there are two, the engine picks between them by its own criteria. Record the override in `NOTES.md`.
- **English leads:** the engine chooses the Latin freely. If that face is one of the tested partners, use that pair's numbers. A removed face (listed above) is never used, whichever language leads. If it is not, choose the Arabic from the 8 by character and compute the size and weights with section 2, then verify by eye.

## 2. Build the pair in CSS (required recipe)
Put both scripts under **one family name**, so mixed lines (a brand name inside Arabic, a price inside English) stay in proportion:

```css
@font-face {                       /* Latin half */
  font-family: "Pair";
  src: url(fonts/latin.woff2) format("woff2");
  font-weight: 100 900;            /* identical in both rules */
  unicode-range: U+0000-05FF, U+2000-206F;
}
@font-face {                       /* Arabic half */
  font-family: "Pair";
  src: url(fonts/arabic.woff2) format("woff2");
  font-weight: 100 900;            /* identical in both rules */
  size-adjust: 125%;               /* the pair's arabic_size_adjust */
  unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF;
}
body { font-family: "Pair"; }
:lang(ar) .body-text { font-weight: 250; }  /* the pair's mapped weight for Latin 400 */
:lang(ar) h1, :lang(ar) h2 { font-weight: 500; } /* mapped weight for Latin 700 */
```

- **The two `font-weight` descriptors must be identical.** Chrome groups faces by their descriptors. With different ranges (300–900 against 400–900), it uses only one of them, and the other script silently falls back to a system font. This was reproduced while testing these pairs.
- **Static Latin files** (separate Regular and Bold files, such as Spectral) cannot share one `100 900` range. Split the weight scale into buckets at the midpoint between the static weights, give each Latin file its bucket, and declare the Arabic file once per bucket with the same range:
  ```css
  @font-face { font-family:"Pair"; src:url(latin-400.woff2); font-weight:1 550;    unicode-range:U+0000-05FF, U+2000-206F; }
  @font-face { font-family:"Pair"; src:url(arabic.woff2);    font-weight:1 550;    size-adjust:104%; unicode-range:U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF; }
  @font-face { font-family:"Pair"; src:url(latin-700.woff2); font-weight:551 1000; unicode-range:U+0000-05FF, U+2000-206F; }
  @font-face { font-family:"Pair"; src:url(arabic.woff2);    font-weight:551 1000; size-adjust:104%; unicode-range:U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF; }
  ```
  Every mapped Arabic weight must fall inside the bucket of the Latin weight it pairs with (Alyamama: 500 with Latin 400, 900 with Latin 700).
- For a face whose own Latin is the partner (an "own" pair), declare the same file twice with the two unicode ranges, so `size-adjust` applies to the Arabic half only.
- The weight mapping applies per language (`:lang(ar)`). Inside a mixed line, the inline Latin takes the Arabic weight. That small mismatch is acceptable; the size stays correct.

## 3. Sizing an untested combination
Only for the English-lead case where the engine's Latin is not a tested partner:

```
arabic_size_adjust = 0.9 × latin_x_height / arabic_body_height
```

Measure both in the browser with the real fonts:

```js
function ink(font, ch) {
  const c = document.createElement('canvas').getContext('2d');
  c.font = font;
  return c.measureText(ch).actualBoundingBoxAscent;
}
const full = ink('100px "Latin Face"', 'x') / ink('100px "Arabic Face"', 'ب');
const sizeAdjust = Math.round(full * 0.9 * 100) + '%';
```

The 0.9 comes from the families designed together, which set Arabic at 0.81–0.88 of a full x-height match. Never go below a designed-together pair's own ratio. Then match weights by eye (or by stem thickness, as the catalog does), and judge the result in a real render.

## 4. Line height
- **Static text:** body line height of at least `max(1.6, metrics.arabic_extent_em × 1.05)`.
- **Masked or animated type:** the mask must cover `metrics.arabic_extent_em`, or the marks clip.

## 5. Verify every page (required)
1. Self-host subset WOFF2 files inside the variant, with `OFL.txt`.
2. In a real browser, confirm **every** `@font-face` of the pair is `loaded` in `document.fonts` (both halves, every bucket). A half that stays `unloaded` means its weight range differs from the other half's, and that script is rendering in a system font.
3. Check diacritics and dots at display sizes, لا, digits in the page's numeral system, and mixed Arabic–Latin lines.
4. Put the Arabic and Latin hierarchies side by side and adjust until they read as one system.
5. Record the Arabic face, the Latin partner, the size-adjust and weights used, and screenshot paths in `NOTES.md`.
