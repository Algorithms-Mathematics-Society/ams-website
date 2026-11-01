import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DERIVE_PARTNERS, DERIVE_PARTNERS_SECTION } from "@/content/derive";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Derive.module.css";

export function DerivePartners() {
  return (
    <section id="partners" className={neutral.section} aria-labelledby="derive-partners">
      <Container>
        <Reveal>
          <h2 id="derive-partners" className={`${neutral.title} ${styles.heading}`}>{DERIVE_PARTNERS_SECTION.title}</h2>
          <p className={`${neutral.body} ${styles.body} ${styles.intro}`}>{DERIVE_PARTNERS_SECTION.body}</p>
        </Reveal>
        <ul className={styles.partners}>
          {DERIVE_PARTNERS.map((partner) => (
            <li key={partner.name}>
              <Reveal className={styles.partner}>
                <p className={styles.tier}>{partner.tier}</p>
                <h3>{partner.name}</h3>
                <div className={styles.logoPanel}>
                  <Image src={partner.logo.src} alt={partner.name} width={partner.logo.width} height={partner.logo.height}
                    sizes={partner.name === "QRT" ? "74px" : "121px"} className={partner.logo.className} />
                </div>
                <p className={`${neutral.body} ${styles.body}`}>{partner.description}</p>
                <Link href={partner.href} className={neutral.textLink}>{partner.name}<span aria-hidden="true"> →</span></Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
