"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
  /** Stagger offset in ms — keep small (≤ 360) so it reads as one gesture. */
  delay?: number;
}

/**
 * Fades content up once it scrolls into view. Fires once. Pairs with the
 * html.js-guarded .reveal styles in globals.css, so no-JS visitors and
 * reduced-motion users always see content immediately.
 */
export function Reveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
