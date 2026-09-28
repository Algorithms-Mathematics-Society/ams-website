export const ACCESS_HERO = {
  eyebrow: "Hiring & partnerships",
  title: "Sponsor Ascent.",
  body: "Ascent brings systems programmers together to compete on C++, optimization, and performance engineering. Partner with AMS on the next edition.",
  image: {
    src: "/images/derive26/full/finalists-meet-the-interviewers.webp",
    alt: "Derive finalists in conversation with interviewers at the IIT Bombay finals",
  },
  photoCaption: "Derive ’26 finals · IIT Bombay",
  primaryLink: { label: "Discuss sponsorship", href: "#contact" },
  secondaryLink: { label: "Explore Ascent", href: "/ascent" },
} as const;

export const ACCESS_FIRMS = {
  id: "sponsor",
  eyebrow: "Contest sponsorship",
  title: "Partner with the next edition.",
  body: "Ascent is our current focus for sponsorship. Derive partnerships cover future editions of our quantitative finance competition.",
  opportunities: [
    {
      name: "Ascent",
      status: "Current sponsorship focus",
      body: "Participants compete on memory use, execution time, and implementation quality. Bring your team’s systems engineering and recruiting interests to an Ascent partnership.",
      link: { label: "Explore Ascent", href: "/ascent" },
    },
    {
      name: "Derive",
      status: "Future editions",
      body: "Derive ’26 brought 33 finalists to IIT Bombay, with Jane Street and QRT as partners. Partner with AMS for a future edition focused on probability, markets, and mathematical reasoning.",
      link: { label: "See Derive ’26", href: "/derive" },
    },
  ],
} as const;

export const ACCESS_CONVERSATION = {
  id: "contact",
  eyebrow: "Become a partner",
  title: "Plan your partnership.",
  body: "Share your firm’s goals, timeline, and proposed involvement. We will define the scope and next steps together. Ascent is the current focus; include Derive in your note if you are planning for a future edition.",
  contact: {
    email: "partners@amshq.in",
    href: "mailto:partners@amshq.in?subject=Ascent%20sponsorship%20enquiry",
  },
  topics: [
    {
      title: "For sponsors",
      body: "Set the scope of your sponsorship: objectives, involvement, and timing.",
    },
    {
      title: "For recruiting teams",
      body: "Tell us which roles and skills your team hires for. We will assess how the contest fits your recruiting goals.",
    },
  ],
} as const;

export const ACCESS_EVALUATION = {
  eyebrow: "Also from AMS",
  title: "Evaluating candidates?",
  body: "AMS Access is our desktop assessment platform for timed problem solving, readiness checks, and configurable proctoring. If you are exploring technical hiring assessments, get in touch to discuss your requirements.",
  link: {
    label: "Discuss an assessment",
    href: "mailto:team@amshq.in?subject=AMS%20assessment%20enquiry",
  },
} as const;
