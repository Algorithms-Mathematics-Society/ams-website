import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { MonthlySolution } from "@/components/sections/MonthlySolution";
import { MONTHLY } from "@/content/monthly";
import { monthlySolutionJsonLd } from "@/content/seo";
import { getProblem, getReleasedProblems } from "@/lib/monthly";
import { assertFeedConfigured } from "@/lib/solvers";
import styles from "@/components/sections/Blog.module.css";

interface Props {
  params: Promise<{ number: string }>;
}

// A solution page exists only once its solution is released; nothing renders on demand.
export const dynamicParams = false;

export async function generateStaticParams() {
  const problems = (await getReleasedProblems()).filter(
    (problem) => problem.solution,
  );
  assertFeedConfigured(problems.length > 0);
  return problems.map((problem) => ({ number: String(problem.number) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const problem = await getProblem(Number((await params).number));
  if (!problem?.solution) return {};
  return createPageMetadata({
    title: `Solution: ${problem.title} · ${MONTHLY.name} #${problem.number}`,
    description: `The solution to ${MONTHLY.name} #${problem.number}, "${problem.title}", with the correct solvers who chose to be listed.`,
    path: `/monthly/${problem.number}/solution`,
    publishedTime: problem.solution.solutionAt.toISOString(),
  });
}

export default async function MonthlySolutionPage({ params }: Props) {
  const problem = await getProblem(Number((await params).number));
  if (!problem?.solution) notFound();
  return (
    <div className={styles.page}>
      <JsonLd data={monthlySolutionJsonLd(problem, problem.solution)} />
      <MonthlySolution problem={problem} solution={problem.solution} />
    </div>
  );
}
