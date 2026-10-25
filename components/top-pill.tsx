import type { ReactNode } from "react";
import { Rise } from "./animate";
import { ThemeButton } from "./theme-toggle";

/** the slim pill at the top of a page: what the page is (or the way back), then the light
    and dark switch at its end. A page with it hides the floating toggle (globals.css) */
export function TopPill({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <Rise delay={delay} className="flex justify-center">
      <div className="glass-pill inline-flex items-center rounded-full py-1 pl-4 pr-1 text-[13px] font-medium text-ink/70">
        {children}
        <span className="ml-3 mr-1 h-5 w-px bg-ink/15" aria-hidden />
        <ThemeButton />
      </div>
    </Rise>
  );
}
