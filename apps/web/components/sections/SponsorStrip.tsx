import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * TODO(launch): replace text with approved logo files only,
 * per the sponsor logo-approval workflow (design note).
 */
const SPONSORS = ["Jane Street", "QRT"];

export function SponsorStrip() {
  return (
    <section className="bg-cream-light py-12">
      <Container>
        <Reveal className="flex flex-col items-center gap-8 sm:flex-row sm:gap-16">
          <Eyebrow>Backed by</Eyebrow>
          <ul className="flex flex-wrap items-center gap-x-16 gap-y-6">
            {SPONSORS.map((name) => (
              <li
                key={name}
                className="font-display text-2xl tracking-[0.12em] text-ink/80"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
