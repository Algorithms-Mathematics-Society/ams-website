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
          <p className={styles.body}>{ACCESS_EVALUATION.body}</p>
        </Reveal>
        <ol className={styles.assessmentSteps}>
          {ACCESS_EVALUATION.considerations.map((item, index) => (
            <li key={item.title}>
              <span className={styles.stepNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </li>
          ))}
        </ol>
        <div className={styles.assessmentEnquiry}>
          <p className={styles.body}>{ACCESS_EVALUATION.enquiry}</p>
          <a href={ACCESS_EVALUATION.link.href} className={`${neutral.primary} ${styles.button}`}>{ACCESS_EVALUATION.link.label}</a>
        </div>
      </Container>
    </section>
  );
}
