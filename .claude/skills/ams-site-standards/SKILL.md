---
name: ams-site-standards
description: Use when creating, modifying, or reviewing anything in apps/web of the AMS marketing site (amshq.in), including pages, sections, components, content files, images, animations, metadata, structured data, robots, sitemap, llms.txt, or FAQ entries. Also use when a change touches performance, latency, animation, scrolling, responsive layout, SEO, JSON-LD, OpenGraph, or AI answer engines (AEO), or when a verified fact (stat, winner, sponsor, date) changes anywhere on the site.
---

# AMS Site Standards

## Overview

`ENGINEERING_GUIDE.md` at the repo root is the authoritative pre-build guide: stack, folder structure, component rules, budgets, responsive approach. This skill does not replace it; it is the applied checklist that makes its rules and the SEO/AEO layer (which the guide does not cover) impossible to miss. When a decision here conflicts with the guide, the guide wins; change the guide in the same PR if it must change.

Core principle: **this site is static HTML behind a CDN that must load in 2 seconds on a phone and be quotable by both Google and AI assistants.** Every change is judged against that sentence.

## Quick reference: touch X, do Y

| You are touching    | You must also                                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A new page/route    | Metadata export, OG card, `app/sitemap.ts` entry, JSON-LD if entity/event/FAQ shaped, internal link from an existing page, `public/llms.txt` Pages list |
| A section/component | One file per component, `sections → ui/layout` one-way imports, under ~150 lines, typed `interface Props`                                               |
| Copy, stats, names  | Typed object in `content/`, never inline JSX; run the Fact sync map below                                                                               |
| An image            | `next/image`, real dimensions, honest `alt`, honest `sizes`, pre-optimized file, lazy unless it is the LCP hero                                         |
| An animation        | CSS-first, `transform`/`opacity` only, `prefers-reduced-motion` handled, no new JS libraries                                                            |
| A dependency        | `pnpm dlx bundlephobia <pkg>` first; justify every KB against the 100 KB home budget                                                                    |
| robots/crawlers     | Keep the `AI_CRAWLERS` allowlist in `app/robots.ts` intact; never disallow an AI bot                                                                    |

## System design

The design is aggressively boring, on purpose: browser → CDN edge → static files. Full detail in ENGINEERING_GUIDE §4. The rules that get violated in practice:

- **Every route stays `○ (Static)`** in `pnpm build` output. If a page cannot be statically generated, question the design, not the export config.
- **Server Components by default.** `"use client"` only on leaf components that genuinely need interactivity (MobileNav, Lightbox, Carousel), never on a page or section.
- **The contest-platform boundary is absolute.** "Compete" links out to the contest platform; this repo never touches contest infrastructure, auth, or candidate data.
- **Content updates are git commits.** All copy and data lives in `content/` as typed objects. `page.tsx` composes sections and exports metadata; ~30-50 lines, nothing more.
- Forms are the only dynamic surface: serverless/form service, validate + rate-limit + honeypot.

## Latency budgets (hard gates, throttled mobile)

LCP ≤ 2.0 s · CLS < 0.05 · INP < 200 ms · home JS ≤ 100 KB gzipped · Lighthouse ≥ 95. A change that blows a budget does not merge until explained or fixed. Countermeasures in ENGINEERING_GUIDE §5; the short version:

- Images are ~90% of the risk. Hero gets `priority` and stays under ~200 KB; everything below the fold lazy-loads; gallery renders ~640w thumbnails; never commit a camera original.
- Fonts via `next/font` only, two families max, subset weights, `display: swap`.
- Third-party scripts: default answer is no. Anything approved loads deferred.
- Build-time over runtime: formatted stats, sorted lists, manifests computed at build.

## Smoothness

Rules for anything that moves, fades, or responds to scroll:

