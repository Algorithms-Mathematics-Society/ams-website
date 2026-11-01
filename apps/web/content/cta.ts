/** Audience-specific invitations after the event story and society introduction. */
export const CLOSING_CTA = {
  headline: "Take part",
  paths: [
    {
      title: "For participants",
      body: "Explore the formats and eligibility requirements, or choose email updates for future editions.",
      label: "Explore competitions", href: "#competitions", primary: true,
    },
    {
      title: "For hiring teams and sponsors",
      body: "Discuss the technical audience you want to meet, or a coding assessment your team needs to run.",
      label: "Explore partnerships", href: "/access", primary: false,
      assessment: { label: "Discuss an assessment", href: "/access#assessments" },
    },
  ],
} as const;
