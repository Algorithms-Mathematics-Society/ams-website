"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import type { GalleryItem } from "@/content/gallery";

interface Props {
  items: GalleryItem[];
}

/**
 * Client leaf for the archive: the ruled grid owns lightbox state and keeps
 * every documentary caption visible without hover.
 */
export function GalleryTiles({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  /** The tile that opened the lightbox; focus returns to it on close. */
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const withImages = items.filter(
    (item): item is GalleryItem & { src: string; full: string } =>
      Boolean(item.src && item.full),
  );

  function closeLightbox() {
    setOpenIndex(null);
    openerRef.current?.focus();
  }

  return (
    <>
      <ul className="grid border-t border-l border-burgundy/20 sm:grid-cols-2 lg:grid-cols-3">
        {withImages.map((item, index) => (
          <li key={item.label} className="min-w-0 border-r border-b border-burgundy/20">
            <Reveal delay={(index % 3) * 60}>
              <button
                type="button"
                onClick={(e) => {
                  openerRef.current = e.currentTarget;
                  setOpenIndex(index);
                }}
                className="group block w-full text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold-deep"
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-paper">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(min-width: 1280px) 405px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </span>
                <span className="flex min-h-16 items-center border-t border-burgundy/15 bg-cream-light px-4 py-3 text-xs leading-5 font-medium text-ink/80 group-hover:text-burgundy">
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
          onClose={closeLightbox}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
