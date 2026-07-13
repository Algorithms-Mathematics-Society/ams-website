# Home page photo-immersive redesign

Date: 2026-07-13
Status: approved (brainstormed with Tilak; scope, count-up exception, and approach confirmed)
Sources: `media/web-insp/SITE · Home — Designed (photo-immersive).png` (target design),
`media/web-insp/SPEC · Home — Motion & Psychology.png` (motion grammar and rationale).
The exports are the visual truth; this doc translates them into buildable decisions.
Where an export shows an em dash, real copy uses the brand middle dot, comma, or colon.

## Goal and scope

Rebuild the home page to match the photo-immersive design and its motion spec,
block by block, hero to footer. Home page only: other pages keep their current look;
the motion grammar can roll out to them later. The site's architecture is unchanged:
fully static export, Server Components for sections, all copy in `content/` as typed
objects, `page.tsx` only composes.

Now that Derive '26 happened, the page's job shifts from promise to proof: real
photographs, real numbers, real names. Placeholder content never ships; every block
that needs verified content gates on it.

## Decisions already made

- Scope: home page only.
- The stats count-up ships as designed. It is the page's ONE numeric flourish; the
  same PR amends ENGINEERING_GUIDE.md and the ams-site-standards skill to sanction
  exactly this instance (count-ups stay banned elsewhere).
- Build approach: block-by-block in place. Step 0 builds shared motion primitives;
  each block is then reworked in order and verified before the next. The page stays
  shippable after every step.
- Content readiness (all confirmed available, supplied at each block's build time):
  verified stats (institutes count, prize + travel total), three consented
  testimonial quotes with names/colleges/faces, five team names + one-session
  portraits, founder letter copy (drafted by Tilak or drafted for his approval).
- Footer domains stay amshq.in. The design export predates the domain move;
  amsociety.in / amsderive.in / amsaccess.com do not come back.
- `PhotoBreaker` is retired when block 03 lands: the photo-backed stats band and
  closing CTA take over the photo-band rhythm; a third full-bleed photo band would
  double it.

## Motion foundation (step 0)

Global grammar, from the spec verbatim: one orchestrated moment per viewport; every
animation runs once, never loops; all reveals use `cubic-bezier(0.22, 1, 0.36, 1)`;
everything respects `prefers-reduced-motion` (fall back to instant opacity, content
fully visible with JS disabled).

Built once in `app/globals.css` + small extensions, consumed by every block:

- `.mask-reveal`: per-line upward mask reveal for headlines, 700ms per line,
  120ms stagger between lines.
- `.underline-draw`: gold rule drawing left to right, 400ms.
- `.caption-fade`: late fade for plate captions (the archival "stamp").
- Ken Burns settle: hero photo scales 1.04 to 1.00 over 8s, ease-out, once.
  `transform` only; must not delay LCP paint.
- Cream-to-burgundy body background shift and stats-band parallax (0.85x page
  speed): CSS scroll-driven animations (`animation-timeline: view()`), zero JS,
  degrading to static color/position where unsupported.
- Reveal orchestration: the existing `Reveal` IntersectionObserver stays the only
  scroll observer; new effects are classes it applies. No animation libraries.

New client leaves (the only JS added, combined well under 5 KB gzipped):

- Count-up (~1 KB): used exactly once, in the stats band. Numbers are rendered
  correct server-side; the animation only decorates. 1.2s, triggers at 40% in view,
  once, 150ms stagger between stats.
- Nav scroll hook on the existing Header client boundary: transparent over the hero;
  past 80vh it slides down as a solid cream bar with a 1px hairline, 300ms.
- Gallery lightbox: full-bleed on `#1F0A0D`, plate caption bottom-left, arrow-key
  navigable, Esc closes, focus trapped. No library.

Animation timing bands: micro-interactions 150-300ms; entrance reveals 400-700ms;
staggers 60-150ms per the spec's per-block values.

## Blocks, in build order

Each block below names the section component, the design intent, and its exit gate.

### 01 · Hero (Plate I)

`components/sections/Hero.tsx`. Keep the winners photo (`winners-with-the-cheques`)
as the LCP image with today's loading discipline (priority, fetchPriority high,
quality 50, sizes 100vw). Copy moves to the bottom-left so the photo gets one
uninterrupted beat; headline becomes a two-line mask reveal starting 400ms after
load; subhead + CTAs fade up 500ms after the headline; plate caption
"Derive '26 finals, IIT Bombay · July 2026" fades in last at 2.2s. Ken Burns
settle on the photo. A small "SCROLL" whisper sits bottom-center. Nav is
transparent over the photo (see step 0 hook).
Gate: LCP unchanged or better; headline readable at 320px; reduced-motion shows
everything instantly.

