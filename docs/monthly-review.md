# AMS Monthly engineering review

Reviewed 24 November 2026 on local branch `feat/ams-monthly`.

Reference: the canonical private vault `docs/blog-plan.md`, especially Phase 3 and
sections 12.4 through 12.8. The local `ams-main/docs/blog-plan.md` matched that copy
when reviewed. This note deliberately contains no future problem content, answer
keys, feed addresses, or private commercial planning.

## Expanded testing follow-up

The subsequent requested regression/system pass supersedes the earlier test totals.
All work remains local and uncommitted.

### Additional failures reproduced and fixed

- Impossible dates such as a non-leap-year 29 February, 31 April, and `24:00:00`
  were accepted or normalized by JavaScript. Schedule fields and `AMS_BUILD_NOW`
  now require valid explicit ISO instants. YAML timestamps must be quoted so the
  parser cannot normalize them before validation. Integer fields reject values
  beyond JavaScript's exact integer range.
- HTTPS validation previously accepted incomplete URLs and credentials. It now
  parses URLs, and problem submit links must be Google respondent `viewform`
  URLs rather than editor URLs.
- CRLF files failed section parsing; headings inside fenced code could become
  false tier boundaries; empty questions and duplicate tier headings passed.
  Section splitting now uses the existing Markdown parser's actual heading nodes.
- Markdown could emit executable `javascript:` links. Unsafe link protocols are
  stripped while ordinary HTTPS, HTTP, mail, telephone and relative links remain.
  Raw script elements remain excluded by the existing Markdown pipeline.
- A null reviewer produced an unhelpful runtime exception. Reviewer metadata now
  receives the same named-field mapping validation as other frontmatter.
- Very long unbroken share-card titles were clipped at the image edge. Card text
  now wraps using measured glyph widths and fits inside its reserved area.
- The root layout loaded the full Astryx component stylesheet on pages that do
  not use its styled components. The import now belongs to the Button consumer.
  Matching computed styles for 152 elements across eight routes were unchanged.
  The contributor page shed approximately 30 KB of compressed render-blocking CSS.

### Final test results

| Test layer | Result |
| --- | --- |
| Unit and loader integration | 77 passed, zero failed |
| Selected-module coverage | 94.19% lines, 90.20% branches, 90.14% functions |
| Date, frontmatter, Markdown, cards and solver modules | 100% line coverage; this is not a whole-site coverage claim |
| Leak regression | Both real builds passed the expected assertions; seven unreleased canaries absent, three released canaries present |
| Production-like system tests | Approved synthetic feed renders, names are escaped, future solvers hidden, sitemap correct, unknown routes 404 |
| Withdrawal regression | Removing a synthetic row and rebuilding removes its name from rendered output |
| Deadline boundary | Both submit links disappear at the exact deadline |
| Failure-path testing | Direct-build bypass, missing production feed, private feed columns, truncated CSV, HTTP errors and timeouts fail closed |
| Retry behavior | Transient HTTP failures retry up to three attempts and use the fresh validated response |
| Concurrency smoke test | 40 simultaneous local route requests returned 200; not a production capacity certification |
| Responsive browser tests | Six routes at five widths, 30 combinations; no horizontal page overflow |
| Accessibility | Six route scans using axe WCAG 2 A/AA and 2.1 AA tags; zero violations |
| Interaction | Native submit links, keyboard menu opening/Escape, client navigation, 200% text sizing and populated solver tables passed |
| Progressive enhancement | All six tested routes readable with JavaScript disabled; submit links remain available |
| Shared-page style regression | 152 matching elements unchanged across eight routes, including existing contest pages and controls |
| Static checks | Lint, typecheck, SEO and whitespace checks passed |
| Final output | Normal prelaunch build restored; no synthetic Monthly pages or assets left |

Coverage includes `blog.ts`, `frontmatter.ts`, `markdown.ts`, `monthly-card.ts`,
`monthly-release.ts`, `monthly.ts`, `solvers.ts`, and the solver-feed script.
Subprocess system-test execution is separate from these unit coverage percentages.

The keyboard test initially checked React's `aria-expanded` state before the
asynchronous native dialog close event had updated it. It now waits for that state
change rather than using a sleep or weakening the assertion. The complete browser
cycle then passed, including a second run with the negative build tests enabled.

### Reproducible commands

Run from the repository root with Node 24:

```sh
pnpm --filter web test:monthly
pnpm --filter web check:monthly-leak
pnpm --filter web check:monthly-system
pnpm lint
pnpm typecheck
pnpm --filter web check:seo
```

Build-based checks must run sequentially. The leak checker leaves fixtures and must
be followed by a normal build; the system checker restores a normal build in its
cleanup path. To include browser testing in the system checker, set
`AMS_TEST_BROWSER=1`, `PLAYWRIGHT_MODULE` to an externally installed Playwright
entry module, `CHROME_PATH` to Chrome, and `AXE_SCRIPT` to axe's browser script.
No new package dependency was added. The feed mock intercepts a single synthetic
URL; no actual Form or Sheet is contacted or submitted to.

### Limits still open

The optimized contributor page measured Lighthouse performance **98**, accessibility
**100**, CLS **0**, TBT **10 ms**, but simulated mobile LCP remained **2.5 seconds**.
The stylesheet reduction is verified, but the strict 2.0-second LCP budget is still
not passed. A real deployed measurement and further performance investigation are
required; it would be misleading to describe every performance gate as green.

