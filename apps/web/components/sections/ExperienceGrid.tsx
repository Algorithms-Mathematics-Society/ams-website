import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { EXPERIENCE } from "@/content/experience";

/** A recap of the Derive edition, anchored by a photograph from the finals. */
export function ExperienceGrid() {
  return (
    <section className="border-y border-cream-light/20 bg-burgundy py-section text-cream-light">
      <Container>
        <Reveal>
          <header className="grid gap-5 border-b border-cream-light/30 pb-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-4">
              <Eyebrow inverse>{EXPERIENCE.eyebrow}</Eyebrow>
            </div>
            <h2 className="max-w-2xl font-sans text-section font-semibold tracking-[-0.035em] text-cream-light md:col-span-8">
              {EXPERIENCE.title}
            </h2>
          </header>

          <div className="grid lg:grid-cols-12">
            <figure className="border-b border-cream-light/30 py-6 lg:col-span-5 lg:border-r lg:border-b-0 lg:pr-8">
              <div className="relative aspect-[4/3] overflow-hidden bg-burgundy-deep">
                <Image
                  src={EXPERIENCE.image.src}
                  alt={EXPERIENCE.image.alt}
                  fill
                  sizes="(min-width: 1280px) 474px, (min-width: 1024px) 40vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs font-medium tracking-[0.08em] text-cream-light/70 uppercase">
                {EXPERIENCE.image.caption}
              </figcaption>
            </figure>

            <ol className="lg:col-span-7 lg:pl-8">
              {EXPERIENCE.stages.map((stage) => (
                <li
                  key={stage.index}
                  className="grid gap-3 border-b border-cream-light/30 py-6 sm:grid-cols-[3rem_minmax(0,1fr)]"
                >
                  <span className="text-xs font-semibold tracking-[0.16em] text-gold-bright">
                    {stage.index}
                  </span>
                  <div className="grid gap-2 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-6">
                    <h3 className="font-sans text-base font-semibold text-cream-light">
                      {stage.title}
                    </h3>
                    <p className="text-sm leading-6 text-cream-light/80">
                      {stage.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
