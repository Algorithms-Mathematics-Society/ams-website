import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/content/testimonials";

export function Testimonials() {
  return (
    <section className="py-section">
      <Container>
        <SectionHeading
          eyebrow="What competitors say"
          title="Real names. Real colleges."
        />

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <li
              key={testimonial.quote}
              className="rounded-xl border border-burgundy/10 bg-cream-light p-7"
            >
              <figure>
                <figcaption className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className="flex size-14 shrink-0 items-center justify-center rounded-full border border-dashed border-ink/30 bg-placeholder text-[9px] tracking-widest text-ink/50 uppercase"
                  >
                    Photo
                  </span>
                  <span>
                    <span className="block font-display font-semibold text-burgundy">
                      {testimonial.name}
                    </span>
                    <span className="block text-sm text-ink/70">
                      {testimonial.detail}
                    </span>
                  </span>
                </figcaption>
                <blockquote className="mt-6 text-sm leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
