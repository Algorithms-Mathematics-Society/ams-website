export interface TeamMember {
  name: string;
  role: string;
}

export const TEAM_PAGE = {
  eyebrow: "The team",
  title: "The people behind it.",
  body: "AMS is run by a small team of competitors: the people who set the problems, run the halls, and build the platform. Built by competitors, for competitors.",
  cta: {
    title: "Help run the next one.",
    body: "Volunteers make the finals happen: registration, staging, judging support. Write to us and be part of the winter edition.",
    buttonLabel: "Write to us",
    buttonHref: "mailto:tilakj0108@gmail.com?subject=Volunteering%20with%20AMS",
  },
} as const;

/**
 * TODO(content): real names + portraits: one session, one backdrop, one crop;
 * consistency reads as professionalism (design note).
 */
export const TEAM: TeamMember[] = [
  { name: "Tilak", role: "Founder" },
  { name: "Name", role: "Engineering" },
  { name: "Name", role: "Design" },
  { name: "Name", role: "Operations" },
  { name: "Name", role: "Outreach" },
];