### 02 · Line of Record

New static section (one small component, no client code, no motion ever):
"EST. 2025 · MUMBAI" and "TWO NATIONAL CONTESTS · ONE ASSESSMENT PLATFORM ·
FINALS HOSTED AT IIT BOMBAY" on the cream ground. It reads as the imprint page of
a published volume. Sponsor names are deliberately absent: Jane Street and QRT
sponsor Derive, not AMS; they are named on the Derive page. The home page states
only AMS-scoped facts.
Gate: renders identically with JS disabled (it is plain HTML).

### 03 · Numbers over the Hall (Plate II)

`components/sections/StatsBand.tsx`. Dark band backed by the packed-hall photograph
(shot from the back, audience facing stage: `the-hall-at-capacity` or
`the-full-room`, picked at build time for legibility under text). Italic emotional
line above the stats: "2,500 registered. 33 stood on that stage." Four stats:
2,500+ registrations year one; 33 CONVERGENCE finalists; institutes represented;
prize + travel pool in ₹ L. Count-up once + gold underline draw 400ms after each
number lands, 150ms stagger. Background parallax at 0.85x. `PhotoBreaker` retired
in this same step.
Gate: verified institutes count and prize total from Tilak are in
`content/stats.ts` before merge; fact-sync map run (stats.ts, llms.txt, seo.ts,
faq.ts if definitional); backdrop photo through `optimize-photos.mjs` budgets;
numbers correct with JS disabled.

### 04 · Founder Letter (Plate III)

