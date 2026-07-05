export interface Stat {
  value: string;
  label: string;
}

/**
 * TODO(launch): replace XX/₹X.X with verified counts before launch —
 * a wrong number costs more trust than no number (design note).
 */
export const STATS: Stat[] = [
  { value: "2,500+", label: "Students, year one" },
  { value: "150+", label: "Finalists" },
  { value: "XX+", label: "Institutes represented" },
  { value: "₹X.X L", label: "Prizes & travel funded" },
];
