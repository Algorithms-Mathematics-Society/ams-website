import type { Metadata } from "next";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { TEAM_PAGE } from "@/content/team";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The people behind AMS: the competitors who set the problems, run the halls, and build the platform.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow={TEAM_PAGE.eyebrow}
        title={TEAM_PAGE.title}
        body={TEAM_PAGE.body}
      />
      <TeamGrid withHeading={false} />
      <CtaBand {...TEAM_PAGE.cta} />
    </>
  );
}
