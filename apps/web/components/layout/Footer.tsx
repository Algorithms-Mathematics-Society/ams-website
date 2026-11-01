import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FOOTER, FOOTER_COLUMNS, SITE } from "@/content/site";
import styles from "./Footer.module.css";

/** A quiet inverse anchor with distinct competition, partnership, and society paths. */
export function Footer() {
  return (
    <footer id="site-footer" className={styles.footer}>
      <Container>
        <div className={styles.main}>
          <div className={styles.identity}>
            <Link href="/" aria-label="AMS home" className={styles.brand}>
              <Image
                src="/brand/wordmark-horizontal-white.svg"
                alt=""
                aria-hidden="true"
                width={119}
                height={36}
              />
            </Link>
            <p className={styles.name}>{SITE.legalName}</p>
            <p className={styles.description}>{SITE.tagline}</p>
            <div className={styles.contact}>
              <p className={styles.heading}>{FOOTER.contactLabel}</p>
              <ul className={styles.contactLinks}>
                {FOOTER.contacts.map((contact) => (
                  <li key={contact.href}>
                    <a href={contact.href} className={styles.link}>
                      {contact.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <nav aria-label="Footer" className={styles.navigation}>
            <div className={styles.columns}>
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.heading} className={styles.column}>
                  <h2 className={styles.heading}>{column.heading}</h2>
                  <ul className={styles.links}>
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className={styles.link}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{SITE.copyright}</p>
          <div className={styles.utilities}>
            <nav aria-label={FOOTER.socialLabel}>
              <ul className={styles.socialLinks}>
                {FOOTER.socialLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={styles.link}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a href="#main-content" className={styles.link}>
              {FOOTER.backToTop}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M12 20V4m-6 6 6-6 6 6" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
