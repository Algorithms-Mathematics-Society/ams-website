export interface Product {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  screenshotLabel: string;
  /** Contests are siblings (timed events); the platform is year-round and
   *  renders differently, so the layout states the 2+1 the heading names. */
  kind: "contest" | "platform";
  /** Optional slot tint; Ascent's glacier tone is a quiet sub-brand cue. */
  tone?: "glacier";
}

export const PRODUCTS: Product[] = [
  {
    eyebrow: "Derive",
    title: "The quant contest.",
    body: "Probability, markets, and mathematical reasoning under the clock.",
    href: "/derive",
    kind: "contest",
    screenshotLabel:
      "Screenshot · Derive contest page, live timer visible · real UI only",
  },
  {
    eyebrow: "Ascent",
    title: "The systems contest.",
    body: "C++, optimization, and performance engineering. Winter edition.",
    href: "/ascent",
    kind: "contest",
    screenshotLabel:
      "Screenshot · Ascent leaderboard, real standings · real UI only",
    tone: "glacier",
  },
  {
    eyebrow: "Access",
    title: "The platform.",
    body: "Proctored assessments benchmarked against India's competitive elite.",
    href: "/access",
    kind: "platform",
    screenshotLabel:
      "Screenshot · Access proctored exam view (Tauri app) · real UI only",
  },
];
