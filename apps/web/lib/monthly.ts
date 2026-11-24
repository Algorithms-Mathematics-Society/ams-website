import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { createMonthlyCard } from "./monthly-card";
import { compileMarkdown } from "./markdown";
import {
  fail,
  oneOf,
  reqInt,
  reqIsoDate,
  reqRecord,
  reqString,
} from "./frontmatter";
import { getBuildNow, isDue, isGoogleFormUrl, isOpen } from "./monthly-release";

// AMS Monthly loader. Problems live in the repo-root `monthly/<number>/` folder,
// copied there by the private vault's release workflow only once they are due.
//
// Secrecy rule: frontmatter is read and date-checked BEFORE any Markdown is
// compiled or any image is written to public/. An unreleased file in the public
// repo fails the build, because it means someone committed early by hand. The
// only exception is AMS_MONTHLY_ALLOW_UNRELEASED=1, used by the vault preflight
// and the leak test, where unreleased files are present on purpose and must be
// skipped without leaving a trace in the output.

// Production reads a fixed folder (so Next traces only it). AMS_MONTHLY_DIR is for
// the leak test and vault preflight; the ignore comment stops it tracing the project.
const MONTHLY_DIR = process.env.AMS_MONTHLY_DIR
  ? path.resolve(/*turbopackIgnore: true*/ process.cwd(), process.env.AMS_MONTHLY_DIR)
  : path.resolve(process.cwd(), "../../monthly");
const PUBLIC_ASSET_DIR = path.resolve(process.cwd(), "public/monthly-assets");
const TRACKS = ["quant", "systems"] as const;
const SECTION = { warmup: "## Warm-up", main: "## Main" } as const;

export type Track = (typeof TRACKS)[number];
export type Tier = "warmup" | "main";

export interface MonthlySolution {
  solutionAt: Date;
  answers: Record<Tier, string>;
  html: string;
  editorialSlug: string | null;
}

export interface MonthlyProblem {
  number: number;
  releaseAt: Date;
  deadline: Date;
  track: Track;
  title: string;
  description: string;
  answerFormat: Record<Tier, string>;
  formUrls: Record<Tier, string>;
  introHtml: string;
  tierHtml: Record<Tier, string>;
  solution: MonthlySolution | null;
}

function allowUnreleased(): boolean {
  return process.env.AMS_MONTHLY_ALLOW_UNRELEASED === "1";
}

function tierStrings(
  data: Record<string, unknown>,
  field: string,
  file: string,
): Record<Tier, string> {
  const record = reqRecord(data, field, file);
  return {
    warmup: reqString(record, "warmup", `${file} ${field}`),
    main: reqString(record, "main", `${file} ${field}`),
  };
}

function formUrl(value: string, field: string, file: string): string {
  if (!isGoogleFormUrl(value)) {
    fail(file, field, "must be an https://docs.google.com/forms/ respondent viewform link");
  }
  return value;
}

/** Splits "intro, ## Warm-up, ## Main" bodies; both tier sections are required. */
function splitBody(
  body: string,
  file: string,
): { intro: string; warmup: string; main: string } {
  const sections = unified().use(remarkParse).parse(body).children
    .filter((node) => node.type === "heading" && node.depth === 2)
    .map((node) => ({
      label: node.type === "heading" ? node.children.map((child) => child.type === "text" ? child.value : "").join("") : "",
      start: node.position!.start.offset!,
      end: node.position!.end.offset!,
    }));
  const warmups = sections.filter((section) => section.label === "Warm-up");
  const mains = sections.filter((section) => section.label === "Main");
  const warm = warmups[0];
  const main = mains[0];
  if (warmups.length !== 1 || mains.length !== 1 || warm.start >= main.start) {
    throw new Error(`${file}: body needs exactly one "${SECTION.warmup}" section followed by one "${SECTION.main}" section.`);
  }
  const result = {
    intro: body.slice(0, warm.start).trim(),
    warmup: body.slice(warm.end, main.start).trim(),
    main: body.slice(main.end).trim(),
  };
  if (!result.warmup || !result.main) {
    throw new Error(`${file}: Warm-up and Main sections must both contain a question.`);
  }
  return result;
}

function readFrontmatter(file: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const parsed = matter(fs.readFileSync(file, "utf-8"));
  return {
    data: parsed.data as Record<string, unknown>,
    content: parsed.content,
  };
}

/** Throws (or, in preflight, reports skip) for a file that is not yet due. */
function gate(at: Date, now: Date, label: string): boolean {
  if (isDue(at, now)) return true;
  if (allowUnreleased()) return false;
  throw new Error(
    `${label} is not due until ${at.toISOString()} but is present in the public repo. ` +
      "Only the vault release workflow may add Monthly files.",
  );
}

