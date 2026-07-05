export interface TeamMember {
  name: string;
  role: string;
}

/**
 * TODO(content): real names + portraits — one session, one backdrop, one crop;
 * consistency reads as professionalism (design note).
 */
export const TEAM: TeamMember[] = [
  { name: "Tilak", role: "Founder" },
  { name: "Name", role: "Engineering" },
  { name: "Name", role: "Design" },
  { name: "Name", role: "Operations" },
  { name: "Name", role: "Outreach" },
];
