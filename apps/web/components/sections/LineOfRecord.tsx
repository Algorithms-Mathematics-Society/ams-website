import { Container } from "@/components/ui/Container";
import { LINE_OF_RECORD } from "@/content/record";

/** A static proof strip between the home hero and stats band. */
export function LineOfRecord() {
  return (
    <section
      aria-label="AMS at a glance"
      className="border-y border-burgundy/10 bg-cream-light"
    >
      <Container className="py-5 md:flex md:items-center md:py-0">
        <p className="mb-4 md:mr-6 md:mb-0 md:shrink-0">
          <span className="inline-flex min-h-8 items-center rounded-control border border-gold-deep/30 bg-cream px-3 text-[11px] font-semibold tracking-[0.16em] text-gold-deep uppercase">
            {LINE_OF_RECORD.established}
          </span>
        </p>

        <ul className="border-t border-burgundy/12 md:grid md:min-h-20 md:flex-1 md:grid-cols-3 md:border-t-0 md:border-l">
          {LINE_OF_RECORD.facts.map((fact) => (
            <li
              className="flex min-h-12 items-center border-b border-burgundy/12 py-3 text-sm leading-5 font-medium text-ink/80 last:border-b-0 md:min-h-20 md:border-r md:border-b-0 md:px-5 md:py-4 md:last:border-r-0 lg:px-7"
              key={fact}
            >
              {fact}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
