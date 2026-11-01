export interface Product {
  index: string;
  audience: "competitor" | "partner";
  actionLabel: string;
  name: string;
  classification: string;
  purpose: string;
  evidence: string;
  href: string;
}

export const PRODUCTS_SECTION = {
  title: "Our competitions",
  partnerHeading: "Recruiting and sponsorship",
  partnerBody: "Contact AMS about supporting a competition or meeting participants working on quantitative and systems problems.",
  action: { label: "Participation FAQs", href: "/faq" },
} as const;

/** The AMS program taxonomy. Claims are mirrored from the program pages. */
export const PRODUCTS = [
  {
    index: "01",
    audience: "competitor",
    actionLabel: "Explore Derive",
    name: "Derive",
    classification: "National quant contest",
    purpose: "Work through probability, markets, and mathematical reasoning in a timed quantitative contest.",
    evidence: "Derive '26: 2,500+ participants · 33 competed in the IIT Bombay finals",
    href: "/derive",
  },
  {
    index: "02",
    audience: "competitor",
    actionLabel: "Explore Ascent",
    name: "Ascent",
    classification: "National systems contest",
    purpose: "Write and optimize C++ where execution time, memory use, and implementation choices matter.",
    evidence: "C++ · Optimization · Performance engineering",
    href: "/ascent",
  },
  {
    index: "03",
    audience: "partner",
    actionLabel: "Explore partnerships",
    name: "Partner with AMS",
    classification: "Competition sponsorship",
    purpose: "Partner on Ascent or a future Derive edition, and meet people working on systems and quantitative problems.",
    evidence: "Competition sponsorship · Recruiting conversations",
    href: "/access",
  },
] satisfies readonly Product[];
