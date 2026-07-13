"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import type { GalleryItem } from "@/content/gallery";

interface Props {
  items: GalleryItem[];
}

/** Irregular editorial spans (12-col grid on lg): uniformity reads as stock. */
const SPANS = [
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-5",
  "lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-3",
];

/**
 * Client leaf for block 07: the tile grid owns lightbox state. Caption bar
 * slides up on hover/focus over a darkening scrim; click opens the lightbox.
 */
export function GalleryTiles({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const withImages = items.filter(
    (item): item is GalleryItem & { src: string; full: string } =>
      Boolean(item.src && item.full),
  );

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-12">
        {withImages.map((item, index) => (
          <li key={item.label} className={SPANS[index % SPANS.length]}>
            <Reveal delay={(index % 3) * 60}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg lg:h-64 lg:w-full lg:[aspect-ratio:auto]"
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(min-width: 1280px) 500px, (min-width: 1024px) 33vw, 46vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                {/* Darkening scrim + caption bar sliding up (240ms). */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25 group-focus-visible:bg-black/25"
                />
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 px-3 py-2 text-left text-xs text-cream-light transition-transform duration-[240ms] group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  {item.label}
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <Lightbox
          items={withImages.map((item) => ({
            src: item.full,
            label: item.label,
          }))}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
