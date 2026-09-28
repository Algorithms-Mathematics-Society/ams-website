import type { Metadata } from "next";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { BLOG_PAGE } from "@/content/blog";

export const metadata: Metadata = {
  title: "Notes from AMS",
  description:
    "Read about AMS, its competitions, and the work behind Derive, Ascent, and the Access assessment platform.",
  alternates: { canonical: "/blog" },
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
