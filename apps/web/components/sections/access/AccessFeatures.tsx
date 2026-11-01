import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ACCESS_EVALUATION } from "@/content/access";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Access.module.css";

export function AccessFeatures() {
  return (
    <section id="assessments" className={`${styles.section} ${styles.assessment}`} aria-labelledby="assessment-title">
      <Container>
        <Reveal className={styles.assessmentGrid}>
          <div>
            <p className={styles.kicker}>{ACCESS_EVALUATION.eyebrow}</p>
            <h2 id="assessment-title" className={styles.heading}>{ACCESS_EVALUATION.title}</h2>
          </div>
          <div>
            <p className={styles.body}>{ACCESS_EVALUATION.body}</p>
            <dl className={styles.topics}>
              {ACCESS_EVALUATION.considerations.map(item => <div key={item.title}>
                <dt>{item.title}</dt><dd className={styles.body}>{item.body}</dd>
              </div>)}
            </dl>
            <p className={`${styles.body} ${styles.intro}`}>{ACCESS_EVALUATION.enquiry}</p>
            <a href={ACCESS_EVALUATION.link.href} className={`${neutral.primary} ${styles.assessmentAction}`}>{ACCESS_EVALUATION.link.label}</a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
