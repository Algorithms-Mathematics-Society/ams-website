import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ACCESS_FEATURES, ACCESS_WORDMARK } from "@/content/access";

export function AccessFeatures() {
  return (
    <section className="bg-espresso py-section text-cream-light">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The shell"
            title="Built like a proctor, not a plugin."
            inverse
          />
        </Reveal>

        <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {ACCESS_FEATURES.map((feature, index) => (
            <li key={feature.title}>
              <Reveal delay={(index % 3) * 90}>
                <div className="h-0.5 w-9 bg-gold" aria-hidden />
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-light/85">
                  {feature.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-16 flex flex-col items-start gap-4 border-t border-cream-light/15 pt-8 sm:flex-row sm:items-center">
          {/* Product wordmark uses white lettering and the approved red accent. */}
          <Image
            src={ACCESS_WORDMARK.src}
            alt={ACCESS_WORDMARK.alt}
            width={131}
            height={30}
            className="preserve-accent"
          />
          <p className="text-sm text-cream-light/70">
            {ACCESS_WORDMARK.caption}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
