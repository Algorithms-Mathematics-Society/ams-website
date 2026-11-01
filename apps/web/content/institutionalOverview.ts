export interface InstitutionalMandateItem {
  number: string;
  title: string;
  body: string;
}

export const INSTITUTIONAL_OVERVIEW = {
  title: "Good problems give people a reason to meet.",
  definition:
    "AMS is the Algorithms & Mathematics Society. We bring people together around quantitative and systems problems, with shared rules and time to discuss the work.",
  philosophy: "We want a competition to give participants something worth thinking about and people worth learning from. For firms, that shared work can be the starting point for a more specific technical conversation.",
  image: {
    src: "/images/derive26/hero/finalists-meet-the-interviewers.webp",
    alt: "Derive finalists meeting interviewers from partner firms at IIT Bombay",
    caption: "Conversations with partner firms · Derive '26 · IIT Bombay",
  },
  action: { label: "Meet the team", href: "/team" },
  evidenceLinks: [
    { label: "Why we run competitions", href: "/blog/welcome-to-ams" },
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
