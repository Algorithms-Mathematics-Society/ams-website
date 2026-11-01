export const CONSENT_VERSION = "2026-11-01";
export const CONSENT_TEXT = "I agree to AMS storing my name, email, and competition choice to send me these updates.";

// Deliberately support ordinary ASCII mailboxes, including plus addressing.
// Ownership is a separate confirmation step; syntax validation cannot prove it.
export function normalizeEmail(value) {
  if (typeof value !== "string" || value.length > 512 || /[\p{Cc}\p{Cf}]/u.test(value)) return null;
  const email = value.trim().toLowerCase();
  if (email.length > 254) return null;
  const parts = email.split("@");
  if (parts.length !== 2) return null;
  const [local, domain] = parts;
  if (!local || local.length > 64 || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local) || local.startsWith(".") || local.endsWith(".") || local.includes("..")) return null;
  const labels = domain.split(".");
  if (labels.length < 2 || labels.some(label => !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))) return null;
  if (!/[a-z]/.test(labels.at(-1))) return null;
  return email;
}

export function validateSignup(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const prototype = Object.getPrototypeOf(body);
  if (prototype !== Object.prototype && prototype !== null) return null;
  const { name, email, topic, consent, consentVersion, website } = body;
  if (typeof name !== "string" || name.length > 400 || !name.trim() || name.trim().length > 100 || /[\p{Cc}\p{Cf}]/u.test(name)) return null;
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return null;
  if (!["ascent", "derive", "both"].includes(topic) || consent !== true || consentVersion !== CONSENT_VERSION) return null;
  if (website != null && website !== "") return null;
  return { name: name.trim(), email: normalizedEmail, topics: topic === "both" ? ["ascent", "derive"] : [topic], consentVersion, consentText: CONSENT_TEXT };
}

// Production must supply attestation verification; injection permits isolated tests.
export function createSignupHandler({ save, allowedOrigins, verifyAttestation = async () => {} }) {
  return async (req, res) => {
    res.set("Cache-Control", "no-store");
    res.set("X-Content-Type-Options", "nosniff");
    if (!allowedOrigins.includes(req.get("origin"))) return res.status(403).json({ error: "forbidden" });
    if (req.method !== "POST") { res.set("Allow", "POST"); return res.status(405).json({ error: "method" }); }
    if (!req.is("application/json")) return res.status(415).json({ error: "content_type" });
    // The platform has already parsed the body. This is a persistence guard,
    // not an edge-level request-size or denial-of-service boundary.
    if ((req.rawBody?.length || 0) > 4096) return res.status(413).json({ error: "too_large" });
    const signup = validateSignup(req.body);
    if (!signup) return res.status(400).json({ error: "invalid_request" });
    try {
      if (await verifyAttestation(req) === false) throw new Error("Unverified");
    } catch {
      return res.status(403).json({ error: "verification_failed" });
    }
    try {
      // req.ip depends on platform proxy trust. It is only a supplementary quota
      // signal, never proof of identity or a replacement for attestation.
      await save(signup, req.ip || "unknown");
      return res.status(200).json({ status: "saved" });
    } catch (error) {
      if (error?.code === "RATE_LIMIT") {
        const retryAfter = Number.isFinite(error.retryAfter) ? Math.min(86400, Math.max(1, Math.ceil(error.retryAfter))) : 3600;
        res.set("Retry-After", String(retryAfter));
        return res.status(429).json({ error: "rate_limited" });
      }
      // Never log the payload, address, or SDK error details.
      console.error("Updates signup persistence failed");
      return res.status(503).json({ error: "unavailable" });
    }
  };
}
