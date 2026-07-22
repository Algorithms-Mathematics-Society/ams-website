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
  title: "Documentary record of the first edition.",
  body: "Twelve moments from Derive '26: the swag desk in the morning, the hall at capacity, the cheques at the end. Shot during Convergence at IIT Bombay, July 2026.",
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
  eyebrow: "Documentary record",
  title: "Derive '26, on record",
  body: "Selected photographs from Derive '26 at IIT Bombay: contest kits, the finals hall, and prize cheques presented on stage.",
  link: { label: "View the Derive '26 archive", href: "/gallery" },
} as const;

const img = (slug: string) => ({
  src: `/images/derive26/thumb/${slug}.webp`,
  full: `/images/derive26/full/${slug}.webp`,
});

export const GALLERY: GalleryItem[] = [
  {
    label: "Goodies distribution, contest kits changing hands",
    homePlacement: "support-top",
    ...img("goodies-distribution"),
  },
  { label: "The swag desk, notebooks and formula tees", ...img("swag-desk") },
  { label: "A contestant deep in the problem set", ...img("in-the-zone") },
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
    label: "The full room, everyone who made it happen",
    homePlacement: "lead",
    ...img("the-full-room"),
  },
];
