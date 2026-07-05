export interface ExperienceItem {
  title: string;
  body: string;
  photoLabel: string;
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: "Industry, in the room",
    body: "Engineers and recruiters from sponsor firms judge finals in person.",
    photoLabel:
      "Photo · recruiter leaning over a finalist's screen, mid-judging",
  },
  {
    title: "Real problems, real debate",
    body: "Problems written by people who trade and build for a living.",
    photoLabel: "Photo · two students at a whiteboard arguing over an approach",
  },
  {
    title: "A room worth being in",
    body: "Finals are staged, hosted, and worth the train ticket.",
    photoLabel: "Photo · audience during keynote, faces lit, listening",
  },
];
