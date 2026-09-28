import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface Props {
  eyebrow: string;
  title: string;
  body?: string;
}

/** Stable, ruled page opener for content pages. */
export function PageHeader({ eyebrow, title, body }: Props) {
  return (
    <section className="border-b border-burgundy/20 py-section">
      <Container className="max-w-2xl lg:max-w-none">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-3xl font-display text-hero font-normal tracking-[-0.04em] text-burgundy">
          {title}
        </h1>
        {body && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/85">{body}</p>
        )}
      </Container>
    </section>
  );
}
