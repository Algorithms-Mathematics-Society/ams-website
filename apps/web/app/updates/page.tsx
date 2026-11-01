import { createPageMetadata } from "@/lib/metadata";
import { UpdatesSignup } from "@/components/sections/updates/UpdatesSignup";
import { UPDATES } from "@/content/updates";

export const metadata = createPageMetadata({ title: UPDATES.title, description: UPDATES.description, path: "/updates" });

export default function UpdatesPage() {
  const endpoint = process.env.UPDATES_SIGNUP_ENDPOINT || "";
  if (endpoint && !(endpoint.startsWith("https://") || (process.env.NODE_ENV !== "production" && /^http:\/\/(localhost|127\.0\.0\.1):/.test(endpoint)))) {
    throw new Error("UPDATES_SIGNUP_ENDPOINT must be an HTTPS URL.");
  }
  const emulator = process.env.NODE_ENV === "development" && /^http:\/\/(localhost|127\.0\.0\.1):5001\//.test(endpoint);
  const configured = emulator || Boolean(
    process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_SITE_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  );
  return <UpdatesSignup endpoint={endpoint} configured={configured} />;
}
