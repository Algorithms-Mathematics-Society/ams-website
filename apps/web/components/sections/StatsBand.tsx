import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { STATS, STATS_BAND } from "@/content/stats";

/**
 * Numbers as set type (block 03): a typographic poster on solid espresso.
 * The hero one viewport up has already shown the stage, so the band shows
 * no photo; on flat ground the numbers read as claims, not decoration.
 * The count-up is the page's ONE numeric flourish; underlines draw after
 * each number lands.
 */
export function StatsBand() {
  return (
    <section className="bg-espresso py-20 text-cream-light lg:py-28">
      <Container>
        <Reveal>
          <p className="font-display text-xl italic text-cream-light/90 sm:text-2xl">
            {STATS_BAND.emotionalLine}
          </p>
        </Reveal>
        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 150}>
              <dd className="font-display text-stat">
                <CountUp value={stat.value} delay={index * 150} />
              </dd>
              {/* Draws 400ms after its number lands:
                  1200ms count + 150ms stagger + 400ms. */}
              <div
                className="underline-draw mt-3 h-0.5 w-9 bg-gold"
                style={{ transitionDelay: `${1600 + index * 150}ms` }}
                aria-hidden
              />
              <dt className="mt-3 text-sm text-cream-light/85">{stat.label}</dt>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
