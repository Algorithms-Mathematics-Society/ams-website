import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
// sharp has no bundled types; the site's photo pipeline (scripts/optimize-photos.mjs)
// takes the same untyped-require approach.
import sharp from "sharp";
import { compileMarkdown, resolveLocalImage as resolveImage } from "./markdown";
import { fail, oneOf, optBoolean, optHttpsUrl, optString, reqRecord } from "./frontmatter";

// blogs/ lives at the repo root, next to media/ and docs/: source content that
// a build step turns into site output, same shape as media/photos -> public/images.
// process.cwd() (not __dirname) because this module is bundled by Next's
// server compiler, whose __dirname rewriting isn't guaranteed; cwd is always
// apps/web whether invoked via `next dev`, `next build`, or `pnpm --filter web`.
const BLOGS_DIR = path.resolve(process.cwd(), "../../blogs");
const PUBLIC_BLOG_DIR = path.resolve(process.cwd(), "public/blog");

export interface BlogPost {
  slug: string;
  title: string;
  pubDate: Date;
  updatedDate?: Date;
  description: string;
  author: string;
  authorImage: string | null;
  tags: string[];
  cover: {
    thumb: string;
    full: string;
    alt: string;
  };
  html: string;
  readingMinutes: number;
  provenance: PostProvenance;
}

export type AuthorType = "ams" | "community" | "practitioner";
export type AiUse = "none" | "editing" | "drafting";

/** Who wrote a post and how it was checked. Community fields are all optional. */
export interface PostProvenance {
  authorType: AuthorType;
  /** Institution for community authors, generic role for practitioners. */
  affiliation?: string;
  aiUse?: AiUse;
  explainerVerified: boolean;
  reviewedBy?: { name?: string; role: string };
  explainerUrl?: string;
  /** AMS Monthly problem number this post is the editorial for. */
  monthly?: number;
}

const AUTHOR_TYPES = ["ams", "community", "practitioner"] as const;
const AI_USES = ["none", "editing", "drafting"] as const;
const RESERVED_SLUGS = new Set(["contribute"]);

interface RawFrontmatter {
  title: string;
  pubDate: string | Date;
  updatedDate?: string | Date;
  description: string;
  author: string;
  authorImage?: string;
  image: { url: string; alt: string };
  tags?: string[];
  authorType?: string;
  affiliation?: string;
  aiUse?: string;
  explainerVerified?: boolean;
  reviewedBy?: { name?: string; role?: string };
  explainerUrl?: string;
  monthly?: number;
}

/** Resolves a frontmatter-relative image path against the post's own folder. */
function resolveLocalImage(postDir: string, ref: string, slug: string): string {
  return resolveImage(postDir, ref, `blogs/${slug}`);
}

/** Idempotent: skips reprocessing when the output is newer than the source. */
async function processFixedCrop(
  srcPath: string,
  outPath: string,
  width: number,
  height: number,
): Promise<void> {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const srcMtime = fs.statSync(srcPath).mtimeMs;
  if (fs.existsSync(outPath) && fs.statSync(outPath).mtimeMs > srcMtime) return;
  await sharp(srcPath)
    .rotate()
    .resize({ width, height, fit: "cover" })
    .webp({ quality: 75 })
    .toFile(outPath);
}

/** Validates the optional contributor fields; AMS posts need none of them. */
function readProvenance(data: RawFrontmatter, slug: string): PostProvenance {
  const file = `blogs/${slug}/index.md`;
  const record = data as unknown as Record<string, unknown>;
  const authorType = data.authorType === undefined ? "ams" : oneOf(data.authorType, AUTHOR_TYPES, "authorType", file);
  if (data.aiUse === "substantial") {
    fail(file, "aiUse", 'is "substantial"; substantially AI-generated work is not published as a community post');
  }
  const aiUse = data.aiUse === undefined ? undefined : oneOf(data.aiUse, AI_USES, "aiUse", file);
  if (authorType !== "ams" && aiUse === undefined) fail(file, "aiUse", "is required for community and practitioner posts");
  const explainerVerified = optBoolean(record, "explainerVerified", file);
  let reviewedBy: PostProvenance["reviewedBy"];
  if (data.reviewedBy !== undefined) {
    const reviewer = reqRecord(record, "reviewedBy", file);
    const role = optString(reviewer, "role", file);
    if (!role) fail(file, "reviewedBy.role", "is required when reviewedBy is set");
    reviewedBy = { role, name: optString(reviewer, "name", file) };
  }
  if (explainerVerified && !reviewedBy) fail(file, "reviewedBy", "is required when explainerVerified is true");
  const monthly = data.monthly;
  if (monthly !== undefined && (typeof monthly !== "number" || !Number.isInteger(monthly) || monthly < 1)) {
    fail(file, "monthly", "must be a positive whole number");
  }
  return {
    authorType,
    affiliation: optString(record, "affiliation", file),
    aiUse,
    explainerVerified,
    reviewedBy,
    explainerUrl: optHttpsUrl(record, "explainerUrl", file),
    monthly,
  };
}

