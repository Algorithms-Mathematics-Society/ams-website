import { createPageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/sections/FaqList";
import { PageHeader } from "@/components/ui/PageHeader";
import { FAQ, FAQ_PAGE } from "@/content/faq";
import { faqPageJsonLd } from "@/content/seo";

export const metadata = createPageMetadata({
  title: "Frequently asked questions",
  description:
    "Answers about AMS, Derive and Ascent eligibility, the Access assessment platform, competition partners, and working with AMS.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(FAQ)} />
      <PageHeader
        eyebrow={FAQ_PAGE.eyebrow}
        title={FAQ_PAGE.title}
        body={FAQ_PAGE.body}
      />
      <FaqList />
    </>
  );
}
