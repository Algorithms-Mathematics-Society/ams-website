import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Ascent — the systems contest",
  description:
    "C++, optimization, and performance engineering. Winter edition.",
};

export default function AscentPage() {
  return (
    <ComingSoon
      eyebrow="Ascent"
      title="The systems contest."
      body="C++, optimization, and performance engineering. The winter edition is being scheduled — details soon."
    />
  );
}
