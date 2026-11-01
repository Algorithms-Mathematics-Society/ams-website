import { Container } from "@/components/ui/Container";
import { BLOG_PAGE } from "@/content/blog";
import styles from "./Blog.module.css";
export function BlogIntro() {
  return <section className={styles.intro}><Container>
    <p className={styles.kicker}>{BLOG_PAGE.eyebrow}</p>
    <h1 className={styles.title}>{BLOG_PAGE.title}</h1>
    <p className={styles.body}>{BLOG_PAGE.body}</p>
  </Container></section>;
}
