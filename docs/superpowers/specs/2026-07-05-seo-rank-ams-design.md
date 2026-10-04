# SEO Design: Ranking amshq.in #1 for "ams"

Date: 2026-07-05
Status: approved in discussion; pending written-spec review
Owner: AMS (Tilak)
Site: the Next.js marketing site in this repo, deploying to https://amshq.in

## Goal and honest framing

Make amshq.in the #1 result for the query "ams", globally if possible.

Reality accepted in the design discussion: the bare global/US query is held by
entities like the American Mathematical Society (138 years of authority). No
tactic outranks them directly; only brand scale does. The winnable path, in
order:

1. #1 for every branded query ("ams society", "ams derive", "ams contest",
   "amshq") from launch.
2. #1 for bare "ams" in India, where the audience lives. Target: 6 to 12
   months, contingent on contest cycles running.
3. Global movement tracked and reported honestly as international brand volume
   grows. No promised date.

Strategy: brand-entity flywheel (Approach A). Four engines: technical
foundation, entity SEO, content moat, authority building, wrapped in a
brand-search flywheel. Explicitly rejected: doorway pages, bought links, PBNs,
keyword stuffing; any of these can permanently end the goal via penalty.

## 1. Domain and migration

- amshq.in is the canonical home. All canonicals, sitemap, robots, and schema
  point there.
- amsociety.in (currently live and ranking, set to expire): STRONG
  RECOMMENDATION to renew one year and 301-redirect page-by-page to amshq.in
  (`/about` to `/team`, `/events` to `/derive`, everything unmapped to `/`).
  A cold expiry loses existing rankings and donates the domain to squatters.
  Fallback if truly not renewed: before expiry, edit every controllable
  backlink (Codeforces blogs are author-editable) to point at amshq.in.
- amsderive.in stays as the contest property and declares its parent: visible
  "by AMS" attribution linking amshq.in, `parentOrganization` in its schema,
  cross-links both ways. One entity, not two competitors.

## 2. Technical on-site (changes to this repo)

- `metadataBase` changes from amsociety.in to https://amshq.in; sitemap and
  robots URLs updated to match.
- Home title becomes "AMS · Algorithms & Mathematics Society"; the tagline
  moves fully into the meta description. Subpage titles keep the
  "%s · AMS" template.
- JSON-LD structured data:
  - `Organization` on every page: name "AMS", legalName "Algorithms &
    Mathematics Society", url https://amshq.in, logo, foundingDate, location
    (India), `sameAs`: LinkedIn, YouTube, Discord, Codeforces profile,
    https://amsderive.in.
  - `Event` on /derive (Derive edition: dates, location IIT Bombay) and
    /ascent (winter edition when scheduled).
- OG/Twitter card images, 1200x630 branded cards per page (brand mark,
  burgundy/cream, page title). Link previews in college groups are brand
  impressions that convert into "ams" searches.
- Footer gains the full name line "Algorithms & Mathematics Society" so the
  canonical entity string appears on every page.
- Day-one post-deploy checklist: Google Search Console and Bing Webmaster
  verification, sitemap submission, indexing confirmation for all routes.
- Performance budgets already met (Lighthouse 96 to 99, CLS 0, a11y 100);
  wiring Lighthouse CI remains open debt tracked in CLAUDE.md.

## 3. Entity SEO

- One canonical name everywhere, forever: "AMS (Algorithms & Mathematics
  Society)". Banned variants: "AMS Society", "Algorithms and Maths Society".
- Wikidata item: instance of student society / nonprofit, country India,
  official website amshq.in, sameAs links (Codeforces, YouTube, LinkedIn).
- Knowledge Panel: expected to appear from Wikidata + schema + press; claim it
  through Search Console the moment it exists.
- All owned profiles update their website field to amshq.in: LinkedIn org,
  YouTube channel, Discord, Codeforces, any listing sites.
- No Wikipedia article attempt until independent press coverage exists;
  premature conflict-of-interest editing backfires.

## 4. Content moat (all on amshq.in)

- Contest editions as permanent pages: /derive/2026 with verified results,
  stats, finalists, photos. Institutions link to pages their students win on.
- Problem archive with editorials: every past Derive/monthly-challenge problem
  becomes a long-tail page. This is the compounding organic-traffic engine.
- 4 to 6 cornerstone guides targeting acquisition queries: "quant contests in
  India", "how to prepare for quant finance interviews India", "competitive
  programming contests India 2026", "quant trading careers India". Each links
  internally to Derive, Ascent, and Access.
- Cadence: every contest round ships an announcement page and a results page.

## 5. Authority and backlinks (white-hat only, from existing assets)

- Codeforces: edit existing blogs to link amshq.in; publish a new blog per
  round. Codeforces domain authority is the single biggest available lever.
- Contest aggregators: CLIST, Unstop, Devfolio listings pointing at amshq.in.
- Host institutions: IIT Bombay club/department event pages for finals;
  participating colleges' CP club pages.
- Sponsors: request a community/partner mention on Jane Street and QRT pages
  during the next sponsorship cycle; one such link outweighs hundreds.
- Press pitches after each finals: campus media (Insight IIT Bombay),
  YourStory, Analytics India Magazine. Story: national quant finals at IIT
  Bombay backed by the firms that hire this talent.
- YouTube channel profile links amshq.in.

## 6. Brand-volume flywheel

Google reshapes an ambiguous SERP per country when behavior proves intent.
Manufacture branded search volume: certificates, result emails, posters,
opening-ceremony slides, and merch all carry "AMS · amshq.in"; finals
aftermovie on YouTube (earns the video carousel on brand SERPs); consistent
handles and the exact entity name in every Discord/social announcement. Each
contest cycle is a brand-search spike; the flywheel compounds per edition.

## 7. Milestones and measurement

Measured in Search Console (position by country), never by manual googling
(personalization lies).

- Week 1 post-deploy: all routes indexed; "amshq" and "ams society" #1.
- Month 1 to 2: redirects live, schema passing the Rich Results test,
  Codeforces links updated, OG cards shipping.
- Month 3: every "ams + word" query #1 from amshq.in; bare "ams" India
  entering top 20.
- Month 6: bare "ams" India top 10; Knowledge Panel live and claimed.
- Month 12: bare "ams" India #1 to #3, contingent on two further contest
  cycles and at least one independent press hit.
- Global "ams": position tracked and reported quarterly; moves with
  international brand volume only.

## Implementation scope split

- In this repo now: metadataBase/domain swap, titles, JSON-LD, OG images,
  footer entity line. One implementation plan.
- Operational (not code, tracked as checklist): domain renewal + redirects,
  Search Console/Bing setup, Wikidata, profile updates, Codeforces edits,
  listings, press, merch/certificate branding.
- Future content work (post-launch): archive, edition pages, cornerstone
  guides. Separate plan when content exists.
