# Hero Bound Plate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the AMS home page hero as "the Bound Plate": two equal-width pages split by a gold spine, a cream title page on the left and the existing three-photo slideshow matted like an archival plate on an espresso page to the right, replacing the current full-bleed photo-with-scrim banner.

**Architecture:** One new shared UI component (`PlateFrame`, the mounted-print treatment already built for the founder letter, extracted so it has one implementation instead of two) adopted first by the founder letter with zero visual change, then by a fully rebuilt `Hero.tsx`. Two small CSS additions in `globals.css` (`.rise-hero-plate`, `.spine-draw`) reuse the existing load-time animation grammar (`.rise`, `.mask-line`) rather than inventing a new motion system.

**Tech Stack:** Next.js App Router, TypeScript strict, Tailwind v4 (`@theme` tokens in `apps/web/app/globals.css`), fully static export. No new dependencies.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-16-hero-bound-plate-design.md`. Follow it exactly; if a task below appears to contradict it, the spec governs and the conflict should be raised, not silently resolved either way.
- No copy changes anywhere: headline, subhead, CTA labels, and the plate caption text are byte-identical to what ships today.
- No new dependencies. CSS-first animation; the only new client-side cost is zero (no new JS, only CSS classes and existing primitives).
- `transform`/`opacity` only for anything that animates (site-wide motion rule). `.spine-draw` uses `transform: scale` only.
- Every one-time entrance animation must resolve correctly under `prefers-reduced-motion: reduce` and with no JS. This repo has no unit-test runner; "tests" in this plan are `pnpm lint && pnpm typecheck && pnpm build` (must stay `○ (Static)` on every route) plus concrete Playwright verification scripts with expected values, matching how every other section on this page has been verified this session. Run every gate from the repo root: `cd /home/user/ams-main`.
- Stage explicit paths only when committing; never `git add -A`. No em dashes in code, comments, or commit messages.
- A dev server for this checkout should be running at `http://localhost:3000` for the Playwright verification steps. If it is not, start one: `cd /home/user/ams-main && pnpm dev` (background it), then wait for `curl -sf http://localhost:3000` to succeed before running any verification script.

---

### Task 1: Extract the shared PlateFrame component

**Files:**

- Create: `apps/web/components/ui/PlateFrame.tsx`
- Modify: `apps/web/components/sections/AboutSplit.tsx`

**Interfaces:**

- Produces: `PlateFrame`, a named export from `apps/web/components/ui/PlateFrame.tsx`.

  ```ts
  interface Props {
    children: React.ReactNode;
    /** Printed below the mat. Omit to render the frame with no caption. */
    caption?: string;
    /** "light" (default): ink caption text, for a cream-ground page.
     *  "dark": cream-light caption text, for an espresso-ground page. */
    captionTone?: "light" | "dark";
    className?: string;
  }
  export function PlateFrame({
    children,
    caption,
    captionTone,
    className,
  }: Props): JSX.Element;
  ```

  Task 2 imports this exact signature.

- [ ] **Step 1: Read the current founder letter markup**

Read `apps/web/components/sections/AboutSplit.tsx`. Confirm the photo block reads exactly:

```tsx
<Reveal className="lg:col-span-5">
  {/* Mounted print: a hairline frame, a thin cream mat, and a soft
      lift off the cream ground, so the portrait reads as the
      "Plate II" the caption calls it rather than a photo card. */}
  <div className="rounded-lg border border-ink/15 bg-cream-light p-2.5 shadow-[0_2px_24px_rgba(70,64,58,0.10)]">
    <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
      <Image
        src={ABOUT.photo.src}
        alt={ABOUT.photo.alt}
        fill
        sizes="(min-width: 1280px) 440px, (min-width: 1024px) 38vw, 92vw"
        className="object-cover object-[center_38%]"
      />
    </div>
  </div>
  <p className="mt-3 text-xs text-ink/60 italic">{ABOUT.photoCaption}</p>
</Reveal>
```

