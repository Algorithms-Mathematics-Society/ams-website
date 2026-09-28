import { createPageMetadata } from "@/lib/metadata";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { TEAM_PAGE } from "@/content/team";
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
    <>
      <JsonLd data={TEAM_JSONLD} />
      <PageHeader
        compact
        eyebrow={TEAM_PAGE.eyebrow}
        title={TEAM_PAGE.title}
        body={TEAM_PAGE.body}
      />
      <TeamGrid withHeading={false} />
      <CtaBand {...TEAM_PAGE.cta} />
    </>
  );
}
