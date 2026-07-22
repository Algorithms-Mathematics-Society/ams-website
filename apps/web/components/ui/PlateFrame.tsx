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

export function PlateFrame({
  children,
  caption,
  captionTone = "light",
  className,
}: Props) {
  return (
    <figure className={className}>
      <div className="rounded-panel border border-ink/15 bg-cream-light p-2.5 shadow-[0_2px_14px_rgba(70,64,58,0.08)]">
        <div className="overflow-hidden rounded-media">{children}</div>
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
