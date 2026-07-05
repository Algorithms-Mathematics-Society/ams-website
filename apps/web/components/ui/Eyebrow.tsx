import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  /** Set on burgundy/espresso bands; picks the contrast-safe bright gold. */
  inverse?: boolean;
  className?: string;
}

/** Gold, letterspaced kicker above section headings ("WHAT WE RUN"). */
export function Eyebrow({ children, inverse, className }: Props) {
  return (
    <p
      className={cn(
        "text-xs font-semibold tracking-[0.25em] uppercase",
        inverse ? "text-gold-bright" : "text-gold-deep",
        className,
      )}
    >
      {children}
    </p>
  );
}
