import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  /** Printed below the mat. Omit to render the frame with no caption. */
  caption?: string;
  /** "light" (default): ink caption text, for a cream-ground page.
   *  "dark": cream-light caption text, for an espresso-ground page. */
  captionTone?: "light" | "dark";
  className?: string;
}

/**
 * The site's mounted-print treatment: a hairline frame, a thin cream mat,
 * and a soft lift off the page, so photographic content reads as an
 * archival plate rather than a rounded photo card. The mat itself stays
 * cream regardless of the surrounding page (a real mat board reads the
 * same in a dark room); only the caption's tone follows the page.
 * Children own their aspect ratio and clipping (a single portrait Image,
 * or a multi-layer crossfade); this component only owns the mat and the
 * caption.
 */
export function PlateFrame({
  children,
  caption,
  captionTone = "light",
  className,
}: Props) {
  return (
    <figure className={className}>
      <div className="rounded-lg border border-ink/15 bg-cream-light p-2.5 shadow-[0_2px_24px_rgba(70,64,58,0.10)]">
        {children}
      </div>
      {caption ? (
        <figcaption
          className={cn(
            "mt-3 text-xs italic",
            captionTone === "dark" ? "text-cream-light/70" : "text-ink/60",
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
