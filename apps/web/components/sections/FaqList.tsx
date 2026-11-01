import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Disclosure } from "@/components/ui/Disclosure";
import { DisclosureGroup } from "@/components/ui/DisclosureGroup";
import { FAQ } from "@/content/faq";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Faq.module.css";

export function FaqList() {
  return (
    <section className={styles.section}>
      <Container size="reading">
        <div className={styles.list}>
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
                  <ul className={styles.links}>
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <Link className={neutral.textLink} href={link.href}>
                          {link.label}
                        </Link>
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
