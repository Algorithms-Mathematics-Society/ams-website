import test from "node:test";
import assert from "node:assert/strict";
import { normalizeEmail, validateSignup, createSignupHandler, CONSENT_VERSION } from "./signup.js";

const valid = { name: "Asha", email: "asha@example.com", topic: "derive", consent: true, consentVersion: CONSENT_VERSION };
async function invoke(options = {}) {
  const result = { code: 200, headers: {} };
  const res = { set(k, v) { result.headers[k] = v; return this; }, status(code) { result.code = code; return this; }, json(body) { result.body = body; return this; } };
  await createSignupHandler({ save: async () => {}, allowedOrigins: ["https://amshq.in"], ...options })({ get: () => "https://amshq.in", is: () => true, method: "POST", body: options.body ?? valid, rawBody: { length: 200 }, ip: "127.0.0.1" }, res);
  return result;
}

test("accepts ordinary ASCII addresses without alias conflation", () => {
  assert.equal(normalizeEmail("  Asha+Derive@EXAMPLE.COM  "), "asha+derive@example.com");
  assert.equal(normalizeEmail("a.b@example.com"), "a.b@example.com");
  assert.equal(normalizeEmail("x@xn--bcher-kva.example"), "x@xn--bcher-kva.example");
});
test("rejects malformed local parts, domains, controls and oversized input", () => {
  for (const email of [".a@example.com", "a.@example.com", "a..b@example.com", "a@-example.com", "a@example-.com", "a@example..com", "a@exa_mple.com", "a@127.0.0.1", "a@example.com\n", "ä@example.com", "a@例.com", `${"a".repeat(65)}@example.com`, `a@${"a".repeat(64)}.com`, "a@localhost", "a@@example.com", " ".repeat(600) + "a@example.com"]) {
    assert.equal(normalizeEmail(email), null, email);
  }
  assert.equal(validateSignup(Object.assign(Object.create({ topic: "derive" }), valid)), null);
  assert.equal(validateSignup({ ...valid, name: " ".repeat(500) + "A" }), null);
});
test("attestation must finish before storage and failures never write", async () => {
  const calls = [];
  const good = await invoke({ verifyAttestation: async () => { calls.push("verify"); }, save: async () => { calls.push("save"); } });
  assert.deepEqual(calls, ["verify", "save"]);
  assert.equal(good.code, 200);
  for (const verifyAttestation of [async () => false, async () => { throw new Error("private SDK details"); }, async () => { throw null; }]) {
    const result = await invoke({ verifyAttestation, save: async () => assert.fail("must not write") });
    assert.equal(result.code, 403);
    assert.deepEqual(result.body, { error: "verification_failed" });
  }
});
test("invalid requests avoid attestation and storage work", async () => {
  const result = await invoke({ body: { ...valid, consent: false }, verifyAttestation: async () => assert.fail("must not verify"), save: async () => assert.fail("must not write") });
  assert.equal(result.code, 400);
});
test("rate-limit headers are bounded and persistence failures disclose no details", async () => {
  for (const [retryAfter, expected] of [[30, "30"], [0, "1"], [1.5, "2"], [999999, "86400"], [NaN, "3600"], ["bad\r\nheader", "3600"]]) {
    const result = await invoke({ save: async () => { throw { code: "RATE_LIMIT", retryAfter }; } });
    assert.equal(result.code, 429);
    assert.equal(result.headers["Retry-After"], expected);
  }
  for (const error of [null, undefined, "private SDK details"]) {
    const result = await invoke({ save: async () => { throw error; } });
    assert.equal(result.code, 503);
    assert.deepEqual(result.body, { error: "unavailable" });
  }
});
