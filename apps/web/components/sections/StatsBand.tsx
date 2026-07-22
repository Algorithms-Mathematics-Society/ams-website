import { Container } from "@/components/ui/Container";
import { STATS, STATS_HEADING } from "@/content/stats";

/**
 * Static institutional evidence ledger. Values render at full strength on
 * first paint and align to the line of record immediately above.
 */
export function StatsBand() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="border-b border-burgundy/30 bg-cream"
    >
      <Container>
        <div className="border-x border-burgundy/25 py-10 sm:py-12 lg:grid lg:grid-cols-[13rem_1fr] lg:py-0">
          <h2
            className="px-5 text-[11px] leading-5 font-bold tracking-[0.16em] text-burgundy uppercase md:px-6 lg:flex lg:min-h-48 lg:items-center lg:border-r lg:border-burgundy/25"
            id="stats-heading"
          >
            {STATS_HEADING}
          </h2>
          <dl className="mt-5 grid border-t border-burgundy/25 sm:grid-cols-3 lg:mt-0 lg:border-t-0">
            {STATS.map((stat, index) => (
              <div
                className="flex min-h-32 min-w-0 flex-col justify-center border-b border-burgundy/20 px-5 py-6 last:border-b-0 sm:min-h-40 sm:border-r sm:border-b-0 sm:px-6 sm:last:border-r-0 lg:min-h-48"
                key={stat.label}
              >
                <dt className="order-2 mt-4 max-w-44 text-xs leading-5 font-bold tracking-[0.11em] text-ink/70 uppercase">
                  {stat.label}
                </dt>
                <dd
                  className={`order-1 min-w-0 whitespace-nowrap font-sans leading-none font-bold tracking-[-0.045em] text-burgundy tabular-nums ${index === 0 ? "text-stat-lead" : "text-stat"}`}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
