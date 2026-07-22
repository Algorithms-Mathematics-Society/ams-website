import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CLOSING_CTA } from "@/content/cta";

/**
 * Block 10: a contained closing proof and conversion panel. The evening
 * social establishes the human outcome, then a segmented burgundy row gives
 * contestants and sponsors separate, equally clear next steps.
 */
export function ClosingCta() {
  return (
    <section className="bg-cream py-section">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-panel border border-burgundy/15 bg-cream-light">
            <figure className="p-3 sm:p-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-media sm:aspect-video lg:aspect-[1920/906]">
                <Image
                  src={CLOSING_CTA.photo.src}
                  alt={CLOSING_CTA.photo.alt}
                  fill
                  quality={75}
                  fetchPriority="low"
                  sizes="(min-width: 1280px) 1054px, (min-width: 640px) calc(100vw - 98px), calc(100vw - 66px)"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-1 pt-3 text-sm text-ink/80 italic">
                {CLOSING_CTA.plateCaption}
              </figcaption>
            </figure>

            <div className="grid border-t border-burgundy/15 bg-burgundy text-cream-light md:grid-cols-[minmax(0,1.6fr)_minmax(18rem,0.8fr)]">
              <div className="p-6 sm:p-8 lg:p-10">
                <Eyebrow inverse>{CLOSING_CTA.eyebrow}</Eyebrow>
                <h2 className="mt-5 font-display text-section">
                  {CLOSING_CTA.headlineLines.map((line) => (
                    <span key={line} className="block">
                      {line}{" "}
                    </span>
                  ))}
                </h2>
                <p className="mt-5 max-w-2xl leading-relaxed text-cream-light/80">
                  {CLOSING_CTA.body}
                </p>
              </div>

              <div className="flex flex-col justify-center gap-3 border-t border-cream-light/20 p-6 sm:p-8 md:border-t-0 md:border-l">
                <Button href={CLOSING_CTA.primary.href} variant="inverse">
                  {CLOSING_CTA.primary.label}
                </Button>
                <Link
                  href={CLOSING_CTA.secondary.href}
                  className="inline-flex min-h-11 items-center justify-center rounded-control border border-cream-light/35 px-6 py-2.5 text-sm font-medium text-cream-light transition-colors hover:border-cream-light hover:bg-cream-light/10 focus-visible:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
                >
                  {CLOSING_CTA.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
