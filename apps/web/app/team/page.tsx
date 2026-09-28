import type { Metadata } from "next";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { TEAM_PAGE } from "@/content/team";

export const metadata: Metadata = {
  title: "The people behind AMS",
  description:
    "Meet Tilak Jain, founder of AMS, and learn how to contribute to its contests, problem setting, event operations, and assessment platform.",
  alternates: { canonical: "/team" },
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
