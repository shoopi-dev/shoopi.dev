"use client";

import { useSyncExternalStore } from "react";

/* shared 1s clock, subscribed to like any external system - keeps SSR output
   stable and avoids calling setState inside an effect */
let now = 0;
let timer: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  if (!timer) {
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

const getSnapshot = () => now || (now = Date.now());
const getServerSnapshot = () => 0; // placeholders until hydrated

function parts(deadline: string, from: number) {
  const s = Math.floor(Math.max(0, new Date(deadline).getTime() - from) / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    min: Math.floor((s % 3600) / 60),
    sec: s % 60,
  };
}

export function Countdown({ deadline }: { deadline: string }) {
  const clock = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const t = clock ? parts(deadline, clock) : null;

  return (
    <div className="flex items-baseline justify-center gap-3 sm:gap-6">
      <div className="flex items-baseline gap-2">
        <span className="font-display text-4xl font-bold tabular-nums tracking-[-0.02em] sm:text-5xl">
          {t?.days ?? "–"}
        </span>
        <span className="text-sm font-medium text-ink/60">days</span>
      </div>
      {(
        [
          ["hrs", t?.hours],
          ["min", t?.min],
          ["sec", t?.sec],
        ] as const
      ).map(([label, value]) => (
        <div key={label} className="flex items-baseline gap-1.5">
          <span className="w-[2ch] font-display text-xl font-semibold tabular-nums tracking-[-0.01em] sm:text-2xl">
            {value ?? "–"}
          </span>
          <span className="text-xs font-medium text-ink/60">{label}</span>
        </div>
      ))}
    </div>
  );
}