`components/sections/AboutSplit.tsx` becomes a letter. Founder-at-keynote photo
4:5 left (photo exists in the Derive '26 set or Tilak supplies the pick). Body is
first person, ends in a gold signature rule that draws in only after the body text
is fully visible, then "· Tilak, Founder". Photo and text fade up independently
(photo first, text 200ms later), 600ms, at 30% visibility.
Gate: letter copy approved by Tilak; no em dashes; signature rule draws last.

### 05 · Three Instruments

`components/sections/ProductCards.tsx`. Heading "Three instruments, one standard."
Three cards: Derive (the quant contest), Ascent (the systems contest, glacier-blue
toned screenshot slot as a quiet sub-brand cue), Access (the platform). Cards fade
up with 120ms stagger; hover lifts 4px with soft shadow (150ms), screenshot scales
1.00 to 1.03 inside its clipped frame, "Explore →" arrow slides 4px right. No tilt,
no glow.
Gate: screenshots must be REAL UI; until real captures are provided the current
placeholder slots stay (a mocked UI here contradicts everything above it).

### 06 · The Experience (burgundy band)

`components/sections/ExperienceGrid.tsx` moves onto the full burgundy band.
Section head: "Not told. Shown." Three cards target the three anxieties of a
would-be finalist (is it worth it, is it real, will the right people see me):
"Industry, in the room" / "Real problems, real debate" / "A room worth being in",
each backed by its photo (recruiter mid-judging; whiteboard debate; keynote
audience). Body background transitions cream to burgundy over 400ms as the band
crosses 50% viewport (scroll-driven, so the band feels entered rather than
passed). Cards use the same stagger grammar as block 05.
Gate: background shift degrades gracefully (band still burgundy, page still cream)
in browsers without scroll-driven animation support.

### 07 · Gallery (Plates IV-XI)

`components/sections/GalleryGrid.tsx`. Heading "It happened. Here's proof."
Twelve candid moments in an irregular editorial grid (uniformity reads as stock).
Tiles populate from the Derive '26 set already in `public/images/derive26`
(thumb variants in-grid, full variants in the lightbox). Tiles fade up 60ms
stagger per row; hover slides a caption bar up from the tile's bottom edge (240ms)
over a slight darkening scrim, image scales 1.02. Click opens the lightbox
(step 0 leaf). Captions name real moments; candids over posed; faces published
only with consent.
Gate: 12 real picks confirmed; keyboard and reduced-motion paths verified; grid
requests thumb-width images (honest `sizes`), not full crops.

### 08 · Testimonials

`components/sections/Testimonials.tsx`. Heading "Real names. Real colleges."
Three quote cards: italic serif quotes (testimony as text, not marketing
decoration), oversized gold quotation mark fading 0 to 55% opacity 200ms after its
card lands, real name + college + batch + face. No auto-rotating carousel:
rotation implies the quotes are interchangeable; stillness implies they are on
record.
Gate: three quotes verbatim from the post-event feedback form with written
consent, faces included; anonymous quotes do not ship.

### 09 · Team

`components/sections/TeamGrid.tsx`. Heading "The people behind it." Five portraits:
one session, one backdrop, one crop (consistency reads as professionalism).
Portraits fade up 80ms stagger; ship at 92% saturation, hover to 100% + gold name
underline (subtle enough most visitors never consciously notice).
Gate: real names + the portrait set in `content/team.ts`; the "Name" placeholders
are gone.

### 10 · Closing CTA (Plate XII)

New section. The last image is the team after the hall emptied (peak-end rule:
warmth and completion). Headline "The next edition is being written." mask-reveals
exactly as the hero did (a deliberate bookend). Primary CTA "Enter Derive '26";
secondary link "Sponsor the next one →" routes firms without diluting the student
CTA. Photo gets the slow parallax continuing the page's grammar. CTA hover: gold
fill brightens 6%, 150ms; no pulse, no bounce.
Gate: the after-the-hall-emptied photo through the pipeline; plate caption
"After the hall emptied" fades late like the hero's.

### 11 · Footer

`components/layout/Footer.tsx` restyled to the burgundy colophon: complete sitemap
(Compete: Derive, Ascent, Monthly Challenge · Firms: Access, Sponsor, Talk to us ·
AMS: Gallery, Team, Contact), exact domains (amshq.in), the full entity name line
"AMS (Algorithms & Mathematics Society)" preserved. Motion: none. The footer is
where diligence-minded visitors (firm counsel, parents, professors) end up; it
should look like the colophon of a published volume.
Gate: entity name line intact on every page (footer is shared chrome; this is the
one block whose restyle is visible site-wide, accepted as part of home scope since
the footer's content does not change).

## Performance guardrails

- LCP ≤ 2.0s throttled mobile: hero keeps its current image discipline (~87 KB
  hero variant); Ken Burns is transform-only from first paint.
- New photo backdrops (blocks 03, 10) go through `scripts/optimize-photos.mjs`
  within its existing budgets and lazy-load below the fold with honest `sizes`.
- JS budget: count-up + nav hook + lightbox combined stay under 5 KB gzipped
  against the 100 KB home budget; verified via build route-size output. Everything
  else is CSS.
- CLS < 0.05: all photo slots keep explicit aspect boxes; the nav bar overlays
  (fixed) rather than reflowing content.
- No new dependencies. If one is ever proposed, bundlephobia first.

## Verification

Per block: `pnpm lint && pnpm typecheck && pnpm build` with every route staying
`○ (Static)`; visual pass at 320/375/768/1440 on the dev server; reduced-motion
check (content fully visible, nothing loops); keyboard access for interactive
pieces (lightbox: Esc, arrows, focus trap). Per fact change: the fact-sync map
(content file, stats.ts, llms.txt, faq.ts, seo.ts, metadata descriptions).
Final: throttled-mobile Lighthouse ≥ 95 on home; count-up negative check with JS
disabled (numbers render correct statically).

No CI exists yet; these gates run manually per block, consistent with how the site
is verified today. Wiring CI stays separate, already-tracked debt.

## Out of scope

- Every page other than home (Derive, Ascent, Access, Gallery, Team) beyond the
  shared footer restyle noted in block 11.
- Sponsor logos or names on the home page (they live on the Derive page).
- The contest platform, forms infrastructure, or anything behind "Compete".
- Rolling the motion grammar out to other pages (future effort, reuses step 0).
