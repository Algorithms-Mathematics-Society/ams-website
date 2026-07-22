import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  /** Set on burgundy/espresso bands; picks the contrast-safe bright gold. */
  inverse?: boolean;
  className?: string;
}

/** Compact institutional kicker above section headings. */
export function Eyebrow({ children, inverse, className }: Props) {
  return (
    <p
      className={cn(
        "text-[11px] leading-none font-bold tracking-[0.18em] uppercase",
        inverse ? "text-gold-bright" : "text-gold-deep",
        className,
      )}
    >
      {children}
    </p>
  );
}
