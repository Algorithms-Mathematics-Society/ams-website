import { Container } from "@/components/ui/Container";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TEAM } from "@/content/team";

interface Props {
  /** Off on /team, where the PageHeader already introduces the grid. */
  withHeading?: boolean;
}

export function TeamGrid({ withHeading = true }: Props) {
  return (
    <section className="py-section">
      <Container>
        {withHeading && (
          <Reveal>
            <SectionHeading eyebrow="The team" title="The people behind it." />
          </Reveal>
        )}

        <ul
          className={`grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 ${withHeading ? "mt-12" : ""}`}
        >
          {TEAM.map((member, index) => (
            <li key={`${member.name}-${member.role}`}>
              <Reveal delay={index * 70}>
                <PhotoPlaceholder
                  label={`Portrait · ${member.role}, formal, cream backdrop`}
                  aspect="aspect-[4/5]"
                  rounded="rounded-lg"
                  className="p-3"
                />
                <h3 className="mt-4 font-display font-semibold text-burgundy">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-ink/70">{member.role}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
