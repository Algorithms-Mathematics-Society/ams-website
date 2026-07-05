import type { Metadata } from "next";
import { AscentCta } from "@/components/sections/ascent/AscentCta";
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
      <AscentCta />
    </>
  );
}