If it differs from this, stop and report NEEDS_CONTEXT with the actual content; the rest of this task assumes this exact starting point.

- [ ] **Step 2: Create the PlateFrame component**

Write `apps/web/components/ui/PlateFrame.tsx`:

```tsx
import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  /** Printed below the mat. Omit to render the frame with no caption. */
  caption?: string;
  /** "light" (default): ink caption text, for a cream-ground page.
   *  "dark": cream-light caption text, for an espresso-ground page. */
  captionTone?: "light" | "dark";
  className?: string;
}

/**
 * The site's mounted-print treatment: a hairline frame, a thin cream mat,
 * and a soft lift off the page, so photographic content reads as an
 * archival plate rather than a rounded photo card. The mat itself stays
 * cream regardless of the surrounding page (a real mat board reads the
 * same in a dark room); only the caption's tone follows the page.
 * Children own their aspect ratio and clipping (a single portrait Image,
 * or a multi-layer crossfade); this component only owns the mat and the
 * caption.
 */
export function PlateFrame({
  children,
  caption,
  captionTone = "light",
  className,
}: Props) {
  return (
    <figure className={className}>
      <div className="rounded-lg border border-ink/15 bg-cream-light p-2.5 shadow-[0_2px_24px_rgba(70,64,58,0.10)]">
        {children}
      </div>
      {caption ? (
        <figcaption
          className={cn(
            "mt-3 text-xs italic",
            captionTone === "dark" ? "text-cream-light/70" : "text-ink/60",
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
```

- [ ] **Step 3: Adopt PlateFrame in AboutSplit**

In `apps/web/components/sections/AboutSplit.tsx`, add the import:

```tsx
import { PlateFrame } from "@/components/ui/PlateFrame";
```

Replace the photo block from Step 1 with:

```tsx
<Reveal className="lg:col-span-5">
  <PlateFrame caption={ABOUT.photoCaption}>
    <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
      <Image
        src={ABOUT.photo.src}
        alt={ABOUT.photo.alt}
        fill
        sizes="(min-width: 1280px) 440px, (min-width: 1024px) 38vw, 92vw"
        className="object-cover object-[center_38%]"
      />
    </div>
  </PlateFrame>
</Reveal>
```

Everything else in the file (the text column, the signature block) stays exactly as it is; do not touch it.

- [ ] **Step 4: Gates**

Run: `cd /home/user/ams-main && pnpm lint && pnpm typecheck`
Expected: both exit 0. `pnpm lint` may print up to 3 pre-existing warnings in `DomeGallery.tsx` (unrelated `react-hooks/exhaustive-deps`); zero errors.

Run: `pnpm build`
Expected: `✓ Compiled successfully`, then `✓ Generating static pages using 11 workers (13/13)`, and the route table lists every route (including `/`) as `○ (Static)`.

- [ ] **Step 5: Verify the founder letter is visually unchanged**

With the dev server running on port 3000, use the Playwright MCP tools (`browser_navigate`, `browser_run_code_unsafe` or `browser_evaluate`) to check the rendered result matches the pre-change appearance. Run this script via the Playwright unsafe-code tool:

```js
async (page) => {
  await page.setViewportSize({ width: 1440, height: 950 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page
    .locator('h2:has-text("Built by competitors")')
    .first()
    .scrollIntoViewIfNeeded();
  await page.waitForTimeout(1400);
  const result = await page.evaluate(() => {
    const sec = [...document.querySelectorAll("section")].find((s) =>
      s.textContent.includes("Built by competitors"),
    );
    const mat = sec.querySelector("figure > div, .lg\\:col-span-5 > div");
    const img = sec.querySelector("img");
    const caption = sec.querySelector("figcaption, p.italic");
    const cs = mat ? getComputedStyle(mat) : null;
    return {
      matFound: !!mat,
      matBorderRadius: cs ? cs.borderRadius : null,
      matBackground: cs ? cs.backgroundColor : null,
      matPadding: cs ? cs.padding : null,
      matBoxShadow: cs ? cs.boxShadow.slice(0, 30) : null,
      imgSrc: img ? img.currentSrc.split("/").pop().split("?")[0] : null,
      captionText: caption ? caption.textContent.trim() : null,
      captionTag: caption ? caption.tagName : null,
    };
  });
  await page.screenshot({
    path: "plateframe-founder-check.jpeg",
    type: "jpeg",
    quality: 88,
  });
  return JSON.stringify(result, null, 1);
};
```

