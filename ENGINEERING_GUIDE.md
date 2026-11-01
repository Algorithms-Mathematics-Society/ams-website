# AMS Website - Engineering Guide

Read this before writing the first line of code. It defines how the AMS marketing site
(amshq.in) is structured, built, and kept fast. The Figma reference lives at
`website-figma-reference.png`; brand assets live in `media/source-svg` and `media/source-png`.

**What this site is:** a content-driven, photo-heavy marketing site - hero, sponsors, stats,
about, three product cards (Derive / Ascent / Access), experience, gallery, testimonials,
team, footer. Almost nothing is dynamic. That single fact drives every decision below:
**static-first, ship as little JavaScript as possible, treat images as the main performance risk.**

---

## 1. Stack

| Concern         | Choice                                                                   | Why                                                                                                                                                 |
| --------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework       | **Next.js (App Router), static output**                                  | Matches the rest of the AMS org's tooling; built-in `next/image`, `next/font`, per-route code splitting.                                            |
| Language        | TypeScript, `strict: true`                                               | Non-negotiable. Catch prop mistakes at build time.                                                                                                  |
| Styling         | Tailwind CSS + CSS variables for brand tokens                            | Utility classes for layout speed; tokens (`--color-burgundy`, `--color-cream`, spacing, type scale) so the palette is defined in exactly one place. |
| Package manager | pnpm                                                                     | Org standard.                                                                                                                                       |
| Hosting         | Static export behind a CDN (Vercel / Cloudflare Pages / GCS + Cloud CDN) | See §4.                                                                                                                                             |

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

   **Exception: the blog.** Long-form prose doesn't fit a typed data object, so blog
   posts are Markdown files with frontmatter, authored in a top-level `blogs/` folder
   (a sibling of `media/` and `docs/`, not inside `apps/web`) - one folder per post,
   images colocated next to the post's own `index.md` and referenced by a path
   relative to that folder. `apps/web/lib/blog.ts` is the only place that reads
   `blogs/`: it parses frontmatter (`gray-matter`), resizes/copies the post's images
   into `apps/web/public/blog/<slug>/` via `sharp` (the same idempotent, mtime-checked
   pattern as `scripts/optimize-photos.mjs`), and compiles the body through a
   `unified`/`remark`/`rehype` pipeline (with `rehype-pretty-code` for syntax
   highlighting) into static HTML - all of it at build/dev time, in a server-only
   module never imported by a `"use client"` file, so it costs 0 KB of shipped client
   JS regardless of how many Markdown/unified packages it pulls in. `content/blog.ts`
   still holds the blog *page's* own typed copy (eyebrow, title, CTA), the same as
   `content/gallery.ts` does for `/gallery` - it just doesn't hold the posts themselves.

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
   - Count-up counters stay banned outright. The home stats band was the one
     sanctioned exception; it was retired in favor of the numbers rendering at
     full strength on first paint, since the hero and the stats band are the
     first two things a visitor sees and there is nothing to reveal them from.
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

## Canonical website identity

The production host is `https://www.amshq.in`: the bare domain redirects there with HTTP 308. Use `SITE.url` for canonical, social, sitemap, and structured-data URLs. The repository's September 2026 SEO audit documents this observed hosting configuration and the separate migration work required on `amsociety.in`.


## Navbar and footer visual system

The first neutral redesign phase is scoped to the navbar and footer. Page bodies
retain their existing palette until their planned migration. The shared shell
roles live in `app/globals.css` as `--shell-*` tokens: white canvas, near-black
text, neutral separators, red `#b4232f` active/focus accents, and 6px controls.
Layout CSS modules consume those roles without overriding page-level tokens.

The header is 64px on mobile and 72px from 1024px, with the supplied black AMS
wordmark. The footer uses the supplied white wordmark on a near-black surface.
Navigation links, contact links, and controls retain 44px targets. Primary shell
actions are black; red is reserved for focus and current-route indicators.
The mobile menu uses a native modal dialog for background inertness and focus
containment, closes on Escape or desktop resizing, and restores body scrolling.
The evergreen header action links to the home competition overview; edition
registration actions remain owned by their competition content.


## Home-page neutral design

The home route now uses the neutral shell palette throughout its seven sections.
`components/ui/Neutral.module.css` owns shared migrated-page typography, action,
link, section, and accent-marker styles. `HomeTop.module.css` and
`HomeStory.module.css` own section-specific layouts. Native server-rendered links
provide home actions without the client Astryx Button dependency; the existing
Button remains available to pages still awaiting migration.

