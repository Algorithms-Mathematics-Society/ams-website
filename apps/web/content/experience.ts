export interface OperatingStage {
  index: string;
  title: string;
  body: string;
}

export const EXPERIENCE = {
  eyebrow: "Operating model",
  title: "A contest system built to produce signal.",
  image: {
    src: "/images/derive26/thumb/the-hall-at-capacity.webp",
    alt: "Contestants working in a full lecture hall during the Derive finals at IIT Bombay",
    caption: "Derive '26 finals · IIT Bombay · July 2026",
  },
  stages: [
    {
      index: "01",
      title: "Establish the field",
      body: "Online rounds create a national field and establish a common performance standard.",
    },
    {
      index: "02",
      title: "Select for the finals",
      body: "Successive rounds narrow the field before finalists compete in person.",
    },
    {
      index: "03",
      title: "Evaluate in the room",
      body: "Engineers and recruiters from sponsor firms judge the finals in person.",
    },
    {
      index: "04",
      title: "Carry the standard forward",
      body: "Access brings the same benchmark into secure, proctored assessments for firms.",
    },
  ] satisfies readonly OperatingStage[],
} as const;
