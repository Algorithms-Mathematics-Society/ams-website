import type { Metadata } from "next";
import { AccessCta } from "@/components/sections/access/AccessCta";
import { AccessFeatures } from "@/components/sections/access/AccessFeatures";
import { AccessFirms } from "@/components/sections/access/AccessFirms";
import { AccessHero } from "@/components/sections/access/AccessHero";

export const metadata: Metadata = {
  title: "Access: the platform",
  description:
    "Proctored assessments benchmarked against India's competitive elite, in a native desktop lockdown shell with a full audit trail.",
};

export default function AccessPage() {
  return (
    <>
      <AccessHero />
      <AccessFeatures />
      <AccessFirms />
      <AccessCta />
    </>
  );
}
