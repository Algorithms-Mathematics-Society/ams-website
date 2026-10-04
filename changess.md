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
- Made the contact action explicit: email the AMS team with the roles, approximate candidate count, and timeline. The follow-up recruiter review replaced the personal address with the verified team and partnership mailboxes and made both addresses visible.
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

These measurements are from the first polish build, before the follow-up visitor reviews below.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 98 | 100 | 100 | 100 | 2.3 s | 0 |
| Derive | 97 | 100 | 100 | 100 | 2.2 s | 0 |
| Gallery | 98 | 100 | 100 | 100 | 2.3 s | 0 |
| For firms / Access | 96 | 100 | 100 | 100 | 2.7 s | 0 |

In the first polish build, all audited pages met the repository's Lighthouse score target of 95. Its stricter LCP target of 2.0 seconds remains unmet in these simulated mobile measurements. The homepage transferred approximately 158 KiB of scripts, including framework and prefetched route code, above the 100 KiB target. No new JavaScript dependencies were added. These remaining budgets need performance work; they are not reported as passing. Real-device field INP and deployed CDN performance were not measured.

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


## Follow-up: visitor walkthroughs and UI review

The user requested another review before publishing. Four separate agents browsed the running site as a newcomer, a recruiter, an Ascent entrant, and a UI reviewer. These were role-based agent walkthroughs, not a study with recruited human participants.

### What each reviewer tried

| Reviewer | Journey | Findings addressed |
| --- | --- | --- |
| New visitor | Home, team, Derive, gallery, FAQ, blog articles, Ascent, and Access; desktop navigation and mobile menu | FAQ next steps needed links; the homepage generalized Derive's format; the reach figure needed context. |
| Recruiter | Hiring CTA, assessment and sponsorship anchors, team identity, partner evidence, articles, and contact path | Clarify the reach figure and reporting date; show copyable business email addresses; make FAQ references actionable. |
| Ascent entrant | Home/menu to Ascent, official event site, registration form, and return-to-event link | Explain eligibility, free individual entry, preparation requirements, and qualifier details before leaving the marketing site. |
| UI reviewer | Screenshots, lower sections, gallery controls, and portrait/landscape navigation across five screen widths | Remove repeated photo-button accessible names; confirm layout and keyboard behavior. |

### Changes made from the reviews

- Added contextual links to seven FAQ answers. Visitors can now continue directly to the contest pages, rules, eligibility, partnership information, or hiring contact. The plain answer text remains suitable for FAQ structured data.
- Moved the FAQ answer list into `FaqList.tsx`, keeping the route focused on metadata and section composition.
- Added an Ascent registration-preparation section with individual entry, free registration, India/APAC eligibility, the 100-seat limit outside India, the required shareable Google Drive resume link, optional transcript/Codeforces details, and the qualifier's date, time, and duration.
- Added direct links to the official Ascent eligibility FAQ and full timeline. The existing registration buttons still open the official registration form.
- Made the registration deadline and free entry visible in the opening Ascent status panel.
- Replaced the ambiguous “AMS talent pool” label with “AMS community reach,” added the July 2026 reporting context, and stated that Derive participants are included in the wider figure. Updated the article and `llms.txt` to match. This does not advertise a database of candidates available for recruitment.
- Scoped the homepage competition walkthrough to Derive '26 and adjusted its wording to reflect the completed edition. Ascent retains its distinct individual-to-team format and planned finale.
- Displayed `team@amshq.in` for assessment inquiries and `partners@amshq.in` for contest partnerships in the contact section. Both addresses were confirmed on the official Ascent site. Updated the general assessment email button to the team address.
- Fixed a confirmed Tailwind width conflict: the default arbitrary maximum width overrode the intended narrower article width. Added an explicit `reading` container size for articles and FAQ content, and adjusted the article image sizes accordingly.
- Aligned shared page introductions with the site's standard content gutter.
- Added concise gallery button names beginning with “Open photo,” avoiding the duplicated name previously produced by the image alt text and matching caption.
- Corrected the blog index article headings to H2 when no section H2 precedes them.

### Confirmed working during the walkthroughs

- Home explains the three AMS offerings and provides distinct participant and firm routes.
- Internal navigation reached all ten content pages without dead ends.
- Gallery thumbnail activation, next-photo navigation, Escape, and focus restoration worked. An initial recruiter selector timeout was resolved by direct UI testing; the gallery itself was functioning.
- Mobile menu links, Escape, focus restoration, and scrolling to the final action in a short landscape viewport worked.
- The official Ascent event and registration pages returned HTTP 200. A reviewer reached the first registration step and followed the event-return link. No personal data was entered, later form steps were not submitted, and no registration was created.
- The UI reviewer found no horizontal overflow in 35 checks across seven section pages at 320, 375, 768, 1024, and 1440 pixels, plus the homepage checks.

