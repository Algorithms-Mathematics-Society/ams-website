import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getReleasedProblems } from "@/lib/monthly";
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
    "/updates",
    "/blog",
    "/blog/contribute",
    "/monthly",
  ].map((path) => ({ url: new URL(path || "/", SITE.url).toString() }));

  const posts = await getAllPosts();
  const postPaths = posts.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: post.updatedDate ?? post.pubDate,
  }));

  // Released problems only: the loader drops or rejects anything not yet due.
  const problems = await getReleasedProblems();
  const monthlyPaths = problems.flatMap((problem) => [
    { url: `${SITE.url}/monthly/${problem.number}`, lastModified: problem.releaseAt },
    ...(problem.solution
      ? [{ url: `${SITE.url}/monthly/${problem.number}/solution`, lastModified: problem.solution.solutionAt }]
      : []),
  ]);

  return [...staticPaths, ...postPaths, ...monthlyPaths];
}
