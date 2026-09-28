import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ } from "@/content/faq";

export function FaqList() {
  return (
    <section className="pt-8 pb-section">
      <Container size="reading">
        <dl className="divide-y divide-burgundy/15 border-y border-burgundy/15">
          {FAQ.map((item, index) => (
            <Reveal key={item.question} delay={Math.min(index * 40, 200)} className="py-7">
              <dt className="text-lg font-semibold text-burgundy">{item.question}</dt>
              <dd className="mt-3 leading-relaxed">
                <p>{item.answer}</p>
                {item.links && (
                  <ul className="mt-3 flex flex-wrap gap-x-6">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-burgundy underline underline-offset-4">
                          {link.label} <span aria-hidden>→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
