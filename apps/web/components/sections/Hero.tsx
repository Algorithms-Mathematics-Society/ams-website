import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Summit Cut hero. Copy sits on solid cream; the photo is exposed through a
 * chevron edge lifted from the brand mark (rotated to point left), traced by
 * a gold outline with the summit dot at its apex. No scrims or vignettes:
 * the photo stays untouched and text never sits on it. On mobile the photo
 * docks below the copy behind a single rising diagonal.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-cream">
      {/* LCP element: preloaded, nothing above it may render late.
          - fetchPriority stays explicit (Next 16 decoupled it from priority).
          - quality 50 needs next.config images.qualities to include 50.
          - decoding sync commits the hero in the same frame as first paint.
          - .kenburns settles 1.04 to 1.00 over 8s inside the clip and never
            delays the paint itself. */}
      <div className="absolute inset-x-0 bottom-0 h-[42svh] [clip-path:polygon(0_14%,100%_0,100%_100%,0_100%)] lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:w-[56%] lg:[clip-path:polygon(32%_0,100%_0,100%_100%,32%_100%,0_52%)] xl:w-[50%]">
        <div className="kenburns absolute inset-0">
          <Image
            src="/images/derive26/hero/finalists-mid-problem.webp"
            alt="Finalists working through the problem set in the hall at IIT Bombay, Derive '26 finals"
            fill
            priority
            fetchPriority="high"
            quality={50}
            decoding="sync"
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Gold trace of the cut: same chevron in percent space, nudged left,
          with the mark's summit dot at the apex. Decorative only. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[56%] overflow-visible lg:block xl:w-[50%]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polyline
          points="32,0 0,52 32,100"
          transform="translate(-4 0)"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="2"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div
        aria-hidden
        className="absolute top-[52%] left-[44%] hidden size-3 -translate-x-9 -translate-y-1/2 rounded-full bg-gold lg:block xl:left-[50%]"
      />

      <Container className="relative z-10 w-full pt-10 pb-[46svh] lg:py-24 lg:pb-24">
        <div className="max-w-xl">
          <Eyebrow className="rise">Quant · Algorithms · Assessment</Eyebrow>
          {/* Three-line mask reveal, 700ms per line, 120ms stagger, starting
              400ms after load. Burgundy on cream: no scrim tricks. */}
          <h1 className="mt-6 font-display text-hero text-burgundy">
            <span className="mask-line mask-load-1">
              <span>Where India&apos;s</span>
            </span>
            <span className="mask-line mask-load-2">
              <span>sharpest minds</span>
            </span>
            <span className="mask-line">
              <span style={{ animationDelay: "640ms" }}>converge.</span>
            </span>
          </h1>
          <p className="rise rise-hero-sub mt-6 max-w-md leading-relaxed">
            National contests in quantitative finance and competitive
            programming, plus Access, the platform that turns performance into
            verified hiring signal.
          </p>
          <div className="rise rise-hero-cta mt-9 flex flex-wrap gap-4">
            <Button href="/derive">Enter Derive &apos;26</Button>
            <Button href="/access" variant="outline">
              For firms
            </Button>
          </div>
        </div>
      </Container>

      {/* Plate caption: the archival stamp lands last, over the photo. */}
      <p className="caption-fade absolute right-5 bottom-5 text-sm text-cream-light/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.55)] sm:right-8">
        Derive &apos;26 finals · IIT Bombay · July 2026
      </p>
    </section>
  );
}
