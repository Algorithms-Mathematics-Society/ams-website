export interface InstitutionalMandateItem {
  number: string;
  title: string;
  body: string;
}

export const INSTITUTIONAL_OVERVIEW = {
  title: "About the society",
  definition:
    "AMS is the Algorithms & Mathematics Society. We organize Derive, a quantitative reasoning contest, and Ascent, a systems engineering contest. Our events bring students, early-career participants, and partner firms together.",
  image: {
    src: "/images/derive26/hero/finalists-meet-the-interviewers.webp",
    alt: "Derive finalists meeting interviewers from partner firms at IIT Bombay",
    caption: "Conversations with partner firms · Derive '26 · IIT Bombay",
  },
  action: { label: "Meet the team", href: "/team" },
  evidenceLinks: [
    { label: "Read about AMS", href: "/blog/what-ams-actually-is" },
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
      title: "Partner on the next edition",
      body: "Ascent is our current sponsorship focus. Firms can also plan partnerships for future editions of Derive.",
    },
  ] satisfies readonly InstitutionalMandateItem[],
} as const;
