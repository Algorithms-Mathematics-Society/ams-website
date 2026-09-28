import Link from "next/link";
import { cn } from "@/lib/cn";

interface Props {
  href: string;
  children: React.ReactNode;
  inverse?: boolean;
  /** Changes the directional icon; external links stay in the same tab. */
  external?: boolean;
  className?: string;
}

/** Quiet navigation action with a separate, non-textual direction cue. */
export function TextLink({ href, children, inverse, external, className }: Props) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 min-w-11 max-w-full items-center gap-2 py-2 text-sm leading-6 font-semibold no-underline focus-visible:outline-2 focus-visible:outline-offset-4",
        inverse
          ? "text-cream-light hover:text-gold-bright focus-visible:outline-gold-bright"
          : "text-burgundy hover:text-gold-deep focus-visible:outline-gold-deep",
        className,
      )}
    >
      <span className="min-w-0 break-words">{children}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        className="shrink-0"
      >
        <path d={isExternal ? "M7 17 17 7M7 7h10v10" : "M4 12h16m-6-6 6 6-6 6"} />
      </svg>
    </Link>
  );
}
