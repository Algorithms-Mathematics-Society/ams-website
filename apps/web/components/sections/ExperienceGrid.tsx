import { Container } from "@/components/ui/Container";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EXPERIENCE } from "@/content/experience";

export function ExperienceGrid() {
  return (
    <section className="py-section">
      <Container>
        <SectionHeading eyebrow="The experience" title="Not told. Shown." />

        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCE.map((item) => (
            <li key={item.title}>
              <PhotoPlaceholder label={item.photoLabel} />
              <h3 className="mt-5 font-display text-lg font-semibold text-maroon">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
