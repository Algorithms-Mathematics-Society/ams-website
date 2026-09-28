import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CLOSING_CTA } from "@/content/cta";

/** Closing invitations for competitors and hiring teams. */
export function ClosingCta() {
  return (
    <section
      aria-labelledby="next-edition-heading"
      className="bg-burgundy text-cream-light"
    >
      <Container className="py-14 sm:py-20">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <Eyebrow inverse className="!text-cream-light/75">
                {CLOSING_CTA.eyebrow}
              </Eyebrow>
              <h2
                id="next-edition-heading"
                className="mt-4 max-w-3xl text-section font-semibold tracking-[-0.035em]"
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
                className="!bg-cream-light !text-burgundy hover:!bg-cream sm:min-w-40"
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
