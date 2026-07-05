import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

/** Standard page gutter + max width. Every section's content sits in one of these. */
export function Container({ children, className }: Props) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
