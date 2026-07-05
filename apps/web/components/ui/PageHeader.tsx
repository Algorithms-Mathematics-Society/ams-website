import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface Props {
  eyebrow: string;
  title: string;
  body?: string;
}

/** Rise-in page opener for content pages (gallery, team). */
export function PageHeader({ eyebrow, title, body }: Props) {
  return (
    <section className="pt-section pb-4">
      <Container className="max-w-2xl lg:max-w-none">
        <Eyebrow className="rise">{eyebrow}</Eyebrow>
        <h1 className="rise-2 rise mt-6 max-w-2xl font-display text-hero text-burgundy">
          {title}
        </h1>
        {body && (
          <p className="rise-3 rise mt-6 max-w-2xl leading-relaxed">{body}</p>
        )}
      </Container>
    </section>
  );
}
