export const GALLERY_ACTIONS = {
  context: "Derive ’26 · IIT Bombay · July 2026",
  openPhoto: "Open photo",
  photo: "Photo",
  close: "Close gallery",
  previous: "Previous photo",
  next: "Next photo",
  navigation: "Photo navigation",
  thumbnails: "Choose a photograph",
  hint: "Swipe or use arrow keys to browse. Esc closes.",
  loading: "Loading photograph",
  unavailable: "The full-size photo could not load. Showing the preview.",
  original: "Open image file",
} as const;

export interface GalleryItem {
  /** Image alt text. */
  label: string;
  category?: "competition" | "conversations" | "around";
  /** 640w thumbnail path under public/. */
  src?: string;
  /** 1600w source for featured frames and the full-size viewer. */
  full?: string;
  /** Explicit placement in the home-page proof spread. */
  homePlacement?: "lead" | "support-top" | "support-bottom";
}

export const GALLERY_PAGE = {
  eyebrow: "Derive '26 archive",
  title: "Inside the Derive '26 finals.",
  body: "IIT Bombay, July 2026. The competition and the people behind it.",
  filtersLabel: "Browse photographs",
  all: "All photographs",
  collectionLabel: "Derive ’26 photographs",
  photoCountLabel: "photographs",
  viewHint: "Select a photograph to view full size.",
  editionLink: { label: "About Derive ’26", href: "/derive" },
  cta: {
    title: "Explore the competition.",
    body: "Read about the Derive ’26 format, the rounds, and the partners who supported the finals.",
    buttonLabel: "Explore Derive",
    buttonHref: "/derive",
  },
} as const;

/**
 * The compact introduction for the home proof spread. Separate from
 * GALLERY_PAGE because the archive page introduces the complete set.
 */
export const GALLERY_HOME = {
  title: "Derive '26, in pictures",
  body: "Registration, discussions between rounds, and the finalists together at IIT Bombay in July 2026.",
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
    category: "around", ...img("goodies-distribution"),
  },
  { label: "Contest notebooks and T-shirts at the registration desk", category: "around", ...img("swag-desk") },
  { label: "A contestant working through the problem set", category: "competition", ...img("in-the-zone") },
  {
    label: "Debating the problem set between rounds",
    homePlacement: "support-bottom",
    category: "conversations", ...img("debating-the-problem-set"),
  },
  {
    label: "Finalists meet the partner interviewers",
    category: "conversations", ...img("finalists-meet-the-interviewers"),
  },
  {
    label: "Prize cheques on stage for the winners",
    category: "competition", ...img("prize-cheque-moment"),
  },
  {
    label: "The address before the final round",
    category: "competition", ...img("address-before-the-final-round"),
  },
  {
    label: "Blitz chess huddle at the evening social",
    category: "around", ...img("blitz-chess-huddle"),
  },
  { label: "The evening social from above", category: "around", ...img("the-evening-social") },
  { label: "The AMS deck, custom cards in play", category: "around", ...img("the-ams-deck") },
  {
    label: "Finalists at the Convergence banner",
    category: "conversations", ...img("finalists-at-the-convergence-banner"),
  },
  {
    label: "Derive finalists and organizers together at IIT Bombay",
    homePlacement: "lead",
    category: "around", ...img("the-full-room"),
  },
];

export const GALLERY_FILTERS = [
  { id: "all", label: "All photographs" },
  { id: "competition", label: "The competition" },
  { id: "conversations", label: "Conversations" },
  { id: "around", label: "Around the event" },
] as const;

/** Archive order is independent of the home-page photo placements. */
export const GALLERY_ARCHIVE_ORDER = [
  "the-full-room", "goodies-distribution", "swag-desk",
  "address-before-the-final-round", "in-the-zone", "debating-the-problem-set",
  "finalists-meet-the-interviewers", "finalists-at-the-convergence-banner",
  "blitz-chess-huddle", "the-ams-deck", "the-evening-social", "prize-cheque-moment",
] as const;
