import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MONTHLY } from "@/content/monthly";
import { formatIstDate } from "@/lib/monthly-release";
import { getLatestProblem, problemIsOpen } from "@/lib/monthly";
import neutral from "@/components/ui/Neutral.module.css";
import styles from "./Monthly.module.css";

/** One hairline row above the blog grid while a Monthly problem is open; nothing otherwise. */
export async function BlogMonthlyNotice() {
  const problem = await getLatestProblem();
  if (!problem || !problemIsOpen(problem)) return null;
  const copy = MONTHLY.blogNotice;
  return (
    <div className={styles.noticeWrap}>
      <Container>
        <p className={styles.notice}>
          {MONTHLY.name} #{problem.number} {copy.open} {copy.closes}{" "}
          <time dateTime={problem.deadline.toISOString()}>
            {formatIstDate(problem.deadline)}
          </time>
          .{" "}
          <Link
            href={`/monthly/${problem.number}`}
            className={neutral.textLink}
          >
            {copy.link}
          </Link>
        </p>
      </Container>
    </div>
  );
}
