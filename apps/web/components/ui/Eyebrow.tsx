import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

/** Gold, letterspaced kicker above section headings ("WHAT WE RUN"). */
export function Eyebrow({ children, className }: Props) {
  return (
    <p
      className={cn(
        "text-xs font-semibold tracking-[0.25em] text-gold uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
