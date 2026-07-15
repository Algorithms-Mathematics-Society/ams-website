export const DERIVE_HERO = {
  eyebrow: "Derive",
  title: "The quant contest.",
  body: "Probability, markets, and mathematical reasoning under the clock. Two online rounds to earn a seat, then finals on stage: in person, in front of the firms that hire this talent.",
  photoLabel:
    "Photo · Derive finals in progress, contestants on stage, IIT Bombay",
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
    title: "Round 1: the field",
    body: "Open to everyone. One round of probability, markets, and mathematical reasoning sets the bar.",
  },
  {
    stat: "150",
    statLabel: "advanced",
    title: "Round 2: the cut",
    body: "The top performers return for a harder paper. Only the sharpest 150 make it this far.",
  },
  {
    stat: "50",
    statLabel: "qualify for finals",
    title: "Finals: offline at IIT Bombay",
    body: "Fifty qualify for the on-stage finals; 33 competed in person at Derive '26.",
  },
];

export interface DerivePartner {
  tier: string;
  name: string;
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

export const DERIVE_PARTNERS: DerivePartner[] = [
  {
    tier: "Apex Partner",
    name: "Jane Street",
    description:
      "Title partner of Derive, backing the contest that measures India's quant talent on its own terms.",
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
    description:
      "Partner of the Convergence finals at IIT Bombay, where the top fifty qualify to compete in person.",
    logo: {
      src: "/partners/QRT.png",
      width: 7916,
      height: 8614,
      className: "h-20 w-auto",
    },
  },
];

export const DERIVE_CTA = {
  title: "The next edition is coming.",
  body: "Derive returns. Leave your email and be first to know when registration opens.",
  buttonLabel: "Get notified",
  /** TODO(launch): point at the registration/interest form when live. */
  buttonHref:
    "mailto:tilakj0108@gmail.com?subject=Derive%20registration%20updates",
} as const;
