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
      title: "For recruiters and sponsors",
      body: "Contact us about competition sponsorship and recruiting opportunities.",
      label: "Discuss a partnership", href: "/access#contact", primary: false,
    },
  ],
} as const;
