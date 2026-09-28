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
  note: "Selected responses from the Derive '26 post-event feedback form.",
} as const;

/**
 * Quotes are real, from the Derive '26 post-event feedback form, whose own
 * field said the review would be used on the website. Lightly edited for
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
      "A really well designed contest: the problems are a mixture of probability, game theory, ad hoc, math and quant. The style is unique, mainly in how the problem statements are designed.",
  },
  {
    name: "Abhishek Yasraj",
    detail: "Derive '26 participant",
    quote:
      "Just right for those who love the mathematics part of programming and want to avoid the implementation-heavy stuff. A crazy platform for math lovers.",
  },
];
