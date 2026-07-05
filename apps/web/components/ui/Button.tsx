import Link from "next/link";
import { cn } from "@/lib/cn";

interface Props {
  href: string;
  children: React.ReactNode;
  /** inverse = cream button for use on burgundy/espresso bands. */
  variant?: "solid" | "outline" | "inverse";
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
    variant === "solid" &&
      "bg-burgundy text-cream-light hover:bg-burgundy-deep",
    variant === "outline" &&
      "border border-burgundy/40 text-burgundy hover:border-burgundy hover:bg-burgundy/5",
    variant === "inverse" && "bg-cream text-burgundy hover:bg-cream-light",
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
