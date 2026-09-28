export interface InstitutionalMandateItem {
  number: string;
  title: string;
  body: string;
}

export const INSTITUTIONAL_OVERVIEW = {
  eyebrow: "Why AMS",
  title: "Good problems bring capable people together.",
  definition:
    "AMS brings students and early-career talent together through national contests in quantitative reasoning and systems engineering. Sponsors help make these contests possible and connect with the people taking part.",
  image: {
    src: "/images/derive26/hero/finalists-meet-the-interviewers.webp",
    alt: "Derive finalists meeting interviewers from partner firms at IIT Bombay",
    caption: "Conversations with partner firms · Derive '26 · IIT Bombay",
  },
  action: { label: "Partner with AMS", href: "/access#sponsor" },
  evidenceLinks: [
    { label: "Derive '26 edition and format", href: "/derive" },
    { label: "Photographs from the finals", href: "/gallery" },
  ],
  mandate: [
    {
      number: "01",
      title: "Two areas of focus",
      body: "Derive focuses on probability, markets, and mathematics. Ascent focuses on C++, optimization, and performance.",
    },
    {
      number: "02",
      title: "A place earned through competition",
      body: "Each contest has its own qualification criteria. The Derive '26 finalists earned their place through two online rounds.",
    },
    {
      number: "03",
      title: "Support the next contest",
      body: "We are seeking sponsors for Ascent and welcome conversations about future Derive editions.",
    },
  ] satisfies readonly InstitutionalMandateItem[],
} as const;
