"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { COMPETE_LINK, NAV_LINKS } from "@/content/site";

/**
 * Disclosure nav below lg. Client-component leaf so the rest of the header
 * ships as static HTML. Esc closes, body scroll locks, Tab stays inside.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("a")?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = [
        toggleRef.current,
        ...(panelRef.current?.querySelectorAll<HTMLElement>("a") ?? []),
      ].filter((el): el is HTMLElement => el != null);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center text-burgundy transition-colors duration-300 js:group-data-[overlay]:text-cream-light js:group-data-[overlay]:focus-visible:outline-cream-light"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto border-t border-burgundy/10 bg-cream"
        >
          <nav aria-label="Main" className="flex flex-col px-5 py-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-burgundy/10 py-4 text-lg text-burgundy"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={COMPETE_LINK.href}
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-burgundy px-6 text-sm font-medium text-cream-light"
            >
              {COMPETE_LINK.label}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
