import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { STATS, STATS_BAND } from "@/content/stats";

/**
 * Numbers over the hall (block 03): the claim and its evidence share one
 * frame. Photo backdrop drifts at less than page speed (CSS scroll-driven
 * parallax; static where unsupported). The count-up is the page's ONE
 * numeric flourish; underlines draw after each number lands.
 */
export function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-espresso py-20 text-cream-light lg:py-28">
      {/* Parallax bleed: wrapper is taller than the band so the drift
          never exposes edges. quality 50 is invisible under the overlay.
          fetchPriority low so decor never competes with the hero. */}
      <div className="parallax-slow absolute -inset-y-[8%] inset-x-0">
        <Image
          src="/images/derive26/hero/the-hall-at-capacity.webp"
          alt=""
          aria-hidden
          fill
          quality={50}
          fetchPriority="low"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-espresso/85" aria-hidden />
      <Container className="relative">
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
        <p className="caption-fade mt-14 text-sm text-cream-light/60 italic">
          Plate II · The hall at capacity, opening keynote
        </p>
      </Container>
    </section>
  );
}
