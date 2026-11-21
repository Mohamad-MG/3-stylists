# The interview

Six questions. They are assembled from what the three engines ask before they design, so each engine starts from real answers instead of guesses:

| Engine | What it asks before designing |
|---|---|
| Impeccable (init, new-work) | primary user, situation and job · the product's different mechanism · durable constraints, assets, evidence · who must act, what they should believe, which real proof · what would make a polished result feel wrong · stack |
| Taste Skill (run step 1) | the kind of business · what is sold · who buys it · the one main action · the real material (logo, screens, photographs, prices, address, hours) |
| cinematic-ui (development, asset call) | the product truth and the one action · what can honestly be claimed · the audience arc · every asset: supplied, licensed library, AI-generated (with cost), or redesigned around a stand-in |

## Rules
- **No aesthetic questions.** Never ask about feel, mood, colours, fonts, styles or sites to imitate. Each engine runs its own direction process; Impeccable warns that a look named in a question becomes the answer.
- Never ask what Intake already established; use a reserve instead.
- Ask in the user's language, concretely, with options where they help. Six questions at most.

---

### Q1 — The visitor and the action
- **AR:** مين الزائر الأساسي، وهو في أنهي موقف، وإيه الحاجة الواحدة اللي لازم يعملها في الموقع؟
- **EN:** Who is the primary visitor, in what situation, and what is the one thing they must do?
- **Feeds:** Impeccable `## Users`, Taste "who buys it" and the main action, cinematic-ui's audience arc.

### Q2 — What is truly different, and the proof
- **AR:** إيه اللي بتقدّمه ومحدش جنبك يقدر يقوله بصدق؟ وإيه الدليل الحقيقي اللي عندك (أرقام، صور، تقييمات، عملاء)؟
- **EN:** What do you offer that a neighbour could not truthfully claim, and what real proof do you have?
- **Feeds:** Impeccable `## Positioning` and `## Evidence on Hand`, `facts.json → claims`, cinematic-ui's logline.

### Q3 — What is already decided
- **AR:** إيه اللي متقرر ومش هيتغير: الاسم، اللوجو، ألوان أو خطوط البراند، طريقة الكلام؟ وإيه المفتوح تمامًا؟
- **EN:** What is already fixed (name, logo, brand colours or fonts, voice), and what is completely open?
- **Feeds:** Impeccable `## Brand Commitments` (pins it must honour), Taste `start.mjs brand` for the client's own colours, cinematic-ui's asset list.

### Q4 — Languages
- **AR:** الموقع بيتبني من أنهي لغة الأول؟ والعربي يبقى بأنهي لهجة: مصري، فصحى بسيطة، خليجي، شامي؟ والأرقام عربي (٠١٢) ولا إنجليزي (012)؟
- **EN:** Which language leads? Which Arabic register: Egyptian, simple Modern Standard, Gulf, Levantine? Western or Arabic-Indic digits?
- **Feeds:** `bilingual.md` (lead language, register, numerals), each engine's lead-language run.

### Q5 — What would feel wrong
- **AR:** لو الموقع طلع شيك ومتظبط بس حسّيت إنه غلط، إيه اللي هيكون غلط فيه؟
- **EN:** If the result were polished but felt wrong for this product, what would be wrong about it?
- **Feeds:** Impeccable new-work ("what would make a polished result feel wrong"), the refusals each engine weighs. Ask it exactly this way: it collects the anti-direction without naming a look.

### Q6 — Material and asset policy
- **AR:** عندك إيه حقيقي: صور، فيديو، لوجو، لقطات من المنتج؟ ولو مش كفاية: نستخدم صور بديلة مرخّصة؟ ونولّد صور بالذكاء الاصطناعي (وده ليه تكلفة)؟
- **EN:** What real material do you have (photographs, video, logo, product screens)? If it is not enough: may we use licensed stand-in photographs? May we generate images with AI (it has a cost)?
- **Feeds:** Taste's photo path (`photos.mjs`), cinematic-ui's asset call, Impeccable's comp/image generation.

---

## Reserves (in order)
- **R1 — Stack for the final build:** static HTML/CSS, a framework, or "you decide". Impeccable records this as a user decision. The demo slice is static either way.
- **R2 — The use scene:** where and when the visitor opens the site (on a phone at night, at a desk at work…). Impeccable picks light or dark from the use scene, never from the category.
- **R3 — Hard requirements:** accessibility standard, legal text, regulated claims.

## Derived fields (write into answers.md)
```
primary_visitor:      ...
situation:            ...
primary_action:       ...           # verb + object, e.g. "Book a demo"
positioning:          ...
proof:                [...]
brand_commitments:    [...]         # pins engines must honour
open:                 [...]
lead_language:        ar | en
arabic_register:      egyptian | msa | gulf | levantine
numerals:             western | arabic-indic
feels_wrong:          ...
assets:               [...]         # what exists, with paths
stand_in_photos:      yes | no
ai_assets:            yes | no      # with any budget the user gave
stack:                static | <framework> | delegated
use_scene:            ...           # if asked
requirements:         [...]         # if asked
```
