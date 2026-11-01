export interface OperatingStage {
  index: string;
  title: string;
  body: string;
}

export const EXPERIENCE = {
  eyebrow: "Derive '26",
  title: "From online rounds to IIT Bombay",
  stages: [
    {
      index: "01",
      title: "Online qualifying rounds",
      body: "Two online rounds tested probability, markets, and mathematical reasoning. The top 150 participants advanced to the second round.",
    },
    {
      index: "02",
      title: "The in-person finals",
      body: "Fifty participants qualified for the finals, and 33 competed in person at IIT Bombay.",
    },
    {
      index: "03",
      title: "Meeting partner firms",
      body: "Finalists met engineers and recruiters from partner firms alongside the in-person competition.",
    },
  ] satisfies readonly OperatingStage[],
} as const;
