import type { ReactNode } from "react";

/* shoopi.dev set the way the X banner sets it: the Sh mark stands in for the "sh".
   The mark is 0.98em tall and stands on the text baseline, and sits one letter gap
   from the o (-0.005em, since the mark carries no side bearing and the type does),
   so the h reads as the next letter of the word rather than a logo beside it.
   Size it with font-size on the parent; everything here is in em.
   `children` is the rest of the word after the Sh, `label` what screen readers hear.
   Source of truth for the spacing: logo/x-banner/banner.html */
export function Lockup({
  className = "",
  label = "shoopi.dev",
  children = "oopi.dev",
}: {
  className?: string;
  label?: string;
  children?: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-baseline font-display font-extrabold tracking-[-0.03em] ${className}`}
    >
      <span className="sr-only">{label}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/mark.svg" alt="" aria-hidden className="mr-[-0.005em] h-[0.98em] w-auto" />
      <span aria-hidden>{children}</span>
    </span>
  );
}

const MORPH =
  "inline-block transition-[scale,opacity,filter] duration-300 ease-out motion-reduce:transition-none";

/* The o -> 0 the handle is named for: an o at rest, crossfading into the slashed
   zero while the nearest `group` is hovered or pressed. The zero is the type's own Ø,
   cap height like the traced wordmark's. The o keeps the slot, so nothing reflows. */
export function MorphO() {
  return (
    <span className="relative inline-block">
      <span
        className={`${MORPH} group-hover:scale-75 group-hover:opacity-0 group-hover:blur-[4px] group-active:scale-75 group-active:opacity-0 group-active:blur-[4px]`}
      >
        o
      </span>
      <span
        className={`${MORPH} absolute bottom-0 left-1/2 -translate-x-1/2 scale-125 opacity-0 blur-[4px] group-hover:scale-100 group-hover:opacity-100 group-hover:blur-none group-active:scale-100 group-active:opacity-100 group-active:blur-none`}
      >
        Ø
      </span>
    </span>
  );
}