### External issue recorded

The official Ascent site has a contradictory sentence in its timeline introduction saying the registration closing date is unannounced, while its detailed timeline and FAQ specify 20 October 2026. This repository uses the explicit date from those detailed sections. The conflicting sentence belongs to the separate contest site and was not edited here.


### Verification of the rebuilt review fixes

- Production build, ESLint, and TypeScript checks passed.
- All ten content pages passed the 320, 375, 768, 1024, and 1440 pixel checks with one H1, correct canonical URLs, no horizontal overflow, no em dashes, and no grayscale photo filters.
- All internal destinations and anchors checked successfully. FAQ links were followed into the Ascent journey.
- Confirmed the new Ascent preparation facts, visible and correctly addressed email links, and all 12 gallery button labels.
- Blog reading containers are now capped at 768 pixels. The UI agent visually confirmed 704-pixel article content inside that container, readable FAQ content, and aligned desktop page introductions.
- Mobile navigation, gallery keyboard controls, image loading, reduced-motion content, no-JavaScript homepage content, and browser runtime-error checks passed.
- The UI agent rechecked the rebuilt article, FAQ, Ascent preparation, contact, and gallery views on desktop and 375-pixel mobile layouts and reported no further defects.


### Follow-up performance results

The rebuilt Ascent page scored 96 for performance and 100 for accessibility, best practices, and SEO, with LCP 2.7 seconds and CLS 0. The homepage scored 88 while other visual checks were running, then 91 in an isolated repeat, with LCP 3.0 seconds, total blocking time 180 milliseconds, CLS 0, and 100 in the other three categories.

The final homepage measurement does not meet the repository's 95 performance target or its two-second LCP target. A targeted review found no new hero animation, visibility gate, hydration dependency, or meaningful asset growth: request counts stayed the same and total transfer grew by 437 bytes relative to the earlier report. The LCP photograph, priority, dimensions, and primary framework scripts were unchanged. No clear source regression was identified, so speculative rendering changes were not introduced to chase a score. The latest lower measurement is retained here rather than presented as a passing performance check. The previously noted JavaScript budget also remains open.

## Design, team, and sponsorship refinement

### Design decisions

- Standardized standalone section actions with a shared `TextLink` component. Arrow icons are separate SVGs, so the label and arrow cannot acquire the awkward continuous underline. Links retain visible keyboard focus and a minimum 44-pixel target.
- Applied the link treatment to the homepage, FAQ, team profiles, Ascent information, Derive partners, gallery invitations, and assessment contact.
- Removed ornamental gold rules, the unused underline-drawing animation, and redundant section borders. Kept separators where they organize distinct content.
- Replaced desktop navigation's underline indicator with a compact filled active state. Aligned mobile menu rows and simplified the close control and footer headings.
- Made buttons wrap safely on narrow screens. Retained conventional underlines within article paragraphs so reading links remain identifiable.
- Preserved the supplied burgundy, antique gold, and cream palette and the original color photography. Event photographs retain captions identifying the actual Derive edition.

### Team

- Added Kartik Agrawal, Head of Problem Design for AMS Derive 2026, with IIT Kanpur affiliation and the supplied LinkedIn profile.
- Added Ayush Shukla, Head of Community, with University of Mumbai affiliation and the supplied LinkedIn profile.
- Added Quasar Chunawala, Head of Problem Design for Ascent, with CME Group affiliation and the supplied LinkedIn profile.
- Added University of Mumbai to Tilak Jain's existing founder profile.
- Kept Tilak's existing photograph and placed the three additional profiles beneath it in a clean responsive roster. Profile links use the shared text action. No portraits or biographies were invented for the new members.

### Sponsorship and wording

- Reworked `/access` around contest sponsorship, leading with “Sponsor Ascent.” and a direct sponsorship inquiry.
- Made Ascent the current priority and described Derive opportunities as future editions. Jane Street and QRT references remain specific to Derive '26.
- Added concise guidance for sponsors and recruiting teams without promising unconfirmed benefits, access to candidate data, or hiring outcomes.
- Kept `partners@amshq.in` visible and copyable. Assessments now occupy a short final section with a separate inquiry to `team@amshq.in`.
- Preserved `/access`, `#sponsor`, and `#contact`, and provided `#assessments` for links directly to the secondary offer.
- Aligned homepage invitations, navigation, footer, FAQ links, metadata, organization description, and `llms.txt` with the sponsorship priority. Team affiliations in `llms.txt` are explicitly distinguished from institutional sponsorship.

