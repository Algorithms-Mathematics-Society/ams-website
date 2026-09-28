"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Lightbox } from "@/components/ui/Lightbox";
import { GALLERY_ACTIONS, type GalleryItem } from "@/content/gallery";

interface Props {
  items: GalleryItem[];
}

/**
 * A regular photo grid with visible captions and a full-size viewer.
 * Images appear immediately, with a consistent reading and keyboard order.
 */
export function GalleryTiles({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
      <ul className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10">
        {withImages.map((item, index) => (
          <li key={item.label} className="min-w-0">
            <button
              type="button"
              aria-label={`${GALLERY_ACTIONS.openPhoto}: ${item.label}`}
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setOpenIndex(index);
              }}
              className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-deep"
            >
              <span className="relative block aspect-[3/2] overflow-hidden bg-paper">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1280px) 390px, (min-width: 1024px) calc((100vw - 112px) / 3), (min-width: 640px) calc((100vw - 84px) / 2), calc((100vw - 52px) / 2)"
                  className="object-cover"
                />
              </span>
              <span className="mt-2 block text-xs leading-5 text-ink/75 group-hover:text-burgundy sm:mt-3 sm:text-sm sm:leading-6">
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <Lightbox
          items={withImages.map((item) => ({
            src: item.full,
            label: item.label,
          }))}
          positionLabel={GALLERY_ACTIONS.photo}
          index={openIndex}
          onClose={closeLightbox}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
