import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ASCENT_STANDARD } from "@/content/ascent";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Ascent.module.css";

export function AscentStandard() {
  return (
    <section id="ascent-format" className={`${neutral.section} ${neutral.subtle}`} aria-labelledby="ascent-rounds">
      <Container className={styles.format}>
        <Reveal>
          <h2 id="ascent-rounds" className={`${neutral.title} ${styles.heading}`}>{ASCENT_STANDARD.title}</h2>
          <p className={`${neutral.body} ${styles.body} ${styles.intro}`}>{ASCENT_STANDARD.body}</p>
          <p className={`${neutral.body} ${styles.body} ${styles.scoring}`}>{ASCENT_STANDARD.scoring}</p>
          <p className={styles.note}>{ASCENT_STANDARD.note}</p>
          <Link href={ASCENT_STANDARD.linkHref} className={`${neutral.textLink} ${styles.link}`}>{ASCENT_STANDARD.linkLabel}</Link>
        </Reveal>
        <ol className={styles.rounds}>
          {ASCENT_STANDARD.rounds.map((round) => (
            <li key={round.number}>
              <Reveal className={styles.round}>
                <span aria-hidden="true" className={styles.number}>{round.number}</span>
                <div>
                  <h3>{round.title}</h3>
                  <p className={styles.date}>{round.date}</p>
                  <p className={styles.setting}>{round.setting}</p>
                  <p className={`${neutral.body} ${styles.body}`}>{round.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
