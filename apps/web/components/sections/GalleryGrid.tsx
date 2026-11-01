import { GalleryBrowser } from "@/components/ui/GalleryBrowser";
import { Container } from "@/components/ui/Container";
import { GALLERY, GALLERY_PAGE, GALLERY_ARCHIVE_ORDER } from "@/content/gallery";
import styles from "@/components/ui/GalleryBrowser.module.css";

/** Explicit editorial sequence; home placements remain independent. */
const items = GALLERY_ARCHIVE_ORDER.flatMap(slug => GALLERY.filter(item => item.src?.endsWith(`/${slug}.webp`)));
export function GalleryGrid() {
  return (
    <section className={styles.photos} aria-label={GALLERY_PAGE.collectionLabel}>
      <Container><GalleryBrowser items={items} /></Container>
    </section>
  );
}
