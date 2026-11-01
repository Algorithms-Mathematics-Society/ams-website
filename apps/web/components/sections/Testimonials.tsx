import { Container } from "@/components/ui/Container";
import { TESTIMONIALS, TESTIMONIALS_SECTION } from "@/content/testimonials";
import styles from "./Testimonials.module.css";

const ordered = [...TESTIMONIALS].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

/** Approved feedback describes this edition's experience, not promised outcomes. */
export function Testimonials() {
  return (
    <section aria-labelledby="participant-record-heading" className={styles.section}>
      <Container>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>{TESTIMONIALS_SECTION.eyebrow}</p>
            <h2 id="participant-record-heading" className={styles.title}>{TESTIMONIALS_SECTION.title}</h2>
          </div>
          <p className={styles.note}>{TESTIMONIALS_SECTION.note}</p>
        </header>
        <ul className={styles.quotes}>
          {ordered.map((item) => (
            <li key={item.name} className={styles.item}>
              <figure className={styles.figure}>
                <blockquote className={styles.quote}>
                  <p>&ldquo;{item.quote}&rdquo;</p>
                </blockquote>
                <figcaption className={styles.caption}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.detail}>{item.detail}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className={styles.editingNote}>{TESTIMONIALS_SECTION.editingNote}</p>
      </Container>
    </section>
  );
}
