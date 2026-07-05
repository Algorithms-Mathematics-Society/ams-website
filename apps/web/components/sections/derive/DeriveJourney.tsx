import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DERIVE_STAGES } from "@/content/derive";

/** The 2,500 → 150 → 50 funnel from the first edition, told as three stages. */
export function DeriveJourney() {
  return (
    <section className="bg-espresso py-section text-cream-light">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Derive '26"
            title="The road to Bombay."
            inverse
          />
        </Reveal>

        <ol className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-8">
          {DERIVE_STAGES.map((stage, index) => (
            <li key={stage.title}>
              <Reveal delay={index * 100}>
                <p className="font-display text-stat">
                  {stage.stat}
                  <span className="ml-2 text-lg text-cream-light/70">
                    {stage.statLabel}
                  </span>
                </p>
                <div className="mt-3 h-0.5 w-9 bg-gold" aria-hidden />
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-light/85">
                  {stage.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