The home sequence is introduction, dated proof, discipline comparison, edition
sequence, documentary gallery, society story, and audience-specific next steps
above the dark footer.
Controls use 6px radii; photo frames and program cards use 9px. Red is limited to
small markers and focus. White/off-white surfaces and black headings share the
header/footer's neutral roles. Existing factual counts and edition context remain
intact; home actions explore competitions rather than assert registration status.
The two competition choices use open editorial columns from 640px, with a
separate partnership row beneath them. Photographs are documentary figures with
external captions, not generic cards. The gallery uses one large lead photograph
and two smaller supporting frames. The historical timeline is text-only and
contains three actual stages, with partnership invitations kept separate.

The opening hero uses a full-width documentary photograph with an integrated
white headline, actions, and event-caption rail. Directional dark gradients
protect readability while retaining the participant as the visual focus. Mobile
uses an upper photographic area fading into a dark text area; desktop uses a
left-to-right scrim. The image remains priority-loaded with `sizes="100vw"`;
there is no animation, scroll handler, or added client dependency. A white
competition action and underlined partner link work against the dark scene.
The header and subsequent home sections retain their neutral styling.

Hero focal positioning is responsive: desktop uses 64% 54%, ultrawide screens
from 2200px use 64% 35% to retain headroom, and mobile keeps its dedicated crop.
The hero uses the configured image quality of 75.

Homepage image roles: one static focused-participant hero; a large cohort photo
with arrival and problem-discussion supporting frames; a separately captioned
partner-conversation image. Awards and social photographs remain in the archive.
The homepage does not rotate hero images; further exploration uses the gallery.

Home section headings use direct labels rather than a repeated promotional
eyebrow/heading pair. Keep edition labels where they establish historical scope.
Audience headings in the closing section identify the two routes without
additional uppercase labels repeating them.

On the home route with JS enabled, the shell is viewport-fixed and body top
padding reserves its 64px/72px responsive height. Other routes and the no-JS
fallback retain sticky positioning. Keep native document scroll and overscroll;
do not add scroll handlers or a second scrolling container for this behavior.

The homepage reading scale uses 16-17px body copy, 16-18px hero supporting
copy, 16px action labels, 15px text links, and 14px evidence/captions (at the
default browser font). Section headings are 30-44px and competition names
28-36px; keep these roles distinct. Home overrides are scoped in Neutral.module.css.
Headline spans and flexible section headings must wrap without clipping when
visitors enlarge text or increase spacing.

## Ascent neutral design

The Ascent route is scoped by `data-ascent-page`. Its sections use the neutral
shell tokens and shared link/button primitives; AscentHero.module.css and
Ascent.module.css own responsive layouts. The sequence is overview/status,
skills, rounds, participation details, and entry-status/support actions.
Use official competition sources for status and dates, and synchronize the FAQ,
metadata, shared competition action, and llms.txt when these change. Tentative
finale details must remain labelled. Do not reuse Derive photography as Ascent
evidence. Hero and closing actions remain server-rendered links.

## Derive neutral archive

The Derive route uses `data-derive-page`, neutral shared primitives, and
DeriveHero.module.css / Derive.module.css for its layouts. It presents the 2026
edition: introductory photo, subjects, verified round outcomes, historical
partners, and future-edition enquiry. Keep qualification separate from attendance
(50 qualified, 33 competed), and never interpret the legacy contest homepage's
open-registration banner as evidence of a new edition. Approved white partner
marks remain on a near-black surface for legibility.

## Competition updates intake

`/updates` is a static route with a small client form leaf. Contextual links appear
on home, Derive, Ascent, and in the footer; the header retains its competition CTA.
The separate Firebase project in `infra/updates` is the explicit intake exception
to the no-database marketing architecture. It stores mailing-list requests only,
never contest data. Direct Firestore client access is denied; a bounded HTTP
function validates consent, rate-limits, and writes atomically. The requested
Firebase web app SDK initializes lazily on submission; no Analytics is included.
Web config lives in ignored `apps/web/.env.local`, template in `.env.example`.
Unconfigured builds show a contact alternative. See `infra/updates/README.md` for
deployment, privacy lifecycle, and tests. Sending and ownership confirmation are
separate work before campaigns; do not describe a saved request as verified email.

Signup hardening: App Check/reCAPTCHA Enterprise runs only when submitting.
Production requires a consumed limited-use token for the configured app ID.
Emulator-only bypass must never become a request/config switch on production.
The server uses fixed document lookups and bounded retries; do not describe
Firestore latency as guaranteed O(1). See docs/signup-security.md for quotas,
operation counts, third-party disclosure, and abuse/availability tradeoffs.

## Partnerships neutral design

The Partnerships destination remains `/access`, scoped with
`data-partnerships-page` and `Access.module.css`. Its reading order is a white
introduction, edition-scoped Derive evidence, open competition comparison,
secondary Access assessment offer, and a white contact section above the shared
dark footer. Preserve `#sponsor`, `#assessments`, and `#contact`.

