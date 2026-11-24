// Runs before `next build`. Fetches the AMS Monthly solver feed (the published
// "Solvers" tab of the AMS Public Feed sheet), validates it, and writes
// .generated/monthly-solvers.json for the static pages to read.
//
// Why a pre-build step: fetching inside page rendering would either make routes
// dynamic or cache a stale list across builds. Here, a configured feed that
// fails to load or parse stops the build, so the last good deployment stays live.
// With no MONTHLY_SOLVERS_FEED_URL set, it writes `null` (local and preview builds).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const OUT = resolve(import.meta.dirname, "../.generated/monthly-solvers.json");
const HEADER = ["number", "tier", "display_name", "institution", "grad_year"];

/** Minimal RFC 4180 parser: quoted fields, escaped quotes, CRLF. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += char;
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((cells) => cells.some((cell) => cell.trim() !== ""));
}

/** Returns { "<number>": { warmup: Solver[], main: Solver[] } }, sorted by name. */
export function toSolverLists(rows) {
  const [header, ...body] = rows;
  if (
    !header ||
    header.map((cell) => cell.trim().toLowerCase()).join(",") !==
      HEADER.join(",")
  ) {
    throw new Error(
      `Solver feed: header must be exactly "${HEADER.join(",")}".`,
    );
  }
  const lists = {};
  body.forEach((cells, index) => {
    const line = index + 2;
    if (cells.length !== HEADER.length)
      throw new Error(
        `Solver feed line ${line}: expected ${HEADER.length} columns.`,
      );
    const [numberCell, tier, name, institution, year] = cells.map((cell) =>
      cell.trim(),
    );
    const number = Number(numberCell);
    if (!Number.isInteger(number) || number < 1)
      throw new Error(`Solver feed line ${line}: bad problem number.`);
    if (tier !== "warmup" && tier !== "main")
      throw new Error(`Solver feed line ${line}: tier must be warmup or main.`);
    if (!name || !institution || !/^\d{4}$/.test(year)) {
      throw new Error(
        `Solver feed line ${line}: name, institution and a 4-digit year are required.`,
      );
    }
    lists[number] ??= { warmup: [], main: [] };
    lists[number][tier].push({ name, institution, year });
  });
  for (const entry of Object.values(lists)) {
    entry.warmup.sort((a, b) => a.name.localeCompare(b.name, "en-IN"));
    entry.main.sort((a, b) => a.name.localeCompare(b.name, "en-IN"));
  }
  return lists;
}

async function load(url) {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || parsed.hostname !== "docs.google.com") {
    throw new Error(
      "MONTHLY_SOLVERS_FEED_URL must be an https://docs.google.com published-CSV link.",
    );
  }
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(20_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return toSolverLists(parseCsv(await response.text()));
    } catch (error) {
      lastError = error;
    }
  }
  throw new Error(
    `Solver feed could not be loaded after 3 attempts: ${String(lastError)}`,
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === resolve(import.meta.filename)
) {
  const url = process.env.MONTHLY_SOLVERS_FEED_URL;
  const lists = url ? await load(url) : null;
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(lists));
  const count = lists
    ? Object.values(lists).reduce(
        (n, e) => n + e.warmup.length + e.main.length,
        0,
      )
    : 0;
  console.log(
    url
      ? `Monthly solver feed: ${count} rows.`
      : "Monthly solver feed: not configured, writing null.",
  );
}
