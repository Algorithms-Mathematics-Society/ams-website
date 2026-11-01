import { Container } from "@/components/ui/Container";
import { TEAM, TEAM_PAGE, TEAM_STORY } from "@/content/team";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Team.module.css";

export function TeamGrid() {
  return (
    <section className={styles.roster} aria-label={TEAM_PAGE.rosterLabel}>
      <Container>
        <h2 className={styles.rosterTitle}>{TEAM_STORY.teamTitle}</h2>
        <p className={`${styles.body} ${styles.teamIntroduction}`}>{TEAM_STORY.teamBody}</p>
        <ul className={styles.grid}>
          {TEAM.filter(member => member.id !== TEAM_STORY.founderId).map(member => (
            <li key={member.id} id={member.id} className={styles.member}>
              <article className={styles.profile} aria-labelledby={`${member.id}-name`}>
                <div className={styles.identityText}>
                    <h3 id={`${member.id}-name`} className={styles.name}>{member.name}</h3>
                    <p className={styles.role}>
                      <span>{member.role.split(" · ")[0]}</span>
                      {member.role.includes(" · ") && <> <span className={styles.scope}>{member.role.split(" · ").slice(1).join(" · ")}</span></>}
                    </p>
                    {member.affiliation && <p className={styles.affiliation}>{member.affiliation}</p>}
                </div>
                {member.bio && <p className={styles.bio}>{member.bio}</p>}
                {member.profile && <div className={styles.profileLink}>
                  <a href={member.profile.href} className={`${neutral.textLink} ${styles.link}`}>{member.profile.label}<span aria-hidden="true"> ↗</span></a>
                </div>}
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
