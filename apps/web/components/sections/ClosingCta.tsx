import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CLOSING_CTA } from "@/content/cta";

/** Compact institutional close with separate contestant and sponsor paths. */
export function ClosingCta() {
  return (
    <section
      aria-labelledby="next-edition-heading"
      className="border-y border-gold-bright/60 bg-burgundy text-cream-light"
    >
      <Container className="py-10 sm:py-12">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <Eyebrow inverse>{CLOSING_CTA.eyebrow}</Eyebrow>
              <h2
                id="next-edition-heading"
                className="mt-4 max-w-3xl text-section font-semibold tracking-tight"
              >
                {CLOSING_CTA.headline}
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-cream-light/80">
                {CLOSING_CTA.body}
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-cream-light/25 pt-6 sm:flex-row lg:border-t-0 lg:pt-0">
              <Button
                href={CLOSING_CTA.primary.href}
                variant="inverse"
                className="sm:min-w-40"
              >
                {CLOSING_CTA.primary.label}
              </Button>
              <Link
                href={CLOSING_CTA.secondary.href}
                className="inline-flex min-h-11 items-center justify-center border border-cream-light/45 px-6 py-2.5 text-sm font-medium text-cream-light transition-colors hover:border-cream-light hover:bg-cream-light/10 focus-visible:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
              >
                {CLOSING_CTA.secondary.label}
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
