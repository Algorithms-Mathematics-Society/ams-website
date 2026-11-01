import test from "node:test";
import assert from "node:assert/strict";
import { initializeApp, deleteApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { createHash, randomUUID } from "node:crypto";
import { createSignupStore } from "./store.js";

if (!process.env.FIRESTORE_EMULATOR_HOST) throw new Error("Run only via the Firebase emulator");
const app = initializeApp({ projectId: `demo-ams-store-${randomUUID().slice(0, 8)}` }, "store-test");
const db = getFirestore(app);

test("Firestore concurrent fresh creates deduplicate and preserve suppression", async () => {
  const email = `${randomUUID()}@example.test`;
  const signup = { name: "Emulator only", email, topics: ["derive"], consentVersion: "test" };
  const save = createSignupStore({ db, Timestamp, rateLimitKey: () => "emulator-only", limits: { admissionsPerDay: 100 } });
  const outcomes = await Promise.allSettled(Array.from({ length: 4 }, (_, i) => save(signup, `test-ip-${i}`)));
  assert.ok(outcomes.some(result => result.status === "fulfilled"));
  for (const result of outcomes) {
    // Bounded retries may surface contention, never acknowledge a lost transaction.
    if (result.status === "rejected") assert.equal(result.reason.code, 10);
  }
  const ref = db.collection("updateSubscribers").doc(createHash("sha256").update(email).digest("hex"));
  assert.deepEqual((await ref.get()).data().topics, ["derive"]);
  const matches = await db.collection("updateSubscribers").get();
  assert.equal(matches.docs.filter(doc => doc.data().email === email).length, 1);
  const day = Math.floor(Date.now() / 86_400_000);
  assert.equal((await db.collection("signupLimits").doc(`intakeAdmissions:${day}`).get()).data().count, outcomes.filter(result => result.status === "fulfilled").length);
  await ref.set({ status: "suppressed" });
  await save({ ...signup, topics: ["ascent"] }, "suppressed-test-ip");
  assert.deepEqual((await ref.get()).data(), { status: "suppressed" });
  await db.terminate();
  await deleteApp(app);
});
