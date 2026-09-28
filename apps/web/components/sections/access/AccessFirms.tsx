import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ACCESS_FIRMS } from "@/content/access";

export function AccessFirms() {
  return (
    <section id={ACCESS_FIRMS.id} className="scroll-mt-24 py-section">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>{ACCESS_FIRMS.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-sans text-section font-semibold tracking-[-0.035em] text-burgundy">
            {ACCESS_FIRMS.title}
          </h2>
          <div className="mt-6 space-y-5 leading-relaxed">
            {ACCESS_FIRMS.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-7 divide-y divide-burgundy/15 border-y border-burgundy/15">
            {ACCESS_FIRMS.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-12 items-center justify-between gap-4 py-3 text-sm font-semibold text-burgundy hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy"
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden bg-cream">
              <Image
                src={ACCESS_FIRMS.image.src}
                alt={ACCESS_FIRMS.image.alt}
                fill
                sizes="(min-width: 1280px) 576px, (min-width: 1024px) 46vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm leading-relaxed text-ink/80">
              {ACCESS_FIRMS.image.caption}
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
