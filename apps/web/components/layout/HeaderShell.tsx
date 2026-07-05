"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Sticky wrapper that hides the header on scroll-down and reveals it on
 * scroll-up. Client leaf — the header content itself stays server-rendered
 * and is passed through as children.
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);
  const upTravel = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        ticking.current = false;
        const y = Math.max(0, window.scrollY);
        const delta = y - lastY.current;
        lastY.current = y;
        setAtTop(y < 8);

        if (y < 64) {
          // Near the top the header is always shown.
          setHidden(false);
          upTravel.current = 0;
        } else if (delta > 0) {
          setHidden(true);
          upTravel.current = 0;
        } else if (delta < 0) {
          // Small hysteresis so a 1px wobble doesn't flash the header in.
          upTravel.current -= delta;
          if (upTravel.current > 12) setHidden(false);
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 z-40 transition-[translate,box-shadow] duration-300 ease-out",
        hidden && "-translate-y-full",
        !atTop && !hidden && "shadow-[0_1px_12px_rgba(87,28,36,0.08)]",
      )}
    >
      {children}
    </div>
  );
}
