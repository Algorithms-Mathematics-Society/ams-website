import { Container } from "@/components/ui/Container";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GALLERY } from "@/content/gallery";

interface Props {
  /** Cap the number of slots (home page shows a subset; /gallery shows all). */
  limit?: number;
}

export function GalleryGrid({ limit }: Props) {
  const items = limit ? GALLERY.slice(0, limit) : GALLERY;
  return (
    <section className="bg-cream-light py-section">
      <Container>
        <SectionHeading
          eyebrow="Moments from AMS"
          title="It happened. Here's proof."
        />

        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.label}>
              {/* Thumbnails only here (~640w when real) — full-res belongs in a lightbox. */}
              <PhotoPlaceholder
                label={`Photo — ${item.label}`}
                aspect="aspect-[4/3]"
                rounded="rounded-lg"
                className="p-3"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
