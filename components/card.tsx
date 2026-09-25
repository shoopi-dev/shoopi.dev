import type { ReactNode } from "react";
import { externalProps } from "@/lib/link";
import { Pop } from "./animate";

/** The one card shape: a glass panel that springs in and sits still.
    Corners are concentric - 22px outside, 8px padding, so media inside takes
    14px. `href` makes the whole card the link (<a> instead of <article>) and
    gives it the hover lift; a card that goes nowhere doesn't pretend to. */
export function Card({
  children,
  delay = 0,
  href,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  href?: string;
  className?: string;
}) {
  const cls = `glass group/card flex h-full flex-col gap-3 rounded-[22px] p-2 ${href ? "lift" : ""} ${className}`;
  return (
    <Pop delay={delay} className="h-full">
      {href ? (
        <a href={href} {...externalProps(href)} className={cls}>
          {children}
        </a>
      ) : (
        <article className={cls}>{children}</article>
      )}
    </Pop>
  );
}

/** Small ink square, usually the ↗ in a card header. Always a link. */
export function IconButton({
  href,
  label,
  children = "↗",
  className = "",
}: {
  href: string;
  label: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...externalProps(href)}
      aria-label={label}
      className={`flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-white transition-transform hover:scale-110 active:scale-95 ${className}`}
    >
      {children}
    </a>
  );
}
