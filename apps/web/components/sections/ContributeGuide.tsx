import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CONTRIBUTE } from "@/content/contribute";
import neutral from "@/components/ui/Neutral.module.css";
import blog from "./Blog.module.css";
import styles from "./Monthly.module.css";

/** The bar, the defence, the AI policy and the timelines, all server-rendered. */
export function ContributeGuide() {
  const { ways, bar, defence, ai, next, privacy } = CONTRIBUTE;
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.block}>
          <h2 className={styles.heading}>{ways.title}</h2>
          <ul className={styles.cards}>
            {ways.items.map((item) => (
              <li key={item.title} className={styles.panel}>
                <h3 className={styles.sideTitle}>{item.title}</h3>
                <p className={styles.panelBody}>{item.body}</p>
                {"href" in item && (
                  <Link href={item.href} className={neutral.textLink}>
                    {item.linkLabel}
                    <span aria-hidden="true"> →</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.block}>
          <h2 className={styles.heading}>{bar.title}</h2>
          <ul className={styles.chips}>
            {bar.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.block}>
          <h2 className={styles.heading}>{defence.title}</h2>
          <p className={blog.body}>{defence.body}</p>
          <div className={`${styles.layout} mt-8`}>
            <div>
              <h3 className={styles.sideTitle}>{defence.promptsTitle}</h3>
              <ol className={styles.steps}>
                {defence.prompts.map((prompt) => (
                  <li key={prompt}>{prompt}</li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className={styles.sideTitle}>{defence.linkTitle}</h3>
              <ol className={styles.steps}>
                {defence.linkSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className={styles.block}>
          <h2 className={styles.heading}>{ai.title}</h2>
          <p className={styles.lead}>{ai.lead}</p>
          <p className={blog.body}>{ai.body}</p>
          <ol className={styles.levels}>
            {ai.levels.map((level) => (
              <li key={level.label}>
                <strong>{level.label}</strong>
                {level.note ? `: ${level.note}` : ""}
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.block}>
          <h2 className={styles.heading}>{next.title}</h2>
          <ol className={styles.steps}>
            {next.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>

        <div className={styles.block}>
          <h2 className={styles.heading}>{privacy.title}</h2>
          <p className={blog.body}>{privacy.body}</p>
          <a href={`mailto:${privacy.email}`} className={neutral.textLink}>
            {privacy.email}
          </a>
        </div>
      </Container>
    </section>
  );
}
