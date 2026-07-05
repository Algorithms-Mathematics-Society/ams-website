import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface Props {
  eyebrow: string;
  title: string;
  body: string;
}

/** Stub body for routes whose full pages are still being designed. */
export function ComingSoon({ eyebrow, title, body }: Props) {
  return (
    <section className="py-section">
      <Container className="max-w-2xl">
        <Eyebrow className="rise">{eyebrow}</Eyebrow>
        <h1 className="rise-2 rise mt-6 font-display text-hero text-burgundy">
          {title}
        </h1>
        <p className="rise-3 rise mt-6 leading-relaxed">{body}</p>
      </Container>
    </section>
  );
}
