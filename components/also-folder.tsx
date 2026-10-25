"use client";

import { useRef } from "react";
import { externalProps } from "@/lib/link";
import { Pop } from "./animate";
import { LiquidTile } from "./app-icon";

export type FolderItem = {
  name: string;
  line: string;
  href: string;
  /** an image fills the mini tile; without one it shows the code glyph on the button blue */
  icon?: string;
};

function Mini({ item, className }: { item: FolderItem; className: string }) {
  return item.icon ? (
    <span className={`overflow-hidden bg-card shadow-md ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.icon} alt="" className="h-full w-full object-contain" />
    </span>
  ) : (
    <span className={`grid place-items-center bg-button text-on-button shadow-md ${className}`}>
      <svg
        viewBox="0 0 24 24"
        className="h-[58%] w-[58%]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
      </svg>
    </span>
  );
}

/** the side projects as a springboard folder: one tile of mini icons that opens
    like iOS, zooming out of the tile and back into it. The links sit in the
    dialog's HTML from the first render, so they are there for crawlers too */
export function AlsoFolder({ items, delay = 0 }: { items: FolderItem[]; delay?: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);

  const zoom = (open: boolean) => {
    const tile = trigger.current?.querySelector(".tile-liquid");
    const el = panel.current;
    if (!tile || !el || matchMedia("(prefers-reduced-motion: reduce)").matches) return Promise.resolve();
    const a = tile.getBoundingClientRect();
    const b = el.getBoundingClientRect();
    const dx = a.left + a.width / 2 - (b.left + b.width / 2);
    const dy = a.top + a.height / 2 - (b.top + b.height / 2);
    const shut = { transform: `translate(${dx}px, ${dy}px) scale(${Math.max(0.15, a.width / b.width)})`, opacity: 0 };
    const wide = { transform: "none", opacity: 1 };
    return el
      .animate(open ? [shut, wide] : [wide, shut], {
        duration: open ? 420 : 240,
        easing: open ? "cubic-bezier(0.2, 0.9, 0.25, 1.08)" : "cubic-bezier(0.4, 0, 0.8, 0.4)",
        fill: "both",
      })
      .finished.then(() => undefined);
  };

  const open = () => {
    dialog.current?.showModal();
    zoom(true);
  };

  const close = async () => {
    if (closing.current || !dialog.current?.open) return;
    closing.current = true;
    await zoom(false);
    dialog.current.close();
    panel.current?.getAnimations().forEach((a) => a.cancel());
    closing.current = false;
    trigger.current?.focus();
  };

  return (
    <>
      <Pop delay={delay} className="flex">
        <button
          ref={trigger}
          type="button"
          onClick={open}
          aria-haspopup="dialog"
          aria-label={`Also: ${items.map((i) => i.name).join(", ")}`}
          className="flex cursor-pointer flex-col items-center gap-2.5 rounded-[26px]"
        >
          <LiquidTile delay={delay}>
            <span className="relative mt-3.5 grid grid-cols-[repeat(2,34px)] gap-[9px] self-start" aria-hidden>
              {items.map((item) => (
                <Mini key={item.name} item={item} className="h-[34px] w-[34px] rounded-[9px]" />
              ))}
            </span>
          </LiquidTile>
          <span className="text-sm font-medium" aria-hidden>
            Also
          </span>
          <span className="rounded-full bg-raised px-2 py-0.5 text-xs font-semibold text-ink-2" aria-hidden>
            Side projects
          </span>
        </button>
      </Pop>

      <dialog
        ref={dialog}
        aria-label="Also"
        className="folder"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div ref={panel} className="w-[min(100%,420px)]">
          <p className="mb-3.5 text-center font-display text-3xl font-bold tracking-tight">Also</p>
          <div className="glass relative rounded-[30px] p-2.5">
            {/* .glass-pill sets its own position, so the wrapper places it */}
            <span className="absolute -top-12 right-0">
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="glass-pill h-9 w-9 cursor-pointer rounded-full text-lg leading-none"
              >
                ×
              </button>
            </span>
            <ul>
              {items.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    {...externalProps(item.href)}
                    className="flex items-center gap-3.5 rounded-[20px] p-3 transition-colors hover:bg-ink/5"
                  >
                    <Mini item={item} className="h-13 w-13 shrink-0 rounded-[13px]" />
                    <span className="min-w-0">
                      <span className="block font-display font-bold">{item.name}</span>
                      <span className="block text-xs leading-relaxed text-ink/60">{item.line}</span>
                    </span>
                    <span className="ml-auto text-ink/40" aria-hidden>
                      {item.href.startsWith("/") ? "→" : "↗"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </dialog>
    </>
  );
}
