import type { Metadata } from "next";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { DERIVE_CTA } from "@/content/derive";
import { DERIVE_EVENT_JSONLD } from "@/content/seo";
import { DeriveHero } from "@/components/sections/derive/DeriveHero";
import { DeriveJourney } from "@/components/sections/derive/DeriveJourney";
import { DerivePartners } from "@/components/sections/derive/DerivePartners";

export const metadata: Metadata = {
  title: "Derive: the quant contest",
  description:
    "Probability, markets, and mathematical reasoning under the clock. 2,500+ participants, 150 in Round 2, 50 finalists on stage at IIT Bombay.",
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
