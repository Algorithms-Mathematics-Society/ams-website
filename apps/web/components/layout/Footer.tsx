import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { FOOTER, FOOTER_COLUMNS, SITE } from "@/content/site";

/** Astryx's grouped-navigation pattern, using the existing AMS palette and primitives. */
export function Footer() {
  return (
    <footer id="site-footer" className="border-t border-cream-light/20 bg-burgundy text-cream-light">
      <Container>
        <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-20">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="AMS home"
              className="inline-flex min-h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright"
            >
              <Image
                src="/brand/wordmark-horizontal-inverse.svg"
                alt=""
                aria-hidden="true"
                width={119}
                height={36}
              />
            </Link>
            <p className="mt-5 text-base font-semibold leading-6">
              {SITE.legalName}
            </p>
            <p className="mt-3 text-sm leading-6 text-cream-light/80">
              {SITE.tagline}
            </p>
            <div className="mt-6">
              <p className="text-xs leading-5 text-cream-light/70">
                {FOOTER.contactLabel}
              </p>
              <ul>
                {FOOTER.contacts.map((contact) => (
                  <li key={contact.href}>
                    <TextLink href={contact.href} inverse>
                      {contact.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="border-t border-cream-light/20 pt-8 lg:border-t-0 lg:pt-2"
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)_minmax(0,0.8fr)] sm:gap-x-8">
              {FOOTER_COLUMNS.map((column) => (
                <div
                  key={column.heading}
                  className="group/footer-column min-w-0 max-sm:last:col-span-2"
                >
                  <h2 className="text-sm font-semibold leading-6 text-cream-light/70">
                    {column.heading}
                  </h2>
                  <ul className="mt-3 max-sm:group-last/footer-column:grid max-sm:group-last/footer-column:grid-cols-2">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="inline-flex min-h-11 min-w-11 max-w-full items-center py-2 text-sm leading-5 text-cream-light transition-colors duration-150 hover:text-gold-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright motion-reduce:transition-none"
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
      </Container>

      <div className="border-t border-cream-light/15 bg-burgundy-deep">
        <Container className="flex flex-col gap-3 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <p className="order-last text-xs leading-5 text-cream-light/75 lg:order-first">
            {SITE.copyright}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
            <nav aria-label={FOOTER.socialLabel}>
              <ul className="flex flex-wrap gap-x-6">
                {FOOTER.socialLinks.map((link) => (
                  <li key={link.href}>
                    <TextLink href={link.href} inverse>
                      {link.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href="#main-content"
              className="inline-flex min-h-11 items-center gap-2 text-sm text-cream-light/80 hover:text-gold-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright"
            >
              {FOOTER.backToTop}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M12 20V4m-6 6 6-6 6 6" />
              </svg>
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
