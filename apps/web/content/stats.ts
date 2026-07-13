export interface Stat {
  value: string;
  label: string;
}

/** All four values verified by Tilak on 2026-07-13; the fact-sync map ran. */
export const STATS: Stat[] = [
  { value: "2,500+", label: "Registrations, year one" },
  { value: "33", label: "CONVERGENCE finalists" },
  { value: "40+", label: "Institutes represented" },
  { value: "₹75K", label: "Prizes awarded" },
];

export const STATS_BAND = {
  /** The emotional read above the numbers; the stats are the rational read. */
  emotionalLine: "2,500 registered. 33 stood on that stage.",
} as const;