async function loadPost(slug: string): Promise<BlogPost> {
  const postDir = path.join(BLOGS_DIR, slug);
  const mdPath = path.join(postDir, "index.md");
  const raw = fs.readFileSync(mdPath, "utf-8");
  const { data, content } = matter(raw) as unknown as {
    data: RawFrontmatter;
    content: string;
  };

  for (const field of ["title", "pubDate", "description", "author", "image"] as const) {
    if (!data[field]) {
      throw new Error(`Blog post "${slug}" is missing required frontmatter field "${field}".`);
    }
  }
  if (!data.image.url || !data.image.alt) {
    throw new Error(`Blog post "${slug}" frontmatter "image" needs both "url" and "alt".`);
  }

  const pubDate = new Date(data.pubDate);
  const updatedDate = data.updatedDate ? new Date(data.updatedDate) : undefined;
  if (!Number.isFinite(pubDate.getTime()) || (updatedDate &&
    (!Number.isFinite(updatedDate.getTime()) || updatedDate < pubDate))) {
    throw new Error(`Blog post "${slug}" has invalid publication/update dates.`);
  }

  const outDir = path.join(PUBLIC_BLOG_DIR, slug);

  const coverSrc = resolveLocalImage(postDir, data.image.url, slug);
  await processFixedCrop(coverSrc, path.join(outDir, "cover-thumb.webp"), 600, 315);
  await processFixedCrop(coverSrc, path.join(outDir, "cover-full.webp"), 1200, 630);

  let authorImage: string | null = null;
  if (data.authorImage) {
    const avatarSrc = resolveLocalImage(postDir, data.authorImage, slug);
    await processFixedCrop(avatarSrc, path.join(outDir, "author.webp"), 96, 96);
    authorImage = `/blog/${slug}/author.webp`;
  }

  const html = await compileMarkdown(content, {
    sourceDir: postDir,
    label: `blogs/${slug}`,
    publicDir: outDir,
    publicPrefix: `/blog/${slug}`,
  });

  // Count rendered prose at build time, excluding markup and image attributes.
  const plainText = html.replace(/<[^>]*>/g, " ").replace(/&[^;]+;/g, " ");
  const readingMinutes = Math.max(1, Math.ceil((plainText.match(/\S+/g)?.length ?? 0) / 200));

  return {
    readingMinutes,
    slug,
    title: data.title,
    pubDate,
    updatedDate,
    description: data.description,
    author: data.author,
    authorImage,
    tags: data.tags ?? [],
    cover: {
      thumb: `/blog/${slug}/cover-thumb.webp`,
      full: `/blog/${slug}/cover-full.webp`,
      alt: data.image.alt,
    },
    html,
    provenance: readProvenance(data, slug),
  };
}

/** All posts, newest first. Memoized per request/build so repeated calls
 *  (list page, sitemap, generateStaticParams) don't recompile every post
 *  more than once. */
export const getAllPosts = cache(async (): Promise<BlogPost[]> => {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  const slugs = fs
    .readdirSync(BLOGS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const posts: BlogPost[] = [];
  for (const slug of slugs) {
    if (RESERVED_SLUGS.has(slug)) {
      throw new Error(`blogs/${slug}/: "${slug}" is a reserved route under /blog; rename the folder.`);
    }
    const mdPath = path.join(BLOGS_DIR, slug, "index.md");
    if (!fs.existsSync(mdPath)) {
      console.warn(`Skipping blogs/${slug}/: no index.md found.`);
      continue;
    }
    posts.push(await loadPost(slug));
  }

  return posts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
});

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
