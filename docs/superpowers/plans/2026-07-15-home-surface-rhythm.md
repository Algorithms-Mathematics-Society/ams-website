# Home Surface Rhythm Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the hero and the closing CTA the home page's only full-bleed photo environments: the stats band goes typographic on solid espresso, the gallery dome moves onto a paper ground with print-styled tiles, and the footer colophon returns to amshq.in only.

**Architecture:** Three surgical edits to existing components plus content strings; no new components, no new JS, no new dependencies. Spec: `docs/superpowers/specs/2026-07-15-home-surface-rhythm-design.md` (supersedes section 3 of the 2026-07-14 home-rhythm spec).

**Tech Stack:** Next.js 16 App Router, Tailwind v4 (`@theme` tokens in `apps/web/app/globals.css`), TypeScript strict.

## Global Constraints

- Work on branch `feat/home-photo-immersive` in this worktree; push to the same branch.
- No em dashes anywhere: not in copy, comments, or commit messages. Use colon, comma, period, or the brand middle dot (·).
- Never `git add -A` or `git add .`; stage explicit paths only.
- All copy lives in `content/` as typed objects except strings already inline in components (the hero caption is one; edit it in place).
- Run `pnpm lint && pnpm typecheck` from the worktree root before every commit; `pnpm build` must keep every route `○ (Static)`.
- No new dependencies, no new client components, no new scroll observers.
- Reduced motion and no-JS behavior must not regress: stats numbers render real values server-side; dome photos remain visible without JS drift.
- Every command below runs from the worktree root `/home/user/ams-main/.claude/worktrees/home-photo-immersive` unless stated otherwise.

---

### Task 1: StatsBand goes typographic

**Files:**

- Modify: `apps/web/components/sections/StatsBand.tsx` (whole file, currently 61 lines)

**Interfaces:**

- Consumes: `STATS`, `STATS_BAND` from `@/content/stats`, `CountUp`, `Reveal`, `Container` (all unchanged).
- Produces: nothing new; the section keeps its name and export.

- [ ] **Step 1: Replace the component**

Replace the entire contents of `apps/web/components/sections/StatsBand.tsx` with:

```tsx
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { STATS, STATS_BAND } from "@/content/stats";

/**
 * Numbers as set type (block 03): a typographic poster on solid espresso.
 * The hero one viewport up has already shown the stage, so the band shows
 * no photo; on flat ground the numbers read as claims, not decoration.
 * The count-up is the page's ONE numeric flourish; underlines draw after
 * each number lands.
 */
export function StatsBand() {
  return (
    <section className="bg-espresso py-20 text-cream-light lg:py-28">
      <Container>
        <Reveal>
          <p className="font-display text-xl italic text-cream-light/90 sm:text-2xl">
            {STATS_BAND.emotionalLine}
          </p>
        </Reveal>
        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 150}>
              <dd className="font-display text-stat">
                <CountUp value={stat.value} delay={index * 150} />
              </dd>
              {/* Draws 400ms after its number lands:
                  1200ms count + 150ms stagger + 400ms. */}
              <div
                className="underline-draw mt-3 h-0.5 w-9 bg-gold"
                style={{ transitionDelay: `${1600 + index * 150}ms` }}
                aria-hidden
              />
              <dt className="mt-3 text-sm text-cream-light/85">{stat.label}</dt>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
```

What this removes versus the current file: the `next/image` import, the parallax wrapper `div.parallax-slow`, the backdrop `Image`, the `bg-espresso/85` overlay div, the `relative overflow-hidden` on the section, the `relative` on the Container, and the trailing `Plate II · Deep focus, mid-contest` caption paragraph. Everything else is byte-identical.

- [ ] **Step 2: Check nothing else uses the removed pieces**

Run: `grep -rn "deep-focus" apps/web/ | grep -v node_modules`
Expected: no hits in components (hits under `public/images` listings are fine; the file itself may stay on disk, it is simply no longer referenced on home). If another component references `deep-focus.webp`, stop and re-read the spec; do not delete the image file.

- [ ] **Step 3: Gates**

Run: `pnpm lint && pnpm typecheck`
Expected: both exit 0 with no output beyond the runner lines.

