import { HEADER_ACTION } from "@/content/site";

export const HOME_HERO = {
  eyebrow: "Algorithms & Mathematics Society",
  headline: ["Find your", "next challenge."],
  body: "AMS runs national competitions in quantitative reasoning and systems engineering.",
  image: {
    src: "/images/derive26/hero/in-the-zone.webp",
    alt: "A Derive finalist concentrating on a problem at his laptop at IIT Bombay",
    context: "Derive '26 national finals · IIT Bombay · July 2026",
  },
  primaryAction: HEADER_ACTION,
  secondaryAction: { label: "Partner with AMS", href: "/access" },
  galleryLink: { label: "See the Derive finals", href: "/gallery" },
} as const;
