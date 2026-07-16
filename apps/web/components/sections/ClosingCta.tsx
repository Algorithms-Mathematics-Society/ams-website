import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CLOSING_CTA } from "@/content/cta";

/**
 * Block 10: the page closes with the same gesture it opened with. It is the
 * hero's bookend, so it shares the hero's grammar: copy anchored bottom-left,
 * a layered scrim built from the brand darks rather than flat black, and the
 * headline mask-reveals the way the hero's did. The scrim deepens toward
 * burgundy at the bottom so the photo dissolves into the burgundy footer
 * instead of cutting to it.
 */
export function ClosingCta() {
  return (
    <section className="relative flex min-h-[85svh] items-end overflow-hidden py-24 text-cream-light lg:py-28">
      <div className="parallax-slow absolute inset-x-0 -inset-y-[8%]">
        <Image
          src={CLOSING_CTA.photo.src}
          alt={CLOSING_CTA.photo.alt}
          fill
          quality={50}
          fetchPriority="low"
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
      </div>
      {/* Layered scrim, like the hero: a uniform wash, a diagonal darkest
          under the bottom-left copy, and a bottom band that deepens to
          burgundy-deep so the seam into the footer is a dissolve. */}
      <div aria-hidden className="absolute inset-0 bg-espresso/30" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-tr from-burgundy-deep/80 via-espresso/30 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-burgundy-deep/85 via-burgundy-deep/25 to-transparent"
      />

      <Container className="relative w-full">
        <Reveal className="max-w-2xl">
          <Eyebrow inverse>{CLOSING_CTA.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-hero">
            <span className="mask-line">
              <span>{CLOSING_CTA.headlineLines[0]}</span>
            </span>
            <span className="mask-line mask-step-2">
              <span>{CLOSING_CTA.headlineLines[1]}</span>
            </span>
          </h2>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={CLOSING_CTA.primary.href} variant="inverse">
              {CLOSING_CTA.primary.label}
            </Button>
            {/* Set apart from the primary action, not stacked beneath it: a
                different audience (firms), routed rather than offered as
                step two of the same funnel. */}
            <Link
              href={CLOSING_CTA.secondary.href}
              className="text-sm text-cream-light/75 underline-offset-4 transition-colors hover:text-cream-light hover:underline"
            >
              {CLOSING_CTA.secondary.label} <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </Container>

      {/* Plate caption in the contained pill the hero uses, so the two
          "Plate" stamps on the page read as one system. */}
      <p className="caption-fade absolute right-5 bottom-6 rounded-full bg-black/45 px-3.5 py-1.5 text-sm text-cream-light/90 italic sm:right-8">
        {CLOSING_CTA.plateCaption}
      </p>
    </section>
  );
}
