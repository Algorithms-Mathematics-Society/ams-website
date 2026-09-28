import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ACCESS_CONVERSATION, ACCESS_CONTACTS } from "@/content/access";

export function AccessConversation() {
  return (
    <section
      id={ACCESS_CONVERSATION.id}
      className="scroll-mt-24 border-t border-burgundy/15 bg-cream-light py-section"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={ACCESS_CONVERSATION.eyebrow}
            title={ACCESS_CONVERSATION.title}
          />
          <p className="mt-6 max-w-2xl leading-relaxed">
            {ACCESS_CONVERSATION.body}
          </p>
          <dl className="mt-6 flex flex-wrap gap-x-12 gap-y-4">
            {ACCESS_CONTACTS.map((contact) => (
              <div key={contact.email}>
                <dt className="text-sm text-ink/75">{contact.label}</dt>
                <dd>
                  <a href={contact.href} className="inline-flex min-h-11 items-center break-all font-semibold text-burgundy underline underline-offset-4">
                    {contact.email}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <ol className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {ACCESS_CONVERSATION.topics.map((topic, index) => (
            <li key={topic.title} className="border-t border-burgundy/20 pt-5">
              <Reveal delay={(index % 2) * 90}>
                <div className="flex items-baseline gap-4">
                  <span className="text-sm text-burgundy/75" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold text-burgundy">
                    {topic.title}
                  </h3>
                </div>
                <p className="mt-3 leading-relaxed text-ink/85">{topic.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
