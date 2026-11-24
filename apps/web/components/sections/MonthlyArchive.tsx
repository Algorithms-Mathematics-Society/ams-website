import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MONTHLY } from "@/content/monthly";
import type { MonthlyProblem } from "@/lib/monthly";
import { getSolverList } from "@/lib/solvers";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Monthly.module.css";

interface Props {
  problems: MonthlyProblem[];
}

const monthYear = (date: Date) =>
  date.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

/** Released problems only, newest first. Future months never appear here. */
export function MonthlyArchive({ problems }: Props) {
  if (problems.length === 0) return null;
  const copy = MONTHLY.index;
  return (
    <section className={styles.section} aria-labelledby="monthly-archive">
      <Container>
        <h2 id="monthly-archive" className={styles.heading}>
          {copy.archiveTitle}
        </h2>
        <ul className={styles.list}>
          {[...problems].reverse().map((problem) => {
            const solvers = problem.solution
              ? getSolverList(problem.number)
              : null;
            const count = solvers
              ? new Set([...solvers.warmup, ...solvers.main].map((s) => s.name))
                  .size
              : null;
            return (
              <li key={problem.number} className={styles.row}>
                <p className={styles.rowTitle}>{problem.title}</p>
                <p className={styles.rowMeta}>
                  #{problem.number} · {monthYear(problem.releaseAt)}
                  {count !== null ? ` · ${count} ${copy.solvedByLabel}` : ""}
                </p>
                <p className={styles.rowLinks}>
                  <Link
                    href={`/monthly/${problem.number}`}
                    className={neutral.textLink}
                  >
                    {copy.viewLabel}
                  </Link>
                  {problem.solution && (
                    <Link
                      href={`/monthly/${problem.number}/solution`}
                      className={neutral.textLink}
                    >
                      {copy.solutionLabel}
                    </Link>
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
