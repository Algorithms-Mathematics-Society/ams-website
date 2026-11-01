# AMS website redesign plan

Date: 1 November 2026  
Status: implementation in progress. Navbar, footer, and home-page visual redesign implemented; remaining pages and outstanding performance gates are tracked below.  
Scope: the current working tree of `ams-main`, including existing uncommitted changes. Preserve those changes during implementation.

## 1. Direction

Make AMS a white-first, evidence-led institutional website: near-black typography, neutral surfaces, black primary actions, and restrained red accents. Keep the people, competitions, and actual work visible. The desired impression is precise, established, welcoming, and technically credible.

The Access products provide a useful reference for neutral surfaces, controlled geometry, and consistent components. AMS should share that discipline while retaining the spacious layouts, photographs, and explanatory content of a public-facing society website.

This is a redesign of hierarchy, page composition, and interactions as well as color. Simply changing burgundy backgrounds to black would leave too many heavy sections and preserve the current competition for attention.

### Design decisions

- White and off-white own the page canvas. Near-black owns headings, navigation, and primary actions.
- Red identifies AMS through small rules, active indicators, and selected emphasis. It does not fill headers, footers, hero backgrounds, or closing bands.
- Use natural-color event photography. Black-and-white refers to the interface, not a requirement to desaturate people, approved sponsor artwork, or documentary images.
- Keep Inter for AMS. Match Access's discipline rather than changing fonts merely to match its Geist family.
- Use a shared 3/6/9px shape scale and semantic color tokens.
- Preserve all existing public URLs. In particular, `/access` remains the partnerships page, with an explicitly separate assessment-platform section.
- Keep the existing static architecture and installed libraries. This plan does not require a new UI framework, animation library, CMS, or dark-mode toggle.

## 2. Current implementation and comparison

The review covered all nine page templates: `/`, `/derive`, `/ascent`, `/access`, `/gallery`, `/team`, `/faq`, `/blog`, and `/blog/[slug]`. The article template currently serves `welcome-to-ams` and `what-ams-actually-is`. Also include the exported 404 experience and social previews in implementation QA.

This is a source-grounded plan, not a claim that current rendered screens have been visually tested. Capture baseline desktop and mobile screenshots before implementation.

| Area | Current AMS | Access reference | Proposed AMS and reason |
| --- | --- | --- | --- |
| Dominant surfaces | Cream, burgundy, and espresso; red header/footer and repeated bands | Neutral light surfaces, with desktop dark mode | White/off-white pages and one purposeful dark section where useful. Reduce competing visual anchors. |
| Headings | Burgundy across heroes, sections, and articles | Neutral primary text | Near-black headings. Let size, spacing, and wording establish importance. |
| Primary actions | Burgundy, cream inverse, local overrides | Inverted neutral actions | Black buttons on light surfaces, white buttons on dark surfaces. Keep action meaning consistent. |
| Accent | Burgundy plus several gold roles | Purple reserved largely for focus and markers | A single red brand family. Remove gold from interface tokens. |
| Typography | Inter already used for body and display | Geist Sans and Mono | Keep Inter; retain comfortable public-site text sizes rather than application density. |
| Shapes | 4px controls, 8px media/panels, square exceptions | 3px inner, 6px element, 9px container | Adopt 3/6/9px with explicit semantic roles. |
| Layout | Good existing containers, editorial grids, real photography | Dense task-oriented shells | Retain editorial layouts. Reuse the component consistency, not dashboard density. |
| Themes | Global palette plus local Astryx overrides | Desktop canonical theme; website has multiple legacy layers | One AMS token source and one Astryx adapter. Avoid importing the reference projects' duplication. |
| Proof | Real participation figures, event images, edition-specific partners | Product status and operational evidence | Put relevant, dated evidence close to claims and actions. |

### Specific implementation findings

- `app/globals.css` defines burgundy/cream/gold tokens and also maps Astryx semantic roles onto them.
- `Header`, `Footer`, `ExperienceGrid`, `ClosingCta`, `CtaBand`, and `AccessConversation` make red a structural background.
- `PageHeader`, `SectionHeading`, blog prose, and `BlogCard.module.css` repeat red heading/link styling.
- `ClosingCta` overrides button colors with `!important` utility classes. This should become a supported shared variant.
- The site already has useful foundations: static pages, typed content, shared containers, disclosures, natural photography, and a lightweight reveal component.
- The installed AMS stack is Next.js 16.2.10, React 19.2.4, Tailwind 4, and Astryx 0.6.5. The Access references use Astryx 0.1.8. Do not copy their version-specific API or generated theme CSS into this project.
- Ascent content and the global registration CTA still advertise registration before 20 October 2026 and a 24 October qualifier. Those dates precede this review. Verify the current edition state before shipping revised status or action wording; do not invent results, extensions, or a next edition.

## 3. Proposed design system

### 3.1 Color tokens

Define these roles centrally in `apps/web/app/globals.css`, then map Astryx to the same values. The names below are proposed AMS roles; check Astryx 0.6.5's installed component requirements before selecting adapter variable names.

| Role | Value | Usage |
| --- | --- | --- |
| Canvas | `#FFFFFF` | Main page background |
| Canvas subtle | `#FAFAFA` | Quiet alternate sections |
| Surface | `#F5F5F5` | Muted panels, metadata groups |
| Text primary | `#171717` | Headings and primary body text |
| Text secondary | `#5B5B5B` | Supporting copy and captions |
| Border subtle | `#DEDEDE` | Decorative separators and card boundaries |
| Border strong | `#858585` | Necessary control outlines where appropriate |
| Inverse surface | `#171717` | Footer or one deliberate feature section |
| Inverse text | `#FAFAFA` | Primary text on dark surfaces |
| Inverse secondary | `#D4D4D4` | Supporting copy on dark surfaces |
| Accent | `#B4232F` | Small brand details and selected light-surface links |
| Accent hover | `#921C26` | Accent-link hover |
| Accent subtle | `#FDF2F3` | Small selected labels, never full-page washes |
| Accent inverse | `#FDA4AF` | Small accent details on dark surfaces |

Calculated solid-color contrast: accent on white is approximately 6.52:1; accent on `#FAFAFA` is 6.24:1; secondary text on white is 6.79:1. Strong border on white is 3.69:1. These calculations do not replace checking actual component states, opacity, photography, and adjacent colors.

Use separate semantic roles for error, success, and warning if a component requires them. An error needs explicit text and an icon or other non-color cue. Red branding must not make ordinary navigation resemble a validation failure.

### 3.2 Accent budget and surface rhythm

- Target roughly 90% or more neutral interface surfaces. Keep red around 5% or less of designed UI area as a visual-review heuristic, not a measured scientific threshold. Photographs and partner assets are excluded.
- A section may have one focal red detail: a short rule, an active indicator, or a small label. Avoid coloring its eyebrow, heading, numbers, icons, and CTA red simultaneously.
- Default primary buttons remain black, including on competition pages. Urgency should come from truthful status wording rather than red fills.
- Use black headings with occasional red punctuation or a short accent rule, not repeated red words inside headlines.
- Keep most page bodies light. The footer may be dark. A feature section can also be dark when it improves reading structure, but do not stack a dark CTA directly above a dark footer.
- On shorter pages, use no dark content section at all.
- Preserve approved partner artwork and the exact supplied AMS logo geometry. Use the existing black and white AMS SVG variants; do not recolor or redraw third-party logos.

### 3.3 Typography, spacing, and geometry

| Element | Proposed specification |
| --- | --- |
| Family | Existing Inter, loaded through `next/font`; no additional display font |
| Root | Browser-default 100%; no desktop root-font shrinking |
| Hero title | Fluid approximately 40 to 64px, weight 600, line-height 1.06 to 1.12 |
| Section title | Fluid 28 to 40px, weight 600, line-height 1.15 to 1.25 |
| Card title | 20 to 24px, weight 600 |
| Body | 16px minimum for normal prose, 1.6 to 1.75 line-height |
| Lead/article text | 17 to 18px with a bounded reading measure |
| Metadata | 13 to 14px; 12px only for genuinely secondary labels |
| Eyebrow | 12 to 13px, restrained tracking; not essential explanatory text |
| Container | Keep existing outer 80rem container and 20px/32px gutters |
| Reading measure | Keep reading container; constrain prose to approximately 65 to 75 characters |
| Section padding | Fluid 48 to 80px; compact utility sections 32 to 48px |
| Spacing scale | 4, 8, 12, 16, 24, 32, 48, 64, 80px |
| Radius inner | 3px for nested elements and compact labels |
| Radius control | 6px for buttons, inputs, disclosures where framed |
| Radius panel/media | 9px for cards, image frames, and dialogs |
| Exceptions | 0 for editorial rules; 50% for circular avatars. No arbitrary pill cards. |

Use tabular numerals for comparable figures. Preserve flexible wrapping and avoid forced desktop line breaks on mobile. Do not use all-caps styling for long labels or body copy.

### 3.4 Component and interaction contract

- **Buttons:** keep the shared `Button` wrapper. Solid is black/white; outline is transparent with neutral border and black text; inverse is white/black. Minimum target height 44px, shared 14 to 16px text sizing, consistent padding. Hover changes neutral tone without translation or scale.
- **Links:** underline inline reading links. Standalone text actions can use a shared arrow treatment. Focus and current-page identification must not depend only on red.
- **Navigation:** black text, subtle neutral hover surface, red underline plus `aria-current` for the selected route. Use the same semantics in mobile navigation.
- **Cards:** white backgrounds, thin neutral borders, 9px radii. Use cards for independent choices; use rows and rules for dense facts. Avoid nested cards around every paragraph.
- **Status:** compact text labels such as “2026 archive” or a verified edition state. Do not use red dots to suggest something is live unless it is live.
- **Focus:** 2px red outline on light surfaces with 3px offset; white outline on dark surfaces. Verify visibility around images and when scrolling beneath the header.
- **Depth:** no default card shadow. One restrained overlay shadow, for example `0 16px 48px #00000024`, for dialogs/lightboxes where needed.
- **Motion:** keep CSS and the existing `Reveal`. Target 150 to 200ms for control feedback and 400 to 500ms for below-fold entrances, within project standards. Hero and stats render immediately. No count-up statistics, autoplay, parallax requirement, or delayed primary content.
- **Accessibility:** preserve skip links, disclosure semantics, keyboard access, lightbox focus restoration, reduced motion, and visible content without JavaScript.

## 4. Shared shell redesign

### Header and mobile navigation

Replace the burgundy header with a white header, black AMS wordmark, and a subtle bottom rule. Retain the full organization name where space allows. Keep the current navigation destinations: Ascent, Derive, Partnerships, Gallery, Team, and Blog; FAQ remains easy to find in the footer and relevant sections.

Use an approximately 72px desktop header and 64px mobile header, provided the actual wordmark and tap targets fit. A black competition action belongs at the right. Until edition availability is verified, prefer a truthful exploration action over “Register” language. Use one mobile menu panel on white with generous rows and clear close behavior.

**Reason:** reduces the red field visible on every page and puts identity and destination labels first. First-time visitors should recognize AMS's scope without deciphering a decorative masthead.

### Footer and closing actions

Use a near-black footer with the supplied white AMS wordmark, readable gray supporting copy, and existing grouped links/contact details. Preserve the full canonical organization name. Convert shared closing CTAs to light bordered sections with black buttons; reserve inverse buttons for genuine dark contexts.

**Reason:** the footer provides one stable dark anchor. Repeated red closing bands currently make unrelated pages end with the same large promotional block.

### Shared implementation checklist

- [x] Update `Header`, `DesktopNav`, and `MobileNav`, including active, hover, focus, expanded, and narrow-width states.
- [x] Copy approved black/white wordmarks from `media/source-svg` into `public/brand` as needed; preserve aspect ratios.
- [x] Update `Footer` with neutral inverse styling, grouped navigation, and accessible link states.
- [ ] Update `ClosingCta` and `CtaBand`; eliminate local forced button-color overrides.
- [ ] Update `Button`, `IconButton`, `TextLink`, `ControlIcon`, `Eyebrow`, `SectionHeading`, and `PageHeader` together.
- [ ] Update `Disclosure`, `DisclosureGroup`, `Lightbox`, `PlateFrame`, and `BlogCard` to shared neutral roles.
- [ ] Validate all component states on both light and inverse surfaces.

## 5. Page-by-page redesign

### 5.1 Home `/`

**Purpose:** explain AMS quickly, help students choose a competition, and give recruiting teams a clear partnership path.

**Current composition:** Hero → StatsBand → AboutSplit → ProductCards → GallerySpread → ExperienceGrid → ClosingCta. The hero and most headings are burgundy; the experience and closing sections add large red surfaces before the red footer.

