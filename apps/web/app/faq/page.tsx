import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ, FAQ_PAGE } from "@/content/faq";
import { faqPageJsonLd } from "@/content/seo";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Answers about AMS, Derive and Ascent eligibility, the Access assessment platform, competition partners, and working with AMS.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(FAQ)} />
      <PageHeader
        eyebrow={FAQ_PAGE.eyebrow}
        title={FAQ_PAGE.title}
        body={FAQ_PAGE.body}
      />
      <section className="pt-8 pb-section">
        <Container className="max-w-3xl lg:max-w-3xl">
          <dl className="divide-y divide-burgundy/10 border-y border-burgundy/10">
            {FAQ.map((item, index) => (
              <Reveal key={item.question} delay={Math.min(index * 40, 200)}>
                <div className="py-7">
                  <dt className="font-display text-lg font-semibold text-burgundy">
                    {item.question}
                  </dt>
                  <dd className="mt-3 leading-relaxed">{item.answer}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
