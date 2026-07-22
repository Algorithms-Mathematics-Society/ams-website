import Image from "next/image";
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

        <ul className={`border-y border-burgundy/20 ${withHeading ? "mt-12" : ""}`}>
          {TEAM.map((member, index) => (
            <li key={`${member.name}-${member.role}`}>
              <Reveal
                delay={index * 70}
                className="grid border-b border-burgundy/20 last:border-b-0 md:grid-cols-12"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-paper md:col-span-4 md:aspect-[4/5]">
                  <Image
                    src={member.image.src}
                    alt={member.image.alt}
                    fill
                    sizes="(min-width: 1024px) 362px, (min-width: 768px) 33vw, calc(100vw - 40px)"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-end border-t border-burgundy/20 px-5 py-7 md:col-span-8 md:border-t-0 md:border-l md:px-10 md:py-10">
                  <p className="text-xs font-semibold tracking-[0.18em] text-gold-deep tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <NameTag className="mt-6 text-3xl font-semibold tracking-[-0.035em] text-burgundy sm:text-4xl">
                    {member.name}
                  </NameTag>
                  <p className="mt-2 text-sm font-semibold tracking-[0.12em] text-ink/70 uppercase">
                    {member.role}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
