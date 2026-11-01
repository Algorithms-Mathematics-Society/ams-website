import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createSignupStore } from "./store.js";

const signup = { name: "Test", email: "test@example.test", topics: ["derive"], consentVersion: "test", consentText: "test" };
const subscriberId = `updateSubscribers/${createHash("sha256").update(signup.email).digest("hex")}`;
function fixture(limits = {}) {
  const docs = new Map();
  const calls = [];
  let time = 1000;
  let pending = Promise.resolve();
  const db = {
    collection: name => ({ doc: id => `${name}/${id}` }),
    runTransaction(fn, options) {
      // Serialized mock checks observable invariants; emulator verifies real contention.
      const run = pending.then(async () => {
        const call = { reads: [], writes: [], options };
        calls.push(call);
        await fn({
          get: async ref => { assert.equal(call.writes.length, 0); call.reads.push(ref); return { exists: docs.has(ref), data: () => docs.get(ref) }; },
          set: (ref, data) => call.writes.push([ref, data]),
          create: (ref, data) => { assert.ok(!docs.has(ref)); call.writes.push([ref, data]); },
        });
        for (const [ref, data] of call.writes) docs.set(ref, data);
      });
      pending = run.catch(() => {});
      return run;
    },
  };
  const save = createSignupStore({ db, Timestamp: { fromMillis: value => value }, rateLimitKey: () => "test-only-secret", now: () => time, limits });
  return { docs, calls, save, advance: value => { time = value; } };
}

test("bounded document operations and transaction retries; duplicate preserves original values", async () => {
  const { save, calls, docs } = fixture();
  await save(signup, "ip");
  const original = structuredClone(docs.get(subscriberId));
  await save({ ...signup, name: "Replacement", topics: ["both"] }, "ip");
  assert.deepEqual(docs.get(subscriberId), original);
  assert.deepEqual(calls.map(c => [c.reads.length, c.writes.length]), [[4, 4], [4, 3]]);
  assert.ok(calls.every(c => c.options.maxAttempts === 3));
});

test("burst rejection reads only one quota and commits no writes; delayed TTL is harmless", async () => {
  const f = fixture({ perMinute: 2 });
  await f.save(signup, "private-ip"); await f.save(signup, "private-ip");
  await assert.rejects(f.save(signup, "private-ip"), { code: "RATE_LIMIT", scope: "minute", retryAfter: 59 });
  assert.equal(f.calls.at(-1).reads.length, 1); assert.equal(f.calls.at(-1).writes.length, 0);
  f.advance(60_000); await f.save(signup, "private-ip");
  assert.ok(!JSON.stringify([...f.docs]).includes("private-ip"));
});

test("hour rejection skips subscriber and writes; next hour works with old buckets retained", async () => {
  const f = fixture({ perMinute: 10, perHour: 2 });
  await f.save(signup, "ip"); await f.save(signup, "ip");
  await assert.rejects(f.save(signup, "ip"), { code: "RATE_LIMIT", scope: "hour", retryAfter: 3599 });
  assert.equal(f.calls.at(-1).reads.length, 2); assert.equal(f.calls.at(-1).writes.length, 0);
  f.advance(3_600_000); await f.save(signup, "ip");
});

test("daily circuit breaker counts all admissions and resets by UTC bucket", async () => {
  const f = fixture({ admissionsPerDay: 2 });
  await f.save(signup, "ip-a");
  await f.save(signup, "ip-b");
  await assert.rejects(f.save({ ...signup, email: "other@example.test" }, "ip-c"), { code: "RATE_LIMIT", scope: "day", retryAfter: 86399 });
  assert.equal(f.calls.at(-1).reads.length, 3); assert.equal(f.calls.at(-1).writes.length, 0);
  await assert.rejects(f.save(signup, "ip-d"), { code: "RATE_LIMIT", scope: "day" });
  assert.equal(f.calls.at(-1).reads.length, 3);
  assert.equal([...f.docs].find(([id]) => id.includes("intakeAdmissions"))[1].count, 2);
  f.advance(86_400_000); await f.save({ ...signup, email: "other@example.test" }, "ip-c");
});

test("suppressed subscriber cannot be restored or have fields added", async () => {
  const f = fixture();
  f.docs.set(subscriberId, { status: "suppressed" });
  await f.save(signup, "ip");
  assert.deepEqual(f.docs.get(subscriberId), { status: "suppressed" });
  assert.equal([...f.docs].find(([id]) => id.includes("intakeAdmissions"))[1].count, 1);
});

test("fresh simultaneous duplicate requests share one document but count all admissions", async () => {
  const f = fixture();
  await Promise.all(Array.from({ length: 12 }, (_, i) => f.save(signup, `ip-${i}`)));
  assert.equal([...f.docs.keys()].filter(id => id.startsWith("updateSubscribers/")).length, 1);
  assert.equal([...f.docs].find(([id]) => id.includes("intakeAdmissions"))[1].count, 12);
});

test("invalid quota configuration fails before serving requests", () => {
  for (const value of [0, -1, 1.5, NaN, Infinity]) assert.throws(() => fixture({ perMinute: value }));
});
