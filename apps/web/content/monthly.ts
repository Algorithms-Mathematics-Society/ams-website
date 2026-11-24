// Copy for AMS Monthly. Problems themselves are Markdown in the repo-root
// `monthly/` folder, added only by the private vault's release workflow.
// Never add a topic, title or hint about an unreleased month to this file.

export const MONTHLY = {
  name: "AMS Monthly",
  /** First drop. Before it, the index states only this date. */
  launchAt: "2027-01-01T18:00:00+05:30",
  dropTimeLabel: "around 18:00 IST",
  closeTimeLabel: "23:59 IST",

  index: {
    kicker: "AMS Monthly",
    title: "One problem, every month.",
    body:
      "AMS Monthly is a free problem set by AMS (Algorithms & Mathematics Society), released on the 1st of every month. " +
      "Months alternate between quantitative reasoning and systems engineering, and each problem has a warm-up and a main part.",
    nextLabel: "Next problem",
    firstLabel: "The first problem is released on",
    currentLabel: "This month",
    openLabel: "Answers close",
    closedLabel: "Closed",
    viewLabel: "Read the problem",
    solutionLabel: "Read the solution",
    howTitle: "How it works",
    how: [
      "A new problem is released on the 1st of each month, around 18:00 IST.",
      "Answer the warm-up, the main problem, or both. Each counts on its own.",
      "Your first submission is the one that counts. Answers are checked after the deadline, with no instant feedback.",
      "The solution is published with the next problem, with the names of correct solvers who chose to be listed.",
      "Solvers are listed by correctness, never by speed.",
    ],
    contributeLabel: "Write up your solution",
    contributeHref: "/blog/contribute",
    archiveTitle: "Archive",
    solvedByLabel: "listed solves across both parts",
  },

  problem: {
    backLabel: "All problems",
    releasedLabel: "Released",
    closesLabel: "Answers close",
    closedLabel: "Closed",
    tiers: { warmup: "Warm-up", main: "Main" },
    answerFormatLabel: "Answer format",
    submitLabel: {
      warmup: "Submit a warm-up answer",
      main: "Submit a main answer",
    },
    formNote:
      "Answers are collected with a Google Form. Sign in with a Google account; one submission per person per part counts.",
    rules:
      "Your first submission counts. Solvers are listed by correctness, never by speed.",
    closedNote: "Answers for this problem are closed.",
    solutionLink: "Read the solution",
    solutionPending: "The solution is published with the next problem.",
    nextLink: "See when the next problem is released",
  },

  solution: {
    kicker: "Solution",
    answerLabel: "Answer",
    solversTitle: "Correct solvers",
    solversNote: "Listed with their consent, in alphabetical order.",
    solversPending: "The solver list for this problem is being prepared.",
    solversNone: "No correct solvers chose to be listed for this part.",
    editorialLabel: "Read the featured write-up",
    problemLink: "Back to the problem",
    columns: {
      name: "Name",
      institution: "Institution",
      year: "Graduation year",
    },
  },

  blogNotice: {
    open: "is open.",
    closes: "Answers close",
    link: "Read the problem",
  },
} as const;

export type MonthlyCopy = typeof MONTHLY;
