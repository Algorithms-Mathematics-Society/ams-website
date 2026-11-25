// Run with Node 24+: pnpm --filter web test:monthly (loads the .ts module via type stripping)
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  formatIstDate,
  getBuildNow,
  isDue,
  isGoogleFormUrl,
  isIntakeOpen,
  isOpen,
  nextDropAt,
} from "./monthly-release.ts";

const launch = new Date("2027-01-01T18:00:00+05:30");

test("a problem is not due one second before its drop and is due at it", () => {
  const at = new Date("2027-02-01T18:00:00+05:30");
  assert.equal(isDue(at, new Date("2027-02-01T17:59:59+05:30")), false);
  assert.equal(isDue(at, new Date("2027-02-01T18:00:00+05:30")), true);
});

test("open runs from release until the deadline, exclusive", () => {
  const release = new Date("2027-01-01T18:00:00+05:30");
  const deadline = new Date("2027-01-31T23:59:00+05:30");
  assert.equal(
    isOpen(release, deadline, new Date("2027-01-15T12:00:00+05:30")),
    true,
  );
  assert.equal(
    isOpen(release, deadline, new Date("2027-01-31T23:59:00+05:30")),
    false,
  );
  assert.equal(
    isOpen(release, deadline, new Date("2027-01-01T17:00:00+05:30")),
    false,
  );
});

test("before launch, the next drop is the launch", () => {
  assert.equal(
    nextDropAt(new Date("2026-11-24T10:00:00+05:30"), launch).toISOString(),
    launch.toISOString(),
  );
});

test("the drop instant itself rolls to the following month", () => {
  const next = nextDropAt(launch, launch);
  assert.equal(
    next.toISOString(),
    new Date("2027-02-01T18:00:00+05:30").toISOString(),
  );
});

test("the IST month boundary decides the month, not UTC", () => {
  // 31 March 20:00 UTC is already 1 April 01:30 IST, before that day's 18:00 drop.
  const next = nextDropAt(new Date("2027-03-31T20:00:00Z"), launch);
  assert.equal(
    next.toISOString(),
    new Date("2027-04-01T18:00:00+05:30").toISOString(),
  );
});

test("December rolls into January of the next year", () => {
  const next = nextDropAt(new Date("2027-12-15T09:00:00+05:30"), launch);
  assert.equal(
    next.toISOString(),
    new Date("2028-01-01T18:00:00+05:30").toISOString(),
  );
});

test("AMS_BUILD_NOW pins the clock and rejects garbage", () => {
  assert.equal(
    getBuildNow({ AMS_BUILD_NOW: "2027-05-01T00:00:00+05:30" }).toISOString(),
    new Date("2027-05-01T00:00:00+05:30").toISOString(),
  );
  assert.throws(() => getBuildNow({ AMS_BUILD_NOW: "not a date" }));
});

test("dates are formatted in IST", () => {
  // 31 Dec 23:00 UTC is 1 January in India.
  assert.equal(
    formatIstDate(new Date("2026-12-31T23:00:00Z")),
    "1 January 2027",
  );
});

test('build clock rejects local-time ambiguity and calendar rollover', () => {
  for (const value of ['2027-02-30T00:00:00Z', '2027-01-01T18:00:00', '2027-01-01']) {
    assert.throws(() => getBuildNow({ AMS_BUILD_NOW: value }), /AMS_BUILD_NOW/);
  }
});
test('release schedule preserves IST cadence across a complete leap-year cycle', () => {
  for (let month = 0; month < 24; month += 1) {
    const now = new Date(Date.UTC(2027, month, 15));
    const next = nextDropAt(now, launch);
    assert.equal(next.toISOString(), new Date(Date.UTC(2027, month + 1, 1, 12, 30)).toISOString());
    assert.ok(next > now);
  }
});

const goodForm = "https://docs.google.com/forms/d/e/1FAIpQLSabc_-123/viewform";
const opensAt = "2027-01-01T18:00:00+05:30";

test("intake is closed without a valid Form link, whatever the time", () => {
  const after = new Date("2027-02-01T00:00:00+05:30");
  assert.equal(isIntakeOpen(null, opensAt, after), false);
  assert.equal(isIntakeOpen("http://docs.google.com/forms/d/abc/viewform", opensAt, after), false);
  assert.equal(isIntakeOpen("https://evil.example/forms/d/abc/viewform", opensAt, after), false);
  assert.equal(isIntakeOpen("not a url", opensAt, after), false);
});

test("intake with a valid link opens exactly at opensAt", () => {
  assert.equal(isIntakeOpen(goodForm, opensAt, new Date("2027-01-01T17:59:59+05:30")), false);
  assert.equal(isIntakeOpen(goodForm, opensAt, new Date("2027-01-01T18:00:00+05:30")), true);
  assert.equal(isIntakeOpen(goodForm, opensAt, new Date("2027-03-01T00:00:00+05:30")), true);
});

test("intake is closed when opensAt is not a valid instant", () => {
  assert.equal(isIntakeOpen(goodForm, "2027-13-01T18:00:00+05:30", new Date("2028-01-01T00:00:00Z")), false);
});

test("Form link rule rejects credentials, ports and edit links", () => {
  assert.equal(isGoogleFormUrl(goodForm), true);
  assert.equal(isGoogleFormUrl("https://u:p@docs.google.com/forms/d/abc/viewform"), false);
  assert.equal(isGoogleFormUrl("https://docs.google.com:444/forms/d/abc/viewform"), false);
  assert.equal(isGoogleFormUrl("https://docs.google.com/forms/d/abc/edit"), false);
});

for (const [label, form] of [
  ["trailing slash", `${goodForm}/`],
  ["non-e form ID", "https://docs.google.com/forms/d/abc_-123/viewform"],
]) {
  test(`intake opens with a valid ${label} respondent link`, () => {
    assert.equal(isIntakeOpen(form, opensAt, new Date("2027-01-01T17:59:59+05:30")), false);
    assert.equal(isIntakeOpen(form, opensAt, new Date(opensAt)), true);
    assert.equal(isIntakeOpen(form, opensAt, new Date("2027-02-01T00:00:00Z")), true);
  });
}
