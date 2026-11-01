import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DERIVE_SUBJECTS } from "@/content/derive";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Derive.module.css";

export function DeriveSubjects() {
  return (
    <section className={neutral.section} aria-labelledby="derive-subjects">
      <Container>
        <Reveal><h2 id="derive-subjects" className={`${neutral.title} ${styles.heading}`}>{DERIVE_SUBJECTS.title}</h2></Reveal>
        <ul className={styles.grid}>
          {DERIVE_SUBJECTS.items.map((item) => (
            <li key={item.title} className={styles.subject}>
              <Reveal><h3>{item.title}</h3><p className={`${neutral.body} ${styles.body}`}>{item.body}</p></Reveal>
            </li>
          ))}
        </ul>
        <p className={styles.note}>{DERIVE_SUBJECTS.note}</p>
        <Link href={DERIVE_SUBJECTS.link.href} className={`${neutral.textLink} ${styles.link}`}>{DERIVE_SUBJECTS.link.label}</Link>
      </Container>
    </section>
  );
}
