"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { stampstory as s } from "@/data/stampstory";
import { APPLE_PATH, StoreBadge } from "@/components/stampstory";
import { externalProps } from "@/lib/link";
import { start } from "./story-engine";
import "./story.css";

/*
 * StampStory's landing page as a scroll story (picked by Itay on 2026-10-25 from five directions, its
 * mock is ~/Dev/html_assets/stampstory/site/b-story.html): "How many countries have you been to?",
 * then a sample traveler's memories fly into the app's toy globe, the passport fills, the card is
 * posted and a welcome lands. Everything is drawn here in the app's own look, never a screenshot, and
 * story-engine.ts moves it as the page scrolls.
 */

// the app's text face (Inter on Android, SF on iPhone); headings stay in the site's Bricolage
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const S = s.story;
const IOS = s.store.ios.status === "live" ? s.store.ios.url : undefined;
const PLAY = s.store.android.status === "live" ? s.store.android.url : undefined;
const WAITLIST = "/stampstory/android";
const ICON = "/stampstory/icon.png";
const TRAVELER = "/stampstory/story/traveler.webp";

function Apple() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d={APPLE_PATH} />
    </svg>
  );
}

/** The stores' badges, the site's own; Android says "Coming soon" and offers the waitlist under them. */
function Badges({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <StoreBadge store="ios" href={IOS} delay={delay} />
        <StoreBadge store="android" href={PLAY} delay={delay + 0.06} />
      </div>
      {!PLAY && (
        <p className="text-xs text-ink/60">
          On Android?{" "}
          <Link href={WAITLIST} className="font-semibold text-ink underline decoration-dotted underline-offset-4">
            Join the waitlist
          </Link>
        </p>
      )}
    </div>
  );
}

