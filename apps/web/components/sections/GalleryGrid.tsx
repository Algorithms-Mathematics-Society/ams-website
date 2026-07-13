import { GalleryTiles } from "@/components/sections/GalleryTiles";
import { Container } from "@/components/ui/Container";
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

        <div className={withHeading ? "mt-12" : ""}>
          <GalleryTiles items={items} />
        </div>
      </Container>
    </section>
  );
}
