// Copy for /blog/contribute. The pitch form URL is set once the Google Form
// exists (phase 2); until then the page states when pitches open.

export const CONTRIBUTE = {
  metaTitle: "Write for AMS",
  metaDescription:
    "How to write for the AMS blog: what we publish, the 2-minute defence, our AI policy, and how quickly you hear back.",
  kicker: "Blog",
  title: "Write for AMS.",
  body:
    "Solve the monthly problem, explain a result well, or write up something you built and measured. " +
    "We publish 2 to 4 pieces a month, and each one is checked before it goes up.",

  status: {
    /** Set to the Google Form link once it exists. */
    formUrl: null as string | null,
    open: false,
    openLine: "Pitches are open.",
    closedLine:
      "Pitches open with the first AMS Monthly problem on 1 January 2027.",
    actionLabel: "Pitch a post",
    formNote:
      "The form is hosted by Google. You do not need a Google account to pitch.",
  },

  ways: {
    title: "Three ways in",
    items: [
      {
        title: "Solve the monthly problem",
        body: "Answer the warm-up or the main problem. The best explained solutions become the published editorial, under your name.",
        href: "/monthly",
        linkLabel: "See AMS Monthly",
      },
      {
        title: "Pitch a post",
        body: "Explain a classic result, write notes on a public paper, or describe something you built and measured. Send a short pitch first.",
      },
      {
        title: "Send your draft",
        body: "Only after we accept your pitch. We will tell you how to send it and your 2-minute defence.",
      },
    ],
  },

  bar: {
    title: "What we look for",
    items: [
      "Correct",
      "Non-obvious",
      "Clear",
      "Quant or systems",
      "Still useful in a year",
    ],
  },

  defence: {
    title: "The 2-minute defence",
    body:
      "Talk us through your key idea in 2 to 4 minutes. Audio only is fine, a WhatsApp voice note is fine, and no script is needed. " +
      "Only reviewers hear it unless you choose otherwise. It shows the thinking is yours, which is what makes your byline worth something.",
    promptsTitle: "If you are not sure what to say",
    prompts: [
      "What is the key idea?",
      "Where did you get stuck?",
      "What would you try next?",
    ],
    linkTitle: "How to share it",
    linkSteps: [
      "Paste a link, not a file. Writing: a Google Doc, Markdown or PDF. Defence: any audio or video, on Drive or unlisted YouTube.",
      "In Drive, choose Share, set General access to “Anyone with the link · Viewer”, then copy the link.",
      "Open the link in a private or incognito window. If you see “Request access”, we will too.",
      "WhatsApp voice note: long-press the note, choose Share, save it to Drive, then share that file the same way.",
    ],
  },

  ai: {
    title: "Using AI",
    lead: "Use AI like a calculator, not a ghostwriter.",
    body:
      "It may help you edit, check and debug. The reasoning must be yours, and you must be able to defend it out loud. " +
      "Every post shows how AI was used. Honesty here never counts against you; the defence is what we check.",
    levels: [
      { label: "None", note: "" },
      { label: "Editing", note: "grammar, clarity, formatting" },
      {
        label: "Drafting help",
        note: "outlining, checking steps, debugging code",
      },
      {
        label: "Substantial generation",
        note: "AI wrote most of the text or reasoning; not published as a community post",
      },
    ],
  },

  next: {
    title: "What happens next",
    items: [
      "A decision on your pitch within 10 days",
      "A review of your draft within 14 days",
      "One round of revisions",
      "Published within 30 days of acceptance",
    ],
  },

  example: {
    title: "The bar, in one post",
    body:
      "Our Derive walkthrough shows what we look for: a real problem, a model stated before it is used, a derivation a reader can check, and code tested against the examples.",
    linkLabel: "Read the example",
    href: "/blog/expected-value-vs-most-likely-outcome",
  },

  privacy: {
    title: "Nothing is rejected in public",
    body:
      "Every submission gets a private reply with at least two specific notes. Unpublished work is never listed anywhere. " +
      "To change or withdraw anything you sent, email team@amshq.in.",
    email: "team@amshq.in",
  },
} as const;
