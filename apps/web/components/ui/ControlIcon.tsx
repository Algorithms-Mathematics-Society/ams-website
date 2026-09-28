interface Props {
  name: "menu" | "close" | "previous" | "next";
}

const paths = {
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "m6 6 12 12M18 6 6 18",
  previous: "m14 6-6 6 6 6",
  next: "m10 6 6 6-6 6",
} as const;

/** A consistent stroke and optical size for familiar navigation controls. */
export function ControlIcon({ name }: Props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={paths[name]} />
    </svg>
  );
}
