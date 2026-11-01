/** Schedule reviewed 1 November 2026; rescheduled qualifier completion confirmed by AMS organizer. */
export const ASCENT_HERO = {
  eyebrow: "Ascent · 2026",
  title: "The C++ performance competition.",
  body: "Test your C++ knowledge, debug unfamiliar code, and work on implementations where performance matters.",
  statusLabel: "2026 edition",
  status: "Registration closed",
  statusDetail: "Existing applicants can check their entry decision on the competition site.",
  focusLabel: "At a glance",
  focusAreas: ["C++20", "Free entry", "Individual qualifier, then team rounds"],
  secondaryAction: { label: "See the rounds", href: "#ascent-format" },
} as const;

export const ASCENT_PILLARS_HEADING = "What you will work on";
export const ASCENT_PILLARS = [
  { title: "C++ and correctness", body: "Reason about object lifetimes, memory, and library behaviour. Identify bugs and understand what a program will do." },
  { title: "Implementation", body: "Work with a team to develop solutions within a time limit. Detailed topics for the later rounds are still to be announced." },
  { title: "Profiling and tools", body: "The final-round outline covers live C++ work with build systems, profilers, and debuggers." },
] as const;
export const ASCENT_SYLLABUS = { label: "Read the official syllabus", href: "https://ascent.amshq.in/syllabus" } as const;

export const ASCENT_STANDARD = {
  title: "Three rounds",
  body: "The qualifier is individual. Competitors who advance move into team implementation, then a codebase finale.",
  note: "The rescheduled qualifier was held on 1 November 2026, confirmed by the AMS team. Later-round dates follow the published schedule; the final date and Mumbai venue remain tentative.",
  scoring: "Qualifier ranking considers correct answers and submission speed. From Round 2, valid solutions are ranked by improvement over a common performance baseline.",
  linkLabel: "Check the official schedule",
  linkHref: "https://ascent.amshq.in/#timeline",
  rounds: [
    { number: "01", title: "Online qualifier", date: "1 November 2026 · Rescheduled round held", setting: "Individual · AMS Access", body: "The qualifier covers C++ proficiency, puzzles, and debugging. After disruption to the 24 October attempt, the rescheduled round was held on 1 November." },
    { number: "02", title: "Team implementation", date: "6 December 2026", setting: "Teams · Partner campuses to be announced", body: "Implement and optimize solutions under shared constraints." },
    { number: "03", title: "Codebase finale", date: "20 December 2026 · Tentative", setting: "On site · Mumbai, tentative", body: "Work on a real codebase while preserving its required behaviour." },
  ],
} as const;

export const ASCENT_REGISTRATION = {
  title: "Participation details",
  facts: [
    { label: "Who the edition is for", detail: "Candidates in India and the Asia-Pacific region. The published eligibility policy limits places outside India to 100." },
    { label: "Entry routes", detail: "Listed campuses have a direct route to Round 1. Applicants from other institutions go through profile review. Review and waitlist decisions do not confirm a place." },
    { label: "Registration status", detail: "Applications for 2026 are closed. If you applied, check your decision on the official site." },
    { label: "Rules and preparation", detail: "Use the official syllabus and entrant instructions for your round. Check requirements before making travel or preparation plans." },
  ],
  links: [
    { label: "Eligibility policy", href: "https://ascent.amshq.in/eligibility" },
    { label: "Competition questions", href: "https://ascent.amshq.in/#faq" },
  ],
} as const;

export const ASCENT_CTA = {
  title: "Already applied?",
  body: "View your entry decision on the Ascent site. For questions about your application, contact the competition team.",
  buttonLabel: "Check entry status",
  buttonHref: "https://ascent.amshq.in/register/status",
  support: { label: "Email the competition team", href: "mailto:team@amshq.in" },
} as const;
