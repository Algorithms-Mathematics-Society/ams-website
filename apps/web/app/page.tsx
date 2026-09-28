import { createPageMetadata } from "@/lib/metadata";
import { SITE } from "@/content/site";
import { AboutSplit } from "@/components/sections/AboutSplit";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ExperienceGrid } from "@/components/sections/ExperienceGrid";
import { GallerySpread } from "@/components/sections/GallerySpread";
import { Hero } from "@/components/sections/Hero";
import { ProductCards } from "@/components/sections/ProductCards";
import { StatsBand } from "@/components/sections/StatsBand";

export const metadata = createPageMetadata({
  title: "AMS · Algorithms & Mathematics Society",
  absoluteTitle: true,
  description: SITE.description,
  path: "/",
});

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
