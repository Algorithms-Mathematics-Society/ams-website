export const ACCESS_HERO = {
  eyebrow: "Hiring & partnerships",
  title: "Sponsor Ascent.",
  body: "We are looking for partners for Ascent, our competition in C++, optimization, and performance engineering. Help support the contest and get to know the people taking part.",
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
  title: "Where your support can help.",
  body: "Ascent is our current sponsorship priority. We are also open to conversations about future editions of Derive, our quantitative finance competition.",
  opportunities: [
    {
      name: "Ascent",
      status: "Current sponsorship focus",
      body: "Participants work through problems where memory use, execution time, and implementation choices matter. Talk with us about supporting the contest and how your team could take part.",
      link: { label: "Explore Ascent", href: "/ascent" },
    },
    {
      name: "Derive",
      status: "Future editions",
      body: "Derive ’26 concluded with an in-person final at IIT Bombay, supported by Jane Street and QRT. We welcome conversations about supporting the next edition.",
      link: { label: "See Derive ’26", href: "/derive" },
    },
  ],
} as const;

export const ACCESS_CONVERSATION = {
  id: "contact",
  eyebrow: "Become a partner",
  title: "Let’s talk about Ascent.",
  body: "Email the AMS team to discuss sponsorship. Tell us about your organisation, your timeline, and how you would like to be involved. Interested in the next Derive? Mention that in your note.",
  contact: {
    email: "partners@amshq.in",
    href: "mailto:partners@amshq.in?subject=Ascent%20sponsorship%20enquiry",
  },
  topics: [
    {
      title: "For sponsors",
      body: "We can discuss the support you have in mind, the scope of your involvement, and how it fits the contest.",
    },
    {
      title: "For recruiting teams",
      body: "If hiring is part of your interest, tell us which roles and skills matter to your team. We can discuss whether the contest is a good fit.",
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
