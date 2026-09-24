import type { Metadata } from "next";
import { CtaBand } from "@/components/ui/CtaBand";
import { ASCENT_CTA } from "@/content/ascent";
import { AscentHero } from "@/components/sections/ascent/AscentHero";
import { AscentPillars } from "@/components/sections/ascent/AscentPillars";
import { AscentStandard } from "@/components/sections/ascent/AscentStandard";

export const metadata: Metadata = {
  title: "Ascent: the systems contest",
  description:
    "C++, optimization, and performance engineering under the clock. Registration for Ascent '26 is open until 20 October 2026, with Round 1 on 24 October.",
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
