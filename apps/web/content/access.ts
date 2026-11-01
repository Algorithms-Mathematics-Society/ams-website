interface PartnershipLink {
  label: string;
  href: string;
}

interface PartnershipDetail {
  label: string;
  body: string;
}

interface PartnershipOpportunity {
  name: string;
  status: string;
  details: readonly PartnershipDetail[];
  link: PartnershipLink;
}

export const ACCESS_HERO = {
  eyebrow: "Hiring & partnerships",
  title: "Partner with AMS.",
  body: "AMS runs competitions in quantitative reasoning and systems engineering. Support a contest, meet its participants, or discuss a technical assessment for your hiring process.",
  image: {
    src: "/images/derive26/full/finalists-meet-the-interviewers.webp",
    alt: "Derive finalists in conversation with interviewers at the IIT Bombay finals",
  },
  photoCaption: "Derive ’26 finals · IIT Bombay · July 2026",
  primaryLink: { label: "Explore sponsorship", href: "#sponsor" },
  secondaryLink: { label: "For recruiting teams", href: "#contact" },
  note: "Ascent is our current sponsorship focus.",
} as const;

export const ACCESS_FIRMS = {
  id: "sponsor",
  eyebrow: "The competitions",
  title: "Find the right fit for your team.",
  body: "Two contests, with different technical demands. Sponsorship and participant involvement are scoped with each partner.",
  opportunities: [
    {
      name: "Ascent",
      status: "Current sponsorship focus",
      details: [
        { label: "Who takes part", body: "Systems programmers working in C++, optimization, and performance engineering." },
        { label: "What the work shows", body: "Algorithm and implementation choices under execution time and memory constraints." },
        { label: "How it works", body: "An individual online qualifier, followed by team optimization rounds and a planned in-person finale in Mumbai." },
      ],
      link: { label: "Explore Ascent", href: "/ascent" },
    },
    {
      name: "Derive",
      status: "Discuss future editions",
      details: [
        { label: "Who took part in 2026", body: "The Derive ’26 rules covered students in technical degree programs in India and recent alumni." },
        { label: "What the work shows", body: "Probability, market reasoning, and mathematical problem solving under timed conditions." },
        { label: "How the 2026 edition worked", body: "Two online rounds led to an in-person final at IIT Bombay. Future edition details will be confirmed separately." },
      ],
      link: { label: "See Derive ’26", href: "/derive" },
    },
  ] satisfies readonly PartnershipOpportunity[],
  evidence: {
    label: "From Derive ’26",
    title: "33 finalists competed at IIT Bombay.",
    body: "Jane Street was the Apex Partner. QRT was the Convergence Partner of the finals. These partnerships relate to the 2026 edition of Derive.",
    link: { label: "View the 2026 partners", href: "/derive#partners" },
  },
} as const;

export const ACCESS_CONVERSATION = {
  id: "contact",
  eyebrow: "Start a conversation",
  title: "Tell us what your team needs.",
  body: "Email partners@amshq.in with your firm, timeline, and the competition or skills you are interested in.",
  contact: {
    email: "partners@amshq.in",
    href: "mailto:partners@amshq.in?subject=AMS%20partnership%20enquiry",
  },
  topics: [
    {
      title: "For sponsors",
      body: "Discuss support for Ascent or a future Derive edition, including your objectives and how your team would like to take part.",
    },
    {
      title: "For recruiting teams",
      body: "Share the roles and skills you hire for. We can discuss the contest’s relevance and opportunities to meet participants.",
    },
  ],
  nextStepsTitle: "What happens next",
  nextSteps: [
    { title: "Review the fit", body: "Discuss your goals alongside the contest format and participant profile." },
    { title: "Define the involvement", body: "Work through the activities, timing, and responsibilities for your team and AMS." },
    { title: "Agree the next steps", body: "Confirm the partnership scope together before making commitments." },
  ],
} as const;

export const ACCESS_EVALUATION = {
  eyebrow: "Technical hiring assessments",
  title: "Have a separate hiring process?",
  body: "AMS Access is our desktop assessment platform for timed problem solving, readiness checks, and configurable proctoring. Discuss the skills you need to assess, the format, and the features available for your process.",
  link: {
    label: "Discuss an assessment",
    href: "mailto:team@amshq.in?subject=AMS%20assessment%20enquiry",
  },
} as const;
