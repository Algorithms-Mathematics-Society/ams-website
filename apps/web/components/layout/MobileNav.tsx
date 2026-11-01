"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ControlIcon } from "@/components/ui/ControlIcon";
import { HEADER_ACTION, NAV_LINKS } from "@/content/site";
import styles from "./Header.module.css";

interface Props {
  pathname: string;
}

export function MobileNav() {
  const pathname = usePathname();
  return <MobileNavDisclosure key={pathname} pathname={pathname} />;
}

/** Native modal supplies inert background and Escape dismissal. */
function MobileNavDisclosure({ pathname }: Props) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current?.focus();

    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) dialog.close(); };
    desktop.addEventListener("change", closeOnDesktop);
    closeOnDesktop();
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [open]);

  return (
    <div className={styles.mobileNav}>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-haspopup="dialog"
        className={styles.menuButton}
        onClick={() => setOpen(true)}
      >
        <ControlIcon name="menu" />
      </button>
      <dialog
        id="mobile-nav-panel"
        ref={dialogRef}
        aria-label="Main navigation"
        className={styles.dialog}
        onClose={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const elements = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
          const first = elements[0];
          const last = elements[elements.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
      >
        <div className={styles.dialogInner}>
          <div className={styles.dialogHeader}>
            <span className={styles.dialogTitle}>Main navigation</span>
            <button
              type="button"
              ref={closeRef}
              onClick={() => dialogRef.current?.close()}
              className={styles.closeButton}
            >
              Close menu <ControlIcon name="close" />
            </button>
          </div>
          <nav aria-label="Main" className={styles.mobileLinks}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? "page" : undefined}
                onClick={() => dialogRef.current?.close()}
                className={styles.mobileLink}
              >
                <span>{link.label}</span>
                <ControlIcon name="next" />
              </Link>
            ))}
            <Link href={HEADER_ACTION.href} onClick={() => dialogRef.current?.close()} className={styles.action}>
              {HEADER_ACTION.label}
            </Link>
          </nav>
        </div>
      </dialog>
    </div>
  );
}
