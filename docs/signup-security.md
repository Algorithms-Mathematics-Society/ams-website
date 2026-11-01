# Competition updates: design and security review

Reviewed with independent security and storage agents on 1 November 2026.

## Visitor journey

Keep a labelled updates action on competition closing sections and in the footer.
A bell would imply a notification inbox that the site does not have. Home keeps
competition exploration as its primary action. Ascent keeps entry status primary;
Derive's completed edition gives future-edition updates the primary closing action.
Contextual links select the relevant competition, and the visitor can change it.

The form asks for name, email, topic, and explicit unchecked consent. It states
that updates do not reserve a competition place. Verification runs on submission,
not on page load. Checking, saving, retry, and success states are distinct. A
30-second browser deadline prevents a stuck submission; errors preserve input
and provide an actual email contact link. Intended benefits are clearer choices
and fewer surprises, not proven psychological conversion gains.

## Request path and live safeguards

1. Static website, then lazy Firebase App Check/reCAPTCHA Enterprise on submission.
2. Strict origin, method, content-type, body bounds, and input checks.
3. Mandatory App Check verification for the configured website app, using consumed
   limited-use tokens. Missing, invalid, replayed, or other-app tokens fail closed.
4. Atomic Firestore quotas: 5/IP/minute, 20/IP/hour, 1,000 admissions/UTC day.
5. Direct lookup by SHA-256 of trimmed lower-case email. Transactional create only
   when absent. Existing preferences and suppression records cannot be overwritten.
6. Generic acknowledgement after commit. No email address membership disclosure
   through different duplicate status responses, including at the daily cap.

The quota secret remains in Secret Manager. IP quota keys use HMAC and rotate by
window; raw IP addresses are not stored in Firestore. Unused field indexes are
disabled. Temporary quota documents have TTL; window changes do not depend on
immediate deletion. Firestore public reads and writes are denied.

App Check is configured with a domain-restricted reCAPTCHA Enterprise key for
amshq.in and www.amshq.in. Tokens are verified against the exact registered app ID.
The function service account has App Check Token Verifier permission. The only
verification bypass is the Firebase emulator process, never a request flag or
browser-supplied setting. No debug token is shipped in the website.

## Lookup costs

No subscriber collection scan or query is used. Document IDs address records
directly. These are bounded application operations per transaction attempt,
independent of subscriber count, not a guarantee of constant wall-clock latency.

| Outcome | Reads | Committed writes |
| --- | ---: | ---: |
| New subscriber | 4 | 4 |
| Existing or suppressed subscriber | 4 | 3 |
| Minute quota rejection | 1 | 0 |
| Hour quota rejection | 2 | 0 |
| Daily quota rejection | 3 | 0 |

Transactions allow at most three attempts, so at most 12 application document
reads across attempts. Network time, service behavior, contention, and App Check
verification latency still vary. The daily counter intentionally favors bounded
intake over throughput; it is a contention point suitable for this small list.

## Boundaries and operations

- App Check raises the cost of automation; it is not proof of a human or email
  ownership. A determined distributed actor can still consume verification and
  invocation resources. Neither maxInstances nor daily admissions is a billing cap.
- `req.ip` is a supplementary signal because Functions Framework proxy trust can
  affect it. Do not treat it as authenticated identity or claim spoof-proof quotas.
  The daily admission cap does not rely on IP identity.
- The 4 KB handler check runs after framework parsing; it is not an edge request
  size limit. Platform invocation and rejected-request costs remain possible.
- Quota limits can affect shared campus networks and legitimate launch bursts.
  Keep email fallback; monitor acceptance/rejection counts without logging PII.
  Raise limits based on observed demand, not automatically under attack.
- reCAPTCHA scripts load only on interaction. Browser privacy tools or low scores
  can reject legitimate visitors; provide the visible contact alternative.
- Requests remain `emailVerified: false`. Do not send campaigns before ownership
  confirmation, signed unsubscribe, retention policy, and sender setup exist.
- Direct hash IDs do not encrypt email addresses. Restrict administrator access;
  keep exports private. A full account compromise is outside these request guards.
- Database remains US multi-region nam5; function is Mumbai asia-south1. This
  adds network latency. Review residency before storing more data if required.

## Deployment

Backend enforcement is deployed. `NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_SITE_KEY` was
added to the ignored `vercel-env.txt` and local environment. Copy the new setting
to Vercel Production and deploy the updated code. The public /updates route was
still 404 at review, so environment changes alone have not published this feature.
The page shows a contact alternative if the required browser key is missing.
Preview domains are not allowed by default. Localhost uses the Firebase emulator.

The backend's ignored `.env.ams-main-856a1` sets UPDATES_APP_ID; this is the public
Firebase web app ID, not a secret. Future deployment machines must supply it.
No runtime request can turn verification off. Redeploy with:

```sh
firebase deploy --only firestore:indexes,functions:ams-updates --project ams-main-856a1 --account ams.official2026@gmail.com
```

## Evidence

- 20 backend unit tests passed: validation, attestation order, replay/app-ID
  rejection, immutable suppression, duplicate preservation, quota boundaries,
  bounded operations, retries, and clock rollover.
- Two real Firebase emulator tests passed, including concurrent fresh signup
  creation and quota enforcement.
- Live verification passed: missing/invalid token denial, accepted limited-use
  attestation, rejected replay, committed signup, preserved duplicate preferences,
  and denied public reads. Synthetic signup removed and temporary debug credential
  revoked afterward. This validates the backend gate, not human-score accuracy.

References: [App Check custom backend verification](https://firebase.google.com/docs/app-check/custom-resource-backend),
[limited-use web tokens](https://firebase.google.com/docs/app-check/web/custom-resource),
[Firestore best practices](https://firebase.google.com/docs/firestore/best-practices).

Frontend verification: responsive browser checks passed at 320/375/768/1024/1440px
with controlled reCAPTCHA/App Check responses, including fresh limited-use token
requests, consent validation, 403/429/503 recovery, success, and no-JavaScript
contact fallback. Live provider score acceptance by representative human visitors
remains a post-deployment check. Lint, TypeScript, production build, and SEO checks
passed; the page remains static.

Final local Lighthouse spot-check: performance 96, accessibility 100, CLS 0,
LCP 2.7s. No reCAPTCHA or App Check network requests occurred before interaction.
The repository's 2.0s LCP target remains unmet; this lab check is not a field INP
or complete transfer-budget certification.
