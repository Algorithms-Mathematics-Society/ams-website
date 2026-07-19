import type { Metadata } from "next";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { BLOG_PAGE } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Recaps, problem walkthroughs, and notes on how the next AMS contest edition is shaping up.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow={BLOG_PAGE.eyebrow}
        title={BLOG_PAGE.title}
        body={BLOG_PAGE.body}
      />
      <BlogGrid withHeading={false} />
      <CtaBand {...BLOG_PAGE.cta} />
    </>
  );
}
