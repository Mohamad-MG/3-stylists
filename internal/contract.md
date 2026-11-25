# Explore contract

Explore runs three proven design engines **as their authors wrote them** and adds only what none of them has: a light snapshot of the real front end, five questions that feed each engine its native inputs, isolation between the three, an Arabic and English layer, a designed phone cut, a premium floor, and a showcase that shows one direction at a time.

Paraphrasing an engine throws away its scripts, dealers, detectors and gates and keeps only a diluted taste. So nothing in this plugin restates an engine's design rules.

Paths: `<plugin>` is the plugin root. `<refs>` is `<plugin>/skills/altero/references`.

**Language scope.** The languages a run builds, recorded as `languages` in `answers.md`: from a brief, Arabic and English; from a snapshot, the languages of the pages snapshotted (snapshot the Arabic page too, with `--page`, when the site has one and the user wants it). Every rule below that says "every page" means every page in the language scope.

## Who owns what

| Part | Owns | Never does |
|---|---|---|
| Orchestrator (`<refs>/explore.md`) | the snapshot, the five questions, the facts, `directions.md`, translating answers into each engine's native inputs, starting the stylists, the gate, the showcase, applying the one direction the user picks | add taste to a stylist's prompt; rank the variants |
| Stylist (`<plugin>/agents/stylist.md`) | one isolated run of one primary engine | read another stylist's folder; mix in another primary engine |
| Adapter (`<plugin>/internal/adapters/<id>.md`) | how to feed, run and finish its engine inside Explore | restate or paraphrase the engine's design rules |
| Primary engine | every design decision: process, world, layout, type, colour, motion, copy voice, its own gates | (it runs unmodified) |
| Support engines | technique and correctness where the primary engine is silent or delegates | restyle what the primary engine decided |
| Bilingual layer (`<refs>/bilingual.md`) | Arabic and English as two native compositions; Arabic type; RTL mechanics | choose the world, palette or Latin type |
| Phone layer (`<refs>/phone.md`) | that the phone version exists as its own composition: a written plan, a fresh-eyes screening, mechanical checks | decide any phone design: each engine's own phone method does |
| Gate (`<refs>/gate-checklist.md`) | technical correctness, facts, bilingual mechanics, the premium floor's evidence, and the jury score | change taste: it sends a variant back, it never redesigns one |

Which engine each stylist runs, at which commit, and which engines support it: `<plugin>/engines/registry.json`.

## Precedence (when two sources disagree)

| Level | Source | Covers |
|---|---|---|
| 0 | Hard limits | honesty (no invented facts, claims, reviews or figures), licences, privacy, safety |
| 1 | This contract | the facts lock, the copy lock on a snapshot run, the premium floor, the deliverables, isolation, unattended behaviour, the Arabic layer, the interface punctuation rule, the phone rule |
| 2 | The stylist's **primary engine** | everything about the design, including its mandatory steps and its own gates |
| 3 | Support engines | only what level 2 leaves open or delegates |
| 4 | Defaults | only when nothing above speaks |

Level 1 is deliberately thin. It says *what must be delivered*, never *how it should look*. If a contract rule ever forces a taste decision, the rule is wrong: fix the rule, not the engine.

## Premium floor (every direction)

What a direction must have, never what it must look like. The engine decides every form; the floor only says the thing exists, is designed, and is evidenced in `NOTES.md` with captures.

1. **Header.** Logo, navigation and the main action are composed as one designed bar, on desktop and as its own phone bar. It changes state on scroll (the engine chooses how: condense, blur, colour, hide and return) with the page's motion system.
2. **Hero.** An entrance that ends within 800ms, with the main action visible within 200ms, and one quiet motion after it (idle or scroll-linked). Content is readable at rest.
3. **Background depth.** No flat single-colour ground behind the page's main sections. Layered grounds (light, material, texture, atmosphere) with slow ambient motion that belongs to the product's industry and brand, not decoration from nowhere. Body text keeps AA contrast over it.
4. **Hover, focus and press.** Every interactive element has a designed state, consistent across the page: cards, links, buttons, images, the menu.
5. **One motion system.** A shared easing family and duration scale across header, hero, hovers and reveals. Reduced motion is respected: everything rests, nothing stays hidden.
6. **Motion is in all three.** Each direction has designed motion. **One stylist is the motion lead** (Cinema unless `directions.md` names another): on its page motion is the hero, clear and bold (scroll-driven scenes, transitions between sections). The other two keep motion supporting, but present and crafted.
7. **Modern imagery.** A stylist may replace or add atmosphere, background and hero imagery from free libraries (Pexels, Pixabay, StockCake, Unsplash, or the best free alternative) when it clearly lifts the page, with the source URL and licence in `NOTES.md`. A library image is never presented as the business's own work, results, team or premises: those stay the business's own photographs.

