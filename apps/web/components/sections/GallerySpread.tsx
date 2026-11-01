import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { GALLERY, GALLERY_HOME } from "@/content/gallery";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./HomeJourney.module.css";

const HOME_PLACEMENTS = ["lead", "support-top", "support-bottom"] as const;

/** Three documentary frames selected from the complete gallery archive. */
export function GallerySpread() {
  const items = HOME_PLACEMENTS.map((placement) => GALLERY.find((item) => item.homePlacement === placement));
  if (items.some((item) => !item?.src)) return null;
  const records = items as ((typeof GALLERY)[number] & { src: string })[];

  return (
    <section aria-labelledby="documentary-record-heading" className={neutral.section}>
      <Container>
        <Reveal>
          <header className={styles.galleryHeader}>
            <div>
              <h2 id="documentary-record-heading" className={`${neutral.title} ${styles.galleryTitle}`}>{GALLERY_HOME.title}</h2>
            </div>
            <div>
              <p className={neutral.body}>{GALLERY_HOME.body}</p>
              <Link href={GALLERY_HOME.link.href} className={`${neutral.textLink} ${styles.galleryLink}`}>{GALLERY_HOME.link.label}<span aria-hidden="true"> →</span></Link>
            </div>
          </header>
        </Reveal>
        <ul className={styles.galleryGrid}>
          {records.map((item, index) => (
            <li key={item.homePlacement} className={index === 0 ? styles.galleryLead : undefined}>
              <Reveal>
                <figure>
                  <div className={styles.image}>
                    <Image src={index === 0 ? item.full ?? item.src : item.src} alt={item.label} fill
                      sizes={index === 0
                        ? "(min-width: 1280px) 820px, (min-width: 768px) calc((100vw - 88px) * 0.6875), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                        : "(min-width: 1280px) 372px, (min-width: 768px) calc((100vw - 88px) * 0.3125), (min-width: 640px) calc((100vw - 80px) / 2), calc((100vw - 56px) / 2)"}
                      className={styles.photograph} />
                  </div>
                  <figcaption className={styles.caption}>{item.label}</figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
