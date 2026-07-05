import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { FOOTER_COLUMNS, SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-maroon text-cream-light">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <PhotoPlaceholder
            label="Team at the end of Convergence, tired and happy, hall emptying behind"
            aspect="aspect-[5/3]"
            className="border-cream-light/30 bg-cream-light/10"
          />

          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/brand/mark-glyph-white.svg"
                alt=""
                width={32}
                height={29}
              />
              <span className="font-display text-xl font-semibold tracking-[0.22em]">
                {SITE.name}
              </span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream-light/85">
              {SITE.tagline}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
              {FOOTER_COLUMNS.map((column) => (
                <nav key={column.heading} aria-label={column.heading}>
                  <h2 className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">
                    {column.heading}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-cream-light/90 transition-colors hover:text-cream-light"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-cream-light/20 pt-6">
          <p className="text-xs text-cream-light/60">{SITE.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
