export const ASCENT_HERO = {
  eyebrow: "Ascent",
  title: "The systems engineering contest.",
  body: "A competition in C++, optimization, and performance engineering. Solve problems where memory use, execution time, and implementation choices matter.",
  statusLabel: "Competition status",
  status: "Registration open",
  statusDetail: "Round 1 on 24 October 2026",
  focusLabel: "What you will work on",
  focusAreas: ["C++", "Optimization", "Performance engineering"],
} as const;

export interface AscentPillar {
  title: string;
  body: string;
}

/** The three disciplines Ascent measures. */
export const ASCENT_PILLARS: AscentPillar[] = [
  {
    title: "C++ under constraints",
    body: "Write modern C++ within defined memory and execution limits.",
  },
  {
    title: "Optimization",
    body: "Choose algorithms and implementations that make efficient use of time and memory.",
  },
  {
    title: "Performance engineering",
    body: "Investigate cache behavior, memory allocation, and throughput to improve measured performance.",
  },
];

export const ASCENT_STANDARD = {
  eyebrow: "The contest format",
  title: "Individual entry. Team rounds.",
  body: "Ascent starts with an individual online qualifier, followed by team-based optimization rounds and a planned in-person finale in Mumbai. The contest platform has the full format, eligibility, and schedule.",
  linkLabel: "Read the Ascent format",
  linkHref: "https://ascent.amshq.in",
} as const;

export const ASCENT_CTA = {
  title: "Ascent '26 registration is open.",
  body: "Entry is free and closes on 20 October 2026. Round 1 runs online on 24 October.",
  buttonLabel: "Register for Ascent",
  buttonHref: "https://ascent.amshq.in/register",
} as const;
