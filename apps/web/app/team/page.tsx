import type { Metadata } from "next";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { TEAM_PAGE } from "@/content/team";

export const metadata: Metadata = {
  title: "The people behind AMS",
  description:
    "Meet the AMS team behind Ascent, Derive, and our community, and learn how to contribute to the next edition.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
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
