import { Container } from "@/components/ui/Container";
import { MONTHLY } from "@/content/monthly";
import { formatIstDate } from "@/lib/monthly-release";
import blog from "./Blog.module.css";
import styles from "./Monthly.module.css";

interface Props {
  nextDrop: Date;
  launched: boolean;
}

/** States only the next release date, never what it will be about. */
export function MonthlyIntro({ nextDrop, launched }: Props) {
  const label = launched ? MONTHLY.index.nextLabel : MONTHLY.index.firstLabel;
  return (
    <section className={blog.intro}>
      <Container>
        <p className={blog.kicker}>{MONTHLY.index.kicker}</p>
        <h1 className={blog.title}>{MONTHLY.index.title}</h1>
        <p className={blog.body}>{MONTHLY.index.body}</p>
        <p className={styles.nextLine}>
          {label}:{" "}
          <time dateTime={nextDrop.toISOString()}>
            {formatIstDate(nextDrop)}
          </time>
          , {MONTHLY.dropTimeLabel}.
        </p>
      </Container>
    </section>
  );
}
