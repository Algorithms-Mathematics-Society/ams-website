export interface TeamMember {
  name: string;
  role: string;
  image: { src: string; alt: string };
}

export const TEAM_PAGE = {
  eyebrow: "Organization",
  title: "Leadership and contributors.",
  body: "AMS is led by competitors and supported by the people who set problems, run the halls, judge the finals, and build the assessment platform.",
  cta: {
    title: "Contribute to the next edition.",
    body: "AMS works with problem setters, judges, operations volunteers, and platform contributors. Contact the organization to take part.",
    buttonLabel: "Contact AMS",
    buttonHref: "mailto:tilakj0108@gmail.com?subject=Volunteering%20with%20AMS",
  },
} as const;

export const TEAM: TeamMember[] = [
  {
    name: "Tilak",
    role: "Founder",
    image: {
      src: "/images/founder.webp",
      alt: "Tilak addressing participants at the Derive finals",
    },
  },
];
