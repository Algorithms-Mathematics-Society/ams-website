import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/content/testimonials";

export function Testimonials() {
  return (
    <section className="py-section">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What competitors say"
            title="Real names. Real colleges."
          />
        </Reveal>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <li key={testimonial.quote} className="h-full">
              <Reveal
                delay={index * 90}
                className="h-full rounded-xl border border-burgundy/10 bg-cream-light p-7"
              >
                <figure>
                  <figcaption className="flex items-center gap-4">
                    {/* A drawn figure, not a face: these competitors gave a
                        review, not a photograph. The name beside it carries
                        the attribution, so the glyph is decorative. */}
                    <span
                      aria-hidden
                      className="flex size-14 shrink-0 items-center justify-center rounded-full border border-burgundy/10 bg-placeholder text-burgundy/40"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        className="size-6"
                      >
                        <circle cx="12" cy="8.5" r="3.75" />
                        <path d="M5.25 19.25a6.75 6.75 0 0 1 13.5 0" />
                      </svg>
                    </span>
                    <span>
                      <span className="block font-display font-semibold text-burgundy">
                        {testimonial.name}
                      </span>
                      <span className="block text-sm text-ink/80">
                        {testimonial.detail}
                      </span>
                    </span>
                  </figcaption>
                  <blockquote className="mt-6 text-sm leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
