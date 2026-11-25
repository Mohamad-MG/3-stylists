# Explore contract

Explore runs three proven design engines **as their authors wrote them** and adds only what none of them has: a light snapshot of the real front end, five questions that feed each engine its native inputs, isolation between the three, an Arabic and English layer, a designed phone cut, and a side-by-side showcase.

Paraphrasing an engine throws away its scripts, dealers, detectors and gates and keeps only a diluted taste. So nothing in this plugin restates an engine's design rules.

Paths: `<plugin>` is the plugin root. `<refs>` is `<plugin>/skills/altero/references`.

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
| Gate (`<refs>/gate-checklist.md`) | technical correctness, facts, bilingual mechanics | judge or change taste |

Which engine each stylist runs, at which commit, and which engines support it: `<plugin>/engines/registry.json`.

## Precedence (when two sources disagree)

| Level | Source | Covers |
|---|---|---|
| 0 | Hard limits | honesty (no invented facts, claims, reviews or figures), licences, privacy, safety |
| 1 | This contract | the facts lock, the copy lock on a snapshot run, the deliverables, isolation, unattended behaviour, the Arabic layer, the interface punctuation rule, the phone rule |
| 2 | The stylist's **primary engine** | everything about the design, including its mandatory steps and its own gates |
| 3 | Support engines | only what level 2 leaves open or delegates |
| 4 | Defaults | only when nothing above speaks |

Level 1 is deliberately thin. It says *what must be delivered*, never *how it should look*. If a contract rule ever forces a taste decision, the rule is wrong: fix the rule, not the engine.

## Known collisions and how they resolve

| Collision | Resolution |
|---|---|
| An engine builds one page in one language; Explore needs Arabic and English | The engine runs its full process for the **lead language**. The second page reuses the same world and is recomposed natively under `<refs>/bilingual.md`. The engine's gates run on both pages. |
| An engine's checks are English-only (Taste's `copy-lint`) | Use the engine's own waiver mechanism with the reason "Arabic page; this check is English-only". Never game or disable a check. |
| An engine's layout checks are left-to-right only (Taste's `layout-check.js`, `consistency.mjs`) | On an RTL page, the direction-blind check ids are proved with `<plugin>/scripts/rtl-edges.mjs`, which measures the same family from the inline-start edge. They are recorded apart (`rtl_blind`, `rtl_edges`, `open_other`), never waived or "fixed" into a broken Arabic page. Every other finding is real. |
| An engine marks assumed facts invisibly (Taste's `data-assumed`) | The contract adds a visible marker; every engine carries `data-assumed` so the gate can count them (`<refs>/facts-schema.md`). |
| A service or capability is missing on this machine (Impeccable's roll service, image generation, stock photographs) | `<plugin>/scripts/env-probe.mjs` finds it before the interview, the user is told what it costs, the engine runs its own documented degraded path, and `stylist.json → degraded` shows it in the showcase. |
| An engine asks the user (Impeccable's decision page and init, cinematic-ui's asset call) | The interview already captured the answers. The adapter maps them to the engine's questions. Anything uncovered follows the engine's own documented unattended path, and the stylist says so in `NOTES.md`. |
| An engine writes its own copy | **From a brief:** allowed and expected; the facts are locked, not the words, and every claim must trace to `facts.json`. **From a snapshot:** the words are locked too. The page's text is the user's, so every visible piece of text must already exist on `base/`: a stylist may cut, reorder and split it, never reword it or add a line. Taste's copy layer is run on the page's own text instead of writing new copy. `<plugin>/scripts/copy-diff.mjs` lists any new line, and the gate fails it. |
| A support engine contradicts the primary engine (Emil's motion against Taste's motion layer) | The primary engine wins. Emil's motion skills are not configured for Atelier for this reason. `break-ui` and `mobile-native` test behaviour only, so they run for all three. |
| Latin type when **Arabic leads** | The Arabic face is chosen first from `<refs>/arabic-type/`; the engine picks the Latin from that face's tested partners. Rejected partners listed in the catalog are never used. The override is recorded in `NOTES.md`. |
| Latin type when **English leads** | The engine chooses the Latin freely. The Arabic face comes from the catalog; if the Latin is a tested partner, the pair's numbers apply, otherwise size and weights are computed and verified. |
| An engine ends interface lines with a full stop | The contract wins: no full stop in interface text in either language (`<refs>/bilingual.md` → Interface punctuation). The engine's words stay; only the punctuation and the joining change. |
| An engine's phone method against the phone rule | The contract requires a planned, recomposed phone cut and its screening; **how** the phone is composed comes from the engine's own method. A plan of only stacked sections fails the contract. |
| An engine bans something the brief needs | The engine's own rule decides; engines distinguish bans from defaults the brief can earn. |

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

- Two pages, Arabic and English, built under `<refs>/bilingual.md`.
- A phone cut for both, planned and screened under `<refs>/phone.md`.
- `stylist.json` with the engine id, its pinned commit, the page paths, the engine's gate result, and `degraded` when a service was missing.
- `NOTES.md` with what the adapter lists, plus **Phone cut** (plan, screening answers, what changed), **Robustness**, **Arabic faces** (which, and why they match), and every assumption or unverified item.

A stylist that owes a fresh-eyes review it cannot run itself returns with the `status` its adapter names; the orchestrator runs the review and continues the stylist with the result.

## Robustness checks before handback

Two of Emil Kowalski's skills test behaviour, not looks, so they apply to every stylist, including one whose engine owns its motion. Locate them with `node <plugin>/scripts/engines.mjs path emil-skills`.

- **`break-ui`** on every element that renders a user's input or data (a name field and everything it feeds, prices, counts, lists, titles). Feed it realistic worst cases through the same boundary as the demo data, **in both languages**: a long Arabic compound name, a one-letter name, an English name in the Arabic page and the reverse, Western and Arabic-Indic digits typed by the visitor, an empty value. Follow its rules: report before fixing, and fix inside the engine's own system. The worst-case toggle never ships in the delivered page.
- **`mobile-native`** on the phone layout: the platform-layer items (100vh, input zoom, tap highlight, sticky hover, safe areas, scroll chaining). Apply only where its reason applies. Say which items need a real device to confirm.

Record both in `NOTES.md` under **Robustness**: what broke, what was fixed, what needs a real device.

## Guarantees that each engine runs at full strength

1. **Pinned and verified.** `engines.mjs verify` passes before the fork. No floating versions.
2. **Native inputs.** Each engine gets the files it was designed to read. An engine that has to guess performs worse.
3. **Mandatory steps stay mandatory.** Impeccable's `concept-seed` roll, Taste's deals and finish gate, cinematic-ui's casting session and screening: the adapters require them, and `NOTES.md` shows their output.
4. **No dilution.** No shared design rules, no palette, no motion grammar of our own.
5. **One engine per context.** Each stylist runs in its own subagent, so engines cannot contaminate each other.
6. **Every fresh-eyes reviewer the engine ships is run,** by the orchestrator when a stylist cannot spawn it.
7. **Engine gates first, the Explore gate second.** A variant reaches the showcase only with its engine's own gate result recorded.
8. **Rendering is real.** Pages are judged in a real browser with their web fonts loaded. A page judged on fallback fonts is *unverified*, never *passed*.
