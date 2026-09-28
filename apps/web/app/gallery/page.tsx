import { createPageMetadata } from "@/lib/metadata";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import { GalleryIntro } from "@/components/sections/GalleryIntro";
import { GALLERY_PAGE } from "@/content/gallery";

export const metadata = createPageMetadata({
  title: "Gallery: Derive '26 at IIT Bombay",
  description:
    "Photographs from the Derive '26 finals at IIT Bombay in July 2026: the competition, conversations between rounds, and prize presentations.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <GalleryIntro />
      <GalleryGrid withHeading={false} />
      <CtaBand {...GALLERY_PAGE.cta} />
    </>
  );
}
