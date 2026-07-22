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
              "relative inline-flex h-16 items-center px-3 text-[13px] font-semibold tracking-[0.01em] transition-colors focus-visible:transition-none focus-visible:outline-gold-bright",
              active
                ? "bg-burgundy-deep text-cream-light"
                : "text-cream-light/80 hover:bg-burgundy-deep/60 hover:text-cream-light",
            )}
          >
            {link.label}
            {active && (
              <span
                aria-hidden="true"
                className="absolute inset-x-3 bottom-0 h-0.5 bg-gold-bright"
              />
            )}
          </Link>
        );
      })}
      <Button href={COMPETE_LINK.href} variant="inverse" className="ml-4 px-5">
        {COMPETE_LINK.label}
      </Button>
    </nav>
  );
}
