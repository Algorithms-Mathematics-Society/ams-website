import { BlogCard } from "@/components/ui/BlogCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BLOG_PAGE } from "@/content/blog";
import { getAllPosts } from "@/lib/blog";

interface Props {
  /** Off on /blog, where the PageHeader already introduces the grid. */
  withHeading?: boolean;
}

export async function BlogGrid({ withHeading = true }: Props) {
  const posts = await getAllPosts();
  if (posts.length === 0) return null;

  return (
    <section className="py-section">
      <Container>
        {withHeading && (
          <Reveal>
            <SectionHeading eyebrow={BLOG_PAGE.eyebrow} title={BLOG_PAGE.title} />
          </Reveal>
        )}
        <ul className={`grid gap-6 sm:grid-cols-2 ${withHeading ? "mt-12" : ""}`}>
          {posts.map((post, index) => {
            const isFirstVisibleCard = !withHeading && index === 0;
            const card = (
              <BlogCard
                href={`/blog/${post.slug}`}
                title={post.title}
                description={post.description}
                tags={post.tags}
                image={{ src: post.cover.full, alt: post.cover.alt }}
                author={post.author}
                authorImage={post.authorImage}
                date={post.pubDate.toISOString()}
                dateLabel={post.pubDate.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                headingLevel={withHeading ? 3 : 2}
                readLabel={BLOG_PAGE.readLabel}
                priority={isFirstVisibleCard}
              />
            );
            return (
              <li key={post.slug} className="min-w-0 h-full">
                {isFirstVisibleCard ? card : (
                  <Reveal delay={Math.min(index * 80, 240)} className="h-full">
                    {card}
                  </Reveal>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
