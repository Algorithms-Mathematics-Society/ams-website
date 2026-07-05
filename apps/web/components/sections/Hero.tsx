import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

export function Hero() {
  return (
    <section className="py-section">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>Quant · Algorithms · Assessment</Eyebrow>
          <h1 className="mt-6 font-display text-hero text-burgundy">
            Where India&apos;s sharpest minds converge.
          </h1>
          <p className="mt-6 max-w-md leading-relaxed">
            National contests in quantitative finance and competitive
            programming — and Access, the platform that turns performance into
            verified hiring signal.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/derive">Enter Derive &apos;26</Button>
            <Button href="/access" variant="outline">
              For firms
            </Button>
          </div>
        </div>

        <figure>
          {/* LCP slot: when the real photo lands, render it with next/image
              priority — nothing above it may load later than it. */}
          <PhotoPlaceholder
            label="Hero photo — finalists on the Convergence stage, IIT Bombay · wide, candid, mid-problem"
            aspect="aspect-[13/11]"
          />
          <figcaption className="mt-3 text-sm text-ink/70">
            Derive &apos;26 finals · IIT Bombay · July 2026
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
