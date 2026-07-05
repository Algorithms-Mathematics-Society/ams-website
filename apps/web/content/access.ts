export const ACCESS_HERO = {
  eyebrow: "Access",
  title: "The platform.",
  body: "Proctored assessments benchmarked against India's competitive elite. A 15-stage secure onboarding takes every candidate from sign-in to a locked, monitored exam in a native desktop shell.",
  image: {
    /** Contestant Command Hub mockup from the ams-access home page assets. */
    src: "/images/access-command-hub.png",
    alt: "The Access desktop client's Contestant Command Hub: session code entry, contest list, and a system integrity rail with every check reading SECURE",
    width: 860,
    height: 520,
  },
  photoCaption: "The Access desktop client · Contestant Command Hub",
} as const;

export interface AccessFeature {
  title: string;
  body: string;
}

/** Feature set drawn from the platform repo (access-ams) docs. */
export const ACCESS_FEATURES: AccessFeature[] = [
  {
    title: "A native shell, not a browser tab",
    body: "A desktop app for Windows and Linux. System shortcuts, screenshots, and app switching are locked at the OS level for the length of the session.",
  },
  {
    title: "Seven readiness checks",
    body: "Camera, microphone, network, restricted apps, keyboard lockdown, platform, and VM integrity. Everything green before a candidate can enter.",
  },
  {
    title: "Network, allowlisted",
    body: "Outbound traffic is locked to the contest API for the duration of the exam. No lookups, no side channels.",
  },
  {
    title: "Environment integrity",
    body: "Detects virtual machines, debugger and injection attempts, and restricted apps like screen recorders and remote desktop tools.",
  },
  {
    title: "Proctoring with an audit trail",
    body: "Video, audio, and screen requirements are set per contest, and every integrity event lands in the audit log.",
  },
  {
    title: "Crash-safe by design",
    body: "Sessions resume after a disconnect or crash, and the candidate's machine is always restored to its normal state.",
  },
];

export const ACCESS_WORDMARK = {
  src: "/brand/access-wordmark.svg",
  alt: "AMS Access",
  caption: "The desktop client behind every session.",
} as const;

export const ACCESS_FIRMS = {
  /** Anchor target: the footer's Sponsor link points at /access#sponsor. */
  id: "sponsor",
  eyebrow: "For firms",
  title: "Signal, not resumes.",
  paragraphs: [
    "Every Access assessment runs in the same shell and is scored against the population that competes in Derive and Ascent. When a candidate clears your bar, you know exactly where that bar sits: against 2,500+ of India's competitive best.",
    "Sponsor a contest, run a private benchmarked assessment, or both.",
  ],
} as const;

export const ACCESS_CTA = {
  title: "Run a benchmarked assessment.",
  body: "Bring your own question set or use ours. We run the shell, the proctoring, and the ranklist.",
  buttonLabel: "Talk to us",
  buttonHref: "mailto:tilakj0108@gmail.com?subject=Access%20for%20firms",
} as const;
