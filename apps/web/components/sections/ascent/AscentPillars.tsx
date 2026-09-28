import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ASCENT_PILLARS } from "@/content/ascent";

export function AscentPillars() {
  return (
    <section className="bg-espresso py-section text-cream-light">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The discipline"
            title="What Ascent measures."
            inverse
          />
        </Reveal>

        <ul className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-8">
          {ASCENT_PILLARS.map((pillar, index) => (
            <li key={pillar.title}>
              <Reveal delay={index * 100}>
                <h3 className="font-display text-xl font-semibold">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-light/85">
                  {pillar.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
