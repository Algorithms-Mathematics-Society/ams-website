"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { COMPETE_LINK, NAV_LINKS } from "@/content/site";

/**
 * Disclosure nav below lg. Client-component leaf so the rest of the header
 * ships as static HTML. Esc closes, body scroll locks, Tab stays inside.
 */
export function MobileNav() {
  const pathname = usePathname();

  return <MobileNavDisclosure key={pathname} pathname={pathname} />;
}

function MobileNavDisclosure({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("a")?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = [
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
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeMenu, open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-control text-burgundy transition-colors hover:bg-burgundy/5"
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
          className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto bg-espresso/25 p-3 backdrop-blur-[2px] sm:p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeMenu();
          }}
        >
          <div
            id="mobile-nav-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            className="ml-auto max-w-sm rounded-panel border border-cream/15 bg-burgundy p-2 shadow-[0_18px_50px_rgba(67,20,27,0.28)]"
          >
            <nav aria-label="Main" className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={
                    pathname === link.href ||
                    pathname.startsWith(`${link.href}/`)
                      ? "page"
                      : undefined
                  }
                  onClick={() => closeMenu()}
                  className={cn(
                    "flex min-h-11 items-center rounded-control px-4 py-2.5 text-base font-medium transition-colors",
                    pathname === link.href ||
                      pathname.startsWith(`${link.href}/`)
                      ? "bg-cream text-burgundy"
                      : "text-cream-light hover:bg-cream/10",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                href={COMPETE_LINK.href}
                variant="inverse"
                onClick={() => closeMenu()}
                className="mt-2 w-full"
              >
                {COMPETE_LINK.label}
              </Button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
