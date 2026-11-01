# AMS competition updates: separate Firebase project

This is an isolated email-interest list. It does not connect to contest accounts,
registrations, resumes, or assessment data. The marketing site stays statically
rendered. Only the signup function writes to Firestore.

## 1. Paste your Firebase web configuration

The local file is already prepared: `apps/web/.env.local` (ignored by Git).
Copy each value from Firebase Console > Project settings > Your apps:

| Firebase console key | Local variable |
| --- | --- |
| apiKey | NEXT_PUBLIC_FIREBASE_API_KEY |
| authDomain | NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN |
| projectId | NEXT_PUBLIC_FIREBASE_PROJECT_ID |
| storageBucket | NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET |
| messagingSenderId | NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID |
| appId | NEXT_PUBLIC_FIREBASE_APP_ID |
| reCAPTCHA Enterprise site key | NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_SITE_KEY |

Use the values without the JavaScript object braces. Do not paste a service-account
JSON/private key. Web configuration is public configuration, not database access.
Analytics and measurementId are not used. `apps/web/.env.example` is the tracked
template. `apps/web/lib/firebase.ts` initializes the named app lazily on submission.
No Firebase Auth, Firestore web SDK, or Analytics is loaded. Firebase App Check and reCAPTCHA Enterprise load only on submission.

Leave `UPDATES_SIGNUP_ENDPOINT` blank for production: the endpoint is derived as
`https://asia-south1-PROJECT_ID.cloudfunctions.net/subscribeToUpdates`.
An explicit HTTPS URL can override it if your deployed function uses another URL.
Restart dev after editing; production needs the same variables in the hosting
build environment and a rebuild. Configuration alone does not deploy the backend.

## 2. Create private storage and deploy the endpoint

Use a new Firebase project for this list. In the console, enable Firestore in
Native mode, create the default database in Mumbai (`asia-south1`), and use
production rules. Cloud Functions deployment requires the Blaze billing plan.
Set a budget alert appropriate to this small list; maxInstances limits function
scaling but is not a billing cap.

With Node 22 and the Firebase CLI installed, run from `infra/updates`:

```sh
npm --prefix functions ci
firebase login
firebase use --add
```

Select the new email-list project, not any contest project. `firebase use --add`
writes the local CLI project mapping. Generate a random value locally for the
server-side rate-limit secret, then enter it when prompted by:

```sh
firebase functions:secrets:set UPDATES_RATE_LIMIT_KEY
firebase deploy --only firestore:rules,firestore:indexes,functions:ams-updates
```

The secret is not one of the web app values and must not go into a NEXT_PUBLIC
variable. It salts IP hashes. The Admin SDK uses the function's managed identity;
no service-account file is needed. Only trusted project administrators should
have access to the subscriber collection.

The checked-in `firestore.indexes.json` enables TTL on `signupLimits.expiresAt`.
Deploy it with `--only firestore:indexes`; policy activation and deletion are
asynchronous. Rate-limit correctness does not depend on prompt TTL deletion:
the hourly bucket is part of the document ID.

Production origins allowed: `https://www.amshq.in` and `https://amshq.in`.
For a staging host, add its exact origin to `functions/index.js` and redeploy.
CORS/origin checks constrain browser use; they are not bot authentication.

## 3. Verify before enabling public signup

1. Deploy the function and private Firestore rules to the new project.
2. Set the web app values in the website's build environment and rebuild.
3. Open `/updates?topic=derive`. Submit an address you control with consent.
4. Check that one `updateSubscribers` document exists and the UI confirms saving.
5. Submit again. There should still be one document; existing preferences remain.
6. Check removal-request handling with the team mailbox owner.

Until configured, `/updates` shows a working mailto contact option rather than a
form that cannot save. Errors, timeouts, and 429 responses keep entered values.
A saved acknowledgement is only returned after the Firestore transaction commits.

## Data and lifecycle

`updateSubscribers/{sha256(normalizedEmail)}` stores name, normalized email, topics,
consent text/version and timestamp, creation time, source, `status: requested`,
and `emailVerified: false`. It deliberately stores no raw IP, resume, phone,
university, browser fingerprint, or contest identity. These requests are not
verified mailing recipients yet. Duplicate requests do not reveal an existing
subscription, overwrite preferences, or reactivate a suppressed record.

This feature collects requests only. It does not send email or verify email
ownership. Before campaigns, connect a sending provider, verify ownership through
a confirmation email, and implement token-based unsubscribe/preferences links.
Only send campaigns to confirmed recipients, with unsubscribe in every message.
Until then, removal and corrections are handled through `team@amshq.in`, as stated
on the form. Agree an internal retention period and remove unused requests.

