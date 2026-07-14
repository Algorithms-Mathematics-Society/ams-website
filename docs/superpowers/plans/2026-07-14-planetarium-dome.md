# Planetarium Dome Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the home proof-gallery dome read as a dark, slowly drifting photo planetarium per `docs/superpowers/specs/2026-07-14-planetarium-dome-design.md`.

**Architecture:** One new opt-in prop on the existing `DomeGallery` client component adds an idle auto-drift RAF loop that defers to every existing interaction state; the `GalleryDome` section restyles to a near-full-height espresso band and passes circularity-tuning props. No new files, no new dependencies.

**Tech Stack:** Next.js 16 App Router, TypeScript strict, Tailwind 4, the already-vendored DomeGallery + @use-gesture/react.

## Global Constraints

- No em dashes anywhere: code, comments, commit messages.
- Stage explicit paths only; never `git add -A`. Work on branch `feat/home-photo-immersive` in the worktree; do not push unless asked.
- Every route stays `○ (Static)` in `pnpm build`.
- Reduced motion: no drift, no inertia; photos fully visible. The drift is the site's SECOND sanctioned looping animation (after the hero slideshow); the ledger records it.
- The /gallery page and its grid/lightbox stay untouched.
- Verification per task: `pnpm lint && pnpm typecheck && pnpm build`, plus the browser checks named in the task. A dev server for this worktree runs on port 3907 (hot reload); port 4100 belongs to another session, never touch it.

---

### Task 1: Auto-drift prop on DomeGallery

**Files:**

- Modify: `apps/web/components/gallery/DomeGallery.tsx`

**Interfaces:**

- Produces: `DomeGalleryProps.autoRotateDegPerSec?: number` (default 0 = off). Positive values rotate the dome around Y at that rate while idle. Task 2 passes `autoRotateDegPerSec={3}`.
- Consumes (already in the file): `rotationRef`, `draggingRef`, `inertiaRAF`, `focusedElRef`, `wrapAngleSigned`, `sphereRef`.

- [ ] **Step 1: Make `applyTransform` a stable callback**

In `apps/web/components/gallery/DomeGallery.tsx`, replace the current plain function

```tsx
const applyTransform = (xDeg: number, yDeg: number) => {
  const el = sphereRef.current;
  if (el) {
    el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
  }
};
```

with a `useCallback` so the new effect can list it as a dependency without re-running per render:

```tsx
const applyTransform = useCallback((xDeg: number, yDeg: number) => {
  const el = sphereRef.current;
  if (el) {
    el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
  }
}, []);
```

(`useCallback` is already imported.)

- [ ] **Step 2: Add the prop**

In the `DomeGalleryProps` interface, after `grayscale?: boolean;` add:

```tsx
  /** Idle drift speed in degrees per second around Y; 0 disables (default). */
  autoRotateDegPerSec?: number;
```

In the destructured props, after `grayscale = false,` add:

```tsx
  autoRotateDegPerSec = 0,
```

- [ ] **Step 3: Add the drift loop**

Immediately after the `useEffect` that calls `applyTransform(rotationRef.current.x, rotationRef.current.y)` on mount, insert:

```tsx
// Idle drift: the planetarium's slow lap. Defers to every interaction:
// while dragging, during inertia, while a photo is enlarged, in hidden
// tabs (RAF pauses; the dt clamp swallows the resume spike), and under
// prefers-reduced-motion. After any blocker clears, drift resumes
// following a one second grace period.
useEffect(() => {
  if (!autoRotateDegPerSec) return;
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  let raf: number;
  let last = performance.now();
  let resumeNotBefore = 0;
  const step = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const blocked =
      draggingRef.current ||
      inertiaRAF.current != null ||
      focusedElRef.current != null ||
      mql.matches ||
      document.visibilityState === "hidden";
    if (blocked) {
      resumeNotBefore = now + 1000;
    } else if (now >= resumeNotBefore) {
      const nextY = wrapAngleSigned(
        rotationRef.current.y + autoRotateDegPerSec * dt,
      );
      rotationRef.current = { ...rotationRef.current, y: nextY };
      applyTransform(rotationRef.current.x, nextY);
    }
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}, [autoRotateDegPerSec, applyTransform]);
```

