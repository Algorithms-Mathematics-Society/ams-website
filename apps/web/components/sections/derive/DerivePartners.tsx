import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DERIVE_PARTNERS, DERIVE_PARTNERS_SECTION } from "@/content/derive";

export function DerivePartners() {
  return (
    <section id="partners" className="scroll-mt-20 py-section">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={DERIVE_PARTNERS_SECTION.eyebrow}
            title={DERIVE_PARTNERS_SECTION.title}
          />
        </Reveal>

        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {DERIVE_PARTNERS.map((partner, index) => (
            <li key={partner.name} className="h-full">
              <Reveal
                delay={index * 90}
                className="flex h-full flex-col rounded-panel border border-burgundy/20 bg-cream-light p-6 sm:p-8"
              >
                <Eyebrow>{partner.tier}</Eyebrow>
                {/* Dark inset panel: the approved marks are built for a dark
                    surface (Jane Street is a white wordmark, QRT a blue cube
                    with white type), so they sit on burgundy to stay legible
                    on the cream card. */}
                <div className="mt-5 flex h-28 items-center justify-center rounded-media bg-burgundy-deep px-6">
                  <Image
                    src={partner.logo.src}
                    alt={partner.name}
                    width={partner.logo.width}
                    height={partner.logo.height}
                    className={partner.logo.className}
                  />
                </div>
                <p className="mt-5 max-w-md text-sm leading-relaxed">
                  {partner.description}
                </p>
                <a
                  href={partner.href}
                  className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-burgundy underline decoration-burgundy/35 underline-offset-4 hover:decoration-burgundy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-deep"
                >
                  {partner.name}
                  <span aria-hidden="true">↗</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
