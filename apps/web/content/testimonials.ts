export interface Testimonial {
  name: string;
  detail: string;
  quote: string;
  /** The most specific account, placed first in the home-page record. */
  featured?: boolean;
}

export const TESTIMONIALS_SECTION = {
  eyebrow: "Participant feedback",
  title: "In the competitors' words.",
  note: "Selected participant feedback · Derive ’26 · June 2026",
  editingNote: "Quotes shortened and lightly edited.",
} as const;

/**
 * Quotes were checked against the supplied June 2026 response workbook; its review
 * field said the review would be used on the website. These responses predate
 * the July finals. Source worksheet rows: Prabhu 39, Shane 29, Abhishek 31.
 * Lightly edited for
 * grammar and length only; no claim was added that the participant did not
 * make.
 *
 * Names came from Tilak, who knows these competitors; the form collected
 * addresses, not names. Reading a name off an address does not work: this
 * list had "Shane Christian" wrong until he corrected it, so any name added
 * here comes from him, never from an address.
 *
 * No faces here by decision. Do not invent portraits or add photographs
 * without explicit permission from each participant.
 *
 * The form did not capture colleges. Do not add affiliations unless they are
 * verified directly; `detail` states only what the form proves.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Prabhu Dutta",
    detail: "Derive '26 participant",
    quote:
      "AMS Derive was just the right kind of challenge that was missing in the competitive programming scene.",
  },
  {
    name: "Shane Christian",
    detail: "Derive '26 participant",
    featured: true,
    quote:
      "A well-designed contest: the problems are a mixture of probability, game theory, ad hoc problems, mathematics and quant. The style of the problem statements is unique.",
  },
  {
    name: "Abhishek Yasraj",
    detail: "Derive '26 participant",
    quote:
      "Just right for those who love the mathematics part of programming and want to avoid other implementation work.",
  },
];
