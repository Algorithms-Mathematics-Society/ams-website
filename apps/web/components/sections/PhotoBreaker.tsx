import Image from "next/image";
import Link from "next/link";

/** Cinematic full-bleed breaker between the experience grid and the gallery. */
export function PhotoBreaker() {
  return (
    <section className="relative h-[55vh] min-h-[380px] overflow-hidden">
      <Image
        src="/images/derive26/hero/the-full-room.webp"
        alt="The full Derive '26 finals room at IIT Bombay"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-black/55" />

      <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
        <p className="font-display text-2xl text-cream-light sm:text-3xl">
          One hall. Everyone who made it happen.
        </p>
        <Link
          href="/gallery"
          className="mt-5 text-sm text-cream-light/80 underline underline-offset-4 transition-colors hover:text-cream-light"
        >
          See the gallery
        </Link>
      </div>
    </section>
  );
}
