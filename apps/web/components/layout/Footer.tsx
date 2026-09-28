import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FOOTER_COLUMNS, SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t-2 border-gold-bright bg-burgundy text-cream-light">
      <Container>
        <div className="grid gap-8 border-b border-cream-light/20 py-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12 lg:py-12">
          <div>
            <Link
              href="/"
              aria-label="AMS home"
              className="inline-flex min-h-11 items-center gap-3 text-cream-light hover:text-gold-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
            >
              <Image
                src="/brand/wordmark-horizontal-inverse.svg"
                alt=""
                aria-hidden="true"
                width={119}
                height={36}
                className="shrink-0"
              />

            </Link>
            <p className="mt-4 max-w-md break-words text-sm leading-6 text-cream-light/80">
              {SITE.tagline}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="border-t border-cream-light/20 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12"
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
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
                          className="inline-flex min-h-11 min-w-11 max-w-full items-center py-2 text-sm leading-5 text-cream-light/90 hover:text-gold-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
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

        <div className="py-5">
          <p className="break-words text-xs leading-5 text-cream-light/75">
            {SITE.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
