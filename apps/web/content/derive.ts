export const DERIVE_HERO = {
  eyebrow: "Derive",
  title: "The quantitative reasoning contest.",
  body: "Probability, markets, and mathematical reasoning, tested through two online rounds and an in-person final. Explore the format and the participation from Derive '26.",
  image: {
    src: "/images/derive26/hero/the-hall-at-capacity.webp",
    alt: "Derive finalists working across the contest hall at IIT Bombay",
  },
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
    title: "Round 1: the opening round",
    body: "The first online round tested probability, markets, and mathematical reasoning.",
  },
  {
    stat: "150",
    statLabel: "advanced",
    title: "Round 2: the qualifying round",
    body: "The top 150 participants advanced to a second online round with a more demanding problem set.",
  },
  {
    stat: "50",
    statLabel: "qualified for finals",
    title: "Finals: in person at IIT Bombay",
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
  title: "Supporting the competition.",
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
  title: "Interested in the next Derive?",
  body: "Email AMS to ask about the next edition and registration updates.",
  buttonLabel: "Email about Derive",
  /** TODO(launch): point at the registration/interest form when live. */
  buttonHref:
    "mailto:team@amshq.in?subject=Derive%20registration%20updates",
} as const;
