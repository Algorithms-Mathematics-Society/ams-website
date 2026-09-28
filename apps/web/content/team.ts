export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  profile?: { label: string; href: string };
  image: { src: string; alt: string };
}

export const TEAM_PAGE = {
  eyebrow: "The people behind AMS",
  title: "Built by competitors.",
  body: "Meet our founder. AMS also works with problem setters, judges, volunteers, and engineers who help run the contests and build Access.",
  cta: {
    title: "Contribute to the next edition.",
    body: "AMS works with problem setters, judges, operations volunteers, and platform contributors. Email us with your area of interest and a little about your experience.",
    buttonLabel: "Contact AMS",
    buttonHref: "mailto:team@amshq.in?subject=Volunteering%20with%20AMS",
  },
} as const;

export const TEAM: TeamMember[] = [
  {
    name: "Tilak Jain",
    role: "Founder",
    bio: "Tilak founded AMS and organizes its national contests in quantitative reasoning and systems engineering.",
    profile: {
      label: "Tilak on LinkedIn",
      href: "https://www.linkedin.com/in/tilak-jain-521913328/",
    },
    image: {
      src: "/images/founder.webp",
      alt: "Tilak Jain addressing participants at the Derive finals",
    },
  },
];
