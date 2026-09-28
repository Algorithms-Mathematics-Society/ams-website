# AMS website polish

Date: 28 September 2026

## Purpose

Make the site recognizably AMS, explain its competitions and assessment platform in plain language, and give participants and hiring teams clear next steps. This update refines the existing local homepage work and preserves the original color photographs.

## Brand and visual design

- Restored the reference palette: burgundy `#571C24`, antique gold `#A9822F`, and cream `#F5F0E4`.
- Added darker gold for small text on cream and lighter gold for dark surfaces. Kept gold as an accent rather than a background for low-contrast white text.
- Used the supplied outlined AMS wordmark in the header and footer. Recolored the existing Access wordmark with cream and gold for its charcoal background.
- Added a self-hosted Source Serif 4 display face through `next/font`, alongside the existing Inter body face. No font requests are made to Google by visitors.
- Replaced the dense homepage overlay and decorative index panel with a readable introduction beside an unobscured event photograph and caption.
- Removed duplicated hero statistics. The statistics now appear once in a compact, responsive band immediately after the introduction.
- Standardized page widths, spacing, headings, image sizing, and button treatment. Reduced oversized empty space in program cards.
- Kept the gallery, team portrait, and event photographs in their original colors. No AI images, stock portraits, or invented event imagery were added.

Main files: `app/globals.css`, `app/layout.tsx`, layout components, `Hero.tsx`, `StatsBand.tsx`, `AboutSplit.tsx`, `ProductCards.tsx`, `ClosingCta.tsx`, shared UI components, and brand SVGs under `apps/web/public/brand/`.

## Wording and structure

- Rewrote the homepage, Derive, Ascent, Access, gallery, team, FAQ, and blog copy to describe what AMS does directly.
- Removed inflated claims about hiring signals, security, universal benchmarking, and superiority over other ways of evaluating candidates.
- Removed promises to show problem sets, submitted work, or results tables that the linked pages do not publish.
- Removed em dashes from the website copy and checked components, content, blog articles, and `llms.txt` for remaining instances.
- Preserved the existing verified numerical facts and genuine testimonial quotations. Clarified the number `2` as two contest series, avoiding the suggestion that both editions have already finished.
- Scoped Jane Street and QRT references to their documented roles in Derive '26. No claim was added that these firms use or endorse Access for hiring.
- Reconciled Ascent's live registration details and described its individual qualifier and subsequent team rounds. Avoided describing it as an identical copy of the Derive format.
- Pointed the closing homepage invitation to Ascent, instead of sending a next-challenge invitation to the archived Derive edition.
- Replaced notification-signup language with an honest email invitation where no signup form exists.
- Reworked both existing blog articles while preserving their URLs. Removed duplicate article headings so each page has one H1.

Main files: `apps/web/content/`, route metadata, `blogs/welcome-to-ams/index.md`, and `blogs/what-ams-actually-is/index.md`.

## Recruiter journey and trust

- Renamed the main navigation entry to “For firms” while retaining the `/access` URL and Access product identity.
- Added distinct assessment and contest-partnership paths near the top of the Access page.
- Explained the desktop client, readiness checks, session restrictions, configurable proctoring, and recovery flows without absolute security promises.
- Positioned assessment results alongside interviews and other evidence, rather than presenting them as a hiring decision by themselves.
- Added a genuine photograph of conversations at the Derive finals, with contextual links to the edition, gallery, and team.
- Added a new `AccessConversation.tsx` section covering the questions a hiring team should resolve: role and problem set, candidate experience, results and review, and scope and terms.
- Made the contact action explicit: email Tilak with the roles, approximate candidate count, and timeline. Preserved his existing direct address for that named contact.
- Expanded the founder profile with Tilak Jain's full name, a concise factual biography, and his LinkedIn profile linked from the official Derive site.
- Used the publicly listed AMS team address for general inquiries and participation contacts.
- Removed the misleading Monthly Challenge footer link, which previously led to an unrelated page.

## Links and search presentation

