import { Container } from "@/components/ui/Container";
import { TEAM_STORY } from "@/content/team";
import styles from "./Team.module.css";

export function TeamVision() {
  const vision = TEAM_STORY.vision;
  return (
    <section className={styles.vision} aria-labelledby="ams-vision">
      <Container className={styles.visionLayout}>
        <div>
          <p className={styles.kicker}>{vision.label}</p>
          <h2 id="ams-vision" className={styles.visionTitle}>{vision.title}</h2>
        </div>
        <div className={styles.visionCopy}>
          {vision.paragraphs.map(paragraph => <p key={paragraph} className={styles.body}>{paragraph}</p>)}
        </div>
      </Container>
    </section>
  );
}
