import { createPageMetadata } from "@/lib/metadata";
import { TeamVision } from "@/components/sections/TeamVision";
import { TeamFounder } from "@/components/sections/TeamFounder";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { TeamClosing } from "@/components/sections/TeamClosing";
import { TeamIntro } from "@/components/sections/TeamIntro";
import styles from "@/components/sections/Team.module.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { TEAM_JSONLD } from "@/content/seo";

export const metadata = createPageMetadata({
  title: "The people behind AMS",
  description:
    "Meet the AMS team behind Ascent, Derive, and our community, and learn how to contribute to the next edition.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <div data-team-page className={styles.page}>
      <JsonLd data={TEAM_JSONLD} />
      <TeamIntro />
      <TeamVision />
      <TeamFounder />
      <TeamGrid />
      <TeamClosing />
    </div>
  );
}
