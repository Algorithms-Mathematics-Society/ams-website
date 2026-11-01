/** Firebase is loaded on submission, not on page load. */
let appPromise: Promise<import("firebase/app").FirebaseApp> | undefined;
let checkPromise: Promise<import("firebase/app-check").AppCheck> | undefined;
async function getUpdatesApp() {
  appPromise ??= import("firebase/app").then(({ getApps, initializeApp }) => {
    const config = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
    if (!config.apiKey || !config.projectId || !config.appId) throw new Error("Firebase configuration incomplete");
    return getApps().find(app => app.name === "ams-updates") || initializeApp(config, "ams-updates");
  }).catch(error => { appPromise = undefined; throw error; });
  return appPromise;
}
export async function getUpdatesEndpoint(override: string): Promise<string> {
  if (override) return override;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) throw new Error("Firebase project is not configured");
  return `https://asia-south1-${projectId}.cloudfunctions.net/subscribeToUpdates`;
}
export async function getUpdatesAttestation(endpoint: string): Promise<string | null> {
  // Only the local Firebase emulator bypasses attestation, never a production URL.
  const url = new URL(endpoint);
  if (process.env.NODE_ENV === "development" && ["localhost", "127.0.0.1"].includes(url.hostname) && url.port === "5001") return null;
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_SITE_KEY;
  if (!siteKey) throw new Error("Browser verification unavailable");
  const sdk = await import("firebase/app-check");
  checkPromise ??= getUpdatesApp().then(app => sdk.initializeAppCheck(app, {
    provider: new sdk.ReCaptchaEnterpriseProvider(siteKey), isTokenAutoRefreshEnabled: false,
  })).catch(error => { checkPromise = undefined; throw error; });
  const check = await checkPromise;
  return (await sdk.getLimitedUseToken(check)).token;
}
