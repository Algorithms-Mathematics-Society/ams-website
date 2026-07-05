import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { DERIVE_HERO } from "@/content/derive";

export function DeriveHero() {
  return (
    <section className="py-section">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow className="rise">{DERIVE_HERO.eyebrow}</Eyebrow>
          <h1 className="rise-2 rise mt-6 font-display text-hero text-burgundy">
            {DERIVE_HERO.title}
          </h1>
          <p className="rise-3 rise mt-6 max-w-md leading-relaxed">
            {DERIVE_HERO.body}
          </p>
        </div>

        <figure className="rise-3 rise">
          <PhotoPlaceholder
            label={DERIVE_HERO.photoLabel}
            aspect="aspect-[13/11]"
          />
          <figcaption className="mt-3 text-sm text-ink/80">
            {DERIVE_HERO.photoCaption}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
