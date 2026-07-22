import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/seo/JsonLd";
import { BLOG_PAGE } from "@/content/blog";
import { blogPostingJsonLd } from "@/content/seo";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.pubDate.toISOString(),
      images: [{ url: post.cover.full, width: 1200, height: 630, alt: post.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      images: [post.cover.full],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post)} />

      <section className="pt-section pb-4">
        <Container className="max-w-3xl">
          <Eyebrow>{BLOG_PAGE.eyebrow}</Eyebrow>
          <h1 className="mt-6 font-sans text-hero font-semibold tracking-[-0.04em] text-burgundy">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink/70">
            {post.authorImage && (
              <Image
                src={post.authorImage}
                alt=""
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span className="font-medium text-ink">{post.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.pubDate.toISOString()}>
              {formatDate(post.pubDate)}
            </time>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-control border border-gold-deep/30 px-2.5 py-1 text-xs font-semibold tracking-wide text-gold-deep uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-4">
        <Container className="max-w-3xl">
          <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-media border border-burgundy/20">
            <Image
              src={post.cover.full}
              alt={post.cover.alt}
              fill
              priority
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="pt-8 pb-section">
        <Container className="max-w-3xl">
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Container>
      </section>

      <CtaBand {...BLOG_PAGE.cta} />
    </>
  );
}
