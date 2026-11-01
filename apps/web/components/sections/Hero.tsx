import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { HOME_HERO } from "@/content/homeHero";
import styles from "./HomeTop.module.css";

export function Hero() {
  return (
    <section aria-labelledby="home-heading" className={styles.hero}>
      <Image
        src={HOME_HERO.image.src}
        alt={HOME_HERO.image.alt}
        fill
        priority
        fetchPriority="high"
        quality={75}
        sizes="(min-width: 1024px) 92vw, 100vw"
        className={styles.heroPhoto}
      />
      <Container className={styles.heroStage}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>{HOME_HERO.eyebrow}</p>
          <h1 id="home-heading" className={styles.headline}>
            {HOME_HERO.headline.map((line) => (
              <span className={styles.headlineLine} key={line}>{line}{" "}</span>
            ))}
          </h1>
          <p className={styles.introduction}>{HOME_HERO.body}</p>
          <div className={styles.heroActions}>
            <Link className={styles.heroPrimary} href={HOME_HERO.primaryAction.href}>
              {HOME_HERO.primaryAction.label}<span aria-hidden="true">→</span>
            </Link>
            <Link className={styles.partnerLink} href={HOME_HERO.secondaryAction.href}>
              {HOME_HERO.secondaryAction.label}
            </Link>
          </div>
        </div>
        <div className={styles.sceneCaption}>
          <p>{HOME_HERO.image.context}</p>
          <Link href={HOME_HERO.galleryLink.href}>
            {HOME_HERO.galleryLink.label}<span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
