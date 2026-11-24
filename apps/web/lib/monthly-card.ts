import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { randomUUID } from "node:crypto";
import { formatIstDate } from "./monthly-release";

const escape = (text: string) => text.replace(/[&<>"']/g, (char) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char]!);

/** Called only after the loader has passed the release gate. Never includes answers. */
export async function createMonthlyCard(
  number: number, title: string, date: Date, solution = false,
): Promise<void> {
  // Measure real glyph widths, wrap long words, and fit unusually long titles.
  const titleImage = await sharp({ text: {
    text: `<span foreground="#171717">${escape(title)}</span>`,
    font: "sans 52", width: 1056, rgba: true, wrap: "word-char",
  } }).resize({ width: 1056, height: 280, fit: "inside", withoutEnlargement: true }).png().toBuffer();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#faf9f6"/>
    <text x="72" y="100" font-family="sans-serif" font-size="30" fill="#555">AMS Monthly #${number}${solution ? " · Solution" : ""}</text>
    <path d="M72 510H1128" stroke="#ccc"/>
    <text x="72" y="567" font-family="sans-serif" font-size="25" fill="#555">${escape(formatIstDate(date))}</text>
    <text x="1128" y="567" text-anchor="end" font-family="sans-serif" font-size="25" fill="#171717">amshq.in</text>
  </svg>`;
  const folder = path.resolve(process.cwd(), "public/monthly-assets", String(number));
  await fs.mkdir(folder, { recursive: true });
  // Write complete buffers atomically; Next can request the same content in parallel.
  const image = await sharp(Buffer.from(svg)).composite([{ input: titleImage, left: 72, top: 160 }]).png().toBuffer();
  const target = path.join(folder, solution ? "solution.png" : "problem.png");
  const temporary = `${target}.${randomUUID()}.tmp`;
  await fs.writeFile(temporary, image);
  await fs.rename(temporary, target);
}
