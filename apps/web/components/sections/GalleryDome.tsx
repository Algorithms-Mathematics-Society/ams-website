import Link from "next/link";
import DomeGallery from "@/components/gallery/DomeGallery";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GALLERY } from "@/content/gallery";

/**
 * Block 07 on home: the proof gallery as a dark photo planetarium. A
 * near-full-height espresso band; the dome drifts slowly while idle and
 * its radial fades resolve into the band's own ground. The /gallery page
 * keeps the flat grid and lightbox as the accessible, no-JS-friendly
 * archive of the same twelve moments.
 */
export function GalleryDome() {
  const images = GALLERY.filter((item) => item.src).map((item) => ({
    src: item.src as string,
    alt: item.label,
  }));

  return (
    <section className="relative bg-espresso">
      {/* Heading floats over the band's top; pointer-events pass through
          so drags beside the text still reach the dome. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-14 lg:pt-16">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Moments from AMS"
                title="It happened. Here's proof."
                inverse
              />
              <p className="text-sm text-cream-light/60">
                Drag to look around · click a photo to open it
              </p>
            </div>
          </Reveal>
        </Container>
      </div>

      {/* The planetarium: fades and blend resolve into the espresso
          ground (overlayBlurColor matches bg-espresso exactly). fitBasis
          min ties the radius to the band's height, which is what makes
          the sphere read as round instead of a wide barrel. */}
      <div className="relative h-[85svh] min-h-[560px] w-full overflow-hidden">
        <DomeGallery
          images={images}
          overlayBlurColor="#453333"
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
            className="text-sm font-medium text-cream-light underline-offset-4 hover:text-gold-bright hover:underline"
          >
            See the full gallery <span aria-hidden>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
