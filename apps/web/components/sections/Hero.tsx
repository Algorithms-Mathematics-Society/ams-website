import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HOME_HERO } from "@/content/homeHero";

export function Hero() {
  return (
    <section className="border-b border-burgundy-deep bg-burgundy">
      <Container className="px-0 sm:px-8">
        <div className="grid border-x border-cream-light/20 lg:grid-cols-[minmax(23rem,0.95fr)_minmax(0,1.4fr)]">
          <div className="order-2 flex flex-col justify-center border-t border-cream-light/20 px-5 py-10 text-cream-light sm:px-8 sm:py-12 lg:order-1 lg:border-t-0 lg:border-r lg:px-10 lg:py-16">
            <p className="text-[11px] font-bold tracking-[0.18em] text-gold-bright uppercase">
              {HOME_HERO.eyebrow}
            </p>
            <h1 className="mt-5 max-w-xl text-[clamp(2.5rem,4.5vw,3.75rem)] leading-[0.98] font-bold tracking-[-0.045em] text-balance">
              {HOME_HERO.headline}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-cream-light/82">
              {HOME_HERO.body}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={HOME_HERO.primaryAction.href} variant="inverse">
                {HOME_HERO.primaryAction.label}
              </Button>
              <Button
                href={HOME_HERO.secondaryAction.href}
                className="!border !border-cream-light/40 !bg-transparent !text-cream-light hover:!border-cream-light hover:!bg-cream-light/10 focus-visible:!outline-gold-bright"
              >
                {HOME_HERO.secondaryAction.label}
              </Button>
            </div>
          </div>
          <figure className="relative order-1 min-h-[17rem] overflow-hidden bg-espresso sm:min-h-[25rem] lg:order-2 lg:min-h-[34rem]">
            <Image
              src={HOME_HERO.image.src}
              alt={HOME_HERO.image.alt}
              fill
              priority
              fetchPriority="high"
              quality={75}
              sizes="(min-width: 1216px) 696px, (min-width: 1024px) 58vw, 100vw"
              className="object-cover object-center"
            />
            <figcaption className="absolute right-0 bottom-0 left-0 border-t border-cream-light/20 bg-espresso/95 px-5 py-3 text-[10px] leading-4 font-semibold tracking-[0.12em] text-cream-light uppercase sm:px-6">
              {HOME_HERO.image.context}
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
