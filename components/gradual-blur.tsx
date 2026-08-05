"use client";

import { useMemo } from "react";

/* Progressive edge blur (React Bits GradualBlur, trimmed).
   ponytail: kept core math only - presets/hover/responsive/scroll-reveal
   dropped, add back from reactbits.dev if ever needed. */

const CURVES: Record<string, (p: number) => number> = {
  linear: (p) => p,
  bezier: (p) => p * p * (3 - 2 * p),
  "ease-in": (p) => p * p,
  "ease-out": (p) => 1 - Math.pow(1 - p, 2),
};

type Props = {
  position?: "top" | "bottom";
  target?: "parent" | "page";
  height?: string;
  strength?: number;
  divCount?: number;
  curve?: keyof typeof CURVES;
  exponential?: boolean;
  opacity?: number;
  zIndex?: number;
};

export function GradualBlur({
  position = "bottom",
  target = "parent",
  height = "6rem",
  strength = 2,
  divCount = 5,
  curve = "linear",
  exponential = false,
  opacity = 1,
  zIndex = 40,
}: Props) {
  const layers = useMemo(() => {
    const increment = 100 / divCount;
    const curveFunc = CURVES[curve] ?? CURVES.linear;
    const direction = position === "top" ? "to top" : "to bottom";

    return Array.from({ length: divCount }, (_, idx) => {
      const i = idx + 1;
      const progress = curveFunc(i / divCount);
      const blur = exponential
        ? Math.pow(2, progress * 4) * 0.0625 * strength
        : 0.0625 * (progress * divCount + 1) * strength;

      const p1 = increment * i - increment;
      const p2 = increment * i;
      const p3 = increment * i + increment;
      const p4 = increment * i + increment * 2;
      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;

      const mask = `linear-gradient(${direction}, ${gradient})`;
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            maskImage: mask,
            WebkitMaskImage: mask,
            backdropFilter: `blur(${blur.toFixed(3)}rem)`,
            WebkitBackdropFilter: `blur(${blur.toFixed(3)}rem)`,
            opacity,
          }}
        />
      );
    });
  }, [position, strength, divCount, curve, exponential, opacity]);

  return (
    <div
      aria-hidden
      style={{
        position: target === "page" ? "fixed" : "absolute",
        [position]: 0,
        left: 0,
        right: 0,
        height,
        pointerEvents: "none",
        zIndex,
        isolation: "isolate",
      }}
    >
      {layers}
    </div>
  );
}
