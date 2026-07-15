export interface Stat {
  value: string;
  label: string;
}

/**
 * Verified by Tilak on 2026-07-15; the fact-sync map ran. The band widens
 * from one contest to AMS itself: the pool is everyone AMS has drawn, and
 * Derive '26's participants are the subset of it that entered that edition,
 * which is why the same 2,500+ appears on the Derive, Ascent, Access, FAQ,
 * seo, and llms.txt surfaces that scope it to the edition.
 */
export const STATS: Stat[] = [
  { value: "5,000+", label: "AMS talent pool" },
  { value: "2,500+", label: "Derive participants" },
  { value: "30+", label: "Institutions represented" },
];
