import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ASCENT_PILLARS, ASCENT_PILLARS_HEADING, ASCENT_SYLLABUS } from "@/content/ascent";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Ascent.module.css";

export function AscentPillars() {
  return (
    <section className={neutral.section} aria-labelledby="ascent-skills">
      <Container>
        <Reveal><h2 id="ascent-skills" className={`${neutral.title} ${styles.heading}`}>{ASCENT_PILLARS_HEADING}</h2></Reveal>
        <ul className={styles.pillars}>
          {ASCENT_PILLARS.map((pillar) => (
            <li key={pillar.title} className={styles.pillar}>
              <Reveal><h3>{pillar.title}</h3><p className={`${neutral.body} ${styles.body}`}>{pillar.body}</p></Reveal>
            </li>
          ))}
        </ul>
        <Link className={`${neutral.textLink} ${styles.link}`} href={ASCENT_SYLLABUS.href}>{ASCENT_SYLLABUS.label}</Link>
      </Container>
    </section>
  );
}