**Proposed composition:** clear introduction and photograph → dated proof strip → competition/partnership choices → concise society introduction → documentary gallery → experience → light closing action.

Changes:

1. Keep the split hero and real finals photograph. Use a black headline, restrained red eyebrow marker, black primary competition action, and outlined partnership action. Explain AMS in the first sentence.
2. Keep the four stats with black numerals, neutral rules, and their date/scope note. Preserve the distinction between community reach and Derive participation. Do not enlarge the lead statistic until it competes with the main message.
3. Move `ProductCards` ahead of the longer society introduction. Keep its three-column editorial structure, with readable classifications for Derive, Ascent, and partnerships. Use a compact, verified status line on each rather than promotional color blocks.
4. Shorten the introduction where it repeats the hero. Keep an identifiable team link and one real photograph.
5. Keep the gallery on white, with captions and an obvious gallery link. Do not give every image a decorative red frame.
6. Make `ExperienceGrid` an off-white section with neutral rows. The people and their work provide energy; the entire section need not be red or black.
7. Make `ClosingCta` a light, ruled two-path section: explore competitions and discuss a partnership. Use the shared button variants.

**Why / expected audience impact:** students reach the right contest sooner; recruiters see a legitimate commercial contact path without taking over the student journey; newcomers see a plain definition, people, and scoped evidence before institutional detail. These are hypotheses to validate, not guaranteed conversion gains.

**Files:** `app/page.tsx`; the seven existing home section components; `content/homeHero.ts`, `products.ts`, `stats.ts`, `institutionalOverview.ts`, `experience.ts`, and `cta.ts`.

- [x] Reorder sections and remove repeated introductory copy.
- [x] Implement neutral hero, proof strip, program choices, and experience section.
- [x] Use evergreen exploration actions in the header and home hero; broader edition-status verification remains in the Ascent checklist.
- [x] At mobile width, expose the AMS definition and both audience paths as readable text actions. User-study comprehension remains to be validated.

### 5.2 Derive `/derive`

**Purpose:** explain quantitative reasoning competitions and document the completed 2026 edition honestly.

**Current:** photo-led hero → dark journey → partner cards → burgundy closing CTA.

**Proposed:** white hero with “Derive ’26” archive context → concise format and progression → partners on white → gallery link → light next-edition enquiry.

- Keep the photo and the rules link; identify the rules as belonging to the 2026 edition.
- Use a neutral timeline for the progression. Black numbers and thin red stage markers establish hierarchy without a colored funnel.
- Preserve all four distinct facts: 2,500+ participants, 150 advanced, 50 qualified for finals, 33 competed in person. Show the final two together so qualification and attendance cannot be confused.
- Prefer a white/off-white journey to the current full dark band, making partner and photograph content feel connected.
- Replace burgundy partner-logo wells with the white or black surface required by each supplied asset. Keep approved aspect ratios and edition-specific partner descriptions.
- Retain enquiry wording for future editions unless a verified registration destination exists.

**Why / impact:** students see a challenging but understandable progression; recruiters can assess the evidence without implied hiring guarantees; newcomers get a documented history rather than an apparently live event landing page.

**Files:** `sections/derive/DeriveHero.tsx`, `DeriveJourney.tsx`, `DerivePartners.tsx`; `content/derive.ts`; relevant `content/seo.ts` entries only if facts change.

- [ ] Apply archive context, neutral timeline, and explicit qualified/attended distinction.
- [ ] Check sponsor artwork against its new surface and retain `#partners`.
- [ ] Add a clear route to the finals gallery and verify next-edition action wording.
- [ ] Confirm metadata and Event JSON-LD still describe the actual edition.

### 5.3 Ascent `/ascent`

**Purpose:** explain the systems contest, participation requirements, and the current next step.

**Current:** hero with registration status → preparation facts → pillars → contest format → registration CTA. Multiple locations still say registration is open for dates that have passed.

**Proposed:** white hero → compact verified status/essential facts → participation requirements → three technical disciplines → contest sequence → contextual action.

- Make the hero headline black and the discipline names readable text, not decorative colored badges.
- Replace the oversized emphasis on registration with a neutral facts panel: edition, verified state, format, eligibility, and authoritative schedule link.
- Establish explicit content states: upcoming, registration open, registration closed/in progress, completed, and details awaiting confirmation. Store the verified state and checked date in typed content; render only relevant actions.
- Do not infer completion or results solely because a scheduled date passed. If confirmation is unavailable, remove the unverified open-registration claim and link to the official schedule.
- Present requirements as concise labeled rows. Keep fees, team requirements, and required materials easy to scan.
- Use three equal neutral columns for C++, optimization, and performance engineering, stacked on mobile.
- Keep planned events labeled as planned until confirmed. Avoid countdowns and artificial urgency.

**Why / impact:** students can judge readiness and eligibility without unnecessary pressure; recruiters understand the skills being assessed; first-time visitors encounter maintained, reliable information. Correct status is more important to trust than decorative polish.

**Files:** all `sections/ascent/*`; `content/ascent.ts`; `content/site.ts`, `products.ts`, `faq.ts`, `seo.ts`, relevant metadata, and `public/llms.txt` wherever status is repeated.

- [ ] Verify current status and run the complete fact-sync map.
- [ ] Replace stale registration actions across the website, not only this page.
- [ ] Implement neutral status, requirements, disciplines, and format sections.
- [ ] Check all state/action combinations for truthful labels and valid destinations.

### 5.4 Partnerships `/access`

**Purpose:** help sponsors and recruiting teams understand fit and start a useful conversation; explain assessments separately.

**Current:** partnership hero → two competition opportunities and historical proof → burgundy contact section → assessment-platform note. The route name can be confused with the Access product.

**Proposed:** white partnership hero → scoped evidence → competition opportunities → separate assessment option → light contact section with next steps.

- Keep the visible page and navigation label “Partnerships.” Retain `/access`, `#sponsor`, `#contact`, and `#assessments` to protect existing links.
- Keep the real interview photograph and caption. Use black primary text and a small red marker, with sponsorship and recruiting paths clearly labeled.
- Move the existing Derive evidence closer to the introduction. Clearly name the 2026 edition and the actual partner roles; do not imply current sponsorship of all AMS activity.
- Keep Ascent and Derive opportunities in two open columns with subtle top rules. Explain audience, demonstrated work, and involvement in parallel fields.
- Position the separate assessment option before the final contact section. Describe Access as a product, not another competition or a promised recruiting outcome.
- Convert `AccessConversation` to a white/off-white section. Make the email selectable and keep the practical “what happens next” sequence. Use a black email action.
- No new enquiry form is required for this redesign. The existing email path avoids unnecessary friction and infrastructure.

**Why / impact:** recruiters can determine relevance and identify a concrete next step; students are less likely to read the page as a promise of placement; first-time visitors can distinguish society, competitions, sponsorship, and software.

**Files:** all `sections/access/*`, `content/access.ts`, `app/access/page.tsx`.

- [x] Move edition-scoped proof upward and clarify the three engagement types.
- [x] Reorder the assessment and contact sections while preserving anchors.
- [x] Replace the red contact surface and unify action styling.
- [x] Check mail links, readable addresses, sponsor scope, and product naming.

### 5.5 Gallery `/gallery`

**Purpose:** provide credible, human evidence of AMS events.

- Replace burgundy introductory typography with black; use date/location metadata and one small red label.
- Keep the existing gallery manifest, thumbnails, captions, and lightbox. Use a neutral background and consistent 9px image frames.
- Preserve natural photographic color, subjects, and documentary context. Do not crop away important people merely to force a uniform grid.
- Maintain a coherent grid with reserved image dimensions. Mobile should prioritize recognizable photographs over tiny dense tiles.
- Use a near-black lightbox with white controls, readable captions, keyboard navigation, Escape dismissal, and restored focus.
- Replace the large promotional closing band with a compact link to the Derive story or relevant competition.

**Why / impact:** real participation supports student belonging and recruiter confidence. Accurate captions help newcomers distinguish documented events from generic promotional imagery.

**Files:** `GalleryIntro`, `GalleryGrid`, `GalleryBrowser`, `GalleryClosing`, `Lightbox`, `LightboxPhoto`, `content/gallery.ts`.

- [x] Neutralize page chrome while retaining natural-color photography.
- [x] Verify crops, alt text, captions, image sizes, and lightbox states.
- [x] Verify keyboard/touch navigation and reserved image frames.

### 5.6 Team `/team`

**Purpose:** make responsibility and the people behind AMS visible.

- Use a compact black page title on white and concise explanatory copy.
- Retain the current people and verified roles. Use consistent portrait treatment where portraits exist, but do not invent missing photographs or credentials.
- Set names in black, roles in readable secondary text, and profile links in the shared underlined treatment. Use spacing and neutral rules rather than red cards.
- Keep any founder/editorial emphasis proportional; avoid an oversized profile that obscures the rest of the team.
- Retain stable person anchors, especially `#tilak-jain`, which article bylines reference.
- Make the contribution/contact CTA a light, specific invitation using existing approved destinations.

**Why / impact:** students see an approachable organization; recruiting teams see identifiable responsibility; newcomers can connect the brand to actual people. A purely corporate monochrome treatment could feel remote, so preserve human photographs and plain language.

**Files:** `TeamIntro`, `TeamGrid`, `TeamClosing`, `Team.module.css`, `content/team.ts`, and `app/team/page.tsx`.

- [x] Apply consistent portrait/name/role hierarchy and neutral dividers.
- [x] Preserve person anchors, links, and accurate structured data.
- [x] Verify that contribution wording does not imply unconfirmed openings.

### 5.7 FAQ `/faq`

**Purpose:** resolve practical uncertainty with minimal effort.

- Use a compact introduction and a readable single-column answer area.
- Organize existing questions into clear topics: AMS, competitions, participation, partnerships, and assessments. At the present scale, headings and anchor links are preferable to a search feature.
- Use white disclosure rows with neutral dividers, black questions, readable gray answers, and one consistent expand/collapse icon.
- Keep active/open state apparent through icon and layout changes rather than red alone.
- Keep answers self-contained and explanatory. If a question changes, generate FAQ schema from exactly the same content source.
- End with a simple contact link for unanswered questions rather than a large campaign CTA.

