# Hero redesign: the Bound Plate

Date: 2026-07-16
Status: approved (brainstormed with Tilak; he wanted something more distinctive
than the current full-bleed photo banner, explicitly not a common pattern,
and wanted the existing three-photo slideshow kept as real content, not
dropped)
Applies to: `apps/web/components/sections/Hero.tsx` only. No other section,
no copy changes (the headline, subhead, and CTA labels are unchanged; they
were finalized in the 2026-07-16 copy de-slop pass and the headline was kept
specifically for its "converge" / CONVERGENCE pun).

## The problem with the current hero

The hero is a full-bleed photo slideshow with a scrim and bottom-left copy.
It already went through one round of de-slopping this session (a brand-tinted
scrim, a real bottom anchor, a deeper crop), but the underlying shape, photo
backdrop with text overlaid, is the single most common hero pattern for a
contest or event site (the iicpc.com reference Tilak showed uses the same
shape: photo left, colored panel right). Improving the execution of a common
pattern still leaves a common pattern. He asked for something a rival site
would not have.

## The idea

The site already has an archival conceit running through it: the hero photo
is captioned "Plate I," the founder portrait is "Plate II," the closing
photo is "Plate III," and the founder photo is mounted with a hairline frame
and cream mat rather than left as a plain rounded card. Nothing before now
has made that the hero's own idea. The Bound Plate does: the hero becomes the
title page of the volume the rest of the site already claims to be. It reads
as two facing pages of an open book, split by a spine.

