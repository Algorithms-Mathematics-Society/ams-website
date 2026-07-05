# AMS Website - Engineering Guide

Read this before writing the first line of code. It defines how the AMS marketing site
(amsociety.in) is structured, built, and kept fast. The Figma reference lives at
`website-figma-reference.png`; brand assets live in `media/source-svg` and `media/source-png`.

**What this site is:** a content-driven, photo-heavy marketing site - hero, sponsors, stats,
about, three product cards (Derive / Ascent / Access), experience, gallery, testimonials,
team, footer. Almost nothing is dynamic. That single fact drives every decision below:
**static-first, ship as little JavaScript as possible, treat images as the main performance risk.**

---

## 1. Stack

| Concern         | Choice                                                                   | Why                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework       | **Next.js (App Router), static output**                                  | Matches the rest of the AMS org's tooling; built-in `next/image`, `next/font`, per-route code splitting.                                          |
| Language        | TypeScript, `strict: true`                                               | Non-negotiable. Catch prop mistakes at build time.                                                                                                |
| Styling         | Tailwind CSS + CSS variables for brand tokens                            | Utility classes for layout speed; tokens (`--color-burgundy`, `--color-cream`, spacing, type scale) so the palette is defined in exactly one place. |
| Package manager | pnpm                                                                     | Org standard.                                                                                                                                     |
| Hosting         | Static export behind a CDN (Vercel / Cloudflare Pages / GCS + Cloud CDN) | See §4.                                                                                                                                           |

Rules that follow from this:

- `export const dynamic = "error"` mentality: if a page can't be statically generated, question the design before reaching for a server.
- **Server Components by default.** Add `"use client"` only to leaf components that genuinely need interactivity (mobile nav toggle, gallery lightbox, carousel). Never on a page or section.
- No heavyweight UI/animation libraries by default. Every dependency must justify its bytes (run `pnpm dlx bundlephobia <pkg>` before adding).

---

## 2. Folder structure

```
apps/web/
├── app/                        # Routes ONLY - thin files that compose sections
│   ├── layout.tsx              # Root layout: fonts, metadata, <Header/>, <Footer/>
│   ├── page.tsx                # Home - ~30 lines, just stacks <Section/> components
│   ├── derive/page.tsx
│   ├── ascent/page.tsx
│   ├── access/page.tsx
│   ├── gallery/page.tsx
│   ├── team/page.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                     # Primitives: Button, Card, SectionHeading, Eyebrow,
│   │   │                       # Container, Stat, Badge - pure, prop-driven, no data
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── layout/                 # Header.tsx, Footer.tsx, MobileNav.tsx (client), NavLink.tsx
│   └── sections/               # One file per page section, named after the design
│       ├── Hero.tsx
│       ├── SponsorStrip.tsx
│       ├── StatsBand.tsx
│       ├── AboutSplit.tsx
│       ├── ProductCards.tsx
│       ├── ExperienceGrid.tsx
│       ├── GalleryGrid.tsx
│       ├── Testimonials.tsx
│       ├── TeamGrid.tsx
│       └── ...
├── content/                    # ALL copy and data as typed TS/JSON - never inline in JSX
│   ├── site.ts                 # Nav links, footer links, social, contact
│   ├── stats.ts                # { value: "2,500+", label: "Students, year one" }[]
│   ├── products.ts             # Derive / Ascent / Access card content
│   ├── testimonials.ts
│   ├── team.ts
│   └── gallery.ts              # Image list + alt text + captions
├── lib/                        # Utilities (cn(), formatters). No React in here.
├── styles/
│   └── globals.css             # Tailwind layers + brand token definitions
├── public/
│   ├── brand/                  # Copied from /media as needed (SVG preferred)
│   └── images/                 # Optimized photos (see §5)
└── tests/
```

### The rules behind the structure

1. **`page.tsx` composes; it never implements.** A page file is a stack of section
   components and a `metadata` export. If a `page.tsx` grows past ~50 lines, something
   that belongs in `components/sections/` is leaking into it.

   ```tsx
   // app/page.tsx - this is the whole file, and that's the point
   export default function HomePage() {
     return (
       <>
         <Hero />
         <SponsorStrip />
         <StatsBand />
         <AboutSplit />
         <ProductCards />
         <ExperienceGrid />
         <GalleryGrid limit={8} />
         <Testimonials />
         <TeamGrid />
       </>
     );
   }
   ```

2. **One component per file, named the same as the file.** No `index.tsx` barrel files
   with five components inside; no `misc.tsx`. If you need a second component, make a
   second file. Small private helpers (a `<StatDivider/>` used only by `StatsBand`) may
   live unexported in the same file - the moment anything else needs it, extract it.

3. **Three component tiers, dependency flows one way:**
   `sections → ui/layout → (nothing)`. A `ui/` primitive never imports from `sections/`.
   Sections never import each other. If two sections share markup, that shared piece is a
   `ui/` primitive.

