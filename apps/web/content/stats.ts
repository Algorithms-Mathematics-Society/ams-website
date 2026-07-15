export interface Stat {
  value: string;
  label: string;
}

/**
 * Verified by Tilak on 2026-07-15; the fact-sync map ran. These are the
 * AMS-wide numbers, deliberately not the Derive '26 funnel: the 2,500+ who
 * entered that contest and the 33 who reached the stage are a subset of the
 * pool, and those figures stay on the Derive, Ascent, Access, FAQ, seo, and
 * llms.txt surfaces that scope them to the edition.
 */
export const STATS: Stat[] = [
  { value: "3,000+", label: "AMS talent pool" },
  { value: "30+", label: "Institutions represented" },
  { value: "2", label: "Competitions conducted" },
];

export const STATS_BAND = {
  /** The emotional read above the numbers; the stats are the rational read. */
  emotionalLine: "2,500 registered. 33 stood on that stage.",
} as const;
