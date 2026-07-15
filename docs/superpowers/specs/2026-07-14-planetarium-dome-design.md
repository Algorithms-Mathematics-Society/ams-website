# Planetarium dome: the home proof gallery, rounder and darker

Date: 2026-07-14
Status: approved (brainstormed with Tilak: dark planetarium ambience, slow
auto-drift, near-full-viewport band)
Applies to: the home "It happened. Here's proof." section only. The /gallery
page's flat grid and lightbox stay untouched as the accessible archive.

## Goal

The current dome reads as a shallow, static barrel on a cream strip. Make it
read as a photo planetarium: visibly spherical, slowly alive, and enveloping.

## Decisions

1. Ambience: the band goes dark. Section ground `bg-espresso`; the dome's
   radial blend and edge fades resolve into a near-black espresso tint so the
   sphere melts into shadow. Heading and hint invert to cream; the
   "See the full gallery" link renders cream on the dark ground.
2. Idle drift: the dome rotates on its own at ~3 deg/sec (one lap in about
   two minutes). This is the site's SECOND sanctioned looping animation
   (after the hero slideshow); record it in the ledger for the final review.
3. Size: the band is ~85svh tall (min height 560px) with the heading floating
   at its top; a destination, not a strip.

## Implementation

### DomeGallery.tsx: one new prop

`autoRotateDegPerSec?: number` (default 0 = off). A dedicated RAF loop nudges
`rotationRef.y` by `deg * dt` and calls the existing `applyTransform`. It runs
only when ALL hold:

- no drag in progress (`draggingRef`) and no inertia RAF active
- no photo enlarged (`focusedElRef` empty)
- the document is visible (pause on `visibilitychange`)
- `prefers-reduced-motion` is not `reduce` (checked live via matchMedia)

Drag start suspends the drift; after drag/inertia settle it resumes following
a ~1s delay. Enlarge suspends it; close resumes it. The loop is cancelled on
unmount. No other component logic changes.

### Circularity tuning (props passed by the section)

- `fitBasis: "min"`, `fit: 0.62`, `minRadius: 420`: radius follows the band's
  height instead of page width, which is what removes the barrel look.
- `segments: 26`: fewer, larger tiles with visible per-tile curvature.
- `maxVerticalRotationDeg: 9`, `dragSensitivity: 25`: weightier drag that
  shows more of the sphere's tilt.

### GalleryDome.tsx: section restyle

- `<section className="bg-espresso ...">`, band `h-[85svh] min-h-[560px]`.
- `overlayBlurColor` becomes the espresso-black tint (a hex chosen to match
  the section ground exactly; single source in the section file).
- `SectionHeading` gains `inverse`; the drag hint becomes `text-cream-light/60`;
  the gallery link `text-cream-light` with gold hover underline.
- Heading block overlays the band's top (absolute within the section) so the
  dome fills the full height behind it.

## Unchanged, and guarded by verification

Reduced motion (no drift, no inertia, photos fully visible), keyboard
open/close (Enter/Space/Escape), scroll lock on enlarge, /gallery page,
no new dependencies, every route `○ (Static)`.

## Verification

- `pnpm lint && pnpm typecheck && pnpm build` (all static).
- Drift: rotation advances while idle; freezes during drag, while a photo is
  open, and under emulated reduced motion; resumes after.
- Visual: settled screenshots at 1440 and 375; heading legible on espresso;
  edge fades show no cream seam; 320px no horizontal scroll.
- Ledger updated: second sanctioned loop, for the whole-branch review.
