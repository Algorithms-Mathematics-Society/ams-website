import { createPageMetadata } from "@/lib/metadata";
import { DeriveSubjects } from "@/components/sections/derive/DeriveSubjects";
import { DeriveClosing } from "@/components/sections/derive/DeriveClosing";
import { JsonLd } from "@/components/seo/JsonLd";
import { DERIVE_EVENT_JSONLD } from "@/content/seo";
import { DeriveHero } from "@/components/sections/derive/DeriveHero";
import { DeriveJourney } from "@/components/sections/derive/DeriveJourney";
import { DerivePartners } from "@/components/sections/derive/DerivePartners";

export const metadata = createPageMetadata({
  title: "Derive: the quantitative reasoning contest",
  description:
    "Explore Derive '26: 2,500+ participants, 33 finalists at IIT Bombay, the competition format, and its Jane Street and QRT partnerships.",
  path: "/derive",
});

export default function DerivePage() {
  return (
    <div data-derive-page>
      <JsonLd data={DERIVE_EVENT_JSONLD} />
      <DeriveHero />
      <DeriveSubjects />
      <DeriveJourney />
      <DerivePartners />
      <DeriveClosing />
    </div>
  );
}
