import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  TESTIMONIALS,
  TESTIMONIALS_SECTION,
  type Testimonial,
} from "@/content/testimonials";

const featured = TESTIMONIALS.find((t) => t.featured) ?? TESTIMONIALS[0];
const supporting = TESTIMONIALS.filter((t) => t !== featured);

function Attribution({ item }: { item: Testimonial }) {
  return (
    <figcaption className="mt-6 border-t border-burgundy/10 pt-4">
      <span className="block text-sm font-semibold text-burgundy">{item.name}</span>
      <span className="mt-1 block text-sm leading-5 text-ink/80">
        {item.detail}
      </span>
    </figcaption>
  );
}

/**
 * Block 08: one segmented proof panel. The most specific testimonial leads,
 * with two supporting accounts beside it on desktop and beneath it on mobile.
 * Opaque cells and quiet rules reset the page to a paper-like reading surface.
 */
export function Testimonials() {
  return (
    <section className="bg-cream py-section">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={TESTIMONIALS_SECTION.eyebrow}
            title={TESTIMONIALS_SECTION.title}
          />

          <ul className="mt-10 grid gap-px overflow-hidden rounded-panel border border-burgundy/12 bg-burgundy/12 sm:mt-12 lg:grid-cols-12 lg:grid-rows-2">
            <li className="min-w-0 bg-cream-light p-5 sm:p-7 lg:col-span-7 lg:row-span-2 lg:p-10">
              <figure>
                <blockquote className="font-display text-xl leading-snug text-ink sm:text-2xl lg:text-[1.75rem]">
                  <p className="break-words">&ldquo;{featured.quote}&rdquo;</p>
                </blockquote>
                <Attribution item={featured} />
              </figure>
            </li>

            {supporting.map((item) => (
              <li
                key={item.quote}
                className="min-w-0 bg-cream-light p-5 sm:p-7 lg:col-span-5 lg:p-8"
              >
                <figure>
                  <blockquote className="text-base leading-relaxed text-ink/90">
                    <p className="break-words">&ldquo;{item.quote}&rdquo;</p>
                  </blockquote>
                  <Attribution item={item} />
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