export function StampStoryStory() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => start(root.current!), []);
  const q = S.question;

  return (
    <div ref={root} className={`ss ${inter.variable}`}>
      <section className="story" aria-label="How StampStory works">
        <div className="stage">
          <canvas className="globe" aria-hidden />
          <svg className="trail" width="1" height="1" aria-hidden>
            <path fill="none" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 9" />
          </svg>

          {/* 0. the question */}
          <div className="ask">
            <h1>
              {q.before}
              <em>{q.you}</em>
              {q.after}
            </h1>
            <p className="bubble">
              {S.um}{" "}
              {S.guesses.map((g, i) => (
                <span key={g} className={`g on ${i < S.guesses.length - 1 ? "x" : "last"}`}>
                  {g}
                </span>
              ))}
            </p>
            <Badges className="own" delay={0.3} />
            <div className="scroll-hint" aria-hidden>
              <span />
              {S.hint}
            </div>
          </div>

          {/* 1-5. what each stage says */}
          {S.stages.map((st, i) => (
            <div className="cap" data-stage={i + 1} key={st.step}>
              <span className="step">{st.step}</span>
              <h2>{st.title}</h2>
              <p>{st.body}</p>
            </div>
          ))}

          <div className="count" aria-hidden>
            <span className="chip cn">
              <b className="cnum">0</b> <span className="cword">{S.count.many}</span>
            </span>
            <span className="chip hot cp">
              <b>10%</b> {S.count.world}
            </span>
            <span className="chip cc">
              <b>6/6</b> {S.count.continents}
            </span>
          </div>

          {/* the sample traveler's memories, each one of the trip's countries */}
          <div className="piece" data-country="Japan" aria-hidden>
            <div className="bp">
              <div className="band">
                <span>Boarding</span>
              </div>
              <div className="body">
                <small>Boarding pass · Gate 34</small>
                <div className="row">
                  <span className="code">HND</span>
                  <span className="where">Tokyo, Japan</span>
                </div>
                <small>Seat 14A · {S.traveler}</small>
              </div>
              <div className="stub">
                14A
                <br />✈
              </div>
            </div>
          </div>
          <div className="piece" data-country="France" aria-hidden>
            <div className="metro">
              <b>PARIS</b>
              <small>
                METRO · FRANCE
                <br />1 TRIP · ZONE 1
              </small>
            </div>
          </div>
          <div className="piece" data-country="Peru" aria-hidden>
            <div className="coin">
              <div>
                <b>1</b>
                <small>SOL · PERU</small>
              </div>
            </div>
          </div>
          <div className="piece" data-country="Mexico" aria-hidden>
            <div className="rubber">
              <div>
                <small>ENTRADA</small>
                <b>MEXICO</b>
                <small>12 MAR · CDMX</small>
              </div>
            </div>
          </div>
          <div className="piece" data-country="Greece" aria-hidden>
            <div className="post">
              <div className="art">
                <b>Greetings from Greece</b>
                <i />
                <i />
                <i />
              </div>
              <div className="side">
                <span className="st">☀️</span>
                <small>
                  Wish you
                  <br />
                  were here!
                  <br />- S
                </small>
              </div>
            </div>
          </div>
          <div className="piece" data-country="South Africa" aria-hidden>
            <div className="tag">
              <b>CPT</b>
              <small>
                Cape Town
                <br />
                South Africa
              </small>
              <i />
            </div>
          </div>
          <div className="piece" data-country="Thailand" aria-hidden>
            <div className="key">
              <b>Riverside Hotel</b>
              <small>BANGKOK · THAILAND</small>
              <span className="room">708</span>
              <span className="chipk" />
            </div>
          </div>

          {/* 3. the passport, on the app's own surface */}
          <div className="viz v-passport" aria-hidden>
            <div className="passport">
              <div className="pp-head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={TRAVELER} alt="" width={44} height={44} />
                <div>
                  <b>{S.traveler}</b>
                  <small>{S.passport}</small>
                </div>
                <span className="rank">Explorer</span>
              </div>
              <div className="pp-num">
                <b>23</b>
                <span>{S.count.many}</span>
                <small>
                  10% of
                  <br />
                  the world
                </small>
              </div>
              <div className="bars" />
              <div className="stamps" />
            </div>
          </div>

          {/* 4. the card, posted to a story */}
          <div className="viz v-share" aria-hidden>
            <div className="share">
              <div className="phonebox">
                <div className="phone">
                  <div className="screen">
                    <div className="ui-top">
                      <div className="prog">
                        <i />
                        <i />
                        <i />
                      </div>
                      <div className="who">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={TRAVELER} alt="" width={20} height={20} />
                        Your story · now
                      </div>
                    </div>
                    <div className="card">
                      <div className="waves" />
                      <div className="inner">
                        <div className="hd">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={TRAVELER} alt="" width={58} height={74} />
                          <div>
                            <small>{S.passport}</small>
                            <b>{S.traveler}</b>
                            <div className="big">
                              <strong>23</strong>
                              <span>{S.count.many}</span>
                            </div>
                          </div>
                        </div>
                        <div className="tags">
                          <i>Explorer</i>
                          <i>6/6 {S.count.continents}</i>
                          <i>10% {S.count.world}</i>
                        </div>
                        <canvas className="mini" width={476} height={236} />
                        <div className="flags" />
                        <div className="mrz">
                          P&lt;STSRIVERA&lt;&lt;SAM&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                          <br />
                          023COUNTRIES&lt;&lt;06CONTINENTS&lt;&lt;10PCT&lt;&lt;&lt;&lt;
                        </div>
                      </div>
                      <div className="dl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={ICON} alt="" width={30} height={30} />
                        <div>
                          <b>{s.name}</b>
                          <small>{s.tagline}</small>
                        </div>
                      </div>
                      <div className="get">Make your own map · stampstory.shoopi.dev/get</div>
                    </div>
                    <div className="ui-bot">
                      <span>Send message</span>
                      <b>♡</b>
                    </div>
                    <span className="heart">❤️</span>
                    <span className="heart">😍</span>
                    <span className="heart">✈️</span>
                  </div>
                </div>
              </div>
              <span className="post-btn">
                <span className="post-label" data-post={S.post} data-posted={`${S.posted} ✓`}>
                  {S.post}
                </span>
              </span>
            </div>
          </div>

          {/* 5. a welcome lands */}
          <svg className="plane" viewBox="0 0 48 48" aria-hidden>
            <path
              fill="#fff"
              stroke="#14306b"
              strokeWidth="1.6"
              strokeLinejoin="round"
              d="M44 24c0-1.6-1.4-2.6-3-2.6H30.2L19.6 5.2h-4.2l5.2 16.2H10.4L7 16.6H3.6l2.4 7.4-2.4 7.4H7l3.4-4.8h10.2l-5.2 16.2h4.2l10.6-16.2H41c1.6 0 3-1 3-2.6z"
            />
          </svg>
          <div className="notif glass" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ICON} alt="" width={38} height={38} />
            <div>
              <div className="top">
                <span>{S.welcome.from}</span>
                <span>{S.welcome.when}</span>
              </div>
              <b>{S.welcome.title}</b>
              <p>{S.welcome.body}</p>
            </div>
          </div>
          <span className="tap" aria-hidden />
        </div>
      </section>

      {/* ============ the ending ============ */}
      <section className="end" id="get">
        <div className="orbie reveal" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="arm" src="/stampstory/story/orbie-cheer-arm.webp" alt="" width={300} height={300} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="bodyimg" src="/stampstory/story/orbie-cheer.webp" alt="" width={300} height={300} />
        </div>
        <h2 className="reveal">{S.end.title}</h2>
        <p className="line reveal">{s.subtitle}</p>
        <Badges className="end-badges reveal" />
        <button type="button" className="again reveal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          {S.end.again}
        </button>
        <div className="facts glass reveal">
          {S.end.facts.map((f) => (
            <div key={f.title}>
              <b>{f.title}</b>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
        <Link href="/stampstory/privacy" className="policy reveal">
          Read the privacy policy
        </Link>
      </section>

      {/* how far through the story */}
      <div className="progress" aria-hidden>
        <i />
      </div>

      {/* a quick way in: by the theme toggle on a computer, along the bottom with the skip on a phone */}
      <div className="dock">
        <div className="install glass off" role="complementary" aria-label={`Get ${s.name}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ICON} alt="" width={34} height={34} />
          <div className="t">
            <b>{s.name}</b>
            <small className="not-android">{S.bar.ios}</small>
            <small className="only-android">{S.bar.android}</small>
          </div>
          {IOS && (
            <a className="get not-android" href={IOS} {...externalProps(IOS)}>
              <Apple />
              App Store
            </a>
          )}
          <Link className="get only-android" href={WAITLIST}>
            {S.bar.join}
          </Link>
        </div>
        <button type="button" className="glass-pill skip off">
          <span className="long">{S.skip.long}</span>
          <span className="short">{S.skip.short}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
