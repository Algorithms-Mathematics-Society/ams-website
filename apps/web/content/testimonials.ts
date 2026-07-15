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
 * Names are Tilak's, read off the addresses that submitted each review (the
 * form collected addresses, not names). He should eyeball them before launch:
 * a handle is not a signature.
 *
 * TODO(launch): colleges and faces. The form captured neither, so `detail`
 * says only what the form itself proves: they competed in Derive '26. The
 * section heading promises colleges, so either they arrive or the heading
 * changes. Faces need a yes from each of the three.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Prabhu Dutta",
    detail: "Derive '26 participant",
    quote:
      "AMS Derive was just the right kind of challenge that was missing in the competitive programming scene.",
  },
  {
    name: "Christian Janet",
    detail: "Derive '26 participant",
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
