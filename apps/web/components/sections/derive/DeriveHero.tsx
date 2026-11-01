import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DERIVE_HERO } from "@/content/derive";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./DeriveHero.module.css";

export function DeriveHero() {
  return (
    <section className={styles.hero} aria-labelledby="derive-heading">
      <Container className={styles.layout}>
        <div className={styles.copy}>
          <p className={neutral.eyebrow}>{DERIVE_HERO.eyebrow}</p>
          <h1 id="derive-heading" className={styles.title}>
            {DERIVE_HERO.title}
          </h1>
          <p className={styles.introduction}>{DERIVE_HERO.body}</p>
          <div className={`${neutral.actions} ${styles.actions}`}>
            <Link href={DERIVE_HERO.primaryAction.href} className={`${neutral.primary} ${styles.primary}`}>
              {DERIVE_HERO.primaryAction.label}
            </Link>
            <a href={DERIVE_HERO.archiveLink.href} className={`${neutral.textLink} ${styles.secondary}`}>
              {DERIVE_HERO.archiveLink.label}
            </a>
          </div>
        </div>
        <figure className={styles.figure}>
          <div className={styles.imageFrame}>
            <Image
              src={DERIVE_HERO.image.src}
              alt={DERIVE_HERO.image.alt}
              fill
              priority
              fetchPriority="high"
              quality={75}
              sizes="(min-width: 1280px) 580px, (min-width: 1024px) calc(50vw - 60px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
              className={styles.image}
            />
          </div>
          <figcaption className={styles.caption}>
            {DERIVE_HERO.photoCaption}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
