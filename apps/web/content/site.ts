export interface NavLink {
  label: string;
  href: string;
  /** Opens in a new tab (external platforms). */
  external?: boolean;
}

export const SITE = {
  name: "AMS",
  tagline:
    "Competitions in quantitative finance and systems programming. Assessments for technical hiring.",
  description:
    "AMS (Algorithms & Mathematics Society) runs Derive and Ascent, competitions in quantitative finance and systems programming, and builds the Access assessment platform.",
  legalName: "Algorithms & Mathematics Society",
  url: "https://amshq.in",
  copyright: "© 2026 AMS (Algorithms & Mathematics Society) · amshq.in",
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Derive", href: "/derive" },
  { label: "Ascent", href: "/ascent" },
  { label: "For firms", href: "/access" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
];

export const DERIVE_OVERVIEW_LINK = {
  label: "Explore Derive",
  href: "/derive",
} as const satisfies NavLink;

/** Primary CTA. Links out to the contest platform, never into this repo. */
export const COMPETE_LINK: NavLink = {
  label: "Compete",
  href: "https://ascent.amshq.in",
};

export const FOOTER_COLUMNS: Array<{ heading: string; links: NavLink[] }> = [
  {
    heading: "Compete",
    links: [
      { label: "Derive", href: "/derive" },
      { label: "Ascent", href: "/ascent" },
    ],
  },
  {
    heading: "Firms",
    links: [
      { label: "Assessments", href: "/access" },
      { label: "Contest partnerships", href: "/access#sponsor" },
      { label: "Discuss your hiring needs", href: "/access#contact" },
    ],
  },
  {
    heading: "AMS",
    links: [
      { label: "Gallery", href: "/gallery" },
      { label: "Team", href: "/team" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "mailto:team@amshq.in" },
    ],
  },
];
