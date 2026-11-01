import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ACCESS_FIRMS } from "@/content/access";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Access.module.css";

export function AccessEvidence() {
  const evidence = ACCESS_FIRMS.evidence;
  return (
    <section className={styles.evidence} aria-labelledby="partnership-evidence">
      <Container className={styles.evidenceGrid}>
        <div>
          <p className={styles.kicker}>{evidence.label}</p>
          <h2 id="partnership-evidence" className={styles.evidenceTitle}>{evidence.title}</h2>
        </div>
        <div>
          <p className={styles.body}>{evidence.body}</p>
          <Link href={evidence.link.href} className={`${neutral.textLink} ${styles.link}`}>{evidence.link.label}</Link>
        </div>
      </Container>
    </section>
  );
}
