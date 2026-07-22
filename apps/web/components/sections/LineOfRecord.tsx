import { Container } from "@/components/ui/Container";
import { LINE_OF_RECORD } from "@/content/record";

/** A static proof strip between the home hero and stats band. */
export function LineOfRecord() {
  return (
    <section
      aria-label="AMS at a glance"
      className="border-b border-burgundy/30 bg-cream-light"
    >
      <Container>
        <div className="border-x border-burgundy/25 md:grid md:grid-cols-[13rem_1fr]">
          <p className="flex min-h-16 items-center border-b border-burgundy/25 px-5 text-[11px] font-bold tracking-[0.16em] text-burgundy uppercase md:border-r md:border-b-0 md:px-6">
            {LINE_OF_RECORD.established}
          </p>
          <ul className="grid sm:grid-cols-3">
            {LINE_OF_RECORD.facts.map((fact) => (
              <li
                className="flex min-h-16 items-center border-b border-burgundy/20 px-5 py-3 text-sm leading-5 font-semibold text-ink/85 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0 md:px-6"
                key={fact}
              >
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
