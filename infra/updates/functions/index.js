import { initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { onRequest } from "firebase-functions/v2/https";
import { getAppCheck } from "firebase-admin/app-check";
import { createAttestationVerifier } from "./attestation.js";
import { defineSecret, defineString } from "firebase-functions/params";
import { createSignupHandler } from "./signup.js";
import { createSignupStore } from "./store.js";

initializeApp();
const appId = defineString("UPDATES_APP_ID", { default: "" });
const rateLimitKey = defineSecret("UPDATES_RATE_LIMIT_KEY");
const origins = ["https://www.amshq.in", "https://amshq.in"];
if (process.env.FUNCTIONS_EMULATOR === "true") origins.push("http://localhost:3100", "http://localhost:3108");
const save = createSignupStore({ db: getFirestore(), Timestamp, rateLimitKey: () => rateLimitKey.value() });

export const subscribeToUpdates = onRequest({
  region: "asia-south1", cors: origins, invoker: "public", secrets: [rateLimitKey],
  maxInstances: 2, concurrency: 20, memory: "256MiB", timeoutSeconds: 15,
}, createSignupHandler({
  save, allowedOrigins: origins,
  verifyAttestation: process.env.FUNCTIONS_EMULATOR === "true" ? async () => true : createAttestationVerifier({ appCheck: getAppCheck(), appId: () => appId.value() }),
}));
