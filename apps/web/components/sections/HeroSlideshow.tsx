"use client";

import Image from "next/image";
import { useState } from "react";

const IMAGE_SIZES =
  "(min-width: 1216px) 464px, (min-width: 1024px) calc(50vw - 9rem), (min-width: 640px) calc(100vw - 8.25rem), calc(100vw - 5.75rem)";

export function HeroSlideshow() {
  const [paused, setPaused] = useState(false);
  const animationStyle = {
    animationPlayState: paused ? "paused" : "running",
  };

  return (
    <div className="relative aspect-[4/3] w-full">
      <div className="hero-slide absolute inset-0" style={animationStyle}>
        <Image
          src="/images/derive26/hero/finalists-mid-problem.webp"
          alt="Finalists working through the problem set in the hall at IIT Bombay, Derive '26 finals"
          fill
          priority
          fetchPriority="high"
          quality={75}
          sizes={IMAGE_SIZES}
          className="object-cover object-[center_85%]"
        />
      </div>
      <div
        className="hero-slide hero-slide-2 absolute inset-0 opacity-0"
        style={animationStyle}
        aria-hidden="true"
      >
        <Image
          src="/images/derive26/hero/the-full-room.webp"
          alt=""
          fill
          quality={75}
          sizes={IMAGE_SIZES}
          className="object-cover object-[center_62%]"
        />
      </div>
      <div
        className="hero-slide hero-slide-3 absolute inset-0 opacity-0"
        style={animationStyle}
        aria-hidden="true"
      >
        <Image
          src="/images/derive26/hero/winners-with-the-cheques.webp"
          alt=""
          fill
          quality={75}
          sizes={IMAGE_SIZES}
          className="object-cover"
        />
      </div>
      <button
        type="button"
        className="absolute right-3 bottom-3 z-10 flex size-11 items-center justify-center rounded-control border border-cream-light/30 bg-espresso/80 text-cream-light backdrop-blur-sm transition-colors hover:bg-espresso motion-reduce:hidden"
        aria-label={paused ? "Play photo slideshow" : "Pause photo slideshow"}
        aria-pressed={paused}
        onClick={() => setPaused((current) => !current)}
      >
        {paused ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-4 fill-current"
          >
            <path d="M8 5.5v13l10-6.5L8 5.5Z" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-4 fill-current"
          >
            <path d="M7 5h3.5v14H7V5Zm6.5 0H17v14h-3.5V5Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
