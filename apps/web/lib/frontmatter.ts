// Small frontmatter field checks shared by the blog and AMS Monthly loaders.
// Each failure names the file and the field so `next build` fails with a
// message an editor can act on. Deliberately dependency-free.

import { parseIsoInstant } from "./monthly-release";

type Data = Record<string, unknown>;

export function fail(file: string, field: string, problem: string): never {
  throw new Error(`${file}: frontmatter "${field}" ${problem}.`);
}

export function reqString(data: Data, field: string, file: string): string {
  const value = data[field];
  if (typeof value !== "string" || value.trim() === "")
    fail(file, field, "must be a non-empty string");
  return value;
}

export function optString(
  data: Data,
  field: string,
  file: string,
): string | undefined {
  const value = data[field];
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "string" || value.trim() === "")
    fail(file, field, "must be a non-empty string when set");
  return value;
}

export function reqInt(data: Data, field: string, file: string): number {
  const value = data[field];
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 1)
    fail(file, field, "must be a positive whole number");
  return value;
}

export function optBoolean(data: Data, field: string, file: string): boolean {
  const value = data[field];
  if (value === undefined) return false;
  if (typeof value !== "boolean") fail(file, field, "must be true or false");
  return value;
}

/** ISO date with an explicit offset, so a schedule can never drift with the build machine's zone. */
export function reqIsoDate(data: Data, field: string, file: string): Date {
  // YAML timestamp coercion can normalize an impossible date before validation.
  // Require quoted strings so the exact authored calendar date is checked.
  const date = parseIsoInstant(data[field]);
  if (!date) {
    fail(file, field, 'must be a valid quoted ISO date with an explicit offset, for example "2027-01-01T18:00:00+05:30"');
  }
  return date;
}

export function oneOf<T extends string>(
  value: unknown,
  allowed: readonly T[],
  field: string,
  file: string,
): T {
  if (typeof value !== "string" || !allowed.includes(value as T)) {
    fail(file, field, `must be one of: ${allowed.join(", ")}`);
  }
  return value as T;
}

export function optHttpsUrl(
  data: Data,
  field: string,
  file: string,
): string | undefined {
  const value = optString(data, field, file);
  if (value === undefined) return undefined;
  let url: URL;
  try { url = new URL(value); }
  catch { fail(file, field, "must be a valid https URL"); }
  if (url.protocol !== "https:" || !url.hostname || url.username || url.password)
    fail(file, field, "must be an https URL without credentials");
  return value;
}

export function reqRecord(data: Data, field: string, file: string): Data {
  const value = data[field];
  if (!value || typeof value !== "object" || Array.isArray(value))
    fail(file, field, "must be a mapping");
  return value as Data;
}
