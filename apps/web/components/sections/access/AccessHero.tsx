import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ACCESS_HERO } from "@/content/access";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Access.module.css";

export function AccessHero() {
  return (
    <section className={styles.hero} aria-labelledby="partnerships-title">
      <Container className={styles.heroGrid}>
        <div>
          <p className={styles.kicker}>{ACCESS_HERO.eyebrow}</p>
          <h1 id="partnerships-title" className={styles.heroTitle}>{ACCESS_HERO.title}</h1>
          <p className={styles.body}>{ACCESS_HERO.body}</p>
          <div className={styles.actions}>
            <a className={`${neutral.primary} ${styles.button}`} href={ACCESS_HERO.primaryLink.href}>{ACCESS_HERO.primaryLink.label}</a>
            <Link className={`${neutral.textLink} ${styles.link}`} href={ACCESS_HERO.secondaryLink.href}>{ACCESS_HERO.secondaryLink.label}</Link>
          </div>
        </div>
        <figure>
          <div className={styles.photo}>
            <Image src={ACCESS_HERO.image.src} alt={ACCESS_HERO.image.alt} fill priority fetchPriority="high"
              sizes="(min-width: 1280px) 580px, (min-width: 1024px) calc(50vw - 60px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)" />
          </div>
          <figcaption className={styles.caption}>{ACCESS_HERO.photoCaption}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
