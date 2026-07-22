import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { GALLERY, GALLERY_HOME } from "@/content/gallery";

const HOME_PLACEMENTS = ["lead", "support-top", "support-bottom"] as const;

/** A static home-page selection from the complete gallery archive. */
export function GallerySpread() {
  const items = HOME_PLACEMENTS.map((placement) =>
    GALLERY.find((item) => item.homePlacement === placement),
  );

  if (items.some((item) => !item?.src)) return null;

  const [lead, ...supports] = items as [
    (typeof GALLERY)[number] & { src: string },
    ...((typeof GALLERY)[number] & { src: string })[],
  ];

  return (
    <section className="border-y border-ink/10 bg-paper py-section">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>{GALLERY_HOME.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-section text-burgundy">
              {GALLERY_HOME.title}
            </h2>
            <p className="mt-4 leading-relaxed">{GALLERY_HOME.body}</p>
            <Link
              href={GALLERY_HOME.link.href}
              className="mt-5 inline-flex min-h-11 items-center gap-1.5 rounded-control px-1 text-sm font-medium text-burgundy underline-offset-4 hover:text-gold-deep hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
            >
              {GALLERY_HOME.link.label} <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-8 overflow-hidden rounded-panel border border-burgundy/10 bg-cream-light p-2.5 sm:p-3">
            <ul className="grid grid-cols-2 gap-2.5 lg:h-[500px] lg:grid-cols-12 lg:grid-rows-2 lg:gap-3">
              <li className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-media lg:col-span-7 lg:row-span-2 lg:aspect-auto">
                <Image
                  src={lead.src}
                  alt={lead.label}
                  fill
                  sizes="(min-width: 1280px) 615px, (min-width: 1024px) calc(58.333vw - 58px), (min-width: 640px) calc(100vw - 90px), calc(100vw - 62px)"
                  className="object-cover"
                />
              </li>
              {supports.map((item) => (
                <li
                  key={item.homePlacement}
                  className="relative aspect-square overflow-hidden rounded-media lg:col-span-5 lg:aspect-auto"
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(min-width: 1280px) 436px, (min-width: 1024px) calc(41.667vw - 45px), (min-width: 640px) calc(50vw - 50px), calc(50vw - 36px)"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
