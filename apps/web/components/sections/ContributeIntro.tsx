import { Container } from "@/components/ui/Container";
import { CONTRIBUTE } from "@/content/contribute";
import neutral from "@/components/ui/Neutral.module.css";
import blog from "./Blog.module.css";
import styles from "./Monthly.module.css";

/** Intro plus the open or closed intake line; the form opens in a new tab. */
export function ContributeIntro() {
  const { status } = CONTRIBUTE;
  const open = status.open && status.formUrl !== null;
  return (
    <section className={blog.intro}>
      <Container>
        <p className={blog.kicker}>{CONTRIBUTE.kicker}</p>
        <h1 className={blog.title}>{CONTRIBUTE.title}</h1>
        <p className={blog.body}>{CONTRIBUTE.body}</p>
        <p className={styles.status}>
          {open ? status.openLine : status.closedLine}
        </p>
        {open && status.formUrl && (
          <>
            <div className={`${neutral.actions} ${styles.actions}`}>
              <a
                href={status.formUrl}
                className={neutral.primary}
                target="_blank"
                rel="noopener noreferrer"
              >
                {status.actionLabel}
              </a>
            </div>
            <p className={styles.note}>{status.formNote}</p>
          </>
        )}
      </Container>
    </section>
  );
}
