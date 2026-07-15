export interface Testimonial {
  name: string;
  detail: string;
  quote: string;
}

/**
 * Quotes are real, from the Derive '26 post-event feedback form, whose own
 * field said the review would be used on the website. Lightly edited for
 * grammar and length only; no claim was added that the participant did not
 * make.
 *
 * TODO(launch): names and colleges. The form collected email addresses, not
 * names, and consent to publish a review is not consent to publish someone's
 * name, college, or face: each of the three has to be asked. Attributing them
 * by looking their emails up in the contest ranklist is not an option; that is
 * candidate data this site does not touch. Until Tilak confirms all three, the
 * section stays gated ("Real names. Real colleges." is its heading).
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Finalist name",
    detail: "College, batch",
    quote:
      "AMS Derive was just the right kind of challenge that was missing in the competitive programming scene.",
  },
  {
    name: "Finalist name",
    detail: "College, batch",
    quote:
      "A really well designed contest: the problems are a mixture of probability, game theory, ad hoc, math and quant. The style is unique, mainly in how the problem statements are designed.",
  },
  {
    name: "Participant name",
    detail: "College, batch",
    quote:
      "Just right for those who love the mathematics part of programming and want to avoid the implementation-heavy stuff. A crazy platform for math lovers.",
  },
];
