# Phone core

**The rule:** a phone version that only reflows is a failure. The phone gets its own composition: sections may be reordered, merged, cut, replaced or added for the phone, and their style may change (type scale, density, navigation model, how an interaction works). It is reviewed like the desktop page.

This layer decides **what must exist and how it is checked**. It never decides the look: every phone decision is made by the stylist's engine, through that engine's own phone method (each adapter names it). This file contains no design rules.

**Scope by mode**
- **Explore:** all of this is contract (`internal/contract.md` at the plugin root), and "the engine" is the stylist's engine.
- **Build and enhance:** "the engine" is you and the project's own design system. Write the short plan in section 1 before the phone layout, then run the checks in section 4.
- **Audit and polish:** use the four screening questions in section 3 as a lens and run the checks in section 4. Do not recompose a page that was only meant to be refined.

## 1. The phone cut plan (before the phone layout is built)
Write it in `NOTES.md` under **Phone cut**, after the desktop page of the lead language is settled and before any phone-specific code. One row per desktop section, plus any phone-only section:

| Section | On the phone | Why (from the engine's method and the visitor's situation) |
|---|---|---|
| e.g. hero | kept, recomposed: the visual moves under the headline, the copy is cut to one line | … |
| e.g. features | merged with "how it works" into one swipeable sequence | … |
| e.g. comparison table | replaced by one card per plan | … |
| e.g. footer links | cut to three | … |

Then four lines:
- **Navigation:** the phone's navigation model and why.
- **Primary action:** where it lives on every screen, within thumb reach (a docked bar, a repeated action, or the engine's own answer).
- **Type and density:** what changes from desktop, and why.
- **Interactions:** what changes for touch (hover → tap or press, carousels → scroll-snap, menus → sheets, drag), or "none".

Use the visitor's situation from `answers.md` (`use_scene`). Facts that matter for the decision (prices, the main promise, privacy, the primary action) stay reachable on the phone. They may move, shrink or fold; they may not disappear.

**A plan whose every row says "stacked" fails.** If the engine's method truly keeps a section as it is, say why in that row.

## 2. Build it
- Both languages get their phone cut. The Arabic phone page is recomposed for RTL like the desktop one (`bilingual.md`), not mirrored from the English phone page.
- Build the cut with the engine's own components and tokens. Phone-only markup is allowed when the plan calls for it; mark it `data-phone-only`, and mark desktop-only parts `data-desktop-only`, so the review can see what changed.
- Run Emil's `mobile-native` on the phone layout (in Explore; see the contract's Robustness section).

## 3. Phone screening (fresh eyes)
The person who built the phone cut cannot judge whether it reads as designed or squeezed. After the build, capture full-page screenshots of both languages at **390 × 844**, the desktop page at **1440 × 900**, and the first screen at **360 × 780** and **430 × 932**. List the paths in `NOTES.md` under **Phone cut → screening**.

If you can spawn a fresh agent, give it only those screenshots and the phone cut plan and ask the four questions below. If you cannot, set `"status": "awaiting-phone-screening"` in `stylist.json` and return; the orchestrator holds the screening and continues you with the answers.

1. For each row of the plan: is the change visible in the phone screenshots? (yes / partly / no, with where.)
2. Which sections look like the desktop section merely stacked into one column? Name each one.
3. Is the primary action visible on the first screen at all three widths, and reachable without scrolling back up from every later screen?
4. Name anything cut off, overlapping, too small to read or tap, or covered by a fixed bar.

Act on the answers with the engine's own method. A "no" on question 1, or a section named in question 2 that the plan did not keep on purpose, is a defect. Record the answers and what you changed. One screening round, then one re-check of what you changed; more only if the re-check still finds a defect.

## 4. Mechanical checks (also run by the gate)
At 360 × 780, 390 × 844 and 430 × 932, in both languages:
- no horizontal overflow
- the primary action is inside the first screen
- every link and control outside running text is at least 44 × 44 px (the engine's own threshold if it is stricter)
- every text input has a computed font-size of at least 16px (otherwise iOS zooms the page)
- no fixed or sticky bar covers content at rest
- body text on the Arabic page is at least 16px, and on the English page at least 15px, unless the engine's own type scale says otherwise in writing

The first five are measured by `../assets/probe.js` (`gate.phone`); the last one reads its `type.smallBody`. See `gate-checklist.md` → E.
