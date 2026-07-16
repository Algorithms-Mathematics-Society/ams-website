import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { STATS } from "@/content/stats";

const [lead, ...supporting] = STATS;

/**
 * Numbers as set type (block 03): a typographic poster on solid espresso,
 * centred. The hero one viewport up already showed the stage, so the band
 * shows no photo and no line introduces the numbers. One number leads: the
 * talent pool is set oversized with the page's one sanctioned count-up and
 * a single gold rule; the other two sit smaller beneath it, static. The
 * scale does the ranking, so three numbers read as an authored claim, not
 * three interchangeable slots of a stat widget.
 */
export function StatsBand() {
  return (
    <section className="bg-espresso py-20 text-center text-cream-light lg:py-28">
      <Container>
        <dl>
          <Reveal>
            <dd className="font-display text-stat-lead">
              <CountUp value={lead.value} />
            </dd>
            {/* The rule belongs to the lead only now, so it reads as this
                number's mark rather than a caption accessory stamped under
                all three. Draws 400ms after the 1.2s count settles. */}
            <div
              className="underline-draw mx-auto mt-4 h-0.5 w-12 bg-gold"
              style={{ transitionDelay: "1600ms" }}
              aria-hidden
            />
            <dt className="mt-3 text-sm font-semibold tracking-[0.2em] text-cream-light/80 uppercase">
              {lead.label}
            </dt>
          </Reveal>

          <Reveal
            delay={200}
            className="mx-auto mt-12 grid max-w-md grid-cols-2 gap-x-10"
          >
            {supporting.map((stat) => (
              <div key={stat.label}>
                {/* Static: 0 to 30 over 1.2s reads as a twitch, not a count,
                    so the device stays on the lead number where it pays off. */}
                <dd className="font-display text-stat">{stat.value}</dd>
                <dt className="mt-2 text-xs font-semibold tracking-[0.18em] text-cream-light/70 uppercase">
                  {stat.label}
                </dt>
              </div>
            ))}
          </Reveal>
        </dl>
      </Container>
    </section>
  );
}
