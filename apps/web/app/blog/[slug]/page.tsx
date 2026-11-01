import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogArticle } from "@/components/sections/BlogArticle";
import { BlogClosing } from "@/components/sections/BlogClosing";
import { blogPostingJsonLd } from "@/content/seo";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import styles from "@/components/sections/Blog.module.css";
interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    publishedTime: post.pubDate.toISOString(),
    modifiedTime: post.updatedDate?.toISOString(),
    image: { url: post.cover.full, width: 1200, height: 630, alt: post.cover.alt },
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return <div data-blog-page className={styles.page}>
    <JsonLd data={blogPostingJsonLd(post)} />
    <BlogArticle post={post} />
    <BlogClosing />
  </div>;
}
