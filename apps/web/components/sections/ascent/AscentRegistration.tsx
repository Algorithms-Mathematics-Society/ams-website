import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ASCENT_REGISTRATION } from "@/content/ascent";

export function AscentRegistration() {
  return (
    <section className="border-y border-burgundy/15 bg-cream-light py-section">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={ASCENT_REGISTRATION.eyebrow} title={ASCENT_REGISTRATION.title} />
          <dl className="mt-9 grid gap-x-12 gap-y-7 md:grid-cols-2">
            {ASCENT_REGISTRATION.facts.map((fact) => (
              <div key={fact.label} className="border-t border-burgundy/20 pt-5">
                <dt className="text-lg font-semibold text-burgundy">{fact.label}</dt>
                <dd className="mt-2 max-w-xl leading-7 text-ink/85">{fact.detail}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-2">
            {ASCENT_REGISTRATION.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-burgundy underline underline-offset-4">
                  {link.label} <span aria-hidden>↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
