<p align="center">
  <img src=".github/assets/hero.svg" alt="Altero. Design craft for coding agents: audit, polish, enhance, build, explore" width="100%">
</p>

<p align="center">
  <b>A plugin that gives your coding agent a designer's eye.</b><br>
  It measures a page in a real browser, fixes what the numbers show, and measures again.<br>
  Arabic and English are both first-class.
</p>

<p align="center">
  <a href="https://github.com/Mohamad-MG/altero/actions/workflows/check.yml"><img alt="Checks" src="https://img.shields.io/github/actions/workflow/status/Mohamad-MG/altero/check.yml?branch=main&style=flat-square&label=checks&labelColor=0D0D0D"></a>
  <a href="#install"><img alt="Hosts: Claude Code, Codex, ChatGPT" src="https://img.shields.io/badge/hosts-Claude_Code%2C_Codex%2C_ChatGPT-F2660F?style=flat-square&labelColor=0D0D0D"></a>
  <a href="LICENSE"><img alt="MIT licence" src="https://img.shields.io/badge/licence-MIT-F4F3EF?style=flat-square&labelColor=0D0D0D"></a>
</p>

<p align="center">
  <a href="#install">Install</a> &nbsp;·&nbsp;
  <a href="#use-it">Use it</a> &nbsp;·&nbsp;
  <a href="#five-modes">Modes</a> &nbsp;·&nbsp;
  <a href="#what-it-measures">What it measures</a> &nbsp;·&nbsp;
  <a href="#explore-one-brief-three-directions">Explore</a> &nbsp;·&nbsp;
  <a href="#questions">Questions</a>
</p>

<br>

Coding agents write working interfaces that still look unfinished: text that runs off a phone screen, buttons too small to tap, three shades of the same grey, Arabic set like a translation. Altero teaches the agent to see these, prove them with numbers, and fix them inside your own design and stack.

Point it at a project you already have, or at a brief for one you are starting.

The name comes from tailoring. An alteration keeps the garment yours and makes it fit, and that is the job here too: your design, measured and taken in where it pulls.

## See it work

<img src=".github/assets/proof.png" alt="Before and after on a phone at 390 px. Before: the probe reports 170 px of sideways overflow from a table, a 24 px close button, a 14 px phone field, a web font that did not load, letter-spacing on an Arabic heading and a repeated paragraph. After the fixes every one of those lists is empty and the booking button is on the first screen." width="100%">

Every finding comes with the measurement behind it, and every fix is checked with the same measurement, at the same width, in the same state.

### What a pass can look like

<img src=".github/assets/gallery/forma-field.gif" alt="Forma Field, an architecture studio homepage, wiping between before and after. Before: a purple gradient, mixed button styles, a cramped hero and project cards of different shapes. After: the same sections with one type scale, a calm warm palette, one button style and aligned cards." width="100%">

<p><b>Forma Field</b> &nbsp;architecture &nbsp;<code>polish</code> &nbsp;The same sections, one type scale, one button style, and cards that line up.</p>

#### Arabic, set right

<table>
  <tr>
    <td width="44%" valign="top">
      <img src=".github/assets/gallery/mawja.gif" alt="Mawja, an Arabic aquarium booking page on a phone, wiping between before and after. Before: the headline fades into the photo, the ticket types run off the left edge, and the booking link sits under the bottom bar. After: a readable headline, all three ticket types on screen, a dated form and a full-width booking button.">
      <p><b>Mawja</b> &nbsp;aquarium &nbsp;<code>polish</code></p>
    </td>
    <td width="56%" valign="top">
      <p>Arabic breaks in ways an English-first agent does not look for. On this page:</p>
      <ul>
        <li>The headline sat on the brightest part of the photo and faded out</li>
        <li>The ticket types ran off the left edge, which is where a right-to-left row overflows</li>
        <li>The booking link was a small text link under the bottom bar</li>
      </ul>
      <p>After the pass the headline sits on a calm area, the row fits the screen, and booking is one full-width button.</p>
      <img src=".github/assets/gallery/madar-energy.jpg" alt="Madar Energy, an Arabic solar company site. Before: a washed-out hero, a misaligned savings form and service cards of different weights. After: the same right-to-left layout with a clear hero, an aligned form and even cards.">
      <p><b>Madar Energy</b> &nbsp;solar &nbsp;<code>polish</code></p>
    </td>
  </tr>
</table>

#### One journey, reworked

