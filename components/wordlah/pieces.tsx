/* eslint-disable @next/next/no-img-element -- the art is small, fixed and already sized; next/image would only add a loader */
import type { CSSProperties, ReactNode } from "react";
import { BOARD, DAY, WORDS, YOU, type Marks, type Origin } from "./game";

/*
 * WordLah's pieces, drawn from the app's own tokens (wordlah.css): tiles with their lips, the game's board, the
 * Marina Bay skyline, the Merlion as the sun, the word card, today's leaderboard and a share picture's grid. A piece
 * is sized by the font-size where it lands: 1em is one tile.
 */

export const ART = "/wordlah/art";

const KIND: Record<string, string> = { r: "right", m: "moved", o: "out", e: "empty", t: "typed", p: "orchid" };

export type TileKind = "right" | "moved" | "out" | "empty" | "typed" | "orchid";

/** One tile: its face, the lip under it and its letter in Baloo. */
export function Tile({ letter = "", kind = "typed", style }: { letter?: string; kind?: TileKind; style?: CSSProperties }) {
  return (
    <span className={`wl-tile k-${kind}`} style={style}>
      <b>{letter}</b>
    </span>
  );
}

/** A row of tiles from [word] and its marks (r, m, o, p per letter); padded with empty tiles to [length]. */
export function Row({ word = "", marks = "", length = word.length }: { word?: string; marks?: Marks; length?: number }) {
  return (
    <span className="wl-row">
      {[...word.padEnd(length)].map((ch, i) => {
        const letter = ch.trim();
        return <Tile key={i} letter={letter} kind={(KIND[marks[i]] ?? (letter ? "typed" : "empty")) as TileKind} />;
      })}
    </span>
  );
}

/** The game's board: six rows of five, [rows] filled from the top. */
export function Board({ rows = [] }: { rows?: [string, Marks][] }) {
  return (
    <span className="wl-board">
      {Array.from({ length: 6 }, (_, i) => (
        <Row key={i} word={rows[i]?.[0] ?? ""} marks={rows[i]?.[1] ?? ""} length={5} />
      ))}
    </span>
  );
}

/** Singapore's skyline as the game draws it: towers, Marina Bay Sands, the Supertrees; it fills its box. */
export function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg className={`wl-skyline ${className}`} viewBox="0 0 1320 300" preserveAspectRatio="none" aria-hidden>
      <g fill="currentColor">
        <rect x="0" y="150" width="120" height="150" />
        <rect x="130" y="190" width="90" height="110" />
        <rect x="230" y="210" width="110" height="90" />
        <rect x="380" y="90" width="44" height="210" />
        <rect x="470" y="90" width="44" height="210" />
        <rect x="560" y="90" width="44" height="210" />
        <path d="M350 82 Q480 60 640 70 L640 92 L350 96 Z" />
        <path d="M700 200 L760 200 L742 300 L718 300 Z" />
        <path d="M688 192 Q730 172 772 192 Z" />
        <path d="M800 230 L846 230 L832 300 L814 300 Z" />
        <path d="M790 224 Q823 208 856 224 Z" />
        <rect x="890" y="240" width="120" height="60" />
        <rect x="1020" y="170" width="100" height="130" />
        <rect x="1130" y="120" width="80" height="180" />
        <rect x="1220" y="190" width="100" height="110" />
      </g>
    </svg>
  );
}

/** The Merlion's head as the sun, over slowly turning rays; size it with width. */
export function Sun({ face = "happy", alt = "" }: { face?: string; alt?: string }) {
  return (
    <span className="wl-sun">
      <i className="wl-rays" aria-hidden />
      <img src={`${ART}/merlion_${face}.webp`} alt={alt} width={400} height={400} draggable={false} />
    </span>
  );
}

/** A poke's flipbook (giggle, tease or huff): 28 frames in rows of 7, which the page's engine plays. */
export function Flip() {
  return <span className="wl-flip" aria-hidden />;
}

/** A speech bubble in Baloo, its tail at the bottom left or right. */
export function Bubble({ children, tail = "bl" }: { children: ReactNode; tail?: "bl" | "br" }) {
  return <span className={`wl-bubble t-${tail}`}>{children}</span>;
}

/** An origin tag in its own colours, by day and at night (the app's ExtraColors.originTag). */
export function OriginTag({ name }: { name: Origin }) {
  return <span className={`wl-origin o-${name.toLowerCase()}`}>{name}</span>;
}

/** The word card as the game's end shows it: the tiles, the part and origin, the sentence with the word marked, the meaning and what it says word for word. */
export function WordCard({ word, className = "" }: { word: string; className?: string }) {
  const w = WORDS[word];
  const [before, after] = w.sentence.split(word);
  return (
    <div className={`wl-card ${className}`}>
      <div className="wl-card-tiles">
        <Row word={word} marks={"r".repeat(word.length)} />
      </div>
      <p className="wl-card-tags">
        <i>{w.part}</i> <OriginTag name={w.origin} />
      </p>
      <p className="wl-card-sentence">
        “{before}
        <mark>{word}</mark>
        {after}”
      </p>
      <p className="wl-card-label">✦ What it means</p>
      <p className="wl-card-meaning">{w.meaning}</p>
      <p className="wl-card-literally">Literally: {w.literally}</p>
    </div>
  );
}

/** Today's leaderboard: the top five, the visitor's made-up name marked. */
export function Leaderboard() {
  return (
    <ol className="wl-leaderboard">
      {BOARD.map(([name, tries, time], i) => (
        <li key={name} className={name === YOU ? "you" : undefined} style={{ "--i": i } as CSSProperties}>
          <span className={`place p${i + 1}`}>{i + 1}</span>
          <span className="name">
            {name}
            {name === YOU && <small> you</small>}
          </span>
          <span className="tries">
            {tries} {tries === 1 ? "try" : "tries"}
          </span>
          <span className="time">{time}</span>
        </li>
      ))}
    </ol>
  );
}

/** A share picture's grid: the day's colours, never the letters. */
export function ShareGrid() {
  return (
    <span className="wl-share" aria-label="Three rows of coloured squares">
      {DAY.map(([, marks], r) => (
        <span key={r}>
          {[...marks].map((m, i) => (
            <i key={i} className={`k-${KIND[m]}`} />
          ))}
        </span>
      ))}
    </span>
  );
}
