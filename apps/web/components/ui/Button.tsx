import Link from "next/link";
import { cn } from "@/lib/cn";

interface Props {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
  className?: string;
}

/** Navigation CTA rendered as a link. For in-page actions use a plain <button>. */
export function Button({
  href,
  children,
  variant = "solid",
  external,
  className,
}: Props) {
  const styles = cn(
    "inline-flex min-h-11 items-center justify-center rounded-md px-6 py-2.5 text-sm font-medium transition-colors",
    variant === "solid" && "bg-maroon text-cream-light hover:bg-maroon-deep",
    variant === "outline" &&
      "border border-maroon/40 text-maroon hover:border-maroon hover:bg-maroon/5",
    className,
  );
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
}
