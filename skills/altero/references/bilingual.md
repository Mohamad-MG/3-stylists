# Arabic and English

How an interface reads natively in Arabic and in English. This layer decides **only** what is Arabic- or direction-specific. In Explore the world, layout, palette, Latin type, motion character and copy voice belong to the stylist's engine; in an existing project they belong to the project.

**Scope by mode**
- **Audit, polish, enhance, build:** sections 4, 5 and 6 apply to every Arabic or right-to-left page, and section 7's font check applies wherever Arabic is rendered. Keep the project's own faces, copy voice and punctuation convention. Where the project has no punctuation convention, use the interface punctuation rule in section 2. In a new build with no pinned Arabic face, choose one from `arabic-type/`.
- **Explore:** every section is part of the contract (`internal/contract.md` at the plugin root). None of the engines Explore runs solves Arabic; this layer does.

## 1. Two pages, one world
- The engine builds the **lead-language page** through its full process (`facts.json → language.lead`).
- The **second page** reuses the same world: tokens, components, imagery, motion layer, signature moments. It is **recomposed** for its reading direction, not mirrored blindly. Check asymmetric compositions: their visual weight moves to the other side, and the balance must still hold.
- Re-apply the engine's own composition rules to the second page (its section heights, its one-idea-per-screen, its shot list). Then run the engine's gates on it.
- The lead language decides where the hard choices are made. When Arabic leads, line length, display sizes and rhythm are set for Arabic first.

## 2. Arabic copy
- Write Arabic **natively** from `facts.json`, in the register from `language.register` (Egyptian, simple Modern Standard, Gulf, Levantine). Never translate the English page word for word.
- Follow the engine's copy principles in Arabic too (Taste: the h1 names the category, a hard fact on the first screen, buttons as a verb and an object; Impeccable: the product's own language; cinematic-ui: headlines are dialogue, short).
- The same fact keeps the same number and the same unit in both languages.
- An engine's English-only copy checks are waived on the Arabic page through that engine's waiver mechanism, with the reason stated.

### Interface punctuation (every page, any language)
A full stop at the end of interface text reads as a document written by a machine. These pages are interfaces, not prose.
- **No full stop** (`.` or `۔`) at the end of any interface string, in either language: headlines, subheads, ledes, buttons, links, nav, labels, badges, card titles and text, captions, prices, form hints, empty states, toasts.
- **No full stop inside them either.** Two ideas in one line: join them with one comma (`،` in Arabic) or with و / "and", or split them into two lines or two elements.
  - ✗ `كل حساباتك في مكان واحد.` → ✓ `كل حساباتك في مكان واحد`
  - ✗ `Connect your bank. We do the rest.` → ✓ `Connect your bank, we do the rest`
- **No quotation marks as decoration.** No `"`, `“ ”`, `« »` or `' '` around testimonials, slogans or headings. A quotation reads as a quotation by its setting: size, weight or italic, and the person's name and role under it.
- **No ellipsis** (`...` or `…`) in interface text, except a live truncation or a loading state.
- **Several sentences in one block** (a testimonial, a lede): each sentence becomes its own line or element, or the sentences are joined with commas. The words never change.
- **Under a copy lock, split before you join.** Joining with a comma would lowercase the next sentence's first letter, and a changed letter is a changed word. When the next sentence starts with a capital (in English, any sentence), make it its own line or element instead. Join only where nothing else changes, as in Arabic, or a fragment list ("Shape, length, finish"). A legal line (© name, rights) keeps its own punctuation: it is a credit, not interface copy, and dropping its stop runs the name into the next words.
- A question mark stays on a real question.
- **Exempt:** long-form reading text the visitor reads as a document: legal and policy pages, article and blog bodies. Mark the container with `data-longform`. Testimonials are interface text, not long-form.
- This rule is part of the contract (level 1). It beats an engine's copy habits; it never changes the engine's words beyond the punctuation and the joining.

## 3. Arabic type
**Use only the 8 approved faces in `arabic-type/catalog.json`**, with the rules in `arabic-type/README.md`: pick the one whose character answers the engine's world, use its tested Latin pair (or, when English leads and the engine chose another Latin, compute the size), build both scripts under one family with identical weight descriptors and `size-adjust` on the Arabic half, and set line height from the measured extent. Never any other face, never from memory, never a system font. Self-host the files (subset WOFF2, with the licence) inside the variant, so the page does not depend on a third-party CDN, and so the gate can verify them.

## 4. Typesetting rules for Arabic
- **No tracking:** `letter-spacing: 0` under `:lang(ar)`. Tracking breaks the joins between letters.
- **No case:** where the engine uses uppercase on Latin, the Arabic counterpart uses weight, size or colour.
- **No synthetic italic or bold:** use only weights the family actually has, and set `font-synthesis: none` on Arabic.
- **Line height:** Arabic needs more vertical room for dots, ascenders and diacritics. Raise it per style until nothing clips; never inherit tight Latin display leading.
- **Optical size:** Arabic often reads smaller at the same `font-size`. Compensate per pair, by eye, in a real render.
- **Alignment:** start-aligned body; no browser justification of Arabic.
- **Tatweel (ـ):** never in body text.
- **Numerals:** follow `language.numerals` everywhere, including counters animated by script (`Intl.NumberFormat`).

## 5. Layout and bidi mechanics
- Logical properties throughout (`margin-inline-start`, `padding-inline`, `inset-inline-*`, `text-align: start`). Where the engine's kit uses physical properties, override them under `[dir="rtl"]`; never edit the engine's kit files.
- `<html lang dir>` on every page. Style direction with `[dir="rtl"]` or `:dir(rtl)`.
- Isolate Latin runs inside Arabic (names, URLs, numbers with units) with `<bdi>` or `unicode-bidi: isolate`.
- Mirror icons that carry direction (arrows, chevrons, back and forward, progress). Never mirror logos, media-play icons, clocks, check marks or photographs.
- Inputs: `dir="auto"` for free text; email, URL and phone fields are `dir="ltr"`.

## 6. Direction-aware motion
- "Forward" means toward the inline end. Multiply horizontal offsets by `-1` in RTL.
- Marquees, carousels, swipes, horizontal scroll scenes and camera pans follow reading direction; test each in RTL.
- **Never split Arabic into characters** for animation. Character splitting breaks letter shaping. Split by words or lines in both languages so the two pages move alike. Check every engine type effect (cinematic-ui `kit/type-fx.js`, Taste's moments, any split utility) on the Arabic page.

## 7. Verification
- Look at both pages in a real browser with the fonts loaded, at the engine's required sizes.
- Confirm in the browser that each Arabic style's family is `loaded` in `document.fonts` and that its computed family is not a fallback. If you cannot load the fonts, the Arabic page is **unverified**: say so in `NOTES.md`; never call it finished.
- Then run the gate checklist's section C (`gate-checklist.md`, next to this file) on your own pages.
