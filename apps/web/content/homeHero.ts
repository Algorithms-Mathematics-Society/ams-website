import { DERIVE_OVERVIEW_LINK } from "@/content/site";

export const HOME_HERO = {
  eyebrow: "Algorithms & Mathematics Society",
  headline: "Compete in quant and systems.",
  body: "National competitions in quantitative reasoning and systems engineering. Explore our contests, meet the team, and see the Derive finals.",
  image: {
    src: "/images/derive26/hero/the-hall-at-capacity.webp",
    alt: "Derive finalists seated across the contest hall at IIT Bombay",
    context: "Derive '26 national finals · IIT Bombay · July 2026",
  },
  primaryAction: DERIVE_OVERVIEW_LINK,
  secondaryAction: { label: "Sponsor Ascent", href: "/access" },
  teamLink: { label: "Meet the team", href: "/team" },
  galleryLink: { label: "See the Derive finals", href: "/gallery" },
} as const;