<table>
  <tr>
    <td width="44%" valign="top">
      <img src=".github/assets/gallery/morrow-skin.gif" alt="Morrow Skin, a skincare product page on a phone, wiping between before and after. Before: a cropped bottle, a loud title, crowded tabs, a list of ingredients and a small add button in a translucent bar. After: the product photographed whole, a calm title and price, three short benefits and a full-width Add to bag button.">
      <p><b>Morrow Skin</b> &nbsp;skincare &nbsp;<code>enhance</code></p>
    </td>
    <td width="56%" valign="top">
      <p>Polish fixes what is broken and leaves the page as it is. Enhance takes one journey, here the way from a product to the bag, and reworks it end to end.</p>
      <ul>
        <li>The bottle was cropped and the price competed with the title</li>
        <li>Four tabs and a list of ingredients stood between the visitor and the button</li>
        <li>Add to bag was a small button in a translucent bar</li>
      </ul>
      <p>After the pass the product is shown whole, the title and price read in order, three benefits replace the tabs, and Add to bag is the one clear action.</p>
    </td>
  </tr>
</table>

#### New directions

Explore builds three independent directions for the same brief. These show the kind of change it proposes.

<table>
  <tr>
    <td width="33%" valign="top">
      <img src=".github/assets/gallery/brightbay-dental.jpg" alt="Brightbay Dental, a family dental clinic site. Before: three button styles and uneven service cards. After: a new, darker direction with one button style and matching cards.">
      <p><b>Brightbay Dental</b><br>healthcare</p>
    </td>
    <td width="33%" valign="top">
      <img src=".github/assets/gallery/orbit-freight.jpg" alt="Orbit Freight, a logistics tracking site. Before: low-contrast headline, a scattered card layout and a banner covering content. After: a strong headline, a clear tracking field and three aligned service cards.">
      <p><b>Orbit Freight</b><br>logistics</p>
    </td>
    <td width="33%" valign="top">
      <img src=".github/assets/gallery/pulse-room.jpg" alt="Pulse Room, a music streaming page. Before: a flat gradient page with the track list hidden under a cookie banner. After: a bold album page with the full track list visible.">
      <p><b>Pulse Room</b><br>music</p>
    </td>
  </tr>
</table>

<sub>These are illustrations made for this README, not output from the plugin. The measured example above is real.</sub>

## Install

**Claude Code**

~~~sh
claude plugin marketplace add Mohamad-MG/altero
claude plugin install altero@altero
~~~

Inside a session the same two steps are `/plugin marketplace add Mohamad-MG/altero` and `/plugin install altero@altero`.

**Codex and the ChatGPT desktop app**

~~~sh
codex plugin marketplace add Mohamad-MG/altero
~~~

Then open the plugin browser, `/plugins` in the Codex CLI or the **Plugins** tab in the desktop app, and install **Altero**.

<details>
<summary><b>ChatGPT workspaces</b></summary>
<br>

A workspace admin imports the repository once: **Admin Console → Plugins → Add → Import marketplace**, with the source `https://github.com/Mohamad-MG/altero` and an empty path. Members then install it from the **Plugins** tab. What a session can reach (code, previews, a browser) depends on the host.

</details>

## Use it

Start a new session in your project and name a mode and a target.

~~~text
/altero:audit Review the Arabic product pages on a phone and list verified issues
/altero:polish Fix spacing and touch targets on the pricing page
/altero:enhance Improve the quote request flow
/altero:build Build the first page from my brief
/altero:explore Compare three bilingual directions for my brief
~~~

In Codex and ChatGPT there are no slash commands. Say it in a sentence, or type `@` and pick the plugin:

~~~text
Use Altero to audit the mobile product page. Findings only.
~~~

## Five modes

| Mode | Use it when | You get |
| --- | --- | --- |
| **audit** | You want to know what is wrong before touching anything | Findings with evidence and a repair plan. No edits |
| **polish** | The design is right and the details are not | Small fixes inside the existing design, with before and after evidence |
| **enhance** | One journey or surface underperforms | Scoped changes to that journey, checked by using it |
| **build** | You are starting from a brief | A working first slice in your stack |
| **explore** | You want to see directions before you commit | Three independent Arabic and English variants to pick from |

> [!TIP]
> **An existing project:** start with `audit` on a page you know well, then `polish` or `enhance` what it finds.
>
> **A new project:** start with `build`, or with `explore` while the direction is still open.

### How a mode runs

<img src=".github/assets/workflow.svg" alt="Audit, polish, enhance and build follow five steps: scope, baseline, decide, implement, verify. Audit stops after decide with findings and a repair plan. Verify repeats the baseline checks under the same conditions." width="100%">

The four standard modes share one workflow. They keep your brand, your components and your content sources, leave navigation, analytics and business logic alone, and report what was verified, what failed and what could not be checked.

## What it measures

<img src=".github/assets/fit.svg" alt="Four of the measured checks: no sideways scroll at 390 px, tap targets of 44 px, input text of 16 px, and Arabic and English direction" width="100%">

With a browser tool in the session, the agent runs one bundled script, the probe, at phone and desktop widths. It returns facts, not opinions.

| Area | What the probe reports |
| --- | --- |
| **Layout** | Horizontal overflow and the element that causes it, fixed bars over content, the space between sections |
| **Touch** | Tap targets under 44 px, inputs under 16 px, whether the main action is on the first screen |
| **Type** | The heading outline, how many font sizes and weights the page really uses, web fonts that did not load, letter-spacing and tight leading on Arabic |
| **Surfaces** | The radii, shadows and button shapes in use |
| **Content** | Repeated and truncated text, broken and oversized images, full stops in interface text |

