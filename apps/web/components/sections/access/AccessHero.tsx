import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ACCESS_HERO } from "@/content/access";

export function AccessHero() {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>{ACCESS_HERO.eyebrow}</Eyebrow>
          <h1 className="mt-4 font-sans text-hero font-semibold tracking-[-0.04em] text-burgundy">
            {ACCESS_HERO.title}
          </h1>
          <p className="mt-5 max-w-lg leading-relaxed text-ink/85">
            {ACCESS_HERO.body}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={ACCESS_HERO.primaryLink.href}>
              {ACCESS_HERO.primaryLink.label}
            </Button>
            <Button href={ACCESS_HERO.secondaryLink.href} variant="outline">
              {ACCESS_HERO.secondaryLink.label}
            </Button>
          </div>
          <p className="mt-4 text-sm text-ink/75">{ACCESS_HERO.note}</p>
        </div>
        <figure className="min-w-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-cream">
            <Image
              src={ACCESS_HERO.image.src}
              alt={ACCESS_HERO.image.alt}
              fill
              priority
              sizes="(min-width: 1280px) 576px, (min-width: 1024px) 46vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm text-ink/75">
            {ACCESS_HERO.photoCaption}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
