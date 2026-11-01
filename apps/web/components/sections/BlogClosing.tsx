import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BLOG_PAGE } from "@/content/blog";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Blog.module.css";

export function BlogClosing() {
  return (
    <section className={styles.closing} aria-label={BLOG_PAGE.moreLabel}>
      <Container className={styles.closingLayout}>
        <div className={styles.updatesCallout}>
          <h2>{BLOG_PAGE.updates.title}</h2>
          <p>{BLOG_PAGE.updates.body}</p>
          <Link href={BLOG_PAGE.updates.href} className={neutral.primary}>{BLOG_PAGE.updates.label}</Link>
        </div>
        <div className={styles.exploreCallout}>
          <h2>{BLOG_PAGE.cta.title}</h2>
          <p>{BLOG_PAGE.cta.body}</p>
          <Link href={BLOG_PAGE.cta.buttonHref} className={neutral.textLink}>{BLOG_PAGE.cta.buttonLabel}<span aria-hidden="true"> →</span></Link>
        </div>
      </Container>
    </section>
  );
}
