import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { NAV_LINKS, SITE } from "@/content/site";
import styles from "./Header.module.css";

export function Header() {
  return (
    <div className={`site-header ${styles.shell}`}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <header className={styles.header}>
        <Container className={styles.inner}>
          <Link href="/" className={styles.brand} aria-label={`${SITE.name} home`}>
            <Image
              src="/brand/wordmark-horizontal-black.svg"
              alt=""
              width={119}
              height={36}
              priority
              className={styles.wordmark}
            />
            <span className={styles.legalName}>{SITE.legalName}</span>
          </Link>
          <DesktopNav />
          <MobileNav />
        </Container>
      </header>
      <noscript>
        <nav aria-label="Main" className={styles.fallbackNav}>
          {NAV_LINKS.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
      </noscript>
    </div>
  );
}
