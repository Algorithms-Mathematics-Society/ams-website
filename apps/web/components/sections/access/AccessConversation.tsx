import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ACCESS_CONVERSATION } from "@/content/access";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Access.module.css";

export function AccessConversation() {
  return (
    <section id={ACCESS_CONVERSATION.id} className={styles.section} aria-labelledby="partnership-contact">
      <Container className={styles.contactGrid}>
        <Reveal>
          <h2 id="partnership-contact" className={styles.heading}>{ACCESS_CONVERSATION.title}</h2>
          <p className={`${styles.body} ${styles.intro}`}>{ACCESS_CONVERSATION.body}</p>
          <div className={styles.contactActions}>
            <a href={ACCESS_CONVERSATION.contact.href} className={`${neutral.primary} ${styles.button}`}>{ACCESS_CONVERSATION.contact.label}</a>
            <a href={`mailto:${ACCESS_CONVERSATION.contact.email}`} className={`${neutral.textLink} ${styles.link}`}>{ACCESS_CONVERSATION.contact.email}</a>
          </div>
          <dl className={styles.topics}>
            {ACCESS_CONVERSATION.topics.map((topic) => (
              <div key={topic.title}>
                <dt>{topic.title}</dt>
                <dd className={styles.body}>{topic.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal className={styles.process}>
          <h3>{ACCESS_CONVERSATION.nextStepsTitle}</h3>
          <ol>
            {ACCESS_CONVERSATION.nextSteps.map((step) => (
              <li key={step.title}>
                <h4>{step.title}</h4>
                <p className={styles.body}>{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
