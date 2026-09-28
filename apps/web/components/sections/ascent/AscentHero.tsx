import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ASCENT_CTA, ASCENT_HERO } from "@/content/ascent";

export function AscentHero() {
  return (
    <section className="py-section">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>{ASCENT_HERO.eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-hero font-normal tracking-[-0.04em] text-burgundy">
            {ASCENT_HERO.title}
          </h1>
          <p className="mt-6 max-w-md leading-relaxed">
            {ASCENT_HERO.body}
          </p>
          <Button href={ASCENT_CTA.buttonHref} className="mt-7">{ASCENT_CTA.buttonLabel}</Button>
        </div>

        <aside className="border-y border-burgundy/25 bg-cream-light">
          <div className="border-b border-burgundy/20 px-6 py-7 sm:px-8">
            <p className="text-[11px] font-bold tracking-[0.16em] text-gold-deep uppercase">
              {ASCENT_HERO.statusLabel}
            </p>
            <p className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-burgundy sm:text-4xl">
              {ASCENT_HERO.status}
            </p>
            <p className="mt-2 text-sm text-ink/75">{ASCENT_HERO.statusDetail}</p>
          </div>
          <div className="px-6 py-7 sm:px-8">
            <p className="text-[11px] font-bold tracking-[0.16em] text-gold-deep uppercase">
              {ASCENT_HERO.focusLabel}
            </p>
            <ul className="mt-5 border-t border-burgundy/20">
              {ASCENT_HERO.focusAreas.map((area, index) => (
                <li
                  key={area}
                  className="grid grid-cols-[2.5rem_1fr] border-b border-burgundy/20 py-4 text-sm font-semibold text-burgundy"
                >
                  <span className="text-xs text-gold-deep tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Container>
    </section>
  );
}
