"use client";

import Link from "next/link";
import { Button as AstryxButton } from "@astryxdesign/core/Button";
import { cn } from "@/lib/cn";

interface Props {
  href: string;
  children: string;
  /** Cream buttons are reserved for burgundy surfaces. */
  variant?: "solid" | "outline" | "inverse";
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

/** Astryx action styling with native links and AMS's shared control dimensions. */
export function Button({ href, children, variant = "solid", external, className, onClick }: Props) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  return (
    <AstryxButton
      href={href}
      as={isExternal ? undefined : Link}
      label={children}
      variant={variant === "solid" ? "primary" : variant === "outline" ? "ghost" : "secondary"}
      size="lg"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn("ams-button", `ams-button-${variant}`, className)}
      onClick={onClick}
    />
  );
}
