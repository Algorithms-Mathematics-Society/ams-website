import Link from "next/link";
import DomeGallery from "@/components/gallery/DomeGallery";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { GALLERY, GALLERY_DOME } from "@/content/gallery";

/**
 * Block 07 on home: the proof gallery as prints on a paper ground, set as
 * an editorial spread. The caption rail reads on the left and the dome
 * turns on the right, mirroring the founder letter's photo-left split one
 * section up so the page alternates instead of repeating. The dome's radial
 * fades resolve into the section's own paper (overlayBlurColor matches
 * bg-paper exactly), so the photographs read as prints on a desk, not a
 * dark room: the closing CTA stays the page's only dark photo environment
 * after the hero. The /gallery page keeps the flat grid and lightbox as the
 * accessible, no-JS archive of the same twelve moments.
 */
export function GalleryDome() {
  const images = GALLERY.filter((item) => item.src).map((item) => ({
    src: item.src as string,
    alt: item.label,
    full: item.full,
  }));

  return (
    <section className="border-y border-ink/10 bg-paper py-section">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Rail kept lean: the eyebrow, the claim, one line, and the archive
            link. The gold sign-off rule the founder letter earns is dropped
            here (it would fire between two utility lines), and the drag hint
            moves onto the dome, next to the thing it describes. */}
        <Reveal className="lg:col-span-5">
          <Eyebrow>{GALLERY_DOME.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-section text-burgundy">
            {GALLERY_DOME.title}
          </h2>
          <p className="mt-6 max-w-md leading-relaxed">{GALLERY_DOME.body}</p>
          <Link
            href={GALLERY_DOME.link.href}
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-burgundy underline-offset-4 hover:text-gold-deep hover:underline"
          >
            {GALLERY_DOME.link.label} <span aria-hidden>→</span>
          </Link>
        </Reveal>

        {/* The column, not the viewport, sizes the dome: fitBasis width keys
            the radius to the cell's width, so the cell's height is free to
            hug the sphere. minRadius is a low floor now, so on a phone the
            width-derived radius governs instead of being clamped up until
            the sphere overflows its cell. Opening a print is a full-screen
            moment (the viewer is fixed), unbounded by this cell. */}
        <div className="lg:col-span-7">
          <div className="relative h-[56svh] min-h-[380px] w-full overflow-hidden lg:h-[500px]">
            <DomeGallery
              images={images}
              overlayBlurColor="#ede6d6"
              grayscale={false}
              fitBasis="width"
              fit={0.7}
              minRadius={240}
              padFactor={0.1}
              segments={24}
              maxVerticalRotationDeg={9}
              dragSensitivity={25}
              autoRotateDegPerSec={3}
              imageBorderRadius="12px"
              openedImageBorderRadius="16px"
              openedImageWidth="min(1040px, 88vw)"
              openedImageHeight="min(780px, 76svh)"
            />
          </div>
          {/* Docked to the dome, not stranded in the rail. Only shown where
              the dome can actually be turned: html.js gates it, so no-JS
              visitors get the archive link instead of a dead instruction. */}
          <p className="mt-4 hidden text-center text-xs tracking-wide text-ink/55 js:block">
            {GALLERY_DOME.hint}
          </p>
        </div>
      </Container>
    </section>
  );
}
