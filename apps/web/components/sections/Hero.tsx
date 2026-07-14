import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Full-bleed banner hero: the slideshow fills the viewport below the cream
 * header and the copy sits at the bottom left over a restrained directional
 * scrim (enough for contrast, not a vignette). Three frames crossfade on
 * the CSS cycle; frame one is the LCP image and reduced motion pins to it.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-24">
      {/* LCP element: preloaded, nothing above it may render late.
          - fetchPriority stays explicit (Next 16 decoupled it from priority).
          - quality 75: the scrim is light, so compression has nowhere to
            hide; keep the full-fidelity tier.
          - decoding sync commits the hero in the same frame as first paint.
          - .kenburns settles 1.04 to 1.00 over 8s, transform only, and
            never delays the paint itself. */}
      <div className="kenburns absolute inset-0">
        <div className="hero-slide absolute inset-0">
          {/* Focal point sits low: favor the desks over the ceiling. */}
          <Image
            src="/images/derive26/hero/finalists-mid-problem.webp"
            alt="Finalists working through the problem set in the hall at IIT Bombay, Derive '26 finals"
            fill
            priority
            fetchPriority="high"
            quality={75}
            decoding="sync"
            sizes="100vw"
            className="object-cover object-[center_70%]"
          />
        </div>
        <div className="hero-slide hero-slide-2 absolute inset-0 opacity-0">
          <Image
            src="/images/derive26/hero/the-full-room.webp"
            alt="Group photo of the Derive '26 cohort and organizers in the hall at IIT Bombay"
            fill
            quality={75}
            sizes="100vw"
            className="object-cover object-[center_62%]"
          />
        </div>
        <div className="hero-slide hero-slide-3 absolute inset-0 opacity-0">
          <Image
            src="/images/derive26/hero/winners-with-the-cheques.webp"
            alt="The three Derive '26 winners holding their prize cheques, flanked by organizers, IIT Bombay"
            fill
            quality={75}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
      {/* Legibility scrim, three layers: a uniform wash that tames bright
          ceilings on every frame, a diagonal that is darkest under the
          copy, and a bottom band. Top right keeps the least shading so
          the frame still breathes. */}
      <div aria-hidden className="absolute inset-0 bg-black/25" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
      />

      <Container className="relative z-10 w-full">
        <div className="max-w-3xl">
          <Eyebrow
            inverse
            className="rise [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]"
          >
            Quant · Algorithms · Assessment
          </Eyebrow>
          {/* Two-line mask reveal, 700ms per line, 120ms stagger, starting
              400ms after load so the photo gets one uninterrupted beat. */}
          <h1 className="mt-6 font-display text-hero text-cream-light">
            <span className="mask-line mask-load-1">
              <span>Where India&apos;s sharpest</span>
            </span>
            <span className="mask-line mask-load-2">
              <span>minds converge.</span>
            </span>
          </h1>
          <p className="rise rise-hero-sub mt-6 max-w-md leading-relaxed text-cream-light [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
            National contests in quantitative finance and competitive
            programming, plus Access, the platform that turns performance into
            verified hiring signal.
          </p>
          <div className="rise rise-hero-cta mt-9 flex flex-wrap gap-4">
            <Button href="/derive">Enter Derive &apos;26</Button>
            <Button href="/access" variant="inverse">
              For firms
            </Button>
          </div>
        </div>
      </Container>

      {/* Plate caption: the archival stamp lands last, on a quiet pill so
          it stays legible over the desks. */}
      <p className="caption-fade absolute right-5 bottom-6 rounded-full bg-black/45 px-3.5 py-1.5 text-sm text-cream-light/90 sm:right-8">
        Derive &apos;26 finals · IIT Bombay · July 2026
      </p>
    </section>
  );
}
