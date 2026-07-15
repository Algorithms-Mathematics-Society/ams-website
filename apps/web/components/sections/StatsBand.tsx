import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { STATS } from "@/content/stats";

/**
 * Numbers as set type (block 03): a typographic poster on solid espresso.
 * The hero one viewport up has already shown the stage, so the band shows
 * no photo; on flat ground the numbers read as claims, not decoration, and
 * they carry the band alone: no line introduces them. The count-up is the
 * page's ONE numeric flourish; underlines draw after each number lands.
 */
export function StatsBand() {
  return (
    <section className="bg-espresso py-20 text-cream-light lg:py-28">
      <Container>
        <dl className="grid gap-x-8 gap-y-12 text-center sm:grid-cols-3">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 150}>
              <dd className="font-display text-stat">
                <CountUp value={stat.value} delay={index * 150} />
              </dd>
              {/* Draws 400ms after its number lands:
                  1200ms count + 150ms stagger + 400ms. The draw still runs
                  left to right, the site's gesture everywhere; only the
                  rule's box is centred under the number. */}
              <div
                className="underline-draw mx-auto mt-3 h-0.5 w-9 bg-gold"
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
