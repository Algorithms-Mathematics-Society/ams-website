import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ACCESS_HERO } from "@/content/access";

export function AccessHero() {
  return (
    <section className="py-section">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>{ACCESS_HERO.eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-hero font-normal tracking-[-0.04em] text-burgundy">
            {ACCESS_HERO.title}
          </h1>
          <p className="mt-6 max-w-md leading-relaxed">
            {ACCESS_HERO.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={ACCESS_HERO.primaryLink.href}>
              {ACCESS_HERO.primaryLink.label}
            </Button>
            <Button href={ACCESS_HERO.secondaryLink.href} variant="outline">
              {ACCESS_HERO.secondaryLink.label}
            </Button>
          </div>
        </div>

        <figure className="min-w-0 border border-burgundy/15 bg-cream-light p-3 sm:p-5">
          <Image
            src={ACCESS_HERO.image.src}
            alt={ACCESS_HERO.image.alt}
            width={ACCESS_HERO.image.width}
            height={ACCESS_HERO.image.height}
            priority
            sizes="(min-width: 1280px) 536px, (min-width: 1024px) 45vw, (min-width: 640px) calc(100vw - 104px), calc(100vw - 64px)"
          />
          <figcaption className="mt-3 text-sm text-ink/80">
            {ACCESS_HERO.photoCaption}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
