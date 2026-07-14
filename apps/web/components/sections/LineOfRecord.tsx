import { Container } from "@/components/ui/Container";
import { LINE_OF_RECORD } from "@/content/record";

/** Thin cream imprint strip. Plain HTML, no motion, ever (motion spec 02). */
export function LineOfRecord() {
  return (
    <section className="border-b border-burgundy/10 bg-cream-light">
      <Container className="flex flex-col gap-2 py-7 text-[11px] font-medium tracking-[0.25em] text-ink/70 uppercase sm:flex-row sm:items-center sm:gap-10 sm:py-8">
        <p className="shrink-0 text-gold-deep">{LINE_OF_RECORD.established}</p>
        <p>{LINE_OF_RECORD.line}</p>
      </Container>
    </section>
  );
}
