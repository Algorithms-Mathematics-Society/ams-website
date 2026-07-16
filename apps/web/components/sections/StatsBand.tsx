import { Container } from "@/components/ui/Container";
import { STATS } from "@/content/stats";

const [lead, ...supporting] = STATS;

/**
 * Numbers as set type (block 03): a typographic poster on solid espresso,
 * centred. The hero one viewport up already showed the stage, so the band
 * shows no photo and no line introduces the numbers. One number leads: the
 * talent pool is set oversized, the other two sit smaller beneath it. The
 * scale does the ranking, so three numbers read as an authored claim, not
 * three interchangeable slots of a stat widget. Renders at full strength
 * on first paint: no fade-up, no count-up, no rule draw. This is one of
 * the first two sections a visitor sees, so there is nothing to reveal it
 * from.
 */
export function StatsBand() {
  return (
    <section className="bg-espresso py-20 text-center text-cream-light lg:py-28">
      <Container>
        <dl>
          <div>
            <dd className="font-display text-stat-lead">{lead.value}</dd>
            <div className="mx-auto mt-4 h-0.5 w-12 bg-gold" aria-hidden />
            <dt className="mt-3 text-sm font-semibold tracking-[0.2em] text-cream-light/80 uppercase">
              {lead.label}
            </dt>
          </div>

          <div className="mx-auto mt-12 grid max-w-md grid-cols-2 gap-x-10">
            {supporting.map((stat) => (
              <div key={stat.label}>
                <dd className="font-display text-stat">{stat.value}</dd>
                <dt className="mt-2 text-xs font-semibold tracking-[0.18em] text-cream-light/70 uppercase">
                  {stat.label}
                </dt>
              </div>
            ))}
          </div>
        </dl>
      </Container>
    </section>
  );
}