When suppressing a subscriber, clear their name/email/topics and retain the
hashed document ID with `status: suppressed`; a public signup cannot restore it.
Re-subscription and preference edits require a verified owner workflow. Keep any
exports private and outside the repository. Never use Firestore test-mode rules.

Mandatory single-use App Check verification, validation, 4 KB handler body limit,
honeypot, 5 requests/IP/minute, 20/IP/hour, and 1,000 total admissions/day are
implemented server-side. The quota uses an atomic transaction and rotating HMAC
IP keys. Shared campus networks may hit the same limit; the form offers email
contact. Distributed abuse can bypass IP limits; App Check and the aggregate admission
limit provide additional layers. Neither is a guarantee against all automation. Under transaction contention, requests may
receive a retryable error rather than a false acknowledgement.

## Local tests

```sh
npm --prefix functions test
```

For real local persistence tests, install Java 21 and use the Firebase emulator.
Create `functions/.secret.local` (ignored) with a dummy emulator-only value:

```text
UPDATES_RATE_LIMIT_KEY=local-emulator-only-not-a-production-secret
```

```sh
firebase emulators:exec --only functions,firestore --project demo-ams-updates 'node --test functions/emulator.test.js'
```

This demo project does not write to the live list. The emulator permits localhost
ports 3100 and 3108. For interactive local testing, use `emulators:start` and set
`UPDATES_SIGNUP_ENDPOINT=http://localhost:5001/demo-ams-updates/asia-south1/subscribeToUpdates`
in the website's local environment (development only).

Backend dependencies are separate from the web workspace, with their own lockfile.
Patched glob/minimatch overrides address server-side transitive audit findings.
The Firebase web SDK is dynamically imported only on the updates submission path.
The prescribed Bundlephobia CLI has no executable; inspect the production chunks
when reviewing its actual impact instead.

References: [Firebase HTTP functions](https://firebase.google.com/docs/functions/http-events),
[deployment setup](https://firebase.google.com/docs/functions/get-started), and
[Firestore TTL](https://firebase.google.com/docs/firestore/ttl).

## Deployment status: 1 November 2026

Account: `ams.official2026@gmail.com`. Project: `ams-main-856a1`.
Firestore is enabled and deny-all client access rules are deployed. The CLI
created the default database in `nam5` (US multi-region), not the Mumbai location
originally planned. No signup data was submitted. Database location cannot be
changed in place; review this before collecting live data if India residency is
required. For future projects, explicitly create the database in the chosen
location before deploying rules, since the CLI may otherwise default to `nam5`.

After the owner enabled Blaze, `subscribeToUpdates` deployed successfully in
`asia-south1` using `ams.official2026@gmail.com`. The production rate-limit secret
is in Secret Manager. The TTL policy was submitted successfully (state CREATING
at verification), and the function artifact repository has seven-day cleanup.

Endpoint: https://asia-south1-ams-main-856a1.cloudfunctions.net/subscribeToUpdates

Live verification passed: production CORS preflight, input validation, committed
Firestore write, duplicate preference preservation, and denied public reads. The
synthetic deployment signup was deleted and its absence verified. No real person
was subscribed and no email was sent.

The production function accepts the two AMS website origins listed above.
Localhost browser testing uses the emulator, not the live function. Set the web
configuration in the production website hosting environment and rebuild/deploy
that website separately; this Firebase deployment did not publish the website.

## Security hardening follow-up

App Check/reCAPTCHA Enterprise and replay protection are now mandatory on the live
function. The new public site key is in `vercel-env.txt`; copy it into Vercel and
deploy the updated website. See [security review](../../docs/signup-security.md)
for exact lookup bounds, test evidence, safeguards, and remaining limitations.
For emulator tests, set `UPDATES_APP_ID=emulator-app` in
`functions/.env.demo-ams-updates` (ignored).

## Local preview says verification failed

The live reCAPTCHA key and function are restricted to AMS production domains.
Opening the website at `localhost:3100` does not make it an allowed production
origin. Do not add localhost to production CORS or disable live App Check to fix
local testing. Font/image preload notices are not signup verification results.

The development page now shows a setup notice instead of a form when no local
emulator endpoint is configured. To test locally:

1. Start the emulators from `infra/updates` with
   `firebase emulators:start --only functions,firestore --project demo-ams-updates`.
   Use the dummy secret and emulator app ID described above.
2. Set this line in `apps/web/.env.local`:
   `UPDATES_SIGNUP_ENDPOINT=http://localhost:5001/demo-ams-updates/asia-south1/subscribeToUpdates`
3. Restart the website development server, then open `/updates` on port 3100.

These signups go to local test storage, not the live email list. Leave the endpoint
override blank in Vercel. The local HTTP override is rejected in production builds.
To join the real list, use `https://www.amshq.in/updates` instead. In development,
verification exceptions log only the SDK error code, never email or token values.
