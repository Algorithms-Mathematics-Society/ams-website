"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HEADER_ACTION, NAV_LINKS } from "@/content/site";
import styles from "./Header.module.css";

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className={styles.desktopNav}>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? "page" : undefined}
          className={styles.navLink}
        >
          {link.label}
        </Link>
      ))}
      <Link href={HEADER_ACTION.href} className={styles.action}>
        {HEADER_ACTION.label}
      </Link>
    </nav>
  );
}
