import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { INSTITUTIONAL_OVERVIEW } from "@/content/institutionalOverview";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./HomeStory.module.css";

/** A concise introduction paired with the people behind the society. */
export function AboutSplit() {
  return (
    <section className={`${neutral.section} ${neutral.subtle}`} aria-labelledby="society-heading">
      <Container className={styles.about}>
        <Reveal>
          <h2 id="society-heading" className={`${neutral.title} ${styles.heading}`}>{INSTITUTIONAL_OVERVIEW.title}</h2>
          <p className={`${neutral.body} ${styles.copy}`}>{INSTITUTIONAL_OVERVIEW.definition}</p>
          <p className={`${neutral.body} ${styles.copy}`}>{INSTITUTIONAL_OVERVIEW.philosophy}</p>
          <div className={`${neutral.actions} ${styles.actionSpace}`}>
            <Link href={INSTITUTIONAL_OVERVIEW.action.href} className={neutral.secondary}>{INSTITUTIONAL_OVERVIEW.action.label}</Link>
          </div>
          <div className={styles.evidenceLinks}>
            {INSTITUTIONAL_OVERVIEW.evidenceLinks.map((link) => (
              <Link key={link.href} href={link.href} className={neutral.textLink}>{link.label}<span aria-hidden="true"> →</span></Link>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <figure>
            <div className={styles.image}>
              <Image src={INSTITUTIONAL_OVERVIEW.image.src} alt={INSTITUTIONAL_OVERVIEW.image.alt} fill
                sizes="(min-width: 1280px) 576px, (min-width: 1024px) calc((100vw - 128px) / 2), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                className="object-cover" />
            </div>
            <figcaption className={styles.caption}>{INSTITUTIONAL_OVERVIEW.image.caption}</figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