4. **Content lives in `content/`, not in JSX.** Every stat, quote, team member, and nav
   label is a typed object. Sections map over data. This is what makes "update the
   finalist count" a one-line diff instead of a JSX hunt, and it keeps copy reviewable
   by non-engineers.

5. **Props over forks.** `ProductCard` takes `{ eyebrow, title, body, href, image }` -
   there is no `DeriveCard.tsx`, `AscentCard.tsx`, `AccessCard.tsx`. Duplicate a
   component only when the variants genuinely diverge in structure, not just content.

6. **Naming:** `PascalCase.tsx` for components, `camelCase.ts` for everything else.
   Component names describe what the thing _is_ in the design ("StatsBand"), not where
   it sits ("HomeSection3").

---

## 3. Component practices

- **Keep components under ~150 lines.** Past that, split by visual sub-structure
  (e.g. `Testimonials.tsx` renders `TestimonialCard.tsx`).
- **Type every prop with an explicit `interface Props`.** No `any`, no implicit spreads
  of unknown shape.
- **No prop drilling past two levels.** This site should need zero global state; if you
  find yourself wanting context or a store, re-check whether the component tree is wrong.
- **Client components are leaves.** `MobileNav`, `Lightbox`, `Carousel` - each isolated
  in its own file so its JS is code-split and the rest of the page ships as HTML.
- **Every image goes through `next/image`** with real `width`/`height` (or `fill` +
  sized container) and honest `alt` text. Never a bare `<img>` for content photos.
- **Semantic HTML first:** one `<h1>` per page, sections are `<section>` with a heading,
  nav is `<nav>`, the gallery is a `<ul>`. Buttons that navigate are `<Link>`; buttons
  that act are `<button>`.
- **A11y is part of "done":** visible focus states (the maroon-on-cream palette needs a
  deliberate focus ring), 4.5:1 contrast for body text, 44px minimum tap targets,
  `prefers-reduced-motion` respected by any animation.

---

## 4. System design

The correct system design for this site is aggressively boring:

```
Browser ──▶ CDN edge (static HTML/CSS/JS/images, cache-forever hashed assets)
                │
                └─▶ (only for forms) serverless endpoint / third-party form backend
```

- **Fully static build.** Every route pre-rendered at build time. No runtime server, no
  database, no cold starts, nothing to scale, nothing to get paged for. A traffic spike
  after a contest announcement is the CDN's problem, not ours.
- **The only dynamic surface is intake forms** ("Talk to us", sponsor contact). Handle
  with a single serverless function or a form service - do not stand up a backend for
  this. Validate + rate-limit + honeypot; deliver to email/Sheet.
- **"Compete" / "Enter Derive '26" link out** to the existing contest platform (Access).
  This site never touches contest infrastructure, auth, or candidate data. Keep that
  boundary absolute - it's what lets the marketing site deploy on a whim while the
  platform stays locked down.
- **Content updates = git commits.** Stats, gallery photos, testimonials change a few
  times a year; a CMS is overhead we don't need yet. Revisit only if non-engineers must
  self-serve edits.
- **Caching policy:** hashed assets (`/_next/static/*`, images) →
  `Cache-Control: public, max-age=31536000, immutable`. HTML → short TTL
  (`max-age=0, must-revalidate` or CDN-managed) so deploys show up immediately.
- **Analytics:** one lightweight, privacy-respecting script (Plausible-class), loaded
  deferred. No tag-manager pileups - every third-party script is a latency decision
  (see §5) and must be argued for.

---

## 5. Latency & speed

### Budgets (mobile, mid-range device, 4G - measured in Lighthouse/PageSpeed)

| Metric                  | Budget           |
| ----------------------- | ---------------- |
| LCP (hero)              | ≤ 2.0 s          |
| CLS                     | < 0.05           |
| INP                     | < 200 ms         |
| JS shipped to home page | ≤ 100 KB gzipped |
| Lighthouse performance  | ≥ 95             |

A PR that blows a budget doesn't merge until it's explained or fixed.

### Where this specific site will get slow, and the countermeasures

1. **Images are ~90% of the risk.** The design is photo-everywhere: hero, full-width
   stats background, 12-slot gallery, team portraits.
   - Serve AVIF/WebP via `next/image`; author `sizes` honestly per breakpoint so phones
     don't download desktop crops.
   - **Hero image:** `priority` (preloaded), tightly compressed (a 1600w hero JPEG/AVIF
     should be well under 200 KB), and it is the LCP element - nothing may lazy-load it
     or render above it late.
   - **Everything below the fold lazy-loads** (default `next/image` behavior - don't
     sprinkle `priority` around).
   - Gallery grid renders thumbnails (~640w); full-res only on lightbox open.
   - Source photos get resized/compressed before entering the repo - never commit a
     camera original into `public/`.
   - Logos and the AMS mark: use the SVGs from `media/source-svg`, inline the header
     mark if small.

