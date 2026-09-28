import type { Metadata } from "next";
import { AboutSplit } from "@/components/sections/AboutSplit";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ExperienceGrid } from "@/components/sections/ExperienceGrid";
import { GallerySpread } from "@/components/sections/GallerySpread";
import { Hero } from "@/components/sections/Hero";
import { ProductCards } from "@/components/sections/ProductCards";
import { StatsBand } from "@/components/sections/StatsBand";

export const metadata: Metadata = {
  title: { absolute: "AMS · Algorithms & Mathematics Society" },
  description:
    "AMS runs Derive and Ascent, competitions in quantitative reasoning and systems engineering, and builds Access for proctored assessments.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <AboutSplit />
      <ProductCards />
      <GallerySpread />
      <ExperienceGrid />
      <ClosingCta />
    </>
  );
}
