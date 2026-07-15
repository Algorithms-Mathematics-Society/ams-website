import Link from "next/link";
import DomeGallery from "@/components/gallery/DomeGallery";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GALLERY } from "@/content/gallery";

/**
 * Block 07 on home: the proof gallery as prints scattered on a paper
 * ground. The dome drifts slowly while idle and its radial fades resolve
 * into the band's own paper (overlayBlurColor matches bg-paper exactly),
 * so the photos read as physical prints, not a dark room: the closing
 * CTA is the page's only dark photo environment after the hero. The
 * /gallery page keeps the flat grid and lightbox as the accessible,
 * no-JS-friendly archive of the same twelve moments.
 */
export function GalleryDome() {
  const images = GALLERY.filter((item) => item.src).map((item) => ({
    src: item.src as string,
    alt: item.label,
  }));

  return (
    <section className="relative border-y border-ink/10 bg-paper">
      {/* Heading floats over the band's top; pointer-events pass through
          so drags beside the text still reach the dome. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-14 lg:pt-16">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Moments from AMS"
                title="It happened. Here's proof."
              />
              <p className="text-sm text-ink/55">
                Drag to look around · click a photo to open it
              </p>
            </div>
          </Reveal>
        </Container>
      </div>

      {/* fitBasis min ties the radius to the band's height, which is what
          makes the sphere read as round instead of a wide barrel. */}
      <div className="relative h-[85svh] min-h-[560px] w-full overflow-hidden">
        {/* Guarantees heading and hint legibility over the dome's top
            tiles at every breakpoint; sits above the dome's own fades
            (z 3-5) and below the enlarge viewer (z 20). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[6] h-72 bg-gradient-to-b from-paper from-35% via-paper/80 via-65% to-transparent lg:h-52 lg:from-25%"
        />
        <DomeGallery
          images={images}
          overlayBlurColor="#ede6d6"
          grayscale={false}
          fitBasis="min"
          fit={0.62}
          minRadius={420}
          segments={26}
          maxVerticalRotationDeg={9}
          dragSensitivity={25}
          autoRotateDegPerSec={3}
          imageBorderRadius="12px"
          openedImageBorderRadius="16px"
          openedImageWidth="min(560px, 84vw)"
          openedImageHeight="min(420px, 63vw)"
        />
      </div>

      <Container>
        <div className="pb-10 text-center">
          <Link
            href="/gallery"
            className="text-sm font-medium text-burgundy underline-offset-4 hover:text-gold-deep hover:underline"
          >
            See the full gallery <span aria-hidden>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
