# Changelog

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
