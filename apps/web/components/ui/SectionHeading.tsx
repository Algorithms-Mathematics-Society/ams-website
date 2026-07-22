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
      <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-4 max-w-3xl font-sans text-section font-semibold tracking-[-0.035em]",
          inverse ? "text-cream-light" : "text-burgundy",
        )}
      >
        {title}
      </h2>
    </div>
  );
}
