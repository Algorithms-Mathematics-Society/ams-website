import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CLOSING_CTA } from "@/content/cta";

/**
 * Block 10: the page closes with the same gesture it opened with. The
 * headline mask-reveals like the hero (a deliberate bookend) and the
 * photo drifts on the same parallax grammar as the stats band.
 */
export function ClosingCta() {
  return (
    <section className="relative overflow-hidden py-32 text-center text-cream-light lg:py-44">
      <div className="parallax-slow absolute -inset-y-[8%] inset-x-0">
        <Image
          src={CLOSING_CTA.photo.src}
          alt={CLOSING_CTA.photo.alt}
          fill
          quality={50}
          fetchPriority="low"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/65" aria-hidden />

      <Reveal className="relative mx-auto max-w-3xl px-5">
        <Eyebrow inverse>{CLOSING_CTA.eyebrow}</Eyebrow>
        <h2 className="mt-6 font-display text-hero">
          <span className="mask-line">
            <span>{CLOSING_CTA.headlineLines[0]}</span>
          </span>
          <span className="mask-line mask-step-2">
            <span>{CLOSING_CTA.headlineLines[1]}</span>
          </span>
        </h2>
        <div className="mt-10 flex flex-col items-center gap-5">
          <Button href={CLOSING_CTA.primary.href} variant="inverse">
            {CLOSING_CTA.primary.label}
          </Button>
          <Link
            href={CLOSING_CTA.secondary.href}
            className="text-sm text-cream-light/80 underline-offset-4 transition-colors hover:text-cream-light hover:underline"
          >
            {CLOSING_CTA.secondary.label} <span aria-hidden>→</span>
          </Link>
        </div>
      </Reveal>

      <p className="caption-fade absolute right-5 bottom-6 text-sm text-cream-light/60 italic sm:right-8">
        {CLOSING_CTA.plateCaption}
      </p>
    </section>
  );
}
