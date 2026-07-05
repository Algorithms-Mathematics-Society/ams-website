import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRODUCTS } from "@/content/products";

export function ProductCards() {
  return (
    <section className="py-section">
      <Container>
        <SectionHeading
          eyebrow="What we run"
          title="Three instruments, one standard."
        />

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <li
              key={product.eyebrow}
              className="flex flex-col rounded-xl border border-burgundy/10 bg-cream-light p-5"
            >
              <PhotoPlaceholder
                label={product.screenshotLabel}
                aspect="aspect-[16/10]"
                rounded="rounded-lg"
              />
              <div className="flex flex-1 flex-col pt-6">
                <Eyebrow>{product.eyebrow}</Eyebrow>
                <h3 className="mt-3 font-display text-card-title text-burgundy">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed">{product.body}</p>
                <Link
                  href={product.href}
                  className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium text-burgundy hover:underline"
                >
                  Explore
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
