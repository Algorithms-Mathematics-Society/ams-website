import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DERIVE_CTA } from "@/content/derive";

export function DeriveCta() {
  return (
    <section className="bg-burgundy py-section text-cream-light">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-section">{DERIVE_CTA.title}</h2>
          <p className="mt-5 leading-relaxed text-cream-light/85">
            {DERIVE_CTA.body}
          </p>
          <div className="mt-9">
            <Button href={DERIVE_CTA.buttonHref} variant="inverse">
              {DERIVE_CTA.buttonLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
