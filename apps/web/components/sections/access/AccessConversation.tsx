import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ACCESS_CONVERSATION } from "@/content/access";

export function AccessConversation() {
  return (
    <section id={ACCESS_CONVERSATION.id} className="scroll-mt-24 bg-burgundy py-section text-cream-light">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHeading eyebrow={ACCESS_CONVERSATION.eyebrow} title={ACCESS_CONVERSATION.title} inverse />
          <p className="mt-6 max-w-lg leading-relaxed text-cream-light/85">
            {ACCESS_CONVERSATION.body}
          </p>
          <a
            href={ACCESS_CONVERSATION.contact.href}
            className="mt-8 inline-flex min-h-11 items-center rounded-control bg-cream px-5 py-3 text-sm font-semibold text-burgundy transition-colors hover:bg-cream-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream-light"
          >
            {ACCESS_CONVERSATION.contact.email}
          </a>
        </Reveal>
        <Reveal className="self-center">
          <dl className="space-y-8">
            {ACCESS_CONVERSATION.topics.map((topic) => (
              <div key={topic.title}>
                <dt className="text-lg font-semibold">{topic.title}</dt>
                <dd className="mt-2 max-w-lg leading-relaxed text-cream-light/85">{topic.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
