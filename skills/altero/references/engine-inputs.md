# Engine inputs: answers → each engine's native files

Each engine performs best when it reads the inputs it was designed for. Write these files before the fork. Write facts only; never add a look, a palette, a font or a layout idea.

Mark every inferred fact `(inferred)`. State absences plainly ("no product photographs exist"), because two of the engines are built to refuse fabrication and need to know what is missing.

## Contract lines
Contract rules travel inside every engine input, so each engine plans for them from the start. Wherever a template below says `<phone line>` or `<copy line>`, paste the line verbatim; the Premium line and, on a snapshot run, the Page line go at the end of every input file:

- **Phone line:** The phone version is designed as its own composition, not reflowed: sections may be reordered, merged, cut or replaced and restyled for the phone.
- **Copy line:** Interface text in any language (headlines, buttons, labels, card text, captions, ledes, testimonials) has no closing full stop, no decorative quotation marks and no ellipsis. Split two ideas into two lines, or join them with a comma when that changes no letter (never lowercase a sentence to join it), and let a quotation read as one by its setting and attribution. Long-form reading text (legal pages, article bodies) is exempt.
- **Premium line:** Meet the premium floor in `<plugin>/internal/contract.md`: a designed header with scroll state, a hero entrance with the main action visible within 200ms, background depth with slow ambient motion that belongs to this industry, designed hover, focus and press states, one motion system, and modern library imagery where it clearly lifts the page (never as the business's own work). Your motion role: <lead | supporting>. Evidence each item in NOTES.md.
- **Page line (only when a snapshot exists):** The user's real page is in `page/`, a front-end-only copy. Rebuild it in your direction with its own text, word for word: you may cut, reorder and split lines, but never reword one or add one. Keep the meaning of its structure, invent nothing, and treat forms and live data as out of scope: they do not work in the copy and need no work. Append it as the last line of every engine input file, after the five choices from `answers.md`, the stylist's entry from `directions.md` and the Premium line.

---

## Manifesto → Impeccable: `manifesto/PRODUCT.md`

Impeccable's init writes this file after interviewing. Explore's snapshot and five questions already hold what that interview asks, so write it in Impeccable's exact schema. Then Impeccable's completion gate is satisfied and its own init does not run again. Copy the schema comment verbatim.

```markdown
# Product
<!-- impeccable:product-schema 1 -->
## Platform
web
## Stack
delegated: static HTML/CSS for the Altero demo slice; final build: <stack from answers.md, or "not decided">
## Users
<primary visitor, situation and job, from the snapshot (inferred)>
## Product Purpose
<what it does, why it exists, what success means — from brief.md>
## Positioning
<positioning, from the snapshot (inferred): what the page claims that a neighbour could not truthfully copy>
## Operating Context
<the situation and rituals around use: the situation, inferred>
## Capabilities and Constraints
<offer, prices, delivery, limits from facts.json; undecided facts listed as undecided>
## Brand Commitments
<brand_commitments from answers.md; the colour policy from Q2 stated as a choice>
- Phone: <phone line>
- Copy: <copy line>
## Evidence on Hand
<proof and the page's own images with paths, from the snapshot; state every absence>
## Product Principles
<three to five strategic principles from the answers; no visual recipes>
## Accessibility & Inclusion
<requirements if any; the language scope from answers.md, with RTL as a first-class reading direction when Arabic is in scope>
```

Do **not** write `DESIGN.md` (new-work creates the world) or `.impeccable/config.json` (Impeccable records only values the user chose). Put the five choices from `answers.md` under `## Product Principles` as stated choices (for example "feel: calm and refined", "distance: recomposed"), never as a described look. Impeccable's new-work step 2 is answered from `answers.md` and `directions.md`; the stylist cannot reach the user.

---

## Atelier → Taste Skill: `atelier/taste-brief.md`

Taste Skill's run step 1 reads the brief for: the kind, what is sold, who buys it, the one main action, and the real material. Write those first, in its vocabulary:

```markdown
# Brief for Taste Skill
kind: <facts.json product.kind>            # Taste's table: software | gaming | tech | product | service | place
what is sold: <product.category>
who buys it: <primary_visitor, inferred>
main action: <product.primary_action.en>   # a verb and an object
lead language: <ar | en>
## Real material
<every asset with path and rights; "none" where none exist>
## Client's own colours
<only if colour_policy is keep or same-family: the page's brand colours, for start.mjs brand; otherwise "none — deal">
## Facts (locked)
<offer, prices, claims with status; assumed facts marked to become data-assumed>
## Photograph policy
stand-in photographs: <yes | no>
<if no and no real photographs exist: every photo slot is a client slot, reported as such>
## Must not claim
<facts.json forbidden>
## Phone
<phone line>
## House copy rule
<copy line>
```

**Dealer history (keeps pages different across runs):** Taste's dealers read and write `.taste-skill/history.json` and `layout-history.json` in the folder they run in. Before the fork, copy `<project>/.altero/taste-history/*` into `atelier/.taste-skill/` if it exists. After the run, copy them back. Without this, every run starts with an empty history and the dealers repeat themselves.

---

## Cinema → cinematic-ui: `cinema/producer-notes.md`

cinematic-ui's stage 1 (development) needs the product truth, the audience, the one action and what can be claimed. Its stage 4 asset call asks how every asset will be sourced. Answer both in advance:

```markdown
# Producer notes for cinematic-ui
## Product truth
<what it is, who it is for, the one action (the page's own call to action), what can honestly be claimed (facts.json claims with status)>
## Audience
<who arrives, in what situation; what they believe when they arrive (from the answers and the snapshot)>
## Must not claim
<forbidden>
## Asset call — answered in advance
supplied by the client: <the page's own images with paths>
free licensed library (photographs, footage): yes, from Pexels, Pixabay, StockCake or Unsplash, for atmosphere, background and hero, when it clearly lifts the page; source URL and licence in NOTES.md; never as the business's own work
AI-generated assets: no, unless the host has an image tool and the user has already agreed
otherwise: redesign the shot around a stand-in
## Language
lead: <ar | en>; Arabic register: <register>
phone: <phone line>
supers, titles and on-screen lines: <copy line>
```

cinematic-ui casts the director, film, medium and grade itself. Never suggest one.
