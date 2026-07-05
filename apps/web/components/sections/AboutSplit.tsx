import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { ABOUT } from "@/content/about";

export function AboutSplit() {
  return (
    <section className="py-section">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <PhotoPlaceholder label={ABOUT.photoLabel} aspect="aspect-[4/5]" />

        <div className="lg:pt-6">
          <Eyebrow>{ABOUT.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-section text-maroon">
            {ABOUT.title}
          </h2>
          <div className="mt-6 space-y-5 leading-relaxed">
            {ABOUT.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10">
            <div className="h-0.5 w-9 bg-gold" aria-hidden />
            <p className="mt-4 font-display font-semibold text-maroon">
              {ABOUT.attribution}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
