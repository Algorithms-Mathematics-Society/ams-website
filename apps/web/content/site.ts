export interface NavLink {
  label: string;
  href: string;
  /** Opens in a new tab (external platforms). */
  external?: boolean;
}

export const SITE = {
  name: "AMS",
  tagline:
    "Contests in quant and competitive programming. Assessments scored against the people who compete.",
  description:
    "National contests in quantitative finance and competitive programming, plus Access, the platform that turns performance into verified hiring signal.",
  legalName: "Algorithms & Mathematics Society",
  url: "https://amshq.in",
  copyright: "© 2026 AMS (Algorithms & Mathematics Society) · amshq.in",
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Derive", href: "/derive" },
  { label: "Ascent", href: "/ascent" },
  { label: "Access", href: "/access" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/team" },
];

/** Primary CTA. TODO(launch): point at the live Derive '26 registration URL. */
export const COMPETE_LINK: NavLink = { label: "Compete", href: "/derive" };

export const FOOTER_COLUMNS: Array<{ heading: string; links: NavLink[] }> = [
  {
    heading: "Compete",
    links: [
      { label: "Derive", href: "/derive" },
      { label: "Ascent", href: "/ascent" },
      // TODO(launch): monthly challenge lives on the contest platform.
      { label: "Monthly Challenge", href: "/derive" },
    ],
  },
  {
    heading: "Firms",
    links: [
      { label: "Access", href: "/access" },
      { label: "Sponsor", href: "/access#sponsor" },
      { label: "Talk to us", href: "mailto:tilakj0108@gmail.com" },
    ],
  },
  {
    heading: "AMS",
    links: [
      { label: "Gallery", href: "/gallery" },
      { label: "Team", href: "/team" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "mailto:tilakj0108@gmail.com" },
    ],
  },
];
