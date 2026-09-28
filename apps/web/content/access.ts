export const ACCESS_HERO = {
  eyebrow: "AMS Access · Assessments for firms",
  title: "See how candidates solve problems.",
  body: "Access is the AMS desktop assessment platform. It brings timed problem solving, session checks, and proctoring into one place for your team to review alongside interviews.",
  image: {
    src: "/images/access-command-hub.png",
    alt: "Access desktop interface preview with session entry, contest list, and system readiness checks",
    width: 860,
    height: 520,
  },
  photoCaption: "Access desktop interface preview",
  primaryLink: { label: "Discuss an assessment", href: "#contact" },
  secondaryLink: { label: "Explore contest partnerships", href: "#sponsor" },
} as const;

export interface AccessFeature {
  title: string;
  body: string;
}

export const ACCESS_FEATURES_HEADING = {
  eyebrow: "The assessment environment",
  title: "From session setup to review.",
} as const;

/** Descriptions reflect the existing product materials, without security guarantees. */
export const ACCESS_FEATURES: AccessFeature[] = [
  {
    title: "Desktop assessment client",
    body: "A dedicated application for Windows and Linux provides a consistent place to enter and complete an assessment.",
  },
  {
    title: "Readiness checks",
    body: "Camera, microphone, network, and environment checks help candidates prepare before the session begins.",
  },
  {
    title: "Session restrictions",
    body: "Application and network controls are designed to limit outside assistance during an assessment.",
  },
  {
    title: "Environment checks",
    body: "Checks flag restricted applications and signs of a virtual or modified environment for review.",
  },
  {
    title: "Configurable proctoring",
    body: "Video, audio, and screen requirements can be set for each contest. Integrity events form part of the session record.",
  },
  {
    title: "Session recovery",
    body: "Recovery flows support interrupted sessions. Discuss device requirements and candidate support before running an assessment.",
  },
];

export const ACCESS_WORDMARK = {
  src: "/brand/access-wordmark.svg",
  alt: "AMS Access",
  caption: "The AMS assessment platform.",
} as const;

export const ACCESS_FIRMS = {
  id: "sponsor",
  eyebrow: "For recruiters and contest partners",
  title: "Get to know the work behind the result.",
  paragraphs: [
    "A contest result is a starting point for a conversation. Derive brings together people interested in probability, markets, and mathematical reasoning. Ascent focuses on algorithms and systems programming.",
    "Talk to AMS about supporting a contest or exploring an assessment for your hiring process. Start with the roles you are hiring for, the skills you want to examine, and the evidence your team needs to make a decision.",
  ],
  image: {
    src: "/images/derive26/full/finalists-meet-the-interviewers.webp",
    alt: "Derive finalists in conversation with interviewers at the IIT Bombay finals",
    caption: "Conversations at the Derive '26 finals · IIT Bombay",
  },
  links: [
    { label: "Review Derive '26", href: "/derive" },
    { label: "See the finals photographs", href: "/gallery" },
    { label: "Meet the AMS team", href: "/team" },
  ],
} as const;

export const ACCESS_CONVERSATION = {
  id: "contact",
  eyebrow: "Start a conversation",
  title: "What would you like to assess?",
  body: "Share your hiring context with the AMS team. These are the questions to work through before choosing an assessment or partnership.",
  topics: [
    {
      title: "Role and problem set",
      body: "Which skills matter for the role, and what would a useful problem set look like?",
    },
    {
      title: "Candidate experience",
      body: "What devices, timing, accessibility needs, and support should the session account for?",
    },
    {
      title: "Results and review",
      body: "What scoring, comparison group, and session records would help your team evaluate the results?",
    },
    {
      title: "Scope and terms",
      body: "What are the timeline, pricing, proctoring requirements, and candidate data handling arrangements?",
    },
  ],
} as const;

export const ACCESS_CTA = {
  title: "Tell us about your hiring needs.",
  body: "Email the AMS team with the roles, approximate candidate count, and timeline you have in mind. You can also get in touch about a contest partnership.",
  buttonLabel: "Email the AMS team",
  buttonHref: "mailto:team@amshq.in?subject=AMS%20assessment%20enquiry",
} as const;

/** Public addresses listed on the official Ascent site. */
export const ACCESS_CONTACTS = [
  { label: "Assessment enquiries", email: "team@amshq.in", href: "mailto:team@amshq.in?subject=AMS%20assessment%20enquiry" },
  { label: "Contest partnerships", email: "partners@amshq.in", href: "mailto:partners@amshq.in?subject=AMS%20contest%20partnership" },
] as const;
