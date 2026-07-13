# Home Photo-Immersive Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the home page of amshq.in to match `media/web-insp/SITE · Home — Designed (photo-immersive).png` and its motion spec, block by block, per the approved spec `docs/superpowers/specs/2026-07-13-home-photo-immersive-redesign-design.md`.

**Architecture:** Static-export Next.js App Router site; sections are Server Components composing typed content from `content/`; motion is CSS-first (new primitives in `globals.css`) with exactly three small client leaves added (CountUp, header overlay state, gallery Lightbox). Each task reworks one block and leaves the page shippable.

**Tech Stack:** Next.js 16 (Turbopack), TypeScript strict, Tailwind 4 (`@theme` tokens in `globals.css`), `next/image`, sharp via `scripts/optimize-photos.mjs`. No new dependencies.

## Global Constraints

- No em dashes anywhere: copy, comments, commit messages. Use colon, comma, period, or the brand middle dot (·).
- Never `git add -A` or `git add .`; stage explicit paths only (parallel Claude session shares this checkout).
- Entity name is exactly "AMS (Algorithms & Mathematics Society)"; never "AMS Society" or "Algorithms and Maths Society".
- Budgets are hard gates: LCP ≤ 2.0 s, CLS < 0.05, home JS ≤ 100 KB gzipped, Lighthouse ≥ 95 throttled mobile.
- Every route must stay `○ (Static)` in `pnpm build` output.
- Motion grammar: easing `cubic-bezier(0.22, 1, 0.36, 1)` everywhere, every animation runs once (never loops), everything respects `prefers-reduced-motion`, content fully visible with JS disabled.
- Animate only `transform` and `opacity` (the body background-color shift is the spec's single sanctioned exception, scroll-driven, no main-thread JS).
- Only verified facts ship: placeholder stats, unapproved quotes, "Name" team entries never reach production. Tasks 4, 5, 9, 10 have explicit ASK-TILAK gates.
- All copy lives in `content/*.ts` typed objects, never inline in JSX.
- Verification per task: `pnpm lint && pnpm typecheck && pnpm build`, plus visual pass at 320/375/768/1440 on the dev server. A dev server may already be running on port 4100 from a parallel session; reuse it, never kill it.
- Work happens on branch `feat/home-photo-immersive`. If a parallel session is active in this checkout, execute in a git worktree (superpowers:using-git-worktrees).

---

### Task 1: Motion foundation (step 0)

**Files:**

- Modify: `apps/web/app/globals.css` (append after the existing `.reveal` rules, before the reduced-motion block; also add one token inside `@theme` and one property on `body`)

**Interfaces:**

- Produces CSS classes consumed by later tasks: `.mask-line` (+ `.mask-load-1`, `.mask-load-2`, `.mask-step-2`), `.kenburns`, `.underline-draw`, `.caption-fade`, `.rise-hero-sub`, `.rise-hero-cta`, `.parallax-slow`, `.experience-band-timeline`.
- Produces token `--ease-reveal`.

- [ ] **Step 1: Create the branch**

```bash
git fetch origin && git switch -c feat/home-photo-immersive origin/main
```

- [ ] **Step 2: Add the easing token**

In `apps/web/app/globals.css`, inside the existing `@theme` block, after `--spacing-section`:

```css
/* Redesign motion grammar: single easing for every reveal (motion spec). */
--ease-reveal: cubic-bezier(0.22, 1, 0.36, 1);
```

- [ ] **Step 3: Add the motion primitives**

In `apps/web/app/globals.css`, insert immediately BEFORE the `@media (prefers-reduced-motion: reduce)` block:

```css
/* ---- Photo-immersive redesign motion primitives ----
   Every animation here runs once and uses --ease-reveal. The global
   reduced-motion block below crushes all durations to 0.01ms, which lands
   each of these on its final (visible) state instantly. */

/* Headline mask reveal: wrap each headline line in .mask-line > span.
   Runs on load in the hero (.mask-load-*) and on scroll inside a Reveal
   wrapper (.mask-step-*). Without JS the load variant still runs (pure
   CSS); the scroll variant is paused only under html.js, so no-JS
   visitors always end up with visible text. */
.mask-line {
  display: block;
  overflow: hidden;
}
.mask-line > span {
  display: block;
  translate: 0 110%;
  animation: mask-up 0.7s var(--ease-reveal) forwards;
}
@keyframes mask-up {
  to {
    translate: 0 0;
  }
}
/* Hero (load-time) stagger: line 1 at 400ms after load, line 2 +120ms. */
.mask-load-1 > span {
  animation-delay: 400ms;
}
.mask-load-2 > span {
  animation-delay: 520ms;
}
/* Scroll-triggered variant: paused until the Reveal wrapper is visible. */
html.js .reveal .mask-line > span {
  animation-play-state: paused;
}
html.js .reveal.is-visible .mask-line > span {
  animation-play-state: running;
}
.mask-step-2 > span {
  animation-delay: 120ms;
}

/* Hero copy choreography: subhead and CTAs ride the existing .rise
   keyframes, delayed to land 500ms after the headline finishes. */
.rise-hero-sub {
  animation-delay: 1100ms;
}
.rise-hero-cta {
  animation-delay: 1250ms;
}

/* Plate caption stamp: fades in last, after the claim (2.2s). */
.caption-fade {
  opacity: 0;
  animation: fade-in 0.6s var(--ease-reveal) forwards;
  animation-delay: 2.2s;
}
@keyframes fade-in {
  to {
    opacity: 1;
  }
}

/* Hero Ken Burns settle: 1.04 to 1.00 over 8s, once, transform only.
   Starts at first paint; never delays the LCP image itself. */
.kenburns {
  animation: kenburns 8s ease-out forwards;
}
@keyframes kenburns {
  from {
    scale: 1.04;
  }
  to {
    scale: 1;
  }
}

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

/* Scroll-driven effects (zero JS). Browsers without animation-timeline
   simply keep the static layout and colors. */
@supports (animation-timeline: view()) {
  /* Backdrop parallax at roughly 0.85x page speed: the wrapper is 8%
     taller than its section on each side and drifts through it. */
  .parallax-slow {
    animation: parallax-shift linear both;
    animation-timeline: view();
  }
  @keyframes parallax-shift {
    from {
      translate: 0 -4%;
    }
    to {
      translate: 0 4%;
    }
  }

  /* Body cream-to-burgundy shift while the experience band (Task 7)
     crosses the viewport, so the band feels entered rather than passed. */
  body {
    timeline-scope: --experience-band;
    animation: body-to-burgundy linear both;
    animation-timeline: --experience-band;
  }
  .experience-band-timeline {
    view-timeline: --experience-band block;
  }
  @keyframes body-to-burgundy {
    0%,
    20% {
      background-color: var(--color-cream);
    }
    45%,
    60% {
      background-color: var(--color-burgundy);
    }
    85%,
    100% {
      background-color: var(--color-cream);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  /* Timeline-driven animations ignore duration overrides; disable them. */
  .parallax-slow,
  body {
    animation: none !important;
  }
}
```

- [ ] **Step 4: Verify**

```bash
pnpm lint && pnpm typecheck && pnpm build
```

Expected: all pass; every route `○ (Static)`. The page looks unchanged (primitives are unused so far). Confirm on the dev server that nothing regressed at 375px.

- [ ] **Step 5: Commit**

```bash
git add apps/web/app/globals.css
git commit -m "Add motion primitives for the photo-immersive home redesign

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Block 01, Hero + transparent nav

**Files:**

- Modify: `apps/web/components/sections/Hero.tsx`
- Modify: `apps/web/components/layout/HeaderShell.tsx`
- Modify: `apps/web/components/layout/Header.tsx`
- Modify: `apps/web/components/layout/MobileNav.tsx:58` (toggle color only)

**Interfaces:**

- Consumes: `.mask-line`/`.mask-load-*`, `.kenburns`, `.caption-fade`, `.rise-hero-sub`, `.rise-hero-cta` from Task 1.
- Produces: HeaderShell wrapper carries Tailwind `group` class and a `data-overlay` attribute (present only on `/` above 80vh); Header/MobileNav style against `group-data-[overlay]:*` variants. Later tasks do not touch the header.

- [ ] **Step 1: Rework HeaderShell for the home overlay state**

Replace the full contents of `apps/web/components/layout/HeaderShell.tsx` with:

```tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Sticky wrapper that hides the header on scroll-down and reveals it on
 * scroll-up. On the home page the header instead overlays the hero photo
 * transparently (fixed, no background) and becomes the solid cream bar
 * only after 80vh, per the motion spec. Client leaf; the header content
 * itself stays server-rendered and is passed through as children.
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const overlayRoute = usePathname() === "/";
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [pastHero, setPastHero] = useState(false);
  const lastY = useRef(0);
  const upTravel = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        ticking.current = false;
        const y = Math.max(0, window.scrollY);
        const delta = y - lastY.current;
        lastY.current = y;
        setAtTop(y < 8);
        setPastHero(y > window.innerHeight * 0.8);

        if (y < 64) {
          // Near the top the header is always shown.
          setHidden(false);
          upTravel.current = 0;
        } else if (delta > 0) {
          setHidden(true);
          upTravel.current = 0;
        } else if (delta < 0) {
          // Small hysteresis so a 1px wobble doesn't flash the header in.
          upTravel.current -= delta;
          if (upTravel.current > 12) setHidden(false);
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent over the hero photo; solid cream bar past 80vh.
  const overlay = overlayRoute && !pastHero;

  return (
    <div
      data-overlay={overlay ? "" : undefined}
      className={cn(
        "group z-40 transition-[translate,box-shadow] duration-300 ease-out",
        overlayRoute ? "fixed inset-x-0 top-0" : "sticky top-0",
        // Over the hero the header never hides; it is part of the photo beat.
        hidden && !overlay && "-translate-y-full",
        !atTop &&
          !hidden &&
          !overlay &&
          "shadow-[0_1px_12px_rgba(87,28,36,0.08)]",
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Make Header styles overlay-aware**

In `apps/web/components/layout/Header.tsx`, replace the component body with:

```tsx
export function Header() {
  return (
    <HeaderShell>
      <header className="h-16 border-b border-burgundy/10 bg-cream transition-colors duration-300 group-data-[overlay]:border-transparent group-data-[overlay]:bg-transparent">
        <Container className="flex h-full items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label={`${SITE.name} home`}
          >
            <Image
              src="/brand/mark-glyph-primary.svg"
              alt=""
              width={32}
              height={29}
              priority
              className="group-data-[overlay]:hidden"
            />
            <Image
              src="/brand/mark-glyph-white.svg"
              alt=""
              width={32}
              height={29}
              priority
              className="hidden group-data-[overlay]:block"
            />
            <span className="font-display text-xl font-semibold tracking-[0.22em] text-burgundy transition-colors duration-300 group-data-[overlay]:text-cream-light">
              {SITE.name}
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink transition-colors hover:text-burgundy group-data-[overlay]:text-cream-light/90 group-data-[overlay]:hover:text-cream-light"
              >
                {link.label}
              </Link>
            ))}
            <Button href={COMPETE_LINK.href}>{COMPETE_LINK.label}</Button>
          </nav>

          <MobileNav />
        </Container>
      </header>
    </HeaderShell>
  );
}
```

(Imports are unchanged.)

- [ ] **Step 3: Overlay-tint the mobile toggle**

In `apps/web/components/layout/MobileNav.tsx`, change the toggle button's className from
`"flex h-11 w-11 items-center justify-center text-burgundy"` to
`"flex h-11 w-11 items-center justify-center text-burgundy transition-colors duration-300 group-data-[overlay]:text-cream-light"`.

- [ ] **Step 4: Rework the Hero**

Replace the full contents of `apps/web/components/sections/Hero.tsx` with:

```tsx
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-end overflow-hidden pb-20 sm:pb-24">
      {/* LCP element: preloaded, nothing above it may render late.
          - fetchPriority must be explicit on Next 16 (priority no longer
            implies the fetchpriority=high hint).
          - quality 50 needs next.config images.qualities to include 50.
          - decoding sync lets the already-downloaded hero commit in the
            same frame as first paint.
          - .kenburns settles 1.04 to 1.00 over 8s, transform only, and
            never delays the paint itself. */}
      <div className="kenburns absolute inset-0">
        <Image
          src="/images/derive26/hero/winners-with-the-cheques.webp"
          alt="The three Derive '26 winners holding their prize cheques, flanked by organizers, IIT Bombay"
          fill
          priority
          fetchPriority="high"
          quality={50}
          decoding="sync"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* Directional overlay: darkest under the copy at the bottom left. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/30"
      />

      <Container className="relative">
        <div className="max-w-xl">
          <Eyebrow inverse className="rise">
            Quant · Algorithms · Assessment
          </Eyebrow>
          {/* Two-line mask reveal, 700ms per line, 120ms stagger, starting
              400ms after load so the photo gets one uninterrupted beat. */}
          <h1 className="mt-6 font-display text-hero text-cream-light">
            <span className="mask-line mask-load-1">
              <span>Where India&apos;s sharpest</span>
            </span>
            <span className="mask-line mask-load-2">
              <span>minds converge.</span>
            </span>
          </h1>
          <p className="rise rise-hero-sub mt-6 max-w-md leading-relaxed text-cream-light/85">
            National contests in quantitative finance and competitive
            programming, plus Access, the platform that turns performance into
            verified hiring signal.
          </p>
          <div className="rise rise-hero-cta mt-9 flex flex-wrap gap-4">
            <Button href="/derive">Enter Derive &apos;26</Button>
            <Button
              href="/access"
              variant="outline"
              className="border-cream-light/50! text-cream-light! hover:border-cream-light! hover:bg-cream-light/10!"
            >
              For firms
            </Button>
          </div>
        </div>
      </Container>

      {/* Scroll whisper and plate caption: the archival stamp lands last. */}
      <p className="caption-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-[11px] tracking-[0.3em] text-cream-light/60 uppercase sm:block">
        Scroll
      </p>
      <p className="caption-fade absolute right-5 bottom-6 text-sm text-cream-light/70 sm:right-8">
        Derive &apos;26 finals · IIT Bombay · July 2026
      </p>
    </section>
  );
}
```

- [ ] **Step 5: Verify**

```bash
pnpm lint && pnpm typecheck && pnpm build
```

Expected: pass, all routes static. On the dev server:

- Home at 1440 and 375: header transparent over the photo (white mark, cream links), headline lines rise from a mask 0.4s after load, subhead/CTAs follow, caption and "SCROLL" appear last (~2.2s), photo settles slowly.
- Scroll past the hero: header becomes the cream bar with hairline and hide/show behavior resumes.
- Every other page (e.g. /derive): header identical to before (sticky cream from the top).
- DevTools > Rendering > emulate `prefers-reduced-motion`: everything visible instantly.
- 320px: no horizontal scroll.

- [ ] **Step 6: Commit**

```bash
git add apps/web/components/sections/Hero.tsx apps/web/components/layout/HeaderShell.tsx apps/web/components/layout/Header.tsx apps/web/components/layout/MobileNav.tsx
git commit -m "Rework hero to bottom-copy photo beat with transparent nav

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Block 02, Line of Record

**Files:**

- Create: `apps/web/content/record.ts`
- Create: `apps/web/components/sections/LineOfRecord.tsx`
- Modify: `apps/web/app/page.tsx` (insert after `<Hero />`)

**Interfaces:**

- Produces: `LINE_OF_RECORD` const (`{ established: string; line: string }`) and `<LineOfRecord />` section. Nothing else depends on them.

- [ ] **Step 1: Content**

Create `apps/web/content/record.ts`:

```ts
/**
 * The imprint line under the hero. Static, never animated; states only
 * AMS-scoped facts. Sponsors are deliberately absent: Jane Street and QRT
 * sponsor Derive, not AMS, and are named on the Derive page.
 */
export const LINE_OF_RECORD = {
  established: "Est. 2025 · Mumbai",
  line: "Two national contests · One assessment platform · Finals hosted at IIT Bombay",
} as const;
```

- [ ] **Step 2: Component**

Create `apps/web/components/sections/LineOfRecord.tsx`:

```tsx
import { Container } from "@/components/ui/Container";
import { LINE_OF_RECORD } from "@/content/record";

/** Thin cream imprint strip. Plain HTML, no motion, ever (motion spec 02). */
export function LineOfRecord() {
  return (
    <section className="border-b border-burgundy/10 bg-cream-light">
      <Container className="flex flex-col gap-2 py-5 text-[11px] font-medium tracking-[0.25em] text-ink/70 uppercase sm:flex-row sm:items-center sm:gap-10">
        <p className="shrink-0 text-gold-deep">{LINE_OF_RECORD.established}</p>
        <p>{LINE_OF_RECORD.line}</p>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Compose**

In `apps/web/app/page.tsx`, add `import { LineOfRecord } from "@/components/sections/LineOfRecord";` and render `<LineOfRecord />` immediately after `<Hero />`.

- [ ] **Step 4: Verify**

```bash
pnpm lint && pnpm typecheck && pnpm build
```

Expected: pass. Strip renders under the hero, wraps to two stacked lines at 320px with no horizontal scroll, and renders identically with JavaScript disabled.

- [ ] **Step 5: Commit**

```bash
git add apps/web/content/record.ts apps/web/components/sections/LineOfRecord.tsx apps/web/app/page.tsx
git commit -m "Add the line of record strip under the hero

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Block 03, Numbers over the Hall

**Files:**

- Create: `apps/web/components/ui/CountUp.tsx`
- Modify: `apps/web/content/stats.ts`
- Modify: `apps/web/components/sections/StatsBand.tsx`
- Modify: `apps/web/app/page.tsx` (remove PhotoBreaker)
- Delete: `apps/web/components/sections/PhotoBreaker.tsx`
- Modify: `ENGINEERING_GUIDE.md` and `.claude/skills/ams-site-standards/SKILL.md` (count-up exception)
- Modify (fact-sync): `apps/web/public/llms.txt`, `apps/web/content/seo.ts`, `apps/web/content/faq.ts` as needed

**Interfaces:**

- Consumes: `.underline-draw`, `.parallax-slow` from Task 1.
- Produces: `CountUp` client component, props `{ value: string; delay?: number }`, server-renders `value` verbatim and animates the first number in it from 0 over 1.2 s when 40% in view. `STATS` keeps shape `{ value: string; label: string }[]`; new export `STATS_BAND: { emotionalLine: string }`.

- [ ] **Step 1: ASK-TILAK GATE (blocking)**

Ask Tilak for, and do not merge this task without:

1. The verified institutes-represented count (replaces `XX+`).
2. The verified prize + travel total in ₹ lakh (replaces `₹X.X L`).
3. Confirmation of the finalists number: the design and its emotional line say 33 (CONVERGENCE finalists on stage); `content/stats.ts` currently says 150+. One of them is wrong on some surface; ship whichever he verifies, on every surface.

- [ ] **Step 2: CountUp component**

Create `apps/web/components/ui/CountUp.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

interface Props {
  /** Final display string, e.g. "2,500+", "33", "24+", "₹3.2 L". */
  value: string;
  /** Delay after entering view before the count starts, in ms. */
  delay?: number;
}

/**
 * The page's ONE sanctioned count-up (see the exception recorded in
 * ENGINEERING_GUIDE.md). The final value is server-rendered verbatim, so
 * no-JS visitors, crawlers, and reduced-motion users always see the real
 * number; the animation only decorates. Counts the first number in the
 * string from 0 over 1.2s when 40% in view, once.
 */
export function CountUp({ value, delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const match = value.match(/\d[\d,]*(?:\.\d+)?/);
    if (!match || match.index === undefined) return;
    const target = parseFloat(match[0].replace(/,/g, ""));
    const decimals = match[0].includes(".") ? match[0].split(".")[1].length : 0;
    const grouped = match[0].includes(",");
    const prefix = value.slice(0, match.index);
    const suffix = value.slice(match.index + match[0].length);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now() + delay;
        function frame(now: number) {
          const t = Math.min(1, Math.max(0, (now - start) / 1200));
          const eased = 1 - Math.pow(1 - t, 3);
          const current = target * eased;
          const text = grouped
            ? Math.round(current).toLocaleString("en-IN")
            : current.toFixed(decimals);
          if (el) el.textContent = `${prefix}${text}${suffix}`;
          if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, delay]);

  return <span ref={ref}>{value}</span>;
}
```

- [ ] **Step 3: Stats content**

Replace the contents of `apps/web/content/stats.ts` (substituting the values Tilak verified in Step 1 where this shows `<verified ...>`):

```ts
export interface Stat {
  value: string;
  label: string;
}

/** All four values verified by Tilak on 2026-07-13; the fact-sync map ran. */
export const STATS: Stat[] = [
  { value: "2,500+", label: "Registrations, year one" },
  { value: "<verified finalists count>", label: "CONVERGENCE finalists" },
  { value: "<verified institutes count>+", label: "Institutes represented" },
  { value: "₹<verified total> L", label: "Prizes & travel funded" },
];

export const STATS_BAND = {
  /** The emotional read above the numbers; the stats are the rational read. */
  emotionalLine:
    "2,500 registered. <verified finalists count> stood on that stage.",
} as const;
```

- [ ] **Step 4: StatsBand rework**

Replace the contents of `apps/web/components/sections/StatsBand.tsx`:

```tsx
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { STATS, STATS_BAND } from "@/content/stats";

/**
 * Numbers over the hall (block 03): the claim and its evidence share one
 * frame. Photo backdrop drifts at less than page speed (CSS scroll-driven
 * parallax; static where unsupported). The count-up is the page's ONE
 * numeric flourish; underlines draw after each number lands.
 */
export function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-espresso py-20 text-cream-light lg:py-28">
      {/* Parallax bleed: wrapper is taller than the band so the drift
          never exposes edges. quality 50 is invisible under the overlay.
          fetchPriority low so decor never competes with the hero. */}
      <div className="parallax-slow absolute -inset-y-[8%] inset-x-0">
        <Image
          src="/images/derive26/hero/the-hall-at-capacity.webp"
          alt=""
          aria-hidden
          fill
          quality={50}
          fetchPriority="low"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-espresso/85" aria-hidden />
      <Container className="relative">
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
        <p className="caption-fade mt-14 text-sm text-cream-light/60 italic">
          Plate II · The hall at capacity, opening keynote
        </p>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Retire PhotoBreaker**

In `apps/web/app/page.tsx`: remove the `PhotoBreaker` import and the `<PhotoBreaker />` element. Then:

```bash
git rm apps/web/components/sections/PhotoBreaker.tsx
```

- [ ] **Step 6: Record the count-up exception**

In `ENGINEERING_GUIDE.md`, find the animation ban list (`grep -n "count-up" ENGINEERING_GUIDE.md`) and amend the count-up entry to read: "count-up number counters (one sanctioned exception: the home stats band runs a single count-up, once, server-rendering the real value; banned everywhere else)". Make the matching edit to the Banned line in `.claude/skills/ams-site-standards/SKILL.md` (Smoothness section).

- [ ] **Step 7: Fact-sync (blocking)**

For each value that changed (institutes, prizes, finalists):

```bash
grep -rn "150+\|XX+\|₹X.X\|finalist" apps/web/public/llms.txt apps/web/content/seo.ts apps/web/content/faq.ts apps/web/content/stats.ts
```

Update every stale surface to the verified numbers. A mismatch between surfaces is worse than a missing fact.

- [ ] **Step 8: Verify**

```bash
pnpm lint && pnpm typecheck && pnpm build
```

Expected: pass, all routes static. Dev server: numbers count up once (stagger 150ms), gold underlines draw after each lands, backdrop drifts slower than the page (Chrome; static in Firefox is fine), emotional line reads above the grid. With JS disabled (Chrome DevTools > Ctrl+Shift+P > "Disable JavaScript", reload): the final numbers are all present. Reduced motion: numbers static, everything visible.

- [ ] **Step 9: Commit**

```bash
git add apps/web/components/ui/CountUp.tsx apps/web/content/stats.ts apps/web/components/sections/StatsBand.tsx apps/web/app/page.tsx ENGINEERING_GUIDE.md .claude/skills/ams-site-standards/SKILL.md apps/web/public/llms.txt apps/web/content/seo.ts apps/web/content/faq.ts
git commit -m "Print verified numbers over the hall with the one sanctioned count-up

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

(Drop unchanged fact-sync files from the `git add` list.)

---

### Task 5: Block 04, Founder Letter

**Files:**

- Modify: `apps/web/content/about.ts`
- Modify: `apps/web/components/sections/AboutSplit.tsx`

**Interfaces:**

- Consumes: `.underline-draw` from Task 1; the `full` image variants in `public/images/derive26/full/`.
- Produces: `ABOUT` shape becomes `{ eyebrow, title, paragraphs: string[], attribution, photo: { src: string; alt: string }, photoCaption: string }`. `AboutSplit` keeps its name and slot in `page.tsx`.

- [ ] **Step 1: ASK-TILAK GATE (blocking)**

Present the draft letter below to Tilak; do not merge without his approval or replacement text. Draft (no em dashes):

1. "AMS began as a question I could not shake: India produces world-class competitive programmers and quants, so why is there no institution that measures them on their own terms?"
2. "Last July we answered it in a lecture hall at IIT Bombay. 2,500 students registered for Derive; 33 stood on that stage, judged in person by the firms that hire this talent."
3. "Ascent, our systems contest, follows this winter. Everything we run feeds one standard: performance, proven."

Also confirm the founder photo pick: view `public/images/derive26/thumb/address-before-the-final-round.webp` and `thumb/talking-with-the-professor.webp`; use whichever actually shows Tilak speaking (ask if unclear). The steps below assume `address-before-the-final-round`.

- [ ] **Step 2: Content**

Replace `apps/web/content/about.ts`:

```ts
/** First-person founder letter (block 04). Copy approved by Tilak. */
export const ABOUT = {
  eyebrow: "From the founder",
  title: "Built by competitors, for competitors.",
  paragraphs: [
    "<approved paragraph 1>",
    "<approved paragraph 2>",
    "<approved paragraph 3>",
  ],
  attribution: "Tilak, Founder",
  photo: {
    src: "/images/derive26/full/address-before-the-final-round.webp",
    alt: "The founder addressing the hall before the final round of Derive '26",
  },
  photoCaption: "Plate III · Opening address, CONVERGENCE '26",
} as const;
```

(Substitute the approved paragraphs verbatim.)

- [ ] **Step 3: Component**

Replace `apps/web/components/sections/AboutSplit.tsx`:

```tsx
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT } from "@/content/about";

/**
 * The founder letter (block 04): a human voice after institutional proof.
 * Photo and text fade up independently (photo first, text 200ms later);
 * the gold signature rule draws last, like ink drying.
 */
export function AboutSplit() {
  return (
    <section className="py-section">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image
              src={ABOUT.photo.src}
              alt={ABOUT.photo.alt}
              fill
              sizes="(min-width: 1024px) 44vw, 92vw"
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-xs text-ink/60 italic">
            {ABOUT.photoCaption}
          </p>
        </Reveal>

        <Reveal delay={200} className="lg:pt-6">
          <Eyebrow>{ABOUT.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-section text-burgundy">
            {ABOUT.title}
          </h2>
          <div className="mt-6 space-y-5 leading-relaxed">
            {ABOUT.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10">
            {/* The sign-off appears last: rule draws only after the body
                is fully visible (600ms fade + a beat). */}
            <div
              className="underline-draw h-0.5 w-9 bg-gold"
              style={{ transitionDelay: "800ms" }}
              aria-hidden
            />
            <p className="mt-4 font-display font-semibold text-burgundy">
              · {ABOUT.attribution}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Verify**

```bash
pnpm lint && pnpm typecheck && pnpm build
```

Expected: pass. Dev server: real photo in the 4:5 frame, photo fades first, text 200ms later, gold rule draws last before the sign-off. 320px: no overflow. `grep -rn "photoLabel" apps/web/components/sections/AboutSplit.tsx` returns nothing (placeholder gone).

- [ ] **Step 5: Commit**

```bash
git add apps/web/content/about.ts apps/web/components/sections/AboutSplit.tsx
git commit -m "Turn the about split into the signed founder letter

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: Block 05, Three Instruments

**Files:**

- Modify: `apps/web/components/sections/ProductCards.tsx`
- Modify: `apps/web/content/products.ts`

**Interfaces:**

- Produces: `Product` gains `tone?: "glacier"` (Ascent's sub-brand slot tint). Card hover grammar: lift 4px + soft shadow (150ms), screenshot scales 1.03 inside its clipped frame, arrow slides 4px. Real UI screenshots remain gated: the placeholder slots stay until Tilak provides captures (tracked, not blocking this task).

- [ ] **Step 1: Content tone flag**

In `apps/web/content/products.ts`, add to the interface:

```ts
  /** Optional slot tint; Ascent's glacier tone is a quiet sub-brand cue. */
  tone?: "glacier";
```

and add `tone: "glacier",` to the Ascent entry.

- [ ] **Step 2: Card hover grammar**

Replace the `<li>` body in `apps/web/components/sections/ProductCards.tsx` with:

```tsx
<li key={product.eyebrow} className="h-full">
  <Reveal delay={index * 120} className="h-full">
    <div className="group flex h-full flex-col rounded-xl border border-burgundy/10 bg-cream-light p-5 transition-[translate,box-shadow] duration-150 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(87,28,36,0.12)] focus-within:-translate-y-1 focus-within:shadow-[0_10px_30px_rgba(87,28,36,0.12)]">
      <div className="overflow-hidden rounded-lg">
        <PhotoPlaceholder
          label={product.screenshotLabel}
          aspect="aspect-[16/10]"
          rounded="rounded-none"
          className={`transition-transform duration-300 group-hover:scale-[1.03] ${
            product.tone === "glacier"
              ? "border-none bg-[#2c4a63] text-cream-light [&_p]:text-cream-light/80"
              : ""
          }`}
        />
      </div>
      <div className="flex flex-1 flex-col pt-6">
        <Eyebrow>{product.eyebrow}</Eyebrow>
        <h3 className="mt-3 font-display text-card-title text-burgundy">
          {product.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed">{product.body}</p>
        <Link
          href={product.href}
          className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium text-burgundy hover:underline"
        >
          Explore
          <span
            aria-hidden
            className="transition-transform duration-150 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  </Reveal>
</li>
```

Keep the section, heading, and grid wrappers as they are. When real UI screenshots land later, the `PhotoPlaceholder` inside the clipped frame becomes a `next/image` with the same aspect box; the hover scale class moves onto the image.

- [ ] **Step 3: Verify**

```bash
pnpm lint && pnpm typecheck && pnpm build
```

Expected: pass. Dev server: cards lift 4px with a soft shadow on hover and on keyboard focus within; the Ascent slot is glacier-toned; the arrow nudges right. No tilt, no glow. Touch (responsive mode): cards still fully readable without hover.

- [ ] **Step 4: Commit**

```bash
git add apps/web/content/products.ts apps/web/components/sections/ProductCards.tsx
git commit -m "Add instrument card hover grammar and the Ascent glacier slot

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: Block 06, The Experience on the burgundy band

**Files:**

- Modify: `apps/web/content/experience.ts`
- Modify: `apps/web/components/sections/ExperienceGrid.tsx`

**Interfaces:**

- Consumes: `.experience-band-timeline` (body background shift) from Task 1; thumb variants in `public/images/derive26/thumb/`.
- Produces: `ExperienceItem` gains `photo: { src: string; alt: string }` replacing `photoLabel`.

- [ ] **Step 1: Map real photos**

View the three candidate thumbs and confirm each matches its card (swap within the derive26 set if a frame reads wrong; do not stretch a caption to fit a photo):

- "Industry, in the room" → `/images/derive26/thumb/finalists-meet-the-interviewers.webp`
- "Real problems, real debate" → `/images/derive26/thumb/debating-the-problem-set.webp`
- "A room worth being in" → `/images/derive26/thumb/address-before-the-final-round.webp` (unless Task 5 used it for the founder photo AND the crops read as duplicates on one page; then use `/images/derive26/thumb/interview-day-briefing.webp`)

Replace `apps/web/content/experience.ts`:

```ts
export interface ExperienceItem {
  title: string;
  body: string;
  photo: { src: string; alt: string };
}

/** Block 06: three cards answering a would-be finalist's three anxieties
    (is it worth it, is it real, will the right people see me). */
export const EXPERIENCE: ExperienceItem[] = [
  {
    title: "Industry, in the room",
    body: "Engineers and recruiters from sponsor firms judge finals in person.",
    photo: {
      src: "/images/derive26/thumb/finalists-meet-the-interviewers.webp",
      alt: "Finalists meeting the partner firm interviewers at Derive '26",
    },
  },
  {
    title: "Real problems, real debate",
    body: "Problems written by people who trade and build for a living.",
    photo: {
      src: "/images/derive26/thumb/debating-the-problem-set.webp",
      alt: "Contestants debating the problem set between rounds",
    },
  },
  {
    title: "A room worth being in",
    body: "Finals are staged, hosted, and worth the train ticket.",
    photo: {
      src: "/images/derive26/thumb/address-before-the-final-round.webp",
      alt: "The hall listening to the address before the final round",
    },
  },
];
```

- [ ] **Step 2: Band component**

Replace `apps/web/components/sections/ExperienceGrid.tsx`:

```tsx
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EXPERIENCE } from "@/content/experience";

/**
 * Block 06: full-burgundy band resetting the page rhythm. The
 * .experience-band-timeline class drives the body's cream-to-burgundy
 * scroll-driven shift (Task 1); without support the band alone is
 * burgundy, which is the correct static fallback.
 */
export function ExperienceGrid() {
  return (
    <section className="experience-band-timeline bg-burgundy py-section text-cream-light">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The experience"
            title="Not told. Shown."
            inverse
          />
        </Reveal>

        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCE.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 120}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={item.photo.src}
                    alt={item.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-cream-light">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-light/85">
                  {item.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Verify**

```bash
pnpm lint && pnpm typecheck && pnpm build
```

Expected: pass. Chrome dev server: scrolling into the band tints the page body burgundy and releases it after (check the gaps around adjacent sections); Firefox: band burgundy, body cream throughout, no visual break. Real photos in all three cards; text readable on burgundy (cream-light on #571c24 passes contrast).

- [ ] **Step 4: Commit**

```bash
git add apps/web/content/experience.ts apps/web/components/sections/ExperienceGrid.tsx
git commit -m "Move the experience grid onto the burgundy band with real photos

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 8: Block 07, Gallery with lightbox

**Files:**

- Create: `apps/web/components/ui/Lightbox.tsx`
- Create: `apps/web/components/sections/GalleryTiles.tsx`
- Modify: `apps/web/components/sections/GalleryGrid.tsx`
- Modify: `apps/web/app/page.tsx` (home shows all 12: change `<GalleryGrid limit={8} />` to `<GalleryGrid />`)

**Interfaces:**

- Consumes: `GALLERY` from `content/gallery.ts` (unchanged shape: `{ label, src?, full? }`).
- Produces: `GalleryTiles` client component, props `{ items: GalleryItem[] }`, rendering the irregular grid and owning lightbox state. `Lightbox` client component, props `{ items: { src: string; label: string }[]; index: number; onClose: () => void; onNavigate: (index: number) => void }`. `GalleryGrid` keeps its server signature `{ limit?, withHeading? }` so `/gallery` is untouched.

- [ ] **Step 1: Lightbox**

Create `apps/web/components/ui/Lightbox.tsx`:

```tsx
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface Props {
  items: { src: string; label: string }[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Full-bleed gallery lightbox on #1F0A0D (block 07): the immersive payoff,
 * chrome kept minimal. Esc closes, arrow keys navigate, focus is trapped,
 * body scroll locks while open.
 */
export function Lightbox({ items, index, onClose, onNavigate }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft")
        onNavigate((index - 1 + items.length) % items.length);
      if (e.key === "Tab") {
        // Three buttons only; keep focus among them.
        const focusables = Array.from(
          document.querySelectorAll<HTMLElement>("[data-lightbox-control]"),
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [index, items.length, onClose, onNavigate]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
      className="fixed inset-0 z-50 flex flex-col bg-[#1f0a0d]"
      onClick={onClose}
    >
      <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
        <Image
          src={item.src}
          alt={item.label}
          fill
          sizes="100vw"
          className="object-contain"
        />
      </div>

      <div
        className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm text-cream-light/80 italic">{item.label}</p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            data-lightbox-control
            onClick={() =>
              onNavigate((index - 1 + items.length) % items.length)
            }
            className="flex h-11 w-11 items-center justify-center rounded-md text-cream-light/80 hover:text-cream-light"
          >
            <span className="sr-only">Previous photo</span>
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            data-lightbox-control
            onClick={() => onNavigate((index + 1) % items.length)}
            className="flex h-11 w-11 items-center justify-center rounded-md text-cream-light/80 hover:text-cream-light"
          >
            <span className="sr-only">Next photo</span>
            <span aria-hidden>→</span>
          </button>
          <button
            ref={closeRef}
            type="button"
            data-lightbox-control
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-md text-cream-light/80 hover:text-cream-light"
          >
            <span className="sr-only">Close</span>
            <span aria-hidden>✕</span>
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Tiles**

Create `apps/web/components/sections/GalleryTiles.tsx`:

```tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import type { GalleryItem } from "@/content/gallery";

interface Props {
  items: GalleryItem[];
}

/** Irregular editorial spans (12-col grid on lg): uniformity reads as stock. */
const SPANS = [
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-5",
  "lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-3",
];

/**
 * Client leaf for block 07: the tile grid owns lightbox state. Caption bar
 * slides up on hover/focus over a darkening scrim; click opens the lightbox.
 */
export function GalleryTiles({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const withImages = items.filter(
    (item): item is GalleryItem & { src: string; full: string } =>
      Boolean(item.src && item.full),
  );

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-12">
        {withImages.map((item, index) => (
          <li key={item.label} className={SPANS[index % SPANS.length]}>
            <Reveal delay={(index % 3) * 60}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg lg:h-64 lg:w-full lg:[aspect-ratio:auto]"
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(min-width: 1024px) 33vw, 46vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                {/* Darkening scrim + caption bar sliding up (240ms). */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25 group-focus-visible:bg-black/25"
                />
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 px-3 py-2 text-left text-xs text-cream-light transition-transform duration-[240ms] group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  {item.label}
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <Lightbox
          items={withImages.map((item) => ({
            src: item.full,
            label: item.label,
          }))}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
```

- [ ] **Step 3: GalleryGrid delegates to the tiles**

Replace the `<ul>` block in `apps/web/components/sections/GalleryGrid.tsx` (lines 30-65) with:

```tsx
<div className={withHeading ? "mt-12" : ""}>
  <GalleryTiles items={items} />
</div>
```

Add `import { GalleryTiles } from "@/components/sections/GalleryTiles";` and remove the now-unused `Image`, `PhotoPlaceholder`, and `Reveal` imports from this file (Reveal stays only if the heading still uses it; it does, so keep `Reveal`). In `apps/web/app/page.tsx`, change `<GalleryGrid limit={8} />` to `<GalleryGrid />` (the design's home gallery is the full 12).

- [ ] **Step 4: Verify**

```bash
pnpm lint && pnpm typecheck && pnpm build
```

Expected: pass, all static. Dev server: 12 tiles in irregular spans on lg, uniform 2-col at 375px; hover slides the caption bar up; click opens the lightbox full-bleed on the maroon-black ground; arrow keys navigate, Esc closes, focus returns sensibly; body doesn't scroll behind it. `/gallery` page still renders (uses the same grid). Network tab: grid loads `thumb/` files, lightbox loads `full/`.

- [ ] **Step 5: Commit**

```bash
git add apps/web/components/ui/Lightbox.tsx apps/web/components/sections/GalleryTiles.tsx apps/web/components/sections/GalleryGrid.tsx apps/web/app/page.tsx
git commit -m "Give the gallery its editorial grid and lightbox

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 9: Block 08, Testimonials on record

**Files:**

- Modify: `apps/web/content/testimonials.ts`
- Modify: `apps/web/components/sections/Testimonials.tsx`
- Create: `apps/web/public/images/people/<slug>.webp` (three faces, generated below)

**Interfaces:**

- Produces: `Testimonial` gains `photo: { src: string; alt: string }`. Card grammar: 120ms stagger, oversized gold quotation mark fading to 55% after the card lands, italic display-serif quotes, no carousel.

- [ ] **Step 1: ASK-TILAK GATE (blocking)**

Collect from Tilak: three quotes verbatim from the post-event feedback form, each with real name, college, batch, a face photo file, and written consent (name + face). Anonymous quotes do not ship; if only two are consented, ship two cards.

- [ ] **Step 2: Optimize the face photos**

For each supplied face photo (square-ish crop, from `media/photos/` or wherever Tilak drops them):

```bash
node -e "
const sharp = require('./apps/web/node_modules/sharp');
sharp(process.argv[1]).rotate().resize({width: 320, height: 320, fit: 'cover'}).webp({quality: 75}).toFile(process.argv[2]).then(() => console.log('ok'));
" "<source file>" "apps/web/public/images/people/<firstname-lastname>.webp"
```

Each output must be under 30 KB (`ls -la apps/web/public/images/people/`).

- [ ] **Step 3: Content**

Replace `apps/web/content/testimonials.ts` (values verbatim from Step 1):

```ts
export interface Testimonial {
  name: string;
  detail: string;
  quote: string;
  photo: { src: string; alt: string };
}

/** Quotes verbatim from the Derive '26 feedback form; written consent on
    file for every name and face. Stillness, not a carousel: these are on
    record. */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "<consented name 1>",
    detail: "<college, batch>",
    quote: "<verbatim quote 1>",
    photo: {
      src: "/images/people/<slug-1>.webp",
      alt: "<name 1>",
    },
  },
  {
    name: "<consented name 2>",
    detail: "<college, batch>",
    quote: "<verbatim quote 2>",
    photo: {
      src: "/images/people/<slug-2>.webp",
      alt: "<name 2>",
    },
  },
  {
    name: "<consented name 3>",
    detail: "<college, batch>",
    quote: "<verbatim quote 3>",
    photo: {
      src: "/images/people/<slug-3>.webp",
      alt: "<name 3>",
    },
  },
];
```

- [ ] **Step 4: Component**

Replace the `<ul>` in `apps/web/components/sections/Testimonials.tsx`:

```tsx
<ul className="mt-12 grid gap-6 lg:grid-cols-3">
  {TESTIMONIALS.map((testimonial, index) => (
    <li key={testimonial.quote} className="h-full">
      <Reveal
        delay={index * 120}
        className="relative h-full rounded-xl border border-burgundy/10 bg-cream-light p-7"
      >
        <figure>
          {/* Oversized gold quotation mark: fades to 55% opacity
                      200ms after its card lands. A typographic event, not
                      a spectacle. */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-4 right-6 font-display text-6xl text-gold opacity-0 transition-opacity duration-500 [transition-delay:calc(var(--reveal-delay,0ms)+900ms)] [.is-visible_&]:opacity-55"
          >
            &ldquo;
          </span>
          <blockquote className="font-display text-[0.95rem] leading-relaxed italic">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-4">
            <Image
              src={testimonial.photo.src}
              alt={testimonial.photo.alt}
              width={56}
              height={56}
              className="size-14 shrink-0 rounded-full object-cover"
            />
            <span>
              <span className="block font-display font-semibold text-burgundy">
                {testimonial.name}
              </span>
              <span className="block text-sm text-ink/80">
                {testimonial.detail}
              </span>
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </li>
  ))}
</ul>
```

Add `import Image from "next/image";` at the top. The quote-mark delay uses the Reveal's own visibility: set `style={{ "--reveal-delay": `${index * 120}ms` } as React.CSSProperties}` on the `Reveal` className wrapper is not possible through props, so instead pass the delay through the existing `delay` prop (already done) and keep the quote-mark's own transition-delay fixed at 900ms by replacing the arbitrary property with `delay-[900ms]`. Final class for the mark:

```
pointer-events-none absolute top-4 right-6 font-display text-6xl text-gold opacity-0 transition-opacity duration-500 delay-[900ms] [.is-visible_&]:opacity-55
```

- [ ] **Step 5: Verify**

```bash
pnpm lint && pnpm typecheck && pnpm build
```

Expected: pass. Dev server: three cards, faces render, italic serif quotes, gold mark fades in late to 55%, nothing rotates or loops. `grep -n "Finalist name" apps/web/content/testimonials.ts` returns nothing.

- [ ] **Step 6: Commit**

```bash
git add apps/web/content/testimonials.ts apps/web/components/sections/Testimonials.tsx apps/web/public/images/people
git commit -m "Put real testimonials on record with faces and colleges

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 10: Block 09, Team portraits

**Files:**

- Modify: `apps/web/content/team.ts`
- Modify: `apps/web/components/sections/TeamGrid.tsx`
- Create: `apps/web/public/images/team/<slug>.webp` (five portraits)

**Interfaces:**

- Produces: `TeamMember` gains `photo: { src: string; alt: string }`. Portrait grammar: 80ms stagger, ships at 92% saturation, hover to 100% plus gold name underline.

- [ ] **Step 1: ASK-TILAK GATE (blocking)**

Collect the five real names (Founder, Engineering, Design, Operations, Outreach) and the portrait files: one session, one backdrop, one crop. If the portrait session hasn't happened, this task waits; do not ship "Name" placeholders or mismatched portraits.

- [ ] **Step 2: Optimize portraits**

For each portrait (4:5 crop):

```bash
node -e "
const sharp = require('./apps/web/node_modules/sharp');
sharp(process.argv[1]).rotate().resize({width: 640, height: 800, fit: 'cover'}).webp({quality: 75}).toFile(process.argv[2]).then(() => console.log('ok'));
" "<source file>" "apps/web/public/images/team/<firstname>.webp"
```

Each under 80 KB.

- [ ] **Step 3: Content**

Replace `apps/web/content/team.ts`:

```ts
export interface TeamMember {
  name: string;
  role: string;
  photo: { src: string; alt: string };
}

/** One session, one backdrop, one crop: consistency reads as
    professionalism. Real names only. */
export const TEAM: TeamMember[] = [
  {
    name: "Tilak",
    role: "Founder",
    photo: { src: "/images/team/tilak.webp", alt: "Tilak, AMS founder" },
  },
  {
    name: "<name 2>",
    role: "Engineering",
    photo: { src: "/images/team/<slug-2>.webp", alt: "<name 2>, engineering" },
  },
  {
    name: "<name 3>",
    role: "Design",
    photo: { src: "/images/team/<slug-3>.webp", alt: "<name 3>, design" },
  },
  {
    name: "<name 4>",
    role: "Operations",
    photo: { src: "/images/team/<slug-4>.webp", alt: "<name 4>, operations" },
  },
  {
    name: "<name 5>",
    role: "Outreach",
    photo: { src: "/images/team/<slug-5>.webp", alt: "<name 5>, outreach" },
  },
];
```

(Names verbatim from Step 1; keep the existing `TEAM_PAGE` export if one exists in the file.)

- [ ] **Step 4: Component**

Replace the `<li>` body in `apps/web/components/sections/TeamGrid.tsx`:

```tsx
<li key={`${member.name}-${member.role}`}>
  <Reveal delay={index * 80}>
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
        <Image
          src={member.photo.src}
          alt={member.photo.alt}
          fill
          sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 46vw"
          className="object-cover saturate-[.92] transition-[filter] duration-300 group-hover:saturate-100"
        />
      </div>
      <NameTag className="mt-4 font-display font-semibold text-burgundy">
        <span className="border-b border-transparent transition-colors duration-300 group-hover:border-gold">
          {member.name}
        </span>
      </NameTag>
      <p className="mt-1 text-sm text-ink/80">{member.role}</p>
    </div>
  </Reveal>
</li>
```

Add `import Image from "next/image";` and drop the `PhotoPlaceholder` import.

- [ ] **Step 5: Verify**

```bash
pnpm lint && pnpm typecheck && pnpm build
```

Expected: pass. Dev server: five consistent portraits; hover warms saturation and gold-underlines the name; `/team` page still renders. `grep -n '"Name"' apps/web/content/team.ts` returns nothing.

- [ ] **Step 6: Commit**

```bash
git add apps/web/content/team.ts apps/web/components/sections/TeamGrid.tsx apps/web/public/images/team
git commit -m "Ship the real team with one-session portraits

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 11: Block 10, Closing CTA

**Files:**

- Create: `apps/web/content/cta.ts`
- Create: `apps/web/components/sections/ClosingCta.tsx`
- Modify: `apps/web/app/page.tsx` (insert after `<TeamGrid />`)

**Interfaces:**

- Consumes: `.mask-line`/`.mask-step-2` (scroll-triggered mask reveal), `.parallax-slow`, `.caption-fade` behavior via Reveal, `Button` from `components/ui/Button`.
- Produces: `CLOSING_CTA` const and `<ClosingCta />`. Uses the hero variant of `the-full-room` (the group photo, no longer used by the hero since the winners photo replaced it).

- [ ] **Step 1: Content**

Create `apps/web/content/cta.ts`:

```ts
/** Block 10: peak-end. The last image is the team after the hall emptied. */
export const CLOSING_CTA = {
  eyebrow: "The next edition",
  headlineLines: ["The next edition", "is being written."],
  primary: { label: "Enter Derive '26", href: "/derive" },
  secondary: { label: "Sponsor the next one", href: "/access#sponsor" },
  photo: {
    src: "/images/derive26/hero/the-full-room.webp",
    alt: "The full Derive '26 room, everyone who made it happen, IIT Bombay",
  },
  plateCaption: "Plate XII · After the hall emptied",
} as const;
```

- [ ] **Step 2: Component**

Create `apps/web/components/sections/ClosingCta.tsx`:

```tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CLOSING_CTA } from "@/content/cta";

/**
 * Block 10: the page closes with the same gesture it opened with. The
 * headline mask-reveals like the hero (a deliberate bookend) and the
 * photo drifts on the same parallax grammar as the stats band.
 */
export function ClosingCta() {
  return (
    <section className="relative overflow-hidden py-32 text-center text-cream-light lg:py-44">
      <div className="parallax-slow absolute -inset-y-[8%] inset-x-0">
        <Image
          src={CLOSING_CTA.photo.src}
          alt={CLOSING_CTA.photo.alt}
          fill
          quality={50}
          fetchPriority="low"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/65" aria-hidden />

      <Reveal className="relative mx-auto max-w-3xl px-5">
        <Eyebrow inverse>{CLOSING_CTA.eyebrow}</Eyebrow>
        <h2 className="mt-6 font-display text-hero">
          <span className="mask-line">
            <span>{CLOSING_CTA.headlineLines[0]}</span>
          </span>
          <span className="mask-line mask-step-2">
            <span>{CLOSING_CTA.headlineLines[1]}</span>
          </span>
        </h2>
        <div className="mt-10 flex flex-col items-center gap-5">
          <Button href={CLOSING_CTA.primary.href} variant="inverse">
            {CLOSING_CTA.primary.label}
          </Button>
          <Link
            href={CLOSING_CTA.secondary.href}
            className="text-sm text-cream-light/80 underline-offset-4 transition-colors hover:text-cream-light hover:underline"
          >
            {CLOSING_CTA.secondary.label} <span aria-hidden>→</span>
          </Link>
        </div>
      </Reveal>

      <p className="absolute right-5 bottom-6 text-sm text-cream-light/60 italic sm:right-8">
        {CLOSING_CTA.plateCaption}
      </p>
    </section>
  );
}
```

- [ ] **Step 3: Compose**

In `apps/web/app/page.tsx`, add `import { ClosingCta } from "@/components/sections/ClosingCta";` and render `<ClosingCta />` after `<TeamGrid />` (it becomes the last section before the footer).

- [ ] **Step 4: Verify**

```bash
pnpm lint && pnpm typecheck && pnpm build
```

Expected: pass. Dev server: headline lines mask-reveal on scroll into view (bookending the hero), group photo drifts slowly under the dark scrim, CTA and sponsor link centered, plate caption bottom-right. No-JS: headline text visible. 320px: headline wraps without overflow.

- [ ] **Step 5: Commit**

```bash
git add apps/web/content/cta.ts apps/web/components/sections/ClosingCta.tsx apps/web/app/page.tsx
git commit -m "Close the page with the next-edition CTA over the emptied hall

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 12: Block 11, Footer colophon + final gates

**Files:**

- Modify: `apps/web/components/layout/Footer.tsx` (colophon line only)
- Modify: `apps/web/content/site.ts` (only if the copyright line changes)

**Interfaces:**

- The footer keeps `FOOTER_COLUMNS` and `SITE` from `content/site.ts` untouched; columns already match the design (Compete / Firms / AMS). Motion: none, already true.

- [ ] **Step 1: Colophon check**

The current footer already satisfies most of block 11 (burgundy ground, complete sitemap, no motion). Confirm the entity line: the copyright reads "© 2026 Algorithms & Mathematics Society · amshq.in · amsderive.in · amsaccess.com". Per the entity rule, the full name line must read "AMS (Algorithms & Mathematics Society)". In `apps/web/content/site.ts`, change `copyright` to:

```ts
  copyright:
    "© 2026 AMS (Algorithms & Mathematics Society) · amshq.in · amsderive.in · amsaccess.com",
```

Confirm with `grep -rn "amsderive.in\|amsaccess.com" apps/web/content/site.ts apps/web/public/llms.txt` that the domain list matches what actually resolves today; drop any domain Tilak says is dead.

- [ ] **Step 2: Final verification battery (the whole page)**

```bash
pnpm lint && pnpm typecheck && pnpm build
```

Expected: pass, every route `○ (Static)`. From the build output, record the home route First Load JS and confirm ≤ 100 KB gzipped.

Then on the dev server (or `pnpm build` + a static serve):

1. Full-page pass at 320, 375, 768, 1024, 1440: no horizontal scroll anywhere; every block matches the design export's structure top to bottom (hero, record line, numbers over the hall, founder letter, instruments, burgundy experience, 12-tile gallery, testimonials, team, closing CTA, footer).
2. Reduced-motion emulation: every block fully visible, zero movement (parallax and body shift off, counters static).
3. JavaScript disabled: all copy and all numbers visible; gallery tiles render (no lightbox); nothing hidden.
4. Lighthouse, throttled mobile, on home: Performance ≥ 95, CLS < 0.05, LCP ≤ 2.0 s.
5. Keyboard: tab through the whole page; lightbox traps and restores focus; every interactive element has a visible focus ring.
6. Fact grep: `grep -rn "XX\|₹X.X\|Finalist name\|College, batch\|\"Name\"" apps/web/content/ apps/web/public/llms.txt` returns nothing.

- [ ] **Step 3: Commit**

```bash
git add apps/web/content/site.ts
git commit -m "Set the footer colophon entity line

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

- [ ] **Step 4: Integration**

Use superpowers:finishing-a-development-branch: rebase `feat/home-photo-immersive` onto fresh `origin/main`, re-run the Task 12 verification battery if main moved, then merge or open a PR per Tilak's preference. Never `git add -A` at any point; the parallel session may hold unrelated dirty files.

---

## Self-review notes

- Spec coverage: blocks 01-11 map to Tasks 2-12; step 0 is Task 1; PhotoBreaker retirement in Task 4; guide amendment in Task 4 Step 6; fact-sync in Task 4 Step 7; domains decision in Task 12 Step 1.
- The `<verified ...>` and `<consented ...>` tokens in Tasks 4, 5, 9, 10 are deliberate ASK-TILAK gates for content only Tilak can supply, each with a blocking step; they are not implementation placeholders. Everything buildable is fully specified.
- Type consistency: `CountUp { value, delay }` (Task 4) matches its uses; `GalleryItem` narrowing in Task 8 matches `content/gallery.ts`; `photo: { src, alt }` is the uniform shape added in Tasks 5, 7, 9, 10.
