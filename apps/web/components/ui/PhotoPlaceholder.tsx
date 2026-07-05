import { cn } from "@/lib/cn";

interface Props {
  /** Shot description from the design, e.g. "Hero photo · finalists on stage". */
  label: string;
  /** Tailwind aspect class so the box reserves its final dimensions (CLS). */
  aspect?: string;
  rounded?: string;
  className?: string;
}

/**
 * Dashed photo slot matching the Figma reference. Swap for <next/image> as real
 * CONVERGENCE-shoot photos land; the box dimensions must not change when they do.
 */
export function PhotoPlaceholder({
  label,
  aspect = "aspect-[4/3]",
  rounded = "rounded-xl",
  className,
}: Props) {
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${label}`}
      className={cn(
        "flex items-center justify-center border border-dashed border-ink/30 bg-placeholder p-6",
        aspect,
        rounded,
        className,
      )}
    >
      <p className="max-w-sm text-center text-[11px] font-medium tracking-[0.15em] text-ink/50 uppercase">
        📷 {label}
      </p>
    </div>
  );
}
