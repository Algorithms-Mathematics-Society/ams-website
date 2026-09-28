import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/TextLink";
import { GALLERY, GALLERY_PAGE } from "@/content/gallery";

/** A compact album introduction keeps the photographs close to the page title. */
export function GalleryIntro() {
  const photoCount = GALLERY.filter((item) => item.src && item.full).length;

  return (
    <section className="bg-cream-light pt-12 pb-8 sm:pt-16 sm:pb-10">
      <Container>
        <Eyebrow>{GALLERY_PAGE.eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-[-0.035em] text-burgundy">
          {GALLERY_PAGE.title}
        </h1>
        <p className="mt-5 max-w-2xl leading-7 text-ink/80">
          {GALLERY_PAGE.body}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
          <p className="text-sm leading-6 text-ink/70">
            {photoCount} {GALLERY_PAGE.photoCountLabel} · {GALLERY_PAGE.viewHint}
          </p>
          <TextLink href={GALLERY_PAGE.editionLink.href}>
            {GALLERY_PAGE.editionLink.label}
          </TextLink>
        </div>
      </Container>
    </section>
  );
}
