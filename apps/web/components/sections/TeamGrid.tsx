import Image from "next/image";
import { TextLink } from "@/components/ui/TextLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TEAM } from "@/content/team";

interface Props {
  /** Off on /team, where the PageHeader already introduces the grid. */
  withHeading?: boolean;
}

export function TeamGrid({ withHeading = true }: Props) {
  const NameTag = withHeading ? "h3" : "h2";

  return (
    <section className="pb-section pt-8 sm:pt-10">
      <Container>
        {withHeading && (
          <Reveal>
            <SectionHeading eyebrow="The team" title="The people behind it." />
          </Reveal>
        )}
        <ul className={`grid gap-x-16 gap-y-10 md:grid-cols-2 ${withHeading ? "mt-12" : ""}`}>
          {TEAM.map((member, index) => (
            <li key={member.name} className="min-w-0">
              <Reveal delay={index * 60} className="flex h-full flex-col items-start py-2">
                <div className="flex items-start gap-4">
                  {member.image && (
                    <div className="relative h-[88px] w-[72px] shrink-0 overflow-hidden rounded-media">
                      <Image
                        src={member.image.src}
                        alt={member.image.alt}
                        fill
                        sizes="72px"
                        className="object-cover object-top"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <NameTag className="text-2xl font-semibold tracking-[-0.025em] text-burgundy">
                      {member.name}
                    </NameTag>
                    <p className="mt-3 text-base font-medium leading-6 text-ink">
                      {member.role}
                    </p>
                    {member.affiliation && (
                      <p className="mt-1 text-sm leading-6 text-ink/65">
                        {member.affiliation}
                      </p>
                    )}
                  </div>
                </div>
                {member.bio && (
                  <p className="mt-4 max-w-md text-sm leading-6 text-ink/75">{member.bio}</p>
                )}
                {member.profile && (
                  <div className="mt-auto pt-4">
                    <TextLink href={member.profile.href}>{member.profile.label}</TextLink>
                  </div>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