Expected: `matFound: true`, `matBorderRadius` includes `8px` (Tailwind's `rounded-lg`), `matBackground` is the cream-light color, `matPadding` is `10px` (Tailwind's `p-2.5`), `matBoxShadow` starts with `rgba(70, 64, 58`, `imgSrc` is the founder photo file, `captionText` is the founder's photo caption (e.g. "Plate II · The founder, mid-address"), `captionTag` is `FIGCAPTION`. Compare the screenshot to the section's appearance from earlier this session (mounted portrait, hairline frame, cream mat, italic caption below); it should look identical apart from the tag-name change, which has no visual effect.

- [ ] **Step 6: Commit**

```bash
cd /home/user/ams-main
git add apps/web/components/ui/PlateFrame.tsx apps/web/components/sections/AboutSplit.tsx
git commit -m "$(cat <<'EOF'
Extract the mounted-print treatment into a shared PlateFrame

The founder letter's hairline-frame-plus-mat treatment is about to be
reused a second time by the hero redesign. Pulling it into one component
now, before the second caller exists, means there is exactly one
implementation instead of two copies drifting apart. The founder letter
adopts it first with no visual change: same classes, same computed
styles, only the caption's tag moves from a plain p to figcaption inside
a figure, matching the semantic pattern already used for testimonials.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Rebuild Hero.tsx as the two-page layout

**Files:**

- Modify: `apps/web/app/globals.css`
- Modify: `apps/web/components/sections/Hero.tsx`

**Interfaces:**

- Consumes: `PlateFrame` from Task 1, exact import `import { PlateFrame } from "@/components/ui/PlateFrame";`, props `caption?: string`, `captionTone?: "light" | "dark"`, `className?: string`, `children: React.ReactNode`.
- Produces: a two-column grid in `Hero.tsx` with this exact class on the grid wrapper: `grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16`. Task 3 replaces this exact string. The left page and right page are direct children of that grid, in that order; Task 3 inserts a third child (the spine) between them.
- Produces: a new CSS class `.rise-hero-plate` in `globals.css`, used exactly once in this task.

This task deliberately ships an intermediate state: two pages side by side with a plain gap between them, no spine yet. That keeps this task's own verification focused on the layout, the images, and performance, before Task 3 adds the purely decorative spine on top of a known-good foundation.

- [ ] **Step 1: Add the plate's load-time timing class**

In `apps/web/app/globals.css`, find this block (it currently ends the hero copy choreography comment group):

```css
/* Hero copy choreography: subhead and CTAs ride the existing .rise
   keyframes, delayed to land 500ms after the headline finishes. */
.rise-hero-sub {
  animation-delay: 1100ms;
}
.rise-hero-cta {
  animation-delay: 1250ms;
}
```

Replace it with:

```css
/* Hero copy choreography: subhead and CTAs ride the existing .rise
   keyframes, delayed to land 500ms after the headline finishes. The
   plate (the right page's matted photo) rides the same .rise keyframes
   too, landing mid-sequence: after the headline lines start moving, but
   before the subhead, so the words and the picture read as one opening
   beat instead of two unrelated timers. */
.rise-hero-sub {
  animation-delay: 1100ms;
}
.rise-hero-cta {
  animation-delay: 1250ms;
}
.rise-hero-plate {
  animation-delay: 750ms;
}
```

- [ ] **Step 2: Rebuild Hero.tsx**

Replace the entire contents of `apps/web/components/sections/Hero.tsx` with:

```tsx
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlateFrame } from "@/components/ui/PlateFrame";