Browser checks used installed Chrome, not Safari/Firefox or physical phones. Live
Google submission/consent flows and remote Vercel settings remain untested because
Phase 2 is not configured. The existing human and launch prerequisites below remain.

## Findings fixed

- **High: stale build data could bypass the intake preparation.** A direct
  `next build` could reuse a solver JSON file from an earlier build. The normal
  build now fetches a fresh snapshot and passes a per-run token; Next rejects
  builds without the matching token and tells the operator to run `pnpm build`.
  Failed fetches remove the previous snapshot before failing.
- **High: generated Monthly assets survived ordinary rebuilds.** Old images could
  remain publicly available after source removal or an earlier preflight. The
  normal build now clears `public/monthly-assets` before regenerating due content.
  The leak test seeds a stale canary and exercises the real build wrapper.
- **Medium: malformed CSV was accepted.** Unterminated quotes, quotes within an
  unquoted field, and trailing text after a closing quote now fail. Problem IDs
  must be canonical positive safe integers. Private extra columns remain rejected.
- **Medium: Markdown images could escape their content folder.** Real paths are
  checked for traversal and symlink escapes. Subdirectory paths are preserved so
  two different images called `plot.png` cannot overwrite each other.
- **Medium: required share cards were missing.** Released problems and solutions
  now generate individual 1200x630 PNG cards behind the same date gate. Solution
  cards contain the title and publication date, never the answer. Both metadata
  surfaces reference those cards.
- **Medium: the archive used display names as identity keys.** Different people
  with the same name could collapse into one count. It now explicitly counts
  listed solves across both parts. A unique-person count would require a stable
  public identifier and a separate consent/schema decision.
- **Medium: export ignore rules were incomplete.** Added repository-wide CSV and
  XLSX exclusions, the root exports directory, and the local private plan path.
  Ignore rules are an accidental-add safeguard, not a security boundary.

The engineering guide describes the updated build contract. No new dependency,
client component, or browser JavaScript was added. Changes remain local and
uncommitted; nothing was pushed or deployed.

## Verification

Use Node 24 as required by the existing guide. The default shell supplied Node 18,
which cannot run the existing TypeScript-stripping tests; validation used the
installed Node 24.4.1 runtime.

- 15 automated tests: release boundaries and IST dates, CSV parsing/schema,
  failed-fetch stale snapshot removal, image traversal/symlinks and name collisions.
- Lint, typecheck, and normal production build.
- Two-build leak check: early source rejected; seven unreleased canaries absent and
  three released canaries present, including seeded stale-output cleanup.
- Direct `next build` refused after an earlier prepared build.
- Production fixture build with a released solution and no feed refused explicitly.
- SEO/schema checks on 17 fixture pages and 14 actual prelaunch pages.
- Browser: Monthly index, two problem pages, one solution, and contributor guide at
  320, 375, 768, 1024 and 1440 px. All 25 checks had one H1, no horizontal overflow,
  and no browser page errors. Three unknown/unreleased routes returned 404.
- Three released share cards returned 200; an unreleased card returned 404.
  Reviewed the 320 px problem screenshot and generated share-card appearance.
- Mobile Lighthouse on the contributor guide: performance 98 then 96, accessibility
  100 both times, CLS 0, TBT 20 ms. **LCP was 2.2 then 2.7 seconds, so the separate
  2.0-second engineering budget is not met in this local measurement.** A production
  measurement and further performance work remain required; do not mark every
  Phase 3 exit gate passed.
- Private answer verification rerun successfully, and the distinguishable-threads
  wording was confirmed. Some independent checks are Monte Carlo estimates, not
  exact equality proofs. Human problem-setter/originality review remains necessary.
- Final normal build restores prelaunch output, removing synthetic fixture pages
  and generated fixture cards. Whitespace and changed-file em-dash checks pass.

Next reports ordinary pages as `○` and generated parameterized pages as `● (SSG)`.
Both are prerendered static content; the earlier claim that every route prints `○`
was inaccurate. The app does not set Next's `output: "export"`; static prerendering
must not be confused with an `out/` export deployment.

## Remaining work against the plan

- Phase 2: create and verify real Forms and the consent-filtered public Sheet;
  replace vault Form placeholders and configure the feed. No live feed or end-to-end
  Google submission could be validated from the current placeholder setup.
- Vercel's remote project settings were not verified. Set its build command to
  `pnpm build`; the new guard makes an incorrect command fail explicitly. No project
  setting or environment variable was changed in this review.
- Finish the intentionally deferred Monthly FAQ and `llms.txt` entries after the
  other session's edits land. That checkout and its uncommitted edits were preserved.
- The plan's Derive/Ascent closing links and three contributor example cards are
  still absent. These are remaining Phase 3 content tasks, not completed features.
- The exact home-page JavaScript byte comparison and real-device checks were not
  repeated here; no new client code was introduced by these fixes.
- Phase 4 release/preflight automation and its dry run remain outstanding. A static
  site changes only on rebuild: deadline/status transitions and deletions require
  redeployment. Old deployment URLs must also be handled during deletion requests.
- The existing human review, owners, policy decisions, legal review, and privacy
  contact are still launch prerequisites. This code review does not approve them.
