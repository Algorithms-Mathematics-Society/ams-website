export const DERIVE_HERO = {
  eyebrow: "Derive",
  title: "The quant contest.",
  body: "Probability, markets, and mathematical reasoning under the clock. Two online rounds to earn a seat, then finals on stage — in person, in front of the firms that hire this talent.",
  photoLabel:
    "Photo — Derive finals in progress, contestants on stage, IIT Bombay",
  photoCaption: "Derive '26 finals · IIT Bombay · July 2026",
} as const;

export interface DeriveStage {
  stat: string;
  statLabel: string;
  title: string;
  body: string;
}

/** The Derive '26 funnel — verified numbers from the first edition. */
export const DERIVE_STAGES: DeriveStage[] = [
  {
    stat: "2,500+",
    statLabel: "participants",
    title: "Round 1 — the field",
    body: "Open to everyone. One round of probability, markets, and mathematical reasoning sets the bar.",
  },
  {
    stat: "150",
    statLabel: "advanced",
    title: "Round 2 — the cut",
    body: "The top performers return for a harder paper. Only the sharpest 150 make it this far.",
  },
  {
    stat: "50",
    statLabel: "finalists",
    title: "Finals — offline at IIT Bombay",
    body: "Fifty finalists compete on stage, in person, judged with the sponsor firms in the room.",
  },
];

export interface DerivePartner {
  tier: string;
  name: string;
  description: string;
}

/**
 * TODO(launch): replace names with approved logo files only,
 * per the sponsor logo-approval workflow.
 */
export const DERIVE_PARTNERS: DerivePartner[] = [
  {
    tier: "Apex Partner",
    name: "Jane Street",
    description:
      "Title partner of Derive — backing the contest that measures India's quant talent on its own terms.",
  },
  {
    tier: "Convergence Partner",
    name: "QRT",
    description:
      "Partner of the Convergence finals at IIT Bombay, where the top fifty compete in person.",
  },
];

export const DERIVE_CTA = {
  title: "The next edition is coming.",
  body: "Derive returns. Leave your email and be first to know when registration opens.",
  buttonLabel: "Get notified",
  /** TODO(launch): point at the registration/interest form when live. */
  buttonHref: "mailto:tilakj0108@gmail.com?subject=Derive%20—%20notify%20me",
} as const;
