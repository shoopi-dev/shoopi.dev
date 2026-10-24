import type { ReactNode } from "react";
import { Atkinson_Hyperlegible_Next, Caveat, Young_Serif } from "next/font/google";
import "./paper.css";

// the app's own faces: Young Serif for its headings, Atkinson Hyperlegible Next for its text, Caveat for handwriting
const serif = Young_Serif({ subsets: ["latin"], weight: "400", variable: "--font-young-serif" });
const atkinson = Atkinson_Hyperlegible_Next({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-atkinson" });
const caveat = Caveat({ subsets: ["latin"], weight: "600", variable: "--font-caveat" });

/** Puts a Eureka page on the app's notebook paper, in its faces and colours (paper.css). */
export function EurekaPaper({ children }: { children: ReactNode }) {
  return <div className={`eu-paper ${serif.variable} ${atkinson.variable} ${caveat.variable}`}>{children}</div>;
}
