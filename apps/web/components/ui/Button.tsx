import Link from "next/link";
import { cn } from "@/lib/cn";

interface Props {
  href: string;
  children: React.ReactNode;
  /** inverse = white button for use on black bands. */
  variant?: "solid" | "outline" | "inverse";
  external?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

/** Navigation CTA rendered as a link. For in-page actions use a plain <button>. */
export function Button({
  href,
  children,
  variant = "solid",
  external,
  className,
  onClick,
}: Props) {
  const styles = cn(
    "inline-flex min-h-11 items-center justify-center rounded-control px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:transition-none focus-visible:outline-2 focus-visible:outline-offset-2",
    variant === "solid" &&
      "bg-burgundy text-cream-light hover:bg-burgundy-deep focus-visible:outline-gold-deep",
    variant === "outline" &&
      "border border-burgundy/60 text-burgundy hover:border-burgundy hover:bg-burgundy/5 focus-visible:outline-gold-deep",
    variant === "inverse" &&
      "bg-cream text-burgundy hover:bg-cream-light focus-visible:outline-gold-bright",
    className,
  );
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={styles} onClick={onClick}>
      {children}
    </Link>
  );
}
