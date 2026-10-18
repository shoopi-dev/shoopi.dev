"use client";

import { useLayoutEffect } from "react";
import { Pop } from "./animate";

const KEY = "theme";

/** Set before first paint so a saved dark choice never flashes light. Light is
    the default: only an explicit "dark" in storage changes it. */
export const themeScript = `try{if(localStorage.getItem("${KEY}")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}`;

/** Fixed sun / moon lens, top right on every page. The icon is picked by CSS
    from `data-theme`, so the server render never disagrees with the DOM. */
export function ThemeToggle() {
  // React's dev remount resets <html> attributes; put the saved one back. No-op in production
  useLayoutEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "dark") document.documentElement.setAttribute("data-theme", "dark");
    } catch {}
  }, []);

  const toggle = () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  };

  return (
    <Pop as="span" delay={0.3} className="fixed right-4 top-4 z-50 inline-flex sm:right-6 sm:top-6">
      <button
        type="button"
        onClick={toggle}
        aria-label="Toggle dark mode"
        title="Toggle dark mode"
        className="glass-pill inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink"
      >
        {/* sun in light, moon in dark */}
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px] dark:hidden"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className="hidden h-[18px] w-[18px] dark:block"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M20.5 14.1A8.5 8.5 0 1 1 9.9 3.5a7 7 0 0 0 10.6 10.6Z" />
        </svg>
      </button>
    </Pop>
  );
}