- [ ] **Step 4: Verify**

Run: `pnpm lint && pnpm typecheck && pnpm build`
Expected: pass; 13 routes `○ (Static)`. The rendered site is unchanged (no caller passes the prop yet).

- [ ] **Step 5: Commit**

```bash
git add apps/web/components/gallery/DomeGallery.tsx
git commit -m "Add idle auto-drift to the dome gallery

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Planetarium restyle of the home section

**Files:**

- Modify: `apps/web/components/sections/GalleryDome.tsx`

**Interfaces:**

- Consumes: `autoRotateDegPerSec` from Task 1.

- [ ] **Step 1: Replace the section component**

Replace the full contents of `apps/web/components/sections/GalleryDome.tsx` with:

```tsx
import Link from "next/link";
import DomeGallery from "@/components/gallery/DomeGallery";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GALLERY } from "@/content/gallery";

/**
 * Block 07 on home: the proof gallery as a dark photo planetarium. A
 * near-full-height espresso band; the dome drifts slowly while idle and
 * its radial fades resolve into the band's own ground. The /gallery page
 * keeps the flat grid and lightbox as the accessible, no-JS-friendly
 * archive of the same twelve moments.
 */
export function GalleryDome() {
  const images = GALLERY.filter((item) => item.src).map((item) => ({
    src: item.src as string,
    alt: item.label,
  }));

  return (
    <section className="relative bg-espresso">
      {/* Heading floats over the band's top; pointer-events pass through
          so drags beside the text still reach the dome. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-14 lg:pt-16">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Moments from AMS"
                title="It happened. Here's proof."
                inverse
              />
              <p className="text-sm text-cream-light/60">
                Drag to look around · click a photo to open it
              </p>
            </div>
          </Reveal>
        </Container>
      </div>

      {/* The planetarium: fades and blend resolve into the espresso
          ground (overlayBlurColor matches bg-espresso exactly). fitBasis
          min ties the radius to the band's height, which is what makes
          the sphere read as round instead of a wide barrel. */}
      <div className="relative h-[85svh] min-h-[560px] w-full overflow-hidden">
        <DomeGallery
          images={images}
          overlayBlurColor="#453333"
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
            className="text-sm font-medium text-cream-light underline-offset-4 hover:text-gold-bright hover:underline"
          >
            See the full gallery <span aria-hidden>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify (gates + browser)**

Run: `pnpm lint && pnpm typecheck && pnpm build`
Expected: pass; 13 routes `○ (Static)`.

Browser on http://localhost:3907 (worktree dev server):

1. Scroll to the section at 1440: espresso band ~85svh, cream heading over the dome's top, no cream seam at the band's edges (the fades melt into the ground), sphere visibly rounder with larger tiles.
2. Idle 5s without touching: the dome drifts slowly. Grab and drag: drift stops; release: inertia glides, then drift resumes about a second later.
3. Click a front-facing photo: enlarge works, drift is frozen while open, Escape closes and drift resumes.
4. Emulate reduced motion: no drift, no inertia; drag still rotates directly; photos visible.
5. 375 and 320: no horizontal scroll; heading wraps cleanly over the band.

- [ ] **Step 3: Commit**

```bash
git add apps/web/components/sections/GalleryDome.tsx
git commit -m "Restyle the proof gallery as a dark drifting planetarium

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

- [ ] **Step 4: Ledger**

Append to `.superpowers/sdd/progress.md`: the drift is the site's second sanctioned looping animation (user-approved in the planetarium spec), for the whole-branch review to cover.

---

## Self-review notes

- Spec coverage: ambience (Task 2 espresso band + inverse heading + matching overlayBlurColor), drift (Task 1 prop + Task 2 `autoRotateDegPerSec={3}`), size (Task 2 `h-[85svh] min-h-[560px]`), circularity (Task 2 fitBasis/fit/minRadius/segments/rotation/sensitivity), guards (Task 1 blocked conditions; Task 2 Step 2 checks 2-4), ledger (Task 2 Step 4).
- No placeholders; all code complete.
- Type consistency: `autoRotateDegPerSec?: number` matches its single call site.