The phone keeps the floor in its own composition: header, hero, depth and hovers (as press states) are designed for it, not inherited.

## Known collisions and how they resolve

| Collision | Resolution |
|---|---|
| An engine builds one page in one language; the language scope has two | The engine runs its full process for the **lead language**. The second page reuses the same world and is recomposed natively under `<refs>/bilingual.md`. The engine's gates run on every page. |
| An engine's checks are English-only (Taste's `copy-lint`) | Use the engine's own waiver mechanism with the reason "Arabic page; this check is English-only". Never game or disable a check. |
| An engine's layout checks are left-to-right only (Taste's `layout-check.js`, `consistency.mjs`) | On an RTL page, the direction-blind check ids are proved with `<plugin>/scripts/rtl-edges.mjs`, which measures the same family from the inline-start edge. They are recorded apart (`rtl_blind`, `rtl_edges`, `open_other`), never waived or "fixed" into a broken Arabic page. Every other finding is real. |
| An engine marks assumed facts invisibly (Taste's `data-assumed`) | The contract adds a visible marker; every engine carries `data-assumed` so the gate can count them (`<refs>/facts-schema.md`). |
| A service or capability is missing on this machine (Impeccable's roll service, image generation, stock photographs) | `<plugin>/scripts/env-probe.mjs` finds it before the questions, the user is told what it costs, the engine runs its own documented degraded path, and `stylist.json → degraded` shows it in the showcase. |
| An engine asks the user (Impeccable's decision page and init, cinematic-ui's asset call) | The snapshot and the five answers already hold what it asks. The adapter maps them to the engine's questions. Anything uncovered follows the engine's own documented unattended path, and the stylist says so in `NOTES.md`. |
| An engine writes its own copy | **From a brief:** allowed and expected; the facts are locked, not the words, and every claim must trace to `facts.json`. **From a snapshot:** the words are locked too. The page's text is the user's, so every visible piece of text must already exist on `base/`: a stylist may cut, reorder and split it, never reword it or add a line. Taste's copy layer is run on the page's own text instead of writing new copy. `<plugin>/scripts/copy-diff.mjs` lists any new line, and the gate fails it. |
| A support engine contradicts the primary engine (Emil's motion against Taste's motion layer) | The primary engine wins wherever it has decided. Support engines fill only what it leaves open, including what the premium floor requires and the engine has no means for (see the row on forbidden effects). `break-ui` and `mobile-native` test behaviour only, so they run for all three. |
| Latin type when **Arabic leads** | The Arabic face is chosen first from `<refs>/arabic-type/`; the engine picks the Latin from that face's tested partners. Rejected partners listed in the catalog are never used. The override is recorded in `NOTES.md`. |
| Latin type when **English leads** | The engine chooses the Latin freely. The Arabic face comes from the catalog; if the Latin is a tested partner, the pair's numbers apply, otherwise size and weights are computed and verified. |
| An engine's phone method against the phone rule | The contract requires a planned, recomposed phone cut and its screening; **how** the phone is composed comes from the engine's own method. A plan of only stacked sections fails the contract. |
| An engine bans something the brief needs | The engine's own rule decides; engines distinguish bans from defaults the brief can earn. |
| An engine forbids effects, grounds or loops for this kind of page (Taste on a service page: flat grounds, the dealt moments only) | The premium floor wins (level 1). The engine still makes every form decision: its own moments, motion layer and ground system are used first, and where it has none, the stylist adds the floor's depth, ambient motion and hovers with the support engines (Emil's skills, GSAP) in the engine's own palette, type and spacing. Record it in `NOTES.md` as a floor addition. |
| Punctuation an engine leaves on interface text (full stops, quotation marks, ellipses) | The contract wins: modern interface punctuation (`<refs>/bilingual.md` → Interface punctuation). The engine's words stay; only punctuation and joining change, and quotations are set by typography and attribution, never wrapped in quotation marks. |

## Run layout

```
<project>/.altero/runs/<YYYYMMDD-HHMM>/     RUN_DIR
├── brief.md  answers.md  facts.json           intake, the five answers, the facts lock
├── directions.md                              the three directions, one per stylist
├── base/                                      the snapshot: the current page, front end only (never edited)
├── env.md  env.json                           what this machine can do
├── run.json  compare.html                     the showcase and its index
├── gate-report.md
└── <stylist id>/                              one folder per stylist, the engine's own project root
    ├── page/                                  a copy of base/ the stylist rebuilds in its direction
    ├── the engine's native input file         written by the orchestrator (`<refs>/engine-inputs.md`)
    ├── the engine's own output                in its native layout
    ├── stylist.json                           the deliverable manifest (`<refs>/facts-schema.md`)
    └── NOTES.md
```

`stylist.json` is the only file the showcase reads from a stylist's folder, so each engine keeps its native layout.

## Deliverables (every stylist)

- A page for every language in the language scope, built under `<refs>/bilingual.md`.
- A phone cut for every page, planned and screened under `<refs>/phone.md`.
- The premium floor, evidenced in `NOTES.md`.
- `stylist.json` with the engine id, its pinned commit, the page paths, the engine's gate result, and `degraded` when a service was missing.
- `NOTES.md` with what the adapter lists, plus **Premium floor** (each item, what was built, its capture), **Phone cut** (plan, screening answers, what changed), **Robustness**, **Arabic faces** when Arabic is in scope, and every assumption or unverified item.

A stylist that owes a fresh-eyes review it cannot run itself returns with the `status` its adapter names; the orchestrator runs the review and continues the stylist with the result.

**At most two rounds per reviewer.** Each fresh-eyes review (an engine's reviewer, the phone screening, the jury) runs once, and once more after the fixes. Whatever is still open after the second round is recorded in `NOTES.md` and named in the showcase, and the run moves on.

## Robustness checks before handback

Two of Emil Kowalski's skills test behaviour, not looks, so they apply to every stylist, including one whose engine owns its motion. Locate them with `node <plugin>/scripts/engines.mjs path emil-skills`.

- **`break-ui`** on every element that renders a user's input or data (a name field and everything it feeds, prices, counts, lists, titles). Feed it realistic worst cases through the same boundary as the demo data, **in every language in scope**: a long Arabic compound name, a one-letter name, an English name in the Arabic page and the reverse, Western and Arabic-Indic digits typed by the visitor, an empty value. Follow its rules: report before fixing, and fix inside the engine's own system. The worst-case toggle never ships in the delivered page.
- **`mobile-native`** on the phone layout: the platform-layer items (100vh, input zoom, tap highlight, sticky hover, safe areas, scroll chaining). Apply only where its reason applies. Say which items need a real device to confirm.

Record both in `NOTES.md` under **Robustness**: what broke, what was fixed, what needs a real device.

## Guarantees that each engine runs at full strength

1. **Pinned and verified.** `engines.mjs verify` passes before the fork. No floating versions.
2. **Native inputs.** Each engine gets the files it was designed to read. An engine that has to guess performs worse.
3. **Mandatory steps stay mandatory.** Impeccable's `concept-seed` roll, Taste's deals and finish gate, cinematic-ui's casting session and screening: the adapters require them, and `NOTES.md` shows their output.
4. **No dilution.** No shared design rules, no palette, no motion grammar of our own.
5. **One engine per context.** Each stylist runs in its own subagent, so engines cannot contaminate each other.
6. **Every fresh-eyes reviewer the engine ships is run,** by the orchestrator when a stylist cannot spawn it, for at most two rounds.
7. **Engine gates first, the Explore gate second.** A variant reaches the showcase only with its engine's own gate result recorded.
8. **Rendering is real.** Pages are judged in a real browser with their web fonts loaded. A page judged on fallback fonts is *unverified*, never *passed*.
