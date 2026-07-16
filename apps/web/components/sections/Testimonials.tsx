import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS, type Testimonial } from "@/content/testimonials";

const featured = TESTIMONIALS.find((t) => t.featured) ?? TESTIMONIALS[0];
const supporting = TESTIMONIALS.filter((t) => t !== featured);

const cardBase =
  "flex flex-col rounded-xl border border-burgundy/10 bg-cream-light";

/** Attribution set in the "on the record" register the line-of-record uses:
 *  the name in display serif, the role letterspaced in gold. */
function Attribution({ item }: { item: Testimonial }) {
  return (
    <figcaption className="mt-6">
      <span className="block font-display font-semibold text-burgundy">
        {item.name}
      </span>
      <span className="mt-0.5 block text-[11px] font-medium tracking-[0.22em] text-gold-deep uppercase">
        {item.detail}
      </span>
    </figcaption>
  );
}

/**
 * Block 08: social proof, the one section in another voice. Testimony is not
 * interchangeable, so it does not sit in a third equal grid: the most specific
 * verdict leads as a wide pull-quote, the other two support beside it. The
 * quote outranks the name (the section is "In their words"), and an oversized
 * Fraunces quotation mark anchors each card in place of the old avatar glyph,
 * which read as a face that had not loaded. No hover, no rotation: stillness
 * reads as on the record.
 */
export function Testimonials() {
  return (
    <section className="py-section">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What competitors say"
            title="In their words."
          />
        </Reveal>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-12">
          <Reveal className={`${cardBase} p-8 lg:col-span-7`}>
            <figure>
              <span
                aria-hidden
                className="block font-display text-6xl leading-[0.6] text-gold/40"
              >
                &ldquo;
              </span>
              <blockquote className="mt-4 font-display text-2xl leading-snug text-ink lg:text-[1.75rem]">
                {featured.quote}
              </blockquote>
              <Attribution item={featured} />
            </figure>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-5">
            {supporting.map((item, index) => (
              <Reveal
                key={item.quote}
                delay={(index + 1) * 90}
                className={`${cardBase} p-6`}
              >
                <figure>
                  <span
                    aria-hidden
                    className="block font-display text-4xl leading-[0.6] text-gold/40"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="mt-3 text-sm leading-relaxed text-ink">
                    {item.quote}
                  </blockquote>
                  <Attribution item={item} />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
