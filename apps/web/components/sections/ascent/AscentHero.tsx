import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ASCENT_CTA, ASCENT_HERO } from "@/content/ascent";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./AscentHero.module.css";

export function AscentHero() {
  return (
    <section className={styles.hero} aria-labelledby="ascent-heading">
      <Container className={styles.layout}>
        <div className={styles.copy}>
          <p className={neutral.eyebrow}>{ASCENT_HERO.eyebrow}</p>
          <h1 id="ascent-heading" className={styles.title}>
            {ASCENT_HERO.title}
          </h1>
          <p className={styles.introduction}>{ASCENT_HERO.body}</p>
          <div className={`${neutral.actions} ${styles.actions}`}>
            <Link href={ASCENT_CTA.buttonHref} className={`${neutral.primary} ${styles.primary}`}>
              {ASCENT_CTA.buttonLabel}
            </Link>
            <Link href={ASCENT_HERO.secondaryAction.href} className={`${neutral.textLink} ${styles.secondary}`}>
              {ASCENT_HERO.secondaryAction.label}
            </Link>
          </div>
        </div>
        <aside className={styles.panel} aria-labelledby="ascent-status">
          <div className={styles.status}>
            <p className={styles.label}>{ASCENT_HERO.statusLabel}</p>
            <h2 id="ascent-status" className={styles.statusTitle}>{ASCENT_HERO.status}</h2>
            <p className={styles.detail}>{ASCENT_HERO.statusDetail}</p>
          </div>
          <div className={styles.focus}>
            <h3 className={styles.label}>{ASCENT_HERO.focusLabel}</h3>
            <ul className={styles.focusList}>
              {ASCENT_HERO.focusAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </aside>
      </Container>
    </section>
  );
}
