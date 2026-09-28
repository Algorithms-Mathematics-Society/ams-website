import { TextLink } from "@/components/ui/TextLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ASCENT_STANDARD } from "@/content/ascent";

export function AscentStandard() {
  return (
    <section className="py-section">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{ASCENT_STANDARD.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-sans text-section font-semibold tracking-[-0.035em] text-burgundy">
            {ASCENT_STANDARD.title}
          </h2>
          <p className="mt-6 leading-relaxed">{ASCENT_STANDARD.body}</p>
          <TextLink
            href={ASCENT_STANDARD.linkHref} className="mt-8"
          >
            {ASCENT_STANDARD.linkLabel}
          </TextLink>
        </Reveal>
      </Container>
    </section>
  );
}
