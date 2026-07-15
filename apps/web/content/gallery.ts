export interface GalleryItem {
  /** Image alt text. */
  label: string;
  /** 640w thumbnail path under public/. */
  src?: string;
  /** 1600w large view path under public/ (opened from the grid). */
  full?: string;
}

export const GALLERY_PAGE = {
  eyebrow: "Moments from AMS",
  title: "It happened. Here's proof.",
  body: "Twelve moments from Derive '26: the swag desk in the morning, the hall at capacity, the cheques at the end. Shot during Convergence at IIT Bombay, July 2026.",
  cta: {
    title: "Be in the next set.",
    body: "The next edition will fill a hall again. Compete, volunteer, or just be in the room.",
    buttonLabel: "Explore Derive",
    buttonHref: "/derive",
  },
} as const;

/**
 * The home proof gallery's caption rail. Separate from GALLERY_PAGE: the
 * archive page introduces the whole set, this rail sits beside the dome
 * and only has to place the photographs and say how to turn them.
 */
export const GALLERY_DOME = {
  eyebrow: "Moments from AMS",
  title: "It happened. Here's proof.",
  body: "Twelve moments from the Derive '26 finals at IIT Bombay: the swag desk in the morning, the hall at capacity, the cheques at the end.",
  hint: "Drag to look around · click a photo to open it",
  link: { label: "See the full gallery", href: "/gallery" },
} as const;

const img = (slug: string) => ({
  src: `/images/derive26/thumb/${slug}.webp`,
  full: `/images/derive26/full/${slug}.webp`,
});

export const GALLERY: GalleryItem[] = [
  {
    label: "Goodies distribution, contest kits changing hands",
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
    ...img("the-full-room"),
  },
];
