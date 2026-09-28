export interface TeamMember {
  name: string;
  role: string;
  affiliation?: string;
  bio?: string;
  profile?: { label: string; href: string };
  image?: { src: string; alt: string };
}

export const TEAM_PAGE = {
  eyebrow: "The people behind AMS",
  title: "Built by competitors.",
  body: "Meet the people behind our contests, problem design, partnerships, and community. Together with our judges, volunteers, and contributors, they bring each edition of AMS to life.",
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
    affiliation: "University of Mumbai",
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
  {
    name: "Kartik Agrawal",
    role: "Head of Problem Design · AMS Derive 2026",
    affiliation: "IIT Kanpur",
    profile: {
      label: "Kartik on LinkedIn",
      href: "https://www.linkedin.com/in/kartik-agrawal-4b71192b7/",
    },
  },
  {
    name: "Ayush Shukla",
    role: "Head of Community",
    affiliation: "University of Mumbai",
    profile: {
      label: "Ayush on LinkedIn",
      href: "https://www.linkedin.com/in/awyushshukla/",
    },
  },
  {
    name: "Quasar Chunawala",
    role: "Head of Problem Design · AMS Ascent 2026",
    affiliation: "CME Group",
    profile: {
      label: "Quasar on LinkedIn",
      href: "https://www.linkedin.com/in/quasar-chunawala/",
    },
  },
  {
    name: "Sahil",
    role: "Head of Partnerships · AMS Derive 2026",
    profile: {
      label: "Sahil on LinkedIn",
      href: "https://www.linkedin.com/in/sahil-4a7830281/",
    },
  },
];