async function compile(
  body: string,
  folder: string,
  number: number,
): Promise<string> {
  if (body === "") return "";
  return compileMarkdown(body, {
    sourceDir: folder,
    label: `monthly/${number}`,
    publicDir: path.join(PUBLIC_ASSET_DIR, String(number)),
    publicPrefix: `/monthly-assets/${number}`,
  });
}

async function loadSolution(
  folder: string,
  number: number,
  deadline: Date,
  now: Date,
  title: string,
): Promise<MonthlySolution | null> {
  const file = path.join(folder, "solution.md");
  if (!fs.existsSync(file)) return null;
  const label = `monthly/${number}/solution.md`;
  const { data, content } = readFrontmatter(file);
  const solutionAt = reqIsoDate(data, "solutionAt", label);
  if (!gate(solutionAt, now, label)) return null;
  if (reqInt(data, "number", label) !== number)
    fail(label, "number", "must match the folder");
  if (solutionAt.getTime() < deadline.getTime())
    fail(label, "solutionAt", "must not be before the problem deadline");
  const slug = data.editorialSlug;
  if (slug !== null && slug !== undefined && typeof slug !== "string")
    fail(label, "editorialSlug", "must be a post slug or null");
  await createMonthlyCard(number, title, solutionAt, true);
  return {
    solutionAt,
    answers: tierStrings(data, "answers", label),
    html: await compile(content.trim(), folder, number),
    editorialSlug: typeof slug === "string" ? slug : null,
  };
}

async function loadProblem(
  folder: string,
  number: number,
  now: Date,
): Promise<MonthlyProblem | null> {
  const label = `monthly/${number}/problem.md`;
  const { data, content } = readFrontmatter(path.join(folder, "problem.md"));
  const releaseAt = reqIsoDate(data, "releaseAt", label);
  if (!gate(releaseAt, now, label)) return null;

  if (reqInt(data, "number", label) !== number)
    fail(label, "number", "must match the folder");
  const deadline = reqIsoDate(data, "deadline", label);
  if (deadline.getTime() <= releaseAt.getTime())
    fail(label, "deadline", "must be after releaseAt");
  const urls = tierStrings(data, "formUrls", label);
  const body = splitBody(content, label);
  const title = reqString(data, "title", label);
  await createMonthlyCard(number, title, releaseAt);

  return {
    number,
    releaseAt,
    deadline,
    track: oneOf(data.track, TRACKS, "track", label),
    title,
    description: reqString(data, "description", label),
    answerFormat: tierStrings(data, "answerFormat", label),
    formUrls: {
      warmup: formUrl(urls.warmup, "formUrls.warmup", label),
      main: formUrl(urls.main, "formUrls.main", label),
    },
    introHtml: await compile(body.intro, folder, number),
    tierHtml: {
      warmup: await compile(body.warmup, folder, number),
      main: await compile(body.main, folder, number),
    },
    solution: await loadSolution(folder, number, deadline, now, title),
  };
}

/** Released problems, oldest first. Numbers must run 1, 2, 3 with no gaps. */
export const getReleasedProblems = cache(
  async (): Promise<MonthlyProblem[]> => {
    if (!fs.existsSync(MONTHLY_DIR)) return [];
    const now = getBuildNow();
    const folders = fs
      .readdirSync(MONTHLY_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => {
        if (!/^\d+$/.test(entry.name)) {
          throw new Error(`monthly/${entry.name}/: folder names must be problem numbers.`);
        }
        return { name: entry.name, number: Number(entry.name) };
      })
      .sort((a, b) => a.number - b.number);
    folders.forEach((folder, index) => {
      if (index > 0 && folders[index - 1].number === folder.number) {
        throw new Error(`monthly/: two folders hold problem ${folder.number}.`);
      }
    });

    const problems: MonthlyProblem[] = [];
    for (const { name, number } of folders) {
      const problem = await loadProblem(path.join(MONTHLY_DIR, name), number, now);
      if (problem) problems.push(problem);
    }
    problems.forEach((problem, index) => {
      if (problem.number !== index + 1) {
        throw new Error(
          `monthly/: released problems must be numbered 1, 2, 3 with no gaps; found ${problem.number} at position ${index + 1}.`,
        );
      }
    });
    return problems;
  },
);

export async function getProblem(
  number: number,
): Promise<MonthlyProblem | null> {
  return (
    (await getReleasedProblems()).find(
      (problem) => problem.number === number,
    ) ?? null
  );
}

/** The most recent released problem, if any. */
export async function getLatestProblem(): Promise<MonthlyProblem | null> {
  const problems = await getReleasedProblems();
  return problems.at(-1) ?? null;
}

export function problemIsOpen(
  problem: MonthlyProblem,
  now: Date = getBuildNow(),
): boolean {
  return isOpen(problem.releaseAt, problem.deadline, now);
}
