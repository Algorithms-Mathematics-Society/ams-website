import { SITE } from "@/content/site";

/**
 * Organization entity, rendered on every page. This is how Google learns
 * that "AMS" means the Algorithms & Mathematics Society.
 * TODO(launch): fill sameAs with the real LinkedIn, GitHub, Discord, and
 * Codeforces profile URLs; every added profile strengthens the entity.
 */
export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  legalName: SITE.legalName,
  alternateName: "AMS India",
  url: SITE.url,
  logo: `${SITE.url}/brand/logo.png`,
  description: SITE.description,
  foundingDate: "2025",
  location: {
    "@type": "Country",
    name: "India",
  },
  sameAs: ["https://amsderive.in"],
} as const;

/** Derive '26: the verified first edition. Rendered on /derive. */
export const DERIVE_EVENT_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "AMS Derive '26",
  description:
    "National quant contest: probability, markets, and mathematical reasoning. 2,500+ participants, 150 in Round 2, 50 finalists on stage at IIT Bombay.",
  startDate: "2026-05-23",
  endDate: "2026-07-11",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "IIT Bombay",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressCountry: "IN",
    },
  },
  organizer: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
  },
  url: `${SITE.url}/derive`,
} as const;
