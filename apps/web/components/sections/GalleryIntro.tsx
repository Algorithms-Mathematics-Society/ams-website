import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GALLERY_PAGE } from "@/content/gallery";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "@/components/ui/GalleryBrowser.module.css";

export function GalleryIntro() {
  return (
    <section className={styles.intro}>
      <Container>
        <p className={styles.kicker}>{GALLERY_PAGE.eyebrow}</p>
        <h1 className={styles.title}>{GALLERY_PAGE.title}</h1>
        <div className={styles.details}>
          <div><p className={styles.body}>{GALLERY_PAGE.body}</p><p className={styles.hint}>{GALLERY_PAGE.viewHint}</p></div>
          <Link href={GALLERY_PAGE.editionLink.href} className={neutral.textLink}>{GALLERY_PAGE.editionLink.label}</Link>
        </div>
      </Container>
    </section>
  );
}
