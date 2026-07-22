import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ACCESS_FIRMS } from "@/content/access";

export function AccessFirms() {
  return (
    <section id={ACCESS_FIRMS.id} className="py-section">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{ACCESS_FIRMS.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-sans text-section font-semibold tracking-[-0.035em] text-burgundy">
            {ACCESS_FIRMS.title}
          </h2>
          <div className="mt-6 space-y-5 leading-relaxed">
            {ACCESS_FIRMS.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
