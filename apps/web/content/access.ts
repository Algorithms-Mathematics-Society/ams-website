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
  eyebrow: "Competition partnerships",
  title: "Partner with AMS.",
  body: "Meet people through the quantitative and systems work they choose to take on. Explore a competition partnership, or discuss a coding assessment for your own candidates.",
  image: {
    src: "/images/derive26/full/finalists-meet-the-interviewers.webp",
    alt: "Derive finalists in conversation with interviewers at the IIT Bombay finals",
  },
  photoCaption: "Derive ’26 finals · IIT Bombay · July 2026",
  primaryLink: { label: "Discuss a partnership", href: "#contact" },
  secondaryLink: { label: "Explore hiring assessments", href: "#assessments" },
} as const;

export const ACCESS_FIRMS = {
  id: "sponsor",
  title: "Which competition fits your team?",
  body: "Explore the formats and participant profiles below. Activities and partner involvement are agreed for each edition.",
  opportunities: [
    {
      name: "Ascent",
      status: "2026 edition · Sponsorship enquiries",
      details: [
        { label: "Who takes part", body: "Systems programmers working in C++, optimization, and performance engineering." },
        { label: "The technical work", body: "Algorithm and implementation choices under execution time and memory constraints." },
        { label: "How it works", body: "An individual qualifier, followed by team implementation and a codebase finale. The final date and Mumbai venue remain tentative." },
      ],
      link: { label: "Explore Ascent", href: "/ascent" },
    },
    {
      name: "Derive",
      status: "Discuss future editions",
      details: [
        { label: "Who took part in 2026", body: "The Derive ’26 rules covered students in technical degree programs in India and recent alumni." },
        { label: "The technical work", body: "Probability, market reasoning, and mathematical problem solving under timed conditions." },
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
  body: "Tell us what you want the partnership to achieve, the skills or audience relevant to your team, and your timeline. A short email is enough to begin.",
  contact: {
    label: "Email the partnerships team",
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
    { title: "Agree the scope", body: "Confirm activities, responsibilities, and commercial terms together before committing." },
  ],
} as const;

export const ACCESS_EVALUATION = {
  eyebrow: "Technical hiring assessments",
  title: "Build the assessment around the work.",
  body: "AMS Access is a coding-assessment platform. Organisers prepare a round, candidates work in a desktop app, and reviewers inspect results. Start with the skills you need to assess and the evidence your reviewers need to make a decision.",
  considerations: [
    { title: "Define the task", body: "Discuss the role, problem format, and criteria you want to assess." },
    { title: "Prepare candidates", body: "Confirm device requirements, setup instructions, and the support needed for the round." },
    { title: "Plan the review", body: "Agree how results and session records will be interpreted alongside the other evidence in your hiring process." },
  ],
  enquiry: "For an assessment enquiry, include your intended format, approximate participant count, and timing. We can work through the setup and review requirements together.",
  link: {
    label: "Discuss an assessment",
    href: "mailto:team@amshq.in?subject=AMS%20assessment%20enquiry",
  },
} as const;

/** Published philosophy and evaluation criteria, not a claim of measured outcomes. */
export const ACCESS_APPROACH = {
  title: "Start with the work you want to understand.",
  body: "A useful partnership gives your team a reason to engage with participants. The problems, the people working on them, and the conversations around that work should be relevant to your objectives.",
  criteria: [
    { title: "Choose the relevant challenge", body: "Probability and market reasoning call for different work from C++ performance engineering. Begin with the skills that matter to your team." },
    { title: "Give the conversation context", body: "Shared problems give participants and firms something specific to discuss. At Derive ’26, finalists met partner interviewers alongside the competition." },
    { title: "Decide what success would mean", body: "Agree the activities and the outcomes you want to review before defining the scope. A contest result is one part of understanding someone’s work." },
  ],
  evidenceLabel: "On the Derive ’26 problems",
  evidenceNote: "Selected participant feedback · June 2026",
  link: { label: "See the Derive ’26 format", href: "/derive" },
} as const;
