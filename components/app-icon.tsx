"use client";

import { useCallback, useRef } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import type { Project } from "@/data/site";
import { externalProps } from "@/lib/link";
import { statusBadge } from "@/lib/status";
import { Pop } from "./animate";

const statusLabel: Record<Project["status"], string> = {
  live: "Available now",
  building: "In progress",
  soon: "Coming soon",
};

/* how far the tile leans toward the cursor at the edges */
const MAGNET_PX = 7;

/** liquid-glass squircle that leans toward the cursor, with a tracking glow,
    floating in a row that waves together (`delay` offsets the bob) */
export function LiquidTile({
  delay = 0,
  soon = false,
  children,
}: {
  delay?: number;
  soon?: boolean;
  children: ReactNode;
}) {
  const tile = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const el = tile.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    el.style.setProperty("--tx", `${(dx * MAGNET_PX).toFixed(2)}px`);
    el.style.setProperty("--ty", `${(dy * MAGNET_PX).toFixed(2)}px`);
    el.style.setProperty("--mx", `${(e.clientX - r.left).toFixed(1)}px`);
    el.style.setProperty("--my", `${(e.clientY - r.top).toFixed(1)}px`);
  }, []);

  const onLeave = useCallback(() => {
    const el = tile.current;
    if (!el) return;
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
  }, []);

  return (
    <div className="float" style={{ animationDelay: `${-delay * 2.3}s`, animationDuration: "5s" }}>
      <div
        ref={tile}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`tile-liquid relative flex h-26 w-26 items-center justify-center overflow-hidden rounded-[24px] text-3xl ${soon ? "tile-liquid-soon" : ""}`}
      >
        <span className="tile-spec" aria-hidden />
        <span className="tile-cursor-glow" aria-hidden />
        {children}
      </div>
    </div>
  );
}

/** springboard icon: the tile, its name and a status badge; dark glass "?" for coming soon */
export function AppIcon({ p, delay = 0 }: { p: Project; delay?: number }) {
  const soon = p.status === "soon";

  const icon = (
    <Pop delay={delay} className="flex flex-col items-center gap-2.5">
      <LiquidTile delay={delay} soon={soon}>
        {soon ? (
          <span className="relative text-3xl text-ink/30">?</span>
        ) : p.icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.icon} alt="" className="relative h-full w-full object-cover" />
        ) : (
          <span className="relative">{p.emoji}</span>
        )}
      </LiquidTile>
      <span className={`max-w-24 truncate text-sm font-medium ${soon ? "text-ink/45" : ""}`}>
        {soon ? "???" : p.name}
      </span>
      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusBadge[p.status]}`}>
        {statusLabel[p.status]}
      </span>
    </Pop>
  );

  return p.link ? (
    <a href={p.link} {...externalProps(p.link)} className="block">
      {icon}
    </a>
  ) : (
    icon
  );
}
