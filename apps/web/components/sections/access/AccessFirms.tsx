import { TextLink } from "@/components/ui/TextLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ACCESS_FIRMS } from "@/content/access";

export function AccessFirms() {
  return (
    <section id={ACCESS_FIRMS.id} className="scroll-mt-24 bg-cream-light py-section">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:gap-16">
          <SectionHeading eyebrow={ACCESS_FIRMS.eyebrow} title={ACCESS_FIRMS.title} />
          <p className="max-w-lg self-end leading-relaxed text-ink/85">
            {ACCESS_FIRMS.body}
          </p>
        </Reveal>
        <div className="mt-8 divide-y divide-burgundy/15">
          {ACCESS_FIRMS.opportunities.map((opportunity) => (
            <Reveal key={opportunity.name}>
              <article className="grid gap-5 py-8 md:grid-cols-[1fr_2fr] md:gap-12 lg:py-10">
                <div>
                  <h3 className="font-display text-3xl text-burgundy">{opportunity.name}</h3>
                  <p className="mt-2 text-sm font-medium text-ink/75">{opportunity.status}</p>
                </div>
                <div className="max-w-2xl">
                  <p className="leading-relaxed text-ink/85">{opportunity.body}</p>
                  <TextLink href={opportunity.link.href} className="mt-3">
                    {opportunity.link.label}
                  </TextLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
