# Explore workflow

Three proven design engines rebuild the same page of the user's product in three directions, and the user takes one of them. You are the producer: you do not design, and you add no taste to anyone's prompt. Your job is to take a light copy of the real front end, ask five questions, feed each engine its native inputs, keep the three apart, show the results as fast as they land, and carry only the chosen one into the user's project.

Explore needs git, Node.js 22+, a browser the engines can drive, and subagents. Paths: `<plugin>` is the installed plugin root, two folders above this skill's folder. `<refs>` is the folder this file is in.

Read `<plugin>/internal/contract.md` once per session: who owns what, the precedence table and the collisions this workflow relies on.

```
0 Engines → 1 Snapshot → 2 Intake → 3 Five questions → 4 Facts → 5 Directions → 6 Engine inputs → 7 Fork → 8 Gate → 9 Showcase → Apply one
```

## 0. Engines
Run from `<plugin>`:
```bash
node scripts/engines.mjs doctor
node scripts/engines.mjs fetch      # first run, or after a registry change
node scripts/engines.mjs verify     # must pass before step 5
```
On a host other than Claude Code set `ALTERO_PLATFORM=codex`. If `verify` fails, stop and report: a stylist without its pinned engine falls back to paraphrased taste, which is the failure this workflow exists to prevent.

