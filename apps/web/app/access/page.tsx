import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Access — the platform",
  description:
    "Proctored assessments benchmarked against India's competitive elite.",
};

export default function AccessPage() {
  return (
    <ComingSoon
      eyebrow="Access"
      title="The platform."
      body="Proctored assessments benchmarked against India's competitive elite. Firms: write to us to run your first benchmarked assessment."
    />
  );
}
