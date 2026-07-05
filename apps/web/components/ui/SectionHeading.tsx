import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

interface Props {
  eyebrow: string;
  title: string;
  /** Set when the section sits on a dark background. */
  inverse?: boolean;
  className?: string;
}

export function SectionHeading({ eyebrow, title, inverse, className }: Props) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-4 font-display text-section",
          inverse ? "text-cream-light" : "text-maroon",
        )}
      >
        {title}
      </h2>
    </div>
  );
}
