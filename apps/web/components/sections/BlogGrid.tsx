import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllPosts } from "@/lib/blog";

interface Props {
  /** Off on /blog, where the PageHeader already introduces the grid. */
  withHeading?: boolean;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Same resting-card language as ProductCards: the whole card is the tap
 *  target, only transform animates on hover. */
const cardBase =
  "group flex h-full flex-col overflow-hidden rounded-xl border border-burgundy/10 bg-cream-light shadow-[0_1px_3px_rgba(70,64,58,0.06)] transition-transform duration-150 hover:-translate-y-1 focus-visible:-translate-y-1";

export async function BlogGrid({ withHeading = true }: Props) {
  const posts = await getAllPosts();
  if (posts.length === 0) return null;

  return (
    <section className="py-section">
      <Container>
        {withHeading && (
          <Reveal>
            <SectionHeading eyebrow="Blog" title="AMS Blogs" />
          </Reveal>
        )}

        <ul
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${withHeading ? "mt-12" : ""}`}
        >
          {posts.map((post, index) => (
            <li key={post.slug} className="h-full">
              <Reveal delay={Math.min(index * 80, 240)} className="h-full">
                <Link href={`/blog/${post.slug}`} className={cardBase}>
                  <div className="relative aspect-[1200/630] w-full overflow-hidden">
                    <Image
                      src={post.cover.thumb}
                      alt={post.cover.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    {post.tags.length > 0 && (
                      <ul className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full bg-gold/10 px-2.5 py-1 text-xs font-semibold tracking-wide text-gold-deep uppercase"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                    <h3 className="mt-3 font-display text-card-title text-burgundy">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed">
                      {post.description}
                    </p>
                    <div className="mt-auto flex items-center gap-2.5 pt-6 text-sm text-ink/70">
                      {post.authorImage && (
                        <Image
                          src={post.authorImage}
                          alt=""
                          width={28}
                          height={28}
                          className="rounded-full"
                        />
                      )}
                      <span className="font-medium text-ink">
                        {post.author}
                      </span>
                      <span aria-hidden>·</span>
                      <time dateTime={post.pubDate.toISOString()}>
                        {formatDate(post.pubDate)}
                      </time>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
