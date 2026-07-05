import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ } from "@/content/faq";
import { faqPageJsonLd } from "@/content/seo";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "What AMS is, how Derive and Ascent work, what the Access platform does, who backs AMS, and who can compete.",
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(FAQ)} />
      <PageHeader
        eyebrow="FAQ"
        title="Straight answers."
        body="What AMS is, how the contests work, and how firms plug in."
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