Use the original 3:2 documentary conversation photograph, an external caption,
and one primary hero action. Black actions, 6px controls, 9px photo corners,
16-17px body text, and 14px captions follow the neutral shell. Red stays in focus
and active navigation. Existing dated partner roles establish organizing history,
not hiring outcomes or unrestricted access to participant information. Contact
uses email and an open scope-setting sequence; no new form or dependency.

## Gallery neutral experience

`/gallery` uses server-rendered introduction, archive and closing sections.
`GalleryBrowser` is the interactive leaf for topic filters and opening photos;
`Lightbox` is loaded on demand and uses a native modal dialog. Preserve captions
and explicit archive order in `content/gallery.ts` independently of home photo
placements. Layout uses a panoramic group frame, full-composition featured
photographs and asymmetric pairs; phones use a single readable column.

No autoplay or scroll interception. The viewer supports arrow keys, touch swipe,
thumbnail selection, Escape and restored opener focus. Preview thumbnails remain
visible during full-image loading or failure. Only opacity and transform animate;
reduced motion disables them. Plain image links provide no-JavaScript access.
Maintain 44px controls, real image sizes, reserved frames and neutral shell colors.

## Team purpose and people

`/team` composes `TeamIntro`, `TeamVision`, `TeamFounder`, `TeamGrid` and
`TeamClosing` with scoped `Team.module.css`. The introduction explains the work;
vision is clearly aspirational; the founder feature is a photo-free bordered
card linking to existing published writing. Do not fabricate personal
quotes, career results, advisors or institutional endorsements. The wider team
uses neutral bordered profiles: three columns from 1200px, two from 768px and
one on phones. Cards share padding, restrained name sizing and bottom-aligned
profile links; role and edition context have separate typographic levels. Keep all person IDs and
content identities intact because article bylines and structured data use them.
The founder remains in the canonical TEAM data and is rendered once, separately
from the other profiles. The contribution invitation is an email enquiry, not a
claim of open positions. Sections render immediately without client animation.

## Blog reading layouts and document canvas

Blog routes compose server-rendered BlogIntro, BlogGrid, BlogArticle and
BlogClosing sections. BlogCard uses native semantic markup with one stretched
article link; do not add nested interactive controls inside that hit area. Keep
metadata visible, cover frames reserved and prose in the reading container.
Blog.module.css owns section layouts; BlogCard.module.css owns card styles.
Global .blog-prose styles deliberately use monochrome code, neutral surfaces,
sans-serif headings and visibly underlined links. Preserve authored Markdown
and article metadata. No entrance animation or client state is needed here.

Both html and body use --shell-canvas so native elastic overscroll reveals white
on every route. Do not restore the legacy cream document background or intercept
scrolling to hide it. Individual neutral section surfaces remain scoped.

## Shared typography and consistency roles

Use the `--shell-text-*` and `--shell-space-*` tokens in globals.css for page
roles rather than copying fluid formulas into each module. Display (home),
interior page and article titles have intentionally distinct scales. All main
interior destinations, including Ascent, Derive and Partnerships, use the same
page-title scale and introductory top spacing. Full section headings
share the 30–44px scale; body text uses 16–17px with 1.7 line height. Article
prose keeps its separate reading treatment. Compact evidence labels, person
names and card titles remain subordinate roles, not full section headings.

Neutral primary/secondary actions use 16px text and at least 48px height;
standalone text links use 15px and at least 44px height. The compact navigation
and metadata retain smaller text. Use rem for text-size limits so browser text
preferences apply. Light-surface keyboard focus uses the red accent; white or
lighter outlines on dark surfaces are deliberate contrast exceptions. Underlines
must remain visible without hover. FAQ and Updates use these same neutral roles.

Interior navigation rhythm: align intro content to the top, not vertically to
the adjacent photo or panel. Use a muted 14px sentence-case label, a 12px gap
to the page title and a 20px gap to the description. Ascent, Derive and
Partnerships share equal desktop columns and a 56px gap. Keep the home display
and article reading layout distinct. Do not restore separate campaign heading
sizing on interior destinations merely because they have a CTA or photograph.

## Philosophy and evidence in buyer journeys

Home now introduces the competition choices, then AMS's philosophy, the Derive
edition account, approved participant feedback, photographs and audience-specific
next steps. Testimonials render statically from content/testimonials.ts, whose
source comments document website-use disclosure. Keep exact approved quote text,
attribution and edition context; do not infer employment or measured skill gains.

Partnerships includes AccessApproach between edition evidence and competition
selection. Its decision criteria describe how to evaluate fit, not fabricated
historical case studies. Access assessments have a direct hero anchor and a
separate preparation/review explanation with their own enquiry CTA. Keep the
assessment workflow and sponsorship offer distinct. Private messages and raw
feedback exports must not become public assets or committed evidence by default.
