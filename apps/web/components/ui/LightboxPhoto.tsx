"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./Lightbox.module.css";
interface Props { src: string; thumb: string; label: string; loading: string; unavailable: string; }
export function LightboxPhoto({ src, thumb, label, loading, unavailable }: Props) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  return (
    <>
      <Image src={thumb} alt="" fill sizes="640px" className={styles.preview} />
      <Image src={src} alt={label} fill sizes="100vw" loading="eager" fetchPriority="high"
        className={`${styles.full} ${state === "ready" ? styles.ready : ""}`}
        onLoad={() => setState("ready")} onError={() => setState("error")} />
      {state !== "ready" && <p className={styles.status} role="status">{state === "error" ? unavailable : loading}</p>}
    </>
  );
}
