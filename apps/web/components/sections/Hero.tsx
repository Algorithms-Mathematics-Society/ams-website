import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      {/* LCP element: preloaded, nothing above it may render late.
          - fetchPriority must be explicit: on Next 16, `priority` only
            controls eager loading + the head preload link and no longer
            implies the fetchpriority=high hint (it became an independent
            prop, see next/dist get-img-props.js).
          - quality 50 needs next.config images.qualities to include 50 or
            the optimizer snaps it back to 75; under the hero's dark
            gradient overlays the compression is invisible and cuts the
            750w mobile payload from 42 KB to 28 KB.
          - decoding sync (instead of next/image's async default) lets the
            already-downloaded hero commit in the same frame as first
            paint instead of one frame later. */}
      <Image
        src="/images/derive26/hero/the-hall-at-capacity.webp"
        alt="The Derive '26 finals hall at capacity, contestants at their laptops"
        fill
        priority
        fetchPriority="high"
        quality={50}
        decoding="sync"
        sizes="100vw"
        className="object-cover"
      />
      {/* Directional overlay: darkest under the copy on the left, lighter toward the right. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20"
      />
      {/* Bottom fade: keeps the corner caption legible over any photo content. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
      />

      <Container className="relative">
        <div className="max-w-xl">
          <Eyebrow inverse className="rise">
            Quant · Algorithms · Assessment
          </Eyebrow>
          <h1 className="rise-2 rise mt-6 font-display text-hero text-cream-light">
            Where India&apos;s sharpest minds converge.
          </h1>
          <p className="rise-3 rise mt-6 max-w-md leading-relaxed text-cream-light/85">
            National contests in quantitative finance and competitive
            programming, plus Access, the platform that turns performance into
            verified hiring signal.
          </p>
          <div className="rise-4 rise mt-9 flex flex-wrap gap-4">
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

      <p className="absolute right-5 bottom-6 text-sm text-cream-light/70 sm:right-8">
        Derive &apos;26 finals · IIT Bombay · July 2026
      </p>
    </section>
  );
}
