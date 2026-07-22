export const ASCENT_HERO = {
  eyebrow: "Ascent",
  title: "The systems contest.",
  body: "C++, optimization, and performance engineering under the clock. The winter edition of the AMS circuit, built for the people who care how fast it actually runs.",
  statusLabel: "Competition status",
  status: "Winter edition",
  statusDetail: "Dates announced soon",
  focusLabel: "Assessment disciplines",
  focusAreas: ["C++", "Optimization", "Performance engineering"],
} as const;

export interface AscentPillar {
  title: string;
  body: string;
}

/** The three disciplines Ascent measures. */
export const ASCENT_PILLARS: AscentPillar[] = [
  {
    title: "C++ under constraints",
    body: "Modern C++, written against tight memory and time limits. The language of the systems that run markets.",
  },
  {
    title: "Optimization",
    body: "Algorithmic efficiency where the difference between passing and failing is a constant factor.",
  },
  {
    title: "Performance engineering",
    body: "Cache behavior, allocation, throughput. Code that is measured, not admired.",
  },
];

export const ASCENT_STANDARD = {
  eyebrow: "One standard",
  title: "The same road Derive built.",
  body: "Online rounds to earn a seat, then finals judged in person with the sponsor firms in the room. Derive '26 set the template: 2,500+ entered, 33 stood on stage at IIT Bombay.",
  linkLabel: "See how Derive ran",
  linkHref: "/derive",
} as const;

export const ASCENT_CTA = {
  title: "Ascent arrives this winter.",
  body: "Registration is not open yet. Leave your email and be first in when it is.",
  buttonLabel: "Get notified",
  /** TODO(launch): point at the registration/interest form when live. */
  buttonHref:
    "mailto:tilakj0108@gmail.com?subject=Ascent%20registration%20updates",
} as const;
