import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { STATS, STATS_HEADING, STATS_LINK, STATS_NOTE } from "@/content/stats";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./HomeTop.module.css";

export function StatsBand() {
  return (
    <section aria-labelledby="stats-heading" className={styles.stats}>
      <Container>
        <div className={styles.statsHeading}>
          <h2 id="stats-heading">{STATS_HEADING}</h2>
          <Link className={neutral.textLink} href={STATS_LINK.href}>{STATS_LINK.label}</Link>
        </div>
        <dl className={styles.statsGrid}>
          {STATS.map((stat) => (
            <div className={styles.stat} key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.statsNote}>{STATS_NOTE}</p>
      </Container>
    </section>
  );
}