- [ ] **Step 4: Visual check**

The worktree dev server runs on port 3001 (start with `PORT=3001 pnpm dev` if it is not). Open `http://localhost:3001`, scroll to the stats band.
Expected: solid espresso band, italic line, four counting numbers with gold rules, no photo, no plate caption. The band's height matches before (padding classes unchanged).

- [ ] **Step 5: Commit**

```bash
git add apps/web/components/sections/StatsBand.tsx
git commit -m "$(cat <<'EOF'
Set the stats as type on solid espresso, no backdrop photo

The hero one viewport up already shows the stage; on flat ground the
numbers read as claims. Removes the backdrop image, its overlay and
parallax wrapper, and the plate caption, per the 2026-07-15 surface
rhythm spec (supersedes the 07-14 backdrop swap).

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Renumber the plate captions contiguously

**Files:**

- Modify: `apps/web/components/sections/Hero.tsx:107` (caption string only)
- Modify: `apps/web/content/about.ts:15`
- Modify: `apps/web/content/cta.ts:11`

**Interfaces:**

- Consumes: nothing from other tasks (Task 1 already removed the only other printed plate, "Plate II" on the stats band).
- Produces: the page's final plate sequence I, II, III. A plate is a captioned photograph; the dome tiles and experience cards carry no captions and no numerals.

- [ ] **Step 1: Number the hero plate**

In `apps/web/components/sections/Hero.tsx` the caption paragraph currently reads:

```tsx
<p className="caption-fade absolute right-5 bottom-6 rounded-full bg-black/45 px-3.5 py-1.5 text-sm text-cream-light/90 sm:right-8">
  Derive &apos;26 finals · IIT Bombay · July 2026
</p>
```

Change only the text line to:

```tsx
        Plate I · Derive &apos;26 finals · IIT Bombay · July 2026
```

This is a string edit; the hero's layout, images, scrims, and motion are out of scope and must not change. The 07-13 redesign spec already names the hero "Plate I"; printing it completes the archival conceit.

- [ ] **Step 2: Renumber the founder plate**

In `apps/web/content/about.ts` change:

```ts
  photoCaption: "Plate III · The founder, mid-address",
```

to:

```ts
  photoCaption: "Plate II · The founder, mid-address",
```

- [ ] **Step 3: Renumber the closing plate**

In `apps/web/content/cta.ts` change:

```ts
  plateCaption: "Plate XII · The evening social, after the final round",
```

to:

```ts
  plateCaption: "Plate III · The evening social, after the final round",
```

- [ ] **Step 4: Confirm the sequence is contiguous and complete**

Run: `grep -rn "Plate " apps/web/components apps/web/content | grep -v node_modules`
Expected: exactly three caption hits (Hero.tsx "Plate I", about.ts "Plate II", cta.ts "Plate III") plus at most comment lines. Any other printed numeral is a miss; fix it before committing.

- [ ] **Step 5: Gates**

Run: `pnpm lint && pnpm typecheck`
Expected: both exit 0.

- [ ] **Step 6: Commit**

```bash
git add apps/web/components/sections/Hero.tsx apps/web/content/about.ts apps/web/content/cta.ts
git commit -m "$(cat <<'EOF'
Renumber the plates I, II, III with the stats plate gone

A plate is a captioned photograph: the hero, the founder portrait, and
the closing CTA. The hero prints its numeral for the first time; the
founder and closing captions shift up so the archival sequence has no
gap.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Gallery dome onto paper

**Files:**

- Modify: `apps/web/app/globals.css` (one token line added to the `@theme` block)
- Modify: `apps/web/components/sections/GalleryDome.tsx` (colors and comments only)
- Modify: `apps/web/components/gallery/DomeGallery.css` (`.item__image` print treatment)

**Interfaces:**

- Consumes: nothing from other tasks.
- Produces: theme token `--color-paper: #ede6d6` (Tailwind utilities `bg-paper`, `from-paper`, `via-paper` become available). `DomeGallery`'s `overlayBlurColor` prop is set to the same hex; the two must stay equal or the dome's edge fades will show seams.

