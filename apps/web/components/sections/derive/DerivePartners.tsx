import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DERIVE_PARTNERS } from "@/content/derive";

export function DerivePartners() {
  return (
    <section className="py-section">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Backed by" title="The firms in the room." />
        </Reveal>

        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {DERIVE_PARTNERS.map((partner, index) => (
            <li key={partner.name} className="h-full">
              <Reveal
                delay={index * 90}
                className="h-full rounded-xl border border-burgundy/10 bg-cream-light p-8"
              >
                <Eyebrow>{partner.tier}</Eyebrow>
                <p className="mt-4 font-display text-3xl tracking-[0.08em] text-ink/85">
                  {partner.name}
                </p>
                <p className="mt-4 max-w-md text-sm leading-relaxed">
                  {partner.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
