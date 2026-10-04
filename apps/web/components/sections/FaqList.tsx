import { TextLink } from "@/components/ui/TextLink";
import { Container } from "@/components/ui/Container";
import { Disclosure } from "@/components/ui/Disclosure";
import { DisclosureGroup } from "@/components/ui/DisclosureGroup";
import { FAQ } from "@/content/faq";

export function FaqList() {
  return (
    <section className="pt-8 pb-section">
      <Container size="reading">
        <div className="divide-y divide-burgundy/15 border-y border-burgundy/15">
          <DisclosureGroup defaultValue="faq-0">
            {FAQ.map((item, index) => (
              <Disclosure
                key={item.question}
                title={item.question}
                value={`faq-${index}`}
                groupName="ams-faq"
              >
                <p>{item.answer}</p>
                {item.links && (
                  <ul className="mt-3 flex flex-wrap gap-x-6">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <TextLink href={link.href}>
                          {link.label}
                        </TextLink>
                      </li>
                    ))}
                  </ul>
                )}
              </Disclosure>
            ))}
          </DisclosureGroup>
        </div>
      </Container>
    </section>
  );
}
