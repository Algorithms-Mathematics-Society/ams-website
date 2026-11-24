import { createPageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { MonthlyIntro } from "@/components/sections/MonthlyIntro";
import { MonthlyCurrent } from "@/components/sections/MonthlyCurrent";
import { MonthlyArchive } from "@/components/sections/MonthlyArchive";
import { MONTHLY } from "@/content/monthly";
import { monthlySeriesJsonLd } from "@/content/seo";
import { getReleasedProblems } from "@/lib/monthly";
import { getBuildNow, nextDropAt } from "@/lib/monthly-release";
import styles from "@/components/sections/Blog.module.css";

export const metadata = createPageMetadata({
  title: "AMS Monthly",
  description:
    "AMS Monthly is a free problem from AMS, released on the 1st of every month, alternating quantitative reasoning and systems engineering.",
  path: "/monthly",
});

export default async function MonthlyPage() {
  const problems = await getReleasedProblems();
  const nextDrop = nextDropAt(getBuildNow(), new Date(MONTHLY.launchAt));
  return (
    <div className={styles.page}>
      <JsonLd data={monthlySeriesJsonLd()} />
      <MonthlyIntro nextDrop={nextDrop} launched={problems.length > 0} />
      <MonthlyCurrent problem={problems.at(-1) ?? null} />
      <MonthlyArchive problems={problems} />
    </div>
  );
}
