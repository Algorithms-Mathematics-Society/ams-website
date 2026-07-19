import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
// sharp has no bundled types; the site's photo pipeline (scripts/optimize-photos.mjs)
// takes the same untyped-require approach.
import sharp from "sharp";

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
}

interface RawFrontmatter {
  title: string;
  pubDate: string | Date;
  description: string;
  author: string;
  authorImage?: string;
  image: { url: string; alt: string };
  tags?: string[];
}

interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

/** Resolves a frontmatter-relative image path against the post's own folder. */
function resolveLocalImage(postDir: string, ref: string, slug: string): string {
  if (/^https?:\/\//.test(ref) || ref.startsWith("/")) {
    throw new Error(
      `Blog post "${slug}": image paths must be relative to the post's own folder ` +
        `(e.g. "./cover.jpg"), got "${ref}". Place the file inside blogs/${slug}/.`,
    );
  }
  return path.resolve(postDir, ref);
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

/** Copies an inline body image as-is (no crop) so it keeps its native aspect ratio. */
function copyInlineImage(srcPath: string, outPath: string): void {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const srcMtime = fs.statSync(srcPath).mtimeMs;
  if (fs.existsSync(outPath) && fs.statSync(outPath).mtimeMs > srcMtime) return;
  fs.copyFileSync(srcPath, outPath);
}

/**
 * rehype plugin: rewrites relative <img> src in the post body to the copied
 * public path and stamps real width/height (read via sharp) so inline images
 * never cause layout shift, without needing next/image inside raw HTML.
 */
function rehypeLocalImages(context: { slug: string; postDir: string }) {
  return async function transformer(tree: HastNode): Promise<HastNode> {
    const imgNodes: HastNode[] = [];
    const walk = (node: HastNode) => {
      if (node.type === "element" && node.tagName === "img") imgNodes.push(node);
      node.children?.forEach(walk);
    };
    walk(tree);

    for (const node of imgNodes) {
      const src = node.properties?.src;
      if (typeof src !== "string" || /^https?:\/\//.test(src)) continue;

      const resolved = resolveLocalImage(context.postDir, src, context.slug);
      const filename = path.basename(resolved);
      const outPath = path.join(PUBLIC_BLOG_DIR, context.slug, "inline", filename);
      copyInlineImage(resolved, outPath);
      const meta = await sharp(outPath).metadata();

      node.properties = {
        ...node.properties,
        src: `/blog/${context.slug}/inline/${filename}`,
        width: meta.width,
        height: meta.height,
        loading: "lazy",
        decoding: "async",
      };
    }
    return tree;
  };
}

async function compileBody(
  body: string,
  context: { slug: string; postDir: string },
): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, { theme: "github-light", keepBackground: false })
    .use(rehypeLocalImages, context)
    .use(rehypeStringify)
    .process(body);
  return String(file);
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

  const html = await compileBody(content, { slug, postDir });

  return {
    slug,
    title: data.title,
    pubDate: data.pubDate instanceof Date ? data.pubDate : new Date(data.pubDate),
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
