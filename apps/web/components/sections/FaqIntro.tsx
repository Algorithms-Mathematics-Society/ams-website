import { Container } from "@/components/ui/Container";
import { FAQ_PAGE } from "@/content/faq";
import styles from "./Faq.module.css";

export function FaqIntro() {
  return (
    <section className={styles.intro} aria-labelledby="faq-heading">
      <Container size="reading">
        <p className={styles.kicker}>{FAQ_PAGE.eyebrow}</p>
        <h1 id="faq-heading" className={styles.title}>{FAQ_PAGE.title}</h1>
        <p className={styles.body}>{FAQ_PAGE.body}</p>
      </Container>
    </section>
  );
}
