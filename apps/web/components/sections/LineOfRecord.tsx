import { Container } from "@/components/ui/Container";
import { LINE_OF_RECORD } from "@/content/record";

/**
 * Thin cream imprint strip. Plain HTML, no motion, ever (motion spec 02):
 * a static beat of provenance between the animated hero and stats band.
 * The date and place are set as a bordered stamp, not the first item of a
 * dotted list, so the strip reads as a filed record rather than repeating
 * the hero eyebrow's grammar one screen-inch above it. Stays stacked until
 * lg, where there is finally room for the long clause on one row.
 */
export function LineOfRecord() {
  return (
    <section className="border-b border-burgundy/10 bg-cream-light">
      <Container className="flex flex-col gap-4 py-7 lg:flex-row lg:items-center lg:gap-6 lg:py-8">
        <span className="inline-flex w-fit shrink-0 items-center rounded-sm border border-gold-deep/30 px-3 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-gold-deep uppercase">
          {LINE_OF_RECORD.established}
        </span>
        <span aria-hidden className="hidden h-4 w-px bg-burgundy/15 lg:block" />
        <p className="text-[11px] font-medium tracking-[0.25em] text-ink/70 uppercase">
          {LINE_OF_RECORD.line}
        </p>
      </Container>
    </section>
  );
}
