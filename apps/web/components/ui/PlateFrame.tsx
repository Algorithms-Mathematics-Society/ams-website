import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  /** Printed below the image. Omit to render with no caption. */
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
      <div className="overflow-hidden rounded-media border border-burgundy/20">
        {children}
      </div>
      {caption ? (
        <figcaption
          className={cn(
            "mt-3 border-l-2 border-gold pl-3 text-xs leading-5",
            captionTone === "dark" ? "text-cream-light/75" : "text-ink/70",
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
