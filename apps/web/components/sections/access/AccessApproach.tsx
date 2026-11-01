import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ACCESS_APPROACH } from "@/content/access";
import { TESTIMONIALS, TESTIMONIALS_SECTION } from "@/content/testimonials";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Access.module.css";

export function AccessApproach() {
  const feedback = TESTIMONIALS.find(item => item.featured);
  return (
    <section className={styles.section} aria-labelledby="partnership-approach">
      <Container className={styles.approachGrid}>
        <div>
          <h2 id="partnership-approach" className={styles.heading}>{ACCESS_APPROACH.title}</h2>
          <p className={`${styles.body} ${styles.intro}`}>{ACCESS_APPROACH.body}</p>
          <dl className={styles.topics}>
            {ACCESS_APPROACH.criteria.map(item => <div key={item.title}>
              <dt>{item.title}</dt><dd className={styles.body}>{item.body}</dd>
            </div>)}
          </dl>
        </div>
        {feedback && <aside className={styles.feedback} aria-label={ACCESS_APPROACH.evidenceLabel}>
          <p className={styles.kicker}>{ACCESS_APPROACH.evidenceLabel}</p>
          <figure>
            <blockquote className={styles.feedbackQuote}><p>&ldquo;{feedback.quote}&rdquo;</p></blockquote>
            <figcaption className={styles.feedbackAttribution}>{feedback.name}<span>{feedback.detail}</span></figcaption>
          </figure>
          <p className={styles.caption}>{ACCESS_APPROACH.evidenceNote}<br />{TESTIMONIALS_SECTION.editingNote}</p>
          <Link href={ACCESS_APPROACH.link.href} className={neutral.textLink}>{ACCESS_APPROACH.link.label}</Link>
        </aside>}
      </Container>
    </section>
  );
}
