"use client";

/* eslint-disable @next/next/no-img-element -- the art is small, fixed and already sized; next/image would only add a loader */
import { useEffect, useRef, type CSSProperties } from "react";
import { wordlah as w } from "@/data/wordlah";
import { Rise } from "@/components/animate";
import { StoreBadge } from "@/components/stampstory";
import { ANSWER, CARD_WORDS, DAY, PUZZLE } from "./game";
import { ART, Board, Bubble, Flip, Leaderboard, Row, ShareGrid, Skyline, Sun, Tile, WordCard } from "./pieces";
import { start } from "./play-engine";
import "./play.css";

/*
 * WordLah's landing page (picked by Itay on 2026-10-28 from four directions; its mock is
 * ~/Dev/html_assets/wordlah/site/a-play.html): beside the headline, a drawn phone plays a round of the game on the
 * Horizon sky on a loop, a clip to watch rather than a demo to play (Itay, 2026-10-28); below it, the word card, the
 * Merlion to poke, today's board and the rest of the game. Everything is drawn in the game's own look, never a
 * screenshot, and play-engine.ts moves it.
 */

const P = w.play;
const IOS = w.store.ios.status === "live" ? w.store.ios.url : undefined;
const PLAY = w.store.android.status === "live" ? w.store.android.url : undefined;
const ICON = "/wordlah/icon.png";
const KEYS = ["QWERTYUIOP", "ASDFGHJKL", "+ZXCVBNM-"];

/** The stores' badges, the site's own; both say "Coming soon" until the app is out. */
function Badges({ delay = 0 }: { delay?: number }) {
  return (
    <div className="badges" data-badges>
      <StoreBadge store="ios" href={IOS} delay={delay} />
      <StoreBadge store="android" href={PLAY} delay={delay + 0.06} />
    </div>
  );
}

function Back() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

function Gear() {
  return (
    <svg className="gear" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  );
}

function Delete() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
      <path d="M18 9l-6 6M12 9l6 6" />
    </svg>
  );
}

/** The sparks a win throws around the sun. */
function Sparks() {
  return Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2 + 0.3;
    const r = 62 + (i % 3) * 14;
    // rounded, so the server and the browser write the same numbers
    const px = (v: number) => `${Math.round(v * 10) / 10}px`;
    const style = { "--x": px(Math.cos(a) * r), "--y": px(Math.sin(a) * r), "--d": `${(i % 4) * 0.12 + 0.9}s` } as CSSProperties;
    return (
      <span key={i} className="spark" style={style}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 0c.8 6.4 4.9 10.6 12 12-7.1 1.4-11.2 5.6-12 12-.8-6.4-4.9-10.6-12-12C7.1 10.6 11.2 6.4 12 0z" />
        </svg>
      </span>
    );
  });
}

/**
 * The game's screen in a drawn phone, playing a round on its own: the sky, the sun, the skyline, the board, the
 * keyboard and the end card. Nothing in it takes a tap; it reads as one picture.
 */
