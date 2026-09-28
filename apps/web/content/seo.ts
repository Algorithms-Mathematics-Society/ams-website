import { OFFICIAL_PROFILES, SITE } from "@/content/site";
import { TEAM } from "@/content/team";

const ORGANIZATION_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

/** One organization identity, shared by the website, team, and publications. */
export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE.legalName,
  alternateName: [SITE.name, "AMS (Algorithms & Mathematics Society)"],
  url: SITE.url,
  logo: `${SITE.url}/brand/logo.png`,
  description: SITE.description,
  foundingDate: "2026",
  location: { "@type": "Country", name: "India" },
  sameAs: Object.values(OFFICIAL_PROFILES),
} as const;

export const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE.name,
  alternateName: SITE.legalName,
  url: SITE.url,
  inLanguage: "en-IN",
  publisher: { "@id": ORGANIZATION_ID },
} as const;

/** Only the roles and identity links published in the visible team roster. */
export const TEAM_JSONLD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE.url}/team#webpage`,
  url: `${SITE.url}/team`,
  name: "The AMS team",
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORGANIZATION_ID },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: TEAM.map((member, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        "@id": `${SITE.url}/team#${member.id}`,
        name: member.name,
        url: `${SITE.url}/team#${member.id}`,
        jobTitle: member.role,
        memberOf: { "@id": ORGANIZATION_ID },
        ...(member.profile ? { sameAs: [member.profile.href] } : {}),
        ...(member.image ? { image: `${SITE.url}${member.image.src}` } : {}),
        ...(member.bio ? { description: member.bio } : {}),
      },
    })),
  },
} as const;

/** The answers are also rendered as visible text on /faq. */
export function faqPageJsonLd(
  faq: ReadonlyArray<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE.url}/faq#webpage`,
    url: `${SITE.url}/faq`,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function blogPostingJsonLd(post: {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  author: string;
  cover: { full: string; alt: string };
}) {
  const member = TEAM.find((person) => person.name === post.author);
  const author = post.author === "AMS Team"
    ? { "@type": "Organization", "@id": ORGANIZATION_ID, name: SITE.legalName, url: SITE.url }
    : {
        "@type": "Person",
        name: post.author,
        ...(member ? {
          "@id": `${SITE.url}/team#${member.id}`,
          url: `${SITE.url}/team#${member.id}`,
          ...(member.profile ? { sameAs: [member.profile.href] } : {}),
        } : {}),
      };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE.url}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.pubDate.toISOString(),
    inLanguage: "en-IN",
    author,
    publisher: { "@id": ORGANIZATION_ID },
    image: `${SITE.url}${post.cover.full}`,
    url: `${SITE.url}/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${post.slug}`,
      isPartOf: { "@id": WEBSITE_ID },
    },
  };
}

/** Derive '26: the verified first edition. Rendered on /derive. */
export const DERIVE_EVENT_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": `${SITE.url}/derive#event-2026`,
  name: "AMS Derive 2026",
  description:
    "National quant contest: probability, markets, and mathematical reasoning. 2,500+ participants, 150 advanced to Round 2, 50 qualified for the finals, and 33 finalists competed on stage at IIT Bombay in July 2026.",
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
  organizer: { "@id": ORGANIZATION_ID },
  url: `${SITE.url}/derive`,
} as const;
