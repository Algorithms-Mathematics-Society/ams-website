export const DERIVE_HERO = {
  eyebrow: "Derive · 2026 edition",
  title: "The quantitative reasoning contest.",
  body: "Probability, markets, and mathematical reasoning, tested through two online rounds and an in-person final. Explore the format and the participation from Derive '26.",
  image: {
    src: "/images/derive26/hero/the-hall-at-capacity.webp",
    alt: "Derive finalists working across the contest hall at IIT Bombay",
  },
  primaryAction: { label: "See the 2026 format", href: "#derive-format" },
  archiveLink: {
    label: "Read the 2026 rules",
    href: "https://amsderive.in/rules",
  },
  photoCaption: "Derive '26 finals · IIT Bombay · July 2026",
} as const;

export interface DeriveStage {
  stat: string;
  statLabel: string;
  title: string;
  body: string;
}

/** The Derive '26 funnel, verified: 50 qualified for the finals, 33 competed. */
export const DERIVE_STAGES: DeriveStage[] = [
  {
    stat: "2,500+",
    statLabel: "participants",
    title: "PRIOR · Online qualifier",
    body: "The first online round tested probability, markets, and mathematical reasoning.",
  },
  {
    stat: "150",
    statLabel: "advanced",
    title: "POSTERIOR · Online prelims",
    body: "The top 150 participants advanced to a second online round with a more demanding problem set.",
  },
  {
    stat: "50",
    statLabel: "qualified for finals",
    title: "CONVERGENCE · IIT Bombay",
    body: "Fifty participants qualified for the finals. Thirty-three competed in person at IIT Bombay in July 2026.",
  },
];

export interface DerivePartner {
  tier: string;
  name: string;
  href: string;
  description: string;
  logo: {
    /** Public path to the approved logo asset. */
    src: string;
    /** Intrinsic pixel dimensions (drive next/image aspect ratio only). */
    width: number;
    height: number;
    /** Display sizing. The two marks differ in shape (Jane Street is a wide
     *  wordmark, QRT is a tall stacked mark), so each sets its own height. */
    className: string;
  };
}

export const DERIVE_PARTNERS_SECTION = {
  eyebrow: "Derive '26 partners",
  title: "Partners for Derive ’26",
  body: "Jane Street and QRT supported the 2026 edition of Derive.",
} as const;

export const DERIVE_PARTNERS: DerivePartner[] = [
  {
    tier: "Apex Partner",
    name: "Jane Street",
    href: "https://www.janestreet.com/",
    description:
      "Apex Partner of Derive '26, supporting the national quantitative reasoning contest.",
    logo: {
      src: "/partners/Jane_Street.svg",
      width: 302,
      height: 80,
      className: "h-8 w-auto",
    },
  },
  {
    tier: "Convergence Partner",
    name: "QRT",
    href: "https://www.qube-rt.com/",
    description:
      "Convergence Partner of the Derive '26 finals at IIT Bombay, where 33 finalists competed in person.",
    logo: {
      src: "/partners/QRT.png",
      width: 7916,
      height: 8614,
      className: "h-20 w-auto",
    },
  },
];

export const DERIVE_CTA = {
  title: "Future editions",
  body: "Want to take part in a future Derive edition? Choose Derive updates to hear about announcements and registration.",
  buttonLabel: "Email about Derive",
  buttonHref:
    "mailto:team@amshq.in?subject=Derive%20registration%20updates",
  gallery: { label: "View the 2026 gallery", href: "/gallery" },
} as const;

/** Subject areas published on amsderive.in; this describes the 2026 edition. */
export const DERIVE_SUBJECTS = {
  title: "The problems",
  items: [
    { title: "Probability and inference", body: "Reason about uncertain outcomes using probability, expected value, and Bayesian inference." },
    { title: "Markets and models", body: "Work with questions involving market microstructure, stochastic processes, and options pricing." },
    { title: "Mathematical reasoning", body: "Develop solutions to unfamiliar puzzles and combinatorial problems, and explain the reasoning behind them." },
  ],
  note: "All three rounds were individual. The published 2026 rules describe eligibility, recording requirements, and solution verification.",
  link: { label: "Read the 2026 rules", href: "https://amsderive.in/rules" },
} as const;

export const DERIVE_JOURNEY = {
  title: "The 2026 competition",
  body: "Two online rounds led to the finals at IIT Bombay. Qualification and attendance are recorded separately below.",
  gallery: { label: "See photographs from the finals", href: "/gallery" },
} as const;