function Phone() {
  return (
    <div className="phone">
      <div className="screen" role="img" aria-label={`A round of WordLah playing: ${DAY.map(([g]) => g).join(", ")}, then the word card for ${ANSWER}`}>
        <div className="sky dusk" />
        <div className="sky morning" />
        <div className="island" />
        <div className="topbar">
          <Back />
          <span className="title">
            Puzzle {PUZZLE}
          </span>
          <Gear />
        </div>
        <span className="sunbox">
          <Sun />
          <Sparks />
        </span>
        <div className="skyline">
          <Skyline />
        </div>
        <div className="boardbox on-sky">
          <Board />
        </div>
        <div className="deck">
          {KEYS.map((row, i) => (
            <div key={row} className={`krow${i === 1 ? " mid" : ""}`}>
              {[...row].map((k) =>
                k === "+" ? (
                  <span key={k} className="key wide enter">
                    <span>ENTER</span>
                  </span>
                ) : k === "-" ? (
                  <span key={k} className="key wide">
                    <Delete />
                  </span>
                ) : (
                  <span key={k} className="key" data-key={k}>
                    <span>{k}</span>
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
        <div className="endcard">
          <WordCard word={ANSWER} />
        </div>
        <div className="home-bar" />
      </div>
    </div>
  );
}

export function WordlahPlay() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => start(root.current!), []);
  const [before, word, after] = w.tagline;

  return (
    <div ref={root} className="wlp">
      <div className="install glass-pill hide" aria-hidden>
        <img src={ICON} alt="" width={26} height={26} />
        <span>{P.bar}</span>
      </div>

      <main className="wrap">
        <section className="hero">
          <div className="pitch">
            <Rise className="name" delay={0.05}>
              <img src={ICON} alt="" width={44} height={44} />
              {w.name}
            </Rise>
            <Rise as="h1" delay={0.1}>
              {before} <em>{word}</em> {after}
            </Rise>
            <Rise as="p" delay={0.16} className="sub">
              {w.subtitle}
            </Rise>
            <Badges delay={0.24} />
            <Rise as="p" delay={0.3} className="adults">
              {P.adults}
            </Rise>
          </div>

          <Rise className="stage" delay={0.12}>
            <Phone />
          </Rise>
        </section>

        <section className="rows">
          <article className="feature glass reveal">
            <div>
              <span className="kicker">{P.card.kicker}</span>
              <h2>{P.card.title}</h2>
              <p>{P.card.body}</p>
            </div>
            <div className="piece">
              <div className="cards">
                {CARD_WORDS.map((cw, i) => (
                  <WordCard key={cw} word={cw} className={i === 0 ? "on" : ""} />
                ))}
                <span className="dots" aria-hidden>
                  {CARD_WORDS.map((cw, i) => (
                    <i key={cw} className={i === 0 ? "on" : ""} />
                  ))}
                </span>
              </div>
            </div>
          </article>

          <article className="feature glass reveal">
            <div>
              <span className="kicker">{P.sun.kicker}</span>
              <h2>{P.sun.title}</h2>
              <p>{P.sun.body}</p>
            </div>
            <div className="piece">
              <button type="button" className="poke" aria-label="Poke the Merlion">
                <Sun />
                <Flip />
                <Bubble>{P.sun.bubble}</Bubble>
                <span className="count">Tap him</span>
              </button>
            </div>
          </article>

          <article className="feature glass reveal">
            <div>
              <span className="kicker">{P.board.kicker}</span>
              <h2>{P.board.title}</h2>
              <p>{P.board.body}</p>
            </div>
            <div className="piece">
              <div className="boardpiece">
                <Leaderboard />
                <div className="sharebox">
                  <ShareGrid />
                  <span>
                    <b>{P.board.share}</b>
                    <span className="t">{P.board.shareBody}</span>
                  </span>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="more glass reveal">
          <span className="kicker">{P.more.kicker}</span>
          <h2>{P.more.title}</h2>
          <div className="grid">
            <Item text={P.more.boosters}>
              <Tile letter="✦" kind="orchid" />
              <Tile letter="−3" kind="orchid" />
              <Tile letter="+1" kind="orchid" />
            </Item>
            <Item text={P.more.mama}>
              <img className="mama" src={`${ART}/mama-wave.webp`} alt="Mama, waving" width={159} height={280} />
            </Item>
            <Item text={P.more.cheem}>
              <span className="cheem">
                <Row word="K A  " marks="reme" length={5} />
              </span>
            </Item>
            <Item text={P.more.previous}>
              <span className="cal">
                {["22", "23", "24", "25", "26", "27", "28"].map((d, k) => (
                  <Tile key={d} letter={d} kind={k === 2 ? "out" : k === 5 ? "empty" : k % 2 ? "moved" : "right"} />
                ))}
              </span>
            </Item>
            <Item text={P.more.reminder}>
              <span className="notif">
                <img src={ICON} alt="" width={34} height={34} />
                <span>
                  <b>
                    WordLah! <small>9:00</small>
                  </b>
                  <span>{P.more.reminderLine}</span>
                </span>
              </span>
            </Item>
            <Item text={P.more.guest}>
              <span className="guestrow">
                <span>Play as guest</span>
                <span>Apple</span>
                <span>Google</span>
              </span>
            </Item>
          </div>
        </section>

        <section className="end">
          <img className="cheer reveal" src={`${ART}/merlion-cheer.webp`} alt="The Merlion, cheering" width={420} height={506} />
          <h2 className="reveal">{P.end.title}</h2>
          <p className="reveal">{P.end.body}</p>
          <Badges />
        </section>
      </main>
    </div>
  );
}

/** One of the rest of the game's features: a small piece of it, its name and a line. */
function Item({ text: [title, body], children }: { text: string[]; children: React.ReactNode }) {
  return (
    <div className="item">
      <div className="art">{children}</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}
