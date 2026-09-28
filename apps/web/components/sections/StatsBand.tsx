import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { STATS, STATS_HEADING, STATS_LINK, STATS_NOTE } from "@/content/stats";

export function StatsBand() {
  return (
    <section aria-labelledby="stats-heading" className="border-b border-burgundy/15 bg-cream-light py-9 sm:py-12">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="stats-heading" className="text-sm font-semibold text-burgundy">
            {STATS_HEADING}
          </h2>
          <Link href={STATS_LINK.href} className="inline-flex min-h-11 items-center gap-2 text-sm text-burgundy underline underline-offset-4">
            {STATS_LINK.label} <span aria-hidden>→</span>
          </Link>
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 sm:gap-x-8">
          {STATS.map((stat) => (
            <div className="flex min-w-0 flex-col border-t border-burgundy/20 pt-5" key={stat.label}>
              <dt className="order-2 mt-3 max-w-48 text-sm leading-5 text-ink/80">{stat.label}</dt>
              <dd className="order-1 text-[clamp(2rem,3.5vw,3.1rem)] leading-none font-medium tracking-tight text-burgundy tabular-nums">{stat.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 max-w-2xl text-xs leading-5 text-ink/75">{STATS_NOTE}</p>
      </Container>
    </section>
  );
}
