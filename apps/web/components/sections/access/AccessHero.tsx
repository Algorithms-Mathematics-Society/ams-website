import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ACCESS_HERO } from "@/content/access";

export function AccessHero() {
  return (
    <section className="py-section">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow className="rise">{ACCESS_HERO.eyebrow}</Eyebrow>
          <h1 className="rise-2 rise mt-6 font-display text-hero text-burgundy">
            {ACCESS_HERO.title}
          </h1>
          <p className="rise-3 rise mt-6 max-w-md leading-relaxed">
            {ACCESS_HERO.body}
          </p>
        </div>

        <figure className="rise-3 rise">
          <Image
            src={ACCESS_HERO.image.src}
            alt={ACCESS_HERO.image.alt}
            width={ACCESS_HERO.image.width}
            height={ACCESS_HERO.image.height}
            priority
            sizes="(min-width: 1024px) 544px, 100vw"
            className="rounded-xl border border-burgundy/15 shadow-[0_8px_32px_rgba(87,28,36,0.12)]"
          />
          <figcaption className="mt-3 text-sm text-ink/80">
            {ACCESS_HERO.photoCaption}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