- **CSS does the animating; JS only observes.** Transitions, `@keyframes`, and the existing `Reveal` component (IntersectionObserver + `.reveal` classes in `app/globals.css`). Reuse `Reveal`; do not build a second observer or add an animation library.
- **Animate only `transform` and `opacity`.** Never animate `top`/`left`/`width`/`height`/`margin`/`box-shadow` directly: those trigger layout or paint on the main thread and produce jank on mid-range phones.
- **Respect `prefers-reduced-motion`** in every new keyframe or transition. The existing `.reveal` styles already handle it; new animation CSS must too, and content must be fully visible with JS disabled.
- **Timing:** micro-interactions (hover, focus, button) 150-300 ms; entrance reveals 400-600 ms with ~80 ms stagger; ease-out for entrances. Nothing animates the LCP hero image itself or delays its paint.
- **The hero and the stats band skip entrance animation entirely** (no fade-up, mask-reveal, rise, or draw-in): they are the first two things a visitor sees, so there is nothing to reveal them from and any such effect reads as decoration, not motion serving content. Everything below them keeps the standard `Reveal`-driven scroll entrance.
- **INP discipline:** no scroll listeners (use IntersectionObserver), passive event listeners where listeners are unavoidable, no long tasks on interaction.
- **Banned:** count-up number counters (no exception; the home stats band's numbers render at full strength on first paint), JS parallax (CSS scroll-driven parallax with a reduced-motion kill switch is allowed), scroll-jacking, hover-only reveals (everything hover-revealed must also work via tap/focus).

## Mobile responsiveness

Most traffic is phones from shared links. Full approach in ENGINEERING_GUIDE §7. Non-negotiables:

- Build mobile-first, then add `md:`/`lg:` overrides; never desktop-first.
- **No horizontal scroll at 320 px, ever.** Long words/URLs get `overflow-wrap: break-word`.
- Fluid type/spacing with `clamp()` via theme tokens, not breakpoint jumps.
- Honest `sizes` per breakpoint: a 2-column mobile grid requests ~50vw images, not 1200px ones.
- 44×44 px minimum tap targets; visible focus states.
- Test at 320 / 375 / 768 / 1024 / 1440 before calling it done.

## SEO (in depth)

Strategy lives in `docs/superpowers/specs/2026-07-05-seo-rank-ams-design.md`: a brand-entity flywheel to rank amshq.in for "ams". The parts that apply to every code change:

- **One canonical entity name, forever:** "AMS (Algorithms & Mathematics Society)". Banned variants: "AMS Society", "Algorithms and Maths Society". The footer carries the full name line on every page; never remove it.
- **Every page ships:** a unique `metadata` export (title on the `%s · AMS` template, real description), a 1200×630 branded OG/Twitter card (link previews in college groups are brand impressions), and a canonical URL via `metadataBase` (https://amshq.in).
- **JSON-LD is centralized:** objects live in `content/seo.ts`, rendered through `components/seo/JsonLd.tsx`. `Organization` + `WebSite` render site-wide from the layout; `Event` for contest editions (verified dates and location only); `FAQPage` generated from `content/faq.ts`. New structured data follows this pattern and passes Google's Rich Results test.
- **New pages get discovered:** entry in `app/sitemap.ts`, at least one internal link from an existing page, and (operational, post-deploy) a Search Console indexing request.
- **Only verified facts ship.** Placeholder stats, XX values, and unapproved sponsor logos never reach production; a wrong number costs more trust than no number.
- **Never:** doorway pages, keyword stuffing, bought links, hidden text. Any of these can permanently end the ranking goal via penalty.

## AEO (in depth)

AEO is making AMS the answer when someone asks Claude/ChatGPT/Perplexity "what is AMS" or "who won Derive". The surfaces, all shipped and all mandatory to maintain:

- **`public/llms.txt`** is the primary AI-facing summary: entity definition, disambiguation from ams.org, key verified facts, page list, related properties. It is a fact surface, not marketing copy.
- **`content/faq.ts`** feeds both the /faq page and its `FAQPage` schema. Answers must be self-contained and quote-ready: 1-3 declarative sentences that stand alone without the question, with concrete numbers and dates.
- **`app/robots.ts`** explicitly allows every named AI crawler (`AI_CRAWLERS`). Being quotable by assistants is part of the strategy; a disallow rule is a strategy change, not a tweak.
- **Answer-shaped copy:** the first sentence of any page or section that defines something should be definitional ("Derive is the AMS quant contest: ...") so it can be extracted verbatim. Always disambiguate from the American Mathematical Society where confusion is possible.

## Fact sync map (run on every fact change)

One verified fact lives on many surfaces. When a stat, winner, sponsor, date, or claim changes, or a page is added, check every row; a mismatch between surfaces is worse than a missing fact because it teaches crawlers and assistants to distrust all of them:

| Surface                     | File                                                  |
| --------------------------- | ----------------------------------------------------- |
| Page content                | the relevant `content/*.ts`                           |
| Home stats band             | `content/stats.ts`                                    |
| AI summary                  | `public/llms.txt`                                     |
| FAQ (if definitional)       | `content/faq.ts`                                      |
| Structured data             | `content/seo.ts` (Event dates, stats in descriptions) |
| Meta descriptions / OG copy | the page's `metadata` export                          |
| Sitemap (new pages)         | `app/sitemap.ts`                                      |

## Verification before done

- `pnpm lint && pnpm typecheck && pnpm build` pass; every route `○ (Static)`.
- New/changed pages checked at 320 px width; no horizontal scroll.
- Lighthouse ≥ 95 spot-check on the heaviest affected page.
- New JSON-LD validated (Rich Results test or schema linter).
- Stage explicit paths only, never `git add -A`; no em dashes in any copy, comment, or commit message.

## Common mistakes

| Mistake                                           | Reality                                                                                                             |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| "The animation is small, I'll just add a library" | framer-motion class libraries cost 30-50 KB against a 100 KB total budget. CSS + `Reveal` covers this site's needs. |
| "I updated the page, the fact is fixed"           | The fact also lives in llms.txt, faq.ts, seo.ts, stats.ts. Run the sync map.                                        |
| "OG image can come later"                         | The link preview is the first impression in every college group share. It ships with the page.                      |
| "sizes can stay default"                          | Default sizes makes phones download desktop crops and quietly blows LCP.                                            |
| "It's a marketing tweak, SEO doesn't apply"       | Entity naming, verified facts, and internal links apply to every copy change.                                       |
| "`use client` on the section is simpler"          | It converts the whole section from free HTML into shipped JS. Client components are leaves.                         |