/**
 * The Bound Plate: the hero reads as two facing pages of an open book.
 * Left page (plain cream, the section's own background): the title-page
 * copy. Right page (solid espresso): the three-photo crossfade, matted
 * like the founder portrait's "Plate II" rather than run full-bleed, so
 * the page's archival-plate idea (Plate I/II/III) becomes the hero's own
 * structure instead of a detail borrowed from elsewhere on the page. See
 * docs/superpowers/specs/2026-07-16-hero-bound-plate-design.md. The spine
 * between the two pages lands in a follow-up change; this step is the
 * two-page layout on its own.
 */
export function Hero() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="grid min-h-[480px] items-stretch gap-10 lg:min-h-[600px] lg:grid-cols-2 lg:gap-16">
          {/* Left page: the title page. */}
          <div className="flex flex-col justify-center">
            <Eyebrow className="rise">Quant · Algorithms · Assessment</Eyebrow>
            {/* Two-line mask reveal, 700ms per line, 120ms stagger,
                starting 400ms after load so the page gets one
                uninterrupted beat. */}
            <h1 className="mt-6 font-display text-hero text-burgundy">
              <span className="mask-line mask-load-1">
                <span>Where India&apos;s sharpest</span>
              </span>
              <span className="mask-line mask-load-2">
                <span>minds converge.</span>
              </span>
            </h1>
            <p className="rise rise-hero-sub mt-6 max-w-md leading-relaxed">
              National contests in quantitative finance and competitive
              programming. Access turns how people place into a hiring signal
              firms can use.
            </p>
            <div className="rise rise-hero-cta mt-9 flex flex-wrap gap-4">
              <Button href="/derive">Enter Derive &apos;26</Button>
              <Button href="/access" variant="outline">
                For firms
              </Button>
            </div>
          </div>

          {/* Right page: the plate. */}
          <div className="flex flex-col items-center justify-center bg-espresso px-6 py-10 lg:px-10">
            <PlateFrame
              caption="Plate I · Derive '26 finals · IIT Bombay · July 2026"
              captionTone="dark"
              className="rise rise-hero-plate mx-auto w-full max-w-md"
            >
              {/* LCP candidate: preloaded, nothing above it may render
                  late.
                  - fetchPriority stays explicit (Next 16 decoupled it
                    from priority).
                  - quality 75: the mat is light, so compression has
                    nowhere to hide; keep the full-fidelity tier.
                  - decoding sync commits the plate in the same frame as
                    first paint.
                  - .kenburns settles 1.04 to 1.00 over 8s, transform
                    only, and never delays the paint itself. */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                <div className="kenburns absolute inset-0">
                  <div className="hero-slide absolute inset-0">
                    <Image
                      src="/images/derive26/hero/finalists-mid-problem.webp"
                      alt="Finalists working through the problem set in the hall at IIT Bombay, Derive '26 finals"
                      fill
                      priority
                      fetchPriority="high"
                      quality={75}
                      decoding="sync"
                      sizes="(min-width: 1024px) 448px, 92vw"
                      className="object-cover object-[center_85%]"
                    />
                  </div>
                  <div className="hero-slide hero-slide-2 absolute inset-0 opacity-0">
                    <Image
                      src="/images/derive26/hero/the-full-room.webp"
                      alt="Group photo of the Derive '26 cohort and organizers in the hall at IIT Bombay"
                      fill
                      quality={75}
                      sizes="(min-width: 1024px) 448px, 92vw"
                      className="object-cover object-[center_62%]"
                    />
                  </div>
                  <div className="hero-slide hero-slide-3 absolute inset-0 opacity-0">
                    <Image
                      src="/images/derive26/hero/winners-with-the-cheques.webp"
                      alt="The three Derive '26 winners holding their prize cheques, flanked by organizers, IIT Bombay"
                      fill
                      quality={75}
                      sizes="(min-width: 1024px) 448px, 92vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </PlateFrame>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

Note what changed from the old file beyond structure: the `Eyebrow` drops `inverse` (the ground is now cream, so it should render in `gold-deep`, its default, not `gold-bright`); the headline is `text-burgundy` instead of `text-cream-light` (matching every other headline on a cream section, e.g. the founder letter's `h2`); the subhead drops its explicit color and text-shadow classes and inherits the body's `ink` color; the "For firms" button changes from `variant="inverse"` to `variant="outline"` (an inverse cream-fill button would be nearly invisible on a cream page; `outline` already exists in `Button.tsx` and needs no change there); the old floating pill caption is gone, replaced by `PlateFrame`'s printed caption line.

- [ ] **Step 3: Gates**

Run: `cd /home/user/ams-main && pnpm lint && pnpm typecheck && pnpm build`
Expected: lint exits 0 (same pre-existing warnings ceiling as Task 1, zero errors); typecheck exits 0; build shows `✓ Compiled successfully` and every route `○ (Static)`.

- [ ] **Step 4: Verify the layout at every breakpoint**

Run this Playwright script (dev server on port 3000):

```js
async (page) => {
  const out = {};
  for (const [name, w, h] of [
    ["1440", 1440, 900],
    ["768", 768, 1000],
    ["375", 375, 900],
    ["320", 320, 900],
  ]) {
    await page.setViewportSize({ width: w, height: h });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(2200);
    await page.screenshot({
      path: `hero-2page-${name}.jpeg`,
      type: "jpeg",
      quality: 86,
    });
    out[name] = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const img = document.querySelector(".kenburns img");
      const eyebrow = document.querySelector("h1")?.previousElementSibling;
      return {
        docScrollW: document.documentElement.scrollWidth,
        innerW: innerWidth,
        h1Color: getComputedStyle(h1).color,
        headlineText: h1.textContent.trim(),
        imgRenderedW: img
          ? Math.round(img.getBoundingClientRect().width)
          : null,
        eyebrowColor: eyebrow ? getComputedStyle(eyebrow).color : null,
      };
    });
  }
  return JSON.stringify(out, null, 1);
};
```

Expected at every width: `docScrollW === innerW` (no horizontal scroll). `h1Color` should be the burgundy RGB (`rgb(87, 28, 36)`). `headlineText` is `"Where India's sharpestminds converge."` (the two mask-line spans concatenate without a space in `textContent`; that is expected and matches the pre-existing hero). `eyebrowColor` should be the gold-deep RGB (`rgb(125, 97, 34)`), not gold-bright.

Read each `hero-2page-*.jpeg` screenshot. Confirm: at 1440 and 768, the two pages sit side by side (cream text page left, espresso plate page right); at 375 and 320, they stack (text page above, plate page below); no page is empty or missing its content; the plate's mat, crossfade image, and caption are all visible and legible.

- [ ] **Step 5: Verify reduced motion and no-JS**

Run:

```js
async (page) => {
  const out = {};
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  out.reducedMotion = await page.evaluate(() => {
    const h1span = document.querySelector(".mask-load-2 > span");
    const plate = document.querySelector(".rise-hero-plate");
    return {
      headlineTranslate: getComputedStyle(h1span).translate,
      plateOpacity: getComputedStyle(plate).opacity,
    };
  });
  await page.emulateMedia({ reducedMotion: null });

  const ctx = await page
    .context()
    .browser()
    .newContext({
      javaScriptEnabled: false,
      viewport: { width: 1440, height: 900 },
    });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3000", { waitUntil: "load" });
  await p.waitForTimeout(800);
  out.noJs = await p.evaluate(() => ({
    headlineVisible: document
      .querySelector("h1")
      .textContent.includes("converge"),
    plateVisible: !!document.querySelector(".kenburns img"),
    imgComplete: document.querySelector(".kenburns img").complete,
  }));
  await ctx.close();
  return JSON.stringify(out, null, 1);
};
```

Expected: `reducedMotion.headlineTranslate` is `"0px"` or `"none"` (settled, not offset); `reducedMotion.plateOpacity` is `"1"`. `noJs.headlineVisible` and `noJs.plateVisible` are both `true`; `noJs.imgComplete` is `true` (the LCP image loads and renders without JS).

- [ ] **Step 6: Verify the image sizing win**

Run:

```js
async (page) => {
  const reqs = [];
  page.on("request", (r) => {
    if (/finalists-mid-problem/.test(r.url())) reqs.push(r.url());
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "load" });
  await page.waitForTimeout(800);
  const url = reqs[0] || "";
  const match = url.match(/[?&]w=(\d+)/);
  return JSON.stringify({
    requestedWidth: match ? match[1] : null,
    fullUrl: url.slice(-90),
  });
};
```

Expected: `requestedWidth` is close to `448` (the `sizes` cap at `lg`), not `1920` or another near-viewport-width value. This confirms the plate requests a meaningfully smaller image than the old full-bleed hero's `100vw` request, the LCP-contention improvement the spec named as a side effect. If the requested width is far off from 448 (for example still near 1000+), the `sizes` attribute on the three `Image` components needs tightening to match the plate's actual rendered width measured in Step 4; adjust and re-run this check before moving on.

- [ ] **Step 7: Commit**

```bash
cd /home/user/ams-main
git add apps/web/app/globals.css apps/web/components/sections/Hero.tsx
git commit -m "$(cat <<'EOF'
Rebuild the hero as two pages: a title page and a matted plate

The full-bleed photo hero, even after this session's de-slop pass, is
still the most common shape for a contest-site hero. This is the
structural half of the Bound Plate redesign: a plain cream left page
carries the unchanged headline, subhead, and CTAs; a solid espresso
right page carries the existing three-photo crossfade, matted with the
same PlateFrame treatment the founder portrait uses, instead of running
full-bleed with a scrim. No copy changed. The spine between the two
pages is a follow-up commit; this is the layout on its own.

The plate's sizes attribute requests a meaningfully smaller image than
the old 100vw hero at every breakpoint, which was flagged earlier this
session as one of three contending full-bleed hero images on the LCP
budget; this shrinks that contention as a side effect, not the point of
the change.

Verified 1440/768/375/320: no horizontal scroll, correct stacking order,
reduced motion resolves instantly, content renders with no JS, and the
plate's actual image request is close to its rendered width rather than
the viewport width.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Add the spine

**Files:**

- Modify: `apps/web/app/globals.css`
- Modify: `apps/web/components/sections/Hero.tsx`

**Interfaces:**

- Consumes: the exact grid wrapper class from Task 2, `grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16`, and the fact that the left page div and right page div are its only two children, in that order.
- Produces: the final Hero.tsx. Nothing downstream consumes this task's output; it is the last task in this plan.

- [ ] **Step 1: Add the spine's draw animation**

In `apps/web/app/globals.css`, find the gold underline draw block:

```css
/* Gold underline draw: left to right over 400ms once its Reveal wrapper
   is visible. Per-instance timing via inline transition-delay. */
html.js .underline-draw {
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease-reveal);
}
html.js .reveal.is-visible .underline-draw {
  transform: scaleX(1);
}
```

Directly after it, add:

```css
/* Hero spine rule: drawn once on load, like .mask-line/.rise (the hero
   has no Reveal wrapper to gate on; it is always above the fold, so
   there is nothing to wait for). Horizontal, left to right, when the
   two pages stack; vertical, top to bottom, once they sit side by side
   at lg and the spine sits between them. One class, one keyframe: the
   end state (scale(1)) is the same regardless of which axis the start
   state used, so the breakpoint only needs to flip the starting
   transform and its origin. Swept into the reduced-motion crush by the
   existing wildcard rule at the bottom of this file; no separate
   opt-in needed. */
.spine-draw {
  transform: scaleX(0);
  transform-origin: left;
  animation: spine-draw-in 0.5s var(--ease-reveal) forwards;
  animation-delay: 600ms;
}
@keyframes spine-draw-in {
  to {
    transform: scale(1);
  }
}
@media (min-width: 1024px) {
  .spine-draw {
    transform: scaleY(0);
    transform-origin: top;
  }
}
```

- [ ] **Step 2: Insert the spine into Hero.tsx**

In `apps/web/components/sections/Hero.tsx`, change the grid wrapper's class from:

```tsx
<div className="grid min-h-[480px] items-stretch gap-10 lg:min-h-[600px] lg:grid-cols-2 lg:gap-16">
```

to:

```tsx
<div className="grid min-h-[480px] items-stretch gap-10 lg:min-h-[600px] lg:grid-cols-[1fr_2.5rem_1fr] lg:gap-0">
```

Then insert a new middle child between the left page's closing `</div>` and the right page's opening `<div className="flex flex-col items-center justify-center bg-espresso ...">`:

```tsx
{
  /* The spine: a rule between the two pages with a small volume label,
    drawn once on load. Horizontal when the pages stack below lg;
    vertical with a soft gutter shadow on each side once they sit
    side by side. */
}
<div aria-hidden className="relative py-2 lg:py-0">
  <div className="absolute inset-y-0 left-1/2 hidden w-8 -translate-x-full bg-gradient-to-r from-transparent to-ink/10 lg:block" />
  <div className="absolute inset-y-0 left-1/2 hidden w-8 bg-gradient-to-l from-transparent to-ink/10 lg:block" />
  <div className="spine-draw h-px w-full bg-gold lg:absolute lg:inset-y-0 lg:left-1/2 lg:h-auto lg:w-px lg:-translate-x-1/2" />
  <span className="mt-3 block text-center text-[10px] font-semibold tracking-[0.25em] text-gold-deep uppercase lg:absolute lg:top-1/2 lg:left-1/2 lg:mt-0 lg:w-max lg:-translate-x-1/2 lg:-translate-y-1/2 lg:[writing-mode:vertical-rl]">
    Vol. I · Derive &apos;26
  </span>
</div>;
```

The full grid should now read, in order: the left page div, this new spine div, the right page div (three children total).

- [ ] **Step 3: Gates**

Run: `cd /home/user/ams-main && pnpm lint && pnpm typecheck && pnpm build`
Expected: same as Task 2's Step 3 (lint 0 errors, typecheck 0, build all routes `○ (Static)`).

- [ ] **Step 4: Verify the spine at every breakpoint**

Run:

```js
async (page) => {
  const out = {};
  for (const [name, w, h] of [
    ["1440", 1440, 900],
    ["768", 768, 1000],
    ["375", 375, 900],
    ["320", 320, 900],
  ]) {
    await page.setViewportSize({ width: w, height: h });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(2200);
    await page.screenshot({
      path: `hero-spine-${name}.jpeg`,
      type: "jpeg",
      quality: 86,
    });
    out[name] = await page.evaluate(() => {
      const rule = document.querySelector(".spine-draw");
      const cs = getComputedStyle(rule);
      const label = [...document.querySelectorAll("span")].find((s) =>
        s.textContent.includes("Vol. I"),
      );
      return {
        docScrollW: document.documentElement.scrollWidth,
        innerW: innerWidth,
        ruleTransform: cs.transform,
        ruleWritingMode: label ? getComputedStyle(label).writingMode : null,
        ruleWidth: Math.round(rule.getBoundingClientRect().width),
        ruleHeight: Math.round(rule.getBoundingClientRect().height),
      };
    });
  }
  return JSON.stringify(out, null, 1);
};
```

Expected: `docScrollW === innerW` at every width (no horizontal scroll introduced by the spine). At `1440` and `768`: `ruleHeight` is large (spans the page height) and `ruleWidth` is near `1` (a vertical hairline); `ruleWritingMode` is `"vertical-rl"`. At `375` and `320`: `ruleWidth` is large (spans the container width) and `ruleHeight` is near `1` (a horizontal hairline); `ruleWritingMode` is `"horizontal-tb"`.

Read each `hero-spine-*.jpeg` screenshot. Confirm: at 1440/768 the vertical gold rule sits centered between the two pages with a soft shadow on each side and the rotated "VOL. I · DERIVE '26" label is legible running top to bottom; at 375/320 a horizontal gold rule with the label centered beneath it sits between the stacked text block and the stacked plate block; nothing overlaps or clips.

- [ ] **Step 5: Verify reduced motion for the spine**

Run:

```js
async (page) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const result = await page.evaluate(() => {
    const rule = document.querySelector(".spine-draw");
    return { transform: getComputedStyle(rule).transform };
  });
  await page.emulateMedia({ reducedMotion: null });
  return JSON.stringify(result);
};
```

Expected: `transform` is the identity matrix (`"matrix(1, 0, 0, 1, 0, 0)"` or `"none"`), meaning the rule is fully drawn instantly, not caught mid-animation or stuck at `scale(0)`.

- [ ] **Step 6: Full-page regression sweep**

Confirm nothing outside the hero moved. Run:

```js
async (page) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const sections = await page.evaluate(() =>
    [...document.querySelectorAll("section")].map((s) =>
      (s.querySelector("h1,h2")?.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 30),
    ),
  );
  return JSON.stringify(sections);
};
```

Expected: the list still reads, in order: the hero headline, "Est. 2025...", the stats band (no heading, empty string is fine), "Built by competitors...", "Two contests and a platform.", "Inside the finals.", "In their words.", "It happened. Here's proof.", "The next edition...". If any section is missing or reordered, something outside `Hero.tsx` was touched; stop and report DONE_WITH_CONCERNS.

- [ ] **Step 7: Commit**

```bash
cd /home/user/ams-main
git add apps/web/app/globals.css apps/web/components/sections/Hero.tsx
git commit -m "$(cat <<'EOF'
Add the spine to the Bound Plate hero

