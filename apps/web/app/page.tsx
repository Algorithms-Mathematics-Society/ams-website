import { AboutSplit } from "@/components/sections/AboutSplit";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ExperienceGrid } from "@/components/sections/ExperienceGrid";
import { GallerySpread } from "@/components/sections/GallerySpread";
import { Hero } from "@/components/sections/Hero";
import { LineOfRecord } from "@/components/sections/LineOfRecord";
import { ProductCards } from "@/components/sections/ProductCards";
import { StatsBand } from "@/components/sections/StatsBand";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LineOfRecord />
      <StatsBand />
      <AboutSplit />
      <ProductCards />
      <ExperienceGrid />
      <Testimonials />
      <GallerySpread />
      <ClosingCta />
    </>
  );
}
