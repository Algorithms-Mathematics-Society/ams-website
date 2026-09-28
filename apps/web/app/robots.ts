import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

/**
 * Everything is public. AI crawlers are named explicitly so a future
 * disallow rule can never silently cut AMS out of assistant answers;
 * being quotable by Claude/ChatGPT/Gemini is part of the SEO strategy.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "Google-Extended",
  "PerplexityBot",
  "CCBot",
  "Applebot-Extended",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