- Added contextual internal links between contests, gallery, team, FAQ, articles, and recruiter information.
- Added official external links to the Derive 2026 rules, Jane Street, QRT, and the founder profile.
- Added canonical URLs across the main pages and generated blog metadata.
- Updated page descriptions and the AI-facing `llms.txt` summary to agree with the visible copy, scoped partnerships, and current contest format.
- Retained existing URLs, robots rules, sitemap coverage, and static page generation.
- These changes add useful site navigation and outgoing references. They do not create incoming links on third-party websites.

## Accessibility and interaction

- Repaired the skip-to-content link so it becomes visible and usable on keyboard focus.
- Added a close button inside the mobile navigation dialog and included it in the focus trap. Verified Escape, focus containment, navigation, and body-scroll restoration.
- Kept visible focus states, readable color contrast, reduced-motion handling, and content visibility without JavaScript.
- Verified gallery image loading, next-photo navigation, and Escape-to-close behavior.
- Reserved image dimensions and checked responsive image sizing to prevent layout shifts and unnecessary oversized downloads.

## Verification

- Production Next.js build: passed. All content routes remain prerendered; the two blog routes use static generation.
- ESLint: passed.
- TypeScript check: passed.
- Git whitespace check: passed.
- Browser checks: all 10 content pages at 320, 375, 768, 1024, and 1440 pixels. No horizontal overflow, duplicate H1s, missing canonicals, em dashes, or grayscale filters found.
- Images: loaded and decoded on every content page in the mobile pass.
- Internal destinations and fragment anchors: checked.
- Structured data: rendered JSON parsed successfully. This was not a Google Rich Results certification.
- Mobile menu, gallery navigation, reduced-motion visibility, and homepage content with JavaScript disabled: passed.
- Browser runtime errors during the final automated pass: none.

Tests ran against the local production build with Chrome. Node 24 was invoked directly for the repository's Next.js, ESLint, and TypeScript commands because the default shell selected an older Node version.

### Mobile Lighthouse spot checks

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 98 | 100 | 100 | 100 | 2.3 s | 0 |
| Derive | 97 | 100 | 100 | 100 | 2.2 s | 0 |
| Gallery | 98 | 100 | 100 | 100 | 2.3 s | 0 |
| For firms / Access | 96 | 100 | 100 | 100 | 2.7 s | 0 |

All audited pages meet the repository's Lighthouse score target of 95. Its stricter LCP target of 2.0 seconds remains unmet in these simulated mobile measurements. The homepage transferred approximately 158 KiB of scripts, including framework and prefetched route code, above the 100 KiB target. No new JavaScript dependencies were added. These remaining budgets need performance work; they are not reported as passing. Real-device field INP and deployed CDN performance were not measured.

## Source checks

The source review used existing verified repository facts and these official destinations:

- [Ascent](https://ascent.amshq.in): registration closes 20 October 2026; the individual qualifier is 24 October; team rounds follow. The December Mumbai finale is tentative.
- [Ascent registration](https://ascent.amshq.in/register): reachable live registration page.
- [Derive 2026 rules](https://amsderive.in/rules): edition-specific eligibility and contest rules. Linked as an archive, not as registration for a new edition.
- [Jane Street](https://www.janestreet.com/) and [QRT](https://www.qube-rt.com/): official firm destinations.
- [Tilak Jain on LinkedIn](https://www.linkedin.com/in/tilak-jain-521913328/): exact profile destination linked by the official Derive footer. LinkedIn itself blocks automated retrieval.

External destinations were checked during this update. Partnership roles and participation figures remain based on the existing verified AMS content; visiting a partner's homepage is not independent proof of the relationship.

## Collaboration and scope

Three subagents handled copy, the recruiter journey, and source/link verification. A separate final read-through checked expectations, factual consistency, and missing evidence. The main agent integrated the visual work, addressed review findings, and ran the production and browser checks.

Only website source, relevant brand artwork, the two existing blog articles, and this report belong to this change. Existing screenshot files and design-reference exports were excluded.