**Left page** (cream, the page's own background): the eyebrow, the existing
two-line headline, the subhead, the two CTAs. Pure title page. No photo.

**Right page** (solid espresso): the existing three-photo crossfade, matted
and framed exactly like the founder portrait, sitting under a dark ground
so it reads as a plate glued into a dark portfolio leaf, not a backdrop.
Its caption prints below the frame instead of floating as a pill on top of
the image.

**The spine**: a thin gold rule between the two pages with a soft inward
shadow on each side, suggesting a book's gutter, and a small rotated label
running down it: "VOL. I · DERIVE '26."

This is not a new decorative idea bolted onto the hero. It is the site's
existing plate/mount language, promoted from a supporting detail to the
hero's entire organizing structure. No competitor's contest site opens like
a book.

## Why equal-width columns here, unlike the founder letter

The founder letter split 5/7 (photo/text) because a letter's text should
lead and the photo is a supporting credential; giving them equal width there
was flagged this session as an unexamined "no tension" default. Here the
columns are equal on purpose: two facing pages of a real book are the same
width. The asymmetry lives inside each page, the headline block does not
fill its column's full height, the photo plate sits inset with a generous
mat, not in the column split itself. Equal width is the correct choice when
it is argued from the concept, and wrong when it is the unexamined default;
this is the former.

## Layout

### Desktop (lg and up)

A three-track grid inside the existing `Container` (`max-w-6xl`,
`px-5 sm:px-8`): left page, a narrow spine track, right page. Roughly equal
outer tracks (`1fr` / spine / `1fr`); vertically centered against each other
rather than stretched or bottom-anchored. The bottom-anchor decision made
earlier this session (`items-end`) was scoped to the full-bleed photo
design; a title-page layout reads more naturally centered, so this
supersedes it for the new structure.

- **Left page**: `Eyebrow` (non-inverse now: the ground is cream, not a
  dark photo, so it uses its default `gold-deep` styling, not the `inverse`
  `gold-bright` variant the current dark-photo hero needs), the unchanged
  two-line `mask-line` headline, the unchanged subhead, then the two CTAs.
  `Enter Derive '26` stays the solid burgundy button. `For firms` moves from
  `variant="inverse"` (a cream-fill button, built for legibility on a dark
  photo, which would nearly vanish on a cream page) to `variant="outline"`,
  which already exists in `Button.tsx` (`border-burgundy/40 text-burgundy`,
  transparent fill) and needs no component change.
- **Spine**: a centered vertical gold rule the height of the taller page,
  with a soft dark gradient fading inward from the rule on both sides (a
  few pixels wide, low opacity) to suggest a gutter shadow. The rotated
  label sits mid-spine, small, letterspaced, gold-deep or gold, set with
  `writing-mode: vertical-rl` (pure CSS, no transform hacks, no JS).
- **Right page**: solid `bg-espresso`. Inside it, the mounted plate: the
  same hairline-frame-plus-cream-mat treatment already built for the founder
  portrait (`border`, `bg-cream-light` mat, soft shadow), containing the
  existing three-image crossfade unchanged in mechanism (same
  `.kenburns` wrapper, same `.hero-slide`/`-2`/`-3` crossfade classes, same
  LCP discipline: frame one keeps `priority`, `fetchPriority="high"`,
  `quality={75}`, `decoding="sync"`). The frame becomes a bounded aspect box
  (proposed `aspect-[4/3]`, to be confirmed against the real crops during
  implementation the way every other section's crop has needed a live
  check) instead of `absolute inset-0`. Below the mat, the caption prints as
  a line, not a floating pill, matching the founder letter's caption
  styling but recolored for the dark ground: small, italic, `cream-light`
  at reduced opacity, not `ink`. Same one caption serves all three slides,
  exactly as today.

### Mobile (below lg)

Stacks: left page first (headline and CTAs reachable high on the page,
since most traffic is phones and the CTA should not require scrolling past
a large photo to reach), then the right page below it on its own espresso
band. The vertical spine becomes a horizontal hairline rule between the two
stacked blocks, with the small label centered above or below it,
unrotated. No new breakpoint logic beyond what the grid already needs;
this mirrors how every other section on the page already stacks text before
or after its photo content.

## Component boundary: extract the mount, don't copy it twice

The hairline-frame-plus-mat treatment now appears in two places (founder
letter, hero). Copying the class string a second time repeats the mistake
already flagged and fixed elsewhere on this page (duplicated card shells).
Extract a small shared component, `PlateFrame` (or similar; naming is an
implementation detail), that renders the frame, mat, and optional caption
line, taking the photo (or in the hero's case, the crossfade markup) as
children. The founder letter's existing markup becomes the first caller of
the new component in the same change, not a follow-up, so there is exactly
one place this treatment is implemented.

## Performance, a side effect worth naming

The current hero was flagged earlier this session as a real LCP risk: three
near-full-bleed `sizes="100vw"` images (the hero's own three crossfade
frames plus the closing CTA's photo) load in close succession on throttled
mobile. A matted plate at roughly half the container's width requests a
meaningfully smaller image at every breakpoint (`sizes` will be tuned to the
plate's actual rendered width, on the order of the founder photo's
`440px`/`38vw` sizing, not `100vw`), which directly shrinks that
contention. On mobile, where the plate may sit outside the very first
viewport once the text page stacks above it, the LCP element may become the
headline text itself rather than an image at all, a better outcome than the
current design can produce under any tuning. This is a byproduct of the
redesign, not its purpose, and does not change the hard budgets already in
place (LCP ≤ 2.0s, ≤ 100 KB gzipped JS on home).

## Motion

- Headline, subhead, and CTAs keep their existing load-time reveal exactly
  as implemented (`mask-line` / `mask-load-1` / `mask-load-2` for the
  headline, `.rise` family for the subhead and CTA row), since that
  choreography was reviewed and kept earlier this session.
- The mounted plate gets a load-time fade-in of its own (reusing `.rise`
  with a new timing step, landing after the headline settles), so the plate
  arrives as part of the same opening beat rather than appearing inert.
- The spine's vertical rule draws once on load, the vertical analogue of
  the existing `.underline-draw` (`scaleY` instead of `scaleX`, same
  `--ease-reveal` timing token). This is one small CSS addition, not a new
  animation system.
- The crossfade cycle inside the plate, the Ken Burns settle, and their
  existing reduced-motion and no-JS handling are entirely unchanged.
- The new vertical rule-draw class must be swept into the existing global
  `prefers-reduced-motion` crush block alongside `.underline-draw`, so
  reduced-motion users see the spine fully drawn instantly, matching every
  other one-time reveal on the page. This is a checklist item for the
  implementation plan, not a new mechanism.

## Explicitly out of scope

- The ambient math-motif ornament (a faint gold hairline diagram behind the
  headline) raised earlier in this brainstorm. The book/plate structure is
  already the section's whole distinctiveness move; stacking a second
  device on day one is scope creep. A future idea, not part of this design.
- Any copy change. Headline, subhead, CTA labels, and the plate caption
  text are all unchanged from what shipped in the 2026-07-16 copy pass.
- Any change to the three source photographs or their crossfade order.
- Any other section of the page.

## Verification

- `pnpm lint && pnpm typecheck && pnpm build`; every route stays
  `○ (Static)`.
- Fresh screenshots at 1440, 768, 375, 320: the spine renders correctly at
  desktop, collapses to a horizontal rule below `lg`, no horizontal scroll
  at 320.
- The plate's `sizes` attribute matches its real rendered width at each
  breakpoint (measured, not assumed, the way every image-sizing decision
  this session has been verified).
- Reduced-motion pass: headline, subhead, CTAs, plate, and the spine rule
  all resolve to their final visible state instantly; the crossfade cycle
  freezes correctly per its existing (unchanged) reduced-motion handling.
- No-JS pass: headline and plate content fully visible with the crossfade
  pinned to frame one, matching current hero behavior.
- A real network-waterfall check of the plate's requested image size versus
  the current `100vw` request, confirming the LCP contention this design is
  expected to reduce actually shrinks.
- Contrast check: `Eyebrow`'s non-inverse `gold-deep` on the cream left
  page, and the caption's `cream-light` on the espresso right page.
