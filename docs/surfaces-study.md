# Surfaces study: dashboards and phone screens (2026-11-18)

Read from the source (shallow clones), the same way as `source-study.md`. The goal: the stylists must work on any web interface, with dashboards and phone screens treated as first-class, not only marketing pages.

## 1. What the current three engines already do

| Engine | Marketing page | Dashboard / app UI | Phone app screens | Evidence |
|---|---|---|---|---|
| Impeccable d41d986 | Persuade mode | **Operate mode**: the world lends only type, palette, density and one signature move; navigation and controls stay the platform's standard ones; comps vary the product's organisation | **Native guidance**: `ios.md`, `android.md`, `adapt.native.md`, `audit.native.md`; the finish reviewer judges native captures per device class | `reference/mode-operate.md`, SKILL.md modes table |
| cinematic-ui 1052c2c | Site mode | **App mode** (316 lines): "the playhead is the task"; cinema gets about a tenth of the frame; a signature view; every state designed; its own lazy-cut list for apps (no row of four equal KPI cards, no boxed mosaic, no film costume in the chrome). Written after three blind tests where every director produced the same app | Only a **reduced phone cut** of a back office (the queue, one record, two verbs). Not a consumer phone app | `references/app-mode.md` |
| Taste Skill f6b7657 | The page kinds it deals | **Not covered.** Product UI appears only inside an `app-frame` on a marketing page | Not covered | SKILL.md §1–2 |

**Consequence:** for dashboards, two of the three stylists already have a native, tested method. Only Atelier needs a different engine.

## 2. Candidates read

| Candidate | Stars | Licence | What it really is | Surface | Fit |
|---|---|---|---|---|---|
| educlopez/ui-craft | 344 | MIT | **A system**, not a prompt: a 393-line skill, 34 references (`recipe-dashboard.md`, `dashboard.md`, `dataviz.md`, `state-design.md`, `themes.md`, `finish-bar.md`), three style presets (dense-dashboard, editorial, minimal), a **zero-dependency anti-slop detector** (`scripts/detect.mjs`, file or URL, exit codes, SARIF), a **10-pass finish bar** with measurable criteria, review agents (design-reviewer, a11y-auditor), evals, a Go CLI | Dashboards, auth, landing | **Strongest fit for Atelier on dashboards.** Like Taste, it aims at the production category standard ("would a designer retouch this?"), with named compositions, presets and a gate. That keeps the three stylists genuinely different: standard (ui-craft) · world (Impeccable) · film (cinematic-ui) |
| Dammyjay93/interface-design | 5.9k | MIT | One 320-line skill plus two commands (design-review, design-deslop) and a system template. Sharp method (intent first, domain exploration, signature, "where defaults hide"), but **no scripts, no gate, no detector** | Dashboards, admin, SaaS; explicitly not marketing | Second choice. Its method overlaps Impeccable's world-first approach, and it has nothing that checks its own output |
| nexu-io/open-design | 103k | Apache-2.0 | A whole design-agent workspace product with 171 skills and 116 templates. The relevant parts are seed templates: `mobile-app` (an iPhone 15 Pro frame, 6 screen archetypes, an anti-fake-device checklist), `dashboard`, `apple-hig` | Prototypes, phone screens | A **support source** for phone-screen framing and archetypes, not a primary engine: its templates are starting layouts, which pull toward sameness |
| vudovn/antigravity-kit `mobile-design` | — | MIT | A 396-line skill with platform references (iOS, Android, touch psychology, navigation, typography, colour) and `mobile_audit.py` | Native apps (React Native, Flutter); says "NOT for web apps" | Support reference for native conventions only |
| rileyhilliard/claude-essentials `design` | — | MIT | A design skill inside a larger plugin | Dashboards, admin | Not studied further: nothing beyond what the two above offer |

Stars are taken from the GitHub pages on 2026-11-18. They were not used to rank: open-design's 103k stars belong to a whole product, and ui-craft's 344 sit on the most complete system for this job.

## 3. Proposed routing by surface

The intake records `surface: marketing | product | phone`. Each stylist keeps its name and character; the engine follows the surface.

| Stylist | Marketing page (today) | Dashboard / app UI | Phone app screens |
|---|---|---|---|
| **Atelier** (the production standard) | Taste Skill | **ui-craft** (recipe, presets, detector, finish bar) | ui-craft + Emil `mobile-native` and `gestures` (to be confirmed) |
| **Manifesto** (a world) | Impeccable, Persuade | Impeccable, **Operate** | Impeccable, Operate + `ios.md` / `android.md` |
| **Cinema** (a film) | cinematic-ui, site mode | cinematic-ui, **app mode** | cinematic-ui app mode's phone cut (only for back offices; a consumer phone app is a gap) |

Support engines that apply to every surface: Emil `break-ui` (worst-case data in both languages), `mobile-native`, and for dashboards `pick-ui-library` (use a real dependency for a table, chart or command menu instead of hand-rolling one). Phone frames for the showcase can borrow open-design's `mobile-app` checklist (Apache-2.0, attributed).

## 4. Decisions (2026-11-18)
1. **"Phone screens" means a designed phone cut of every web interface,** not native apps and not a reflow: sections and style may change for the phone, and the phone version is reviewed. Built as the phone layer (`skills/altero/references/phone.md`), on each engine's own phone method. The "Phone app screens" column above is therefore out of scope for now; native app screens can be revisited later.
2. **Dashboards** remain to be built: Atelier on ui-craft, Manifesto on Impeccable Operate, Cinema on cinematic-ui app mode, all three with the phone layer.
3. **ui-craft's presets** are strong defaults; in an Explore run they must be dealt or chosen by the engine's own rules, never by the orchestrator.
