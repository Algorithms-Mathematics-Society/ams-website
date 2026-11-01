"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { GALLERY_ACTIONS, GALLERY_FILTERS, GALLERY_PAGE, type GalleryItem } from "@/content/gallery";
import styles from "./GalleryBrowser.module.css";

const Lightbox = dynamic(() => import("./Lightbox").then(module => module.Lightbox));
interface Props { items: GalleryItem[]; }

export function GalleryBrowser({ items }: Props) {
  const [filter, setFilter] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLAnchorElement | null>(null);
  const photos = items.filter((item): item is GalleryItem & { src: string; full: string } => Boolean(item.src && item.full))
    .filter(item => filter === "all" || item.category === filter);
  function close() { setOpenIndex(null); requestAnimationFrame(() => openerRef.current?.focus({ preventScroll: true })); }
  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label={GALLERY_PAGE.filtersLabel}>
          {GALLERY_FILTERS.map(option => (
            <button key={option.id} type="button" className={styles.filter} aria-pressed={filter === option.id}
              aria-controls="gallery-photos" onClick={() => setFilter(option.id)}>{option.label}</button>
          ))}
        </div>
        <p className={styles.count} role="status">{photos.length} {GALLERY_PAGE.photoCountLabel}</p>
      </div>
      <ul id="gallery-photos" aria-label={GALLERY_PAGE.collectionLabel} className={styles.grid}>
        {photos.map((item, index) => {
          const featured = index === 0 || (filter === "all" && index === 5) || (filter !== "all" && photos.length % 2 === 0 && index === photos.length - 1);
          return (
            <li key={item.src} className={`${styles.tile} ${featured ? styles.featured : ""} ${item.homePlacement === "lead" ? styles.panorama : ""}`}>
              <a href={item.full} className={styles.photoLink} aria-labelledby={`gallery-caption-${index}`}
                aria-haspopup="dialog" onClick={event => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault(); openerRef.current = event.currentTarget; setOpenIndex(index);
                }}>
                <span className={styles.frame}>
                  <Image src={featured ? item.full : item.src} alt={item.label} fill
                    priority={filter === "all" && index === 0} fetchPriority={filter === "all" && index === 0 ? "high" : undefined}
                    sizes={featured ? "(min-width: 1280px) 1216px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)" : "(min-width: 1280px) 698px, (min-width: 1024px) 56vw, (min-width: 640px) calc((100vw - 88px) / 2), calc(100vw - 40px)"}
                    className={styles.image} />
                </span>
                <span id={`gallery-caption-${index}`} className={styles.caption}><span>{item.label}</span><span className={styles.expand} aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false"><path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" /></svg></span></span>
              </a>
            </li>
          );
        })}
      </ul>
      {openIndex !== null && <Lightbox items={photos.map(item => ({ src: item.full, thumb: item.src, label: item.label, category: GALLERY_FILTERS.find(option => option.id === item.category)?.label ?? GALLERY_PAGE.all }))}
        index={openIndex} labels={GALLERY_ACTIONS} onClose={close} onNavigate={setOpenIndex} />}
    </>
  );
}
