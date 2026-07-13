"use client";

import { useEffect, useRef } from "react";

interface Props {
  /** Final display string, e.g. "2,500+", "33", "24+", "₹3.2 L". */
  value: string;
  /** Delay after entering view before the count starts, in ms. */
  delay?: number;
}

/**
 * The page's ONE sanctioned count-up (see the exception recorded in
 * ENGINEERING_GUIDE.md). The final value is server-rendered verbatim, so
 * no-JS visitors, crawlers, and reduced-motion users always see the real
 * number; the animation only decorates. Counts the first number in the
 * string from 0 over 1.2s when 40% in view, once.
 */
export function CountUp({ value, delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const match = value.match(/\d[\d,]*(?:\.\d+)?/);
    if (!match || match.index === undefined) return;
    const target = parseFloat(match[0].replace(/,/g, ""));
    const decimals = match[0].includes(".") ? match[0].split(".")[1].length : 0;
    const grouped = match[0].includes(",");
    const prefix = value.slice(0, match.index);
    const suffix = value.slice(match.index + match[0].length);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now() + delay;
        function frame(now: number) {
          const t = Math.min(1, Math.max(0, (now - start) / 1200));
          const eased = 1 - Math.pow(1 - t, 3);
          const current = target * eased;
          const text = grouped
            ? Math.round(current).toLocaleString("en-IN")
            : current.toFixed(decimals);
          if (el) el.textContent = `${prefix}${text}${suffix}`;
          if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, delay]);

  return <span ref={ref}>{value}</span>;
}
