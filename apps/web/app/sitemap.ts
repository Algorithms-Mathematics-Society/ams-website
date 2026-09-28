import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/content/site";

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
  ].map((path) => ({ url: new URL(path || "/", SITE.url).toString() }));

  const posts = await getAllPosts();
  const postPaths = posts.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: post.pubDate,
  }));

  return [...staticPaths, ...postPaths];
}
