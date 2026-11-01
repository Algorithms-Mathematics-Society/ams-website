import { TextLink } from "@/components/ui/TextLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ACCESS_FIRMS } from "@/content/access";

export function AccessFirms() {
  return (
    <section id={ACCESS_FIRMS.id} className="scroll-mt-24 bg-cream-light py-section">
      <Container>
        <Reveal className="grid gap-5 lg:grid-cols-2 lg:gap-16">
          <SectionHeading eyebrow={ACCESS_FIRMS.eyebrow} title={ACCESS_FIRMS.title} />
          <p className="max-w-lg self-end leading-relaxed text-ink/85">
            {ACCESS_FIRMS.body}
          </p>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {ACCESS_FIRMS.opportunities.map((opportunity) => (
            <Reveal key={opportunity.name} className="h-full">
              <article className="flex h-full flex-col rounded-panel border border-burgundy/15 bg-cream p-6 lg:p-8">
                <p className="text-sm font-medium text-burgundy">{opportunity.status}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-burgundy">{opportunity.name}</h3>
                <dl className="mt-6 space-y-5">
                  {opportunity.details.map((detail) => (
                    <div key={detail.label}>
                      <dt className="text-sm font-semibold text-burgundy">{detail.label}</dt>
                      <dd className="mt-1 leading-relaxed text-ink/85">{detail.body}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-auto pt-5">
                  <TextLink href={opportunity.link.href}>
                    {opportunity.link.label}
                  </TextLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 grid gap-4 border-t border-burgundy/15 pt-8 md:grid-cols-2 md:gap-8">
          <div>
            <Eyebrow>{ACCESS_FIRMS.evidence.label}</Eyebrow>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-burgundy">
              {ACCESS_FIRMS.evidence.title}
            </h3>
          </div>
          <div>
            <p className="leading-relaxed text-ink/85">{ACCESS_FIRMS.evidence.body}</p>
            <TextLink href={ACCESS_FIRMS.evidence.link.href} className="mt-2">
              {ACCESS_FIRMS.evidence.link.label}
            </TextLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