**Why / impact:** students can find eligibility and practical details, recruiters can distinguish engagement options, and newcomers can understand AMS without remembering product names from earlier pages. This applies the recognition-over-recall principle described in [NN/g's usability guidance](https://www.nngroup.com/articles/recognition-and-recall/).

**Files:** `FaqList`, `Disclosure`, `DisclosureGroup`, `content/faq.ts`, `app/faq/page.tsx`.

- [ ] Group questions without duplicating or changing facts inadvertently.
- [ ] Verify disclosure keyboard behavior, heading hierarchy, and stable topic anchors.
- [ ] Keep rendered answers and FAQ JSON-LD synchronized.

### 5.8 Blog index `/blog`

**Purpose:** establish a readable publication area for the society's work and explanations.

- Use a white editorial header with a black title and short description.
- Keep the current two articles in a balanced layout; do not add filters, empty categories, or pagination before enough content exists.
- Use white cards, neutral borders, 9px media corners, black titles, restrained metadata, and natural cover images.
- Remove duplicated color definitions in `BlogCard.module.css`; map local Astryx roles to shared AMS tokens.
- Keep author and publication date visible. Use a single clear article link without confusing nested interactive targets.
- Replace the generic full-width colored closing band with a quiet route to competitions or the society overview.

**Why / impact:** students can browse useful context without marketing pressure; recruiters see substantive writing; first-time readers encounter a coherent publication rather than another promotional landing page.

**Files:** `BlogGrid`, `BlogCard.tsx`, `BlogCard.module.css`, `content/blog.ts`, `app/blog/page.tsx`.

- [x] Update card token mapping, image frames, metadata, hover, and focus states.
- [ ] Check both existing article cards and variable-length future titles.
- [x] Keep the current small content collection easy to scan without empty UI.

### 5.9 Blog article template `/blog/[slug]`

**Purpose:** support focused reading and make author, date, and context clear.

- Apply the redesign to both `/blog/welcome-to-ams` and `/blog/what-ams-actually-is`, and to future generated articles.
- Set title, headings, and strong text in near-black. Keep body text 17 to 18px and approximately 65 to 75 characters per line.
- Keep underlined links; red may identify those links on light backgrounds. A link must remain recognizable without color perception.
- Use one thin red quote rule if desired, with black quote text. Neutralize tag backgrounds and image borders.
- Use neutral code-block surfaces and readable code text. The current global rule forces code-token colors to a single ink color; choose either intentional monochrome code or an accessible syntax theme, and document the choice instead of accidentally overriding the highlighter.
- Keep the author/date visible, retain the article image and accurate metadata, and provide a clear “All articles” link.
- Add a table of contents only if article length and structure warrant it. End with a contextual link, not an oversized promotional interruption.

**Why / impact:** sustained reading is easier when visual emphasis matches meaning. Students can absorb technical detail; recruiters can inspect substance; newcomers can understand context without competing banners.

**Files:** `app/blog/[slug]/page.tsx`, `.blog-prose` in `globals.css`, `lib/blog.ts` only if code rendering changes, and shared article primitives extracted as necessary. Preserve authored Markdown content.

- [x] Implement readable neutral prose, headings, links, quotes, tags, and code.
- [ ] Check both current articles and a local long-content fixture with lists, code, images, and long URLs.
- [x] Preserve author links, canonical URLs, cover metadata, and BlogPosting JSON-LD.

### 5.10 Supporting surfaces

- **404:** add or restyle the exported not-found page with shared shell, a concise explanation, and links to home and competitions. Avoid a red error-screen aesthetic.
- **Social previews:** update the shared OG image to a black/white composition with a restrained red marker. Preserve article-specific covers where appropriate; assess how they appear beside the new brand treatment.
- **Favicons and app icons:** use supplied artwork with a high-contrast background; verify legibility at small sizes.
- **Missing images/content:** preserve reserved dimensions and useful fallback wording; do not ship empty decorative frames.

- [ ] Verify a real missing-route response in the static preview.
- [ ] Review social previews and icons at their actual small display sizes.
- [ ] Confirm sitemap, robots, metadata, and `llms.txt` retain the intended public routes and identity.

## 6. Audience psychology: hypotheses and safeguards

These are design hypotheses, not claims that black causes trust or red causes anxiety in every person. Meaning depends on context, familiarity, culture, content, and usability. A polished appearance may improve perceived usability without improving task performance, so test both separately. See [NN/g's discussion of the aesthetic-usability effect](https://www.nngroup.com/articles/aesthetic-usability-effect/).

| Audience | Desired response | Design mechanism | Risk and mitigation | Validation task |
| --- | --- | --- | --- | --- |
| Students | “I understand the opportunity and can judge whether to take part.” | Clear disciplines, truthful status, visible requirements, real participant photography | Monochrome can feel exclusive or cold. Keep people, plain language, and transparent participation details. | Find the relevant competition, explain its requirements, and identify the next valid action. |
| Recruiters and sponsors | “This organization is organized, relevant, and accountable.” | Edition-scoped proof, clear skill descriptions, identified people, direct contact and next steps | Minimalism can hide the evidence needed for a decision. Keep relevant facts beside the offer and avoid vague prestige claims. | Explain partnership versus assessment, identify evidence, and locate the correct contact. |
| First-time viewers | “I know what AMS is and where to go.” | Full name, direct opening definition, consistent navigation, limited competing accents | Acronyms and an overly sparse hero can leave the purpose unclear. Keep a concrete definition and human/event context. | After a short first view, describe AMS, name one offering, and find a relevant route. |

Red becomes more noticeable because it is rare in the interface. That is an intended hierarchy effect, not evidence that red alone increases engagement. Large dark blocks are also visually dominant, so replacing all red blocks with black would undermine the goal.

Do not use invented scarcity, countdown pressure, placement guarantees, or exaggerated selectivity to create emotional impact. Confidence should come from clear information and demonstrable work.

## 7. Implementation sequence and completion tracking

All unchecked boxes are future work. Mark a box complete only with a reviewed implementation and relevant evidence. See the implementation log below for completed phases.

### Phase 0: baseline and content audit

- [ ] Capture all current routes at desktop and mobile widths; save representative interaction states.
- [ ] Record current performance and accessibility baselines.
- [ ] Preserve existing uncommitted work and identify overlapping edits before implementation.
- [ ] Verify Ascent's current state and authoritative external destinations.
- [ ] Inventory red/gold/cream classes, inline colors, SVG variants, and Astryx token overrides.

### Phase 1: foundations and representative review

- [ ] Add semantic neutral/red tokens and 3/6/9px radii.
- [ ] Map installed Astryx 0.6.5 components to those tokens without importing a second reset or another theme system.
- [ ] Create a local review fixture for buttons, links, cards, disclosures, navigation, text, and inverse surfaces. Do not expose it in the public sitemap.
- [ ] Redesign header/footer and home hero/proof/program sections as the representative direction.
- [ ] Review desktop/mobile hierarchy, accent usage, contrast, and natural photography before applying the pattern site-wide.

### Phase 2: all pages

- [x] Home visual implementation and responsive/interaction review complete.
- [ ] Home performance meets the project LCP and Lighthouse gates.
- [ ] Derive complete.
- [ ] Ascent complete, including verified state and fact synchronization.
- [ ] Partnerships complete, with preserved anchors.
- [ ] Gallery complete, including lightbox.
- [ ] Team complete, including person anchors.
- [ ] FAQ complete, including disclosure states and schema.
- [x] Blog index complete.
- [x] Article template and both current article routes complete.
- [ ] 404, OG images, and icon review complete.

### Phase 3: remove styling drift

- [ ] Replace legacy palette classes in live components with semantic roles. Temporary aliases may support incremental migration but must not conceal missed inverse-surface changes.
- [ ] Remove obsolete burgundy/cream/gold UI tokens once references are migrated; retain historical or approved brand assets when appropriate.
- [x] Consolidate `BlogCard` overrides and other duplicated theme values.
- [ ] Remove one-off radius, button, hover, and focus treatments unless documented exceptions are necessary.
- [ ] Check current, hover, focused, expanded, disabled, and inverse variants across the component set.
- [ ] Update `ENGINEERING_GUIDE.md` and the project skill where the approved visual rules change. Preserve architecture, performance, and SEO requirements.

### Phase 4: validation and release readiness

- [ ] `pnpm lint`, `pnpm typecheck`, and `pnpm build` pass; all generated pages remain static.
- [ ] Run `pnpm --filter web check:seo` and review affected metadata/structured data.
- [ ] Check 320, 375, 768, 1024, and 1440px widths, plus 200% zoom and long-content cases.
- [ ] No page-level horizontal overflow; code regions may scroll independently.
- [ ] Keyboard-only navigation works for header, mobile menu, disclosures, links, and lightbox; focus is not hidden behind the sticky header.
- [ ] Normal text meets 4.5:1 contrast; large text meets 3:1; required control boundaries and state indicators meet applicable 3:1 non-text contrast.
- [ ] Preserve the project's 44px target standard and ensure error/current/status meaning is never communicated by color alone.
- [ ] Reduced-motion and JavaScript-disabled checks keep meaningful content accessible.
- [ ] Verify target budgets on a production build: LCP ≤ 2.0s, CLS < 0.05, INP < 200ms where representative interaction measurement is available, home JS ≤ 100KB gzipped, and Lighthouse ≥ 95 under documented mobile conditions. Lighthouse is not a substitute for field INP.
- [ ] Check image `sizes`, reserved dimensions, thumbnail payloads, and below-fold lazy loading.
- [ ] Verify sponsor names, counts, dates, links, and all changed fact surfaces together.
- [ ] Review before/after screenshots and complete audience-task testing.

The accessibility gates above follow [WCAG 2.2](https://www.w3.org/TR/WCAG22/). The repository's 44px target requirement is stricter than WCAG 2.2 AA's general 24px minimum target criterion; keep the project standard.

## 8. How to evaluate whether the redesign worked

Use a small formative study with approximately five people from each audience, including first-time mobile visitors. This sample identifies usability problems; it does not establish statistically reliable conversion effects.

1. Show the current and proposed designs in counterbalanced order with equivalent content where possible. Record when corrected factual content prevents a clean visual comparison.
2. Ask participants to describe AMS after a short first impression. Score whether they identify competitions and the society, rather than mistaking the site for only an assessment vendor or a recruiting agency.
3. Run the audience tasks in section 6. Record success, wrong turns, time, and the wording participants find confusing.
4. Ask separately about clarity, credibility, approachability, and visual preference. Do not substitute “looks mature” for successful navigation.
5. Investigate failures before release. Proposed acceptance targets: at least four of five participants in each group complete their main task without assistance, no recurring confusion about partnerships versus Access software, and no loss of student approachability relative to the baseline.
6. After release, use existing approved analytics if available to compare relevant navigation/action completion. Do not add tracking as an implicit part of this design task. Do not treat more registration clicks as success when registration is closed.

## 9. Definition of done

The redesign is complete when every listed route and shared state follows one neutral/red system, old red background bands and gold interface accents are removed, the content is accurate, the page and audience checklists are satisfied, and the static/performance/accessibility gates pass.

The intended result is a coherent AMS identity: black and white establish structure, red provides recognition, and the competitions, evidence, and people provide the substance.


## Implementation log

### Navbar and footer: 1 November 2026

- Implemented by separate navbar/footer subagents and checked by an independent review subagent.
- White header, black supplied wordmark, neutral action, and red active-route/focus indicator. Header height is 64px below 1024px and 72px above it.
- Near-black footer, white supplied wordmark, readable supporting text, neutral dividers, and grouped competition/partnership/society links. All destinations and the canonical name retained.
- Added an evergreen “Explore competitions” header action to `/#competitions`. Other edition-specific content remains pending the planned content audit.
- Mobile navigation uses a native modal dialog, keyboard focus containment, Escape dismissal, scroll restoration, and desktop-resize cleanup. A no-JavaScript navigation fallback remains available.
- Shell CSS modules consume scoped `--shell-*` tokens so existing page styling is preserved during migration. Header actions temporarily use a shared shell style rather than changing the still-burgundy global Button component.
- Browser verification: 320, 375, 768, 1024, 1280, and 1440px; no observed page overflow, 44px shell targets, active article navigation, modal keyboard/resize/route cleanup, and no-JavaScript mobile navigation.
- Lint, TypeScript, production build, SEO checks, and diff whitespace checks passed. Current routes remain statically generated.
- Production homepage Lighthouse spot-check: performance 92, accessibility 100, LCP 3.3s, CLS 0, TBT 20ms. The current page misses the project performance/LCP gates; no pre-change performance baseline was measured, so this result does not establish the cause or a regression. Field INP and actual browser-level 200% zoom remain unverified.
- Production checks also passed skip-link focus, competition-anchor clearance, and short-landscape modal scrolling.
- Page bodies, closing CTA bands, and remaining checklist items are not included in this phase.


### Home page: 1 November 2026

- Separate top-section and story-section subagents implemented the page; an independent subagent reviewed responsive layouts, keyboard paths, and rendered screenshots.
- All seven sections now use white/off-white surfaces, near-black text, sparse red markers, 6px actions, and 9px media/cards. The existing neutral header and dark footer are unchanged.
- Program choices now precede the longer society story. Removed the repeated mandate grid; retained natural-color photography, dated participation counts, scoped Derive evidence, and separate student/partner actions.
- Header and hero actions share an evergreen competition overview destination. Home-only promotional copy no longer advertises dated registration or implies current availability; this does not resolve stale Ascent content elsewhere.
- Home navigation actions use native server-rendered links with shared neutral styles; no new dependencies. No change to approved counts, dates, sponsors, or event claims. Existing SEO checks passed after copy updates.
- Browser review passed 320/375/768/1024/1440px, visible 44px targets, one H1, heading order, no overflow, reduced-motion and JavaScript-disabled content visibility. Hero and stats remain unanimated. Skip link and competition-anchor clearance verified. Actual browser zoom and audience psychology have not been empirically tested.
- Tablet refinement: two competition cards followed by a full-width partnership card, restoring three columns at desktop. Internal route arrows now point right rather than suggesting external destinations.
- Production Lighthouse spot-check before the final tablet CSS refinement: performance 94, accessibility 100, LCP 3.0s, CLS 0, TBT 20ms. Prior shell-phase spot-check was performance 92 and LCP 3.3s; these single runs are indicative, not a controlled performance study. LCP remains above 2.0s and performance below 95, so those release gates remain open. Field INP and the complete JS-transfer budget remain unverified.


### Home scrolling journey refinement: 1 November 2026

This iteration supersedes the earlier three-card layout and section sequence in the home implementation log.

- **Orient:** retain an immediate definition, clear actions, and an unboxed hero photograph. Captions sit outside the image rather than in a card footer.
- **Establish context:** retain dated, scoped participation figures; avoid new claims or artificial urgency.
- **Let visitors choose:** compare Derive and Ascent in two open editorial columns with clear individual links. Put sponsorship/recruiting in a separate row, since it is an audience path rather than a third competition.
- **Explain before showcasing:** move the historical Derive sequence immediately after the discipline comparison. Three readable steps replace the repeated hall photograph and remove a promotional fourth step from the historical account.
- **Show the experience:** follow the sequence with an uncropped lead group photograph and two smaller documentary frames. Use the full lead source with responsive sizing, preserve captions, and retain natural colors. On phones the lead remains full-width with the supports side by side.
- **Make the organization approachable:** follow the event evidence with the society introduction, a team link, and an explanatory article. Put the explanation first in mobile DOM order, then its accurately captioned interview photograph.
- **Resolve intent:** finish with separately described competitor and partner next steps rather than repeating the hero's two buttons without context.

The intended effects are easier comparison, less repeated box framing, clearer audience distinctions, and a progression from explanation to evidence to action. These remain design hypotheses; no user-study or conversion improvement is claimed.

Validation: lint, TypeScript, production build, SEO checks, and whitespace checks passed. Browser checks at 320/375/768/1024/1440px found no horizontal overflow or undersized visible targets. JavaScript-disabled and reduced-motion content remain visible. Latest production Lighthouse spot-check: performance 95, accessibility 100, LCP 2.9s, CLS 0, TBT 40ms. The Lighthouse score reaches its target in this run; the 2.0s LCP target remains unmet. Older performance entries above describe earlier iterations.


### Opening hero refinement: 1 November 2026

Scope: the opening hero only. Navigation, footer, and the approved lower-page journey are retained. Three specialist agents reviewed visual direction, visitor cognition/color, and frontend feasibility.

| Direction considered | Strength | Reason for selection or rejection |
| --- | --- | --- |
| Asymmetric editorial hero | Strong typography alongside authentic human evidence | Selected: fits the existing white shell and keeps actions visible early |
| Full-width statement and panorama | Biggest compositional departure | Deferred: pushes the photograph farther down smaller screens |
| Immersive photograph with dark text panel | Strong event atmosphere | Deferred: heavier transition from navigation and more contrast complexity |

- [x] Replace the descriptive headline with “Think deeply. Build boldly.”, keeping the factual competition description directly beneath it.
- [x] Increase desktop headline scale to 88px; use intentional line breaks and responsive sizing.
- [x] Replace the distant hall scene with the existing natural-color `in-the-zone` photograph. Preserve the event caption and gallery destination.
- [x] Make competition exploration the sole filled action; retain partnership as a text link. Team discovery remains in the society section.
- [x] Add an open, fine-rule discipline row, avoiding extra boxed panels.
- [x] Reserve red for punctuation, small indices, and existing focus treatment. Retain 6px action and 9px photo radii.
- [x] Keep server rendering, one eager hero image, and static presentation without new dependencies.
- [x] Pass lint, types, production build, SEO, and whitespace checks.
- [x] Browser review at 320/375/768/1024/1440px: no overflow or runtime errors, 44px hero link heights, eager image loading, and JavaScript-disabled heading visibility.
- [ ] Validate engagement and comprehension with representative visitors.

Audience hypotheses: students may find the active invitation and close human photograph more approachable; recruiters retain concrete discipline and event context; newcomers receive both a memorable phrase and an immediate plain-language explanation. These are design intentions, not measured psychological or conversion effects. The earlier LCP/field-performance limitations remain open; this iteration does not claim new performance measurements.


### Immersive hero correction: 1 November 2026

The user clarified that the missing quality was immersion, not stronger copy.
This supersedes the preceding editorial-split decision. The headline is retained;
the spatial treatment changes from two adjacent blocks to one full-width event scene.

- [x] Extend the actual finals photograph across the entire hero, removing the photo-card boundary and outer white gutters.
- [x] Integrate white text and actions into the scene with directional dark gradients. Retain natural image colors and a small red eyebrow marker.
- [x] Place event context and the gallery link along the scene's bottom rail. Remove the redundant discipline rail.
- [x] Adapt the phone composition to prioritize the participant above the readable text area; preserve natural scrolling.
- [x] Keep static rendering, an eager responsive image, and no animation or new dependency.
- [x] Verify 320/375/768/1024/1440px, small-phone CTA visibility, keyboard focus, no-JS heading, image loading, and absence of overflow/runtime errors.
- [x] Pass lint, types, production build, SEO, and whitespace checks.

The intended effect is a sense of being present at an AMS event, supported by authentic people and contextual captioning. This remains an audience-response hypothesis. Production Lighthouse spot-check: performance 94, accessibility 100, LCP 3.0s, CLS 0. Performance and LCP release targets remain open; field INP and JS-transfer budget are not newly verified.


### Homepage messaging informed by sales/: 1 November 2026

Sources reviewed: `../sales/foundations.md` sections 1, 7-9, and 15, plus
`../sales/AMS_ACCESS_AUDIENCE_PERSPECTIVE.md` (audience selection, evidence, and matching next steps).
The Access brief supplies a messaging method, not product claims for this society homepage.
The sales repository's illustrative CRM fixtures and example commercial outcomes are not used as public evidence.

Applied sequence: visitor interest → relevant competition → dated evidence and process → people → audience-specific next step.
The immersive photograph, navigation, footer, and section order remain intact.

| Section | Before | Implemented wording and rationale |
| --- | --- | --- |
| Hero | “Think deeply. Build boldly.” and a broad invitation | “Find your next challenge.” with explicit quant/systems context. Gives participants a recognizable purpose and a next step without promising career outcomes. |
| Proof band | “AMS in numbers” | “The community behind the contests.” Preserves existing dated counts, labels, and subset clarification. Reach remains distinct from participation. |
| Competition choice | “Different strengths. A shared ambition.” | “Choose the problems you want to solve.” Descriptions explain actual tasks. The Derive evidence line now names the edition and final venue rather than compressing four stages into an unexplained sequence. |
| Partner invitation | “Hiring or supporting the next generation?” | Names quant/systems talent and asks whether sponsorship and recruiting conversations fit the team's goals. The action is “Explore partnerships.” |
| Historical process | “From the first round to the final room.” | “See how a competition unfolds.” The eyebrow retains Derive '26 scope. Two online rounds and the existing top-150 progression make the process concrete. |
| Gallery | “A day at Derive '26.” | “Beyond the problem set.” Supporting copy ties the photographs to arrival, shared experience, and the finish, retaining place and date. |
| Society | “Good problems bring capable people together.” | “A shared interest. A reason to meet.” The paragraph defines what AMS does and explains both participant and partner involvement. |
| Closing | Generic next move and connection language | “Start with what brings you here.” Explicit participant and recruiter/sponsor labels, with separate competition-exploration and partnership-conversation paths. |

Psychological considerations are design hypotheses, not measured effects:

- **Students:** task-specific language supports self-selection; format and requirements links give a manageable first step. Copy avoids superiority tests and career promises.
- **Recruiters/sponsors:** wording starts from audience and objectives, making a fit conversation more useful than a generic sponsorship pitch. No hiring results or unrestricted participant access are promised.
- **First-time visitors:** an immediate category explanation, dated proof, and a historical process help answer what AMS does and what participation looks like.
- **Choice and attention:** one filled hero action remains dominant; secondary audience paths become explicit further down the page. No artificial urgency or countdown is introduced.

Typography and spacing:

- Retain the 42-88px fluid hero and 28-40px section headings. Copy is rewritten to fit the hierarchy rather than shrinking body text.
- Hero supporting text uses a 46ch maximum reading width; society copy is capped at 52ch. Body text remains 16px with 1.75 line height.
- Hero event caption increases from 12px to 13px. Closing audience labels use 12px semibold type above 22px headings, with an 8px label-to-heading gap and 16px content rhythm.
- Retain 48-80px section spacing, 44px minimum link targets, and aligned desktop closing actions.

Completion:

- [x] Review actual sales strategy and audience materials.
- [x] Revise all seven home sections and distinguish participant/partner intent.
- [x] Preserve verified counts, event dates, and documentary image claims.
- [x] Validate lint, TypeScript, production build, SEO, and whitespace.
- [x] Check 320/375/768/1024/1440px for overflow, heading hierarchy, and 44px links; no runtime errors.
- [x] Review rendered mobile hero and desktop closing layouts; verify no-JS hero visibility.
- [ ] Test comprehension and next-step selection with students, recruiters, and first-time visitors.

Suggested user-test prompts: “What does AMS offer?”, “Which contest fits your interests?”, “What happened in the last edition?”, and “Where would you go to discuss recruiting or sponsorship?” Record correct destination selection and misunderstood claims before judging conversion.

Production spot-check after this messaging pass: Lighthouse performance 94, accessibility 100, LCP 3.0s, CLS 0. These match the previous immersive-hero spot-check; the performance >=95 and LCP <=2.0s targets remain unmet. This is a single lab run, not field evidence.


### Final photo framing and independent review: 1 November 2026

- [x] Reframe the existing photograph for the supplied wide desktop composition: use 54% vertical positioning from 1024px, reducing upper wall and exposing more working context while preserving headroom.
- [x] Use 35% vertical positioning above 2200px to prevent excessive top cropping on ultrawide displays. Mobile retains its separately reviewed framing.
- [x] Set hero quality to the configured supported value of 75. No image file changes, additional downloads, or new client code.
- [x] Independent design review of the complete desktop/mobile journey: consistent spacing, heading hierarchy, gallery presentation, and shell alignment; no lower-section changes required.
- [x] Independent audience review: clear student/recruiter routes, scoped historical evidence, and no unsupported outcome promises. Psychological effects remain hypotheses.
- [x] Whole-page frontend review: responsive layout, image loading/alt text, heading structure, 44px targets, skip link, mobile modal focus/Escape/restoration, anchor clearance, reduced motion, and no-JS fallback. All 12 internal destinations returned HTTP 200.
- [x] Lint, TypeScript, production build, SEO, and whitespace checks passed after the crop adjustment.

Earlier lab performance limitations remain open; this visual correction does not claim an improvement to LCP or field INP.

Desktop horizontal refinement: shift the photo right by 6vw (48-120px), retaining the reviewed vertical crop. A feathered left edge blends into the dark hero background; section clipping prevents horizontal overflow. Mobile and tablet remain unchanged.


### Photo selection and slideshow review: 1 November 2026

Decision: retain a single static hero. The homepage needs one clear entry point;
the scrolling sequence already reveals several dimensions of AMS. The existing
hero focal positioning, including manually adjusted horizontal values, is preserved.

| Placement | Selected photo | Intended role and framing |
| --- | --- | --- |
| Hero | `in-the-zone` | A recognizable individual doing the actual activity. Keep the face right of the copy, retain laptop context, and use the existing responsive crop. |
| Statistics / discipline comparison / historical stages | No additional photo | Let people read counts, compare choices, and understand the process without repeated visual interruption. |
| Gallery lead | `the-full-room` | Show the actual cohort together. Keep this as the large uncropped landscape frame; people become too small if relegated to a supporting thumbnail. |
| Gallery supporting top | `goodies-distribution` | A concrete welcome/arrival moment with visible interaction. The image's purpose is participation, not a promise of merchandise for future editions. |
| Gallery supporting bottom | `debating-the-problem-set` | Participants exchanging ideas. Replaces the cheque photo so the homepage communicates more than individual performance and winning. |
| Society / partner context | `finalists-meet-the-interviewers` | Evidence of actual historical partner conversations, explicitly captioned as Derive '26. It is not an AMS team portrait or a future interview guarantee. |
| Full archive | Prize, chess/social, hall, and other documentary photos | Visitors can intentionally explore these dimensions after understanding the society. Existing archive records remain available. |
| Closing invitation | No photo | Leave the participant and partner choices visually clear. |

Alternatives considered:

- **Automatic hero slideshow:** rejected for this homepage. Different compositions need separate crops/contrast checks; image changes compete with reading, controls add visual burden, and additional image requests complicate existing loading targets. This is a contextual recommendation, not a claim that every carousel is ineffective.
- **Manual hero slideshow:** retains user control but adds an interaction unrelated to the main competition/partnership decision. Keep manual exploration in the existing gallery instead.
- **Background video:** no suitable approved video is established; adds loading and motion considerations without answering a new visitor question.
- **Hall panorama as hero:** documents scale but has less visible individual activity at small sizes. Useful in event-specific material and the archive.
- **Prize-led hero:** emphasizes an outcome available to few participants. The homepage should also explain the broader participation experience.
- **Chess/social hero:** shows community, but could misidentify the primary activity before the quant/systems explanation is read.

Audience intentions, not measured psychological findings: a focused person helps students recognize the activity; arrival and discussion photos broaden the invitation; the cohort provides historical context; partner conversations supply relevant evidence for firms. Viewers may respond differently, so these selections should be tested rather than described as conversion improvements.

External guidance consulted:
- [W3C carousel accessibility tutorial](https://www.w3.org/WAI/tutorials/carousels/): moving carousels need user control, including pausing, with keyboard and assistive-technology support.
- [NN/g usability observations on automatic forwarding](https://www.nngroup.com/articles/auto-forwarding/): observed reading, visibility, and control problems. These findings inform the decision but do not establish a measured result for AMS.

- [x] Visually inspect the current and alternative documentary photos.
- [x] Keep the reviewed hero composition and avoid additional initial image requests.
- [x] Move homepage supporting placement from prizes to discussion; retain both archive entries and update the gallery introduction.
- [ ] Validate audience interpretation with representative students and recruiting partners.


### Editorial cleanup: reduce templated language and repetition

This pass treats “AI-looking” as a critique of the presentation, not a claim about detecting authorship. The actual problems were interchangeable slogans, duplicated labels, repeated invitation language, and a uniform eyebrow-plus-heading pattern.

| Removed or simplified | Replacement |
| --- | --- |
| “Choose your discipline” above “Choose the problems you want to solve.” | “Our competitions” |
| “A shared interest. A reason to meet.” | “About the society”, followed by a direct explanation of AMS, Derive, and Ascent |
| “Beyond the problem set.” / “Meet the people behind the results” | “Derive '26, in pictures”, with a description of what the photographs show |
| “Start with what brings you here.” | “Take part” |
| Audience labels followed by another generic action heading | One heading each: “For participants” and “For recruiters and sponsors” |
| “Looking to connect with quant or systems talent?” | “Recruiting and sponsorship” |
| Repeated invitation in the hero description | One factual sentence about the competitions AMS runs |

- [x] Remove redundant eyebrows from competition, gallery, society, and closing sections. Keep the full society name in the hero and the historical edition label in the recap.
- [x] Remove corresponding empty top margins and redundant closing-label styles. Preserve structural dividers, readable spacing, photo placements, and the user's hero positioning.
- [x] Use concrete descriptions for the historical finals and partner meetings. Preserve all verified counts and edition scope.
- [x] Pass lint, types, build, SEO, and whitespace checks.
- [x] Verify responsive layout from 320 through 2560px, image loading, touch targets, anchors, keyboard navigation, and no-JS content. Visually review revised heading and closing spacing.

Intended effect: readers can recognize the content and assess the offer with less interpretation. Specific names, activities, and dates carry credibility; the photos provide warmth. These are design judgments, not measured trust or conversion gains. Previously reported performance limitations remain open.

Hero scale refinement: desktop photo box reduced to 92% width, with an additional 5vw horizontal offset to retain the subject's right alignment. The existing vertical crop and feathered edge remain. Responsive image sizes now reflect the narrower desktop box. Mobile and tablet framing are unchanged.


### Homepage scroll-boundary behavior

Compared with [Jane Street](https://www.janestreet.com/), whose live header uses `position: fixed; top: 0`. AMS now fixes the homepage navbar to the viewport and reserves 64px on phones/tablets or 72px on desktop so the hero does not slide underneath it at rest. Native document scrolling and platform overscroll remain enabled; no scroll listeners, simulated bounce, or nested scroll containers are introduced.

The CSS is scoped to the home route. Other routes retain their existing sticky header. Without JavaScript, the header remains in flow so the expanded fallback navigation can take its natural height. Physical Safari/iOS rubber-band motion cannot be fully reproduced in the Linux Chromium test environment; device validation remains advisable.


### Typography, hierarchy, and visitor agency review

The most useful change was to strengthen the explanation and decision text beside the large hero, not increase the headline again. “Agency” here means visitors can identify a relevant route, read its context, and decide without urgency or implied superiority. There is no established font size that produces a universally optimal psychological response.

| Role | Before | Revised at default 16px browser font |
| --- | --- | --- |
| Hero headline | 42-88px / 600 | Retained; safe wrapping added for enlarged text |
| Hero explanation | 16px | 16-18px, 1.65 line height, 44ch maximum |
| Primary/secondary actions | 14px | 16px, 48px minimum target height |
| Home text links | 14px | 15px; existing minimum 44px targets retained |
| Section headings | 28-40px | 30-44px fluid, weight 600 |
| Competition names | 32-44px / 500 | 28-36px / 600, subordinate to section headings |
| Main reading text | 16px | 16-17px with 1.7 line height |
| Evidence and photo captions | 12-13px | 14px |
| Statistic labels / section label | 14px / 14px | 15px / 16px |
| Partnership subheading | 16px | 18px |
| Secondary uppercase categories | 11-12px | At least 12px; remain short secondary labels |
| Timeline / closing headings | 18px / 22px | Retained as readable subordinate levels |

Header/footer utility typography remains unchanged. Homepage overrides in Neutral.module.css prevent these adjustments affecting other routes. The existing 48-80px section spacing, restrained palette, and photograph positioning remain.

Audience hypotheses: students can identify actions and compare contests without the facts becoming fine print; recruiters can read edition evidence and partnership context; newcomers get a clearer relationship between the headline and what AMS actually does. These are intended benefits, not measured conversion or confidence gains.

References: [NN/g on visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/) supports using relative size and contrast to communicate priority. [W3C text resizing guidance](https://www.w3.org/WAI/WCAG21/Understanding/resize-text) requires enlargement without losing content or functionality; it does not prescribe these specific default font sizes.

Validation includes normal responsive checks across 320-2560px and a separate content-only stress test at 375px and 1440px combining doubled computed font sizes, 1.5 line height, .12em letter spacing, .16em word spacing, and 2em paragraph spacing. The stress test exposed headline clipping and a competition-heading flex-width issue; both were corrected. This is a layout stress check, not certification of complete WCAG compliance or a substitute for native browser zoom testing. Prior performance limitations remain open.

Final enlarged-text checks also exposed statistic-value/label wrapping and fixed-width stage-number columns. Statistic text now wraps when required; stage columns use em units so they grow with the text. Both tested widths finish without document overflow or clipped text. The desktop photo intentionally extends beyond its clipped hero frame, as before. Final production build passed.


### Ascent page implementation and review: 1 November 2026

Scope: `/ascent`, with independent visual-design, official-information, and audience/UX agents. The reference homepage's visual system is reused without changing its layout.

Official sources checked: [Ascent](https://ascent.amshq.in/), [syllabus](https://ascent.amshq.in/syllabus), [eligibility](https://ascent.amshq.in/eligibility), and the browser-verified [entry-status destination](https://ascent.amshq.in/register/status).

| Area | Previous state | Implemented change and reason |
| --- | --- | --- |
| Palette | Burgundy/cream/gold with a dark brown skills band | White/off-white, near-black typography, neutral rules, red limited to small accents and focus; matches the shared navbar/footer |
| Hero | Open-registration promotion and repeated skill labels | 42-72px technical heading, 16-18px explanation, honest edition-status panel, entry-status action and format anchor |
| Skill overview | Serif titles, 14px descriptions, repeated high-level categories | Open columns with 22px sans-serif titles, 16-17px explanations, and official syllabus link; detailed later-round topics remain pending |
| Format | One paragraph after registration details | Ordered round sequence with published dates, individual/team settings, qualifier-vs-optimization scoring distinction, and visible tentative finale details |
| Entry information | Instructions to register before an elapsed deadline | Participation policy, direct/profile-review entry routes, closed registration, and official requirements links |
| Ending | Burgundy CTA repeating stale registration urgency | Compact neutral entry-status and support actions above the existing dark footer |

Journey: definition/status → skills → round progression/schedule → participation policy → existing-applicant action. Students can assess relevance before operational details; recruiters can understand scope without a competing sales pitch. Intended effects are clarity, self-selection, and confidence supported by specific information. These are design hypotheses, not measured outcomes.

Sizing: consistent 20px phone/32px wider gutters within the existing 1280px container, 48-88px hero padding, 48-80px section padding, 30-44px section headings, 16-18px main reading text, 14px context, and 48px primary actions. Status panel uses the existing 9px radius; buttons use 6px. No new dependency, fake benchmark graphic, or Derive photo presented as Ascent evidence.

Fact synchronization:

- [x] Confirm registration closed; replace registration CTAs with entry-status links.
- [x] Keep October qualifier as a published date without claiming it occurred.
- [x] Mark finale date and Mumbai venue tentative; identify partner campuses as pending.
- [x] Update page metadata, FAQ (and generated FAQ schema), shared competition action, and llms.txt. No separate Ascent event schema existed to change.
- [x] Preserve unrelated Derive counts and edition-specific partner claims.
- [x] Verify status-page workflow; avoid incorrectly requiring an entry reference.

Implementation checks:

- [x] Lint, TypeScript, static production build, SEO, and whitespace checks.
- [x] Browser review at 320/375/768/1024/1440: no horizontal overflow, undersized links, missing images, or browser errors.
- [x] Active navigation, format-anchor clearance, and official entry-status destination verified.
- [x] Desktop/mobile hero and round-sequence screenshots reviewed for hierarchy and spacing.
- [ ] Representative visitor testing of comprehension and next-step selection.

Ascent final production checks: no-JavaScript and reduced-motion content remain visible without overflow. Lighthouse spot-check: performance 96, accessibility 100, LCP 2.7s, CLS 0, TBT 20ms. The score target passes, but the 2.0s LCP target remains unmet; field INP and full transfer-budget certification are not established by this run.


### Derive page implementation: 1 November 2026

Scope: `/derive`, continuing the neutral design used on home and Ascent. Independent agents verified competition information and implemented/reviewed the hero; the parent implemented the lower journey and integration.

Sources: [official Derive homepage](https://amsderive.in/), [2026 rules](https://amsderive.in/rules), and [2026 FAQ](https://amsderive.in/faq), alongside the repository's previously verified 2026 results and approved partner assets.

The official homepage retains an open-registration banner, but its rules and FAQ give a May 2026 closing date. This page therefore remains an edition archive, not an active registration campaign. The published forecast of 30-50 finalists does not replace the verified result: 50 qualified and 33 competed in person. The page retains month-level July 2026 photo context. Existing event metadata retains the schedule dates published in the official FAQ; the unsupported “on stage” description is corrected to “in person.”

| Area | Previous | Implemented |
| --- | --- | --- |
| Hero | Burgundy heading, cream surroundings, tightly cropped photo, rules-only action | Neutral typographic introduction, clearly labelled 2026 edition, format anchor and archive rules link; authentic hall photo at native ratio with external caption |
| Subject matter | One brief introductory sentence | Three concise areas: probability/inference, markets/models, mathematical reasoning; historical individual-format note and rules link |
| Round history | Brown panel, serif numbers and headings, small text | Off-white open columns, readable outcome numbers, plain round subtitles alongside PRIOR/POSTERIOR/CONVERGENCE, explicit qualification-versus-attendance context |
| Partners | Nested cream cards and burgundy logo panels | Open neutral columns, named partners and tiers, approved marks on near-black surfaces, relationships scoped to Derive '26 |
| Final action | Generic colored CTA band | Neutral future-edition enquiry with a separate 2026 gallery link; no invented registration date or hiring promise |

Design details: 42-72px hero title, 16-18px supporting text, 30-44px section headings, 22px subsection headings, 14-15px supporting context, and 48px primary actions. Shared container gutters and 48-80px section rhythm align with Ascent and the shell. Photo and logo surfaces use 9px radii; actions retain 6px. Red remains limited to small identity/focus accents.

Audience rationale: subject areas help students assess interest before reading rules; the completed-round history gives newcomers specific context; recruiters see named historical partnerships without implied future access or employment outcomes. These are intended comprehension/trust benefits, not measured psychological results.

- [x] Verify external competition format and dated registration information.
- [x] Preserve verified results, edition-specific partners, and documentary captions.
- [x] Implement neutral hero, subject overview, round history, partners, and closing.
- [x] Preserve existing canonical metadata, event schema, archive links, and inquiry route.
- [ ] Representative audience comprehension testing.

Derive final validation:

- [x] Lint, TypeScript, production build, SEO checks, and whitespace checks passed.
- [x] Independent browser review at 320/375/768/1024/1440px: no horizontal overflow, missing images, or undersized visible interaction targets.
- [x] Active navigation and format-anchor header clearance verified; normal motion, reduced motion, and JavaScript-disabled content reviewed.
- [x] Desktop/mobile hero and partner screenshots reviewed for framing, hierarchy, and spacing.

Production Lighthouse spot-check: performance 95, accessibility 100, LCP 3.0s, CLS 0, TBT 50ms. The score target passes, but the 2.0s LCP target remains unmet. This lab run does not establish field INP or certify all transfer budgets.

### Competition updates: placement and signup journey

Decision: labelled page actions and a footer link, rather than a navbar bell.
A bell conventionally suggests an inbox or existing notifications; this site has
neither. The existing header action remains the main route into competitions.
The new action follows enough competition information for an informed choice.

- Derive closing: primary “Get competition updates”, with Derive selected on arrival.
- Ascent closing: secondary updates link, retaining the entry-status primary action.
- Home participant closing: secondary updates option beside competition exploration.
- Footer competition column: persistent “Competition updates” route for every page.
- Dedicated `/updates`: one clear task, name/email/topic, unchecked consent, then save.

The page uses 40-64px heading, 17px introduction, 16px form labels/inputs, 48px fields
and button, 6px corners, neutral colors, and red focus accents. Topic choice is
editable; no account, countdown, popup, opt-out trick, or notification permission
is involved. Signup explicitly does not enter a contest or reserve a place.
These choices are intended to support agency and reduce uncertainty; their impact
on signup quality and comprehension has not been measured with visitors.

Storage is a separate Firebase project, per user preference. The form confirms
only committed database writes; errors preserve input. Existing submissions are
not silently overwritten. No email campaigns are sent by this implementation.
Name/email/topic/consent are stored as requests with email ownership unverified;
confirmation and unsubscribe delivery belong to the later sending integration.

- [x] Add contextual actions and persistent footer entry.
- [x] Build accessible form with explicit consent and topic selection.
- [x] Add isolated private Firestore backend and deployment instructions.
- [x] Prepare ignored Firebase web config file and install requested SDK.
- [x] Configure and deploy the user's new Firebase project.
- [x] Verify a live synthetic signup after deployment and remove the test record.
- [ ] Connect confirmation, campaign delivery, and unsubscribe before sending updates.
- [ ] Test comprehension with representative visitors.

Signup verification:

- [x] Lint and TypeScript checks passed; `/updates` remains statically rendered.
- [x] Five backend unit tests cover normalization, consent, rejected requests, write failures, duplicate preservation, and quota reset.
- [x] Real Firebase emulator test passed: persistence, concurrent duplicate requests, quota, origin checks, and denied public reads.
- [x] Browser checks passed at 320/375/768/1024/1440px, including contextual topic choice, unchecked consent, validation, 503/429 recovery, confirmed success, and no-JavaScript contact fallback.
- [x] Desktop and mobile visual review completed.
- [x] Fixed initial form hydration layout shift by server-rendering the complete form.

Configured-page Lighthouse: performance 99, accessibility 100, CLS 0, LCP 2.2s.
The 2.0s LCP target is still slightly unmet; field INP and full home transfer
certification are not established by this run. Backend npm audit reports zero
known vulnerabilities after the documented transitive overrides. Live Firebase
project deployment and sending infrastructure remain the explicit setup steps.

Firebase deployment follow-up, 1 November 2026: `ams-main-856a1` now has the
production signup function, private rules, server-side secret, and submitted
rate-limit TTL policy. Live persistence, duplicate handling, CORS, validation,
and denied public reads passed; the synthetic test document was removed.
Function artifacts expire after seven days. Database is in `nam5`; function is
in `asia-south1`. Website hosting environment/redeployment and email sending
remain separate from this backend deployment.

### Signup integration and security hardening

Independent security and system-design reviews completed. Competition actions now
explain the updates route; the home action group keeps primary/secondary hierarchy.
Verification and saving are separate states with retained input, bounded waiting,
and a direct email fallback. Signup is not presented as entry or a reserved place.

- [x] Mandatory single-use App Check, app-ID restriction, and replay rejection.
- [x] Short-window, hourly, and aggregate admission limits.
- [x] Direct email-hash lookups, immutable duplicate/suppression records, bounded retries.
- [x] Unused indexes disabled; rate-limit TTL retained.
- [x] Unit, emulator-concurrency, and live attestation/replay checks.
- [ ] Add the new public site key to Vercel and publish the updated website.

Exact operation counts and limitations: [signup security review](docs/signup-security.md).

Hardening final checks: 20 unit tests, two Firebase emulator tests, live App Check
accept/reject/replay verification, and responsive browser flows passed. Temporary
live test credentials and records were removed. Lighthouse: 96 performance,
100 accessibility, CLS 0, LCP 2.7s (2.0s target remains unmet). Attestation makes
zero requests until interaction. Vercel code deployment and the new site-key
setting remain the public-site rollout step.

### Partnerships implementation review · 1 November 2026

The `/access` route now follows the neutral design used by Home, Ascent, Derive,
and the shared header/footer. Audience strategy and visual/frontend review were
performed independently by subagents.

Sources: `../sales/foundations.md` (buyer agency, proportional claims, sponsorship
objectives and explicit scope), `../sales/AMS_ACCESS_AUDIENCE_PERSPECTIVE.md`
(reader situation, mechanism, evidence and next action), and `../sales/citadel.md`
(AMS context only). Internal commercial terms, contacts, relationship counts and
unverified promises were not published. Existing verified Derive partner roles
and attendance remain unchanged. Ascent's final date and venue remain tentative.

Changes and intended audience effects:

- **Opening:** one black partnership action and a quiet competition link replace
  equal-weight buttons. This makes the next step easier to identify while leaving
  visitors free to inspect the offer before contacting AMS.
- **Evidence:** the original 3:2 conversation photograph retains the people at its
  edges; a dated caption and Derive evidence appear before the offer comparison.
  Recruiters can assess past delivery without assuming those partners endorse
  every AMS activity. The photograph is static and has no overlay text.
- **Comparison:** open Ascent/Derive columns replace cream cards. Parallel fields
  describe participants, technical work and format. First-time visitors can
  compare relevance without interpreting decorative badges or sales tiers.
- **Assessment:** the separate Access workflow stays a secondary off-white section
  before contact. It explains preparation, participation and review rather than
  leading with proctoring or claiming measured hiring improvements.
- **Contact:** a white closing section replaces the red band and boxed process.
  A visible email address, a clear email action, and three scope-setting steps
  explain what to send and what the conversation covers. Students are not
  promised placements; sponsors are not promised unrestricted candidate records.
- **Reading scale:** 40-72px fluid hero heading, 30-44px section headings,
  16-17px body, 14px captions, 48px primary actions and 44px text-link targets.
  Section spacing is 48-80px, with 6px controls and a 9px photo frame matching
  the shared shell. Red is limited to existing focus/current-navigation roles.

These psychological effects are design hypotheses, not measured conversion or
engagement improvements.

- [x] Preserve `/access`, `#sponsor`, `#contact`, and `#assessments`.
- [x] Preserve dated partner roles, contact destinations and canonical metadata.
- [x] Remove legacy burgundy/cream panels and legacy button dependencies here.
- [x] Check 320/375/768/1024/1440px, enlarged text, and no-JavaScript contact.
- [x] Verify one H1, visible content, 44px targets, unobscured anchors and no browser errors.
- [x] Pass lint, TypeScript, production static build, SEO and whitespace checks.
- [ ] Meet the repository's 2.0s mobile LCP target; see the lab measurement below.

Real-device testing, field INP, and measured audience response remain unverified.

Final production-build Lighthouse mobile spot-check: performance 95, accessibility
100, LCP 2.8 s, CLS 0, TBT 20 ms. The score target is met; the 2.0s LCP
target remains open. The hero receives an explicit high-priority request and
responsive sizes matching its actual grid width. This is a local lab result.

### Gallery implementation review · 1 November 2026

The gallery is now a neutral editorial archive with user-controlled viewing.
A panoramic cohort image establishes the event; staggered pairs, a full-frame
discussion photograph, social scenes and the award presentation vary the reading
rhythm. Featured discussions retain their original 3:2 composition to preserve
faces. On phones, photographs occupy the full content width. Captions remain
visible, and original labels and home-page photo placements are unchanged.

The intended psychological effect is a stronger sense of people and place, with
less repetitive scanning. Optional topic filters let visitors choose competition,
conversation or social context; the visible count explains the result. These are
design hypotheses, not measured engagement improvements. No autoplay, artificial
scarcity, scroll interception, or unsolicited full-screen experience is used.

The near-black native-dialog viewer provides previous/next controls, arrow keys,
touch swipe, a selectable thumbnail strip, a photo count, a full-image file link,
and Escape dismissal. Native modality makes background controls inactive; close
restores the original photo's focus without scrolling the page. A thumbnail is
shown while the full image loads; the full image fades in over 180ms. Failure
retains the preview and shows an explanation. Reduced motion removes transitions.

The route and sections remain server components. The browser and viewer are
interactive UI leaves, the viewer is split into a separately loaded module, and
no dependency was added. The gallery retains ordinary image links without
JavaScript. Existing header/footer tokens, 9px photo corners, 6px controls, and
readable captions replace legacy cream/burgundy surfaces. The closing section
links to the documented edition rather than implying a new registration window.

- [x] Preserve all 12 photographs, factual captions, metadata and home placements.
- [x] Check 320/375/768/1024/1440px with no horizontal overflow.
- [x] Test filters and counts, keyboard wraparound, thumbnail selection and swipe.
- [x] Test Escape, focus restoration, scroll unlocking and inactive background.
- [x] Check enlarged text, reduced motion, no-JavaScript links and landscape controls.
- [x] Test image-load failure with preview retained and readable feedback.
- [x] Pass lint, TypeScript, static production build and SEO checks.

Physical-device gesture behavior and field INP remain unverified.

Production-build mobile Lighthouse spot-check: performance 92, accessibility
100, LCP 3.3 s, CLS 0. This local lab result does not establish field
performance; the repository target is LCP <= 2.0s and performance >= 95.

After consolidating stylesheets and correcting accessible photo labels, final
production-build checks pass for all gallery interactions. The final mobile
Lighthouse run reports performance 94, accessibility 100, LCP 3.1 s, CLS 0.
Photo links now use their visible captions as accessible labels. The 2.0s LCP target remains open;
shared render-blocking styles and font delivery remain optimization work.

Final targeted axe checks report no accessible-label/control-name violations in
archive links and no WCAG A/AA violations in the open viewer. The final caption
label correction also passes lint, TypeScript, static build and SEO checks.
Both the performance score target (95) and LCP target (2.0s) remain open; the
latest measured values are 94 and 3.1s respectively, with CLS 0.

### Gallery perception and color review · 1 November 2026

Reviewed the implemented archive and viewer, including the mobile opening,
photo crops, filter states, captions and the page's connection to the shared
header/footer. Changes are intentionally small; the documentary images remain
the dominant visual content.

| Area | Decision and rationale |
| --- | --- |
| Color hierarchy | Keep white/off-white archive surfaces and near-black text. Natural photographic color distinguishes scenes; adding colored panels would compete with that information. Black identifies the chosen filter. Red remains a focus/current-navigation cue, not a decorative wash. |
| Filter recognition | Give inactive filters subtle neutral borders. Previously they could resemble plain text or unavailable controls. Selected state still uses black fill plus `aria-pressed`, rather than relying only on hue. |
| Opening on phones | Reduce introductory gaps and use a 2:1 cohort crop with a lower focal position. The photograph appears sooner and uses less space for the ceiling, while preserving the people. |
| Photo affordance | Replace decorative sequence numbers with a small expand cue beside each caption. The caption supplies the accessible name; the graphic is decorative. Actual position remains available in the viewer's counter. |
| Viewer recognition | Raise unselected thumbnail opacity from .6 to .85 so subjects remain recognizable. The selected photograph keeps its white frame; thumbnails do not need to look disabled to communicate selection. |
| Reading rhythm | Keep asymmetric pairs and full-composition discussion frames, with single-column mobile browsing. Faces, conversation and context matter more than rigidly equal crops. |
| Narrative | Keep the cohort first, then arrival, competition, discussions, social scenes and awards. This introduces the broader participant experience before emphasizing winners. Filters allow a different route. |
| Control and motion | Retain explicit opening/closing, keyboard/swipe navigation, a thumbnail chooser, reduced-motion support and no autoplay. Opening a photo does not surrender the visitor's place in the archive. |

Intended audience effects, not measured outcomes: students can see peers and
participation beyond awards; recruiters can inspect dated evidence of the event
without inferring hiring results; first-time visitors get context and recognizable
controls. No universal emotional meaning is assigned to a color, and no increase
in trust, belonging or conversion is claimed as a verified result.

Validation: five viewport widths, enlarged text, filters, keyboard/swipe,
focus restoration and no-JavaScript browsing passed. Targeted WCAG A/AA checks
reported no violations. Lint, TypeScript, static build, SEO and whitespace checks
passed. This refinement did not remeasure Lighthouse; the previously recorded
performance limits remain open.

### Team implementation review · 1 November 2026

The Team page now uses the neutral shell palette and shared link/button styles.
The introduction identifies the people behind AMS directly instead of implying
that every listed member has a verified competition background. All five names,
roles, affiliations, biographies, LinkedIn destinations and person anchors remain
unchanged; `TEAM_JSONLD` continues to derive identities from the same source.

Open two-column profiles replace legacy burgundy styling, collapsing to one
column on mobile. Names have the strongest weight at 24-30px, roles use 16px,
affiliations use 14px muted text, and profile links use 15px with 44px targets.
The supplied founder photograph remains a modest 64x80px image within the same
profile structure. Missing portraits and bios are not filled with invented
content, stock images, or avatar placeholders.

The intended effect is approachable, identifiable responsibility: students can
see whom the organization comprises; recruiters can scan areas of responsibility;
first-time visitors can connect names to public profiles. Neutral backgrounds
keep attention on identities; red remains in shared focus/navigation states.
These are design hypotheses, not measured trust or conversion outcomes.

A light closing section invites a discussion about contributing and gives a
visible email address. It does not claim that a particular role is open or imply
a guaranteed place. All content is server-rendered without entrance animation,
so names and links remain immediately available with or without JavaScript.

Validation passed at 320/375/768/1024/1440px, including 200% text after correcting
long-heading wrapping. Five profile links, 44px targets, the `#tilak-jain` author
anchor, no-JavaScript content, WCAG A/AA checks, and absence of browser errors
were verified. Lint, TypeScript, static build and SEO checks passed.

Production-build Lighthouse spot-check before the final text-wrapping correction:
performance 96, accessibility 100, LCP 2.7s and CLS 0. The 2.0s LCP target remains
open; no field performance or physical-device result is claimed.

### Team story refinement: vision, founder, then team · 1 November 2026

The user requested a progression similar to https://iicpc.com/team. Reviewed its
rendered desktop layout: introductory context, vision, leadership and core team.
AMS adopts that progression, with its own neutral theme, factual content and
smaller roster. Institution prestige blocks, institutional counts, employment
claims and first-person introductions are not copied. This supersedes the earlier
flat five-person directory arrangement while preserving all five identities.

Sources for AMS wording: `../sales/AMS_ACCESS_AUDIENCE_PERSPECTIVE.md`,
`../sales/foundations.md`, and public-context portions of `../sales/citadel.md`;
corroborated against `blogs/welcome-to-ams/index.md` and existing institutional
overview copy. Private outreach, pricing, contact records and unconfirmed
university relationships remain excluded. The vision is editorial synthesis
expressed as an aim, not a claim of delivered career outcomes.

The sequence now answers five visitor questions:

1. **What does AMS do?** The introduction pairs the team purpose with direct
   Derive, Ascent and assessment links. It connects people with actual work.
2. **Why does it matter?** A quiet off-white vision section articulates room to
   test ideas, show work and meet peers. The limits of competition results remain
   clear without turning the page into a disclaimer.
3. **Who started it?** Tilak's feature retains the verified bio and affiliation,
   shows the original event photograph without cropping hands or face, and links
   to his published introduction. No personal quotation or origin anecdote is
   invented. The photo sits to the right on desktop, facing toward the text.
4. **Who makes it happen?** Four remaining profiles receive consistent names,
   role hierarchy, affiliations and links in a balanced two-by-two roster.
5. **How can I contribute?** The existing enquiry route remains explicit and
   optional, with no implication of guaranteed membership or open roles.

Intended psychological effects are comprehension, identifiable responsibility
and room for self-directed exploration. These remain hypotheses; the page does
not claim measured increases in trust, belonging or conversion. White/off-white
sections create pacing, black text establishes hierarchy, and red stays limited
to shared focus/current-navigation cues. No additional client code or library.

Validation: all five widths, 200% text, profile links, 44px controls, the existing
founder anchor, no-JavaScript visibility and WCAG A/AA checks passed. Lint,
TypeScript, static build, SEO identity checks and whitespace checks passed.

Expanded Team page mobile Lighthouse: performance 96, accessibility 100,
LCP 2.7 s, CLS 0. This is a local production-build spot-check; the 2.0s
LCP budget remains open.

### Winter interns added · 1 November 2026

Added Shubhranil Paul (University of Mumbai) and Rasesh Shetty (IIT (BHU)
Varanasi), using the names, affiliations, winter internship and Access development
work supplied by the user. Both use “Software Engineering Intern · Winter 2026”
and the same concise, contribution-led description. No specific shipped features,
awards, ownership or impact metrics are invented. Both have the supplied LinkedIn
links and stable person anchors, with the same visual treatment as other members.
The roster introduction now explicitly includes software development. Person
schema derives from the seven-member content list; the AI summary and SEO identity
count are synchronized. The intended emphasis is meaningful contribution with an
accurate career-stage title, rather than inflated seniority or a lesser visual tier.

### Team card refinement · 1 November 2026

Replaced the loose ruled roster with minimal neutral cards, consistent 9px
corners, 24px mobile padding and 28px/32px desktop top/side padding. Desktop
uses three columns from 1200px, producing two balanced rows for the six wider
team profiles; tablet uses two columns, phones one. Equal-height desktop cards
align names and profile actions without inventing missing profile details.

Simplified the heading to “Our team” with a shorter descriptive sentence. Names
now use 22-26px type, roles 15px medium weight, and edition/internship context
14px muted text on a separate line. Affiliations remain secondary. Links have a
full-width 44px target and aligned external-link cue at the bottom. Cards do not
lift on hover or imply that their whole surface is clickable. Red stays reserved
for focus/navigation; no initials, trophy badges or fabricated portraits were added.

The intended effect is easier comparison, clear grouping, and equal visual
standing across members. It is a design judgment rather than a measured
psychological outcome. Canonical role strings and all seven identities, links
and author anchors remain unchanged.

Validation: five viewport widths, enlarged text, keyboard targets, WCAG A/AA
checks, no-JavaScript content, build, typecheck, lint and SEO checks. No new
performance measurement is claimed for this card-only refinement.

Team card compacting: removed the repeated Access-development biography from both
intern cards at the user's request. Desktop padding is now 24px top/sides and
16px bottom, mobile padding 20px, with a 16px gap before profile links. Cards
retain equal-height desktop rows, readable roles and 44px link targets. Sahil's
affiliation is IIT Kharagpur, as confirmed by the user.

Founder card update: the founder feature remains between vision and the wider
team, with the same `#tilak-jain` anchor. Removed its photograph and caption,
including the image reference in the derived person schema. The feature now
uses a neutral bordered card with 9px corners, 24px mobile/32px desktop padding,
a restrained name heading, and a desktop identity/text split. Biography and
essay/LinkedIn links remain intact. This supersedes the earlier photo treatment.

## Blog implementation and shared canvas review

The index now uses two neutral article cards with consistent image frames, quiet
metadata, clear titles and bottom-aligned reading links. Cards render immediately;
short hover transitions respect reduced motion. A restrained closing link replaces
the promotional colored band. This keeps the small collection easy to scan and
gives students, partners and new readers a direct route to the writing.

Both article routes use a narrower reading column, 17px prose with generous line
spacing, sans-serif headings and underlined links. Author/date details remain
visible, with All notes links before and after the article. Code is intentionally
monochrome on a neutral surface. Original Markdown, canonical metadata and
BlogPosting structured data are preserved.

The cream exposed during elastic scrolling came from html/body backgrounds. Both
now use the white shell canvas. Native scrolling remains enabled. Computed-style
checks found white document canvases and no visible legacy cream backgrounds
on ten routes, including FAQ, Updates and a missing-page view. Browser automation
does not reproduce physical trackpad elastic overscroll.

Validation: lint, typecheck, production build and SEO checks passed. The index
and both articles passed overflow and heading checks at 320, 375, 768, 1024 and
1440px. Navigation, no-JavaScript reading, enlarged text and an article axe scan
passed. Future-content stress fixtures remain a separate unchecked item above.

Production mobile Lighthouse spot check on `/blog/what-ams-actually-is`: performance
96, accessibility 100, LCP 2.8 seconds and CLS 0. The stricter project LCP target
of 2 seconds remains unmet; this measurement is a local lab result.

### Blog wording refinement from sales material

Reframed both posts using `../sales/foundations.md` and
`../sales/AMS_ACCESS_AUDIENCE_PERSPECTIVE.md`: start with a reader's reason to
care, explain the concrete activity, support it with relevant evidence, and
provide a proportionate next step. The founder article now develops the purpose
of competition and the conversations around it. The society introduction helps
readers distinguish Derive, Ascent, and Access before choosing where to begin.
Removed the detached probability example and reduced repeated introductions.
Updated article descriptions and index copy to match. Publication dates, authors,
URLs, verified participation counts and edition-specific partner roles remain
unchanged. Benefits are framed as opportunities or intentions; there are no
promises of interviews, employment, validated fairness or measured hiring gains.

## Cross-page consistency audit

Design and frontend agents reviewed typography, spacing and rendered layouts;
a separate audience review checked readable hierarchy, action clarity and color
roles. The resulting changes consolidate existing visual roles rather than
making every heading the same size.

- [x] Centralize page/campaign/article/display, section and body type scales.
- [x] Align equivalent Team and Gallery section headings and vision weight.
- [x] Match Partnerships hero scale and spacing to the competition pages.
- [x] Make shared content actions 16px/48px and text links 15px/44px, fixing
      the Team button's CSS-order-dependent 14px rendering.
- [x] Replace legacy gold fallback focus with red; preserve contrasting focus
      outlines on dark photographic and footer surfaces.
- [x] Strengthen neutral link underlines so affordances do not rely on hover.
- [x] Migrate FAQ's remaining burgundy/gold presentation and align Updates.
- [x] Convert fixed text sizes in affected section styles to rem and fix
      Gallery's closing layout at enlarged text sizes.

Reader rationale: equivalent headings and controls should carry equivalent
visual importance between pages. Clear link affordances and predictable sizing
help visitors choose their next action. Documentary home imagery and campaign
headlines remain more prominent; articles keep a quieter reading hierarchy.
These are usability judgments, not claims of measured psychological effects.

Validation: lint, typecheck, production build and SEO checks passed. Fresh
production checks covered 11 routes at 320, 375, 768, 1024 and 1440px, plus
200% root text size at 320px: no horizontal overflow, one H1 per route and
correctly resolved heading tokens. Axe scans with reduced motion passed on all
11 routes; FAQ toggles and Updates topic selection also passed. Independent
visual review covered seven main pages on desktop and phones. The local preview
was restarted to clear stale global CSS and its resolved tokens were verified.

Local mobile Lighthouse spot check on the home route: performance 94,
accessibility 100, LCP 3.1 seconds, CLS 0. The performance95/LCP2s project gates
remain unmet in this run; visual consistency validation does not clear those
separate performance gates. No new runtime dependency was introduced.

## Navigation rhythm follow-up

The prior role audit allowed campaign pages a larger title scale. Clicking
between destinations exposed a perceptual mismatch that isolated page checks
missed: at 1440px, title tops varied from 170px to 239px, labels switched from
uppercase red-rule treatment to plain muted text, and headline sizes switched
from 71px to 60px. Vertical centering against different media was a major cause.

- [x] Use one interior-page title scale and intro top spacing across Derive,
      Ascent, Partnerships, Gallery, Team and Blog.
- [x] Match label treatment and label/title/description spacing.
- [x] Top-align split introductions and align competition/partnership columns.
- [x] Keep home immersion, article reading width and content-specific layouts.
- [x] Check actual navbar navigation and compare the openings side by side.

After the change, all six titles start at the same Y coordinate and use the
same font size at each of 320, 375, 768, 1024 and 1440px. At 1440px that is
170.39px and 60.16px respectively. No horizontal overflow at those widths or
with 200% text at 320px. This creates a stable visual reference when switching
pages; it is a design judgment rather than a measured psychological outcome.

## Trust before the first conversation: philosophy, judgment and proof

### What the positioning advice gets right

A description answers “What is this?” A buying decision also needs answers to
“Is this relevant to my situation?”, “Will these people make good decisions?”,
“What supports their claims?”, and “What will working together involve?”
AMS should answer these questions before requesting a meeting. Clear subject
matter and a polished interface are the foundation, but neither alone establishes
that a sponsor or assessment owner should choose AMS.

The luxury-vacation example is effective because it names a decision criterion:
the quality and personal relevance of the experience matter more than the bill.
The resort-versus-villa story then makes that criterion observable. Its persuasive
force comes from the adviser understanding the client's situation and making a
reasoned recommendation. The cheaper option is not automatically the better one;
the evidence must explain why it fit this particular client.

For AMS the corresponding principle is already present in the founder writing
and team vision: meaningful technical work gives people something to attempt,
discuss and learn from together. A partnership starts with the relevance of that
work to the firm. An assessment starts with the task and the evidence reviewers
need. These are stronger criteria than total exposure or a long feature list.

### What should not be imported from the example

Affluence is not a sufficient definition of a good AMS customer. The user has
identified two priorities: sponsors/recruiting teams and organizations buying
Access assessments. Useful fit depends on their technical needs, intended
engagement, operational requirements and capacity to participate. A high budget
cannot resolve an irrelevant audience or unsuitable assessment format.

“High agency” is better translated into design requirements than a claim about a
psychological category. Give visitors information they can inspect, distinguish
facts from aspirations, and let them choose between relevant next steps. Do not
make them book a call to understand the basics. Do not suggest that premium
visual styling proves product reliability or that prestigious affiliations prove
participant outcomes. Students remain participants with their own interests;
they should not be portrayed merely as inventory for recruiting teams.

### The trust sequence for AMS

1. **Recognize the work.** Name the technical domains and distinguish a competition
   partnership from running an assessment for the buyer's own candidates.
2. **Understand the principle.** Explain why shared problems and discussion are
   central to AMS, and what a useful engagement should be designed around.
3. **Inspect what happened.** Show the dated Derive format, named partner roles,
   documentary photographs and attributable feedback about problem quality.
4. **Evaluate the judgment.** Explain how objectives, task relevance, participant
   preparation and review criteria shape a proposed engagement. Add an actual
   decision account when its facts are supplied; criteria alone do not prove
   those decisions have already been made successfully.
5. **Choose a next step.** Offer distinct sponsor and assessment enquiries, with
   a short explanation of what information helps start each conversation.

This sequence is intended to reduce uncertainty and help a visitor assess fit.
It is not evidence of measured conversion gains or a promise about how every
visitor will feel.

### Evidence has different jobs

| Evidence | What it supports | What it does not establish |
| --- | --- | --- |
| Derive rounds and final attendance | Delivery of a specific competition | Future reliability at any scale |
| Edition-specific partner names | Participation in that edition | Endorsement of all AMS products |
| Photographs of conversations | People met in that setting | Offers, hires or lasting relationships |
| Approved participant feedback | Those participants' views of the problem experience | Representative satisfaction or improved ability |
| An actual problem and design explanation | Technical choices a reader can inspect | Validity for every hiring role |
| An approved help/decision account | What happened to a specific person or team | Typical results or sole causation by AMS |

The existing feedback file records website-use disclosure and founder-confirmed
names. Its exact quotes can be reused as question-quality evidence. A Google Form
or WhatsApp export may supply richer accounts, but the review must preserve dates,
context, authorship and the distinction between a private message and an approved
public quotation. Selection should not turn mixed feedback into a claim that all
participants had the same experience. Keep private source material outside public
assets and committed content; publish only the agreed excerpt and attribution.

### Implementation in this pass

- [x] Move the existing home philosophy section after the competition choices,
      before the event account. Give it a principle and a link to the founder essay.
- [x] Follow the edition story with existing approved participant feedback,
      rendered as quiet static quotations with a visible source note.
- [x] Add a partnership section explaining relevant work, conversation context
      and agreed success criteria, with a separately attributed problem-quality quote.
- [x] Give Access equal consideration as a buyer path: direct hero link, expanded
      task/preparation/review discussion, useful enquiry guidance and a clear CTA.
- [x] Give the home firm invitation separate partnership and assessment routes.
- [ ] Add a verified organizing or assessment-design decision story once supplied.
- [ ] Review the user's feedback responses/chat export for specific help accounts
      and confirm quotation permissions before public use.
- [ ] Add an approved public problem with explanation of its purpose, evaluation
      and limitations if suitable source material is available.

No synthetic testimonial, customer outcome, fee-saving claim, support-resolution
story or hiring guarantee was introduced. We have strengthened the explanation
and surfaced existing evidence; the richest judgment and community-help stories
still depend on the source material the user has offered.

### How to judge whether this works

Review whether a prospective sponsor can explain which competition fits and why,
and whether an assessment owner can explain the workflow and what to discuss
before committing. In actual enquiries, look for specificity of objectives,
relevance of technical needs, follow-through and appropriate fit. Traffic,
meeting count and average budget alone cannot tell whether the website is
attracting the right engagements. No new tracking was added in this pass.

Validation for this trust pass: lint, typecheck, static production build and SEO
checks passed. Home and Partnerships passed five-width layout checks, 200% text,
axe accessibility scans with reduced motion, assessment-anchor/contact checks
and no-JavaScript rendering. Exact approved quote strings remain in their
original content source. Visual review confirmed the new sections follow the
neutral typography, spacing and surface system.

Production mobile Lighthouse home spot check: performance 95, accessibility 100,
LCP 2.9 seconds and CLS 0. The 2-second LCP target remains unresolved.

### Supplied feedback verification

Reviewed the supplied Derive workbook and Ascent chat export. The workbook has
38 response rows dated 21–23 June 2026, before the finals. Existing testimonials
were verified against review-field rows 39, 29 and 31; the field explicitly
mentions website use. Source notes now identify June and disclose light editing.
No new names were inferred from email addresses. Feedback also raises wording
and implementation-friction concerns; the home section acknowledges that context.

The Ascent export contains support exchanges during a disrupted start and ends
before the official resolution. It does not substantiate a smooth-round or
universal-recovery claim. No private messages, contact details or screenshots
were published. A decision story remains pending the organizer's official
resolution and evidence of completed changes. Detailed private review is in
`/tmp/ams-feedback-review.md`; raw source files remain outside the repository.

Organizer follow-up: the rescheduled Ascent round was conducted on 1 November
2026 and, according to the organizer, ran smoothly. Updated Ascent round text
and llms.txt with the confirmed date and completion. The FAQ, metadata, schema
and blog surfaces do not contain the old qualifier date. No claim about technical
fixes, universal access or measured reliability was inferred. The official
resolution is now known at a high level; a detailed decision case still needs
the actual reasoning and completed changes.

### Testimonial note refinement

Simplified source notes on Home and Partnerships to selected participant
feedback with the June 2026 date. Home's editing disclosure now sits after the
quotes; the partnership quote keeps it within the small source note below
attribution. Removed the redundant individual-experience disclaimer and the
isolated criticism paragraph. Mixed feedback remains documented in the source
review; a future public improvement account should connect it to verified
actions and results. Quote text and attribution are unchanged.

### Partnerships: selective UI audit follow-up

- [x] Give Ascent and Derive matching, neutral comparison cards with visible technical-focus labels, consistent padding, and bottom-aligned links. This makes the real choice easier to scan without implying one option is preferred.
- [x] Present assessment planning as three visible steps, followed by an enquiry action. Recruiters can assess the process without completing a wizard or revealing hidden content.
- [x] Shorten repeated philosophy and enquiry copy using the sales guidance: understand the buyer's goals, explain concrete work, and agree scope before commitment.
- [x] Retain the shared hero alignment, restrained black/white/red palette, authentic event photo, and attributed participant feedback. Participant opinion remains separate from evidence of partner outcomes.
- [x] Reject unsupported trust badges, invented case studies, company-size segmentation, pulsing CTAs, card flips, and artificial choice pressure. The audit misidentified the feedback card and suggested a sticky header that already exists.
- [x] Check five viewport widths, enlarged text, automated accessibility, no-JavaScript content, and assessment navigation. Fix grid overflow at 200% text size.

Design rationale: these changes aim to reduce reading and comparison effort while letting sponsors and recruiters judge fit independently. They are UX judgments, not measured conversion or psychological outcomes. No new animation library or client-side interaction was introduced.

Validation: lint, TypeScript, production build, and SEO checks passed. Local mobile Lighthouse for `/access`: performance 96, accessibility 100, CLS 0, LCP 2.8 seconds. The stricter 2-second LCP budget remains unmet; this pass adds no dependencies or image payload.

Partnerships clarification: Derive is AMS’s summer cycle and Ascent its winter cycle. Present Derive first, then Ascent, with explicit seasonal labels. The section explains the annual rhythm and each cycle’s technical focus rather than asking sponsors to choose between simultaneous alternatives. Edition-specific availability remains visible.

### Blog index: selective UI audit follow-up

- [x] Lead with the founder's “Why AMS runs competitions” article in a full-width split card. Follow it with a smaller full-width guide card. Two articles do not justify filters or a three-column grid with empty slots.
- [x] Add estimated reading time, calculated from rendered prose at build time at 200 words per minute, on index cards and article pages. This is a reading estimate, not a timing promise.
- [x] Give existing topic labels subtle neutral backgrounds and preserve visible keyboard focus, full-card links, and reduced-motion support. Add a restrained image hover zoom without new dependencies.
- [x] Replace the small closing strip with a spacious competition-updates invitation and a separate Derive link. Reuse the existing protected signup route; do not promise a blog newsletter that the current consent and subscription service do not offer.
- [x] Keep the shared page title, monochrome palette, white canvas, and light closing surface distinct from the black footer. No decorative mesh, fabricated author portrait, or loading skeleton for already-rendered articles.
- [x] Review desktop/mobile screenshots and check 320/375/768/1024/1440 widths, 200% text, automated accessibility, article navigation, and content without JavaScript. Fix tablet image overflow discovered in the first pass.

Sales/UX rationale: explain the philosophy first, then offer a concrete guide and proportionate next steps. The hierarchy is intended to make reading choices easier, without assuming a universal F-shaped reading pattern or claiming measured engagement gains.

Validation: lint, TypeScript, production build, SEO checks, and production browser checks passed. Mobile Lighthouse: performance 94, accessibility 100, CLS 0, LCP 3.0 seconds. This misses the project's 95 performance / 2-second LCP targets. The lead image is discovered in the initial HTML, eager/high-priority, and approximately 19.5 KB in the measured mobile request; Lighthouse flags shared render-blocking styles. No new client component or dependency was added. Shared asset delivery needs a separate performance pass; this result is not a claim of meeting the performance budget.

### Shared navigation consistency follow-up

- [x] Extend the viewport-fixed navbar from home to every route. Use a shared responsive height token for both the header and reserved page space so content does not jump or hide underneath it.
- [x] Preserve the in-flow sticky fallback without JavaScript, which allows expanded mobile navigation links to occupy their full height. Native document scrolling remains intact.
- [x] Align Ascent/Derive secondary links and Team profile/work links with the shared 15px text-link role. Keep primary buttons at 48px and text-link targets at least 44px. Restore persistent profile-link underlines.
- [x] Use equivalent rem typography in the header/footer so text responds to reading preferences, preserving default visual sizes.
- [x] Subagent review confirmed active navigation, mobile menu dismissal, focus restoration, and scroll unlocking; no changes needed to those behaviors.

### Supplied logo assets

- [x] Use `ams-nav.svg` in the shared navbar and `ams-foot.svg` directly on the dark footer, both at their native 119 × 40 aspect ratio.
- [x] Use the supplied solo chevron for favicon, Apple touch icon, and organization logo, with white square backing for legibility across browser surfaces.
- [x] Preserve the supplied burgundy/gold and cream/gold artwork. Do not recolor the page theme or add a footer logo badge.
- [x] Review screenshots at 320/375/768/1024/1440px; verify image loading, proportions, navigation space, at least 44px link targets, and no horizontal overflow. Automated accessibility, lint, typecheck, build, and SEO checks pass.

### Third article: demonstrate the work

- [x] Select Posterior Problem A for its accessible distinction between expectation and mode; the separate-bond experiment remains clearly distinct from compounding.
- [x] Publish an AMS Team explanation with derivation, exact Python, a generated binomial chart, source attribution, and the existing Shane Christian review clearly labelled as contest-wide feedback.
- [x] Use sales guidance to lead with useful work, explain assumptions, and offer relevant next steps without invented setter commentary, hiring outcomes, or SEO guarantees.
- [x] Feature the article on the index. The existing pipeline generates canonical metadata, social previews, BlogPosting schema, reading time, and sitemap entry; add its link to llms.txt.
- [x] Verify all 3 supplied examples, 871 unique modes, 20 excluded ties, and 163 additional exact path-enumeration cases. Browser checks pass at five widths and 200% text; automated accessibility passes.

The supplied PDF is the factual source for the task. The article is an independently checked explanation, not represented as a setter-authored editorial. The company scenario is explicitly fictional. Publication date: 2 November 2026.

Article production checks: lint, typecheck, build, and SEO validation pass (12 pages). Local mobile Lighthouse: performance 95, accessibility 100, CLS 0, LCP 2.9 seconds. The site's stricter 2-second LCP target remains unmet.

Article code update: C++17 now precedes Python 3. The comment-free C++ implementation uses GNU `__int128` intermediates and a bounded integer multiplication loop, with signed 64-bit output conversions justified by the statement. Extracted article code compiled cleanly with warnings enabled and matched Python on 13,751 valid cases under undefined-behavior sanitization. Metadata and the AI-facing article summary now mention both languages.

Final article review: rechecked mathematical claims against the supplied statement and reran exact-reference checks. Rechecked mobile/desktop layouts, 200% text, code-block overflow containment, and automated accessibility after adding C++ first. Added a descriptive link from Derive's problem section and restrained emphasis on the core probability concepts. Canonical, social preview, BlogPosting schema, sitemap, and index discovery remain generated from the article's frontmatter; no keyword stuffing or ranking claims added.
