import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GALLERY } from "@/content/gallery";

interface Props {
  /** Cap the number of slots (home page shows a subset; /gallery shows all). */
  limit?: number;
  /** Off on /gallery, where the PageHeader already introduces the grid. */
  withHeading?: boolean;
}

export function GalleryGrid({ limit, withHeading = true }: Props) {
  const items = limit ? GALLERY.slice(0, limit) : GALLERY;
  return (
    <section className="bg-cream-light py-section">
      <Container>
        {withHeading && (
          <Reveal>
            <SectionHeading
              eyebrow="Moments from AMS"
              title="It happened. Here's proof."
            />
          </Reveal>
        )}

        <ul
          className={`grid grid-cols-2 gap-4 lg:grid-cols-4 ${withHeading ? "mt-12" : ""}`}
        >
          {items.map((item, index) => (
            <li key={item.label}>
              {/* Stagger by column so each row reads as one left-to-right sweep. */}
              <Reveal delay={(index % 4) * 70}>
                {item.src ? (
                  <a
                    href={item.full ?? item.src}
                    target="_blank"
                    rel="noreferrer"
                    className="group block"
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={item.src}
                        alt={item.label}
                        fill
                        sizes="(min-width: 1024px) 24vw, 46vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </span>
                  </a>
                ) : (
                  <PhotoPlaceholder
                    label={`Photo · ${item.label}`}
                    aspect="aspect-[4/3]"
                    rounded="rounded-lg"
                    className="p-3"
                  />
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
