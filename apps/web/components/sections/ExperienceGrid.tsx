import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EXPERIENCE } from "@/content/experience";

/**
 * Block 06: full-burgundy band resetting the page rhythm. The
 * .experience-band-timeline class drives the body's cream-to-burgundy
 * scroll-driven shift (Task 1); without support the band alone is
 * burgundy, which is the correct static fallback.
 */
export function ExperienceGrid() {
  return (
    <section className="experience-band-timeline bg-burgundy py-section text-cream-light">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The experience"
            title="Not told. Shown."
            inverse
          />
        </Reveal>

        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCE.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 120}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={item.photo.src}
                    alt={item.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-cream-light">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-light/85">
                  {item.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
