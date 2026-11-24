// AMS Monthly secrecy check. Runs two real builds against synthetic fixtures
// (tests/fixtures/monthly) with the clock pinned to 2026-02-15 12:00 IST:
//
// 1. Guard build, without AMS_MONTHLY_ALLOW_UNRELEASED: must FAIL, because an
//    unreleased file in the repo means someone committed early.
// 2. Preflight build, with the flag: must pass, and then every deployable output
//    (.next/server, .next/static, public/) is searched. Unreleased canaries must
//    appear nowhere; released canaries must appear, so the check can never pass
//    by finding nothing.
//
// Run with Node 24+: pnpm --filter web check:monthly-leak

import { spawnSync } from "node:child_process";
import {
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
} from "node:fs";
import { join, resolve } from "node:path";

process.chdir(resolve(import.meta.dirname, ".."));

const NOW = "2026-02-15T12:00:00+05:30";
const RELEASED = [
  "RELEASEDCANARYALPHA",
  "RELEASEDCANARYBETA",
  "RELEASEDCANARYSOLUTIONONE",
];
const UNRELEASED = [
  "UNRELEASEDCANARYTITLETHREE",
  "UNRELEASEDCANARYDESCTHREE",
  "UNRELEASEDCANARYBODYTHREE",
  "UNRELEASEDCANARYFORMTHREE",
  "unreleased-canary-three",
  "UNRELEASEDCANARYSOLUTIONTWO",
  "UNRELEASEDCANARYANSWERTWO",
];
const SEARCH = [".next/server", ".next/static", "public"];

function build(extraEnv) {
  rmSync("public/monthly-assets", { recursive: true, force: true });
  return spawnSync("node", ["node_modules/next/dist/bin/next", "build"], {
    encoding: "utf8",
    env: {
      ...process.env,
      AMS_MONTHLY_DIR: "tests/fixtures/monthly",
      AMS_BUILD_NOW: NOW,
      MONTHLY_SOLVERS_FEED_URL: "",
      NEXT_TELEMETRY_DISABLED: "1",
      ...extraEnv,
    },
  });
}

function* files(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* files(path);
    else yield path;
  }
}

function fail(message) {
  console.error(`check-monthly-leak: FAIL: ${message}`);
  process.exit(1);
}

const guard = build({ AMS_MONTHLY_ALLOW_UNRELEASED: "" });
if (guard.status === 0)
  fail(
    "the guard build succeeded with an unreleased file present; it must fail.",
  );
if (!/is not due until/.test(guard.stdout + guard.stderr)) {
  fail(
    `the guard build failed for another reason:\n${(guard.stdout + guard.stderr).slice(-3000)}`,
  );
}
console.log(
  "check-monthly-leak: guard build refused the unreleased file, as required.",
);

const preflight = build({ AMS_MONTHLY_ALLOW_UNRELEASED: "1" });
if (preflight.status !== 0)
  fail(
    `the preflight build failed:\n${(preflight.stdout + preflight.stderr).slice(-3000)}`,
  );

const found = new Map(
  [...RELEASED, ...UNRELEASED].map((canary) => [canary, []]),
);
for (const dir of SEARCH) {
  for (const file of files(dir)) {
    const text = readFileSync(file, "latin1");
    for (const canary of found.keys())
      if (text.includes(canary)) found.get(canary).push(file);
  }
}

const leaks = UNRELEASED.filter((canary) => found.get(canary).length > 0);
if (leaks.length > 0) {
  fail(
    `unreleased content reached the build output:\n${leaks.map((c) => `  ${c}: ${found.get(c).slice(0, 3).join(", ")}`).join("\n")}`,
  );
}
const missing = RELEASED.filter((canary) => found.get(canary).length === 0);
if (missing.length > 0)
  fail(
    `released content is missing from the build output: ${missing.join(", ")}`,
  );
if (existsSync("public/monthly-assets/3"))
  fail("an unreleased problem's image was written to public/.");

rmSync("public/monthly-assets", { recursive: true, force: true });
console.log(
  `check-monthly-leak: PASS. ${UNRELEASED.length} unreleased canaries absent; ${RELEASED.length} released canaries present.`,
);
console.log(
  "check-monthly-leak: rebuild normally (pnpm build) before deploying; this run left fixture pages in .next/.",
);
