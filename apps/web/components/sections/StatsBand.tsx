import { Container } from "@/components/ui/Container";
import { STATS } from "@/content/stats";

/**
 * Dark full-width band. The design backs this with a wide keynote photo —
 * when it lands, layer it under the overlay without changing band height.
 */
export function StatsBand() {
  return (
    <section className="bg-espresso py-20 text-cream-light lg:py-28">
      <Container>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dd className="font-display text-stat">{stat.value}</dd>
              <div className="mt-3 h-0.5 w-9 bg-gold" aria-hidden />
              <dt className="mt-3 text-sm text-cream-light/85">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
