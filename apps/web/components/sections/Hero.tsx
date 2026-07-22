import { HeroSlideshow } from "@/components/sections/HeroSlideshow";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlateFrame } from "@/components/ui/PlateFrame";
import { DERIVE_OVERVIEW_LINK } from "@/content/site";

export function Hero() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
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
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button
                href={DERIVE_OVERVIEW_LINK.href}
                className="w-full sm:w-auto"
              >
                {DERIVE_OVERVIEW_LINK.label}
              </Button>
              <Button
                href="/access"
                variant="outline"
                className="w-full sm:w-auto"
              >
                For firms
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-10 shrink-0 bg-gold" aria-hidden />
              <span className="text-[10px] font-semibold tracking-[0.22em] text-gold-deep uppercase">
                Vol. I · Derive &apos;26
              </span>
            </div>
          </div>

          <div className="rounded-panel bg-espresso p-4 sm:p-6 lg:p-8">
            <PlateFrame
              caption="Plate I · Derive '26 finals · IIT Bombay · July 2026"
              captionTone="dark"
              className="mx-auto w-full max-w-xl"
            >
              <HeroSlideshow />
            </PlateFrame>
          </div>
        </div>
      </Container>
    </section>
  );
}
