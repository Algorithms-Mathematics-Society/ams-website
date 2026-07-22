export interface InstitutionalMandateItem {
  number: string;
  title: string;
  body: string;
}

export const INSTITUTIONAL_OVERVIEW = {
  eyebrow: "Institutional mandate",
  title: "Performance, measured under one standard.",
  definition:
    "AMS (Algorithms & Mathematics Society) is an Indian contest and assessment organization. It runs national contests in quantitative finance and competitive programming, then carries that performance standard into benchmarked assessments through Access.",
  mandate: [
    {
      number: "01",
      title: "Measure two disciplines",
      body: "Derive measures quantitative reasoning. Ascent measures systems and performance engineering.",
    },
    {
      number: "02",
      title: "Select through competition",
      body: "Online rounds establish the field before the strongest performers advance to in-person finals.",
    },
    {
      number: "03",
      title: "Turn performance into signal",
      body: "Access lets firms run secure assessments benchmarked against AMS contest populations.",
    },
  ] satisfies readonly InstitutionalMandateItem[],
} as const;
