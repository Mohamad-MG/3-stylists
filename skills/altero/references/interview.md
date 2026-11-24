# The five questions

Exactly five. Explore asks them after the snapshot and before any stylist starts, because the answers do two jobs: they give each engine the real inputs it would otherwise guess, and they decide what each of the three directions is for. Intake and the snapshot answer a lot already, so ask only what they could not.

| Engine | What it asks before designing |
|---|---|
| Impeccable (init, new-work) | primary user, situation and job · the product's different mechanism · durable constraints, assets, evidence · who must act, what they should believe, which real proof · what would make a polished result feel wrong · stack |
| Taste Skill (run step 1) | the kind of business · what is sold · who buys it · the one main action · the real material (logo, screens, photographs, prices, address, hours) |
| cinematic-ui (development, asset call) | the product truth and the one action · what can honestly be claimed · the audience arc · every asset: supplied, licensed library, AI-generated (with cost), or redesigned around a stand-in |

## Rules
- **Five questions, no more.** Replace any question Intake or the snapshot already answered with a reserve. Ask them in one message, with your structured question tool if you have one, in the user's language, concretely, with options where they help.
- **No aesthetic questions.** Never ask about feel, mood, colours, fonts, styles or sites to imitate. Each engine runs its own direction process, and Impeccable warns that a look named in a question becomes the answer. Q5 collects what to avoid without naming a look.
- **Nothing is asked twice.** What the snapshot shows (languages, the logo, the colours in use, the stack, the page's content) is evidence, not a question.

---

### Q1 — The visitor and the action
- **AR:** مين الزائر الأساسي، وهو في أنهي موقف، وإيه الحاجة الواحدة اللي لازم يعملها في الموقع؟
- **EN:** Who is the primary visitor, in what situation, and what is the one thing they must do?
- **Feeds:** Impeccable `## Users`, Taste "who buys it" and the main action, cinematic-ui's audience arc.

### Q2 — What is truly different, and the proof
- **AR:** إيه اللي بتقدّمه ومحدش جنبك يقدر يقوله بصدق؟ وإيه الدليل الحقيقي اللي عندك (أرقام، صور، تقييمات، عملاء)؟
- **EN:** What do you offer that a neighbour could not truthfully claim, and what real proof do you have?
- **Feeds:** Impeccable `## Positioning` and `## Evidence on Hand`, `facts.json → claims`, cinematic-ui's logline.

### Q3 — What is fixed, what is open, and what material you have
- **AR:** إيه اللي متقرر ومش هيتغير: الاسم، اللوجو، ألوان أو خطوط البراند، طريقة الكلام؟ وإيه المفتوح تمامًا؟ وعندك إيه حقيقي من صور وفيديو؟ ولو مش كفاية، تسمح بصور بديلة مرخّصة؟ وبصور بالذكاء الاصطناعي (وده ليه تكلفة)؟
- **EN:** What is already fixed (name, logo, brand colours or fonts, voice), and what is completely open? What real material do you have (photographs, video)? If it is not enough, may we use licensed stand-in photographs, or AI-generated images (which cost money)?
- **Feeds:** Impeccable `## Brand Commitments`, Taste `start.mjs brand` and its photo path, cinematic-ui's asset call.
- **Default if not answered:** keep the logo and name, use only the real material on hand, no stand-ins and no AI images.

### Q4 — The slice and the languages
- **AR:** الأقسام أو الصفحات اللي عايز نجرّب فيها الاتجاهات الجديدة: الهوم كله ولا جزء معيّن؟ ولو الموقع بأكتر من لغة، أنهي لغة نبدأ بيها، وإيه اللهجة العربية والأرقام؟
- **EN:** Which page or sections should the new directions cover, the whole homepage or a part? If the site has more than one language, which leads, in which Arabic register, and with which digits?
- **Feeds:** the proposed slice in `brief.md`, `bilingual.md` (lead language, register, numerals), each engine's lead-language run.
- **Usually answered for you:** with a snapshot the languages are visible, so ask only about the slice, or replace the whole question with a reserve.

### Q5 — What would feel wrong
- **AR:** لو الموقع طلع شيك ومتظبط بس حسّيت إنه غلط، إيه اللي هيكون غلط فيه؟
- **EN:** If the result were polished but felt wrong for this product, what would be wrong about it?
- **Feeds:** Impeccable new-work ("what would make a polished result feel wrong"), the refusals each engine weighs, and the "will not do" line of every direction. Ask it exactly this way: it collects the anti-direction without naming a look.

---

## Reserves (in order)
- **R1 — Stack for the final build:** static HTML/CSS, a framework, or "you decide". With a snapshot, ask where the real source lives, because the chosen direction will be carried into it.
- **R2 — The use scene:** where and when the visitor opens the site (on a phone at night, at a desk at work…). Impeccable picks light or dark from the use scene, never from the category.
- **R3 — Hard requirements:** accessibility standard, legal text, regulated claims.

## From answers to three directions
After the facts are confirmed, write `directions.md`: three short entries, one per stylist, each saying what that stylist's engine will do **for this visitor**, in plain words, and what it will not do. The entries come from the answers and from what each engine is built for, never from a look:

- **Atelier (Taste Skill)** serves the answers about proof, trust and the main action: a company-grade page where the real material carries the page.
- **Manifesto (Impeccable)** serves the answers about what is different: a page built around the one thing a neighbour could not claim.
- **Cinema (cinematic-ui)** serves the answers about the visitor's path: a page that moves the visitor to the one action as a single story.

Each entry ends with the "will not do" line taken from Q5. Show the three entries to the user in one message, then start. It is a preview of the work, not a question.

## Derived fields (write into answers.md)
```
primary_visitor:      ...
situation:            ...
primary_action:       ...           # verb + object, e.g. "Book a visit"
positioning:          ...
proof:                [...]
brand_commitments:    [...]         # pins engines must honour
open:                 [...]
assets:               [...]         # what exists, with paths
stand_in_photos:      yes | no      # default no
ai_assets:            yes | no      # default no, with any budget the user gave
slice:                ...           # the page or sections the directions cover
lead_language:        ar | en
arabic_register:      egyptian | msa | gulf | levantine
numerals:             western | arabic-indic
feels_wrong:          ...
stack:                static | <framework> | delegated
real_source:          ...           # where the chosen direction will be applied, if known
use_scene:            ...           # if asked
requirements:         [...]         # if asked
```
