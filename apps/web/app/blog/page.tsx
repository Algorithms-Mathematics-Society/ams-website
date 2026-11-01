import { createPageMetadata } from "@/lib/metadata";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { BlogClosing } from "@/components/sections/BlogClosing";
import { BlogIntro } from "@/components/sections/BlogIntro";
import styles from "@/components/sections/Blog.module.css";

export const metadata = createPageMetadata({
  title: "Notes from AMS",
  description:
    "Read about AMS, its competitions, and the work behind Derive, Ascent, and the Access assessment platform.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div data-blog-page className={styles.page}>
      <BlogIntro />
      <BlogGrid />
      <BlogClosing />
    </div>
  );
}