### Review process

Two design and content subagents reviewed the shared UI and sponsorship page. Their changes were integrated with the team update and homepage copy review. The final review checks the actual production build, including responsive layouts, keyboard navigation, profile destinations, and sponsorship contact flow.

### Final verification

- Production build, ESLint, TypeScript, and whitespace checks passed. All content routes remain statically generated.
- All ten content pages passed layout checks at 320, 375, 768, 1024, and 1440 pixels: one H1, correct canonical URL, no horizontal overflow, no em dashes, and no photo color filters.
- Verified the four team names, affiliations, and exact LinkedIn destinations, the sponsorship-first section order, both inquiry email destinations, and the separate assessment anchor.
- Verified internal routes and anchors, JSON-LD parsing, image loading, mobile-menu focus handling and Escape, gallery keyboard navigation, reduced-motion rendering, and homepage visibility with JavaScript disabled. No browser runtime errors were reported.
- The design subagent visually reviewed the final production homepage, team page, and sponsorship page on desktop and mobile. It found no arrow collisions, awkward underlines, wrapping defects, or spacing issues. Sampled standalone text actions measured at least 44 pixels high.
- The isolated homepage Lighthouse run scored 96 for performance and 100 for accessibility, best practices, and SEO. LCP was 2.8 seconds, CLS was 0, and total blocking time was 20 milliseconds.
- The Lighthouse score meets the repository's 95 target. Its stricter two-second LCP target remains unmet, and this refinement does not resolve the previously documented JavaScript budget. No dependencies, image assets, or additional client-side interactions were added.

## Partnership tone refinement

- Replaced “Where your support can help” with “Partner with the next edition” and “Let’s talk about Ascent” with “Plan your partnership.”
- Removed tentative appeals such as “looking for partners,” “help support,” “seeking sponsors,” and “we welcome conversations” from the sponsorship pitch and related homepage copy.
- Framed sponsorship as a working partnership with clear objectives, involvement, timing, and agreed next steps. Recruiting copy now asks for concrete roles and skills so AMS can assess the fit.
- Grounded Derive's invitation in its completed edition: 33 finalists at IIT Bombay, with Jane Street and QRT as partners. Kept Ascent as the current focus and Derive sponsorship tied to future editions.
- Updated the homepage introduction, partnership card, closing invitation, footer tagline, and partnerships metadata for a consistent tone. Preserved the design, contact destinations, and final assessment section.
- Verification: production build with TypeScript validation, ESLint, and whitespace checks passed. Homepage and partnerships page passed copy and layout checks at 320, 375, 768, 1024, and 1440 pixels. Confirmed the contact destination, absence of em dashes and removed phrases, and no browser errors. Visually checked the revised sponsorship section.

## Team roster addition

- Updated Quasar Chunawala's role to “Head of Problem Design · AMS Ascent 2026.”
- Added Sahil as “Head of Partnerships · AMS Derive 2026,” linking to the supplied LinkedIn profile. Affiliation is optional and omitted where none was supplied.
- Arranged the four profiles beneath Tilak in two columns on tablet and desktop, with a single column on phones. Updated the team introduction and `llms.txt` to include the partnerships role.
- Verification: production build with TypeScript validation, ESLint, and whitespace checks passed. The team page passed at 320, 375, 768, 1024, and 1440 pixels, with the exact role text and Sahil's LinkedIn destination, no horizontal overflow or em dashes, and no browser errors. Visually checked the completed roster.

## Balanced team page and gallery redesign

### Research and design rationale

There is no single gallery layout established as universally “most liked.” The design follows published guidance and the actual AMS photo collection rather than attributing a preference to Apple or Google.

