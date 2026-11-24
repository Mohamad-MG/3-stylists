# Changelog

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
