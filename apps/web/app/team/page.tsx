import type { Metadata } from "next";
import { TeamGrid } from "@/components/sections/TeamGrid";

export const metadata: Metadata = {
  title: "Team",
  description: "The people behind AMS.",
};

export default function TeamPage() {
  return <TeamGrid />;
}
