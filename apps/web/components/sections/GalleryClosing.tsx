import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GALLERY_PAGE } from "@/content/gallery";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "@/components/ui/GalleryBrowser.module.css";

export function GalleryClosing() {
  return (
    <section className={styles.closing}>
      <Container className={styles.closingLayout}>
        <div><h2>{GALLERY_PAGE.cta.title}</h2><p className={styles.body}>{GALLERY_PAGE.cta.body}</p></div>
        <Link href={GALLERY_PAGE.cta.buttonHref} className={`${neutral.primary} ${styles.button}`}>{GALLERY_PAGE.cta.buttonLabel}</Link>
      </Container>
    </section>
  );
}
