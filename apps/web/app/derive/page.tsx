import type { Metadata } from "next";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { DERIVE_CTA } from "@/content/derive";
import { DERIVE_EVENT_JSONLD } from "@/content/seo";
import { DeriveHero } from "@/components/sections/derive/DeriveHero";
import { DeriveJourney } from "@/components/sections/derive/DeriveJourney";
import { DerivePartners } from "@/components/sections/derive/DerivePartners";

export const metadata: Metadata = {
  title: "Derive: the quantitative reasoning contest",
  description:
    "Explore Derive '26: 2,500+ participants, 33 finalists at IIT Bombay, the competition format, and its Jane Street and QRT partnerships.",
  alternates: { canonical: "/derive" },
};

export default function DerivePage() {
  return (
    <>
      <JsonLd data={DERIVE_EVENT_JSONLD} />
      <DeriveHero />
      <DeriveJourney />
      <DerivePartners />
      <CtaBand {...DERIVE_CTA} />
    </>
  );
}
