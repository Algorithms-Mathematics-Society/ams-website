import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DERIVE_HERO } from "@/content/derive";

export function DeriveHero() {
  return (
    <section className="py-section">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>{DERIVE_HERO.eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-hero font-normal tracking-[-0.04em] text-burgundy">
            {DERIVE_HERO.title}
          </h1>
          <p className="mt-6 max-w-md leading-relaxed">
            {DERIVE_HERO.body}
          </p>
          <Button href={DERIVE_HERO.archiveLink.href} variant="outline" className="mt-7">
            {DERIVE_HERO.archiveLink.label}
          </Button>
        </div>

        <figure>
          <div className="relative aspect-[13/11] overflow-hidden border border-burgundy/20 bg-paper">
            <Image
              src={DERIVE_HERO.image.src}
              alt={DERIVE_HERO.image.alt}
              fill
              priority
              sizes="(min-width: 1280px) 576px, (min-width: 1024px) 46vw, calc(100vw - 40px)"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm text-ink/80">
            {DERIVE_HERO.photoCaption}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
