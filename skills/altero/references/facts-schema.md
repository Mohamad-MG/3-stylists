# facts.json, run.json, stylist.json

## facts.json — the facts lock

Engines write their own copy. They may not invent facts. Every claim, number, price, promise and name on a page must trace to this file.

```json
{
  "schema": 1,
  "product": {
    "name": { "ar": "…", "en": "…" },
    "kind": "software | gaming | tech | product | service | place",
    "category": "what is sold, in plain words",
    "primary_action": { "ar": "…", "en": "…" }
  },
  "audience": "who visits, in what situation",
  "positioning": "the claim a neighbour could not truthfully copy",
  "offer": [
    { "item": { "ar": "…", "en": "…" }, "price": { "amount": 450, "currency": "EGP" }, "note": "…" }
  ],
  "claims": [
    { "text": "delivered in 7 days anywhere in Egypt", "evidence": "operations policy", "status": "confirmed | assumed" }
  ],
  "forbidden": ["things the site must not claim or imply"],
  "brand_commitments": ["pins every engine must honour"],
  "assets": [
    { "path": "assets/logo.svg", "kind": "logo | photo | video | screen | other", "rights": "owned | licensed | stand-in" }
  ],
  "policy": { "stand_in_photos": true, "ai_assets": false, "commercial_fonts": false },
  "language": { "lead": "ar", "register": "egyptian", "numerals": "western" },
  "contacts": "what may appear (rule: no real phone numbers or house numbers in demos)"
}
```

Rules:
- `status: "assumed"` facts must be marked as assumed **visibly** on the page. See "Assumed facts on the page" below.

### Assumed facts on the page
A visitor must be able to see which numbers and promises are not confirmed. An attribute alone (Taste's `data-assumed`) is invisible, so it is not enough.
- **Every element that shows an assumed fact carries `data-assumed`,** whatever the engine. This is what the gate counts.
- **Each one shows a visible marker in the page's language,** inside or right next to the element: for example «للعرض» or «مفترض» in Arabic, and "display only" or "assumed" in English. The marker can be text in the markup or CSS `::after` content. The stylist picks the word and the styling, and they belong to the design, so the engine's own look decides how quiet the marker is. A marker smaller than the body text is fine; one smaller than 11px or below 4.5:1 contrast is not.
- **One footer line is not a substitute.** A footer note may explain the markers, for example "prices and delivery times are for display only". It does not replace them.
- Prices, delivery times and counts appear exactly as written here, in every language in scope.
- `kind` uses Taste Skill's classification so its dealers run correctly; the other engines ignore it.

## run.json — the showcase index (run folder)

```json
{
  "name": "Project name",
  "created": "2026-11-13T23:40:00+02:00",
  "lead": "ar",
  "variants": [
    { "id": "base",      "title": "Current site" },
    { "id": "atelier",   "title": "Atelier" },
    { "id": "manifesto", "title": "Manifesto" },
    { "id": "cinema",    "title": "Cinema" }
  ],
  "picked": null
}
```

## stylist.json — each stylist's deliverable manifest (stylist folder)

```json
{
  "engine": "taste-skill",
  "commit": "f6b7657",
  "lead": "ar",
  "pages": { "ar": "index.html", "en": "en/index.html" },
  "tagline": { "ar": "…", "en": "…" },
  "notes": "NOTES.md",
  "engine_gate": "GATE: PASS"
}
```

The showcase opens `<stylist>/<pages[lang]>`. `base` is the snapshot (`scripts/snapshot.mjs` writes its `stylist.json`); list it first, and leave it out when there is no existing site. Paths are relative to the stylist's folder, so each engine keeps its native layout.
