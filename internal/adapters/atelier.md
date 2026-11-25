# Atelier — adapter for Taste Skill

**Your design authority is Taste Skill, unmodified.** This file only says how to run it inside Altero. It contains no design rules, and you must not add any of your own. Precedence, deliverables and the checks every stylist shares: `<plugin>/internal/contract.md`. `<plugin>` is the plugin root and `<refs>` is `<plugin>/skills/altero/references`.

## Engine
```bash
node <plugin>/scripts/engines.mjs verify taste-skill
node <plugin>/scripts/engines.mjs entry taste-skill     # → the SKILL.md you follow; <skill> is its folder
```
It needs Node 22+ and Chrome (`engines.mjs doctor`). The project folder for every Taste command is `RUN_DIR/atelier/`.

## Inputs already prepared
- `taste-brief.md`: kind, what is sold, who buys it, the main action, real material, the client's own colours (if pinned), photograph policy, and facts. These are exactly what Taste's run step 1 asks for.
- `RUN_DIR/facts.json`: the facts lock. Taste's own rule already allows nothing invented except a coined name and, on a place, plausible hours and prices marked `data-assumed`; `facts.json` lists the true facts.
- **Assumed facts must be visible as assumed.** Taste's `data-assumed` is an attribute the visitor never sees. Keep it, and add the visible marker the contract requires (`<refs>/facts-schema.md` → Assumed facts on the page) in `page/` CSS or markup, never in the kit.
- **Dealer history:** the orchestrator copies the project's saved Taste history into `atelier/.taste-skill/` before you start. Keep it there; Taste's dealers use it so pages differ from run to run.

## Run (Taste Skill's own sequence, sections 0–7)
Read Taste's SKILL.md in full, then `copy.md`, `copy-voice.md`, `system.md`, `layout-v4.md` and `sections.md`, as it requires before the first page. Then:
0. **Stack:** an empty folder → copy `<skill>/assets` into `atelier/assets` and start from `assets/starter.html`.
1. **Read the brief** from `taste-brief.md`, then arm the gate **before any page exists**: `node <skill>/scripts/gate.mjs --start index.html --kind <kind> --category "<what is sold>" --primary "<main action>"`.
2. **Write all the copy first** with Taste's copy layer, from `facts.json`. **On a snapshot run, do not write copy:** the copy is the text already on `page/`, word for word. Use Taste's copy layer only to decide what to cut, how to order it and where to split a long line, and run `copy-lint.mjs` on that text for its punctuation and length checks. Before handing back, `node <plugin>/scripts/copy-diff.mjs <base-url> <your-page-url>` must list nothing.
3. **Plan the page as screens.**
4. **Deal, never choose by taste:** run its dealers with `--history .taste-skill/…` exactly as written; take the first palette and pairing it prints (its own exceptions apply). If `taste-brief.md` gives the client's own colours, use `start.mjs brand` instead, as Taste says.
5. **Build** in `starter.html` as written.
6. **Check and look** with Taste's scripts only, then `gate.mjs index.html` until `GATE: PASS` or `GATE: OPEN` (three rounds at most).
7. **Report** in Taste's format, inside `NOTES.md`.

**Photographs:** follow Taste's photo path (`photos.md`, `photos.mjs`). If `facts.json → policy.stand_in_photos` is `false` and no real photographs exist, every photo frame becomes a client slot, reported as Taste reports slots.

## Support engines
None for design. Taste owns its motion layer and forbids overriding it, so Emil's motion skills and GSAP are deliberately not configured for Atelier. Emil's `break-ui` and `mobile-native` test behaviour, not motion or looks, so they run here too (contract → Robustness).

## Phone cut (`<refs>/phone.md`)
Taste plans the phone itself; use its method, not a reflow. Its phone rules are in `layout-v4.md` (each section planned as one or two phone screens, the phone bar, `.g2m` phone-only grouping, cutting the phone copy, merging a short block instead of centring it alone, the hero's phone order) and in its checker's phone widths (820, 768, 390, 320: `section-height`, `collide`, `tap-size`, `fold-card`). Write the phone cut plan from those rules, build it, and run its checks at the phone widths as it says.

## Robustness
Run the two behaviour checks in `<plugin>/internal/contract.md` → Robustness before handback, and record them in `NOTES.md`.

## Bilingual
When the language scope has one language, build that page and skip the rest of this section. With two, apply `<refs>/bilingual.md`. Taste builds the **lead-language page** as `index.html` (set `<html lang>` to the lead language, as step 5 says). The second page lives in `<lang>/index.html` and reuses `../assets`; it is recomposed under `<refs>/bilingual.md`, inside the same dealt system.
- Run `gate.mjs` on the second page too. If its links climb out of the page folder, pass Taste's `--root` with the atelier folder, as Taste documents for built pages.
- `copy-lint.mjs` judges English copy. On the Arabic page, an English-only check that fails is waived in `.taste-skill/waivers.json` with the reason "Arabic page; English-only copy check" (Taste's own waiver mechanism). Never game a check or edit the kit's files.

### Taste's gate on a right-to-left page
Taste's checkers (`layout-check.js`, `consistency.mjs`) measure text from its left edge and have no right-to-left handling. On an RTL page they report every correctly start-aligned heading as off its line. Taste caps waivers at 5, so these findings can neither be waived one by one nor fixed without breaking the Arabic page. Handle them this way, and only this way:
1. **The direction-blind check ids** are `edge-left`, `edge-right`, `lines`, `container-edges`, `stagger`, `off-grid` and `one-sided`. Only these, and only on a page whose `dir` is `rtl`.
2. **Prove them with the RTL complement before every gate round:** `node <plugin>/scripts/rtl-edges.mjs <page-url> --widths 390,1440` (playwright-core comes from the project, `NODE_PATH`, or the global install). It measures the same family from the inline-start edge.
   - `RTL-EDGES: PASS` → those Taste findings are direction artefacts. Do not fix them, do not spend waivers on them.
   - `RTL-EDGES: FAIL` → the findings it names are real. Fix them like any other failure.
3. **Everything else Taste reports on the RTL page is real.** Fix it, or waive it under Taste's own rules (at most 5).
4. **Rounds:** start the RTL page's build with `gate.mjs --start ... --rounds 5`. The direction-blind findings recur in every round, so the default 3 rounds run out before the real ones are worked through.
5. **Report the split.** `NOTES.md` lists the direction-blind findings by id with the RTL-EDGES result next to them. `stylist.json → engine_gate.<lang>` records:
   ```json
   { "taste": "<the last GATE: line>", "rtl_blind": <count>, "rtl_edges": "PASS", "open_other": <count of other open FAILs> }
   ```
   The page counts as passing Taste's gate only when `rtl_edges` is `PASS` and `open_other` is 0.

The Arabic faces come from `<refs>/arabic-type/`, matched to the pairing Taste dealt.

## Deliver
- `NOTES.md` → **Phone cut**: the plan, the screening answers and what changed (`<refs>/phone.md`).
- `index.html` and `<lang>/index.html`, with `assets/` and `.taste-skill/`.
- `stylist.json` with `"engine": "taste-skill"`, the pinned commit, and `"engine_gate"` set to each page's last `GATE:` line.
- `NOTES.md`: Taste's step-7 report (the GATE line first, waivers, the deal and why, voice card, checker, layout and perf results, assumed facts, stand-ins and client slots), plus **Arabic faces** (which, and why they match the dealt pairing).

Return a summary of at most 10 lines. The orchestrator copies the dealer history back to the project afterwards.
