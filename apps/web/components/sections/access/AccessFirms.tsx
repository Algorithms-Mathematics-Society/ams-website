import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ACCESS_FIRMS } from "@/content/access";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Access.module.css";

export function AccessFirms() {
  return (
    <section id={ACCESS_FIRMS.id} className={styles.section} aria-labelledby="partnership-competitions">
      <Container>
        <Reveal>
          <h2 id="partnership-competitions" className={styles.heading}>{ACCESS_FIRMS.title}</h2>
          <p className={`${styles.body} ${styles.intro}`}>{ACCESS_FIRMS.body}</p>
        </Reveal>
        <div className={styles.competitions}>
          {ACCESS_FIRMS.opportunities.map((opportunity) => (
            <article key={opportunity.name} className={styles.competition}>
              <p className={styles.kicker}>{opportunity.status}</p>
              <h3>{opportunity.name}</h3>
              <p className={styles.competitionFocus}>{opportunity.focus}</p>
              <dl className={styles.details}>
                {opportunity.details.map((detail) => (
                  <div key={detail.label}>
                    <dt>{detail.label}</dt>
                    <dd className={styles.body}>{detail.body}</dd>
                  </div>
                ))}
              </dl>
              <Link href={opportunity.link.href} className={`${neutral.textLink} ${styles.link}`}>{opportunity.link.label}</Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
