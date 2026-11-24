import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { parseCsv, toSolverLists, loadSolverFeed } from "./fetch-monthly-solvers.mjs";

const header = "number,tier,display_name,institution,grad_year";
test("CSV preserves quoted commas, escaped quotes, CRLF and multiline fields", () => {
  const csv = header + '\r\n1,main,"Ada, ""A""","Institute\nOne",2027\r\n';
  assert.deepEqual(toSolverLists(parseCsv(csv))["1"].main, [
    { name: 'Ada, "A"', institution: "Institute\nOne", year: "2027" },
  ]);
});
test("malformed quoting fails closed instead of silently altering solver rows", () => {
  for (const bad of ['a,"unterminated', 'a,un"quoted', 'a,"closed"junk']) {
    assert.throws(() => parseCsv(bad), /Solver feed:/);
  }
});
test("feed rejects extra private columns and invalid identifiers", () => {
  assert.throws(() => toSolverLists(parseCsv(header + ",email")), /header/);
  for (const number of ["1e2", "0", "1.0", "9007199254740992"]) {
    assert.throws(() => toSolverLists(parseCsv(header + `\n${number},main,Ada,Institute,2027`)), /number/);
  }
});
test("empty approved feed is valid and names are sorted within each tier", () => {
  assert.deepEqual(toSolverLists(parseCsv(header)), {});
  const lists = toSolverLists(parseCsv(header + "\n1,main,Zoe,I,2027\n1,main,Ada,I,2027"));
  assert.deepEqual(lists[1].main.map(s => s.name), ["Ada", "Zoe"]);
});

test("a failed fetch removes an older solver snapshot instead of leaving it reusable", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "ams-feed-"));
  try {
    fs.mkdirSync(path.join(root, "scripts"));
    fs.mkdirSync(path.join(root, ".generated"));
    const script = path.join(root, "scripts/fetch-monthly-solvers.mjs");
    fs.copyFileSync(new URL("./fetch-monthly-solvers.mjs", import.meta.url), script);
    const snapshot = path.join(root, ".generated/monthly-solvers.json");
    fs.writeFileSync(snapshot, JSON.stringify({ stale: true }));
    const result = spawnSync(process.execPath, [script], {
      encoding: "utf8", env: { ...process.env, MONTHLY_SOLVERS_FEED_URL: "http://invalid.example/feed" },
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /published-CSV link/);
    assert.equal(fs.existsSync(snapshot), false);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});

test("feed retries transient HTTP failures and returns the fresh validated response", async () => {
  let attempts = 0;
  const rows = await loadSolverFeed("https://docs.google.com/spreadsheets/d/e/test/pub?output=csv", async (_url, options) => {
    assert.ok(options.signal instanceof AbortSignal);
    attempts += 1;
    return attempts < 3 ? new Response("unavailable", { status: 503 }) : new Response(header + "\n1,main,Ada,I,2027");
  });
  assert.equal(attempts, 3); assert.equal(rows[1].main[0].name, "Ada");
});
for (const failure of ["timeout", "invalid CSV", "HTTP error"]) {
  test(`feed fails closed after three ${failure} attempts`, async () => {
    let attempts = 0;
    await assert.rejects(loadSolverFeed("https://docs.google.com/spreadsheets/d/e/test/pub?output=csv", async () => {
      attempts += 1;
      if (failure === "timeout") throw new DOMException("Timed out", "TimeoutError");
      return failure === "HTTP error" ? new Response("error", { status: 500 }) : new Response("<html>Not a CSV</html>");
    }), /after 3 attempts/);
    assert.equal(attempts, 3);
  });
}
test("feed rejects other hosts before making any request", async () => {
  let called = false;
  await assert.rejects(loadSolverFeed("https://example.com/feed.csv", async () => { called = true; }), /published-CSV/);
  assert.equal(called, false);
});
test("CSV round-trips adversarial public text without shifting columns", () => {
  const quote = value => '"' + value.replaceAll('"', '""') + '"';
  for (const name of ['Comma, Person', 'Quoted "Name"', 'Line\nBreak', 'Unicode अda', '<script>alert(1)</script>', 'a\rb']) {
    const csv = header + "\r\n1,main," + quote(name) + ",Institute,2027\r\n";
    assert.equal(toSolverLists(parseCsv(csv))[1].main[0].name, name);
  }
});

for (const row of ['1,other,Ada,I,2027', '1,main,,I,2027', '1,main,Ada,I,year', '1,main,Ada,I', '1,main,Ada,I,2027,private']) {
  test(`invalid public feed row fails: ${row}`, () => {
    assert.throws(() => toSolverLists(parseCsv(header + '\n' + row)), /Solver feed line 2:/);
  });
}
