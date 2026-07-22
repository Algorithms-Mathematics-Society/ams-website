import { DERIVE_OVERVIEW_LINK } from "@/content/site";

/** Block 10: peak-end: the page closes on the after-hours social. */
export const CLOSING_CTA = {
  eyebrow: "What comes next",
  headlineLines: ["The next edition", "is being written."],
  body: "See how the contest works, what the first field accomplished, and how to be ready when the next registration opens.",
  primary: DERIVE_OVERVIEW_LINK,
  secondary: { label: "Sponsor the next one", href: "/access#sponsor" },
  photo: {
    src: "/images/derive26/hero/the-evening-social.webp",
    alt: "The evening social from above: contestants around tables after the Derive '26 finals",
  },
  plateCaption: "Plate III · The evening social, after the final round",
} as const;
