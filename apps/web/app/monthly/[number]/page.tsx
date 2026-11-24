import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { MonthlyProblem } from "@/components/sections/MonthlyProblem";
import { MONTHLY } from "@/content/monthly";
import { monthlyProblemJsonLd } from "@/content/seo";
import { getProblem, getReleasedProblems } from "@/lib/monthly";
import styles from "@/components/sections/Blog.module.css";

interface Props {
  params: Promise<{ number: string }>;
}

// Only released problems are pre-rendered; any other number is a 404, never rendered on demand.
export const dynamicParams = false;

export async function generateStaticParams() {
  const problems = await getReleasedProblems();
  return problems.map((problem) => ({ number: String(problem.number) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const problem = await getProblem(Number((await params).number));
  if (!problem) return {};
  return createPageMetadata({
    title: `${problem.title} · ${MONTHLY.name} #${problem.number}`,
    description: problem.description,
    path: `/monthly/${problem.number}`,
    image: { url: `/monthly-assets/${problem.number}/problem.png`, width: 1200, height: 630, alt: problem.title },
    publishedTime: problem.releaseAt.toISOString(),
  });
}

export default async function MonthlyProblemPage({ params }: Props) {
  const problem = await getProblem(Number((await params).number));
  if (!problem) notFound();
  return (
    <div className={styles.page}>
      <JsonLd data={monthlyProblemJsonLd(problem)} />
      <MonthlyProblem problem={problem} />
    </div>
  );
}
