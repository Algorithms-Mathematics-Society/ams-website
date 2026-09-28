import type { Metadata } from "next";
import { SITE } from "@/content/site";

export const DEFAULT_SOCIAL_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "AMS · Algorithms & Mathematics Society",
};

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  image?: { url: string; width: number; height: number; alt: string };
  publishedTime?: string;
}

/** Keep canonical URLs and share previews consistent across public pages. */
export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image = DEFAULT_SOCIAL_IMAGE,
  publishedTime,
}: PageMetadataOptions): Metadata {
  const url = new URL(path, SITE.url).toString();
  const shareTitle = absoluteTitle ? title : `${title} · ${SITE.name}`;
  const socialImage = { ...image, url: new URL(image.url, SITE.url).toString() };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: shareTitle,
      description,
      url,
      siteName: SITE.name,
      locale: "en_IN",
      images: [socialImage],
      ...(publishedTime
        ? { type: "article" as const, publishedTime }
        : { type: "website" as const }),
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [socialImage],
    },
  };
}
