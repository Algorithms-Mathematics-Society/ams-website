import { Container } from "@/components/ui/Container";
import { STATS, STATS_HEADING } from "@/content/stats";

const [lead, ...supporting] = STATS;

/**
 * A static, segmented proof panel. The lead metric occupies half the panel
 * on larger screens and the supporting metrics split the row beneath it on
 * mobile. All values render at full strength on the first paint.
 */
export function StatsBand() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="bg-cream py-8 md:py-10 lg:py-12"
    >
      <h2 className="sr-only" id="stats-heading">
        {STATS_HEADING}
      </h2>
      <Container>
        <dl className="grid grid-cols-2 overflow-hidden rounded-panel border border-burgundy-deep/50 bg-burgundy text-cream-light shadow-[0_18px_45px_rgba(67,20,27,0.12)] md:grid-cols-4">
          <div className="col-span-2 flex min-h-40 flex-col justify-center border-b border-cream-light/15 px-6 py-7 md:min-h-44 md:border-r md:border-b-0 md:px-8 lg:px-10">
            <div
              className="mb-4 h-0.5 w-10 bg-gold-bright"
              aria-hidden="true"
            />
            <dt className="text-sm font-semibold tracking-[0.15em] text-cream-light/75 uppercase">
              {lead.label}
            </dt>
            <dd className="mt-2 min-w-0 whitespace-nowrap font-display text-stat-lead text-cream-light tabular-nums">
              {lead.value}
            </dd>
          </div>

          {supporting.map((stat) => (
            <div
              className="flex min-h-32 min-w-0 flex-col justify-center border-r border-cream-light/15 bg-burgundy-deep/20 px-4 py-5 last:border-r-0 sm:px-6 md:min-h-44 md:px-5 lg:px-7"
              key={stat.label}
            >
              <dt className="max-w-40 text-xs leading-5 font-semibold tracking-[0.12em] text-cream-light/70 uppercase">
                {stat.label}
              </dt>
              <dd className="mt-2 min-w-0 whitespace-nowrap font-display text-stat text-cream-light tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
