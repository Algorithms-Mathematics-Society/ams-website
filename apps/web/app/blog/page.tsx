import { createPageMetadata } from "@/lib/metadata";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { BLOG_PAGE } from "@/content/blog";

export const metadata = createPageMetadata({
  title: "Notes from AMS",
  description:
    "Read about AMS, its competitions, and the work behind Derive, Ascent, and the Access assessment platform.",
  path: "/blog",
});

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