Then create `RUN_DIR` (`<project>/.altero/runs/<YYYYMMDD-HHMM>/`) and probe the machine:
```bash
node scripts/env-probe.mjs <RUN_DIR> --image-generation <yes|no>   # yes only if you have an image-generation tool
```
It writes `env.md` (what works here: npm, Playwright, fonts, WOFF2, CDNs, each engine's services, image generation) and `env.json` with a `degraded` list. **If `degraded` is not empty, tell the user before the questions, in one short message, what each item costs:** `impeccable-roll` → Manifesto runs Impeccable's degraded roll (no challengers, no QUALITY BAR boards); `no-image-generation` → Manifesto builds code-led and Cinema has no generated stills; `no-stock-photos` → photo frames become client slots; `no-browser-checks` → stop, nothing can be verified. The user may prefer to run on a machine where these work.

## 1. Snapshot: a light copy of the front end
Skip this step for a brief with no existing site. Otherwise take the copy **before anything else**, because every later step works on it and the user's repository, backend and database are never needed:
```bash
node scripts/snapshot.mjs <url-of-the-live-or-local-page> <RUN_DIR>/base [--page /another-path]
```
It saves the rendered page and the stylesheets, scripts, fonts and images it loads, at phone and desktop width, into `RUN_DIR/base/`, with the page's measured baseline (`baseline.json`) and a screenshot of each width. By default it takes one page, the one the user named. It is front end only: fetch and XHR responses, cookies, forms' targets, server code, databases and secrets are never captured, so booking forms and live data will not work in it and nothing is asked of the user's backend. Add `--page` only for another page the slice needs.

If the user has no URL but has a local project, ask for the dev server's address and snapshot that. If the host cannot reach any URL, work from the user's built front-end folder and copy only its HTML, CSS, fonts and images. Say so in `brief.md`.

The snapshot is also the "before" of every comparison. It is served as the showcase's first panel, **Current site**.

## 2. Intake
- **The snapshot:** read `snapshot.json`, `baseline.json` and the saved page: content in each language present, the logo, the colours and fonts in use, the structure of the sections, imagery, and what the brand has committed to. Treat the current look as evidence, not authority.
- **Brief:** read what the user wrote; infer only what it strongly implies and mark every inference.

Write `brief.md`: product and offer · audience and situation (stated or inferred, marked) · current visual state (with the baseline's numbers) · constraints · real material on hand · the slice and why.

## 3. Five questions
Read `<refs>/interview.md`. Ask exactly five questions, together, all about how the page should look and feel, all closed: the user picks one of two or three options, or says "you choose". Never ask open questions, and never ask about the business, the call to action, the proof or the images: the snapshot already shows them, so Intake marks them `(inferred)`.

Ask in the user's language, with your structured question tool and its options. Write `answers.md` (the five choices and the derived fields listed in the reference).

## 4. Facts
Write `facts.json` (`<refs>/facts-schema.md`). It is the lock: engines write their own copy, but every claim, price, number and promise must trace to it. With a snapshot, the page's existing content is the first source of facts, and nothing on it may change in meaning. Do not ask the user to confirm the page's own content: it is the user's, already live. Mention only what you inferred that the page does not state.

## 5. Directions
Write `directions.md` as `<refs>/interview.md` describes, naming the motion lead: three short entries, one per stylist, saying what each engine will do for this visitor and what it will not do. Show them in one message and go straight on. It is a preview of the work, not a question.

## 6. Engine inputs
Read `<refs>/engine-inputs.md` and write each engine's native input file into its stylist folder. Copy `../assets/compare.html` into the run folder and write `run.json` (schema in `<refs>/facts-schema.md`), listing `base` first when a snapshot exists.

## 7. Fork
Start one stylist per primary engine in `<plugin>/engines/registry.json` (`role.primary`: atelier, manifesto, cinema), **in parallel**, each in its own subagent:
- Claude Code: the plugin agent `altero:stylist`, once per stylist id.
- Other hosts: one generic subagent per stylist id, told to read `<plugin>/agents/stylist.md` first and follow it.

With a snapshot, copy `RUN_DIR/base/` into each stylist's folder as its starting page (`RUN_DIR/<id>/page/`) before it starts. Each stylist rebuilds that page in its own direction inside its copy, keeping the page's real content and the meaning of its structure, and never touches `base/` or another stylist's folder.

Give each one only: its stylist id, the plugin root, `RUN_DIR`, its folder, and the paths to `brief.md`, `answers.md`, `directions.md`, `facts.json`, `env.md` and its engine input file. Nothing else: no summaries, no suggestions, no other stylist's output.

Before Atelier starts, copy `<project>/.altero/taste-history/*` (if it exists) into `atelier/.taste-skill/`; after it returns, copy `atelier/.taste-skill/{history,layout-history}.json` back. Taste's dealers use this history to keep pages different across runs.

**Without subagents or a browser:** report that Explore cannot be verified on this host. Offer a single build direction or prepare the briefs for a capable host.

## 7b. Fresh-eyes reviews
The engines want reviewers with a fresh context, and so does the phone layer. A stylist running as a subagent usually cannot spawn one, so it returns with a status, and you run the review:
- **Manifesto, `"status": "awaiting-review"`:** start a new subagent whose instructions are the full text of Impeccable's shipped reviewer (`engines.mjs path impeccable` → `.claude/agents/impeccable-finish-reviewer.md`), with tool limits as that file declares, and the packet at `manifesto/.altero/review-packet.md`. Send its disposition back to the Manifesto stylist (continue the same agent), which acts on it under Impeccable's rules. Repeat as Impeccable's step 7 directs.
- **Manifesto, `"status": "awaiting-motion-review"`:** the same, with Impeccable's shipped motion reviewer (`.claude/agents/impeccable-motion-reviewer.md`) and the packet at `manifesto/.altero/motion-packet.md`.
- **Cinema, `"status": "awaiting-test-screening"`:** start a new subagent that sees only the contact sheets listed in `cinema/NOTES.md` and answers cinematic-ui's four test-screening questions (what the product is, what to do, what the lead is, which frame is the climax). Send the answers back to the Cinema stylist to compare with its logline.
- **Any stylist, `"status": "awaiting-phone-screening"`:** start a new subagent that sees only the screenshots listed under `NOTES.md → Phone cut → screening` and the phone cut plan, and answers the four questions in `<refs>/phone.md` §3. Send the answers back to that stylist.

Never add your own opinion to any of these messages.

## 8. Gate
Read `<refs>/gate-checklist.md`. For each variant: confirm its engine gate result in `NOTES.md` (for Atelier on an RTL page, the split result its adapter defines, backed by `scripts/rtl-edges.mjs`), then run the technical checks on both language pages at 390 and 1440 in a real browser with web fonts loaded. Fix only what the checklist allows; send anything else back to the stylist. On a snapshot run, also run the copy lock (`scripts/copy-diff.mjs`) for each variant. Check the premium floor's evidence (section G). Then the jury screening (section F) holds every variant to a premium bar. Write `gate-report.md`. A variant whose Arabic was only seen in fallback fonts is **unverified**, not passed.

## 9. Showcase
Start the showcase **as soon as the snapshot exists**, not when the stylists finish:
```bash
node <this skill's folder>/scripts/serve.mjs <RUN_DIR>
```
Open `<URL>/compare.html` in the user's browser or preview pane. It shows one direction at a time at full size, in tabs: **Current site** first, then each stylist. A tab still building says so and fills in by itself when its manifest lands, so the user watches the three directions arrive instead of waiting for all of them. Desktop renders at 1440 and scales to the window; Phone renders at 390 in a device frame. The arrow keys switch tabs, so comparing a direction with the current site is one key. If the user cannot reach a local server (a remote session) and the host can publish a multi-file page, publish `compare.html` as the entry with only the files the pages actually load (record them by loading each page at 390 and 1440 and scrolling it), never the engines' whole kits. Introduce each variant in two lines from its `NOTES.md`, naming its engine. Do not rank or hint at a favourite.

## Apply one
The user takes **one** direction, not three. Record `"picked"` in `run.json`. Then, only for the chosen stylist, in build or enhance mode on the user's real project:
1. Read the chosen page in `RUN_DIR/<id>/page/` against `RUN_DIR/base/`: what changed in markup, styles, fonts and images.
2. Find where each part lives in the real project (`stack` and `real_source` in `answers.md`) and carry the change there, using the same engine's tokens, components, motion layer, fonts and RTL setup. Content, routes, forms, analytics and business logic stay as they are.
3. Run the probe at 390 and 1440 and report its numbers against `base/baseline.json`, before and after.

Write `apply-plan.md` first and show it. Nothing is written to the user's project until they agree.
