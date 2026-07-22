import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlateFrame } from "@/components/ui/PlateFrame";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT } from "@/content/about";

/** The founder letter: visual evidence followed by a compact editorial note. */
export function AboutSplit() {
  return (
    <section className="border-y border-burgundy/10 bg-cream-light/60 py-section">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-0">
        <Reveal className="lg:col-span-5 lg:pr-12">
          <PlateFrame caption={ABOUT.photoCaption}>
            <div className="relative aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src={ABOUT.photo.src}
                alt={ABOUT.photo.alt}
                fill
                sizes="(min-width: 1280px) 440px, (min-width: 1024px) 38vw, 92vw"
                className="object-cover object-[center_38%]"
              />
            </div>
          </PlateFrame>
        </Reveal>

        <Reveal
          delay={120}
          className="border-t border-burgundy/15 pt-8 lg:col-span-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12"
        >
          <div className="max-w-2xl">
            <Eyebrow>{ABOUT.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-section text-burgundy">
              {ABOUT.title}
            </h2>
            <div className="mt-6 space-y-5 leading-relaxed">
              {ABOUT.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-8 border-t border-gold-deep/30 pt-4 text-sm font-semibold tracking-wide text-burgundy">
              {ABOUT.attribution}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
