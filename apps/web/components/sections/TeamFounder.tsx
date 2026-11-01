import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TEAM, TEAM_STORY } from "@/content/team";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Team.module.css";

export function TeamFounder() {
  const founder = TEAM.find(member => member.id === TEAM_STORY.founderId);
  if (!founder) return null;
  return (
    <section id={founder.id} className={styles.founder} aria-labelledby={`${founder.id}-name`}>
      <Container>
        <article className={styles.founderLayout}>
          <div>
            <p className={styles.kicker}>{founder.role}</p>
            <h2 id={`${founder.id}-name`} className={styles.founderName}>{founder.name}</h2>
            {founder.affiliation && <p className={styles.affiliation}>{founder.affiliation}</p>}
          </div>
          <div className={styles.founderCopy}>
            <p className={`${styles.body} ${styles.founderBio}`}>{founder.bio}</p>
            <p className={`${styles.body} ${styles.founderContext}`}>{TEAM_STORY.founderContext}</p>
            <div className={styles.founderLinks}>
              <Link href={TEAM_STORY.founderEssay.href} className={`${neutral.textLink} ${styles.link}`}>{TEAM_STORY.founderEssay.label}<span aria-hidden="true"> →</span></Link>
              {founder.profile && <a href={founder.profile.href} className={`${neutral.textLink} ${styles.link}`}>{founder.profile.label}<span aria-hidden="true"> ↗</span></a>}
            </div>
          </div>

        </article>
      </Container>
    </section>
  );
}
