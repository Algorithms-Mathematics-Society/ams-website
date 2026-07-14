# Home Rhythm Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the four surgical home-page fixes from `docs/superpowers/specs/2026-07-14-home-rhythm-design.md`: section resequence, founder-letter de-echo, honest stats backdrop, record-strip breathing.

**Architecture:** Pure edits to four existing files; no new components, no motion changes, no dependencies. One task because all four changes share a single verification battery (a stepped-scroll full-page cadence check).

**Tech Stack:** Next.js 16 App Router, TypeScript strict, Tailwind 4.

## Global Constraints

- No em dashes anywhere: code, comments, commit messages (brand middle dot · is fine).
- Stage explicit paths only; never `git add -A`. Branch `feat/home-photo-immersive` in the worktree; commit, do not push unless asked.
- Every route stays `○ (Static)` in `pnpm build` (12 routes).
- The shipped stats backdrop frame must honestly match its caption: view the actual image before committing.
- The letter's replacement sentence ships verbatim as approved; the 2,500/33 figures stay on the stats band, llms.txt, faq.ts, seo.ts untouched (no fact-sync needed: figures are dropped from one surface, not changed).
- The dev server for this worktree runs on port 3907 (hot reload); port 4100 belongs to another session, never touch either process you did not start.

---

### Task 1: The four rhythm fixes

**Files:**

- Modify: `apps/web/app/page.tsx` (section order)
- Modify: `apps/web/content/about.ts` (middle paragraph)
- Modify: `apps/web/components/sections/StatsBand.tsx` (backdrop src + caption)
- Modify: `apps/web/components/sections/LineOfRecord.tsx` (padding)

**Interfaces:**

- Consumes: existing sections and content only.
- Produces: no interface changes; purely presentational and copy edits.

- [ ] **Step 1: Resequence the page**

In `apps/web/app/page.tsx`, move `<Testimonials />` to render BEFORE `<GalleryDome />`. The JSX body becomes exactly:

```tsx
      <Hero />
      <LineOfRecord />
      <StatsBand />
      <AboutSplit />
      <ProductCards />
      <ExperienceGrid />
      <Testimonials />
      <GalleryDome />
      <TeamGrid />
      <ClosingCta />
```

(Imports are already present and unchanged; only the two lines swap.)

- [ ] **Step 2: De-echo the founder letter**

In `apps/web/content/about.ts`, replace the second entry of `paragraphs`

```ts
    "Last July we answered it in a lecture hall at IIT Bombay. 2,500 students registered for Derive; 33 stood on that stage, judged in person by the firms that hire this talent.",
```

with exactly:

```ts
    "Last July we answered it in a lecture hall at IIT Bombay: a national field narrowed to one stage, judged in person by the firms that hire this talent.",
```

- [ ] **Step 3: Swap the stats backdrop honestly**

First LOOK at the candidate frames (Read renders images):
`apps/web/public/images/derive26/thumb/deep-focus.webp`, fallback
`apps/web/public/images/derive26/thumb/in-the-zone.webp`.
Pick the one that genuinely reads as a tight mid-contest close-up (a
contestant at a laptop, not a wide hall). `deep-focus` is preferred because
no other section uses it; `in-the-zone` also appears in the /gallery grid,
which is acceptable (the gallery is the archive) but second choice.

In `apps/web/components/sections/StatsBand.tsx`, change the backdrop Image src from

```tsx
src = "/images/derive26/hero/the-hall-at-capacity.webp";
```

to (assuming deep-focus passes the look check; substitute in-the-zone otherwise)

```tsx
src = "/images/derive26/hero/deep-focus.webp";
```

and change the plate caption line from

```tsx
          Plate II · The hall at capacity, opening keynote
```

to a caption that honestly describes the chosen frame, for deep-focus exactly:

```tsx
          Plate II · Deep focus, mid-contest
```

Everything else in the file (overlay, parallax wrapper, quality 50,
fetchPriority low, stats, emotional line) stays byte-identical.

- [ ] **Step 4: Give the record strip its beat**

In `apps/web/components/sections/LineOfRecord.tsx`, change the Container class

```tsx
      <Container className="flex flex-col gap-2 py-5 text-[11px] font-medium tracking-[0.25em] text-ink/70 uppercase sm:flex-row sm:items-center sm:gap-10">
```

to

```tsx
      <Container className="flex flex-col gap-2 py-7 text-[11px] font-medium tracking-[0.25em] text-ink/70 uppercase sm:flex-row sm:items-center sm:gap-10 sm:py-8">
```

- [ ] **Step 5: Verify**

Run: `pnpm lint && pnpm typecheck && pnpm build`
Expected: pass; every route `○ (Static)`.

Browser on http://localhost:3907:

1. Stepped-scroll the full home page at 1440 (scroll in ~700px steps so the
   Reveal observers fire) and take a full-page screenshot; confirm the order
   hero → record → stats → letter → instruments → burgundy experience →
   cream testimonials → espresso planetarium → cream team → photo CTA →
   burgundy footer, and that no two dark bands touch.
2. Confirm the stats band shows the close-up frame with the new caption and
   that the frame matches the caption's words.
3. Confirm the letter renders the approved sentence verbatim (no 2,500/33 in
   the letter body).
4. 320px: no horizontal scroll; the resequenced sections render in order.

- [ ] **Step 6: Commit**

```bash
git add apps/web/app/page.tsx apps/web/content/about.ts apps/web/components/sections/StatsBand.tsx apps/web/components/sections/LineOfRecord.tsx
git commit -m "Restore the home page's light-dark cadence

Testimonials move above the planetarium so the two dark bands no
longer touch; the founder letter carries the feeling instead of
repeating the stats band's figures; the stats backdrop becomes a
tight mid-contest close-up with an honest caption; the record strip
gets enough padding to read as a beat.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

## Self-review notes

- Spec coverage: change 1 = Step 1; change 2 = Step 2; change 3 = Step 3 (including the honesty look-check and fallback); change 4 = Step 4; spec verification section = Step 5.
- No placeholders; exact strings for every edit.
- No interface or type changes anywhere; single-task plan matches the shared verification battery.
