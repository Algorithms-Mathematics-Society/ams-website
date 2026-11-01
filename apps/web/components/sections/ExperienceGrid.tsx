import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { EXPERIENCE } from "@/content/experience";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./HomeJourney.module.css";

/** An edition recap that makes the sequence readable without repeated imagery. */
export function ExperienceGrid() {
  return (
    <section className={`${neutral.section} ${neutral.subtle}`} aria-labelledby="experience-heading">
      <Container>
        <div className={styles.experience}>
          <Reveal>
            <header>
              <p className={neutral.eyebrow}>{EXPERIENCE.eyebrow}</p>
              <h2 id="experience-heading" className={`${neutral.title} ${styles.heading}`}>{EXPERIENCE.title}</h2>
            </header>
          </Reveal>
          <ol className={styles.stages}>
            {EXPERIENCE.stages.map((stage) => (
              <li key={stage.index}>
                <Reveal className={styles.stage}>
                  <span className={styles.stageNumber} aria-hidden="true">{stage.index}</span>
                  <div>
                    <h3 className={styles.stageTitle}>{stage.title}</h3>
                    <p className={neutral.body}>{stage.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
