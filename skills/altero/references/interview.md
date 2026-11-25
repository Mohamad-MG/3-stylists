# The five questions

Exactly five, all about how the page should look and feel, all closed: **pick one of two or three**. Nothing is open text, nothing is a yes or no about the business. The business is already on the page: the snapshot shows the offer, the visitor's path, the proof (reviews, work, address) and the call to action, so Explore reads them and marks them `(inferred)` instead of asking.

## What is never asked
- **The call to action.** Every page ends in one: a WhatsApp button, a booking form, a phone number. Keep the page's own, and make sure each direction places it well. Whether it exists is not a question.
- **Whether the proof is "strong enough".** This is marketing, not a courtroom: use what the page has, and do not invent anything.
- **Images.** The premium floor decides (`<plugin>/internal/contract.md` → Premium floor, item 7): the business's own photographs for its work, results, team and premises; free library imagery for atmosphere, background and hero when it clearly lifts the page. AI-generated images only if the host has an image tool and the user has already agreed; never ask now.
- **Languages and the slice.** The snapshot shows the languages, and the language scope follows them (`<plugin>/internal/contract.md` → Language scope). The slice is the page that was snapshotted, whole. Lead with the language the page leads with. Take these from `brief.md`.

## How to ask
Ask all five together, in the user's language, with your structured question tool and its options. If the tool takes four at most, send four and the fifth straight after, without commentary in between. Give every option a short, concrete label and one line saying what it means for the page. The user may also answer "you choose" on any question: then the engine decides that axis by its own process.

---

### Q1 — How should the page feel to the visitor?
- **Options:** Calm and refined · Warm and personal · Bold and striking
- **AR:** إحساس الصفحة للزائر: هادي وراقي · دافي وشخصي · جريء ولافت
- **Feeds:** Impeccable `## Product Principles` and its direction deal, Taste's brief, cinematic-ui's tone. It states the feeling to serve, never a style to copy.

### Q2 — How far may the colours move?
- **Options:** Keep the brand colours exactly · Same family, fresher · Open to a new palette
- **AR:** الألوان: نفس ألوان البراند بالظبط · نفس العيلة بس أحدث · مفتوح للون جديد
- **Feeds:** Impeccable `## Brand Commitments`, Taste `start.mjs brand` (the client's own colours), cinematic-ui's grade.

### Q3 — How much on each screen?
- **Options:** Airy: few things and a lot of space · Balanced · Rich: more on every screen
- **AR:** الكثافة: واسعة وهادية · متوازنة · غنية وفيها تفاصيل أكتر
- **Feeds:** layout and section rhythm in all three engines; the phone cut plan.

### Q4 — How much should the page move?
- **Options:** Supporting: crafted but quiet · Clear: motion you notice · Bold: the page moves with the visitor
- **AR:** الحركة: داعمة وهادية · واضحة وملحوظة · جريئة والصفحة بتتحرك مع الزائر
- **All three directions have motion** (the premium floor). This answer sets the level for two of them; the motion lead goes one step beyond it, and never below "Clear".
- **Feeds:** Impeccable's motion layer, cinematic-ui's camera and scroll, Taste's moments. Motion never replaces content or delays the call to action.

### Q5 — How far from the current page?
- **Options:** Close: same layout, finer · Recomposed: same content, new layout · Reinvented: a new idea for the page
- **AR:** المسافة عن الصفحة الحالية: قريبة (نفس الترتيب بس أدق) · إعادة تركيب (نفس المحتوى وترتيب جديد) · فكرة جديدة للصفحة
- **Feeds:** how much of `page/` each stylist keeps. Content and meaning never change in any option; only structure and look do.

---

## Defaults (when the user says "you choose")
Each engine runs its own direction process for that axis. Record `engine decides` in `answers.md`, and have each engine write what it chose in `NOTES.md`.

## From answers to three directions
After Intake, write `directions.md`: three short entries, one per stylist, each saying in plain words what that stylist's engine will do **with these answers** for this page, and what it will not do. The entries come from the answers and from what each engine is built for, never from an invented look:

- **Atelier (Taste Skill)** reads the answers as a company-grade page where the real material carries the page: photographs, proof and the main action first.
- **Manifesto (Impeccable)** reads them as a page built around the one thing that is different here, with its own visual world.
- **Cinema (cinematic-ui)** reads them as a single story that moves the visitor to the action. It is the **motion lead** unless the answers point elsewhere: its entry says what the motion will carry.

Each entry ends with a "will not do" line, taken from the answers (for instance "will not leave the brand colours" when Q2 is the first option). Show the three entries in one message, then start. It is a preview of the work, not a question.

## Derived fields (write into answers.md)
```
feel:                 calm-refined | warm-personal | bold-striking | engine decides
colour_policy:        keep | same-family | open | engine decides
density:              airy | balanced | rich | engine decides
motion:               supporting | clear | bold | engine decides   # the motion lead goes one step beyond
distance:             close | recomposed | reinvented | engine decides
# From the snapshot and brief, each marked (inferred):
primary_visitor:      ...
situation:            ...
primary_action:       ...           # the page's own call to action, verb + object
positioning:          ...
proof:                [...]         # what the page shows: reviews, work, address, hours
brand_commitments:    [...]         # name, logo, and colours unless Q2 allows more
assets:               [...]         # the page's own images, with paths
image_policy:         own photographs for the business's work; library imagery for atmosphere, background and hero (premium floor, item 7)
languages:            [en] | [ar] | [ar, en]   # the language scope
lead_language:        ar | en
arabic_register:      egyptian | msa | gulf | levantine
numerals:             western | arabic-indic
stack:                static | <framework> | delegated
real_source:          ...           # where the chosen direction will be applied, if known
```
