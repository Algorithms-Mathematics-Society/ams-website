import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { SITE } from "@/content/site";

export function Header() {
  return (
    <div className="sticky top-0 z-40">
      <a
        href="#main-content"
        className="group pointer-events-none fixed left-4 top-2 z-[60] overflow-hidden text-sm font-semibold"
      >
        <span className="flex min-h-11 -translate-y-full items-center border border-gold-bright bg-cream px-4 text-burgundy transition-transform group-focus-visible:translate-y-0">
          Skip to content
        </span>
      </a>
      <header className="h-16 border-b border-gold-bright/35 bg-burgundy text-cream-light">
        <Container className="flex h-full items-center justify-between">
          <Link
            href="/"
            className="inline-flex min-h-11 min-w-0 items-center gap-3 pr-3 focus-visible:outline-gold-bright"
            aria-label={`${SITE.name} home`}
          >
            <Image
              src="/brand/mark-glyph-white.svg"
              alt=""
              width={30}
              height={27}
              priority
            />
            <span className="text-lg font-bold tracking-[0.2em]">
              {SITE.name}
            </span>
            <span className="hidden border-l border-cream-light/25 pl-3 text-[10px] leading-4 font-medium tracking-[0.11em] text-cream-light/75 uppercase sm:block">
              {SITE.legalName}
            </span>
          </Link>

          <DesktopNav />
          <MobileNav />
        </Container>
      </header>
    </div>
  );
}
