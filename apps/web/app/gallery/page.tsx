import type { Metadata } from "next";
import { GalleryGrid } from "@/components/sections/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Moments from AMS contests and finals.",
};

export default function GalleryPage() {
  return <GalleryGrid />;
}
