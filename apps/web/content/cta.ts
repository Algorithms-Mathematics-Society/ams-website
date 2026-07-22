import { DERIVE_OVERVIEW_LINK } from "@/content/site";

/** The home page's compact institutional closing action. */
export const CLOSING_CTA = {
  eyebrow: "Next edition",
  headline: "Prepare for the next Derive.",
  body: "See how the contest works, what the first field accomplished, and how to be ready when the next registration opens.",
  primary: DERIVE_OVERVIEW_LINK,
  secondary: { label: "Sponsorship information", href: "/access#sponsor" },
} as const;
