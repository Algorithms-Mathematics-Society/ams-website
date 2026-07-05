import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRODUCTS } from "@/content/products";

export function ProductCards() {
  return (
    <section className="py-section">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What we run"
            title="Three instruments, one standard."
          />
        </Reveal>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {PRODUCTS.map((product, index) => (
            <li key={product.eyebrow} className="h-full">
              <Reveal
                delay={index * 90}
                className="flex h-full flex-col rounded-xl border border-burgundy/10 bg-cream-light p-5"
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
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
