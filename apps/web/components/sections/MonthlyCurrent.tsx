import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MONTHLY } from "@/content/monthly";
import { formatIstDate } from "@/lib/monthly-release";
import { problemIsOpen, type MonthlyProblem } from "@/lib/monthly";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Monthly.module.css";

interface Props {
  problem: MonthlyProblem | null;
}

export function MonthlyCurrent({ problem }: Props) {
  const copy = MONTHLY.index;
  const open = problem ? problemIsOpen(problem) : false;
  return (
    <section className={styles.section} aria-label={copy.currentLabel}>
      <Container className={styles.layout}>
        {problem && (
          <div className={styles.panel}>
            <p className={styles.panelMeta}>
              <span>{copy.currentLabel}</span>
              <span>#{problem.number}</span>
              <span>
                {open ? copy.openLabel : copy.closedLabel}{" "}
                <time dateTime={problem.deadline.toISOString()}>
                  {formatIstDate(problem.deadline)}
                </time>
              </span>
            </p>
            <h2 className={styles.panelTitle}>{problem.title}</h2>
            <p className={styles.panelBody}>{problem.description}</p>
            <div className={`${neutral.actions} ${styles.actions}`}>
              <Link
                href={`/monthly/${problem.number}`}
                className={neutral.primary}
              >
                {copy.viewLabel}
              </Link>
            </div>
          </div>
        )}
        <div>
          <h2 className={styles.sideTitle}>{copy.howTitle}</h2>
          <ol className={styles.steps}>
            {copy.how.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <Link href={copy.contributeHref} className={neutral.textLink}>
            {copy.contributeLabel}
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
