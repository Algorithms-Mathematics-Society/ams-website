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
      <header className="h-16 border-b border-burgundy/10 bg-cream transition-colors duration-300 js:group-data-[overlay]:border-transparent js:group-data-[overlay]:bg-transparent">
        <Container className="flex h-full items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 js:group-data-[overlay]:focus-visible:outline-cream-light"
            aria-label={`${SITE.name} home`}
          >
            <Image
              src="/brand/mark-glyph-primary.svg"
              alt=""
              width={32}
              height={29}
              priority
              className="js:group-data-[overlay]:hidden"
            />
            <Image
              src="/brand/mark-glyph-white.svg"
              alt=""
              width={32}
              height={29}
              loading="eager"
              className="hidden js:group-data-[overlay]:block"
            />
            <span className="font-display text-xl font-semibold tracking-[0.22em] text-burgundy transition-colors duration-300 js:group-data-[overlay]:text-cream-light">
              {SITE.name}
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink transition-colors hover:text-burgundy js:group-data-[overlay]:text-cream-light/90 js:group-data-[overlay]:hover:text-cream-light js:group-data-[overlay]:focus-visible:outline-cream-light"
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
