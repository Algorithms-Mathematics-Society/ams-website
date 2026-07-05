import type { Metadata } from "next";
import { DeriveCta } from "@/components/sections/derive/DeriveCta";
import { DeriveHero } from "@/components/sections/derive/DeriveHero";
import { DeriveJourney } from "@/components/sections/derive/DeriveJourney";
import { DerivePartners } from "@/components/sections/derive/DerivePartners";

export const metadata: Metadata = {
  title: "Derive — the quant contest",
  description:
    "Probability, markets, and mathematical reasoning under the clock. 2,500+ participants, 150 in Round 2, 50 finalists on stage at IIT Bombay.",
};

export default function DerivePage() {
  return (
    <>
      <DeriveHero />
      <DeriveJourney />
      <DerivePartners />
      <DeriveCta />
    </>
  );
}
