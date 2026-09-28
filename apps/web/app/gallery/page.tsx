import type { Metadata } from "next";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { GALLERY_PAGE } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Gallery: Derive '26 at IIT Bombay",
  description:
    "Photographs from the Derive '26 finals at IIT Bombay in July 2026: the competition, conversations between rounds, and prize presentations.",
  alternates: { canonical: "/gallery" },
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
