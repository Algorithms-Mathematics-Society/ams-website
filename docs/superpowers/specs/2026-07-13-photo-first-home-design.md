# Photo-First Home + Gallery (design spec)

Status: approved in brainstorming on 2026-07-13. Build against this.
Repo: `/home/user/ams-main` (marketing site; `ENGINEERING_GUIDE.md` is authoritative,
especially section 5 image/latency budgets). Scope: home page (`apps/web/app/page.tsx`
sections Hero, StatsBand, GalleryGrid), the `/gallery` route, `content/gallery.ts`,
new optimized assets, and renaming the source photos in `media/photos/`.

HARD BOUNDARIES: do not touch `apps/web/content/derive.ts`,
`apps/web/components/sections/derive/DerivePartners.tsx`, or `CLAUDE.md` (uncommitted
parallel-session work). No API/data changes. Feature branch; explicit-path staging
only; no em dashes in any produced text.

## 1. Source photo renaming (media/photos/, the source of truth)

Duplicates first (verify byte-identity with cmp before each deletion):

- Delete `AMSD_009.jpg` (byte-duplicate of `AMAR0764.jpg`).
- If `AMSD_005.jpg` is byte-identical to `Derive - Goodies Distribution.jpg`, delete
  `AMSD_005.jpg` and rename the survivor per the manifest; if NOT identical, keep
  both (`...Goodies Distribution.jpg` and `...Goodies Distribution II.jpg`).

Rename manifest (26 files after dedupe; keep original extensions):

| Old                               | New                                                     |
| --------------------------------- | ------------------------------------------------------- |
| AMAR0762.jpg                      | AMS Derive - In the Zone.jpg                            |
| AMAR0763.jpg                      | AMS Derive - Debating the Problem Set.jpg               |
| AMAR0764.jpg                      | AMS Derive - Debating the Problem Set II.jpg            |
| AMAR0765.jpg                      | AMS Derive - Huddle at the MacBook.jpg                  |
| AMAR0766.jpg                      | AMS Derive - Talking with the Professor.jpg             |
| AMAR0767.jpg                      | AMS Derive - Reviewing a Solution.jpg                   |
| AMAR0768.jpg                      | AMS Derive - Reading the Scorecard.jpg                  |
| AMAR0769.jpg                      | AMS Derive - Finalists at the Convergence Banner.jpg    |
| AMAR0770.jpg                      | AMS Derive - Finalists at the Convergence Banner II.jpg |
| AMAR0772.jpg                      | AMS Derive - Address Before the Final Round.jpg         |
| AMSD_004.jpg                      | AMS Derive - Swag Desk.jpg                              |
| Derive - Goodies Distribution.jpg | AMS Derive - Goodies Distribution.jpg                   |
| AMSD_006.png                      | AMS Derive - The Hall at Capacity.png                   |
| AMSD_007.png                      | AMS Derive - Contest in Progress.png                    |
| AMSD_008.jpg                      | AMS Derive - Deep Focus.jpg                             |
| AMSD_010.png                      | AMS Derive - The Evening Social.png                     |
| AMSD_011.jpeg                     | AMS Derive - Card Games at the Social.jpeg              |
| AMSD_012.jpg                      | AMS Derive - The AMS Deck.jpg                           |
| AMSD_013.png                      | AMS Derive - Blitz Chess Huddle.png                     |
| AMSD_014.jpg                      | AMS Derive - The Chess Crowd.jpg                        |
| AMSD_015.jpg                      | AMS Derive - Blitz on the Phone.jpg                     |
| AMSD_016.jpg                      | AMS Derive - Interview Day Briefing.jpg                 |
| AMSD_017.jpg                      | AMS Derive - Finalists Meet the Interviewers.jpg        |
| AMSD_018.png                      | AMS Derive - Prize Cheque Moment.png                    |
| AMSD_019.png                      | AMS Derive - Thank You Jane Street (Graphic).png        |
| AMSD_020.png                      | AMS Derive - The Full Room.png                          |

`AMSD_019` is a rendered graphic, not a photo: renamed and kept as an asset, used
nowhere in this pass.

## 2. Optimization pipeline (camera originals never enter public/)

