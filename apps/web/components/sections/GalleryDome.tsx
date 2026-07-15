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
  }));

  return (
    <section className="border-y border-ink/10 bg-paper py-section">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow>{GALLERY_DOME.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-section text-burgundy">
            {GALLERY_DOME.title}
          </h2>
          <p className="mt-6 max-w-md leading-relaxed">{GALLERY_DOME.body}</p>
          {/* The rail closes the way the founder letter does: the gold rule
              draws, then the line it underwrites. Reveal's fade runs 0.7s,
              so the rule starts a beat later at 800ms. */}
          <div
            className="underline-draw mt-9 h-0.5 w-9 bg-gold"
            style={{ transitionDelay: "800ms" }}
            aria-hidden
          />
          {/* Only true where the dome can be turned. html.js is stamped
              before paint, so no-JS visitors get the archive link instead
              of an instruction that would not work for them. */}
          <p className="mt-4 hidden text-sm text-ink/80 js:block">
            {GALLERY_DOME.hint}
          </p>
          <Link
            href={GALLERY_DOME.link.href}
            className="mt-5 inline-block text-sm font-medium text-burgundy underline-offset-4 hover:text-gold-deep hover:underline"
          >
            {GALLERY_DOME.link.label} <span aria-hidden>→</span>
          </Link>
        </Reveal>

        {/* The column, not the viewport, sizes the dome now: fitBasis width
            keys the radius to the cell's width, so the cell's height is free
            to hug the sphere instead of leaving a void under it. Fewer
            segments keep the prints their old size at the smaller radius,
            and the low padFactor stops the shorter cell from shrinking the
            opened photo. Opening a print darkens this cell rather than the
            page, so the cell is rounded and the opened sizes leave a mat:
            the print reads as laid on a viewing plate, not as a dark box
            cut into the spread. */}
        <div className="relative h-[56svh] min-h-[380px] w-full overflow-hidden rounded-2xl lg:col-span-7 lg:h-[500px]">
          <DomeGallery
            images={images}
            overlayBlurColor="#ede6d6"
            grayscale={false}
            fitBasis="width"
            fit={0.7}
            minRadius={340}
            padFactor={0.1}
            segments={24}
            maxVerticalRotationDeg={9}
            dragSensitivity={25}
            autoRotateDegPerSec={3}
            imageBorderRadius="12px"
            openedImageBorderRadius="16px"
            openedImageWidth="min(460px, 74vw)"
            openedImageHeight="min(345px, 55vw)"
          />
        </div>
      </Container>
    </section>
  );
}
