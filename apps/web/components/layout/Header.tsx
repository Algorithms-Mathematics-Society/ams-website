import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { SITE } from "@/content/site";

export function Header() {
  return (
    <div className="sticky top-0 z-40 shadow-[0_1px_12px_rgba(87,28,36,0.08)]">
      <a
        href="#main-content"
        className="group pointer-events-none fixed left-4 top-3 z-[60] overflow-hidden rounded-control text-sm font-medium"
      >
        <span className="flex min-h-10 -translate-y-full items-center bg-burgundy px-4 text-cream-light shadow-lg transition-transform group-focus-visible:translate-y-0">
          Skip to content
        </span>
      </a>
      <header className="h-16 border-b border-burgundy/10 bg-cream">
        <Container className="flex h-full items-center justify-between">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2.5 rounded-control pr-2"
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

          <DesktopNav />
          <MobileNav />
        </Container>
      </header>
    </div>
  );
}
