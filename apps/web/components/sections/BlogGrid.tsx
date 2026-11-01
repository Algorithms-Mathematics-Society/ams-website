import { BlogCard } from "@/components/ui/BlogCard";
import { Container } from "@/components/ui/Container";
import { BLOG_PAGE } from "@/content/blog";
import { getAllPosts } from "@/lib/blog";

import styles from "./Blog.module.css";

export async function BlogGrid() {
  const posts = await getAllPosts();
  if (posts.length === 0) return null;

  return (
    <section className={styles.gridSection} aria-label={BLOG_PAGE.articlesLabel}>
      <Container>
        <ul className={styles.grid}>
          {posts.map((post, index) => {
            const isFirstVisibleCard = index === 0;
            const card = (
              <BlogCard
                href={`/blog/${post.slug}`}
                title={post.title}
                description={post.description}
                tags={post.tags.slice(0, 2)}
                image={{ src: post.cover.full, alt: post.cover.alt }}
                author={post.author}
                authorImage={post.authorImage}
                date={post.pubDate.toISOString()}
                dateLabel={post.pubDate.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                headingLevel={2}
                readLabel={BLOG_PAGE.readLabel}
                priority={isFirstVisibleCard}
              />
            );
            return (
              <li key={post.slug} className="min-w-0 h-full">
                {card}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
