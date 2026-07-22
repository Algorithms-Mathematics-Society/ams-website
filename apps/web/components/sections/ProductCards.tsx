import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRODUCTS, type Product } from "@/content/products";

const linkBase =
  "group flex h-full min-w-0 flex-col p-4 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-gold-deep sm:p-5";

function ProductMedia({ product }: { product: Product }) {
  if (product.media.type === "identity") {
    return (
      <div className="flex aspect-[640/427] min-w-0 flex-col justify-between overflow-hidden rounded-media bg-ascent/10 p-5 text-ascent sm:p-6">
        <span className="font-display text-3xl leading-none sm:text-4xl">
          {product.eyebrow}
        </span>
        <ul
          className="flex flex-wrap gap-2"
          aria-label={`${product.eyebrow} focus areas`}
        >
          {product.media.facts.map((fact) => (
            <li
              key={fact}
              className="rounded-control border border-ascent/20 bg-cream-light/70 px-2.5 py-1 text-xs font-medium"
            >
              {fact}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const isAccess = product.media.fit === "contain";

  return (
    <div
      className={`relative min-w-0 overflow-hidden rounded-media ${isAccess ? "aspect-[43/26] bg-espresso" : "aspect-[640/427]"}`}
    >
      <Image
        fill
        src={product.media.src}
        alt={product.media.alt}
        sizes={
          isAccess
            ? "(min-width: 1280px) 600px, (min-width: 1024px) 55vw, calc(100vw - 72px)"
            : "(min-width: 1280px) 500px, (min-width: 768px) calc(50vw - 64px), calc(100vw - 64px)"
        }
        className={isAccess ? "object-contain" : "object-cover"}
      />
    </div>
  );
}

function ExploreCue() {
  return (
    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-burgundy">
      Explore
      <span
        aria-hidden
        className="transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
      >
        →
      </span>
    </span>
  );
}

/** One segmented panel states the two-contest and one-platform taxonomy. */
export function ProductCards() {
  return (
    <section className="py-section">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What we run"
            title="Two contests and a platform."
          />
        </Reveal>

        <Reveal className="mt-12">
          <ul className="grid overflow-hidden rounded-panel border border-burgundy/12 bg-cream-light md:grid-cols-2">
            {PRODUCTS.map((product) => {
              const isPlatform = product.kind === "platform";

              return (
                <li
                  key={product.eyebrow}
                  className={`min-w-0 ${isPlatform ? "md:col-span-2" : "border-b border-burgundy/12 first:md:border-r"}`}
                >
                  <Link
                    href={product.href}
                    className={`${linkBase} ${isPlatform ? "lg:grid lg:grid-cols-12 lg:items-center lg:gap-8" : ""}`}
                  >
                    <div className={isPlatform ? "min-w-0 lg:col-span-7" : "min-w-0"}>
                      <ProductMedia product={product} />
                    </div>
                    <div
                      className={`flex min-w-0 flex-1 flex-col pt-5 ${isPlatform ? "lg:col-span-5 lg:pt-0" : ""}`}
                    >
                      <Eyebrow>{product.eyebrow}</Eyebrow>
                      <h3 className="mt-3 font-display text-card-title text-burgundy">
                        {product.title}
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed">
                        {product.body}
                      </p>
                      <ExploreCue />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
