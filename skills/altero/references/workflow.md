# Shared workflow

1. **Scope.** Identify the target, visitor's goal and primary action. Read project
   instructions. For existing work, preserve the brand, stack, content sources
   and agreed scope. For new work, ask only about decisions that block a useful
   first slice. Keep unsupported claims, prices and testimonials out.
2. **Baseline.** Inspect affected sections and controls at mobile and desktop
   widths when a browser is available, and run the measured checks below. Review
   relevant languages and themes. Capture the affected state. Distinguish actual
   overflow from intentional carousels. For large sites, inventory by template
   and separately report the URLs actually inspected. Label source-only and
   screenshot-only observations.
3. **Decide.** Prioritize blocked actions, broken content, readability and
   consistency. Audit stops at findings and a repair plan. Polish retains the
   design and journey. Enhance fixes the agreed flow end to end. Build delivers
   a working slice with relevant empty and error states.
4. **Implement.** Reuse available tokens and components. Respect CMS ownership
   and factual sources. Keep unrelated navigation, analytics and business logic
   intact. Use authorized test environments for side effects.
5. **Verify.** Compare the same before and after conditions, with the same
   measured checks. Record route, viewport, locale, theme and state as relevant.
   Exercise authorized controls. Measure performance under comparable conditions
   when in scope, distinguishing lab results from field data. Report verified,
   failed and unverified outcomes.

## Measured checks

When a browser tool can run a script in the page, evaluate the bundled
[probe](../assets/probe.js) at 390 and 1440 wide, plus 360 and 430 for phone
work, after scrolling the page once. It returns facts, not opinions: horizontal
overflow and what causes it, tap targets under 44 px, inputs under 16 px, fixed
bars over content, the heading outline, how many font sizes, weights, radii,
shadows and button shapes the page really uses, web fonts that did not load,
letter-spacing on Arabic, repeated and truncated text, broken, upscaled and
oversized images, and the space between sections.

- Quote its numbers as evidence, and run it again after a change to show the
  difference.
- `gate.phone` and `page.overflowX` are pass or fail. The rest needs judgement:
  twenty font sizes are a consistency finding only when the design did not
  intend them, and `gate.fullStops` lists every full stop, including prose the
  project wants to keep.
- Never submit forms, send messages or trigger tracked contact actions on a
  live site while inspecting it.
- Without a browser, say that these checks were not run.

## Inspection checklist

- Layout: clipping, overlap, incidental horizontal scroll, reading order, empty space.
- Content: duplicate or stale text, placeholders, inconsistent punctuation and
  facts, inaccessible labels and vague actions. Keep intentional repetition.
- Access: keyboard focus, contrast, touch areas, forms, menus, fixed bars and states.
- Languages: loaded fonts, legible wrapping and mixed-direction labels, numbers
  and icons. Use logical alignment and project typography in RTL. For any Arabic
  or right-to-left page, apply the rules in [Arabic and English](bilingual.md).
- Punctuation: interface text has no closing full stop, no decorative quotation marks and no ellipsis (`gate.fullStops` and `gate.robotic`; `bilingual.md` → Interface punctuation).
- Phone: a page that only reflows the desktop layout, an action out of reach,
  anything cut off or covered. See [the phone layer](phone.md).
- Speed: inspect image sizes, font delivery, initial media, layout shifts and slow
  interactions before optimizing. Treat unmeasured causes as hypotheses.

## Findings

Group instances by shared cause. Record priority, route and section, device and
state, reproduction, evidence, impact, proposed repair and verification status.
Link screenshots and measurements when available and explain what they show.
