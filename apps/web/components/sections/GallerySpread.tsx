import Image from "next/image";
import { TextLink } from "@/components/ui/TextLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { GALLERY, GALLERY_HOME } from "@/content/gallery";

const HOME_PLACEMENTS = ["lead", "support-top", "support-bottom"] as const;

/** Three documentary frames selected from the complete gallery archive. */
export function GallerySpread() {
  const items = HOME_PLACEMENTS.map((placement) =>
    GALLERY.find((item) => item.homePlacement === placement),
  );

  if (items.some((item) => !item?.src)) return null;

  const records = items as ((typeof GALLERY)[number] & { src: string })[];

  return (
    <section
      aria-labelledby="documentary-record-heading"
      className="bg-paper py-section"
    >
      <Container>
        <Reveal>
          <header className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>{GALLERY_HOME.eyebrow}</Eyebrow>
              <h2
                id="documentary-record-heading"
                className="mt-4 text-section font-semibold tracking-[-0.035em] text-burgundy"
              >
                {GALLERY_HOME.title}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="max-w-xl leading-relaxed text-ink/80">
                {GALLERY_HOME.body}
              </p>
              <TextLink
                href={GALLERY_HOME.link.href} className="mt-3"
              >
                {GALLERY_HOME.link.label}
              </TextLink>
            </div>
          </header>

          <ul className="mt-10 border-y border-burgundy/20 divide-y divide-burgundy/20 md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
            {records.map((item, index) => (
              <li key={item.homePlacement} className="min-w-0 bg-cream-light">
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      sizes="(min-width: 1280px) 405px, (min-width: 768px) calc((100vw - 64px) / 3), calc(100vw - 40px)"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="flex min-h-20 gap-4 border-t border-burgundy/15 px-5 py-4 text-sm leading-5 text-ink/80">
                    <span className="shrink-0 font-semibold text-gold-deep tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="break-words">{item.label}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