The gold rule between the two pages, with a soft gutter shadow and a
rotated "Vol. I - Derive '26" label, completing the open-book read the
two-page layout set up in the previous commit. Drawn once on load like
the rest of the hero (no Reveal wrapper to gate on): one CSS class whose
starting transform and origin flip at the lg breakpoint, so the same
class draws left-to-right when the pages stack and top-to-bottom once
they sit side by side.

Verified 1440/768/375/320: no horizontal scroll, correct orientation at
each breakpoint, reduced motion resolves the rule fully drawn instantly,
and no other section on the page was affected.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
EOF
)"
```

---

## Self-review notes

**Spec coverage:** two equal-width pages (Task 2), cream left page with unchanged copy (Task 2), espresso right page with the existing crossfade matted via PlateFrame (Task 2), spine with gutter shadow and rotated label (Task 3), `Button` outline variant for "For firms" (Task 2, uses the variant that already exists in `Button.tsx`, confirmed by reading the file before writing this plan), PlateFrame extraction with the founder letter as first caller (Task 1), the LCP sizing win (Task 2, Step 6 verifies it directly), reduced-motion and no-JS handling for every new primitive (Task 2 Step 5, Task 3 Step 5), mobile stacks text first (Task 2, DOM order is text page then plate page, confirmed by the screenshot check in Step 4). The math-motif ornament is explicitly out of scope per the spec and appears nowhere in this plan.

**Type consistency:** `PlateFrame`'s props (`children`, `caption?`, `captionTone?: "light" | "dark"`, `className?`) are defined once in Task 1 and used identically in both call sites (Task 1's AboutSplit adoption, Task 2's Hero usage). The grid wrapper class Task 3 modifies is quoted verbatim from what Task 2 produces.

**Placeholder scan:** no TBD/TODO; every step has complete code; every verification step has a runnable script with a concrete expected value, not "verify it looks right."
