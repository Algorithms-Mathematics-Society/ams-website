import fs from "fs";
import path from "path";
import { cache } from "react";
import type { Tier } from "./monthly";

// Opted-in solver names come from the "Solvers" tab of the AMS Public Feed sheet.
// scripts/fetch-monthly-solvers.mjs fetches and validates it before `next build`
// and writes the gitignored .generated/monthly-solvers.json read here. The feed
// URL lives in an environment variable and solver names are never committed, so
// removing a row and rebuilding is the deletion path.

export interface Solver {
  name: string;
  institution: string;
  year: string;
}

export type SolverList = Record<Tier, Solver[]>;

const FEED_FILE = path.resolve(
  process.cwd(),
  ".generated/monthly-solvers.json",
);

/** Solver lists keyed by problem number, or null when no feed is configured. */
export const getSolverLists = cache((): Record<string, SolverList> | null => {
  if (!fs.existsSync(FEED_FILE)) return null;
  return JSON.parse(fs.readFileSync(FEED_FILE, "utf-8")) as Record<
    string,
    SolverList
  > | null;
});

export function getSolverList(number: number): SolverList | null {
  const lists = getSolverLists();
  if (!lists) return null;
  return lists[String(number)] ?? { warmup: [], main: [] };
}

/**
 * Production builds with a released solution must have the feed configured;
 * otherwise a solution page would publish without its solver list.
 */
export function assertFeedConfigured(hasReleasedSolution: boolean): void {
  if (
    hasReleasedSolution &&
    process.env.VERCEL_ENV === "production" &&
    getSolverLists() === null
  ) {
    throw new Error(
      "MONTHLY_SOLVERS_FEED_URL is required in production once a Monthly solution is released.",
    );
  }
}
