import { createPageMetadata } from "@/lib/metadata";
import { ContributeIntro } from "@/components/sections/ContributeIntro";
import { ContributeGuide } from "@/components/sections/ContributeGuide";
import { BlogClosing } from "@/components/sections/BlogClosing";
import { CONTRIBUTE } from "@/content/contribute";
import styles from "@/components/sections/Blog.module.css";

export const metadata = createPageMetadata({
  title: CONTRIBUTE.metaTitle,
  description: CONTRIBUTE.metaDescription,
  path: "/blog/contribute",
});

export default function ContributePage() {
  return (
    <div data-blog-page className={styles.page}>
      <ContributeIntro />
      <ContributeGuide />
      <BlogClosing />
    </div>
  );
}
