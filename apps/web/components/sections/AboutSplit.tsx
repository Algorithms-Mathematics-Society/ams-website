import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { INSTITUTIONAL_OVERVIEW } from "@/content/institutionalOverview";

/** A compact institutional definition and the three parts of the AMS mandate. */
export function AboutSplit() {
  return (
    <section className="border-y border-burgundy/15 bg-cream-light py-section">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-0">
          <header className="lg:col-span-5 lg:pr-12">
            <Eyebrow>{INSTITUTIONAL_OVERVIEW.eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-lg font-sans text-section font-semibold tracking-[-0.035em] text-burgundy">
              {INSTITUTIONAL_OVERVIEW.title}
            </h2>
          </header>

          <div className="border-t border-burgundy/20 pt-7 lg:col-span-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            <p className="max-w-2xl text-base leading-7 text-ink sm:text-lg sm:leading-8">
              {INSTITUTIONAL_OVERVIEW.definition}
            </p>

            <ol className="mt-9 border-t border-burgundy/20">
              {INSTITUTIONAL_OVERVIEW.mandate.map((item) => (
                <li
                  key={item.number}
                  className="grid gap-3 border-b border-burgundy/20 py-5 sm:grid-cols-[3rem_minmax(0,1fr)]"
                >
                  <span className="text-xs font-semibold tracking-[0.18em] text-gold-deep">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-burgundy">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-sm leading-6 text-ink/80">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
