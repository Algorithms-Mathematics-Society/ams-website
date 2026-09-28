import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface Props {
  eyebrow: string;
  title: string;
  body?: string;
  compact?: boolean;
}

/** Stable, ruled page opener for content pages. */
export function PageHeader({ eyebrow, title, body, compact = false }: Props) {
  return (
    <section className={compact ? "pt-12 pb-6 sm:pt-16" : "border-b border-burgundy/20 py-section"}>
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className={`mt-6 max-w-3xl font-display font-normal tracking-[-0.04em] text-burgundy ${compact ? "text-section" : "text-hero"}`}>
          {title}
        </h1>
        {body && (
          <p className={`max-w-2xl leading-relaxed text-ink/85 ${compact ? "mt-4 text-base" : "mt-6 text-lg"}`}>{body}</p>
        )}
      </Container>
    </section>
  );
}
