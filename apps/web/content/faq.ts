export const FAQ_PAGE = {
  eyebrow: "FAQ",
  title: "About the contests and working with AMS.",
  body: "Answers for participants, recruiters, and potential partners.",
} as const;

export interface FaqItem {
  question: string;
  answer: string;
}

/** Answers describe the organization, the recorded edition, and ways to take part. */
export const FAQ: FaqItem[] = [
  {
    question: "What is AMS?",
    answer:
      "AMS stands for Algorithms & Mathematics Society. It is an Indian organization that runs Derive, a quantitative reasoning contest, and Ascent, a systems engineering contest. AMS also builds Access, a desktop platform for proctored assessments.",
  },
  {
    question: "What is AMS Derive?",
    answer:
      "Derive is AMS's national contest in probability, markets, and mathematical reasoning. In 2026, 2,500+ participants entered, 150 advanced to Round 2, and 50 qualified for the finals. Thirty-three competed in person at IIT Bombay in July 2026.",
  },
  {
    question: "What is AMS Ascent?",
    answer:
      "Ascent is AMS's systems engineering contest, covering C++, optimization, and performance engineering. It begins with an individual qualifier, followed by team-based rounds and a planned in-person finale. The Ascent page has schedule and registration details.",
  },
  {
    question: "What is AMS Access?",
    answer:
      "Access is AMS's desktop platform for proctored assessments. It combines timed problem solving with session checks and records that hiring teams can review alongside interviews. Contact AMS to discuss the assessment format, available features, and any benchmarking requirements.",
  },
  {
    question: "Who supported Derive '26?",
    answer:
      "Jane Street was the Apex Partner of Derive '26. QRT was the Convergence Partner of its finals at IIT Bombay. These partnerships relate to the 2026 edition of Derive.",
  },
  {
    question: "Who can compete in AMS contests?",
    answer:
      "Eligibility depends on the contest and edition. Check the current registration page and rules before entering. The Derive and Ascent pages explain the formats and point to the relevant next steps.",
  },
  {
    question: "How can firms work with AMS?",
    answer:
      "Firms can discuss contest sponsorship, meeting competitors, or private assessments through Access. Contact AMS with your hiring or partnership goals to agree on the format, scope, and next steps.",
  },
  {
    question: "Is AMS the same as the American Mathematical Society?",
    answer:
      "No. On amshq.in, AMS stands for Algorithms & Mathematics Society, an Indian contest and assessment organization. It is unrelated to the American Mathematical Society (ams.org), the American Meteorological Society, and other organizations that share the acronym.",
  },
];
