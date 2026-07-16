import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlateFrame } from "@/components/ui/PlateFrame";

/**
 * The Bound Plate: the hero reads as two facing pages of an open book.
 * Left page (plain cream, the section's own background): the title-page
 * copy. Right page (solid espresso): the three-photo crossfade, matted
 * like the founder portrait's "Plate II" rather than run full-bleed, so
 * the page's archival-plate idea (Plate I/II/III) becomes the hero's own
 * structure instead of a detail borrowed from elsewhere on the page. See
 * docs/superpowers/specs/2026-07-16-hero-bound-plate-design.md. The gold
 * spine between the two pages completes the open-book read.
 */
export function Hero() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="grid min-h-[480px] items-stretch gap-10 lg:min-h-[600px] lg:grid-cols-[1fr_2.5rem_1fr] lg:gap-0">
          {/* Left page: the title page. Renders at full strength on
              first paint, no entrance animation: this is the first thing
              a visitor sees, so there is nothing to reveal it from. */}
          <div className="flex flex-col justify-center">
            <Eyebrow>Quant · Algorithms · Assessment</Eyebrow>
            <h1 className="mt-6 font-display text-hero text-burgundy">
              <span className="block">Where India&apos;s sharpest</span>
              <span className="block">minds converge.</span>
            </h1>
            <p className="mt-6 max-w-md leading-relaxed">
              National contests in quantitative finance and competitive
              programming. Access turns how people place into a hiring signal
              firms can use.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/derive">Enter Derive &apos;26</Button>
              <Button href="/access" variant="outline">
                For firms
              </Button>
            </div>
          </div>

          {/* The spine: a rule between the two pages with a small volume
              label, fully drawn on first paint. Horizontal when the pages
              stack below lg; vertical with a soft gutter shadow on each
              side once they sit side by side. */}
          <div
            aria-hidden
            className="relative py-2 pointer-events-none lg:py-0"
          >
            <div className="absolute inset-y-0 left-1/2 hidden w-8 -translate-x-full bg-gradient-to-r from-transparent to-ink/10 lg:block" />
            <div className="absolute inset-y-0 left-1/2 hidden w-8 bg-gradient-to-l from-transparent to-ink/10 lg:block" />
            <div className="h-px w-full bg-gold lg:absolute lg:inset-y-0 lg:left-1/2 lg:h-auto lg:w-px lg:-translate-x-1/2" />
            <span className="mt-3 block text-center text-[10px] font-semibold tracking-[0.25em] text-gold-deep uppercase lg:absolute lg:top-1/2 lg:left-1/2 lg:mt-0 lg:w-max lg:-translate-x-1/2 lg:-translate-y-1/2 lg:[writing-mode:vertical-rl]">
              Vol. I · Derive &apos;26
            </span>
          </div>

          {/* Right page: the plate. */}
          <div className="flex flex-col items-center justify-center bg-espresso px-6 py-10 lg:px-10">
            <PlateFrame
              caption="Plate I · Derive '26 finals · IIT Bombay · July 2026"
              captionTone="dark"
              className="mx-auto w-full max-w-md"
            >
              {/* LCP candidate: preloaded, nothing above it may render
                  late.
                  - fetchPriority stays explicit (Next 16 decoupled it
                    from priority).
                  - quality 75: the mat is light, so compression has
                    nowhere to hide; keep the full-fidelity tier.
                  - decoding sync commits the plate in the same frame as
                    first paint.
                  - .kenburns settles 1.04 to 1.00 over 8s, transform
                    only, and never delays the paint itself. */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                <div className="kenburns absolute inset-0">
                  <div className="hero-slide absolute inset-0">
                    <Image
                      src="/images/derive26/hero/finalists-mid-problem.webp"
                      alt="Finalists working through the problem set in the hall at IIT Bombay, Derive '26 finals"
                      fill
                      priority
                      fetchPriority="high"
                      quality={75}
                      decoding="sync"
                      sizes="(min-width: 540px) 448px, 92vw"
                      className="object-cover object-[center_85%]"
                    />
                  </div>
                  <div className="hero-slide hero-slide-2 absolute inset-0 opacity-0">
                    <Image
                      src="/images/derive26/hero/the-full-room.webp"
                      alt="Group photo of the Derive '26 cohort and organizers in the hall at IIT Bombay"
                      fill
                      quality={75}
                      sizes="(min-width: 540px) 448px, 92vw"
                      className="object-cover object-[center_62%]"
                    />
                  </div>
                  <div className="hero-slide hero-slide-3 absolute inset-0 opacity-0">
                    <Image
                      src="/images/derive26/hero/winners-with-the-cheques.webp"
                      alt="The three Derive '26 winners holding their prize cheques, flanked by organizers, IIT Bombay"
                      fill
                      quality={75}
                      sizes="(min-width: 540px) 448px, 92vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </PlateFrame>
          </div>
        </div>
      </Container>
    </section>
  );
}
