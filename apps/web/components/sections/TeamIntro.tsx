import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TEAM_PAGE, TEAM_STORY } from "@/content/team";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Team.module.css";

export function TeamIntro() {
  return (
    <section className={styles.intro}>
      <Container className={styles.introLayout}>
        <div>
          <p className={styles.kicker}>{TEAM_PAGE.eyebrow}</p>
          <h1 className={styles.title}>{TEAM_PAGE.title}</h1>
          <p className={styles.body}>{TEAM_PAGE.body}</p>
        </div>
        <div className={styles.work}>
          <h2 className={styles.workHeading}>{TEAM_STORY.workLabel}</h2>
          <dl>
            {TEAM_STORY.work.map(item => <div key={item.name} className={styles.workRow}>
              <dt><Link href={item.href} className={`${neutral.textLink} ${styles.workLink}`}>{item.name}<span aria-hidden="true"> →</span></Link></dt>
              <dd>{item.detail}</dd>
            </div>)}
          </dl>
        </div>
      </Container>
    </section>
  );
}
