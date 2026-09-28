import { TextLink } from "@/components/ui/TextLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ACCESS_EVALUATION } from "@/content/access";

/** A secondary offer, deliberately placed after the sponsorship conversation. */
export function AccessFeatures() {
  return (
    <section id="assessments" className="scroll-mt-24 bg-cream-light py-12 sm:py-16">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12">
          <div>
            <Eyebrow>{ACCESS_EVALUATION.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-burgundy">
              {ACCESS_EVALUATION.title}
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="leading-relaxed text-ink/85">{ACCESS_EVALUATION.body}</p>
            <TextLink href={ACCESS_EVALUATION.link.href} className="mt-3">
              {ACCESS_EVALUATION.link.label}
            </TextLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
