import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { MobileNav } from "@/components/layout/MobileNav";
import { COMPETE_LINK, NAV_LINKS, SITE } from "@/content/site";

export function Header() {
  return (
    <HeaderShell>
      <header className="h-16 border-b border-burgundy/10 bg-cream">
        <Container className="flex h-full items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label={`${SITE.name} home`}
          >
            <Image
              src="/brand/mark-glyph-primary.svg"
              alt=""
              width={32}
              height={29}
              priority
            />
            <span className="font-display text-xl font-semibold tracking-[0.22em] text-burgundy">
              {SITE.name}
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink transition-colors hover:text-burgundy"
              >
                {link.label}
              </Link>
            ))}
            <Button href={COMPETE_LINK.href}>{COMPETE_LINK.label}</Button>
          </nav>

          <MobileNav />
        </Container>
      </header>
    </HeaderShell>
  );
}
