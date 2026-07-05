import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

interface Props {
  title: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
}

/** Burgundy closing band shared by every page's final call to action. */
export function CtaBand({ title, body, buttonLabel, buttonHref }: Props) {
  return (
    <section className="bg-burgundy py-section text-cream-light">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-section">{title}</h2>
          <p className="mt-5 leading-relaxed text-cream-light/85">{body}</p>
          <div className="mt-9">
            <Button href={buttonHref} variant="inverse">
              {buttonLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
