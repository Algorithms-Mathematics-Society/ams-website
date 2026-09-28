"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ControlIcon } from "@/components/ui/ControlIcon";
import { IconButton } from "@/components/ui/IconButton";
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
        ...(panelRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []),
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
      <IconButton
        ref={toggleRef}
        label={open ? "Close menu" : "Open menu"}
        inverse
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <ControlIcon name={open ? "close" : "menu"} />
      </IconButton>

      {open && (
        <div
          className="fixed inset-x-0 top-20 bottom-0 z-50 overflow-y-auto border-t border-cream-light/20 bg-burgundy"
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
            className="mx-auto w-full max-w-6xl px-5 py-5 sm:px-8"
          >
            <button
              type="button"
              onClick={() => closeMenu()}
              className="mb-4 flex min-h-11 items-center gap-2 rounded-control px-3 text-sm font-semibold text-cream-light hover:bg-burgundy-deep focus-visible:outline-gold-bright"
            >
              Close menu <ControlIcon name="close" />
            </button>
            <nav aria-label="Main" className="flex flex-col border-t border-cream-light/20">
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
                    "flex min-h-14 items-center border-b border-cream-light/20 px-3 py-3 text-base font-semibold transition-colors focus-visible:transition-none focus-visible:outline-gold-bright",
                    pathname === link.href ||
                      pathname.startsWith(`${link.href}/`)
                      ? "bg-burgundy-deep text-cream-light"
                      : "text-cream-light/85 hover:bg-burgundy-deep/60 hover:text-cream-light",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                href={COMPETE_LINK.href}
                variant="inverse"
                onClick={() => closeMenu()}
                className="mt-5 w-full sm:w-auto"
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
