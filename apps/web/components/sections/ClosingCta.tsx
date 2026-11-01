import { UPDATES_LINK } from "@/content/updates";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CLOSING_CTA } from "@/content/cta";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./HomeStory.module.css";

/** End with useful next steps tailored to the visitor's intent. */
export function ClosingCta() {
  return (
    <section aria-labelledby="next-edition-heading" className={`${neutral.section} ${styles.closing}`}>
      <Container>
        <Reveal>
          <h2 id="next-edition-heading" className={`${neutral.title} ${styles.heading}`}>{CLOSING_CTA.headline}</h2>
        </Reveal>
        <div className={styles.nextSteps}>
          {CLOSING_CTA.paths.map((path) => (
            <Reveal key={path.title} className={styles.nextStep}>
              <h3>{path.title}</h3>
              <p className={neutral.body}>{path.body}</p>
              <div className={styles.nextActions}><Link href={path.href} className={path.primary ? neutral.primary : neutral.secondary}>{path.label}</Link>
              {"assessment" in path && <Link href={path.assessment.href} className={neutral.textLink}>{path.assessment.label}</Link>}
              {path.primary && <Link href={UPDATES_LINK.href} className={neutral.textLink}>{UPDATES_LINK.label}</Link>}</div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