- [Apple Human Interface Guidelines: Collections](https://developer.apple.com/design/human-interface-guidelines/collections) recommends familiar rows or grids, adequate spacing, and layouts that keep attention on the content. Applied as a predictable grid with straightforward photo selection.
- [Google Material: Image lists](https://m2.material.io/go/web-image-list/) distinguishes equal-sized grids from layouts that emphasize selected images or preserve varied proportions. Most AMS thumbnails are approximately 3:2, so a regular 3:2 grid suits this collection. The full-size viewer preserves the original image proportions.
- [Nielsen Norman Group: Cards](https://www.nngroup.com/articles/cards-component/) recommends a regular grid for a photo album rather than framing every photograph as a separate card. Removed the shared border matrix and boxed caption strips, keeping clear gutters and visible captions.
- [Nielsen Norman Group: Similarity](https://www.nngroup.com/articles/gestalt-similarity/) explains how consistent size signals related content and comparable visual prominence. Applied to the team roster with the same name size for every person.

### Team layout

- Removed the full-width founder panel, its contrasting background, oversized padding, and large portrait.
- Placed all five members in the same responsive roster with equal name typography. Tilak remains first with a 72-by-88-pixel real photograph and his short biography, providing modest recognition without dominating the page.
- Kept every name, role, affiliation, and profile link. Added no invented photographs or affiliations.
- Added a compact page-header option for the team page and tightened the space before the roster so colleagues appear sooner.

### Gallery layout and viewer

- Added a compact album introduction with event context, a dynamic photo count, a full-size viewing hint, and a link back to the Derive edition.
- Used two columns on phones and tablets and three on desktop, with stable row order and consistent gutters. The twelve photographs remain in their existing order.
- Changed thumbnails from 4:3 to 3:2, closer to the source photographs, and retained descriptive captions below every image.
- Removed borders around each photograph and the reveal effect from gallery tiles. Photos are available immediately without waiting for scroll animations; the first thumbnail is prioritized and the others remain lazy-loaded.
- Matched image size hints to the actual column widths. No new image assets or dependencies were added.
- Added a current-photo counter to the full-size viewer and separated captions and controls on narrow screens. Original aspect ratios, keyboard navigation, Escape, focus restoration, and scroll locking remain part of the viewer.

### Review and verification

- A design subagent proposed the compact founder treatment and shared roster. The parent implemented it alongside the gallery redesign and visually reviewed desktop and mobile captures.
- Production build, ESLint, TypeScript, and whitespace checks passed. All routes remain statically generated.
- All ten content pages passed checks at 320, 375, 768, 1024, and 1440 pixels for layout, headings, canonical URLs, color photographs, reduced-motion visibility, and absence of em dashes.
- Additional checks confirmed equal name typography across all five team members, the 72-by-88-pixel portrait, and the gallery's two-column and three-column breakpoints.
- Opened and decoded all twelve full-size photographs. Verified the counter, previous/next wraparound, keyboard focus trapping, Escape, focus restoration, scroll unlocking, and that clicking the photograph itself does not close the viewer. Viewer controls retain 44-pixel targets.
- Checked visible gallery content without JavaScript, all internal routes and anchors, image loading, mobile navigation, and JSON-LD parsing. No browser runtime errors were reported.
- Final gallery Lighthouse: performance 99; accessibility, best practices, and SEO 100; displayed LCP 2.0 seconds; CLS 0; total blocking time 20 milliseconds. This is a gallery measurement, not a new site-wide performance guarantee. Previously recorded homepage and JavaScript budget limitations remain documented above.

## Selective Astryx component refinements

Reviewed the live [Astryx component library](https://astryx.atmeta.com/components), including the rendered [IconButton](https://astryx.atmeta.com/components/IconButton), [Lightbox](https://astryx.atmeta.com/components/Lightbox), and [ButtonGroup](https://astryx.atmeta.com/components/ButtonGroup) documentation, plus its [layout guidance](https://astryx.atmeta.com/docs/layout). Applied the compact-control and clear-action patterns using AMS's existing React and Tailwind components.

- Added a shared, quiet `IconButton` with a 44-pixel target, a required accessible label, native hover hint, and consistent hover, pressed, and keyboard-focus states.
- Added small SVG control icons with a consistent stroke and size. Replaced the gallery's text arrows and close glyph, and aligned the mobile menu's controls with the same treatment.
- Moved the gallery close control to the upper-right corner beside the photo counter. Kept previous and next controls together below the image, with the descriptive caption separate from the controls.
- Named the viewer's navigation group for assistive technology. Kept captions plain text and preserved the photo counter and keyboard navigation.
- Scoped the lightbox focus query to its own dialog, prevented arrow-key page scrolling, and restored the body's previous scroll setting on close.
- Preserved AMS's palette, photo grid, team hierarchy, and clear text labels for less obvious actions. No Astryx package or other dependency was installed.

Verification: production build with TypeScript validation, ESLint, and whitespace checks passed. Rechecked the homepage, gallery, team, and shared mobile menu at 320, 375, 768, 1024, and 1440 pixels. All twelve full-size photographs loaded; forward and reverse focus wrapping, initial focus, Escape, touch-target sizes, labels, close-click behavior, and restoration of the previous scroll setting passed. The gallery remains visible without JavaScript. No browser errors were reported, and the mobile viewer was visually inspected.

Gallery Lighthouse after this refinement: performance 99; accessibility 100; best practices 100; SEO 100. LCP was 1.984 seconds, CLS 0, and total blocking time 27 milliseconds. Existing site-wide JavaScript budget limitations remain documented above.

## SEO, answer clarity, and official identity, 28 September 2026

Used separate subagent reviews for technical SEO and AEO/entity decisions. Inspected the live old domain, the new host's redirect behavior, AMS's official LinkedIn profile, and current Google Search Central guidance. The technical subagent implemented the shared metadata changes; the parent integrated content, schema, links, documentation and verification.

### Website changes

- Corrected the canonical host to `https://www.amshq.in`. The live bare domain already returns HTTP 308 to this host, so pointing canonical tags back to the bare domain sent conflicting signals. Canonicals, social URLs, structured data, sitemap, robots and supplemental `llms.txt` now agree.
- Centralized page metadata generation. All ten content pages retain individual titles and descriptions, with explicit Open Graph URLs, site name, locale and complete Twitter previews. Existing real 1200-by-630 share images remain in use.
- Added a plain visible definition of AMS (Algorithms & Mathematics Society) to the homepage's existing introduction. Kept the current visual hierarchy and avoided repetitive keyword additions.
- Added visible FAQ answers for the move from `amsociety.in` and individual Ascent 2026 registration. FAQ structured data comes from those same answers.
- Added stable Organization and WebSite identifiers and connected article publishers, event organizer and team identities to them. Removed the unsupported “AMS India” alias and legal-name assertion. Derive's separate contest site is no longer treated as an identical organization through `sameAs`.
- Added Person data for the five visible team members, using their existing roles and LinkedIn URLs. Added stable team anchors without changing roster sizing. Inferred no degrees or employment details.
- Corrected the “AMS Team” article author from Person to Organization. Named authors link to their team profiles; the organization byline links to the team page. Kept the organization homepage consistent in schema.
- Added verified AMS LinkedIn links to the footer and organization schema. The old website's LinkedIn link redirects to the current `/company/amshq/` profile, which was checked directly.
- Added current website and contest links to the repository README. Corrected assessment-specific article links to `/access#assessments`.
- Escaped `<` in serialized JSON-LD to prevent content from terminating its script element. No runtime dependency, tracking script or client-side SEO code was introduced.
- Added `pnpm check:seo`, a dependency-free check of generated HTML metadata, schema shapes, relationships, team identities, visible FAQ parity, article authorship, event dates, sitemap, robots and canonical links.

### Migration and external profiles

The old site still serves its own pages. Its `/about` page reuses homepage metadata and a homepage canonical; those patterns were not copied. The existing LinkedIn Website field still points to the old domain.

[The SEO audit and migration notes](docs/seo-2026-09-28.md) include the observed evidence, a five-route starting redirect map, legacy resources that need an inventory before migration, public profile website-field values, contest organizer link updates, suggested correction wording for existing backlinks, and Search Console follow-up. These external changes are pending access to the respective accounts. No old-domain redirects, DNS changes, Search Console submissions, profile edits, or outreach messages were performed.

Current Google guidance says no special AI markup or `llms.txt` file is needed for its AI search features. Google also retired FAQ rich results in May 2026. The FAQ remains useful visible content with matching schema; no ranking, rich-result, or assistant-citation outcome is promised. Source links are included in the audit.

### Verification

- Production build and TypeScript validation passed; all ten content pages remain static or statically generated blog pages.
- ESLint, standalone TypeScript, generated-HTML SEO checks and whitespace checks passed.
- All ten pages passed browser checks at 320, 375, 768, 1024 and 1440 pixels. Checked headings, canonical URLs, absence of em dashes, color photos, responsive overflow, reading widths, internal routes and fragments, FAQ journeys, member links, menu and gallery interactions, image loading and no-JavaScript content. No browser runtime errors were reported.
- The homepage Lighthouse check scored performance 95, accessibility 100, best practices 100 and SEO 100. LCP was 2.9 seconds, CLS 0 and total blocking time 30 milliseconds. The previously documented homepage LCP and JavaScript-size limits remain open; this SEO update does not claim to resolve them.
- Structured data passed local shape, relationship and content-parity checks. Google's live Rich Results Test and Search Console inspection remain post-deployment operational checks, not claimed results of the local validator.
