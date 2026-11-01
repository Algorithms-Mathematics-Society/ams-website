import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DERIVE_STAGES, DERIVE_JOURNEY } from "@/content/derive";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Derive.module.css";

export function DeriveJourney() {
  return (
    <section id="derive-format" className={`${neutral.section} ${neutral.subtle}`} aria-labelledby="derive-journey">
      <Container>
        <Reveal>
          <h2 id="derive-journey" className={`${neutral.title} ${styles.heading}`}>{DERIVE_JOURNEY.title}</h2>
          <p className={`${neutral.body} ${styles.body} ${styles.intro}`}>{DERIVE_JOURNEY.body}</p>
        </Reveal>
        <ol className={styles.grid}>
          {DERIVE_STAGES.map((stage) => (
            <li key={stage.title} className={styles.stage}>
              <Reveal>
                <p className={styles.figure}><span className={styles.value}>{stage.stat}</span><span className={styles.label}>{stage.statLabel}</span></p>
                <h3>{stage.title}</h3>
                <p className={`${neutral.body} ${styles.body}`}>{stage.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Link href={DERIVE_JOURNEY.gallery.href} className={`${neutral.textLink} ${styles.link}`}>{DERIVE_JOURNEY.gallery.label}</Link>
      </Container>
    </section>
  );
}
