export const GALLERY_ACTIONS = {
  openPhoto: "Open photo",
  photo: "Photo",
  close: "Close gallery",
  previous: "Previous photo",
  next: "Next photo",
  navigation: "Photo navigation",
} as const;

export interface GalleryItem {
  /** Image alt text. */
  label: string;
  /** 640w thumbnail path under public/. */
  src?: string;
  /** 1600w large view path under public/ (opened from the grid). */
  full?: string;
  /** Explicit placement in the home-page proof spread. */
  homePlacement?: "lead" | "support-top" | "support-bottom";
}

export const GALLERY_PAGE = {
  eyebrow: "Derive '26 archive",
  title: "Inside the Derive '26 finals.",
  body: "IIT Bombay, July 2026. The competition and the people behind it.",
  photoCountLabel: "photographs",
  viewHint: "Select a photograph to view full size.",
  editionLink: { label: "About Derive ’26", href: "/derive" },
  cta: {
    title: "Prepare for the next edition.",
    body: "Review the Derive format, follow the next registration window, or contact AMS about contributing to the event.",
    buttonLabel: "Explore Derive",
    buttonHref: "/derive",
  },
} as const;

/**
 * The compact introduction for the home proof spread. Separate from
 * GALLERY_PAGE because the archive page introduces the complete set.
 */
export const GALLERY_HOME = {
  eyebrow: "From the finals",
  title: "A day at Derive '26.",
  body: "The competitors and conversations behind Derive '26. Photographed at IIT Bombay in July 2026.",
  link: { label: "View the event gallery", href: "/gallery" },
} as const;

const img = (slug: string) => ({
  src: `/images/derive26/thumb/${slug}.webp`,
  full: `/images/derive26/full/${slug}.webp`,
});

export const GALLERY: GalleryItem[] = [
  {
    label: "Participants collecting their Derive contest kits",
    homePlacement: "support-top",
    ...img("goodies-distribution"),
  },
  { label: "Contest notebooks and T-shirts at the registration desk", ...img("swag-desk") },
  { label: "A contestant working through the problem set", ...img("in-the-zone") },
  {
    label: "Debating the problem set between rounds",
    ...img("debating-the-problem-set"),
  },
  {
    label: "Finalists meet the partner interviewers",
    ...img("finalists-meet-the-interviewers"),
  },
  {
    label: "Prize cheques on stage for the winners",
    homePlacement: "support-bottom",
    ...img("prize-cheque-moment"),
  },
  {
    label: "The address before the final round",
    ...img("address-before-the-final-round"),
  },
  {
    label: "Blitz chess huddle at the evening social",
    ...img("blitz-chess-huddle"),
  },
  { label: "The evening social from above", ...img("the-evening-social") },
  { label: "The AMS deck, custom cards in play", ...img("the-ams-deck") },
  {
    label: "Finalists at the Convergence banner",
    ...img("finalists-at-the-convergence-banner"),
  },
  {
    label: "Derive finalists and organizers together at IIT Bombay",
    homePlacement: "lead",
    ...img("the-full-room"),
  },
];
