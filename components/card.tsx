import type { ReactNode } from "react";
import { externalProps } from "@/lib/link";
import { Pop } from "./animate";

/** The one card shape. Glass panel, springs in, lifts on hover.
    Pass `index` to join a floating row - cards offset by even thirds so the
    row reads as one wave. `ring` marks live/active status, not decoration.
    `href` makes the whole card the link (renders <a> instead of <article>);
    without it, put an IconButton in the header. */
export function Card({
  children,
  delay = 0,
  index,
  ring = false,
  href,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  index?: number;
  ring?: boolean;
  href?: string;
  className?: string;
}) {
  const floating = index !== undefined;
  const props = {
    className: `${ring ? "neon-border " : ""}glass ${floating ? "float " : ""}hover-glow flex h-full flex-col gap-3 rounded-[22px] p-4 shadow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`,
    style: floating ? { animationDelay: `${-index * 2}s`, animationDuration: "6s" } : undefined,
  };
  return (
    <Pop delay={delay} className="h-full">
      {href ? (
        <a href={href} {...externalProps(href)} {...props}>
          {children}
        </a>
      ) : (
        <article {...props}>{children}</article>
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
