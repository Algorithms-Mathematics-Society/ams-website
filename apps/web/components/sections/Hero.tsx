import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-end overflow-hidden pb-20 sm:pb-24">
      {/* LCP element: preloaded, nothing above it may render late.
          - fetchPriority must be explicit on Next 16 (priority no longer
            implies the fetchpriority=high hint).
          - quality 50 needs next.config images.qualities to include 50.
          - decoding sync lets the already-downloaded hero commit in the
            same frame as first paint.
          - .kenburns settles 1.04 to 1.00 over 8s, transform only, and
            never delays the paint itself. */}
      <div className="kenburns absolute inset-0">
        <Image
          src="/images/derive26/hero/winners-with-the-cheques.webp"
          alt="The three Derive '26 winners holding their prize cheques, flanked by organizers, IIT Bombay"
          fill
          priority
          fetchPriority="high"
          quality={50}
          decoding="sync"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* Directional overlay: darkest under the copy at the bottom left. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/30"
      />

      <Container className="relative">
        <div className="max-w-xl">
          <Eyebrow inverse className="rise">
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
          <p className="rise rise-hero-sub mt-6 max-w-md leading-relaxed text-cream-light/85">
            National contests in quantitative finance and competitive
            programming, plus Access, the platform that turns performance into
            verified hiring signal.
          </p>
          <div className="rise rise-hero-cta mt-9 flex flex-wrap gap-4">
            <Button href="/derive">Enter Derive &apos;26</Button>
            <Button
              href="/access"
              variant="outline"
              className="border-cream-light/50! text-cream-light! hover:border-cream-light! hover:bg-cream-light/10!"
            >
              For firms
            </Button>
          </div>
        </div>
      </Container>

      {/* Scroll whisper and plate caption: the archival stamp lands last. */}
      <p className="caption-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-[11px] tracking-[0.3em] text-cream-light/60 uppercase sm:block">
        Scroll
      </p>
      <p className="caption-fade absolute right-5 bottom-6 text-sm text-cream-light/70 sm:right-8">
        Derive &apos;26 finals · IIT Bombay · July 2026
      </p>
    </section>
  );
}
