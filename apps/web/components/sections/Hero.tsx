import Image from "next/image";
import { TextLink } from "@/components/ui/TextLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HOME_HERO } from "@/content/homeHero";

export function Hero() {
  return (
    <section className="home-hero border-b border-burgundy/15 bg-cream">
      <Container className="grid gap-10 pt-12 pb-10 sm:pt-16 sm:pb-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14 lg:py-16">
        <div>
          <Eyebrow>{HOME_HERO.eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-xl font-display text-[clamp(2.75rem,4.8vw,4.5rem)] leading-[1.08] font-normal tracking-[-0.04em] text-burgundy text-balance">
            {HOME_HERO.headline}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-ink/85 sm:text-lg sm:leading-8">
            {HOME_HERO.body}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={HOME_HERO.primaryAction.href}>
              {HOME_HERO.primaryAction.label}
            </Button>
            <Button href={HOME_HERO.secondaryAction.href} variant="outline">
              {HOME_HERO.secondaryAction.label}
            </Button>
          </div>
          <TextLink
            href={HOME_HERO.teamLink.href} className="mt-6"
          >
            {HOME_HERO.teamLink.label}
          </TextLink>
        </div>
        <figure className="min-w-0 border border-burgundy/15 bg-cream-light">
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[6/5]">
            <Image
              src={HOME_HERO.image.src}
              alt={HOME_HERO.image.alt}
              fill
              priority
              fetchPriority="high"
              quality={75}
              sizes="(min-width: 1280px) 610px, (min-width: 1024px) 50vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
              className="object-cover"
            />
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-burgundy/15 px-5 py-3 text-xs leading-5 text-ink/80">
            <span>{HOME_HERO.image.context}</span>
            <TextLink href={HOME_HERO.galleryLink.href}>
              {HOME_HERO.galleryLink.label}
            </TextLink>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
