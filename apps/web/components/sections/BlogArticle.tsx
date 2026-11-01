import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BLOG_PAGE } from "@/content/blog";
import type { BlogPost } from "@/lib/blog";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Blog.module.css";
interface Props { post: BlogPost; }
export function BlogArticle({ post }: Props) {
  const authorHref = post.author === "Tilak Jain" ? "/team#tilak-jain" : post.author === "AMS Team" ? "/team" : undefined;
  return (
    <article aria-labelledby="article-title">
      <header className={styles.articleHeader}><Container size="reading">
        <Link href="/blog" className={neutral.textLink}><span aria-hidden="true">← </span>{BLOG_PAGE.backLabel}</Link>
        <h1 id="article-title" className={styles.articleTitle}>{post.title}</h1>
        <p className={styles.body}>{post.description}</p>
        <div className={styles.meta}>
          {authorHref ? <Link href={authorHref} rel="author" className={`${neutral.textLink} ${styles.authorLink}`}>{post.author}</Link> : <span>{post.author}</span>}
          <time dateTime={post.pubDate.toISOString()}>{post.pubDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time>
          {post.updatedDate && <span>{BLOG_PAGE.updatedLabel} <time dateTime={post.updatedDate.toISOString()}>{post.updatedDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time></span>}
        </div>
      </Container></header>
      <Container size="reading"><div className={styles.articleCover}>
        <Image src={post.cover.full} alt={post.cover.alt} fill priority fetchPriority="high"
          sizes="(min-width: 768px) 704px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)" />
      </div></Container>
      <div className={styles.reading}><Container size="reading">
        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        <Link href="/blog" className={`${neutral.textLink} ${styles.body}`}><span aria-hidden="true">← </span>{BLOG_PAGE.backLabel}</Link>
      </Container></div>
    </article>
  );
}
