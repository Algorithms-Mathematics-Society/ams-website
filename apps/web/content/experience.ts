export interface ExperienceItem {
  title: string;
  body: string;
  photo: { src: string; alt: string };
}

/** Block 06: three cards answering a would-be finalist's three anxieties
    (is it worth it, is it real, will the right people see me). */
export const EXPERIENCE: ExperienceItem[] = [
  {
    title: "Industry, in the room",
    body: "Engineers and recruiters from sponsor firms judge finals in person.",
    photo: {
      src: "/images/derive26/thumb/finalists-meet-the-interviewers.webp",
      alt: "Finalists meeting the partner firm interviewers at Derive '26",
    },
  },
  {
    title: "Real problems, real debate",
    body: "Problems written by people who trade and build for a living.",
    photo: {
      src: "/images/derive26/thumb/debating-the-problem-set.webp",
      alt: "Contestants debating the problem set between rounds",
    },
  },
  {
    title: "A room worth being in",
    body: "Finals are staged, hosted, and worth the train ticket.",
    photo: {
      src: "/images/derive26/thumb/address-before-the-final-round.webp",
      alt: "The hall listening to the address before the final round",
    },
  },
];
