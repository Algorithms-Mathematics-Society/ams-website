// Pure date-gate helpers for AMS Monthly. No imports, so `node --test` can load
// this file directly. Every surface that decides whether Monthly content is
// public (pages, sitemap, static params, structured data) goes through these.

const IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1000;
const DROP_HOUR_IST = 18;

/** Build-time "now". AMS_BUILD_NOW (ISO) pins it for tests and preflight builds. */
export function getBuildNow(
  env: Record<string, string | undefined> = process.env,
): Date {
  const pinned = env.AMS_BUILD_NOW;
  if (!pinned) return new Date();
  const date = new Date(pinned);
  if (!Number.isFinite(date.getTime())) {
    throw new Error(`AMS_BUILD_NOW is not a valid ISO date: "${pinned}"`);
  }
  return date;
}

/** True once `at` has passed. Equal instants count as released. */
export function isDue(at: Date, now: Date): boolean {
  return at.getTime() <= now.getTime();
}

/** A problem is open from its release until its deadline. */
export function isOpen(releaseAt: Date, deadline: Date, now: Date): boolean {
  return isDue(releaseAt, now) && now.getTime() < deadline.getTime();
}

/**
 * The next drop strictly after `now`: the 1st of a month at 18:00 IST, never
 * earlier than `launchAt`. The public site only ever states this date, never a
 * topic, so it is safe to compute from the clock alone.
 */
export function nextDropAt(now: Date, launchAt: Date): Date {
  if (now.getTime() < launchAt.getTime()) return launchAt;
  const ist = new Date(now.getTime() + IST_OFFSET_MS);
  let year = ist.getUTCFullYear();
  let month = ist.getUTCMonth();
  let candidate = dropInstant(year, month);
  if (candidate.getTime() <= now.getTime()) {
    month += 1;
    if (month === 12) {
      month = 0;
      year += 1;
    }
    candidate = dropInstant(year, month);
  }
  return candidate;
}

function dropInstant(year: number, month: number): Date {
  return new Date(Date.UTC(year, month, 1, DROP_HOUR_IST) - IST_OFFSET_MS);
}

/** "1 January 2027" in IST, for copy that names a date. */
export function formatIstDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}
