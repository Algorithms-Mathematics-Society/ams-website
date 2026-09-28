import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

interface Props extends Omit<ComponentProps<"button">, "aria-label"> {
  label: string;
  inverse?: boolean;
}

/** Quiet icon action with a visible focus ring and a full touch target. */
export function IconButton({ label, inverse = false, className, children, ...props }: Props) {
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-control transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-40",
        inverse
          ? "text-cream-light/90 hover:bg-cream-light/10 hover:text-cream-light active:bg-cream-light/20 focus-visible:outline-gold-bright"
          : "text-burgundy hover:bg-burgundy/5 active:bg-burgundy/10 focus-visible:outline-gold-deep",
        className,
      )}
    >
      {children}
    </button>
  );
}
