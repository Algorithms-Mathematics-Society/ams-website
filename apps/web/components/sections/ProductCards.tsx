import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PRODUCTS, PRODUCTS_SECTION } from "@/content/products";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./HomeTop.module.css";

/** Compare the two disciplines; partnership is a separate audience path. */
export function ProductCards() {
  const competitions = PRODUCTS.filter((product) => product.audience === "competitor");
  const partnership = PRODUCTS.find((product) => product.audience === "partner");
  return (
    <section id="competitions" aria-labelledby="programs-heading" className={neutral.section}>
      <Container>
        <Reveal className={styles.programHeading}>
          <div>
            <h2 id="programs-heading" className={`${neutral.title} ${styles.sectionTitle}`}>{PRODUCTS_SECTION.title}</h2>
          </div>
          <Link className={neutral.textLink} href={PRODUCTS_SECTION.action.href}>{PRODUCTS_SECTION.action.label}</Link>
        </Reveal>
        <ul className={styles.programs}>
          {competitions.map((product) => (
            <li key={product.name} className={styles.programItem}>
              <Reveal className={styles.programReveal}>
                <article className={styles.program}>
                  <p className={styles.classification}>{product.classification}</p>
                  <h3 className={styles.programTitle}>{product.name}</h3>
                  <p className={styles.programBody}>{product.purpose}</p>
                  <p className={styles.evidence}>{product.evidence}</p>
                  <Link href={product.href} className={neutral.textLink}>
                    {product.actionLabel}<span aria-hidden="true"> →</span>
                  </Link>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
        {partnership && (
          <Reveal className={styles.partnerRoute}>
            <div>
              <h3 className={styles.partnerTitle}>{PRODUCTS_SECTION.partnerHeading}</h3>
              <p className={neutral.body}>{PRODUCTS_SECTION.partnerBody}</p>
            </div>
            <Link href={partnership.href} className={neutral.textLink}>{partnership.actionLabel}<span aria-hidden="true"> →</span></Link>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
