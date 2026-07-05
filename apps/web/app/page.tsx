import { AboutSplit } from "@/components/sections/AboutSplit";
import { ExperienceGrid } from "@/components/sections/ExperienceGrid";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { Hero } from "@/components/sections/Hero";
import { ProductCards } from "@/components/sections/ProductCards";
import { SponsorStrip } from "@/components/sections/SponsorStrip";
import { StatsBand } from "@/components/sections/StatsBand";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SponsorStrip />
      <StatsBand />
      <AboutSplit />
      <ProductCards />
      <ExperienceGrid />
      <GalleryGrid />
      <Testimonials />
      <TeamGrid />
    </>
  );
}
