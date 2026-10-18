"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import type { Share } from "@/lib/earnings";
import { fmtMoney } from "@/lib/format";

const COLS = 20;
const SQUARES = 100;

/** the goal grid: a square lights once its full share of the goal is earned,
    and the one being earned is ringed and fills with what it holds. Hover a square with money in it (tap
    on a phone, arrows from the keyboard) and a card floats above it with what
    it holds and which apps made it; squares with nothing in them stay still */
export function GoalGrid({ apps, square }: { apps: Share[]; square: number }) {
  const total = apps.reduce((sum, a) => sum + a.mrr, 0);
  // divide by the square rather than floor(pct): pct can land a hair under a whole number
  const full = Math.min(SQUARES, Math.floor(total / square));
  const held = Math.min(SQUARES, Math.ceil(total / square)); // full squares plus the one being earned
  const part = full < SQUARES ? total / square - full : 0; // how much of the square being earned is in, 0 to 1

  // what one square holds: each app's slice of the total that falls inside it, biggest app first
  const pieces = (i: number) => {
    let start = 0;
    return apps
      .map((a) => {
        const from = start;
        start += a.mrr;
        return { ...a, amount: Math.max(0, Math.min(start, (i + 1) * square) - Math.max(from, i * square)) };
      })
      .filter((p) => p.amount >= 0.005);
  };

  const [at, setAt] = useState<number | null>(null);
  const [pinned, setPinned] = useState(false);
  const grid = useRef<HTMLDivElement>(null);

  // a tap anywhere else closes a pinned card
  useEffect(() => {
    if (!pinned) return;
    const close = (e: PointerEvent) => {
      if (!grid.current?.contains(e.target as Node)) {
        setPinned(false);
        setAt(null);
      }
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [pinned]);

  const squareOf = (e: ReactPointerEvent) => {
    const i = (e.target as HTMLElement).dataset.i;
    return i === undefined ? null : Number(i);
  };
  const onHover = (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse" || pinned) return;
    setAt(squareOf(e));
  };
  const onTap = (e: ReactPointerEvent) => {
    if (e.pointerType === "mouse") return;
    const i = squareOf(e);
    const again = i === null || (pinned && at === i);
    setPinned(!again);
    setAt(again ? null : i);
  };
  const onKey = (e: KeyboardEvent) => {
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -COLS, ArrowDown: COLS }[e.key];
    if (e.key === "Escape") setAt(null);
    if (!step) return;
    e.preventDefault();
    setAt((i) => Math.max(0, Math.min(held - 1, (i ?? 0) + step)));
  };

  const shown = at === null ? [] : pieces(at);
  const col = at === null ? 0 : at % COLS;

  return (
    <div
      ref={grid}
      {...(held && {
        tabIndex: 0,
        role: "group",
        "aria-label": `${fmtMoney(total, true)} a month: ${apps.map((a) => `${a.name} ${fmtMoney(a.mrr, true)}`).join(", ")}`,
        onPointerOver: onHover,
        onPointerLeave: () => !pinned && setAt(null),
        onPointerUp: onTap,
        onFocus: () => setAt((i) => i ?? 0),
        onBlur: () => !pinned && setAt(null),
        onKeyDown: onKey,
      })}
      className="relative rounded-md"
    >
      <div className="grid grid-cols-20 gap-1">
        {Array.from({ length: SQUARES }, (_, i) => (
          <div
            key={i}
            data-i={i < held ? i : undefined}
            className={`aspect-square rounded-[3px] ${
              i < full ? "bg-mask" : i === full ? "earning bg-heat-0" : "bg-heat-0"
            } ${i === at ? "outline-2 outline-offset-1 outline-ink/70" : ""}`}
          >
            {i === full && part > 0 && (
              <div
                className="earning-fill"
                // any money shows at least 15%, and the colour deepens toward the full-square violet
                style={{
                  height: `${15 + 85 * part}%`,
                  background: `color-mix(in oklch, var(--mask-soft), var(--mask) ${50 + 50 * part}%)`,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {at !== null && (
        <div
          aria-hidden
          style={{ left: `${((col + 0.5) / COLS) * 100}%`, top: `${Math.floor(at / COLS) * 20}%` }}
          className={`pointer-events-none absolute z-20 mt-[-8px] w-max min-w-48 -translate-y-full rounded-2xl border border-card-border bg-card/92 p-2.5 text-left text-xs text-ink/70 shadow-lg backdrop-blur-md ${
            col < 6 ? "-translate-x-6" : col > 13 ? "-translate-x-[calc(100%-1.5rem)]" : "-translate-x-1/2"
          }`}
        >
          <p className="mb-1.5 flex items-baseline justify-between gap-4 px-1">
            <span className="font-semibold text-ink">Square {at + 1}</span>
            <span className="font-mono tabular-nums">
              {at < full ? fmtMoney(square, true) : `${fmtMoney(total - full * square, true)} of ${fmtMoney(square)}`}
            </span>
          </p>
          <ul className="flex flex-col gap-1">
            {shown.map((p) => (
              <li key={p.name} className="flex items-center gap-2 rounded-lg bg-ink/5 px-1.5 py-1">
                {p.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.icon} alt="" className="h-5 w-5 rounded-[6px] object-cover" />
                ) : (
                  <span className="w-5 text-center">{p.emoji}</span>
                )}
                <span className="flex-1 font-medium text-ink">{p.name}</span>
                <span className="font-mono tabular-nums">{fmtMoney(p.amount, true)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
