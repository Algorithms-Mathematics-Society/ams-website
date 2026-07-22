export interface Product {
  index: string;
  name: string;
  classification: string;
  purpose: string;
  evidence: string;
  href: string;
}

/** The AMS program taxonomy. Claims are mirrored from the program pages. */
export const PRODUCTS = [
  {
    index: "01",
    name: "Derive",
    classification: "National quant contest",
    purpose: "Probability, markets, and mathematical reasoning under the clock.",
    evidence: "2,500+ participants · 150 advanced · 50 qualified · 33 competed",
    href: "/derive",
  },
  {
    index: "02",
    name: "Ascent",
    classification: "National systems contest",
    purpose: "C++, optimization, and performance engineering under the clock.",
    evidence: "Winter edition · dates announced soon",
    href: "/ascent",
  },
  {
    index: "03",
    name: "Access",
    classification: "Assessment infrastructure",
    purpose: "Proctored assessments benchmarked against AMS contest populations.",
    evidence: "Native desktop shell · seven readiness checks · audit trail",
    href: "/access",
  },
] satisfies readonly Product[];
