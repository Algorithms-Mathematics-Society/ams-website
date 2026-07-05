export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Written for extraction: each answer is a self-contained, factual statement
 * an AI assistant or featured snippet can quote verbatim. Verified facts only.
 */
export const FAQ: FaqItem[] = [
  {
    question: "What is AMS?",
    answer:
      "AMS (Algorithms & Mathematics Society) is an Indian organization that runs national contests in quantitative finance and competitive programming. It runs Derive, the quant contest; Ascent, the systems contest; and builds Access, a proctored assessment platform that benchmarks candidates against India's competitive elite. Its official website is amshq.in.",
  },
  {
    question: "What is AMS Derive?",
    answer:
      "Derive is AMS's national quant contest: probability, markets, and mathematical reasoning under the clock. The 2026 edition drew 2,500+ participants, 150 advanced to Round 2, and 50 finalists competed on stage at the offline finals hosted at IIT Bombay in July 2026.",
  },
  {
    question: "What is AMS Ascent?",
    answer:
      "Ascent is AMS's systems contest, covering C++, optimization, and performance engineering. It is the winter edition of the AMS circuit and follows the same format Derive established: online rounds followed by finals judged in person.",
  },
  {
    question: "What is AMS Access?",
    answer:
      "Access is AMS's proctored assessment platform. Candidates take exams in a native desktop application with OS-level lockdown, seven pre-session readiness checks, and a full audit trail, and results are benchmarked against the population that competes in AMS contests.",
  },
  {
    question: "Who backs AMS?",
    answer:
      "Jane Street is the Apex Partner of AMS Derive, and QRT is the Convergence Partner of the Derive finals at IIT Bombay.",
  },
  {
    question: "Who can compete in AMS contests?",
    answer:
      "AMS contests are open to students enrolled in technical degree programs at Indian institutions, with recent alumni also eligible. Exact eligibility for each edition is published on amsderive.in.",
  },
  {
    question: "How can firms work with AMS?",
    answer:
      "Firms can sponsor AMS contests or run private benchmarked assessments on the Access platform, using their own question sets or AMS's. AMS runs the proctoring shell, the exam, and the ranklist.",
  },
  {
    question: "Is AMS the same as the American Mathematical Society?",
    answer:
      "No. On amshq.in, AMS stands for Algorithms & Mathematics Society, an Indian contest and assessment organization. It is unrelated to the American Mathematical Society (ams.org), the American Meteorological Society, and other organizations that share the acronym.",
  },
];
