import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { STATS } from "@/content/stats";

/**
 * Dark full-width band backed by a wide contest photo under a heavy
 * overlay; band height unchanged from the pre-photo version.
 */
export function StatsBand() {
  return (
    <section className="relative bg-espresso py-20 text-cream-light lg:py-28">
      {/* This photo sits under a bg-espresso/85 overlay, so quality 50 is
          invisible here but halves the payload (70 KB to 31 KB at 750w).
          fetchPriority low because the band's top edge pokes into the first
          mobile viewport, which makes Chrome upgrade a lazy image to High
          and lets pure decor compete with the hero for 4G bandwidth. */}
      <Image
        src="/images/derive26/hero/contest-in-progress.webp"
        alt=""
        aria-hidden
        fill
        quality={50}
        fetchPriority="low"
        sizes="100vw"
        className="object-cover opacity-100"
      />
      <div className="absolute inset-0 bg-espresso/85" aria-hidden />
      <Container className="relative">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 80}>
              <dd className="font-display text-stat">{stat.value}</dd>
              <div className="mt-3 h-0.5 w-9 bg-gold" aria-hidden />
              <dt className="mt-3 text-sm text-cream-light/85">{stat.label}</dt>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
