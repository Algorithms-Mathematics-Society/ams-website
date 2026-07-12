// Generates budgeted WebP variants from media/photos into apps/web/public/images/derive26.
// Usage: node scripts/optimize-photos.mjs
// Idempotent: skips outputs newer than their source. Fails loudly on budget breach.
import { createRequire } from "module";
import { readdirSync, statSync, mkdirSync, existsSync } from "fs";
import path from "path";

const require = createRequire(import.meta.url);
const sharp = require(path.resolve("apps/web/node_modules/sharp"));

const SRC = "media/photos";
const OUT = "apps/web/public/images/derive26";
const PREFIX = "AMS Derive - ";

// slug -> variants to build. hero/full/thumb widths and byte budgets per the spec.
const VARIANTS = [
  { dir: "hero", width: 1920, quality: 62, budget: 200 * 1024 },
  { dir: "full", width: 1600, quality: 70, budget: 450 * 1024 },
  { dir: "thumb", width: 640, quality: 72, budget: 120 * 1024 },
];

// Only these slugs are required by the site (hero, stats backdrop, 12 gallery picks).
// Others are generated too when budgets hold, but a budget breach on a non-required
// slug downgrades to a warning instead of a failure.
const REQUIRED = new Set([
  "the-hall-at-capacity",
  "contest-in-progress",
  "goodies-distribution",
  "swag-desk",
  "in-the-zone",
  "debating-the-problem-set",
  "finalists-meet-the-interviewers",
  "prize-cheque-moment",
  "address-before-the-final-round",
  "blitz-chess-huddle",
  "the-evening-social",
  "the-ams-deck",
  "finalists-at-the-convergence-banner",
  "the-full-room",
]);

const slugify = (name) =>
  name
    .replace(PREFIX, "")
    .replace(/\.[a-z]+$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

let failures = 0;
for (const v of VARIANTS) mkdirSync(path.join(OUT, v.dir), { recursive: true });

const files = readdirSync(SRC).filter((f) => /\.(jpe?g|png)$/i.test(f));
for (const f of files) {
  const slug = slugify(f);
  const srcPath = path.join(SRC, f);
  const srcM = statSync(srcPath).mtimeMs;
  for (const v of VARIANTS) {
    const outPath = path.join(OUT, v.dir, `${slug}.webp`);
    if (existsSync(outPath) && statSync(outPath).mtimeMs > srcM) continue;
    await sharp(srcPath)
      .rotate()
      .resize({ width: v.width, withoutEnlargement: true })
      .webp({ quality: v.quality })
      .toFile(outPath);
    const kb = statSync(outPath).size / 1024;
    const over = statSync(outPath).size > v.budget;
    const req = REQUIRED.has(slug);
    console.log(
      `${over ? (req ? "FAIL" : "warn") : " ok "} ${v.dir}/${slug}.webp ${kb.toFixed(0)} KB`,
    );
    if (over && req) failures++;
  }
}
if (failures) {
  console.error(
    `${failures} required output(s) over budget; lower quality for those and rerun.`,
  );
  process.exit(1);
}
console.log("all budgets hold");
