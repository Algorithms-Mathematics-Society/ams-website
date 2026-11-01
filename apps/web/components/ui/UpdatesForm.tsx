"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { getUpdatesEndpoint, getUpdatesAttestation } from "@/lib/firebase";
import { UPDATES } from "@/content/updates";
import neutral from "./Neutral.module.css";
import styles from "./UpdatesForm.module.css";

interface Props { endpoint: string; }
const subscribeToLocation = (onChange: () => void) => {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
};
const subscribeToHydration = () => () => {};

export function UpdatesForm({ endpoint }: Props) {
  const [state, setState] = useState<"idle" | "checking" | "saving" | "saved" | "error" | "limited" | "verification" | "invalid">("idle");
  const search = useSyncExternalStore(subscribeToLocation, () => window.location.search, () => "");
  const ready = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const requested = new URLSearchParams(search).get("topic") || "";
  const [chosenTopic, setTopic] = useState<string | null>(null);
  const topic = chosenTopic ?? (["ascent", "derive", "both"].includes(requested) ? requested : "");
  const busy = useRef(false);
  const status = useRef<HTMLDivElement>(null);
  useEffect(() => { if (["saved", "error", "limited", "verification", "invalid"].includes(state)) status.current?.focus(); }, [state]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true;
    setState("checking");
    const data = new FormData(event.currentTarget);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const url = await getUpdatesEndpoint(endpoint);
      let token: string | null;
      try {
        token = await Promise.race([
          getUpdatesAttestation(url),
          new Promise<never>((_, reject) => {
            if (controller.signal.aborted) reject(new Error("Verification timed out"));
            else controller.signal.addEventListener("abort", () => reject(new Error("Verification timed out")), { once: true });
          }),
        ]);
      }
      catch { setState("verification"); return; }
      setState("saving");
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["X-Firebase-AppCheck"] = token;
      const response = await fetch(url, {
        method: "POST", headers, credentials: "omit", signal: controller.signal,
        body: JSON.stringify({ name: String(data.get("name") || "").trim(), email: String(data.get("email") || "").trim(), topic, consent: data.get("consent") === "on", website: data.get("website"), consentVersion: "2026-11-01" }),
      });
      if (response.status === 403) { setState("verification"); return; }
      if (response.status === 400) { setState("invalid"); return; }
      if (response.status === 429) { setState("limited"); return; }
      if (!response.ok || (await response.json()).status !== "saved") throw new Error("Signup not saved");
      setState("saved");
    } catch { setState("error"); }
    finally { clearTimeout(timeout); busy.current = false; }
  }
  const pending = state === "checking" || state === "saving";
  return (
    <>
      <div ref={status} tabIndex={-1} role="status" aria-live="polite" className={styles.status}>
        {state === "saved" && <><h2>{UPDATES.success}</h2><p>{UPDATES.successBody}</p></>}
        {(state === "error" || state === "limited" || state === "verification" || state === "invalid") && <><p>{state === "limited" ? UPDATES.limited : state === "verification" ? UPDATES.verification : state === "invalid" ? UPDATES.invalid : UPDATES.failure}</p><a className={neutral.textLink} href={UPDATES.emailHref}>{UPDATES.emailLink}</a></>}
      </div>
      {state !== "saved" && <form onSubmit={submit} className={styles.form} aria-busy={pending}>
        <fieldset disabled={pending} className={styles.fields}>
          <label className={styles.field} htmlFor="updates-name">{UPDATES.name}<input id="updates-name" name="name" autoComplete="name" required maxLength={100} /></label>
          <label className={styles.field} htmlFor="updates-email">{UPDATES.email}<input id="updates-email" name="email" type="email" autoComplete="email" inputMode="email" required maxLength={254} /></label>
          <label className={styles.field} htmlFor="updates-topic">{UPDATES.topic}<select id="updates-topic" name="topic" required value={topic} onChange={event => setTopic(event.target.value)}><option value="">{UPDATES.choose}</option>{UPDATES.topics.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
          <div className={styles.trap} aria-hidden="true"><label htmlFor="updates-website">{UPDATES.honeypot}</label><input id="updates-website" name="website" tabIndex={-1} autoComplete="off" /></div>
          <label className={styles.consent}><input type="checkbox" name="consent" required /> <span>{UPDATES.consent}</span></label>
          <button className={`${neutral.primary} ${styles.submit}`} type="submit" disabled={!ready || pending}>{state === "checking" ? UPDATES.checking : state === "saving" ? UPDATES.sending : UPDATES.submit}</button>
        </fieldset>
        <noscript><p>{UPDATES.noScript}</p><a href={UPDATES.emailHref}>{UPDATES.emailLink}</a></noscript>
      </form>}
      {state === "saved" && <a className={neutral.textLink} href={UPDATES.backHref}>{UPDATES.back}</a>}
      <p className={styles.note}>{UPDATES.privacy}</p>
      <a className={neutral.textLink} href={UPDATES.privacyHref}>{UPDATES.privacyLink}</a>
      <div className={styles.protection}><p>{UPDATES.protection}</p><a href="https://policies.google.com/privacy">{UPDATES.googlePrivacy}</a><a href="https://policies.google.com/terms">{UPDATES.googleTerms}</a></div>
    </>
  );
}
