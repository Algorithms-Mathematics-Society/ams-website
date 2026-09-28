import type { Metadata } from "next";
import { AccessFeatures } from "@/components/sections/access/AccessFeatures";
import { AccessFirms } from "@/components/sections/access/AccessFirms";
import { AccessConversation } from "@/components/sections/access/AccessConversation";
import { AccessHero } from "@/components/sections/access/AccessHero";

export const metadata: Metadata = {
  title: "Hiring & partnerships: sponsor Ascent and Derive",
  alternates: { canonical: "/access" },
  description:
    "Support AMS contests through sponsorship, with Ascent as our current focus and opportunities to discuss future Derive editions. Explore technical hiring assessments with AMS Access.",
};

export default function AccessPage() {
  return (
    <>
      <AccessHero />
      <AccessFirms />
      <AccessConversation />
      <AccessFeatures />
    </>
  );
}
