import type { Metadata } from "next";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { GALLERY_PAGE } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Moments from AMS contests and finals: Derive '26 at IIT Bombay, shot during Convergence.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow={GALLERY_PAGE.eyebrow}
        title={GALLERY_PAGE.title}
        body={GALLERY_PAGE.body}
      />
      <GalleryGrid withHeading={false} />
      <CtaBand {...GALLERY_PAGE.cta} />
    </>
  );
}
