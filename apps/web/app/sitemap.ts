import type { MetadataRoute } from "next";

const BASE = "https://amshq.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/derive", "/ascent", "/access", "/gallery", "/team"].map(
    (path) => ({ url: `${BASE}${path}` }),
  );
}
