# Source study — what the top tools actually contain

Studied from the real repositories (shallow clones, 13 November 2026), not from READMEs or summaries.
The commits below are the ones studied. The versions Explore runs are pinned in `engines/registry.json`.

| Source | Commit | Licence | What it really is |
|---|---|---|---|
| pbakaus/impeccable | c4cd192 | Apache-2.0 | A full design-direction system: a native binary (`impeccable context`, `concept-seed`, `serve-question`, detector hook), 25+ command playbooks, a dice-based direction engine that deals worlds against the category rut, a decision page, a "craft floor" of verifiable checks and bans. |
| Leonxlnx/taste-skill | f6b7657 | MIT | A production kit for company-grade sites (bar: figma.com, x.ai): `system.css`/`system.js`, a starter page, dealers for heroes, palettes and moments (`deal.mjs`, `start.mjs`, `moments.mjs`), a live photo search, a copy linter, a browser finish gate. Photo-led; effects only for tech subjects. |
| emilkowalski/skills | 0f2e23b | MIT | UI motion and design-engineering judgement: the animation decision framework (should it animate, purpose, easing, duration), springs, interruptibility, component feel, review standards, choreography recipes. |
| greensock/gsap-skills | aed9cfd | MIT | Official, correct GSAP usage: core, timeline, ScrollTrigger, plugins, React, frameworks, performance, utils. |
| MengTo/Skills (web-design) | 07274a3 | MIT | About 90 technique skills under `agent-skills/web-design/`, including `build-awwwards-quality-sites`, `cinematic-gsap-lenis-motion-system`, `cinematic-scroll-storytelling`, `scroll-world-storytelling`, `build-threejs-scroll-worlds`, `horizontal-scroll-scenes`, `editorial-portfolio-chapters`, `masked-reveal`, `staggered-word-reveal`. A technique library, not a single method. |
| akseolabs-seo/cinematic-ui | 37651d0 | MIT | A film-production method for sites: cast a director and film, choose a medium, measure a grade from stills, write a treatment and shot list, shoot with a scroll-driven camera kit, screen rendered frames. Has its own kit and scripts. |
| SandroHub013/awwwards-skill | 08417dd | MIT | Award-jury scoring rubric, 19 references (concept, typography, motion, scroll, WebGL, transitions, anti-patterns, audit), demo score sheets. |
| CloudAI-X/threejs-skills | 0e18186 | MIT | 13 Three.js skills (fundamentals → postprocessing, shaders, performance). |
| ibelick/ui-skills | ba966a3 | MIT | UI baselines, motion-performance fixes, accessibility fixes, DESIGN.md creation. |
| Z4YT0N/awwwards-skill | acaf021 | **none** (study only, no redistribution) | A single long command file; asks for Arabic / bilingual mode and states correct basics (no Arabic tracking, subsetting), but has no real Arabic type curation. |

## Findings that shaped Explore

1. **The two strongest tools are systems, not prompts.** Impeccable and Taste run their own scripts, dealers, detectors and gates. Re-writing them "in our own words" throws away their engines, so Explore runs them unmodified.
2. **Taste Skill is easy to misread.** Its standard is the polished company site with real photography ("not an art piece"), not poster typography.
3. **A paraphrase breaks an engine's own bans.** Impeccable bans an eyebrow above the heading and section numbers like 01 / 02 / 03, and treats a system font as the display face as a failure, not a fallback. A summary of its taste loses rules like these.
4. **Impeccable already deals three directions and a decision page.** 3 Stylists's difference cannot be "three options". It is: three different engines (not one engine's taste), fully built bilingual demos (not comps), and the Arabic layer.
5. **Nobody solves Arabic.** Impeccable's `harden` covers RTL mechanics and Arabic-script data handling; Taste and cinematic-ui barely touch it; Z4YT0N states basics only. Arabic typography is the open gap, and it needs real type research and verification in a real browser.
6. **Meng To's repo is a technique library (~90 skills).** It serves best as Cinema's catalog of concrete scroll, WebGL and layout techniques, called on demand, not as a method.
