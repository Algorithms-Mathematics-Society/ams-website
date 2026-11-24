import path from "path";
import fs from "node:fs";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this checkout. Git worktrees make two
  // pnpm-workspace.yaml files visible and Turbopack's inference can pick
  // the WRONG checkout as root, which breaks file-watch invalidation and
  // serves stale CSS from the persistent cache.
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
  images: {
    // Next 16 only serves quality values that are explicitly allowlisted
    // here (the default list is [75]; any other q= 400s at the optimizer).
    // 50 exists for full-bleed photos that sit under heavy dark overlays
    // (stats backdrop), where the extra compression is invisible but the
    // byte savings matter for 4G LCP. 75 is the default for everything
    // else, including the hero slideshow, which has no overlay to hide
    // compression in.
    qualities: [50, 75],
  },
};

export default function config(phase: string): NextConfig {
  if (phase === PHASE_PRODUCTION_BUILD) {
    const tokenFile = path.join(__dirname, ".generated/build-token");
    if (!process.env.AMS_PREPARED_BUILD || !fs.existsSync(tokenFile) ||
        fs.readFileSync(tokenFile, "utf8") !== process.env.AMS_PREPARED_BUILD) {
      throw new Error("Run pnpm build: Monthly requires a fresh solver feed and asset cleanup before every build.");
    }
  }
  return nextConfig;
}
