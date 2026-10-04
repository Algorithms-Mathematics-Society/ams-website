"use client";

import type { ReactNode } from "react";
import { CollapsibleGroup } from "@astryxdesign/core/Collapsible";

interface Props {
  children: ReactNode;
  defaultValue: string;
}

/** Astryx coordinates the open item; existing AMS styles supply the appearance. */
export function DisclosureGroup({ children, defaultValue }: Props) {
  return (
    <CollapsibleGroup type="single" defaultValue={defaultValue}>
      {children}
    </CollapsibleGroup>
  );
}
