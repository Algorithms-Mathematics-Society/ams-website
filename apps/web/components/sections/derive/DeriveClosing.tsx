import { UPDATES_LINK } from "@/content/updates";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DERIVE_CTA } from "@/content/derive";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Derive.module.css";

export function DeriveClosing() {
  return (
    <section className={`${neutral.section} ${styles.closing}`} aria-labelledby="derive-next">
      <Container className={styles.closingLayout}>
        <div className={styles.closingCopy}>
          <h2 id="derive-next" className={`${neutral.title} ${styles.heading}`}>{DERIVE_CTA.title}</h2>
          <p className={`${neutral.body} ${styles.body} ${styles.intro}`}>{DERIVE_CTA.body}</p>
        </div>
        <div className={styles.actions}>
          <Link href={`${UPDATES_LINK.href}?topic=derive`} className={`${neutral.primary} ${styles.button}`}>{UPDATES_LINK.label}</Link>
          <Link href={DERIVE_CTA.gallery.href} className={neutral.textLink}>{DERIVE_CTA.gallery.label}</Link>
        </div>
      </Container>
    </section>
  );
}
