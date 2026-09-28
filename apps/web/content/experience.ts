export interface OperatingStage {
  index: string;
  title: string;
  body: string;
}

export const EXPERIENCE = {
  eyebrow: "How the contests work",
  title: "From the first round to the final room.",
  image: {
    src: "/images/derive26/thumb/the-hall-at-capacity.webp",
    alt: "Contestants working in a full lecture hall during the Derive finals at IIT Bombay",
    caption: "Derive '26 finals · IIT Bombay · July 2026",
  },
  stages: [
    {
      index: "01",
      title: "Start online",
      body: "Participants from across India tackle the same timed problems in the opening rounds.",
    },
    {
      index: "02",
      title: "Earn a place in the finals",
      body: "Results determine who advances. Qualifying competitors come together for the in-person finals.",
    },
    {
      index: "03",
      title: "Meet the people behind the work",
      body: "Finalists solve problems in person and meet engineers and recruiters from partner firms.",
    },
    {
      index: "04",
      title: "Continue the conversation",
      body: "Firms can discuss sponsorship, candidate engagement, and private assessments through Access.",
    },
  ] satisfies readonly OperatingStage[],
} as const;
