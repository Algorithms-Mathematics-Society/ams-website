import { ACCESS_HERO } from "@/content/access";

interface ProductImageMedia {
  type: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
  fit: "cover" | "contain";
}

interface ProductIdentityMedia {
  type: "identity";
  facts: readonly string[];
}

export interface Product {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  /** Contests are siblings; the platform renders as the full-width segment. */
  kind: "contest" | "platform";
  media: ProductImageMedia | ProductIdentityMedia;
}

export const PRODUCTS = [
  {
    eyebrow: "Derive",
    title: "The quant contest.",
    body: "Probability, markets, and mathematical reasoning under the clock.",
    href: "/derive",
    kind: "contest",
    media: {
      type: "image",
      src: "/images/derive26/thumb/contest-in-progress.webp",
      alt: "Derive finalists working at laptops in a lecture hall at IIT Bombay",
      width: 640,
      height: 427,
      fit: "cover",
    },
  },
  {
    eyebrow: "Ascent",
    title: "The systems contest.",
    body: "C++, optimization, and performance engineering. Winter edition.",
    href: "/ascent",
    kind: "contest",
    media: {
      type: "identity",
      facts: ["Winter edition", "C++", "Optimization", "Performance engineering"],
    },
  },
  {
    eyebrow: "Access",
    title: "The platform.",
    body: "Proctored assessments benchmarked against India's competitive elite.",
    href: "/access",
    kind: "platform",
    media: {
      type: "image",
      ...ACCESS_HERO.image,
      fit: "contain",
    },
  },
] satisfies readonly Product[];
