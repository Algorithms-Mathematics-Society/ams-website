import { UPDATES_LINK } from "@/content/updates";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ASCENT_CTA } from "@/content/ascent";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Ascent.module.css";

export function AscentClosing() {
  return (
    <section className={`${neutral.section} ${styles.closing}`} aria-labelledby="ascent-next">
      <Container className={styles.closingLayout}>
        <div className={styles.closingCopy}>
          <h2 id="ascent-next" className={`${neutral.title} ${styles.heading}`}>{ASCENT_CTA.title}</h2>
          <p className={`${neutral.body} ${styles.body} ${styles.intro}`}>{ASCENT_CTA.body}</p>
        </div>
        <div className={styles.actions}>
          <Link className={`${neutral.primary} ${styles.button}`} href={ASCENT_CTA.buttonHref}>{ASCENT_CTA.buttonLabel}</Link>
          <Link className={neutral.textLink} href={`${UPDATES_LINK.href}?topic=ascent`}>{UPDATES_LINK.label}</Link>
          <a className={neutral.textLink} href={ASCENT_CTA.support.href}>{ASCENT_CTA.support.label}</a>
        </div>
      </Container>
    </section>
  );
}
