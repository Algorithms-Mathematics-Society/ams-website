import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT } from "@/content/about";

/**
 * The founder letter (block 04): a human voice after institutional proof.
 * Photo and text fade up independently (photo first, text 200ms later);
 * the gold signature rule draws last, like ink drying.
 */
export function AboutSplit() {
  return (
    <section className="py-section">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image
              src={ABOUT.photo.src}
              alt={ABOUT.photo.alt}
              fill
              sizes="(min-width: 1024px) 44vw, 92vw"
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-xs text-ink/60 italic">
            {ABOUT.photoCaption}
          </p>
        </Reveal>

        <Reveal delay={200} className="lg:pt-6">
          <Eyebrow>{ABOUT.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-section text-burgundy">
            {ABOUT.title}
          </h2>
          <div className="mt-6 space-y-5 leading-relaxed">
            {ABOUT.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10">
            {/* The sign-off appears last: rule draws only after the body
                is fully visible (600ms fade + a beat). */}
            <div
              className="underline-draw h-0.5 w-9 bg-gold"
              style={{ transitionDelay: "800ms" }}
              aria-hidden
            />
            <p className="mt-4 font-display font-semibold text-burgundy">
              · {ABOUT.attribution}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
