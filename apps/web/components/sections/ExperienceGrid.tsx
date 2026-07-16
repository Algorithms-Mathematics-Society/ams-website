import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EXPERIENCE } from "@/content/experience";

/**
 * Per-tile layout on the 12-col grid (lg+). Uniform tiles read as a stock
 * grid, so the sizes vary with meaning: the recruiter proof point leads wide,
 * the debate sits beside it, and the room runs full width as a banner, wide
 * because it is a room. Below lg the tiles stack.
 */
const TILES = [
  {
    span: "lg:col-span-7",
    height: "lg:h-80",
    sizes: "(min-width: 1024px) 60vw, 92vw",
  },
  {
    span: "lg:col-span-5",
    height: "lg:h-80",
    sizes: "(min-width: 1024px) 42vw, 92vw",
  },
  {
    span: "lg:col-span-12",
    height: "lg:h-72",
    sizes: "(min-width: 1024px) 95vw, 92vw",
  },
];

/**
 * Block 06: full-burgundy band resetting the page rhythm. The
 * .experience-band-timeline class drives the body's cream-to-burgundy
 * scroll-driven shift (Task 1); without support the band alone is burgundy,
 * the correct static fallback. The photos run as an asymmetric mosaic with
 * their captions set over the image on a scrim, so the band reads as framed
 * moments in a room rather than a third card row.
 */
export function ExperienceGrid() {
  return (
    <section className="experience-band-timeline bg-burgundy py-section text-cream-light">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The experience"
            title="Inside the finals."
            inverse
          />
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {EXPERIENCE.map((item, index) => {
            const tile = TILES[index] ?? TILES[TILES.length - 1];
            return (
              <li key={item.title} className={tile.span}>
                <Reveal delay={index * 120}>
                  <div
                    className={`group relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-[16/9] lg:aspect-auto ${tile.height}`}
                  >
                    <Image
                      src={item.photo.src}
                      alt={item.photo.alt}
                      fill
                      sizes={tile.sizes}
                      className="object-cover"
                    />
                    {/* Scrim carries the caption's legibility regardless of
                        the photo behind it; darkest at the bottom where the
                        text sits. */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                      <h3 className="font-display text-card-title text-cream-light">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-cream-light/90">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