- [ ] **Step 1: Add the paper token**

In `apps/web/app/globals.css`, inside the `@theme` block, directly after the line `--color-placeholder: #e9e1d3;`, add:

```css
--color-paper: #ede6d6;
```

The value sits between cream (#f5f0e4) and placeholder (#e9e1d3): visibly a different sheet of paper than the cream sections around it, nowhere near a dark room. If it reads wrong by eye in Step 4, adjust the hex here AND in the `overlayBlurColor` prop below, keeping them identical.

- [ ] **Step 2: Reground the section**

Replace the entire contents of `apps/web/components/sections/GalleryDome.tsx` with:

```tsx
import Link from "next/link";
import DomeGallery from "@/components/gallery/DomeGallery";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GALLERY } from "@/content/gallery";

/**
 * Block 07 on home: the proof gallery as prints scattered on a paper
 * ground. The dome drifts slowly while idle and its radial fades resolve
 * into the band's own paper (overlayBlurColor matches bg-paper exactly),
 * so the photos read as physical prints, not a dark room: the closing
 * CTA is the page's only dark photo environment after the hero. The
 * /gallery page keeps the flat grid and lightbox as the accessible,
 * no-JS-friendly archive of the same twelve moments.
 */
export function GalleryDome() {
  const images = GALLERY.filter((item) => item.src).map((item) => ({
    src: item.src as string,
    alt: item.label,
  }));

  return (
    <section className="relative border-y border-ink/10 bg-paper">
      {/* Heading floats over the band's top; pointer-events pass through
          so drags beside the text still reach the dome. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-14 lg:pt-16">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Moments from AMS"
                title="It happened. Here's proof."
              />
              <p className="text-sm text-ink/55">
                Drag to look around · click a photo to open it
              </p>
            </div>
          </Reveal>
        </Container>
      </div>

      {/* fitBasis min ties the radius to the band's height, which is what
          makes the sphere read as round instead of a wide barrel. */}
      <div className="relative h-[85svh] min-h-[560px] w-full overflow-hidden">
        {/* Guarantees heading and hint legibility over the dome's top
            tiles at every breakpoint; sits above the dome's own fades
            (z 3-5) and below the enlarge viewer (z 20). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[6] h-72 bg-gradient-to-b from-paper from-35% via-paper/80 via-65% to-transparent lg:h-52 lg:from-25%"
        />
        <DomeGallery
          images={images}
          overlayBlurColor="#ede6d6"
          grayscale={false}
          fitBasis="min"
          fit={0.62}
          minRadius={420}
          segments={26}
          maxVerticalRotationDeg={9}
          dragSensitivity={25}
          autoRotateDegPerSec={3}
          imageBorderRadius="12px"
          openedImageBorderRadius="16px"
          openedImageWidth="min(560px, 84vw)"
          openedImageHeight="min(420px, 63vw)"
        />
      </div>

      <Container>
        <div className="pb-10 text-center">
          <Link
            href="/gallery"
            className="text-sm font-medium text-burgundy underline-offset-4 hover:text-gold-deep hover:underline"
          >
            See the full gallery <span aria-hidden>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
```

Diff summary versus current: section gets `border-y border-ink/10 bg-paper` instead of `bg-espresso`; `SectionHeading` loses `inverse`; drag hint goes `text-ink/55`; the top scrim gradient swaps espresso for paper; `overlayBlurColor` becomes `#ede6d6`; the gallery link goes burgundy with a gold-deep hover; the header comment now describes prints on paper. Every `DomeGallery` numeric prop is unchanged.

- [ ] **Step 3: Print treatment on the tiles**

In `apps/web/components/gallery/DomeGallery.css`, the `.item__image` rule currently begins:

```css
.item__image {
  position: absolute;
  display: block;
  inset: 10px;
  border-radius: var(--tile-radius, 12px);
  background: transparent;
```

Change `background: transparent;` to the print treatment (three lines replace one):

```css
background: var(--color-cream-light);
border: 3px solid var(--color-cream-light);
box-shadow: 0 2px 12px rgba(70, 64, 58, 0.18);
```

The cream-light border reads as a physical print's white edge against the paper ground; the soft shadow lifts the print off the desk. Everything else in the rule (inset, radius, overflow, transitions) stays.

- [ ] **Step 4: Gates and visual check**

Run: `pnpm lint && pnpm typecheck`
Expected: both exit 0.

Open `http://localhost:3001`, scroll to "It happened. Here's proof."
Expected: paper ground clearly distinct from the cream sections above and below, hairline rules at both edges, dark ink/burgundy heading, tiles with white print borders and soft shadows, edge fades resolving into paper with no seams. Drag the dome; click a photo: the lightbox still opens on its dark ground; Esc closes it. If the paper tone reads too close to cream, deepen the hex in globals.css and the `overlayBlurColor` prop together and look again.

- [ ] **Step 5: Commit**

```bash
git add apps/web/app/globals.css apps/web/components/sections/GalleryDome.tsx apps/web/components/gallery/DomeGallery.css
git commit -m "$(cat <<'EOF'
Set the proof gallery on a paper ground as scattered prints

The dome leaves its dark planetarium room: a warm paper token, hairline
rules, ink heading, and white print borders with soft shadows on every
tile. The closing CTA becomes the only dark photo environment after the
hero, per the 2026-07-15 surface rhythm spec. Drag, drift, keyboard,
reduced motion, and the dark lightbox are unchanged.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Colophon returns to amshq.in only

**Files:**

- Modify: `apps/web/content/site.ts:16-17`

**Interfaces:**

- Consumes: nothing from other tasks.
- Produces: `SITE.copyright` string consumed by `components/layout/Footer.tsx:54` (no component change needed).

- [ ] **Step 1: Trim the copyright string**

In `apps/web/content/site.ts` change:

```ts
  copyright:
    "© 2026 AMS (Algorithms & Mathematics Society) · amshq.in · amsderive.in · amsaccess.com",
```

to:

```ts
  copyright: "© 2026 AMS (Algorithms & Mathematics Society) · amshq.in",
```

Do NOT touch `content/seo.ts` (`sameAs`) or `content/faq.ts`: the spec records those as an open question Tilak has not flagged, so they stay.

- [ ] **Step 2: Gates**

Run: `pnpm lint && pnpm typecheck`
Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add apps/web/content/site.ts
git commit -m "$(cat <<'EOF'
Return the footer colophon to amshq.in only

The 07-13 redesign decided amsderive.in and amsaccess.com do not come
back to the colophon; the entity name line stays intact.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Full verification sweep and push

**Files:**

- No source changes expected; fixes discovered here amend the responsible task's file and get their own commit.

**Interfaces:**

- Consumes: everything above.
- Produces: the pushed branch and capture evidence under the repo root (untracked screenshots; do not commit them).

- [ ] **Step 1: Build gate**

Run: `pnpm build`
Expected: compiles clean; the route table shows every route `○ (Static)`.

- [ ] **Step 2: Stepped-scroll capture at 1440**

With the dev server on 3001, use the Playwright MCP browser: viewport 1440x900, scroll the page in ~810px steps with a ~900ms pause per step (the reveals need to fire), screenshotting each step. Review every frame for the spec's acceptance points: the hero and the closing CTA are the only full-bleed photo environments; the stats band reads as a type poster; the dome reads as prints on paper; plates print I, II, III in order; the colophon shows amshq.in only.

- [ ] **Step 3: 320px sweep**

Resize the browser to 320x700, reload, scroll the full page.
Expected: no horizontal scroll anywhere (compare `document.documentElement.scrollWidth` to 320; equal means pass), stats grid stays two columns, dome usable, headings unclipped.

- [ ] **Step 4: Reduced-motion and no-JS spot checks**

Emulate `prefers-reduced-motion: reduce` and reload: stats show final values instantly (no count-up), dome photos visible without drift. Then disable JavaScript and reload: numbers still render (server markup), dome tiles or their fallback visible, nothing blank.

- [ ] **Step 5: Push**

```bash
git log --oneline origin/feat/home-photo-immersive..HEAD
git push origin feat/home-photo-immersive
```

Expected: the four commits from Tasks 1-4 (plus any fix commits), then a clean push.
