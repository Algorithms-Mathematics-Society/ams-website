import { Container } from "@/components/ui/Container";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EXPERIENCE } from "@/content/experience";

export function ExperienceGrid() {
  return (
    <section className="py-section">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="The experience" title="Not told. Shown." />
        </Reveal>

        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCE.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 90}>
                <PhotoPlaceholder label={item.photoLabel} />
                <h3 className="mt-5 font-display text-lg font-semibold text-burgundy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed">{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
