import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIALS, TESTIMONIALS_SECTION } from "@/content/testimonials";

const featured = TESTIMONIALS.find((t) => t.featured) ?? TESTIMONIALS[0];
const ordered = [featured, ...TESTIMONIALS.filter((item) => item !== featured)];

/** Verified participant accounts presented as a flat, ruled record. */
export function Testimonials() {
  return (
    <section
      aria-labelledby="participant-record-heading"
      className="border-y border-burgundy/15 bg-cream py-section"
    >
      <Container>
        <Reveal>
          <header className="grid gap-6 border-t-2 border-burgundy pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.5fr)] lg:items-end">
            <div>
              <Eyebrow>{TESTIMONIALS_SECTION.eyebrow}</Eyebrow>
              <h2
                id="participant-record-heading"
                className="mt-4 max-w-3xl text-section font-semibold tracking-tight text-burgundy"
              >
                {TESTIMONIALS_SECTION.title}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-ink/75 lg:justify-self-end">
              {TESTIMONIALS_SECTION.note}
            </p>
          </header>

          <ol className="mt-10 grid border-y border-burgundy/20 divide-y divide-burgundy/20 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {ordered.map((item, index) => (
              <li
                key={item.name}
                className="min-w-0 bg-cream-light px-5 py-7 sm:px-7 sm:py-8"
              >
                <figure className="flex h-full flex-col">
                  <p
                    aria-hidden="true"
                    className="text-xs font-semibold tracking-[0.2em] text-gold-deep tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <blockquote className="mt-7 flex-1 text-lg leading-relaxed text-ink">
                    <p className="break-words">&ldquo;{item.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-8 border-t border-burgundy/15 pt-4">
                    <span className="block text-sm font-semibold text-burgundy">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-sm leading-5 text-ink/75">
                      {item.detail}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
