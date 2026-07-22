import { DERIVE_OVERVIEW_LINK } from "@/content/site";

export const HOME_HERO = {
  eyebrow: "National contests and assessment",
  headline: "National contests. Verified performance.",
  body: "AMS runs national contests in quantitative finance and competitive programming. Access turns contest performance into a hiring signal firms can use.",
  image: {
    src: "/images/derive26/hero/the-hall-at-capacity.webp",
    alt: "Derive finalists seated across the contest hall at IIT Bombay",
    context: "Derive '26 national finals · IIT Bombay · July 2026",
  },
  primaryAction: DERIVE_OVERVIEW_LINK,
  secondaryAction: { label: "For firms", href: "/access" },
} as const;
