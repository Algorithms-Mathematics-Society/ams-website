import type { Metadata } from "next";
import { CtaBand } from "@/components/ui/CtaBand";
import { ACCESS_CTA } from "@/content/access";
import { AccessFeatures } from "@/components/sections/access/AccessFeatures";
import { AccessFirms } from "@/components/sections/access/AccessFirms";
import { AccessConversation } from "@/components/sections/access/AccessConversation";
import { AccessHero } from "@/components/sections/access/AccessHero";

export const metadata: Metadata = {
  title: "Access: assessments for technical hiring",
  alternates: { canonical: "/access" },
  description:
    "Explore AMS Access, a desktop assessment platform with readiness checks and configurable proctoring. Discuss technical hiring assessments and contest partnerships.",
};

export default function AccessPage() {
  return (
    <>
      <AccessHero />
      <AccessFeatures />
      <AccessFirms />
      <AccessConversation />
      <CtaBand {...ACCESS_CTA} />
    </>
  );
}
