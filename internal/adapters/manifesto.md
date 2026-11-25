# Manifesto — adapter for Impeccable

**Your design authority is Impeccable, unmodified.** This file only says how to run it inside Altero. It contains no design rules, and you must not add any of your own. Precedence, deliverables and the checks every stylist shares: `<plugin>/internal/contract.md`. `<plugin>` is the plugin root and `<refs>` is `<plugin>/skills/altero/references`.

## Engine
```bash
node <plugin>/scripts/engines.mjs verify impeccable
node <plugin>/scripts/engines.mjs entry impeccable     # → the SKILL.md you follow
```
`<skill-base-dir>` in Impeccable's instructions is the folder that contains that SKILL.md. Your project root (cwd for every Impeccable command) is `RUN_DIR/manifesto/`.

## Inputs already prepared
- `PRODUCT.md` in Impeccable's own schema. Init's completion gate is satisfied: do not re-run init's interview.
- `RUN_DIR/answers.md`: the user's answers to the questions new-work step 2 asks (who must act, what they should believe, which proof, what success is, what must stay untouched, what would make a polished result feel wrong). Use them as the answers to step 2; you cannot reach the user.
- `RUN_DIR/facts.json`: the facts lock. Impeccable already forbids invented claims; this file is the list of true ones.

## Run (Impeccable's own sequence)
1. **Setup.** Run `<skill-base-dir>/scripts/impeccable context` once, from the project root. Read Impeccable's SKILL.md in full and follow it. The surface is the slice in `brief.md`; its mode is **Persuade** unless the brief says otherwise.
2. **new-work, "Create or replace the visual world".** Follow every step, including the seven-candidate derivation. **`concept-seed --scope direction --mode persuade` is mandatory**: Impeccable calls building without it a contract violation.
3. **If the roll ran degraded** (`RUN_DIR/env.md` says the roll service is blocked, or concept-seed prints that it is), follow Impeccable's degraded path exactly as it prints, then add `"degraded": ["impeccable-roll"]` to `stylist.json` and say in the first line of `NOTES.md` what was missing (challengers, QUALITY BAR boards). The showcase shows this to the user.
3b. **The decision round, unattended.** You cannot show the decision page to the user, so follow Impeccable's own unattended path: do not start `serve-question`; build the **assigned** direction; state the assumption. Record the whole hand in `NOTES.md` (the assigned direction with its raised lines, the pick card if any, every challenger with its verdict) so the user can later pick another from the showcase.
4. **Build path.** Take the path concept-seed prints. `RUN_DIR/env.md` says whether image generation exists here; without it the build is code-led. If it is comp-led but image generation would spend money the user did not approve (`facts.json → policy.ai_assets: false`), build code-led and say so.
5. **Commit, record, build.** Steps 4–6 exactly as written: colour strategy, faces, the direction contract in the surface brief, full commitment. Read `craft-floor.md` immediately before any UI edit, as Impeccable requires.
6. **Inspect and finish (step 7).** Batched screenshots at desktop and mobile, then `impeccable detect --json` on the changed targets.
   - **Finish reviewer:** if you can spawn agents, spawn `impeccable-finish-reviewer` exactly as step 7 says. If you cannot (a stylist usually runs as a subagent), write `RUN_DIR/manifesto/.altero/review-packet.md` with everything step 7 lists for the reviewer, set `"status": "awaiting-review"` in `stylist.json`, and return. The orchestrator runs Impeccable's real reviewer with fresh eyes and sends you its disposition; act on it under step 7's four disposition words.
   - **Motion reviewer:** when the build implements motion, Impeccable's `animate` asks for `impeccable motion-capture` (normal and `--reduced-motion`) and a fresh `impeccable-motion-reviewer`. Capture as it says. If you cannot spawn the reviewer, write `RUN_DIR/manifesto/.altero/motion-packet.md` with everything its Input Contract lists (request, motion thesis, both capture directories, DESIGN.md motion rules if any, the craft-floor path), set `"status": "awaiting-motion-review"`, and return. Act on its disposition the same way.
   - **Documenter:** a new world needs DESIGN.md at finish. Spawn `impeccable-documenter`, or, if you cannot, follow `reference/degraded/documenter.md`.

## Support engines (only where Impeccable leaves the detail open)
- `emil-skills` → `animate`, `review-animations`, `apple-design`: implementation detail of a motion Impeccable already decided.
- `gsap-skills` → correct GSAP and ScrollTrigger code when the build uses GSAP.

They never restyle, add motion Impeccable did not ask for, or override a craft-floor rule. Locate them with `engines.mjs path <id>`.

## Phone cut (`<refs>/phone.md`)
Impeccable's own phone method is `reference/adapt.md` → Mobile Adaptation ("the trap is treating adaptation as scaling"): layout, interaction, content and navigation strategy for the phone. Write the phone cut plan from it, build it, and let the finish reviewer judge the mobile captures as it already does. The phone screening in `<refs>/phone.md` runs in addition, because it compares the phone against the desktop section by section.

## Robustness
Run the two behaviour checks in `<plugin>/internal/contract.md` → Robustness before handback, and record them in `NOTES.md`.

## Bilingual
When the language scope has one language, build that page and skip the rest of this section. With two, apply `<refs>/bilingual.md`. Build the **lead-language page** through the full Impeccable sequence above; the second page reuses the same world, recomposed natively. Impeccable's typography rules govern the Latin faces. The Arabic faces come from `<refs>/arabic-type/`, matched to the world Impeccable committed. Run the craft-floor Verify list and `detect` on both pages.

## Deliver
- `NOTES.md` → **Phone cut**: the plan, the screening answers and what changed (`<refs>/phone.md`).
- The two pages, wherever Impeccable put them.
- `stylist.json` (schema in `<refs>/facts-schema.md`), `"engine": "impeccable"` and the pinned commit.
- `NOTES.md`:
  - **Engine:** impeccable @ commit
  - **Seed:** the seed reference concept-seed printed (`seed:` and 16 hex; never the raw key), and the hand (assigned, pick, challengers and their verdicts)
  - **Direction contract:** its location
  - **Build path,** and why
  - **Arabic faces:** which, and why they match
  - **Gates:** craft-floor pass, detector findings, reviewer disposition
  - **Assumptions,** and anything unverified

Return a summary of at most 10 lines.
