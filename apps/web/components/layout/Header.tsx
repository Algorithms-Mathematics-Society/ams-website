import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { SITE } from "@/content/site";

export function Header() {
  return (
    <div className="site-header sticky top-0 z-40 w-full">
      <a
        href="#main-content"
        className="fixed top-2 left-4 z-[60] flex min-h-11 -translate-y-20 items-center border border-gold-deep bg-cream px-4 text-sm font-semibold text-burgundy focus:translate-y-0"
      >
        Skip to content
      </a>
      <header className="h-20 border-b border-cream/20 bg-burgundy text-cream">
        <Container className="flex h-full items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex min-h-11 min-w-0 items-center gap-5 focus-visible:outline-gold-bright"
            aria-label={`${SITE.name} home`}
          >
            <Image
              src="/brand/wordmark-horizontal-inverse.svg"
              alt=""
              width={119}
              height={36}
              priority
              className="shrink-0"
            />
            <span className="hidden max-w-40 border-l border-cream/25 pl-5 text-[11px] leading-4 text-cream/85 sm:block xl:max-w-none">
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
