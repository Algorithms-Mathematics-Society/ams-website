import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ACCESS_CTA } from "@/content/access";

export function AccessCta() {
  return (
    <section className="bg-burgundy py-section text-cream-light">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-section">{ACCESS_CTA.title}</h2>
          <p className="mt-5 leading-relaxed text-cream-light/85">
            {ACCESS_CTA.body}
          </p>
          <div className="mt-9">
            <Button href={ACCESS_CTA.buttonHref} variant="inverse">
              {ACCESS_CTA.buttonLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
