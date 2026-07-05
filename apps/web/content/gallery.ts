export interface GalleryItem {
  /** Becomes the image alt text once real photos land. */
  label: string;
  /** TODO(content): set to the optimized photo path from the CONVERGENCE shoot. */
  src?: string;
}

/** 12 slots — populate from the CONVERGENCE shoot; candids over posed (design note). */
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
