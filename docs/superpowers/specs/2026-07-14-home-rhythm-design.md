# Home rhythm: cadence, echo, and honesty fixes

Date: 2026-07-14
Status: approved (brainstormed with Tilak from a full-page visual audit of
hierarchy, placement, sequence, and color psychology)
Applies to: the home page only; four surgical changes, no new components.

## Findings the changes answer

1. The burgundy experience band and the espresso planetarium sit adjacent,
   forming one ~175vh dark mass whose similar hues mush the boundary, while
   testimonials + team form a pale valley right before the closing CTA.
2. The founder letter repeats the stats band's exact figures (2,500 / 33)
   two viewports later, so the page reads as having one fact.
3. The stats backdrop is nearly the same wide hall scene as the hero's first
   slideshow frame, and its plate caption claims an "opening keynote" the
   photo (heads-down mid-exam) does not show.
4. The line-of-record strip is too thin to act as a visual beat between the
   dark hero and dark stats band.

## Changes

### 1. Resequence (apps/web/app/page.tsx)

`<Testimonials />` moves above `<GalleryDome />`. Final order: Hero,
LineOfRecord, StatsBand, AboutSplit, ProductCards, ExperienceGrid (burgundy),
Testimonials (cream), GalleryDome (espresso), TeamGrid (cream), ClosingCta,
footer. Restores strict light/dark alternation; the proof dome lands directly
before the people and the ask (peak-end).

### 2. Letter de-echo (apps/web/content/about.ts)

The middle paragraph becomes exactly:
"Last July we answered it in a lecture hall at IIT Bombay: a national field
narrowed to one stage, judged in person by the firms that hire this talent."
User-approved replacement for his earlier wording. The numbers remain on the
stats band, llms.txt, faq.ts, and seo.ts unchanged; nothing to fact-sync
because this surface drops the figures rather than altering them.

### 3. Stats backdrop and caption (apps/web/components/sections/StatsBand.tsx)

Backdrop swaps from `the-hall-at-capacity` to a tight mid-contest close-up:
view `deep-focus` first (unused anywhere on the site today); fallback
`in-the-zone` if the frame reads wrong. Hero image variant, same dark
`bg-espresso/85` overlay, same parallax wrapper, `fetchPriority="low"` and
quality 50 stay (the overlay hides compression). Plate caption becomes
"Plate II · Deep focus, mid-contest" and must honestly describe whichever
frame ships. The italic emotional line and the four stats are untouched.

### 4. Record-strip breathing (apps/web/components/sections/LineOfRecord.tsx)

Container padding `py-5` becomes `py-7 sm:py-8`. Still plain static HTML,
still zero motion.

## Explicitly out of scope

The instruments section (its flatness is the user-gated real screenshots,
not layout), the hero, both dark bands' internals, all other pages.

## Verification

- `pnpm lint && pnpm typecheck && pnpm build`; every route `○ (Static)`.
- Fresh stepped-scroll full-page capture at 1440: confirm the alternating
  cadence and that the two dark bands no longer touch.
- 320px sweep: no horizontal scroll; testimonials/planetarium/team order
  correct.
- The shipped backdrop frame matches its caption (view the actual image).
- The letter renders the approved sentence verbatim.
