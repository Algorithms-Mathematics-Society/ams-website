export interface TeamMember {
  id: string;
  name: string;
  role: string;
  affiliation?: string;
  bio?: string;
  profile?: { label: string; href: string };
  image?: { src: string; alt: string };
}

export const TEAM_PAGE = {
  eyebrow: "Team",
  title: "The people behind AMS.",
  rosterLabel: "AMS team members",
  body: "AMS brings people together through quantitative and systems competitions. Meet the people building the contests, assessment tools, partnerships, and community around that work.",
  cta: {
    title: "Interested in contributing?",
    body: "AMS works with problem setters, judges, operations volunteers, and platform contributors. Email us with your area of interest and a little about your experience.",
    buttonLabel: "Discuss contributing",
    buttonHref: "mailto:team@amshq.in?subject=Volunteering%20with%20AMS",
    emailLabel: "team@amshq.in",
    emailHref: "mailto:team@amshq.in",
  },
} as const;

export const TEAM: TeamMember[] = [
  {
    id: "tilak-jain",
    name: "Tilak Jain",
    role: "Founder",
    affiliation: "University of Mumbai",
    bio: "Tilak founded AMS and organizes its national contests in quantitative reasoning and systems engineering.",
    profile: {
      label: "Tilak on LinkedIn",
      href: "https://www.linkedin.com/in/tilak-jain-521913328/",
    },
  },
  {
    id: "kartik-agrawal",
    name: "Kartik Agrawal",
    role: "Head of Problem Design · AMS Derive 2026",
    affiliation: "IIT Kanpur",
    profile: {
      label: "Kartik on LinkedIn",
      href: "https://www.linkedin.com/in/kartik-agrawal-4b71192b7/",
    },
  },
  {
    id: "ayush-shukla",
    name: "Ayush Shukla",
    role: "Head of Community",
    affiliation: "University of Mumbai",
    profile: {
      label: "Ayush on LinkedIn",
      href: "https://www.linkedin.com/in/awyushshukla/",
    },
  },
  {
    id: "quasar-chunawala",
    name: "Quasar Chunawala",
    role: "Head of Problem Design · AMS Ascent 2026",
    affiliation: "CME Group",
    profile: {
      label: "Quasar on LinkedIn",
      href: "https://www.linkedin.com/in/quasar-chunawala/",
    },
  },
  {
    id: "sahil",
    name: "Sahil",
    role: "Head of Partnerships · AMS Derive 2026",
    affiliation: "IIT Kharagpur",
    profile: {
      label: "Sahil on LinkedIn",
      href: "https://www.linkedin.com/in/sahil-4a7830281/",
    },
  },
  {
    id: "shubhranil-paul",
    name: "Shubhranil Paul",
    role: "Software Engineering Intern · Winter 2026",
    affiliation: "University of Mumbai",
    profile: {
      label: "Shubhranil on LinkedIn",
      href: "https://www.linkedin.com/in/shubhranil-paul/",
    },
  },
  {
    id: "rasesh-shetty",
    name: "Rasesh Shetty",
    role: "Software Engineering Intern · Winter 2026",
    affiliation: "IIT (BHU) Varanasi",
    profile: {
      label: "Rasesh on LinkedIn",
      href: "https://www.linkedin.com/in/rasesh-shetty/",
    },
  },
];

/** Editorial purpose, grounded in the sales audience brief and published AMS introduction. */
export const TEAM_STORY = {
  workLabel: "What we work on",
  work: [
    { name: "Derive", detail: "Quantitative reasoning", href: "/derive" },
    { name: "Ascent", detail: "Systems engineering", href: "/ascent" },
    { name: "AMS Access", detail: "Coding assessments", href: "/access#assessments" },
  ],
  vision: {
    label: "Our vision",
    title: "Give ability a place to be seen.",
    paragraphs: [
      "We want people to have meaningful opportunities to test their ideas, show their work, and meet others who take the same problems seriously.",
      "For AMS, that starts with competitions in quantitative reasoning and systems engineering: shared problems, clear rules, and room for discussion beyond the score. A contest result is a starting point for understanding someone’s work, alongside their other experience and a conversation about how they think.",
    ],
  },
  founderId: "tilak-jain",
  founderContext: "In his introduction to AMS, Tilak describes the starting point: a good problem gives people something concrete to work on together. The competitions put that idea into practice through timed rounds, shared rules, and in-person finals.",
  founderEssay: { label: "Read why AMS runs competitions", href: "/blog/welcome-to-ams" },
  teamTitle: "Our team",
  teamBody: "Working across problem design, software development, partnerships, and community.",
} as const;
