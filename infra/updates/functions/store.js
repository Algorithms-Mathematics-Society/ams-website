import { createHash, createHmac } from "node:crypto";

export const DEFAULT_LIMITS = Object.freeze({ perMinute: 5, perHour: 20, admissionsPerDay: 1000 });
const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function createSignupStore({ db, Timestamp, rateLimitKey, now = () => Date.now(), limits = {} }) {
  const cap = { ...DEFAULT_LIMITS, ...limits };
  for (const value of Object.values(cap)) {
    if (!Number.isSafeInteger(value) || value < 1) throw new Error("Signup limits must be positive integers");
  }
  return async (signup, ip) => {
    const time = now();
    const minute = Math.floor(time / MINUTE);
    const hour = Math.floor(time / HOUR);
    const day = Math.floor(time / DAY);
    const emailId = createHash("sha256").update(signup.email).digest("hex");
    const key = rateLimitKey();
    const hash = value => createHmac("sha256", key).update(value).digest("hex");
    const subscriber = db.collection("updateSubscribers").doc(emailId);
    // Preserve deployed hourly keys so a rollout does not reset existing quotas.
    const hourly = db.collection("signupLimits").doc(hash(`${hour}:${ip}`));
    const burst = db.collection("signupLimits").doc(hash(`minute:${minute}:${ip}`));
    const daily = db.collection("signupLimits").doc(`intakeAdmissions:${day}`);
    const reject = (scope, end) => {
      throw Object.assign(new Error("Rate limited"), {
        code: "RATE_LIMIT", scope, retryAfter: Math.max(1, Math.ceil((end - time) / 1000)),
      });
    };
    const countOf = snapshot => snapshot.exists ? snapshot.data().count : 0;
    await db.runTransaction(async tx => {
      const minuteCount = countOf(await tx.get(burst));
      if (minuteCount >= cap.perMinute) reject("minute", (minute + 1) * MINUTE);
      const hourCount = countOf(await tx.get(hourly));
      if (hourCount >= cap.perHour) reject("hour", (hour + 1) * HOUR);
      // A shared low-volume circuit breaker bounds admissions, not total costs.
      // Check before subscriber lookup so exhaustion cannot reveal membership.
      const dayCount = countOf(await tx.get(daily));
      if (dayCount >= cap.admissionsPerDay) reject("day", (day + 1) * DAY);
      const existing = await tx.get(subscriber);
      // All reads precede writes. Retries must never perform external side effects.
      tx.set(burst, { count: minuteCount + 1, expiresAt: Timestamp.fromMillis((minute + 2) * MINUTE) });
      tx.set(hourly, { count: hourCount + 1, expiresAt: Timestamp.fromMillis((hour + 2) * HOUR) });
      tx.set(daily, { count: dayCount + 1, expiresAt: Timestamp.fromMillis((day + 2) * DAY) });
      // A public request cannot change preferences or reactivate a removed subscriber.
      if (!existing.exists) {
        tx.create(subscriber, {
          ...signup, status: "requested", emailVerified: false,
          createdAt: Timestamp.fromMillis(time), consentAt: Timestamp.fromMillis(time), source: "ams-website",
        });
      }
    }, { maxAttempts: 3 });
  };
}
