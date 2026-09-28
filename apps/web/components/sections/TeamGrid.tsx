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
  // Without the section h2, names step down from the page h1 directly.
  const NameTag = withHeading ? "h3" : "h2";
  return (
    <section className="py-section">
      <Container>
        {withHeading && (
          <Reveal>
            <SectionHeading eyebrow="The team" title="The people behind it." />
          </Reveal>
        )}

        <ul className={`grid gap-x-10 gap-y-10 lg:grid-cols-3 ${withHeading ? "mt-12" : ""}`}>
          {TEAM.map((member, index) => (
            <li
              key={member.name}
              className={member.image ? "lg:col-span-3" : "min-w-0"}
            >
              <Reveal
                delay={index * 70}
                className={member.image ? "grid overflow-hidden rounded-lg bg-paper md:grid-cols-12" : "flex h-full flex-col py-2"}
              >
                {member.image && (
                  <div className="relative aspect-[4/3] overflow-hidden md:col-span-4 md:aspect-[4/5]">
                    <Image
                      src={member.image.src}
                      alt={member.image.alt}
                      fill
                      sizes="(min-width: 1280px) 405px, (min-width: 768px) 33vw, calc(100vw - 40px)"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className={member.image ? "flex flex-col justify-center px-6 py-8 md:col-span-8 md:px-12 md:py-12" : "flex h-full flex-col items-start"}>
                  <NameTag className={member.image ? "text-[clamp(1.875rem,3vw,2.25rem)] font-semibold tracking-[-0.035em] text-burgundy" : "text-2xl font-semibold tracking-[-0.025em] text-burgundy"}>
                    {member.name}
                  </NameTag>
                  <p className="mt-3 text-base font-medium leading-6 text-ink">
                    {member.role}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-ink/65">
                    {member.affiliation}
                  </p>
                  {member.bio && <p className="mt-5 max-w-xl leading-7 text-ink/85">{member.bio}</p>}
                  {member.profile && (
                    <div className={member.image ? "mt-6" : "mt-auto pt-6"}>
                      <TextLink href={member.profile.href}>{member.profile.label}</TextLink>
                    </div>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
