export interface Product {
  index: string;
  name: string;
  classification: string;
  purpose: string;
  evidence: string;
  href: string;
}

export const PRODUCTS_SECTION = {
  eyebrow: "Contests and assessments",
  title: "Find your place at AMS.",
  action: { label: "How to take part", href: "/faq" },
} as const;

/** The AMS program taxonomy. Claims are mirrored from the program pages. */
export const PRODUCTS = [
  {
    index: "01",
    name: "Derive",
    classification: "National quant contest",
    purpose: "Timed problems in probability, markets, and mathematical reasoning.",
    evidence: "2,500+ participants · 150 advanced · 50 qualified · 33 competed",
    href: "/derive",
  },
  {
    index: "02",
    name: "Ascent",
    classification: "National systems contest",
    purpose: "Timed challenges in C++, optimization, and performance engineering.",
    evidence: "Round 1: 24 October 2026 · Free entry",
    href: "/ascent",
  },
  {
    index: "03",
    name: "Access",
    classification: "Assessments for hiring teams",
    purpose: "Proctored assessments with candidate results and session records for hiring teams.",
    evidence: "Desktop application · readiness checks · session records",
    href: "/access",
  },
] satisfies readonly Product[];
