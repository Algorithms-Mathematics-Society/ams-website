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
    <section className="border-y border-burgundy-deep bg-burgundy py-section text-cream-light">
      <Container>
        <Reveal className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <h2 className="font-sans text-section font-semibold tracking-[-0.035em]">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-cream-light/85">
              {body}
            </p>
          </div>
          <div className="md:col-span-4 md:flex md:justify-end">
            <Button href={buttonHref} variant="inverse">
              {buttonLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
