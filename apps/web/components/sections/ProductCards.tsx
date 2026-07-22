import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PRODUCTS } from "@/content/products";

const COLUMNS = "md:grid-cols-[3rem_1fr_1.3fr_1.6fr_2rem]";

/** A directory of AMS programs, classified by role rather than marketed as products. */
export function ProductCards() {
  return (
    <section className="bg-cream py-section">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-0">
          <header className="lg:col-span-4 lg:pr-10">
            <Eyebrow>Program directory</Eyebrow>
            <h2 className="mt-4 max-w-md font-sans text-section font-semibold tracking-[-0.035em] text-burgundy">
              Two national contests. One assessment system.
            </h2>
          </header>

          <div className="min-w-0 lg:col-span-8 lg:border-l lg:border-burgundy/20 lg:pl-10">
            <div
              className={`hidden border-y border-burgundy/25 py-3 text-[0.6875rem] font-semibold tracking-[0.14em] text-ink/65 uppercase md:grid md:gap-5 ${COLUMNS}`}
              aria-hidden="true"
            >
              <span>No.</span>
              <span>Program</span>
              <span>Classification</span>
              <span>Evidence</span>
              <span />
            </div>

            <ul className="border-t border-burgundy/25 md:border-t-0">
              {PRODUCTS.map((product) => (
                <li key={product.name} className="border-b border-burgundy/25">
                  <Link
                    href={product.href}
                    className={`group grid min-h-11 min-w-0 gap-4 py-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold-deep md:items-start md:gap-5 md:py-7 ${COLUMNS}`}
                  >
                    <span className="text-xs font-semibold tracking-[0.16em] text-gold-deep">
                      {product.index}
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-sans text-xl font-semibold tracking-tight text-burgundy">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-ink/80 md:hidden">
                        {product.purpose}
                      </p>
                    </div>

                    <p className="min-w-0 text-sm font-medium leading-6 text-burgundy">
                      <span className="mb-1 block text-[0.6875rem] tracking-[0.14em] text-ink/60 uppercase md:hidden">
                        Classification
                      </span>
                      {product.classification}
                      <span className="mt-2 hidden text-sm font-normal leading-6 text-ink/80 md:block">
                        {product.purpose}
                      </span>
                    </p>

                    <p className="min-w-0 text-sm leading-6 text-ink/80">
                      <span className="mb-1 block text-[0.6875rem] tracking-[0.14em] text-ink/60 uppercase md:hidden">
                        Evidence
                      </span>
                      {product.evidence}
                    </p>

                    <span
                      aria-hidden="true"
                      className="text-lg text-burgundy transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