A committed script `scripts/optimize-photos.mjs` (repo already ships `sharp` via the
web app's dependencies) reads the renamed originals and writes WebP into
`apps/web/public/images/derive26/` with slug names derived from the new names
(`ams-derive-goodies-distribution.webp` etc.):

- `hero/` 1920w, quality tuned so the hero lands at or under 200 KB (guide section 5).
- `thumb/` 640w for grid cells.
- `full/` 1600w for the lightbox/gallery large view.

The script is idempotent (skips up-to-date outputs), prints a size report, and fails
loudly if any output exceeds budget (hero > 200 KB, thumb > 120 KB, full > 450 KB).
Only outputs for the images the site uses are required (hero, stats backdrop, the 12
gallery picks); generating all 26 is fine if budgets hold.

## 3. Home page changes

- **Hero** (`components/sections/Hero.tsx`): REVISED 2026-07-13 after user review
  (the side-figure variant read as placement, not immersion): full-bleed. The
  section becomes an edge-to-edge photo hero: `the-hall-at-capacity` via
  `next/image` `fill` + `priority` (LCP), `object-cover`, min height ~85vh, a
  dark gradient overlay (stronger at the text side/bottom) and the existing
  headline/copy/CTAs re-colored for the dark ground with AA contrast. The
  small figcaption moves to a corner caption. Copy itself unchanged.
- **Photo breaker** (new `components/sections/PhotoBreaker.tsx`): one full-width
  cinematic band between ExperienceGrid and GalleryGrid: `the-full-room` at
  ~55vh, dark overlay, a single line of copy and a quiet link to /gallery.
  Lazy loaded, not priority.
- **StatsBand** (`components/sections/StatsBand.tsx`): backdrop image
  `ams-derive-contest-in-progress` heavily darkened (overlay at ~75-85% depending on
  measured contrast) behind the existing stat figures; lazy (below the fold), not
  `priority`.
- **GalleryGrid** (`components/sections/GalleryGrid.tsx` + `content/gallery.ts`):
  populate `src` on the 12 items; labels rewritten to match the real shots (labels
  are the alt text per the existing interface). Curation and labels:

| Slot | Image (slug)                                   | Label / alt                                       |
| ---- | ---------------------------------------------- | ------------------------------------------------- |
| 1    | ams-derive-goodies-distribution                | Goodies distribution, contest kits changing hands |
| 2    | ams-derive-swag-desk                           | The swag desk, notebooks and formula tees         |
| 3    | ams-derive-in-the-zone                         | A contestant deep in the problem set              |
| 4    | ams-derive-debating-the-problem-set            | Debating the problem set between rounds           |
| 5    | ams-derive-finalists-meet-the-interviewers     | Finalists meet the partner interviewers           |
| 6    | ams-derive-prize-cheque-moment                 | Prize cheques on stage for the winners            |
| 7    | ams-derive-address-before-the-final-round      | The address before the final round                |
| 8    | ams-derive-blitz-chess-huddle                  | Blitz chess huddle at the evening social          |
| 9    | ams-derive-the-evening-social                  | The evening social from above                     |
| 10   | ams-derive-the-ams-deck                        | The AMS deck, custom cards in play                |
| 11   | ams-derive-finalists-at-the-convergence-banner | Finalists at the Convergence banner               |
| 12   | ams-derive-the-full-room                       | The full room, everyone who made it happen        |

## 4. /gallery route

Consumes the same `GALLERY` items; grid uses `thumb/`, opening/expanded view uses
`full/`. If the current gallery page has no expanded view, add the minimal
no-JS-first pattern consistent with the guide (anchor to the full image or a small
client component only if one already exists; do not introduce a new JS lightbox
library).

## 5. Acceptance

1. `pnpm build` clean, static output.
2. Lighthouse (mobile) on the built site: LCP <= 2.0 s, CLS < 0.05, performance >= 95
   (guide budgets); JS on home <= 100 KB gzipped (unchanged by this work).
   DOCUMENTED EXCEPTION (2026-07-13, user-approved): the full-bleed photo hero
   scores 93 perf / 3.15 s LCP under Lighthouse's Lantern SIMULATION, against a
   main baseline of 98 / 2.29 s that already failed the 2.0 s budget with a text
   LCP. Real-device Chrome traces (mobile CPU throttle + Slow 4G, cold and warm)
   measure the hero LCP at 0.77-0.95 s, comfortably inside budget. All
   engineering levers were applied first (fetchPriority=high per Next 16's
   decoupling, srcset/qualities config, payload shrink, sync decode). Per the
   guide's "explained or fixed" rule, this deviation is explained: the residual
   simulated gap is Lantern's pricing of any full-viewport image LCP versus a
   text headline, i.e. the cost of the immersion itself, and was accepted as a
   product decision. CLS 0 and the JS budget are unaffected.
3. Browser pass of home + /gallery: hero photo behind readable headline, stats
   legible on the backdrop, 12 real thumbnails, alt text present, no layout shift
   while images load.
4. No camera original reachable under `/` (only `public/images/derive26/*` WebP).
5. `media/photos/` contains exactly the 26 renamed files (dedupe done); slugs match
   the manifest.
