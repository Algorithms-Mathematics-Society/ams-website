// Pure date-gate helpers for AMS Monthly. No imports, so `node --test` can load
// this file directly. Every surface that decides whether Monthly content is
// public (pages, sitemap, static params, structured data) goes through these.

const IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1000;
const DROP_HOUR_IST = 18;

/** Parse an explicit ISO instant without JavaScript's calendar rollover coercion. */
export function parseIsoInstant(value: unknown): Date | null {
  if (typeof value !== "string") return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/.exec(value);
  if (!match) return null;
  const [, yearText, monthText, dayText, hourText, minuteText, secondText, offset] = match;
  const [year, month, day, hour, minute, second] =
    [yearText, monthText, dayText, hourText, minuteText, secondText].map(Number);
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month < 1 || month > 12 || day < 1 || day > days[month - 1] ||
      hour > 23 || minute > 59 || second > 59) return null;
  if (offset !== "Z" && (Number(offset.slice(1, 3)) > 23 || Number(offset.slice(4)) > 59)) return null;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date : null;
}

/** Build-time "now". AMS_BUILD_NOW (ISO) pins it for tests and preflight builds. */
export function getBuildNow(
  env: Record<string, string | undefined> = process.env,
): Date {
  const pinned = env.AMS_BUILD_NOW;
  if (!pinned) return new Date();
  const date = parseIsoInstant(pinned);
  if (!date) {
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

/** Constraint 11: an https docs.google.com respondent (viewform) link only. */
export function isGoogleFormUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  return (
    url.protocol === "https:" &&
    url.hostname === "docs.google.com" &&
    url.username === "" && url.password === "" && url.port === "" &&
    /^\/forms\/d\/(?:e\/)?[A-Za-z0-9_-]+\/viewform\/?$/.test(url.pathname)
  );
}

/** Intake is open only with a valid Form link and a build at or after `opensAt`. */
export function isIntakeOpen(
  formUrl: string | null,
  opensAt: string,
  now: Date,
): boolean {
  if (!isGoogleFormUrl(formUrl)) return false;
  const at = parseIsoInstant(opensAt);
  return at !== null && isDue(at, now);
}
