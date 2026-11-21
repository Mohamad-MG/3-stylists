# Explore workflow

Three proven design engines build the same product as three independent Arabic and English variants, and the user picks one. You are the producer: you do not design, and you add no taste to anyone's prompt. Your job is to feed each engine its native inputs, keep the three apart, and show the results.

Explore needs git, Node.js 22+, a browser the engines can drive, and subagents. Paths: `<plugin>` is the installed plugin root, two folders above this skill's folder. `<refs>` is the folder this file is in.

Read `<plugin>/internal/contract.md` once per session: who owns what, the precedence table and the collisions this workflow relies on.

```
0 Engines → 1 Intake → 2 Interview → 3 Facts → 4 Engine inputs → 5 Fork → 6 Gate → 7 Showcase → pick
```

## 0. Engines
Run from `<plugin>`:
```bash
node scripts/engines.mjs doctor
node scripts/engines.mjs fetch      # first run, or after a registry change
node scripts/engines.mjs verify     # must pass before step 5
```
On a host other than Claude Code set `STYLISTS_PLATFORM=codex`. If `verify` fails, stop and report: a stylist without its pinned engine falls back to paraphrased taste, which is the failure this workflow exists to prevent.

Then create `RUN_DIR` (`<project>/.3stylists/runs/<YYYYMMDD-HHMM>/`) and probe the machine:
```bash
node scripts/env-probe.mjs <RUN_DIR> --image-generation <yes|no>   # yes only if you have an image-generation tool
```
It writes `env.md` (what works here: npm, Playwright, fonts, WOFF2, CDNs, each engine's services, image generation) and `env.json` with a `degraded` list. **If `degraded` is not empty, tell the user before the interview, in one short message, what each item costs:** `impeccable-roll` → Manifesto runs Impeccable's degraded roll (no challengers, no QUALITY BAR boards); `no-image-generation` → Manifesto builds code-led and Cinema has no generated stills; `no-stock-photos` → photo frames become client slots; `no-browser-checks` → stop, nothing can be verified. The user may prefer to run on a machine where these work.

## 1. Intake
- **Existing front end:** inspect stack, routes, content (both languages if present), tokens, logo, imagery, and what the brand has already committed to. Treat the current look as evidence, not authority.
- **Brief:** read it; infer only what the brief strongly implies and mark every inference.

Write `brief.md`: product and offer · audience and situation (stated or inferred, marked) · current visual state · constraints · real material on hand · proposed slice and why.

## 2. Interview
Read `<refs>/interview.md`. Ask exactly six questions; replace any already answered by Intake with a reserve. The questions come from what the engines themselves ask. **Never ask aesthetic questions** (feel, colours, fonts, style, references to imitate): each engine owns its aesthetic process, and a look named in a question becomes the answer.

Ask in the user's language, with your structured question tool if you have one. Write `answers.md` (raw answers and the derived fields listed in the reference).

## 3. Facts
Write `facts.json` (`<refs>/facts-schema.md`). It is the lock: engines write their own copy, but every claim, price, number and promise must trace to it. Show the user a short summary of the facts and confirm them in one message (not one of the six questions).

## 4. Engine inputs
Read `<refs>/engine-inputs.md` and write each engine's native input file into its stylist folder. Copy `../assets/compare.html` into the run folder and write `run.json` (schema in `<refs>/facts-schema.md`).

## 5. Fork
Start one stylist per primary engine in `<plugin>/engines/registry.json` (`role.primary`: atelier, manifesto, cinema), **in parallel**, each in its own subagent:
- Claude Code: the plugin agent `three-stylists:stylist`, once per stylist id.
- Other hosts: one generic subagent per stylist id, told to read `<plugin>/agents/stylist.md` first and follow it.

Give each one only: its stylist id, the plugin root, `RUN_DIR`, its folder, and the paths to `brief.md`, `answers.md`, `facts.json`, `env.md` and its engine input file. Nothing else: no summaries, no suggestions, no other stylist's output.

Before Atelier starts, copy `<project>/.3stylists/taste-history/*` (if it exists) into `atelier/.taste-skill/`; after it returns, copy `atelier/.taste-skill/{history,layout-history}.json` back. Taste's dealers use this history to keep pages different across runs.

**Without subagents or a browser:** report that Explore cannot be verified on this host. Offer a single build direction or prepare the briefs for a capable host.

## 5b. Fresh-eyes reviews
The engines want reviewers with a fresh context, and so does the phone layer. A stylist running as a subagent usually cannot spawn one, so it returns with a status, and you run the review:
- **Manifesto, `"status": "awaiting-review"`:** start a new subagent whose instructions are the full text of Impeccable's shipped reviewer (`engines.mjs path impeccable` → `.claude/agents/impeccable-finish-reviewer.md`), with tool limits as that file declares, and the packet at `manifesto/.3stylists/review-packet.md`. Send its disposition back to the Manifesto stylist (continue the same agent), which acts on it under Impeccable's rules. Repeat as Impeccable's step 7 directs.
- **Manifesto, `"status": "awaiting-motion-review"`:** the same, with Impeccable's shipped motion reviewer (`.claude/agents/impeccable-motion-reviewer.md`) and the packet at `manifesto/.3stylists/motion-packet.md`.
- **Cinema, `"status": "awaiting-test-screening"`:** start a new subagent that sees only the contact sheets listed in `cinema/NOTES.md` and answers cinematic-ui's four test-screening questions (what the product is, what to do, what the lead is, which frame is the climax). Send the answers back to the Cinema stylist to compare with its logline.
- **Any stylist, `"status": "awaiting-phone-screening"`:** start a new subagent that sees only the screenshots listed under `NOTES.md → Phone cut → screening` and the phone cut plan, and answers the four questions in `<refs>/phone.md` §3. Send the answers back to that stylist.

Never add your own opinion to any of these messages.

## 6. Gate
Read `<refs>/gate-checklist.md`. For each variant: confirm its engine gate result in `NOTES.md` (for Atelier on an RTL page, the split result its adapter defines, backed by `scripts/rtl-edges.mjs`), then run the technical checks on both language pages at 390 and 1440 in a real browser with web fonts loaded. Fix only what the checklist allows; send anything else back to the stylist. Write `gate-report.md`. A variant whose Arabic was only seen in fallback fonts is **unverified**, not passed.

## 7. Showcase
```bash
node <this skill's folder>/scripts/serve.mjs <RUN_DIR>
```
Open `<URL>/compare.html` in the user's browser or preview pane. If the user cannot reach a local server (a remote session) and the host can publish a multi-file page, publish `compare.html` as the entry with only the files the pages actually load (record them by loading each page at 390 and 1440 and scrolling it), never the engines' whole kits. Introduce each variant in two lines from its `NOTES.md`, naming its engine. Do not rank or hint at a favourite.

## After the pick
Record `"picked"` in `run.json`. Write `apply-plan.md`: how to carry the chosen variant into the user's real stack, using the same engine for the full build (its tokens, components, motion layer, fonts and RTL setup). Applying it is a separate task the user starts, in build or enhance mode.
