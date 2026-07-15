# Home surface rhythm: one photo room per bookend

Date: 2026-07-15
Status: approved (brainstormed with Tilak from stepped-scroll captures of the
branch at 1440; he confirmed all three remaining clashes and picked the
surface-retune approach over resequencing)
Applies to: the home page on `feat/home-photo-immersive` only; three surgical
changes, no new components, no JS added.

## Relationship to earlier specs

The 2026-07-14 home-rhythm spec fixed cadence by resequencing and by swapping
the stats backdrop photo. Scrolling the result, Tilak confirmed the fix was
not enough: the thin record line still leaves two dark photographic bands
nearly touching at the top, the back half stacks five image-bearing sections
once real content lands, and the espresso planetarium and the closing plate
read as two dark rooms separated only by the team grid.

This spec supersedes section 3 of the 07-14 spec (stats backdrop swap): the
backdrop is now removed entirely, not swapped. Sections 1, 2, and 4 of that
spec stand.

## Principle

The page keeps exactly two full-bleed photographic environments: the hero and
the closing CTA. They are the emotional bookends, and each earns its impact by
being the only one of its kind in its half of the page. Every photograph
between them appears as framed content (cards, prints, portraits), never as
an environment. Photos are proof; text is meaning; each needs the other as a
foil.

## Changes

### 1. StatsBand goes typographic (apps/web/components/sections/StatsBand.tsx)

Remove the backdrop `Image`, the `bg-espresso/85` overlay div, and the
parallax wrapper. The section keeps `bg-espresso`, its current height, the
italic emotional line, the four stats, the one sanctioned count-up, and the
gold underline draws. Numbers over flat ground read as claims; over a photo
they read as decoration, and the hero one viewport up has already shown the
stage.

The "Plate II · Deep focus, mid-contest" caption leaves with its photo. The
remaining plate captions renumber so the archival sequence has no gap; the
implementation plan enumerates every caption on the page, including any
numbered lightbox captions in the dome, and reassigns numerals contiguously.

Side effect, welcome: one fewer image request (~31 KB at 750w) on the page.

### 2. Gallery dome moves onto paper (apps/web/components/sections/GalleryDome.tsx)

The espresso ground becomes a warm paper tone from the existing palette
(final token picked by eye at build time between the cream variants; the
intent is "inset spread", clearly distinct from the plain cream sections
around it). A hairline rule top and bottom insets the section. The eyebrow,
heading, and drag hint flip from cream-on-dark to the ink/burgundy palette.
Each drifting thumb gets a thin white print border and a soft shadow so the
photos read as physical prints scattered on a desk.

Unchanged: drag, idle drift, keyboard navigation, reduced-motion fallback,
no-JS fallback, and the lightbox, which stays dark (`#1F0A0D`); a modal is
its own context, not part of the page's rhythm.

### 3. Footer colophon honesty (apps/web/content/site.ts)

The colophon domain line returns to amshq.in only. The 07-13 redesign spec
decided amsderive.in and amsaccess.com do not come back; the current branch
renders all three from the colophon string in `content/site.ts`. Trim that
string; the Footer component itself needs no change.

Open question for Tilak at spec review: amsderive.in also appears in
`content/seo.ts` (`sameAs`) and in a `content/faq.ts` answer ("published on
amsderive.in"). If that domain no longer resolves, both are stale facts and
join this change; if it is live and redirecting, both stay. Until he
answers, this spec touches only the colophon string. The same applies to
public/llms.txt, which names amsderive.in and amsaccess.com; it joins
whichever way the answer goes.

## Explicitly out of scope

Section order (the 07-14 resequence stands), the hero, the line of record,
the founder letter, the instruments cards (gated on real screenshots), the
experience band, testimonials, team, the closing CTA, all other pages.

## Verification

- `pnpm lint && pnpm typecheck && pnpm build`; every route `○ (Static)`.
- Fresh stepped-scroll full-page capture at 1440: the hero and the closing
  CTA are the only full-bleed photo environments; the stats band reads as a
  type poster; the dome reads as prints on paper, not a dark room.
- 320 px sweep: no horizontal scroll anywhere on the page.
- Reduced-motion pass: stats numbers render final values instantly; dome
  photos all visible without drift; nothing hidden with JS disabled.
- Plate captions on the page are contiguous roman numerals with no gap.
- Footer shows amshq.in only, on every page (shared chrome).
