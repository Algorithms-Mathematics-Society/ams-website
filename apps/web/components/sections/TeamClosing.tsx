import { Container } from "@/components/ui/Container";
import { TEAM_PAGE } from "@/content/team";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Team.module.css";

export function TeamClosing() {
  const cta = TEAM_PAGE.cta;
  return (
    <section className={styles.closing} aria-labelledby="team-contribute">
      <Container className={styles.closingLayout}>
        <div>
          <h2 id="team-contribute" className={styles.heading}>{cta.title}</h2>
          <p className={styles.body}>{cta.body}</p>
        </div>
        <div className={styles.actions}>
          <a href={cta.buttonHref} className={`${neutral.primary} ${styles.button}`}>{cta.buttonLabel}</a>
          <a href={cta.emailHref} className={`${neutral.textLink} ${styles.link}`}>{cta.emailLabel}</a>
        </div>
      </Container>
    </section>
  );
}
