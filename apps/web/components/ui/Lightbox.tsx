"use client";

import Image, { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { ControlIcon } from "@/components/ui/ControlIcon";
import { LightboxPhoto } from "@/components/ui/LightboxPhoto";
import styles from "./Lightbox.module.css";

interface Props {
  items: { src: string; thumb: string; label: string; category: string }[];
  index: number;
  labels: { context: string; photo: string; close: string; previous: string; next: string; navigation: string; thumbnails: string; hint: string; loading: string; unavailable: string; original: string };
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, index, labels, onClose, onNavigate }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
  const item = items[index];
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const move = (delta: number) => onNavigate((index + delta + items.length) % items.length);
  useEffect(() => {
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = overflow; };
  }, []);
  useEffect(() => {
    const strip = stripRef.current;
    const active = strip?.querySelector<HTMLElement>('[aria-current="true"]');
    if (strip && active) strip.scrollTo({ left: active.offsetLeft - strip.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [index]);
  useEffect(() => {
    if (loadedSrc !== item.src || items.length < 2) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType ?? "")) return;
    const timer = window.setTimeout(() => {
      const neighbours = new Set([(index + 1) % items.length, (index - 1 + items.length) % items.length]);
      for (const neighbour of neighbours) {
        const { props } = getImageProps({ src: items[neighbour].src, alt: "", fill: true, sizes: "100vw" });
        const image = new window.Image();
        image.decoding = "async";
        image.fetchPriority = "low";
        image.sizes = props.sizes ?? "100vw";
        image.srcset = props.srcSet ?? "";
        image.src = props.src;
      }
    }, 200);
    return () => window.clearTimeout(timer);
  }, [loadedSrc, item.src, index, items]);
  return (
    <dialog ref={dialogRef} className={styles.dialog} aria-label={labels.navigation} aria-describedby="lightbox-caption"
      onCancel={event => { event.preventDefault(); onClose(); }}
      onKeyDown={event => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
      }}>
      <div className={styles.top}>
        <p className={styles.context}>{labels.context}</p>
        <button type="button" className={styles.control} aria-label={labels.close} onClick={onClose} autoFocus><ControlIcon name="close" /></button>
      </div>
      <div className={styles.stage} onPointerDown={event => {
        if (!event.isPrimary) { start.current = null; return; }
        if (event.pointerType === "mouse") return;
        event.currentTarget.setPointerCapture(event.pointerId);
        start.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
      }} onPointerCancel={() => { start.current = null; }} onPointerUp={event => {
        const origin = start.current; start.current = null;
        if (!origin || origin.id !== event.pointerId) return;
        const dx = event.clientX - origin.x; const dy = event.clientY - origin.y;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
      }}>
        <LightboxPhoto key={item.src} {...item} loading={labels.loading} unavailable={labels.unavailable} onReady={() => setLoadedSrc(item.src)} />
      </div>
      <div className={styles.bottom}>
        <div className={styles.captionRow}>
          <div>
            <p className={styles.category}>{item.category}</p>
            <p id="lightbox-caption" className={styles.caption} aria-live="polite" aria-atomic="true">{item.label}</p>
          </div>
          <a className={styles.original} href={item.src} target="_blank" rel="noopener noreferrer">{labels.original}<span aria-hidden="true"> ↗</span></a>
        </div>
        <div className={styles.navigation} role="group" aria-label={labels.navigation}>
          <button type="button" className={styles.control} aria-label={labels.previous} onClick={() => move(-1)}><ControlIcon name="previous" /></button>
          <p className={styles.count} aria-live="polite" aria-atomic="true">{labels.photo} {index + 1} / {items.length}</p>
          <button type="button" className={styles.control} aria-label={labels.next} onClick={() => move(1)}><ControlIcon name="next" /></button>
        </div>
        <div ref={stripRef} className={styles.strip} role="group" aria-label={labels.thumbnails}>
          {items.map((photo, i) => <button type="button" key={photo.src} className={styles.thumbnail} aria-label={`${labels.photo} ${i + 1}: ${photo.label}`}
            aria-current={i === index ? "true" : undefined} onClick={() => onNavigate(i)}>
            <Image src={photo.thumb} alt="" fill sizes="(min-width: 640px) 88px, 76px" />
          </button>)}
        </div>
        <p className={styles.hint}>{labels.hint}</p>
      </div>
    </dialog>
  );
}
