import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { INSTITUTIONAL_OVERVIEW } from "@/content/institutionalOverview";

/** An introduction to AMS alongside a photograph from the finals. */
export function AboutSplit() {
  return (
    <section className="bg-cream-light py-section">
      <Container>
        <Reveal className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.95fr)] lg:gap-20">
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden bg-paper">
            <Image
              src={INSTITUTIONAL_OVERVIEW.image.src}
              alt={INSTITUTIONAL_OVERVIEW.image.alt}
              fill
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
              className="object-cover"
            />
            </div>
            <figcaption className="mt-3 text-xs leading-5 text-ink/75">{INSTITUTIONAL_OVERVIEW.image.caption}</figcaption>
          </figure>

          <div>
            <Eyebrow>{INSTITUTIONAL_OVERVIEW.eyebrow}</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-sans text-section font-medium tracking-[-0.04em] text-burgundy">
              {INSTITUTIONAL_OVERVIEW.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-ink/80">
              {INSTITUTIONAL_OVERVIEW.definition}
            </p>
            <Button
              href={INSTITUTIONAL_OVERVIEW.action.href}
              className="mt-8"
            >
              {INSTITUTIONAL_OVERVIEW.action.label}
            </Button>
            <div className="mt-4 flex flex-wrap gap-x-6">
              {INSTITUTIONAL_OVERVIEW.evidenceLinks.map((link) => (
                <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center gap-2 text-sm text-burgundy underline underline-offset-4">
                  {link.label} <span aria-hidden>→</span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-14 grid border-t border-burgundy/15 sm:grid-cols-3">
          {INSTITUTIONAL_OVERVIEW.mandate.map((item) => (
            <article
              key={item.number}
              className="border-b border-burgundy/15 py-7 sm:border-r sm:border-b-0 sm:px-7 sm:first:pl-0 sm:last:border-r-0"
            >
              <span className="text-xs font-bold tracking-[0.18em] text-gold-deep">
                {item.number}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-burgundy">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink/75">{item.body}</p>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