<details>
<summary><b>A raw readout</b></summary>
<br>

The probe's output on the "before" page above, trimmed:

~~~json
{
  "page": { "width": 390, "overflowX": 170, "overflowFrom": ["table -170..370"] },
  "type": {
    "notLoaded": ["Clay Display"],
    "arabicLetterSpacing": ["4px h1 «اتعلّم الفخار بإيدك»"],
    "tightArabicLeading": ["1.05 h1 «اتعلّم الفخار بإيدك»"]
  },
  "copy": { "duplicates": ["2× «الورشة ساعتين، وبتاخد قطعتك معاك بعد الحريق.»"] },
  "gate": {
    "phone": ["overflow 170px", "tap 24×24 ×", "tap 350×38 tel", "tap 350×42 احجز مكانك", "input font 14px tel"],
    "primaryAction": "checked: احجز مكانك"
  }
}
~~~

</details>

## Arabic and English

Most tools treat Arabic as English flipped right to left. Altero sets it as its own script:

- **Type:** no letter-spacing, since it breaks the joins between letters, no synthetic bold or italic, and line height raised until nothing clips
- **Direction:** logical properties throughout, Latin names and numbers isolated inside Arabic, direction-carrying icons mirrored and logos left alone
- **Motion:** "forward" follows the reading direction, and Arabic is never split into characters for an animation
- **Phone:** the phone is its own composition, not a narrower desktop

The rules are in the [Arabic and English reference](skills/altero/references/bilingual.md) and the [phone reference](skills/altero/references/phone.md), with a [catalog of eight tested Arabic faces](skills/altero/references/arabic-type/README.md) and their Latin pairs.

## Explore: one brief, three directions

<img src=".github/assets/stylists.svg" alt="The three stylists: Atelier runs Taste Skill, Manifesto runs Impeccable, Cinema runs cinematic-ui" width="100%">

Explore hands the same brief and the same facts to three third-party design engines, each pinned to an exact commit, unmodified, and run in its own isolated agent. You get three built, bilingual pages side by side, not three mood boards.

| Stylist | Engine | How it works |
| --- | --- | --- |
| **Atelier** | [Taste Skill](https://github.com/Leonxlnx/taste-skill) | A production kit for company-grade sites: photo-led pages, the copy written first, a finish gate in the browser |
| **Manifesto** | [Impeccable](https://github.com/pbakaus/impeccable) | A design-direction system that deals visual worlds against the habits of the category, then builds one |
| **Cinema** | [cinematic-ui](https://github.com/akseolabs-seo/cinematic-ui) | A film production for a site: a director, a colour grade, a storyboard and a scroll-driven camera |

Explore needs git, Node.js 22+, Chrome or Chromium, and a host with subagents. The first run fetches the engines into `~/.altero/engines`. The other four modes need none of this. Read the [Explore workflow](skills/altero/references/explore.md) and the [sources and licences](SOURCES.md).

## Questions

<details>
<summary><b>Will it redesign my site?</b></summary>
<br>

Only if you ask for `build` or `explore`. `audit` makes no edits, `polish` works inside the existing design, and `enhance` changes the one journey you name.

</details>

<details>
<summary><b>Does it need a browser?</b></summary>
<br>

No, but it is better with one. Without a browser tool it works from your source files and screenshots, and labels anything it could not check in a browser as unverified.

</details>

<details>
<summary><b>Which stacks does it support?</b></summary>
<br>

Any. It works in your project's own stack, tokens and components. Nothing is added to your dependencies for the four standard modes.

</details>

<details>
<summary><b>Does it send my code anywhere?</b></summary>
<br>

The plugin itself has no server. It runs inside your agent, under whatever access your host already has. Only Explore downloads anything: the pinned engines from GitHub, cached in `~/.altero/`. Explore runs are written to `.altero/runs/` in your project.

</details>

<details>
<summary><b>My site is English only. Is it still useful?</b></summary>
<br>

Yes. The Arabic rules apply only to Arabic and right-to-left pages. Everything else, the probe, the phone layer and the workflow, applies to any page.

</details>

## Update or remove

~~~sh
claude plugin marketplace update altero
claude plugin update altero@altero
claude plugin uninstall altero@altero

codex plugin marketplace upgrade altero
codex plugin marketplace remove altero
~~~

## Develop

~~~sh
node --test                        # package checks
node scripts/sync-manifests.mjs    # after editing plugin.json
claude plugin validate .
~~~

Read the [architecture](ARCHITECTURE.md) before changing the package and the [changelog](CHANGELOG.md) for what shipped.

<br>

<p align="center"><sub>MIT licensed. The engines Explore runs keep their own licences, listed in <a href="SOURCES.md">SOURCES.md</a>.</sub></p>
