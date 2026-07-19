import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://amshq.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "",
    "/derive",
    "/ascent",
    "/access",
    "/gallery",
    "/team",
    "/faq",
    "/blog",
  ].map((path) => ({ url: `${BASE}${path}` }));

  const posts = await getAllPosts();
  const postPaths = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.pubDate,
  }));

  return [...staticPaths, ...postPaths];
}
