import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Derive — the quant contest",
  description:
    "Probability, markets, and mathematical reasoning under the clock. Derive '26 finals at IIT Bombay.",
};

export default function DerivePage() {
  return (
    <ComingSoon
      eyebrow="Derive"
      title="The quant contest."
      body="Probability, markets, and mathematical reasoning under the clock. Registration details for Derive '26 are coming soon."
    />
  );
}
