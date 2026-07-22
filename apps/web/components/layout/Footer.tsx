import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FOOTER_COLUMNS, SITE } from "@/content/site";

export function Footer() {
  return (
    // The shadow bleeds burgundy far below the page edge so bottom
    // overscroll shows the footer extending, not a bare canvas gap.
    <footer className="border-t border-cream-light/15 bg-burgundy text-cream-light shadow-[0_50vh_0_50vh_var(--color-burgundy)]">
      <Container className="py-12 sm:py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12">
          <div>
            <Link
              href="/"
              aria-label="AMS home"
              className="-mx-2 inline-flex min-h-11 items-center gap-2.5 rounded-control px-2 text-cream-light hover:text-gold-bright focus-visible:outline-gold-bright"
            >
              <Image
                src="/brand/mark-glyph-white.svg"
                alt=""
                aria-hidden="true"
                width={32}
                height={29}
                className="shrink-0"
              />
              <span className="font-display text-xl font-semibold tracking-[0.22em]">
                {SITE.name}
              </span>
            </Link>
            <p className="mt-3 max-w-lg break-words text-sm leading-6 text-cream-light/85">
              {SITE.tagline}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="border-t border-cream-light/20 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12"
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.heading} className="min-w-0">
                  <h2 className="text-xs font-semibold tracking-[0.2em] text-gold-bright uppercase">
                    {column.heading}
                  </h2>
                  <ul className="mt-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="-mx-2 inline-flex min-h-11 max-w-full items-center rounded-control px-2 py-2 text-sm leading-5 text-cream-light/90 hover:text-gold-bright focus-visible:outline-gold-bright"
                        >
                          <span className="break-words">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-10 border-t border-cream-light/20 pt-5">
          <p className="break-words text-xs leading-5 text-cream-light/80">
            {SITE.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
