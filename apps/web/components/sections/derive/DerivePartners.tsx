import Image from "next/image";
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
                className="h-full rounded-panel border border-burgundy/20 bg-cream-light p-8"
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
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
