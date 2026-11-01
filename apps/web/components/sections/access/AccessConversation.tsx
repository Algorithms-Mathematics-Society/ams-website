import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ACCESS_CONVERSATION } from "@/content/access";

export function AccessConversation() {
  return (
    <section id={ACCESS_CONVERSATION.id} className="scroll-mt-24 bg-burgundy py-section text-cream-light">
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading eyebrow={ACCESS_CONVERSATION.eyebrow} title={ACCESS_CONVERSATION.title} inverse />
          <p className="mt-5 max-w-lg leading-relaxed text-cream-light/85">
            {ACCESS_CONVERSATION.body}
          </p>
          <Button href={ACCESS_CONVERSATION.contact.href} variant="inverse" className="mt-6">
            {ACCESS_CONVERSATION.contact.email}
          </Button>
          <dl className="mt-8 space-y-5 border-t border-cream-light/20 pt-6">
            {ACCESS_CONVERSATION.topics.map((topic) => (
              <div key={topic.title}>
                <dt className="font-semibold">{topic.title}</dt>
                <dd className="mt-2 max-w-lg leading-relaxed text-cream-light/85">{topic.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal className="self-start rounded-panel border border-cream-light/20 p-6 lg:p-8">
          <h3 className="text-xl font-semibold tracking-tight">{ACCESS_CONVERSATION.nextStepsTitle}</h3>
          <ol className="mt-6 divide-y divide-cream-light/20">
            {ACCESS_CONVERSATION.nextSteps.map((step, index) => (
              <li key={step.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full border border-cream-light/30 text-sm font-semibold">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-semibold">{step.title}</h4>
                  <p className="mt-2 leading-relaxed text-cream-light/85">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
