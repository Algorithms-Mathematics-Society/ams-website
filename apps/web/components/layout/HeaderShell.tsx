"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Sticky wrapper that hides the header on scroll-down and reveals it on
 * scroll-up. On the home page the header instead overlays the hero photo
 * transparently (fixed, no background) and becomes the solid cream bar
 * only after 80vh, per the motion spec. Client leaf; the header content
 * itself stays server-rendered and is passed through as children.
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const overlayRoute = usePathname() === "/";
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [pastHero, setPastHero] = useState(false);
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
        // pastHero only matters on the overlay route; skip the per-tick
        // state churn everywhere else.
        if (overlayRoute) setPastHero(y > window.innerHeight * 0.8);

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
    // Style correctly when a load lands mid-page (scroll restoration,
    // anchor links) before the first scroll event fires. Seed lastY so
    // this initial call measures zero delta instead of reading as a
    // scroll-down from 0, which would hide the header on every mid-page
    // landing.
    lastY.current = window.scrollY;
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlayRoute]);

  // Transparent over the hero photo; solid cream bar past 80vh.
  const overlay = overlayRoute && !pastHero;

  return (
    <div
      data-overlay={overlay ? "" : undefined}
      className={cn(
        "group z-40 transition-[translate,box-shadow] duration-300 ease-out",
        overlayRoute ? "fixed inset-x-0 top-0" : "sticky top-0",
        // Over the hero the header never hides; it is part of the photo beat.
        hidden && !overlay && "-translate-y-full",
        !atTop &&
          !hidden &&
          !overlay &&
          "shadow-[0_1px_12px_rgba(87,28,36,0.08)]",
      )}
    >
      {children}
    </div>
  );
}
