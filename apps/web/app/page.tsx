import { AboutSplit } from "@/components/sections/AboutSplit";
import { ExperienceGrid } from "@/components/sections/ExperienceGrid";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { Hero } from "@/components/sections/Hero";
import { LineOfRecord } from "@/components/sections/LineOfRecord";
import { PhotoBreaker } from "@/components/sections/PhotoBreaker";
import { ProductCards } from "@/components/sections/ProductCards";
import { StatsBand } from "@/components/sections/StatsBand";
import { TeamGrid } from "@/components/sections/TeamGrid";
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
      <PhotoBreaker />
      <GalleryGrid />
      <Testimonials />
      <TeamGrid />
    </>
  );
}
