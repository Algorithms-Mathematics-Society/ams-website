export interface Product {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  screenshotLabel: string;
  /** Optional slot tint; Ascent's glacier tone is a quiet sub-brand cue. */
  tone?: "glacier";
}

export const PRODUCTS: Product[] = [
  {
    eyebrow: "Derive",
    title: "The quant contest.",
    body: "Probability, markets, and mathematical reasoning under the clock.",
    href: "/derive",
    screenshotLabel:
      "Screenshot · Derive contest page, live timer visible · real UI only",
  },
  {
    eyebrow: "Ascent",
    title: "The systems contest.",
    body: "C++, optimization, and performance engineering. Winter edition.",
    href: "/ascent",
    screenshotLabel:
      "Screenshot · Ascent leaderboard, real standings · real UI only",
    tone: "glacier",
  },
  {
    eyebrow: "Access",
    title: "The platform.",
    body: "Proctored assessments benchmarked against India's competitive elite.",
    href: "/access",
    screenshotLabel:
      "Screenshot · Access proctored exam view (Tauri app) · real UI only",
  },
];
