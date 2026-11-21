# Engine inputs: answers → each engine's native files

Each engine performs best when it reads the inputs it was designed for. Write these files before the fork. Write facts only; never add a look, a palette, a font or a layout idea.

Mark every inferred fact `(inferred)`. State absences plainly ("no product photographs exist"), because two of the engines are built to refuse fabrication and need to know what is missing.

## Contract lines
Two contract rules travel inside every engine input, so each engine plans for them from the start. Wherever a template below says `<phone line>` or `<copy line>`, paste the line verbatim:

- **Phone line:** The phone version is designed as its own composition, not reflowed: sections may be reordered, merged, cut or replaced and restyled for the phone.
- **Copy line:** No full stop at the end of any interface text, in Arabic or English (headlines, buttons, labels, card text, captions, ledes). Join two ideas with a comma or split them into two lines. Long-form reading text (legal pages, article bodies) is exempt.

---

## Manifesto → Impeccable: `manifesto/PRODUCT.md`

Impeccable's init writes this file after interviewing. The Explore interview already did that interview, so write it in Impeccable's exact schema. Then Impeccable's completion gate is satisfied and its own init does not run again. Copy the schema comment verbatim.

```markdown
# Product
<!-- impeccable:product-schema 1 -->
## Platform
web
## Stack
delegated: static HTML/CSS for the 3 Stylists demo slice; final build: <R1 answer or "not decided">
## Users
<Q1: primary visitor, situation, job>
## Product Purpose
<what it does, why it exists, what success means — from brief.md and Q1>
## Positioning
<Q2: the claim a neighbour could not truthfully copy>
## Operating Context
<the situation and rituals around use: Q1 situation, R2 use scene if asked>
## Capabilities and Constraints
<offer, prices, delivery, limits from facts.json; undecided facts listed as undecided>
## Brand Commitments
<Q3 pins, if any>
- Phone: <phone line>
- Copy: <copy line>
## Evidence on Hand
<Q2 proof and Q6 assets with paths; state every absence>
## Product Principles
<three to five strategic principles from the answers; no visual recipes>
## Accessibility & Inclusion
<R3 if asked; Arabic and English, RTL as a first-class reading direction>
```

Do **not** write `DESIGN.md` (new-work creates the world) or `.impeccable/config.json` (Impeccable records only values the user chose). Q5 ("what would feel wrong") goes in `answers.md`; the stylist hands it to new-work step 2, which asks exactly that.

---

## Atelier → Taste Skill: `atelier/taste-brief.md`

Taste Skill's run step 1 reads the brief for: the kind, what is sold, who buys it, the one main action, and the real material. Write those first, in its vocabulary:

```markdown
# Brief for Taste Skill
kind: <facts.json product.kind>            # Taste's table: software | gaming | tech | product | service | place
what is sold: <product.category>
who buys it: <Q1>
main action: <product.primary_action.en>   # a verb and an object
lead language: <ar | en>
## Real material
<every asset with path and rights; "none" where none exist>
## Client's own colours
<only if Q3 pinned colours, for start.mjs brand; otherwise "none — deal">
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

**Dealer history (keeps pages different across runs):** Taste's dealers read and write `.taste-skill/history.json` and `layout-history.json` in the folder they run in. Before the fork, copy `<project>/.3stylists/taste-history/*` into `atelier/.taste-skill/` if it exists. After the run, copy them back. Without this, every run starts with an empty history and the dealers repeat themselves.

---

## Cinema → cinematic-ui: `cinema/producer-notes.md`

cinematic-ui's stage 1 (development) needs the product truth, the audience, the one action and what can be claimed. Its stage 4 asset call asks how every asset will be sourced. Answer both in advance:

```markdown
# Producer notes for cinematic-ui
## Product truth
<what it is, who it is for, the one action (Q1), what can honestly be claimed (facts.json claims with status)>
## Audience
<who arrives, in what situation; what they believe when they arrive (from Q1, Q2, Q5)>
## Must not claim
<forbidden>
## Asset call — answered in advance
supplied by the client: <Q6 assets with paths, or "nothing">
free licensed library (photographs, footage): <yes | no>
AI-generated assets: <yes | no; budget if given>
otherwise: redesign the shot around a stand-in
## Language
lead: <ar | en>; Arabic register: <register>
phone: <phone line>
supers, titles and on-screen lines: <copy line>
```

cinematic-ui casts the director, film, medium and grade itself. Never suggest one.
