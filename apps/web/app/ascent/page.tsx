import { createPageMetadata } from "@/lib/metadata";
import { AscentClosing } from "@/components/sections/ascent/AscentClosing";
import { AscentRegistration } from "@/components/sections/ascent/AscentRegistration";
import { AscentHero } from "@/components/sections/ascent/AscentHero";
import { AscentPillars } from "@/components/sections/ascent/AscentPillars";
import { AscentStandard } from "@/components/sections/ascent/AscentStandard";

export const metadata = createPageMetadata({
  title: "Ascent: the C++ performance competition",
  description:
    "Explore the Ascent C++ performance competition, its three rounds, syllabus, and entry requirements. Registration for the 2026 edition is closed.",
  path: "/ascent",
});

export default function AscentPage() {
  return (
    <div data-ascent-page>
      <AscentHero />
      <AscentPillars />
      <AscentStandard />
      <AscentRegistration />
      <AscentClosing />
    </div>
  );
}
