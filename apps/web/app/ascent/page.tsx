import type { Metadata } from "next";
import { CtaBand } from "@/components/ui/CtaBand";
import { ASCENT_CTA } from "@/content/ascent";
import { AscentHero } from "@/components/sections/ascent/AscentHero";
import { AscentPillars } from "@/components/sections/ascent/AscentPillars";
import { AscentStandard } from "@/components/sections/ascent/AscentStandard";

export const metadata: Metadata = {
  title: "Ascent: the C++ performance competition",
  description:
    "Ascent tests C++, optimization, and performance engineering. Register for the 2026 edition by 20 October. The online qualifier is on 24 October.",
  alternates: { canonical: "/ascent" },
};

export default function AscentPage() {
  return (
    <>
      <AscentHero />
      <AscentPillars />
      <AscentStandard />
      <CtaBand {...ASCENT_CTA} />
    </>
  );
}
