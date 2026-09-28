import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PRODUCTS, PRODUCTS_SECTION } from "@/content/products";

/** Three routes through AMS: quantitative contests, systems contests, and assessments. */
export function ProductCards() {
  return (
    <section className="bg-cream-light py-section">
      <Container>
        <Reveal className="grid gap-7 border-b border-burgundy/15 pb-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <Eyebrow>{PRODUCTS_SECTION.eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-xl text-section font-medium tracking-[-0.04em] text-burgundy">
              {PRODUCTS_SECTION.title}
            </h2>
          </div>
          <Button href={PRODUCTS_SECTION.action.href} variant="outline">
            {PRODUCTS_SECTION.action.label}
          </Button>
        </Reveal>

        <ul className="grid border-b border-burgundy/15 md:grid-cols-3">
          {PRODUCTS.map((product, index) => (
            <li
              key={product.name}
              className="min-w-0 border-b border-burgundy/15 md:border-r md:border-b-0 md:last:border-r-0"
            >
              <Reveal delay={index * 80}>
                <Link
                  href={product.href}
                  className="group flex min-h-[21rem] flex-col px-1 py-9 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold-deep md:px-8 "
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.18em] text-gold-deep">
                      {product.index}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-xl text-burgundy transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </div>
                  <div className="mt-auto pt-9">
                    <p className="text-xs font-bold tracking-[0.14em] text-ink/75 uppercase">
                      {product.classification}
                    </p>
                    <h3 className="mt-4 text-3xl font-medium tracking-[-0.035em] text-burgundy">
                      {product.name}
                    </h3>
                    <p className="mt-4 max-w-sm leading-7 text-ink/75">
                      {product.purpose}
                    </p>
                    <p className="mt-7 border-t border-burgundy/15 pt-4 text-xs leading-5 text-ink/65">
                      {product.evidence}
                    </p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
