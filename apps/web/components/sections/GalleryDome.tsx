import Link from "next/link";
import DomeGallery from "@/components/gallery/DomeGallery";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GALLERY } from "@/content/gallery";

/**
 * Block 07 on home: the proof gallery as a draggable photo dome. The
 * /gallery page keeps the flat grid and lightbox as the accessible,
 * no-JS-friendly archive of the same twelve moments; this section links
 * there for anyone who wants the full-size set.
 */
export function GalleryDome() {
  const images = GALLERY.filter((item) => item.src).map((item) => ({
    src: item.src as string,
    alt: item.label,
  }));

  return (
    <section className="bg-cream-light py-section">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Moments from AMS"
              title="It happened. Here's proof."
            />
            <p className="text-sm text-ink/60">
              Drag to look around · click a photo to open it
            </p>
          </div>
        </Reveal>
      </Container>

      {/* Full-bleed dome; height bounded so the page keeps scrolling
          naturally above and below the drag surface. */}
      <div className="relative mt-10 h-[62svh] min-h-[420px] w-full overflow-hidden">
        <DomeGallery
          images={images}
          overlayBlurColor="#fbf8f0"
          grayscale={false}
          imageBorderRadius="12px"
          openedImageBorderRadius="16px"
          openedImageWidth="min(560px, 84vw)"
          openedImageHeight="min(420px, 63vw)"
        />
      </div>

      <Container>
        <div className="mt-8 text-center">
          <Link
            href="/gallery"
            className="text-sm font-medium text-burgundy underline-offset-4 hover:underline"
          >
            See the full gallery <span aria-hidden>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