2. **Fonts.** The design leans on a display serif - a classic render-blocking trap.
   - Self-host via `next/font` (zero layout shift, no third-party request, preloaded).
   - Two families max (serif for display, sans for body), subset weights - every extra
     weight is ~20–40 KB before first paint.
   - `display: swap` so text is never invisible waiting on a font.

3. **JavaScript.** A marketing site has no business shipping a big bundle.
   - Server Components by default (§1) means most sections ship as pure HTML/CSS.
   - Animations in CSS (transitions, `@keyframes`, scroll-driven where supported)
     before reaching for a JS animation library.
   - If a heavy widget is unavoidable (e.g. a map), load it with `next/dynamic` on
     interaction/visibility - never in the critical path.

4. **CLS discipline.** Every image has reserved space; stat numbers don't reflow when
   real data replaces placeholders; the sticky header has a fixed height; fonts are
   preloaded. The dashed-placeholder → real-photo swap during content fill must not
   change any box dimensions.

5. **Third parties.** Each external script/origin adds DNS+TLS+download on the critical
   path. Default answer is no. Anything approved loads `defer`/after-interactive.

---

## 6. Optimization workflow

Optimization is a habit, not a phase:

- **Measure before and after.** Lighthouse CI (or `pnpm build` + `next build` size
  output) runs in CI on every PR; the budgets in §5 are the pass/fail line.
- **Bundle analysis** (`@next/bundle-analyzer`) whenever a dependency is added.
  Know what every KB is.
- **Real-device check before launch:** throttled 4G + mid-tier Android in Chrome
  DevTools at minimum; a real phone for the finals-week launch.
- **Preconnect/preload only what's proven:** preload = hero image + fonts (next/font
  and `priority` handle both). Don't cargo-cult `<link rel=preload>` lists.
- **Build-time over runtime:** anything computable at build (formatted stats, sorted
  team lists, gallery manifests) is computed at build. The user's device does layout
  and paint, nothing else.
- Re-run a full audit (Lighthouse + WebPageTest) after content fill - real photos and
  real sponsor logos are where budgets actually get tested, not the placeholder build.

---

## 7. Responsiveness

**Approach: mobile-first, fluid, content-driven breakpoints.** Most contest traffic
will arrive on phones from a shared link or Instagram bio; the desktop Figma comp is
the _enhanced_ view, not the baseline.

- **Build every section mobile-first**, then add `md:`/`lg:` overrides. Never the
  reverse (desktop-first `max-width` overrides rot fast).
- **Standard breakpoints** (Tailwind defaults: 640 / 768 / 1024 / 1280) unless a
  specific section's content breaks elsewhere - breakpoints serve content, not devices.
- **Fluid type and spacing with `clamp()`**, encoded once as Tailwind theme tokens:
  the display serif should scale ~`clamp(2.25rem, 5vw + 1rem, 4.5rem)` rather than
  jumping at breakpoints. Same for section padding.
- **Layout mechanics:**
  - Grids collapse: product cards 3→1, gallery 4→2, team 5→2 columns. Use
    `grid-template-columns: repeat(auto-fit, minmax(…, 1fr))` where the design allows -
    it removes breakpoint code entirely.
  - Hero: side-by-side → stacked (copy above image) on mobile.
  - Header: nav links collapse into `MobileNav` (accessible disclosure: focus trap,
    `Esc` closes, body scroll locked) below `lg`.
  - Stats band: 4-across → 2×2 on mobile.
- **Images per viewport:** correct `sizes` attributes are the responsive-image
  mechanism - a 2-column mobile gallery must request ~50vw images, not 1200px ones.
- **No horizontal scroll, ever.** Test at 320 px wide. Long words/URLs in testimonials
  get `overflow-wrap: break-word`.
- **Touch:** 44×44 px minimum targets, no hover-only affordances (anything revealed on
  hover must also be reachable by tap/focus).
- **Test matrix before any release:** 320 / 375 / 768 / 1024 / 1440 widths, plus
  landscape phone, plus one real Android and one real iPhone. Playwright viewport
  screenshots make this a script, not a chore.

---

## 8. Quality gates & pre-launch checklist

Every PR:

- [ ] `pnpm lint && pnpm typecheck && pnpm test` pass **in CI** (guards must be wired
      into CI, not just committed - committed ≠ enforced)
- [ ] No section added to a `page.tsx` inline - new sections get files
- [ ] New images optimized + `alt` text written
- [ ] Budgets in §5 respected (Lighthouse CI)

Before launch:

- [ ] All placeholder photos/logos/stats replaced - a wrong number costs more trust
      than no number; sponsor logos only via the approved logo files
- [ ] Metadata per page: title, description, OpenGraph/Twitter card image (the link
      preview _is_ the first impression when shared in college groups)
- [ ] `sitemap.ts`, `robots.ts`, favicon set from `media/source-png`, canonical URLs
- [ ] 404 page styled, forms tested end-to-end, external "Compete" links verified
- [ ] Full Lighthouse ≥ 95 on home, Derive, Gallery (the heaviest pages) on throttled mobile
- [ ] Real-device pass (§7 test matrix)
