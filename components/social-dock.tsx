"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/** the hero's social pills; once the hero scrolls away they dock at the bottom
    of the screen as one glass bar, so they are always one tap away. The slot
    keeps its height while docked, so the page never jumps */
export function SocialDock({ label, children }: { label: string; children: ReactNode }) {
  const slot = useRef<HTMLDivElement>(null);
  const [docked, setDocked] = useState(false);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const el = slot.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      const past = !e.isIntersecting && e.boundingClientRect.top < 0;
      if (past) setHeight(el.offsetHeight);
      setDocked(past);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={slot} className="mt-8 flex justify-center" style={docked ? { height } : undefined}>
      <nav aria-label={label} className={`dock flex flex-wrap justify-center gap-3 ${docked ? "docked glass" : ""}`}>
        {children}
      </nav>
    </div>
  );
}
