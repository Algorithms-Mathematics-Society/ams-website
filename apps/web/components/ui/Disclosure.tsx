"use client";

import { useId, type ReactNode } from "react";
import { useCollapsible } from "@astryxdesign/core/Collapsible";

interface Props {
  title: string;
  value: string;
  groupName: string;
  children: ReactNode;
}

/** Native disclosure remains usable without JS; Astryx coordinates it after hydration. */
export function Disclosure({ title, value, groupName, children }: Props) {
  const contentId = useId();
  const { isOpen, toggle } = useCollapsible({ isCollapsible: true, value });

  return (
    <details
      name={groupName}
      open={isOpen}
      className="group py-7"
      onToggle={(event) => {
        // Keep browser-initiated expansion (such as find-in-page) in sync.
        if (event.currentTarget.open !== isOpen) toggle();
      }}
    >
      <summary
        aria-controls={contentId}
        onClick={(event) => {
          event.preventDefault();
          toggle();
        }}
        className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-burgundy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-deep [&::-webkit-details-marker]:hidden"
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
          className="shrink-0 transition-transform duration-150 group-open:rotate-180 motion-reduce:transition-none"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div id={contentId} className="mt-3 leading-relaxed">
        {children}
      </div>
    </details>
  );
}
