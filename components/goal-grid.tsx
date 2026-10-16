"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import type { Share } from "@/lib/earnings";
import { fmtMoney } from "@/lib/format";

const COLS = 20;
const SQUARES = 100;
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/** the goal grid: a square lights once its full share of the goal is earned.
    Hover a square (tap on a phone, arrows from the keyboard) and a card floats
    above it with last month's money split by app; the squares an app lit stay
    bright and the rest dim, so the split shows on the grid itself */
export function GoalGrid({ apps, square, month }: { apps: Share[]; square: number; month: string | null }) {
  const total = apps.reduce((sum, a) => sum + a.proceeds, 0);
  // divide by the square rather than floor(pct): pct can land a hair under a whole number
  const filled = Math.min(SQUARES, Math.floor(total / square));
  // each lit square belongs to the app whose stretch of the total holds its middle
  const owner = (i: number) => {
    let reach = 0;
    return apps.findIndex((a) => (reach += a.proceeds) > (i + 0.5) * square);
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
    const i = squareOf(e);
    if (i !== null) setAt(i);
  };
  const onTap = (e: ReactPointerEvent) => {
    if (e.pointerType === "mouse") return;
    const i = squareOf(e);
    if (i === null) return;
    const again = pinned && at === i;
    setPinned(!again);
    setAt(again ? null : i);
  };
  const onKey = (e: KeyboardEvent) => {
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -COLS, ArrowDown: COLS }[e.key];
    if (e.key === "Escape") setAt(null);
    if (!step) return;
    e.preventDefault();
    setAt((i) => Math.max(0, Math.min(SQUARES - 1, (i ?? filled) + step)));
  };

  const owners = Array.from({ length: filled }, (_, i) => owner(i));
  const lit = at !== null && at < filled ? owners[at] : -1;
  const col = at === null ? 0 : at % COLS;
  const label = month
    ? new Date(`${month}-01T00:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })
    : "Last full month";

  return (
    <div
      ref={grid}
      tabIndex={0}
      role="group"
      aria-label={`${label}: ${apps.map((a) => `${a.name} ${fmtMoney(a.proceeds, true)}`).join(", ")}`}
      onPointerOver={onHover}
      onPointerLeave={() => !pinned && setAt(null)}
      onPointerUp={onTap}
      onFocus={() => setAt((i) => i ?? Math.min(filled, SQUARES - 1))}
      onBlur={() => !pinned && setAt(null)}
      onKeyDown={onKey}
      className="relative rounded-md"
    >
      <div className="grid grid-cols-20 gap-1">
        {Array.from({ length: SQUARES }, (_, i) => (
          <div
            key={i}
            data-i={i}
            className={`aspect-square rounded-[3px] transition-opacity duration-200 ${
              i < filled ? "bg-accent" : i === filled ? "next-square bg-ink/10" : "bg-ink/10"
            } ${i < filled && lit >= 0 && owners[i] !== lit ? "opacity-40" : ""} ${
              i === at ? "outline-2 outline-offset-1 outline-ink/70" : ""
            }`}
          />
        ))}
      </div>

      {at !== null && (
        <div
          aria-hidden
          style={{ left: `${((col + 0.5) / COLS) * 100}%`, top: `${Math.floor(at / COLS) * 20}%` }}
          className={`pointer-events-none absolute z-20 mt-[-8px] w-64 -translate-y-full rounded-2xl border border-white/70 bg-white/92 p-3 text-left text-xs text-ink/70 shadow-lg backdrop-blur-md ${
            col < 6 ? "-translate-x-6" : col > 13 ? "-translate-x-[calc(100%-1.5rem)]" : "-translate-x-1/2"
          }`}
        >
          <p className="mb-2 font-semibold uppercase tracking-wide">{label}</p>
          <ul className="flex flex-col gap-1">
            {apps.map((a, i) => (
              <li
                key={a.name}
                className={`flex items-center gap-2.5 rounded-lg px-1.5 py-1.5 ${i === lit ? "bg-accent/12 text-ink" : ""}`}
              >
                {a.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.icon} alt="" className="h-7 w-7 rounded-[8px] object-cover shadow-sm" />
                ) : (
                  <span className="w-7 text-center text-base">{a.emoji}</span>
                )}
                <span className="flex flex-1 flex-col gap-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-medium">{a.name}</span>
                    <span className="font-mono tabular-nums text-ink">{fmtMoney(a.proceeds, true)}</span>
                  </span>
                  <span className="h-1 overflow-hidden rounded-full bg-ink/10">
                    <span className="block h-full rounded-full bg-accent" style={{ width: `${total ? (a.proceeds / total) * 100 : 0}%` }} />
                  </span>
                  <span className="text-[11px] tabular-nums text-ink/60">
                    {total ? Math.round((a.proceeds / total) * 100) : 0}% · {plural(owners.filter((o) => o === i).length, "square")}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 border-t border-ink/10 pt-2 text-ink/60">
            {at < filled
              ? `Square ${at + 1} · lit by ${apps[lit]?.name}`
              : `Square ${at + 1} · lights at ${fmtMoney((at + 1) * square)}/mo`}
          </p>
        </div>
      )}
    </div>
  );
}
