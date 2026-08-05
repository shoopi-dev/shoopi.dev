import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type AnimateProps<T extends ElementType> = {
  delay?: number;
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

function animated(effect: "rise" | "pop") {
  function Animated<T extends ElementType = "div">({
    delay = 0,
    as,
    className = "",
    children,
    ...rest
  }: AnimateProps<T>) {
    const Tag = (as ?? "div") as ElementType;
    return (
      <Tag
        className={`${effect} ${className}`}
        style={{ animationDelay: `${delay}s` }}
        {...rest}
      >
        {children}
      </Tag>
    );
  }
  Animated.displayName = effect === "rise" ? "Rise" : "Pop";
  return Animated;
}

/** fades in while rising - for text and full sections */
export const Rise = animated("rise");
/** springs in with overshoot - for cards, tiles, pills */
export const Pop = animated("pop");
