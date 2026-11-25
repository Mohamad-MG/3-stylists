# Cinema — adapter for cinematic-ui

**Your design authority is cinematic-ui, unmodified.** This file only says how to run it inside Altero. It contains no design rules, and you must not add any of your own. Precedence, deliverables and the checks every stylist shares: `<plugin>/internal/contract.md`. `<plugin>` is the plugin root and `<refs>` is `<plugin>/skills/altero/references`.

## Engine
```bash
node <plugin>/scripts/engines.mjs verify cinematic-ui
node <plugin>/scripts/engines.mjs entry cinematic-ui     # → the SKILL.md you follow
```
The project folder is `RUN_DIR/cinema/`. cinematic-ui's scripts need `playwright-core` there: run `npm i -D playwright-core` in that folder, or, when `RUN_DIR/env.md` says npm is blocked, link the copy it names (and have ffmpeg if you render a film).

## Inputs already prepared
- `producer-notes.md`: the product truth, the one action, what may be claimed, the audience, and the **asset call already answered** (what the client supplies, whether licensed library assets and AI-generated assets are allowed).
- `RUN_DIR/facts.json`: the facts lock.

## Run (cinematic-ui's production, stages 1–10)
Read its SKILL.md in full and follow the production in order, keeping all writing in `treatment.md`.
1. **Development:** the logline and audience arc, from `producer-notes.md`.
2. **Cast the director:** the casting session happens in the treatment without waiting for the user, as the skill already says. Follow `references/film-research.md`: sourced, tagged, frames looked at. If you cannot search or view frames, write the grade as *unmeasured* and the research as *from memory*, exactly as the skill requires you to disclose. Read the filmography (`~/.cinematic-ui/filmography.md`) and differ from the last three productions as it asks.
3. **Medium, grade, world and poster:** the ART and GRADE blocks, cast and committed.
4. **Lead and asset call:** the asset call is answered in `producer-notes.md`, so do not ask again. Respect it exactly: no AI generation unless it says yes.
5. **Screenplay**, 6. **Storyboard** with the award pass, 7. **Animatic**, 8. **Principal photography**: copy `kit/` into the project and build on it, as the skill says.
9. **Screening:** `node scripts/screening.mjs <dir>` for the theatrical cut **and** `--reduced` for the accessible cut; then the five full-size frames and the jury pass.
   - **Test screening:** if you can delegate, hold it as written. If you cannot, set `"status": "awaiting-test-screening"` in `stylist.json`, list the contact-sheet paths and the logline in `NOTES.md`, and return. The orchestrator runs it with a fresh agent and sends you the answers to compare with the logline.
10. **Delivery** report inside `NOTES.md`, and the filmography line (the skill's own memory, outside the project; mention it).

## Support engines (only where cinematic-ui leaves the detail open)
| Engine | Use it for |
|---|---|
| `threejs-skills` | correct Three.js code when the cast medium is 3D or uses the stage |
| `gsap-skills` | the kit's master timeline and ScrollTrigger, written correctly |
| `mengto-web-design` | the implementation of a technique a shot already calls for (`build-awwwards-quality-sites`, `cinematic-gsap-lenis-motion-system`, `scroll-world-storytelling`, `horizontal-scroll-scenes`, `scroll-scrubbed-visual-sequence`…). Never choose a shot because a technique exists. |
| `awwwards-rubric` | the jury pass in screening: `references/01-scoring.md`, `14-anti-patterns.md`, `15-audit.md` |
| `emil-skills` | UI chrome interactions (buttons, menus, controls) inside the world |

Locate each with `engines.mjs path <id>`. None of them changes the cast director, medium, grade, world or shot list.

## Phone cut (`<refs>/phone.md`)
cinematic-ui gives the phone its own cut: `references/award-reel.md` §14 ("The phone gets its own cut": recompose for portrait rather than squeezing), the RHYTHM line that names the phone's cut, the mobile signature moment, and "mobile as the desktop page squeezed into a column" on its lazy-cut list. Screen the phone cut with `screening.mjs` as it does for the theatrical cut. In app mode, follow `references/app-mode.md` → The phone. Write the phone cut plan from these.

## Robustness
Run the two behaviour checks in `<plugin>/internal/contract.md` → Robustness before handback, and record them in `NOTES.md`.

## Bilingual
When the language scope has one language, build that page and skip the rest of this section. With two, apply `<refs>/bilingual.md`. Produce the film in the **lead language**; the second language is a second cut of the same film, recomposed natively, never mirrored. Check `kit/type-fx.js` effects on the Arabic cut: Arabic is split by words or lines, never by characters. Screen both cuts. Arabic faces come from `<refs>/arabic-type/`, matched to the cast world's type.

## Deliver
- `NOTES.md` → **Phone cut**: the plan, the screening answers and what changed (`<refs>/phone.md`).
- The two pages (both cuts), the `kit/` they use, and `treatment.md`.
- `stylist.json` with `"engine": "cinematic-ui"` and the pinned commit.
- `NOTES.md`:
  - **Engine:** cinematic-ui @ commit
  - **Logline**
  - **Director and film cast,** and the two set aside
  - **Medium, grade** (measured or unmeasured), **lead and its states**
  - **Contact sheets** (theatrical and reduced), screening corrections, jury pass
  - **Arabic faces**
  - **Stand-ins** and generated assets
  - **Unverified items**

Return a summary of at most 10 lines.
