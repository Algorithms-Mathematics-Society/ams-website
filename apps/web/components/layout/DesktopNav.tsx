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
    <nav aria-label="Main" className="hidden h-full items-center lg:flex">
      {NAV_LINKS.map((link) => {
        const active = routeIsActive(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex min-h-11 items-center rounded-control px-3 py-2 text-sm font-semibold transition-colors focus-visible:transition-none focus-visible:outline-gold-bright",
              active
                ? "bg-burgundy-deep text-cream-light"
                : "text-cream-light/80 hover:bg-burgundy-deep/60 hover:text-cream-light",
            )}
          >
            {link.label}
          </Link>
        );
      })}
      <Button href={COMPETE_LINK.href} variant="inverse" className="ml-4 min-h-11 px-5 py-2 text-xs">
        {COMPETE_LINK.label}
      </Button>
    </nav>
  );
}
