// Small frontmatter field checks shared by the blog and AMS Monthly loaders.
// Each failure names the file and the field so `next build` fails with a
// message an editor can act on. Deliberately dependency-free.

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
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1)
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
  const value = data[field];
  const text = value instanceof Date ? value.toISOString() : value;
  if (typeof text !== "string" || !/([+-]\d{2}:\d{2}|Z)$/.test(text)) {
    fail(
      file,
      field,
      'must be an ISO date with an offset, for example "2027-01-01T18:00:00+05:30"',
    );
  }
  const date = new Date(text);
  if (!Number.isFinite(date.getTime()))
    fail(file, field, "is not a valid date");
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
  if (!/^https:\/\//.test(value)) fail(file, field, "must be an https URL");
  return value;
}

export function reqRecord(data: Data, field: string, file: string): Data {
  const value = data[field];
  if (!value || typeof value !== "object" || Array.isArray(value))
    fail(file, field, "must be a mapping");
  return value as Data;
}
