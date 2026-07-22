import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EXPERIENCE } from "@/content/experience";

const MOBILE_IMAGE_SIZES =
  "(min-width: 640px) calc(100vw - 96px), calc(100vw - 64px)";

/**
 * Block 07: a single segmented proof panel inside a full-burgundy band.
 * The lead moment owns the left side on desktop while the two supporting
 * moments stack at right. Below lg, all three return to the same image-first
 * reading order.
 */
export function ExperienceGrid() {
  return (
    <section className="bg-burgundy py-section text-cream-light">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The experience"
            title="Inside the finals."
            inverse
          />

          <ul className="mt-12 grid gap-px overflow-hidden rounded-panel border border-cream-light/30 bg-cream-light/30 lg:grid-cols-12 lg:grid-rows-2">
            {EXPERIENCE.map((item, index) => {
              const isLead = index === 0;

              return (
                <li
                  key={item.title}
                  className={`bg-cream-light ${
                    isLead
                      ? "lg:col-span-7 lg:row-span-2"
                      : "lg:col-span-5"
                  }`}
                >
                  <figure
                    className={`flex h-full flex-col p-3 sm:p-4 ${
                      isLead
                        ? ""
                        : "lg:grid lg:grid-cols-[minmax(0,210px)_1fr] lg:items-center lg:gap-5"
                    }`}
                  >
                    <div className="relative aspect-[640/427] overflow-hidden rounded-media">
                      <Image
                        src={item.photo.src}
                        alt={item.photo.alt}
                        fill
                        sizes={
                          isLead
                            ? `(min-width: 1180px) 590px, (min-width: 1024px) 54vw, ${MOBILE_IMAGE_SIZES}`
                            : `(min-width: 1024px) 210px, ${MOBILE_IMAGE_SIZES}`
                        }
                        className="object-cover"
                      />
                    </div>

                    <figcaption className="pt-4 lg:py-2">
                      <h3 className="font-display text-card-title text-burgundy">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink/80">
                        {item.body}
                      </p>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
