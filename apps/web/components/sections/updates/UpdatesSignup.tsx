import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { UpdatesForm } from "@/components/ui/UpdatesForm";
import { UPDATES } from "@/content/updates";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "@/components/ui/UpdatesForm.module.css";

interface Props { endpoint: string; configured: boolean; }
export function UpdatesSignup({ endpoint, configured }: Props) {
  return (
    <section className={styles.section} aria-labelledby="updates-heading">
      <Container className={styles.layout}>
        <div>
          <p className={neutral.eyebrow}>{UPDATES.title}</p>
          <h1 id="updates-heading" className={styles.heading}>{UPDATES.heading}</h1>
          <p className={styles.intro}>{UPDATES.intro}</p>
          <p className={styles.note}>{UPDATES.boundary}</p>
          <Link className={neutral.textLink} href={UPDATES.backHref}>{UPDATES.back}</Link>
        </div>
        <div className={styles.panel}>
          {configured ? <UpdatesForm endpoint={endpoint} /> : <>
            <p className={styles.intro}>{UPDATES.unavailable}</p>
            <a className={`${neutral.primary} ${styles.submit}`} href={UPDATES.emailHref}>{UPDATES.emailLink}</a>
          </>}
        </div>
      </Container>
    </section>
  );
}
