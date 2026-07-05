import type { Metadata } from "next";
import { CtaBand } from "@/components/ui/CtaBand";
import { ASCENT_CTA } from "@/content/ascent";
import { AscentHero } from "@/components/sections/ascent/AscentHero";
import { AscentPillars } from "@/components/sections/ascent/AscentPillars";
import { AscentStandard } from "@/components/sections/ascent/AscentStandard";

export const metadata: Metadata = {
  title: "Ascent: the systems contest",
  description:
    "C++, optimization, and performance engineering under the clock. The winter edition of the AMS circuit.",
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
