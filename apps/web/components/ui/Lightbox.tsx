"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface Props {
  items: { src: string; label: string }[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Full-bleed gallery lightbox on #1F0A0D (block 07): the immersive payoff,
 * chrome kept minimal. Esc closes, arrow keys navigate, focus is trapped,
 * body scroll locks while open.
 */
export function Lightbox({ items, index, onClose, onNavigate }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft")
        onNavigate((index - 1 + items.length) % items.length);
      if (e.key === "Tab") {
        // Three buttons only; keep focus among them.
        const focusables = Array.from(
          document.querySelectorAll<HTMLElement>("[data-lightbox-control]"),
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [index, items.length, onClose, onNavigate]);

  /**
   * The fill img element spans the whole stage, so e.target cannot tell the
   * letterbox margin from the photo. Hit-test the click against the
   * object-contain photo rect: the margin is backdrop and closes, the photo
   * pixels do nothing (pausing on the image must not dismiss it).
   */
  function onStageClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    const img = e.currentTarget.querySelector("img");
    if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
      const rect = img.getBoundingClientRect();
      const scale = Math.min(
        rect.width / img.naturalWidth,
        rect.height / img.naturalHeight,
      );
      const photoWidth = img.naturalWidth * scale;
      const photoHeight = img.naturalHeight * scale;
      const photoLeft = rect.left + (rect.width - photoWidth) / 2;
      const photoTop = rect.top + (rect.height - photoHeight) / 2;
      const onPhoto =
        e.clientX >= photoLeft &&
        e.clientX <= photoLeft + photoWidth &&
        e.clientY >= photoTop &&
        e.clientY <= photoTop + photoHeight;
      if (onPhoto) return;
    }
    onClose();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
      className="fixed inset-0 z-50 flex flex-col bg-[#1f0a0d]"
      onClick={onClose}
    >
      <div className="relative flex-1" onClick={onStageClick}>
        <Image
          src={item.src}
          alt={item.label}
          fill
          sizes="100vw"
          className="object-contain"
        />
      </div>

      <div
        className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm text-cream-light/80">{item.label}</p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            data-lightbox-control
            onClick={() =>
              onNavigate((index - 1 + items.length) % items.length)
            }
            className="flex h-11 w-11 items-center justify-center rounded-control text-cream-light/80 hover:text-cream-light"
          >
            <span className="sr-only">Previous photo</span>
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            data-lightbox-control
            onClick={() => onNavigate((index + 1) % items.length)}
            className="flex h-11 w-11 items-center justify-center rounded-control text-cream-light/80 hover:text-cream-light"
          >
            <span className="sr-only">Next photo</span>
            <span aria-hidden>→</span>
          </button>
          <button
            ref={closeRef}
            type="button"
            data-lightbox-control
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-control text-cream-light/80 hover:text-cream-light"
          >
            <span className="sr-only">Close</span>
            <span aria-hidden>✕</span>
          </button>
        </div>
      </div>
    </div>
  );
}
