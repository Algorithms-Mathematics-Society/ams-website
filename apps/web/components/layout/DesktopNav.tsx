"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { COMPETE_LINK, NAV_LINKS } from "@/content/site";

function routeIsActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="hidden items-center gap-2 lg:flex">
      {NAV_LINKS.map((link) => {
        const active = routeIsActive(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative inline-flex min-h-11 items-center rounded-control px-3 text-sm font-medium transition-colors",
              active
                ? "text-burgundy"
                : "text-ink hover:bg-burgundy/5 hover:text-burgundy",
            )}
          >
            {link.label}
            {active && (
              <span
                aria-hidden="true"
                className="absolute inset-x-3 bottom-1.5 h-px bg-gold-deep"
              />
            )}
          </Link>
        );
      })}
      <Button href={COMPETE_LINK.href} className="ml-2">
        {COMPETE_LINK.label}
      </Button>
    </nav>
  );
}
