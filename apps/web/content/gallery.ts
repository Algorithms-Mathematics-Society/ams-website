export interface GalleryItem {
  /** Becomes the image alt text once real photos land. */
  label: string;
  /** TODO(content): set to the optimized photo path from the CONVERGENCE shoot. */
  src?: string;
}

export const GALLERY_PAGE = {
  eyebrow: "Moments from AMS",
  title: "It happened. Here's proof.",
  body: "Twelve moments from Derive '26: the registration desk at eight in the morning, the hall at capacity, the trophy at the end. Shot during Convergence at IIT Bombay, July 2026.",
  cta: {
    title: "Be in the next set.",
    body: "The next edition will fill a hall again. Compete, volunteer, or just be in the room.",
    buttonLabel: "Explore Derive",
    buttonHref: "/derive",
  },
} as const;

/** 12 slots: populate from the CONVERGENCE shoot; candids over posed (design note). */
export const GALLERY: GalleryItem[] = [
  { label: "Registration desk, lanyards being handed out" },
  { label: "Opening ceremony, mark on the big screen" },
  { label: "Contestants coding, heads down" },
  { label: "Group discussion between rounds" },
  { label: "Recruiters talking with finalists" },
  { label: "Winner lifting the crystal trophy" },
  { label: "Certificates being signed / stacked" },
  { label: "AMS t-shirts & merch table, swag close-up" },
  { label: "Wide crowd shot, hall full" },
  { label: "Volunteer team huddle" },
  { label: "Prize cheque moment on stage" },
  { label: "Full team photo, end of day" },
];
