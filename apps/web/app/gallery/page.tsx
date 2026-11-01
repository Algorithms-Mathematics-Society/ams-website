import { createPageMetadata } from "@/lib/metadata";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { GalleryClosing } from "@/components/sections/GalleryClosing";
import { GalleryIntro } from "@/components/sections/GalleryIntro";
import styles from "@/components/ui/GalleryBrowser.module.css";

export const metadata = createPageMetadata({
  title: "Gallery: Derive '26 at IIT Bombay",
  description:
    "Photographs from the Derive '26 finals at IIT Bombay in July 2026: the competition, conversations between rounds, and prize presentations.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <div data-gallery-page className={styles.page}>
      <GalleryIntro />
      <GalleryGrid />
      <GalleryClosing />
    </div>
  );
}
