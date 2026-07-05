export interface Testimonial {
  name: string;
  detail: string;
  quote: string;
}

/**
 * TODO(launch): real names with written consent only — a real face + real
 * college beats any adjective (design note). Quotes from post-event feedback.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Finalist name",
    detail: "College, batch",
    quote:
      "Quote about the difficulty and fairness of the problems — pull from post-event feedback form.",
  },
  {
    name: "Finalist name",
    detail: "College, batch",
    quote:
      "Quote about meeting recruiters / what the finals felt like in person.",
  },
  {
    name: "Participant name",
    detail: "College, batch",
    quote: "Quote about the monthly challenge or Access experience.",
  },
];
