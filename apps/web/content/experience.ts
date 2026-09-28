export interface OperatingStage {
  index: string;
  title: string;
  body: string;
}

export const EXPERIENCE = {
  eyebrow: "How Derive '26 worked",
  title: "From the first round to the final room.",
  image: {
    src: "/images/derive26/thumb/the-hall-at-capacity.webp",
    alt: "Contestants working in a full lecture hall during the Derive finals at IIT Bombay",
    caption: "Derive '26 finals · IIT Bombay · July 2026",
  },
  stages: [
    {
      index: "01",
      title: "Online qualifying rounds",
      body: "Participants from across India tackled the same timed problems in the opening rounds.",
    },
    {
      index: "02",
      title: "A place in the finals",
      body: "Fifty participants qualified for the finals, and 33 competed in person at IIT Bombay.",
    },
    {
      index: "03",
      title: "Meet the people behind the work",
      body: "Finalists solved problems in person and met engineers and recruiters from partner firms.",
    },
    {
      index: "04",
      title: "Continue the conversation",
      body: "Firms can discuss sponsorship, candidate engagement, and private assessments through Access.",
    },
  ] satisfies readonly OperatingStage[],
} as const;
