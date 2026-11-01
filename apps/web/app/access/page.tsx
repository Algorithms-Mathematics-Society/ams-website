import { createPageMetadata } from "@/lib/metadata";
import { AccessFeatures } from "@/components/sections/access/AccessFeatures";
import { AccessFirms } from "@/components/sections/access/AccessFirms";
import { AccessConversation } from "@/components/sections/access/AccessConversation";
import { AccessHero } from "@/components/sections/access/AccessHero";
import { AccessApproach } from "@/components/sections/access/AccessApproach";
import { AccessEvidence } from "@/components/sections/access/AccessEvidence";
import styles from "@/components/sections/access/Access.module.css";

export const metadata = createPageMetadata({
  title: "Hiring & partnerships: sponsor Ascent and Derive",
  path: "/access",
  description:
    "Partner with AMS on Ascent, our current sponsorship focus, or future Derive editions. Explore technical hiring assessments with AMS Access.",
});

export default function AccessPage() {
  return (
    <div data-partnerships-page className={styles.page}>
      <AccessHero />
      <AccessEvidence />
      <AccessApproach />
      <AccessFirms />
      <AccessFeatures />
      <AccessConversation />
    </div>
  );
}
