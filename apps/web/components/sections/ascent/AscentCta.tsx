import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ASCENT_CTA } from "@/content/ascent";

export function AscentCta() {
  return (
    <section className="bg-burgundy py-section text-cream-light">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-section">{ASCENT_CTA.title}</h2>
          <p className="mt-5 leading-relaxed text-cream-light/85">
            {ASCENT_CTA.body}
          </p>
          <div className="mt-9">
            <Button href={ASCENT_CTA.buttonHref} variant="inverse">
              {ASCENT_CTA.buttonLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
