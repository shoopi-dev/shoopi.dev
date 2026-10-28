import type { ReactNode } from "react";
import { Baloo_2, Figtree } from "next/font/google";
import "./wordlah.css";

// the game's own faces: Baloo 2 for its letters, bubbles and buttons, Figtree for its own text
const baloo = Baloo_2({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-baloo" });
const figtree = Figtree({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], variable: "--font-figtree" });

/** Puts a WordLah page in the game's colours and faces (wordlah.css), over the site's aurora. */
export function WordlahGround({ children }: { children: ReactNode }) {
  return <div className={`wl-ground ${baloo.variable} ${figtree.variable}`}>{children}</div>;
}
