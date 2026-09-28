import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "reading";
}

/** Standard page gutter + max width. Every section's content sits in one of these. */
export function Container({ children, className, size = "default" }: Props) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8", size === "reading" ? "max-w-3xl" : "max-w-[80rem]", className)}>
      {children}
    </div>
  );
}
