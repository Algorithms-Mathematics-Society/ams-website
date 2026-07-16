import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlateFrame } from "@/components/ui/PlateFrame";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT } from "@/content/about";

/**
 * The founder letter (block 04): a human voice after institutional proof.
 * The split is deliberately uneven (photo 5, letter 7) so the words lead
 * and the portrait supports, the way a letter reads. The photo is mounted
 * like the archival plate its caption names, not left as another rounded
 * card. Photo and text fade up independently (photo first, text 200ms
 * later); the gold rule draws last, like ink drying, and the name is set
 * as a signature, not a second heading.
 */
export function AboutSplit() {
  return (
    <section className="py-section">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <PlateFrame caption={ABOUT.photoCaption}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
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

        <Reveal delay={200} className="lg:col-span-7">
          <Eyebrow>{ABOUT.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-section text-burgundy">
            {ABOUT.title}
          </h2>
          <div className="mt-6 space-y-5 leading-relaxed">
            {ABOUT.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {/* Signature, not a second headline: the rule draws last (1000ms,
              after the text Reveal settles at 900ms), then the name in light
              large Fraunces reads as a sign-off rather than the bold burgundy
              weight the H2 uses. */}
          <div className="mt-10">
            <div
              className="underline-draw h-px w-14 bg-gold"
              style={{ transitionDelay: "1000ms" }}
              aria-hidden
            />
            <p className="mt-5 font-display text-2xl leading-none font-normal text-burgundy">
              {ABOUT.attribution}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
