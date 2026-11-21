# Sources and licences

3 Stylists is MIT licensed. Its own files (the workflows, the Arabic and English layer, the phone layer, the probe, the adapters, the scripts and the showcase) contain no code, prompts or assets copied from the tools below.

## Engines used by Explore

Explore fetches these tools at run time into the user's own cache, at the exact commits in the [engine registry](engines/registry.json). They are never vendored into this repository, and each keeps its own licence. The audit, polish, enhance and build modes use none of them.

| Tool | Licence | Role |
|---|---|---|
| [Impeccable](https://github.com/pbakaus/impeccable) | Apache-2.0 | the Manifesto stylist's engine |
| [Taste Skill](https://github.com/Leonxlnx/taste-skill) | MIT | the Atelier stylist's engine |
| [cinematic-ui](https://github.com/akseolabs-seo/cinematic-ui) | MIT | the Cinema stylist's engine |
| [Emil Kowalski's skills](https://github.com/emilkowalski/skills) | MIT | motion detail for Manifesto and Cinema; behaviour checks for all three |
| [GSAP skills](https://github.com/greensock/gsap-skills) | MIT | correct GSAP code for Manifesto and Cinema |
| [Three.js skills](https://github.com/CloudAI-X/threejs-skills) | MIT | correct Three.js code for Cinema |
| [Awwwards skill](https://github.com/SandroHub013/awwwards-skill) | MIT | the jury rubric in Cinema's screening |
| [Meng To's skills](https://github.com/MengTo/Skills) | MIT | scroll and WebGL techniques for Cinema |
| [UI Skills](https://github.com/ibelick/ui-skills) | MIT | accessibility checks in the gate |

The registry is the source for commits, sparse paths and the files each adapter relies on. One repository was studied and is not used, because it carries no licence; it is listed in the registry under `studiedNotUsed`.

## Arabic type

The [Arabic type catalog](skills/three-stylists/references/arabic-type/README.md) describes eight faces from [Google Fonts](https://github.com/google/fonts), all under OFL-1.1, with measurements and renders made for this project. No font files are shipped here. A page that uses a face must self-host it together with its `OFL.txt`.

## Research

The [source study](docs/source-study.md) and the [surface study](docs/surfaces-study.md) record what each tool contains and why it was chosen. They describe the commits studied at the time; the registry holds the versions that run.
