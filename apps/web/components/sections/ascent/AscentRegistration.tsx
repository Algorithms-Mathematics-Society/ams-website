import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ASCENT_REGISTRATION } from "@/content/ascent";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Ascent.module.css";

export function AscentRegistration() {
  return (
    <section className={neutral.section} aria-labelledby="ascent-participation">
      <Container>
        <Reveal>
          <h2 id="ascent-participation" className={`${neutral.title} ${styles.heading}`}>{ASCENT_REGISTRATION.title}</h2>
          <dl className={styles.facts}>
            {ASCENT_REGISTRATION.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt>{fact.label}</dt><dd className={`${neutral.body} ${styles.body}`}>{fact.detail}</dd>
              </div>
            ))}
          </dl>
          <ul className={styles.links}>
            {ASCENT_REGISTRATION.links.map((link) => (
              <li key={link.href}><Link href={link.href} className={neutral.textLink}>{link.label}</Link></li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
