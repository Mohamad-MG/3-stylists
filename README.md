# 3 Stylists

A plugin for the visual quality of web interfaces. Audit a site, polish its current design, enhance one journey, or build a new frontend from a brief, with Arabic and English treated as first-class. On request, explore three independent design directions side by side.

It works in **Claude Code** and in **Codex and ChatGPT**, on a project you already have or one you are starting.

## Install

### Claude Code

From a terminal:

~~~sh
claude plugin marketplace add Mohamad-MG/3-stylists
claude plugin install three-stylists@three-stylists
~~~

Or inside a session: `/plugin marketplace add Mohamad-MG/3-stylists`, then `/plugin install three-stylists@three-stylists`.

Start a new session in your project and run a mode:

~~~text
/three-stylists:audit Review the Arabic product pages on a phone and list verified issues
/three-stylists:polish Fix spacing and touch targets on the pricing page
/three-stylists:enhance Improve the quote request flow
/three-stylists:build Build the first page from my brief
/three-stylists:explore Compare three bilingual directions for my brief
~~~

### Codex and the ChatGPT desktop app

~~~sh
codex plugin marketplace add Mohamad-MG/3-stylists
~~~

Then open the plugin browser, `/plugins` in the Codex CLI or the **Plugins** tab in the desktop app, and install **3 Stylists**. Start a new session in your project and name the mode and the target:

~~~text
Use 3 Stylists to audit the mobile product page. Findings only.
~~~

You can also type `@` and pick the plugin or its `three-stylists` skill.

### ChatGPT workspaces

A workspace admin imports the repository once: **Admin Console → Plugins → Add → Import marketplace**, with the source `https://github.com/Mohamad-MG/3-stylists` and an empty path. Members then install it from the **Plugins** tab. What a session can reach (code, previews, a browser) depends on the host.

## Modes

| Mode | Use it when | You get |
| --- | --- | --- |
| **audit** | You want to know what is wrong before touching anything | Findings with evidence and a repair plan. No edits |
| **polish** | The design is right and the details are not | Small fixes inside the existing design, with before and after evidence |
| **enhance** | One journey or surface underperforms | Scoped changes to that journey, checked by using it |
| **build** | You are starting from a brief | A working first slice in your stack |
| **explore** | You want to see directions before you commit | Three independent Arabic and English variants to pick from |

**An existing project:** start with audit on a page you know well, then polish or enhance what it finds.
**A new project:** start with build, or with explore when the direction is still open.

## What it measures

With a browser tool in the session, the standard modes run one bundled script on the page and quote its numbers before and after a change: horizontal overflow and its cause, tap targets under 44 px, inputs under 16 px, fixed bars over content, the heading outline, how many font sizes, weights, radii, shadows and button shapes the page really uses, web fonts that did not load, letter-spacing on Arabic, repeated and truncated text, broken and oversized images, and the space between sections.

For Arabic and right-to-left pages it applies a set of typesetting, bidi and motion rules, and it treats the phone as its own composition, not a narrower desktop.

## Explore

Explore runs three third-party design engines, pinned and unmodified, each in its own isolated agent on the same facts. It needs git, Node.js 22+, Chrome or Chromium, and a host with subagents. The first run fetches the engines into `~/.3stylists/engines`. See the [Explore workflow](skills/three-stylists/references/explore.md) and the [sources and licences](SOURCES.md). The other four modes need none of this.

## Update or remove

~~~sh
claude plugin marketplace update three-stylists
claude plugin update three-stylists@three-stylists
claude plugin uninstall three-stylists@three-stylists

codex plugin marketplace upgrade three-stylists
codex plugin marketplace remove three-stylists
~~~

## بالعربي

**3 Stylists** بلجن لجودة الواجهات: يراجع موقعك ويطلّع العيوب بالدليل، يظبط التفاصيل جوّه نفس التصميم، يحسّن رحلة مستخدم بعينها، أو يبني واجهة جديدة من بريف. العربي والإنجليزي عنده لغتين أصليتين، مش ترجمة.

التنصيب على Claude Code:

~~~sh
claude plugin marketplace add Mohamad-MG/3-stylists
claude plugin install three-stylists@three-stylists
~~~

وعلى Codex وتطبيق ChatGPT: نفّذ `codex plugin marketplace add Mohamad-MG/3-stylists` ثم نصّب **3 Stylists** من `/plugins` أو من تبويب Plugins.

| الوضع | امتى تستخدمه |
| --- | --- |
| `audit` | عايز تعرف إيه الغلط قبل ما تلمس حاجة، بلا أي تعديل |
| `polish` | التصميم مظبوط والتفاصيل لأ |
| `enhance` | رحلة أو صفحة بعينها محتاجة تتحسّن |
| `build` | بتبدأ مشروع جديد من بريف |
| `explore` | عايز تشوف تلات اتجاهات قبل ما تختار |

مشروع قديم: ابدأ بـ`audit` ثم `polish` أو `enhance`. مشروع جديد: ابدأ بـ`build`.

## Develop

~~~sh
node --test                        # package checks
node scripts/sync-manifests.mjs    # after editing plugin.json
claude plugin validate .
~~~

[Architecture](ARCHITECTURE.md) · [Changelog](CHANGELOG.md) · [Sources and licences](SOURCES.md) · [MIT licence](LICENSE)
