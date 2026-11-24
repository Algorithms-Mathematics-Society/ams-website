import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SolverTable } from "@/components/ui/SolverTable";
import { MONTHLY } from "@/content/monthly";
import { formatIstDate } from "@/lib/monthly-release";
import type {
  MonthlyProblem,
  MonthlySolution as Solution,
  Tier,
} from "@/lib/monthly";
import { getSolverList } from "@/lib/solvers";
import neutral from "@/components/ui/Neutral.module.css";
import blog from "./Blog.module.css";
import styles from "./Monthly.module.css";

interface Props {
  problem: MonthlyProblem;
  solution: Solution;
}

const TIERS: Tier[] = ["warmup", "main"];

export function MonthlySolution({ problem, solution }: Props) {
  const copy = MONTHLY.solution;
  const tiers = MONTHLY.problem.tiers;
  const solvers = getSolverList(problem.number);
  return (
    <article aria-labelledby="solution-title">
      <header className={blog.articleHeader}>
        <Container size="reading">
          <Link
            href={`/monthly/${problem.number}`}
            className={neutral.textLink}
          >
            <span aria-hidden="true">← </span>
            {copy.problemLink}
          </Link>
          <p className={`${blog.kicker} mt-5`}>
            {copy.kicker} · {MONTHLY.name} #{problem.number}
          </p>
          <h1 id="solution-title" className={blog.articleTitle}>
            {problem.title}
          </h1>
          <div className={blog.meta}>
            <span>
              {MONTHLY.problem.closedLabel}{" "}
              <time dateTime={problem.deadline.toISOString()}>
                {formatIstDate(problem.deadline)}
              </time>
            </span>
            {TIERS.map((tier) => (
              <span key={tier}>
                {tiers[tier]}: {solution.answers[tier]}
              </span>
            ))}
          </div>
        </Container>
      </header>
      <div className={blog.reading}>
        <Container size="reading">
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: solution.html }}
          />
          {solution.editorialSlug && (
            <Link
              href={`/blog/${solution.editorialSlug}`}
              className={neutral.textLink}
            >
              {copy.editorialLabel}
              <span aria-hidden="true"> →</span>
            </Link>
          )}
          <section className={styles.tier} aria-labelledby="solvers-title">
            <h2 id="solvers-title" className={styles.tierTitle}>
              {copy.solversTitle}
            </h2>
            {solvers ? (
              <>
                <p className={styles.count}>{copy.solversNote}</p>
                {TIERS.map((tier) => (
                  <div key={tier} className="mt-8">
                    <h3 className={styles.sideTitle}>
                      {tiers[tier]} · {solvers[tier].length}
                    </h3>
                    {solvers[tier].length > 0 ? (
                      <SolverTable
                        caption={`${copy.solversTitle}: ${tiers[tier]}`}
                        solvers={solvers[tier]}
                        columns={copy.columns}
                      />
                    ) : (
                      <p className={styles.count}>{copy.solversNone}</p>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <p className={styles.count}>{copy.solversPending}</p>
            )}
          </section>
        </Container>
      </div>
    </article>
  );
}
