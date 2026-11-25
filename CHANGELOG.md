# Changelog

## 0.11.1 — 2026-11-25

### Fixed
- `snapshot.mjs` also saves images the page names but never loaded (a carousel's hidden slides), so the copy no longer shows gaps the live site does not have. Images the browser already drew are not fetched again in another form, so the copy stays light.
- `serve.mjs` serves an extensionless file (an API-served photo) with its real type when the snapshot that holds it sits deeper than the run folder, such as a stylist's `page/` copy.
- Interface punctuation under a copy lock splits sentences into lines instead of joining them with a comma, because joining lowercased the next sentence (found by the first polish run on a real site). A legal line (© name, rights) keeps its own punctuation.
- `snapshot.mjs` always captures the URL's own page first, even when `--page` names others, and reads back a `--page /ar` that Git Bash on Windows rewrote into a drive path.
- The snapshot's `stylist.json` lists each captured page by its language (`{"en": "index.html", "ar": "ar/index.html"}`), so the showcase opens the right page per language for the current site too.

## 0.11.0 — 2026-11-25

A consistency pass over the whole plugin.

### Changed
- **One language scope**, defined once in the contract and used everywhere: Arabic and English from a brief, the snapshotted pages' languages from a snapshot. Rules that assumed two pages now say every page in scope, and the adapters build one page when the scope has one.
- **At most two rounds per fresh-eyes reviewer** (an engine's reviewer, the phone screening, the jury). Open items after that are recorded and shown, and the run moves on.
- **The gate reads in order:** sections A to G, numbered once, with the premium floor (F) before the jury (G) and the punctuation checks in one place.
- **The standard modes use the premium floor as a lens:** build and enhance deliver it, polish brings what exists up to it, audit reports the gaps. With a live URL but no source, they work on a snapshot and hand back a patch plan.
- The showcase starts as soon as the snapshot exists, and shows each variant's jury score and open items on its tab.
- Contradictions removed: support engines may now fill the premium floor for Atelier; the two punctuation rows are one; the copy line covers quotation marks and ellipses; old wording ("side-by-side", "the interview", "step 5") is gone.

### Fixed
- `snapshot.mjs` recorded every snapshot as English and assumed the saved path of the first page. It now reads the page's own language and the path it was saved at, after any redirect, and numbers the before screenshots when there are several pages.

## 0.10.0 — 2026-11-25

### Changed
- **A premium floor for every Explore direction**, in the contract: a designed header with a scroll state, a hero entrance that shows the main action within 200ms, background depth with slow ambient motion that belongs to the product's industry, designed hover, focus and press states, one motion system, and modern library imagery. It says what must exist, never how it looks; the gate checks the evidence.
- **Motion in all three directions, with one motion lead** (Cinema by default) where motion is the hero of the page. The motion question now sets the level for the other two.
- **Modern interface punctuation:** no closing full stops, no decorative quotation marks, no ellipses. Quotations read as quotations by their setting and attribution. The probe adds `gate.robotic`.
- **Library imagery:** stylists may use Pexels, Pixabay, StockCake or Unsplash for atmosphere, background and hero, never as the business's own work.
- When an engine forbids depth or motion for a page kind (Taste on service pages), the floor wins and the support engines fill it in the engine's own palette and type.
- The jury is told that the business's own photographs are real.

## 0.9.1 — 2026-11-25

### Changed
- **The showcase shows one direction at a time, at full size, in tabs**, instead of a grid of small frames. Current site comes first. Desktop renders at 1440 and scales to the window; Phone renders at 390 in a device frame. A tab still building says so and fills in by itself. The arrow keys switch tabs, and each view stays loaded, so switching is instant.

## 0.9.0 — 2026-11-25

### Changed
- **Copy lock on snapshot runs.** The page's text is the user's: a stylist may cut, reorder and split it, never reword it or add a line. Atelier runs Taste's copy layer on the page's own text instead of writing new copy. Found in the first real run, where one direction added 20 lines that were not on the page.
- **A premium bar at the gate.** A fresh-eyes jury scores every variant with the award rubric (design, usability, creativity, content). Under 7.0, the variant goes back to its stylist once with the named anti-patterns.

### Added
- `scripts/copy-diff.mjs`: lists the visible text of a variant that is not on the original page.

## 0.8.1 — 2026-11-25

### Changed
- **The five questions are now about the look and feel, and all closed.** Each is a pick of two or three options, with "you choose" always allowed: the feel, how far the colours may move, how much goes on a screen, how much the page moves, and how far to go from the current page. They no longer ask about the business, the call to action, the proof or the images.
- **Images are the stylist's call.** Each stylist may use the page's own photographs, or take better ones from a stock or image library when that clearly improves the page, and keeps the page's own when nothing better exists.
- The page's own content is no longer sent back to the user for confirmation.

## 0.8.0 — 2026-11-25

### Changed
- **Explore now starts from a light snapshot of your real front end.** `scripts/snapshot.mjs` saves the rendered page and the files it loads, at phone and desktop width, with its measured baseline. No repository, backend or database is needed.
- **Five questions instead of six**, asked in one message before any stylist starts. The slice and the languages are one question, and the asset policy is part of what is fixed and what is open. Anything the snapshot already shows is not asked.
- **`directions.md`:** a short preview of what each of the three directions does for this visitor and what it will not do, built from the answers.
- **The showcase opens first and fills in.** It starts with **Current site**, adds each direction as it lands, and the server resolves a snapshot's root-relative files by itself.
- **Apply one.** Only the direction you pick is carried into your real project, with the probe's numbers before and after.

## 0.7.0 — 2026-11-22

### Changed
- **Renamed from 3 Stylists to Altero.** The plugin is `altero`, the commands are `/altero:audit`, `:polish`, `:enhance`, `:build` and `:explore`, and the repository is `Mohamad-MG/altero`.
- Caches moved from `~/.3stylists/` to `~/.altero/`, Explore runs from `.3stylists/runs/` to `.altero/runs/`, and the environment variables from `STYLISTS_*` to `ALTERO_*`.
- The README leads with a measured before and after, and explains the workflow, the Arabic rules and common questions.

To move from 0.6.0, remove the old plugin and add the new marketplace:

```sh
claude plugin uninstall three-stylists@three-stylists
claude plugin marketplace remove three-stylists
claude plugin marketplace add Mohamad-MG/altero
claude plugin install altero@altero
```

## 0.6.0 — 2026-11-21

First public release. Versions 0.1 to 0.5 were private pre-releases.

### Modes
- **audit, polish, enhance, build** on one shared workflow. They need no setup beyond installing the plugin.
- **explore**: three pinned design engines build three independent Arabic and English variants of the same product, shown side by side. Optional; it needs git, Node.js 22+ and a browser.

### Added
- `assets/probe.js`: one script of measured checks (overflow, tap targets, input sizes, fixed bars, headings, type and surface censuses, font loading, Arabic letter-spacing, repeated text, images, section gaps), shared by the standard modes and the Explore gate.
- Claude Code commands `/three-stylists:audit`, `:polish`, `:enhance`, `:build` and `:explore`, and one skill for Codex and ChatGPT.
- Host manifests generated from `plugin.json` by `scripts/sync-manifests.mjs`.
- Package tests for manifest sync, document paths, stylist wiring and script syntax, run on Linux, macOS and Windows.

### Changed
- The Arabic and English rules and the phone layer now serve every mode, not only Explore.
- One generic stylist agent replaces three copies. The Explore contract lives in `internal/contract.md` and the engine adapters in `internal/adapters/`.

### Fixed
- On Windows the environment probe reported every outside service as blocked, which pushed Explore into its degraded paths.
- `NODE_PATH` was split on the wrong separator on Windows. Chrome and Playwright discovery is now shared by all scripts.
