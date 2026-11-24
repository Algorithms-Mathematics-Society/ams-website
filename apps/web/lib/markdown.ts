import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
// sharp has no bundled types; the site's photo pipeline (scripts/optimize-photos.mjs)
// takes the same untyped-require approach.
import sharp from "sharp";

// Build-time Markdown compilation shared by the blog and AMS Monthly. Server-only:
// never import this from a "use client" file.

interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

export interface MarkdownContext {
  /** Folder holding the Markdown file; relative image paths resolve against it. */
  sourceDir: string;
  /** Human label for errors, for example "blogs/my-post". */
  label: string;
  /** Absolute folder inside public/ where inline images are copied. */
  publicDir: string;
  /** URL prefix that serves `publicDir`, for example "/blog/my-post". */
  publicPrefix: string;
}

/** Resolves a Markdown-relative image path, refusing absolute and remote paths. */
export function resolveLocalImage(
  sourceDir: string,
  ref: string,
  label: string,
): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(ref) || path.isAbsolute(ref)) {
    throw new Error(
      `${label}: image paths must be relative to the file's own folder ` +
        `(e.g. "./cover.jpg"), got "${ref}". Place the file inside ${label}/.`,
    );
  }
  const root = fs.realpathSync(sourceDir);
  const resolved = fs.realpathSync(path.resolve(root, ref));
  const relative = path.relative(root, resolved);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${label}: image must stay inside its own folder.`);
  }
  return resolved;
}

/** Copies an inline body image as-is (no crop) so it keeps its native aspect ratio. */
function copyInlineImage(srcPath: string, outPath: string): void {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const srcMtime = fs.statSync(srcPath).mtimeMs;
  if (fs.existsSync(outPath) && fs.statSync(outPath).mtimeMs > srcMtime) return;
  fs.copyFileSync(srcPath, outPath);
}

/**
 * rehype plugin: rewrites relative <img> src to the copied public path and stamps
 * real width/height (read via sharp) so inline images never cause layout shift,
 * without needing next/image inside raw HTML.
 */
function rehypeLocalImages(context: MarkdownContext) {
  return async function transformer(tree: HastNode): Promise<HastNode> {
    const imgNodes: HastNode[] = [];
    const walk = (node: HastNode) => {
      if (node.type === "element" && node.tagName === "a") {
        const href = node.properties?.href;
        if (typeof href === "string") {
          // Author-supplied Markdown must not create executable link schemes.
          try {
            const url = new URL(href, "https://www.amshq.in");
            if (!["https:", "http:", "mailto:", "tel:"].includes(url.protocol)) {
              delete node.properties!.href;
            }
          } catch { delete node.properties!.href; }
        }
      }
      if (node.type === "element" && node.tagName === "img")
        imgNodes.push(node);
      node.children?.forEach(walk);
    };
    walk(tree);

    for (const node of imgNodes) {
      const src = node.properties?.src;
      if (typeof src !== "string" || /^https?:\/\//.test(src)) continue;

      const resolved = resolveLocalImage(context.sourceDir, src, context.label);
      const filename = path.relative(fs.realpathSync(context.sourceDir), resolved);
      const publicName = filename.split(path.sep).map(encodeURIComponent).join("/");
      const outPath = path.join(context.publicDir, "inline", filename);
      copyInlineImage(resolved, outPath);
      const meta = await sharp(outPath).metadata();

      node.properties = {
        ...node.properties,
        src: `${context.publicPrefix}/inline/${publicName}`,
        width: meta.width,
        height: meta.height,
        loading: "lazy",
        decoding: "async",
      };
    }
    return tree;
  };
}

export async function compileMarkdown(
  body: string,
  context: MarkdownContext,
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
