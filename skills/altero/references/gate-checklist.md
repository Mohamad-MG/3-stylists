# Gate checklist

The gate checks **correctness**, never taste. Taste belongs to each engine and was already checked by that engine's own gate.

Run on every variant, on **both** language pages, at **390 × 844** and **1440 × 900**, in a real browser with web fonts loaded. Record pass, fail or unverified per check in `gate-report.md`.

The measured checks come from one script, `../assets/probe.js`: evaluate it in the page and read its `gate` object. An empty list passes.

## A. Engine gate (from NOTES.md, never re-done by you)
| Engine | Required evidence |
|---|---|
| Taste Skill | the last `gate.mjs` line for each page (`GATE: PASS` or `GATE: OPEN` with the open FAILs listed), plus every waiver and its reason. On an RTL page: the split record (`rtl_blind`, `rtl_edges`, `open_other`). The page passes only with `rtl_edges: PASS` and `open_other: 0`; re-run `scripts/rtl-edges.mjs` (plugin root) yourself to confirm |
| Impeccable | the seed reference and the assignment it built, the craft-floor Verify pass, detector findings, the finish reviewer's last disposition (`ship`), the motion reviewer's last disposition when motion was built, and `degraded` if the roll ran degraded |
| cinematic-ui | `screening.mjs` contact sheets for the theatrical cut **and** `--reduced`, and the named corrections from screening |
| All | a **Robustness** section in `NOTES.md`: Emil's `break-ui` (both languages) and `mobile-native` results, and what needs a real device |

Missing evidence fails this section: send the variant back.

## B. Contract
1. `stylist.json` is valid and both `pages` open.
2. Facts lock: every price, number, delivery time, name and claim on both pages traces to `facts.json`; nothing in `forbidden` appears.
3. Assumed facts are visibly marked (`facts-schema.md` → Assumed facts on the page). On both pages `gate.assumed.unmarked` must be empty, and `gate.assumed.count` must not be 0 when `facts.json` has assumed facts. If the stylist chose a different marker word, it is named in `NOTES.md`: pass it as `{ assumedMarkers: ['…'] }`.
4. Brand commitments from `facts.json` are honoured.
4c. **Modern punctuation.** On both pages `gate.robotic` must be empty, as well as `gate.fullStops`.
4b. **Copy lock (snapshot runs).** `node <plugin>/scripts/copy-diff.mjs <base-url> <variant-url>` lists no new text. A reworded or added line goes back to the stylist; the gate never rewrites copy.
5. **No full stop in interface text** (`bilingual.md` → Interface punctuation). On both pages `gate.fullStops` must be empty. It flags `.` or `۔` followed by a space or the end of a line, so decimals (450.5) and domains (example.com) pass, and it skips text inside `[data-longform]`.

## C. Bilingual mechanics
6. `<html lang dir>` is correct on each page (`ar` → `rtl`, `en` → `ltr`): `page.lang` and `page.dir`.
7. No physical direction properties where direction matters, unless overridden under `[dir="rtl"]`. Grep for `margin-left|margin-right|padding-left|padding-right|left:|right:|text-align: *(left|right)`.
8. `letter-spacing` on Arabic text is 0: `type.arabicLetterSpacing` is empty.
9. **Arabic faces actually load.** For each Arabic text style the declared family is loaded and the computed family is not a system fallback: `type.notLoaded` is empty and `type.fontsLoaded` names the Arabic face. A page whose Arabic rendered in a fallback is **unverified**, never passed.
10. No synthetic bold or italic on Arabic (`font-synthesis` or a family that lacks the weight).
11. Arabic is never split into characters for animation (words or lines only). Check the engine's type effects (cinematic-ui `type-fx`, any split utility) on the Arabic page.
12. Direction-carrying icons and horizontal motion are mirrored in RTL; logos and media icons are not.
13. Latin runs inside Arabic (names, URLs, numbers with units) are isolated and read correctly.
14. Numerals follow `facts.json → language.numerals`.

## D. Motion and accessibility
15. Reduced motion: everything rests, nothing stays hidden (the engines require this; confirm it on both pages).
16. The `fixing-accessibility` checks from ui-skills (`node scripts/engines.mjs path ui-skills` from the plugin root → `skills/fixing-accessibility/SKILL.md`): names, labels, focus, contrast.
17. No horizontal overflow at 390 and 1440 in either language: `page.overflowX` is 0.

## E. Phone (`phone.md`)
18. `NOTES.md` has a **Phone cut** plan (one row per section, the four lines) and the phone screening's answers with what changed. A plan whose every row says "stacked", or no screening, sends the variant back.
19. Mechanical checks at **360 × 780, 390 × 844 and 430 × 932**, both languages, at rest at the top of the page. Pass the primary action's label from `facts.json → product.primary_action.<lang>` as `{ primaryAction: '…' }`; `gate.phone` must be empty. It covers horizontal overflow, the primary action on the first screen, 44 px tap targets, 16 px inputs, and fixed bars over content. A tap finding inside an engine-documented exception (the engine names it in writing) is recorded, not failed.
20. Look at the phone screenshots yourself only to confirm the evidence exists and matches the plan; never judge the cut's taste.

## G. Premium floor (`<plugin>/internal/contract.md` → Premium floor)
Evidence, not taste. For each of the seven items, `NOTES.md` names what was built and points to a capture (a frame sequence for motion, a screenshot for a state). A missing item, or one without a capture, goes back to the stylist.
- The motion lead's page shows motion as the hero: at least one scroll-driven scene or section transition, captured.
- `gate.robotic` from the probe is empty on both widths (no decorative quotation marks, no ellipses).
- Library images are listed with source URL and licence, and none is presented as the business's own work, results, team or premises.

## F. Jury screening (a premium bar, judged with fresh eyes)
After the checks above pass, start one fresh subagent per variant (on a snapshot run, tell it that the business's own photographs are real and approved, so it never marks them down as generated or stock) that sees only its screenshots at 1440 and 390 (top, middle and end of the page) and the award-jury rubric (`node <plugin>/scripts/engines.mjs path awwwards-rubric` → `references/01-scoring.md`, `14-anti-patterns.md`, `15-audit.md`). It scores Design, Usability, Creativity and Content from 0 to 10 with the rubric's weights and names the anti-patterns it sees, each with the screenshot it is in.
- A weighted score of **7.0 or more** passes. Record it in `gate-report.md`.
- Under 7.0, send the scores and the named anti-patterns, word for word, to that variant's stylist (continue the same agent) once. It fixes them **with its own engine's rules**, and the screening runs again. Report the second score as it is.
- The jury never names a fix and never compares variants. It scores each one alone.

## Allowed fixes (you may make them)
Logical-property conversions · RTL overrides · Arabic letter-spacing to 0 · Arabic line-height increases that keep the composition · bidi isolation · icon mirroring · loading an Arabic face that the variant declared but failed to load · reduced-motion fixes · overflow bugs · marking an assumed fact as assumed · deleting a full stop at the very end of an interface string (anything more, such as rejoining two sentences, goes back to the stylist).

## Forbidden fixes (send back to the stylist)
Anything that changes the engine's decisions: palette, Latin or Arabic type choice, layout, composition, motion character, copy voice, a dealt or rolled choice, a signature moment. Also: editing an engine's own files, or waiving an engine check outside that engine's waiver mechanism.
