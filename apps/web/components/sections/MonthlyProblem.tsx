import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MONTHLY } from "@/content/monthly";
import { formatIstDate } from "@/lib/monthly-release";
import {
  problemIsOpen,
  type MonthlyProblem as Problem,
  type Tier,
} from "@/lib/monthly";
import neutral from "@/components/ui/Neutral.module.css";
import blog from "./Blog.module.css";
import styles from "./Monthly.module.css";

interface Props {
  problem: Problem;
}

const TIERS: Tier[] = ["warmup", "main"];

export function MonthlyProblem({ problem }: Props) {
  const copy = MONTHLY.problem;
  const open = problemIsOpen(problem);
  return (
    <article aria-labelledby="problem-title">
      <header className={blog.articleHeader}>
        <Container size="reading">
          <Link href="/monthly" className={neutral.textLink}>
            <span aria-hidden="true">← </span>
            {copy.backLabel}
          </Link>
          <h1 id="problem-title" className={blog.articleTitle}>
            {problem.title}
          </h1>
          <p className={blog.body}>{problem.description}</p>
          <div className={blog.meta}>
            <span>
              {MONTHLY.name} #{problem.number}
            </span>
            <span>
              {copy.releasedLabel}{" "}
              <time dateTime={problem.releaseAt.toISOString()}>
                {formatIstDate(problem.releaseAt)}
              </time>
            </span>
            <span>
              {open ? copy.closesLabel : copy.closedLabel}{" "}
              <time dateTime={problem.deadline.toISOString()}>
                {formatIstDate(problem.deadline)}
              </time>
              {open ? `, ${MONTHLY.closeTimeLabel}` : ""}
            </span>
          </div>
        </Container>
      </header>
      <div className={blog.reading}>
        <Container size="reading">
          {problem.introHtml && (
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: problem.introHtml }}
            />
          )}
          {TIERS.map((tier) => (
            <section
              key={tier}
              className={styles.tier}
              aria-labelledby={`tier-${tier}`}
            >
              <h2 id={`tier-${tier}`} className={styles.tierTitle}>
                {copy.tiers[tier]}
              </h2>
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: problem.tierHtml[tier] }}
              />
              <p className={styles.format}>
                <strong>{copy.answerFormatLabel}:</strong>{" "}
                {problem.answerFormat[tier]}
              </p>
              {open && (
                <div className={`${neutral.actions} ${styles.actions}`}>
                  <a
                    href={problem.formUrls[tier]}
                    className={neutral.primary}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy.submitLabel[tier]}
                  </a>
                </div>
              )}
            </section>
          ))}
          {open ? (
            <>
              <p className={styles.note}>{copy.formNote}</p>
              <p className={styles.note}>{copy.rules}</p>
            </>
          ) : (
            <p className={styles.status}>{copy.closedNote}</p>
          )}
          <p className={styles.note}>
            {problem.solution ? (
              <Link
                href={`/monthly/${problem.number}/solution`}
                className={neutral.textLink}
              >
                {copy.solutionLink}
                <span aria-hidden="true"> →</span>
              </Link>
            ) : (
              copy.solutionPending
            )}
          </p>
          <Link href="/monthly" className={neutral.textLink}>
            {copy.nextLink}
          </Link>
        </Container>
      </div>
    </article>
  );
}
