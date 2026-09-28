export interface NavLink {
  label: string;
  href: string;
  /** Opens in a new tab (external platforms). */
  external?: boolean;
}

export const SITE = {
  name: "AMS",
  tagline:
    "National competitions in quantitative finance and systems programming. Partnerships that bring firms and competitors together.",
  description:
    "AMS (Algorithms & Mathematics Society) runs Derive and Ascent, competitions in quantitative finance and systems programming. Explore our contests, people, and sponsorship opportunities.",
  legalName: "Algorithms & Mathematics Society",
  url: "https://amshq.in",
  copyright: "© 2026 AMS (Algorithms & Mathematics Society) · amshq.in",
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Derive", href: "/derive" },
  { label: "Ascent", href: "/ascent" },
  { label: "Partnerships", href: "/access" },
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
    heading: "Partner with AMS",
    links: [
      { label: "Sponsor a competition", href: "/access#sponsor" },
      { label: "Discuss a partnership", href: "/access#contact" },
      { label: "Hiring assessments", href: "/access#assessments" },
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
