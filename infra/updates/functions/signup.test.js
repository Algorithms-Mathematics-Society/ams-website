import test from "node:test";
import assert from "node:assert/strict";
import { validateSignup, createSignupHandler, CONSENT_VERSION } from "./signup.js";
import { createSignupStore } from "./store.js";
const valid = { name: " Asha ", email: " ASHA@example.com ", topic: "both", consent: true, consentVersion: CONSENT_VERSION, website: "" };

test("normalizes input and stores only consented fields", () => {
  const result = validateSignup({ ...valid, unexpected: "discard" });
  assert.equal(result.name, "Asha"); assert.equal(result.email, "asha@example.com");
  assert.deepEqual(result.topics, ["ascent", "derive"]); assert.equal(result.unexpected, undefined);
});
test("rejects invalid input, bots, missing consent and unknown versions", () => {
  for (const change of [{ name: " " }, { name: "x".repeat(101) }, { email: "nope" }, { topic: "all" }, { consent: false }, { consent: "true" }, { consentVersion: "old" }, { website: "bot" }, { name: "A\nB" }, { email: "a@b.\u0000com" }]) assert.equal(validateSignup({ ...valid, ...change }), null);
  for (const body of [null, [], "text"]) assert.equal(validateSignup(body), null);
});
async function invoke({ save = async () => {}, origin = "https://www.amshq.in", method = "POST", body = valid, size = 100, json = true } = {}) {
  const result = { code: 200, headers: {} };
  const res = { set(k, v) { result.headers[k] = v; return this; }, status(code) { result.code = code; return this; }, json(body) { result.body = body; return this; } };
  await createSignupHandler({ save, allowedOrigins: ["https://www.amshq.in"] })({ get: () => origin, is: () => json, method, body, rawBody: { length: size }, ip: "127.0.0.1" }, res);
  return result;
}
test("only acknowledges persistence success", async () => {
  assert.equal((await invoke()).body.status, "saved");
  const failed = await invoke({ save: async () => { throw new Error("offline"); } });
  assert.equal(failed.code, 503); assert.equal(failed.body.status, undefined);
  assert.equal((await invoke({ save: async () => { throw { code: "RATE_LIMIT" }; } })).code, 429);
});
test("rejects requests before writes", async () => {
  let writes = 0;
  for (const options of [{ origin: "https://evil.test" }, { method: "GET" }, { size: 5000 }, { json: false }, { body: {} }]) {
    assert.ok((await invoke({ ...options, save: async () => { writes++; } })).code >= 400);
  }
  assert.equal(writes, 0);
});
test("deduplicates and preserves preferences; limits requests without raw IP storage", async () => {
  const docs = new Map();
  const db = { collection: name => ({ doc: id => `${name}/${id}` }), runTransaction: async fn => {
    const writes = [];
    await fn({ get: async ref => ({ exists: docs.has(ref), data: () => docs.get(ref) }), set: (ref, value) => writes.push([ref, value]), create: (ref, value) => { assert.ok(!docs.has(ref)); writes.push([ref, value]); } });
    for (const [ref, value] of writes) docs.set(ref, value);
  } };
  let now = 1000;
  const save = createSignupStore({ db, Timestamp: { fromMillis: x => x }, rateLimitKey: () => "test-secret", now: () => now, limits: { perMinute: 100 } });
  const signup = validateSignup(valid);
  await save(signup, "test-ip");
  await save({ ...signup, topics: ["derive"] }, "test-ip");
  const subscribers = [...docs.entries()].filter(([key]) => key.startsWith("updateSubscribers/"));
  assert.equal(subscribers.length, 1); assert.deepEqual(subscribers[0][1].topics, ["ascent", "derive"]);
  for (let n = 2; n < 20; n++) await save(signup, "test-ip");
  await assert.rejects(save(signup, "test-ip"), { code: "RATE_LIMIT" });
  assert.ok(!JSON.stringify([...docs]).includes("test-ip"));
  now = 3601000;
  await save(signup, "test-ip");
});
