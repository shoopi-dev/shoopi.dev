"use client";

import { Fragment, useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import Link from "next/link";
import {
  AirplaneTilt,
  ArrowRight,
  ArrowsOutSimple,
  ArrowsSplit,
  Avocado,
  BatteryFull,
  Bell,
  BookmarkSimple,
  Cake,
  CaretLeft,
  CassetteTape,
  CellSignalFull,
  ChatCircleDots,
  Clock,
  CookingPot,
  Devices,
  Export,
  GearSix,
  GlobeSimple,
  Lightbulb,
  MagnifyingGlass,
  Microphone,
  MicrophoneSlash,
  MusicNotes,
  Package,
  PaintRoller,
  Play,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Stop,
  Trash,
  VideoCamera,
  WifiHigh,
  type IconWeight,
} from "@phosphor-icons/react";
import { eureka as e } from "@/data/eureka";
import { APPLE_PATH, PlayGlyph } from "@/components/stampstory";
import { externalProps } from "@/lib/link";
import { start } from "./story-engine";
import "./story.css";

/*
 * Eureka's landing page as a scroll story (picked by Itay on 2026-10-24 from four directions, its
 * mock is ~/Dev/html_assets/eureka/site/b-scatter.html): ideas scattered everywhere fly into the app,
 * one idea's page grows, a thought is said, old notes are sorted. The app is drawn here in its own
 * notebook look, never a screenshot, and story-engine.ts moves it as the page scrolls.
 */

const L = e.landing;
const IOS = e.store.ios.status === "live" ? e.store.ios.url : undefined;
const PLAY = e.store.android.status === "live" ? e.store.android.url : undefined;
const WAITLIST = "/eureka/android";

/** A Phosphor icon in an <i>, sized by its font-size as the app's icon font was. */
function I({ icon: Icon, w = "regular", className = "", style }: { icon: ElementType; w?: IconWeight; className?: string; style?: CSSProperties }) {
  return (
    <i className={`ph ${className}`} style={style} aria-hidden>
      <Icon weight={w} />
    </i>
  );
}

const vars = (o: Record<string, string>) => o as CSSProperties;
const hue = (name: string) => ({ color: `var(--i-${name})` });

function Apple() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d={APPLE_PATH} />
    </svg>
  );
}

/** The stores' own badges; a store the app is not on yet is greyed and says so. */
function Badges({ className = "" }: { className?: string }) {
  return (
    <div className={`badges ${className}`}>
      {IOS ? (
        <a className="badge" href={IOS} {...externalProps(IOS)}>
          <Apple />
          <span>
            <small>Download on the</small>
            <strong>App Store</strong>
          </span>
        </a>
      ) : (
        <span className="badge soon" aria-disabled="true" title="App Store - coming soon">
          <Apple />
          <span>
            <small>Coming soon to</small>
            <strong>App Store</strong>
          </span>
        </span>
      )}
      {PLAY ? (
        <a className="badge" href={PLAY} {...externalProps(PLAY)}>
          <PlayGlyph />
          <span>
            <small>Get it on</small>
            <strong>Google Play</strong>
          </span>
        </a>
      ) : (
        <span className="badge soon" aria-disabled="true" title="Google Play - coming soon">
          <PlayGlyph />
          <span>
            <small>Coming soon to</small>
            <strong>Google Play</strong>
          </span>
        </span>
      )}
    </div>
  );
}

function Waitlist({ className = "" }: { className?: string }) {
  if (PLAY) return null;
  return (
    <p className={`waitlist ${className}`}>
      On Android? <Link href={WAITLIST}>Join the waitlist</Link>
    </p>
  );
}

/** The iPhone the app is drawn in, at its own size: the engine scales it into its slot. */
function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="phone">
      <div className="screen dots">
        <div className="island" />
        <div className="status">
          <span>9:41</span>
          <span className="r">
            <I icon={CellSignalFull} w="fill" />
            <I icon={WifiHigh} w="bold" />
            <I icon={BatteryFull} w="fill" />
          </span>
        </div>
        {children}
        <div className="homebar" />
      </div>
    </div>
  );
}

const SPARK_PATH =
  "M8 2.64C8.44 5.92 10.08 7.56 13.36 8 10.08 8.44 8.44 10.08 8 13.36 7.56 10.08 5.92 8.44 2.64 8 5.92 7.56 7.56 5.92 8 2.64Z";
const Spark = () => (
  <svg viewBox="0 0 16 16" aria-hidden>
    <path d={SPARK_PATH} />
  </svg>
);

/* ---------- the demo: ideas a person really jots down (from Itay's voice session) ---------- */

/** Stage 1: six ideas, and the scraps they were scattered across. */
const IDEAS = [
  { id: "nb", icon: MusicNotes, hue: "spark", title: "Neighbor drum song", ch: "Verse: he only knows one fill" },
  { id: "hb", icon: Avocado, hue: "green", title: "Is it ripe yet app" },
  { id: "sc", icon: Cake, hue: "pink", title: "Dog birthday cakes", ch: "Added: ask Dana what's safe" },
  { id: "ky", icon: AirplaneTilt, hue: "sky", title: "Lisbon with mom" },
  { id: "lh", icon: Clock, hue: "blue", title: "Town clock, four minutes late", ch: "Saved: how tower clocks get repaired" },
  { id: "fo", icon: CookingPot, hue: "orange", title: "Grandma's soup, measured" },
];

/** The voice memo's waveform, the same every time. */
const WAVE = Array.from({ length: 22 }, (_, i) => 6 + Math.round(Math.abs(Math.sin(i * 1.7) * 16 + Math.sin(i * 0.6) * 6)));

/** Stage 2: the idea that grows, and the three thoughts said into it today. */
const SAID_TODAY = ["what if it did bananas too", "ok the ripe day ping works", "how does it know it's an avocado from a photo??"];
const SAID_BEFORE = [
  ["2 Oct", "avocado app. tells u which day to eat it"],
  ["4 Oct", "it's always either a rock or mush"],
  ["8 Oct", "photo on buying day, then a reminder?"],
];

/** Stage 3: one thought, said in one breath. */
const SPOKEN = "ok so the song about the neighbor, I think the bridge is where he finally plays a different fill";

/** Stage 4: a chat with yourself, and what AI made of it. */
const CHAT = [
  ["make a video of my cat judging my cooking", "9:14"],
  ["gift for dad: his old cassettes on a usb??", "22:40"],
  ["paint the hallway that green from the cafe in porto", "23:02"],
  ["app that shows which checkout line is faster", "8:17"],
  ["cake shaped like our building, w/ tiny balconies", "19:55"],
  ["newsletter of stuff overheard on the bus", "12:30"],
];
const SORTED = [
  { icon: VideoCamera, hue: "red", title: "Cat judges my cooking" },
  { icon: CassetteTape, hue: "orange", title: "Dad's cassettes, digitized" },
  { icon: PaintRoller, hue: "green", title: "Porto-green hallway" },
  { icon: ShoppingCart, hue: "sky", title: "Fastest checkout line" },
  { icon: Cake, hue: "pink", title: "Cake of our building" },
  { icon: ChatCircleDots, hue: "spark", title: "Overheard on the bus" },
  { icon: Package, hue: "yellow", title: "Time capsule for the kids" },
];

const goToEnd = (ev: React.MouseEvent) => {
  ev.preventDefault();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("get")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
};

export function EurekaStory({ fonts }: { fonts: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => start(root.current!), []);

  return (
    <div ref={root} className={`eu ${fonts}`}>
      <main>
        {/* ============ 1. Everywhere, then one place ============ */}
        <section className="stage s1" data-s="1">
          <div className="pin">
            <div className="glow hglow" aria-hidden />
            <div className="hA">
              <div className="appmark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/eureka/icon.png" alt="" />
                <span>Eureka</span>
              </div>
              <h1 className="s-title">{L.everywhere.title}</h1>
              <p className="s-copy">{L.everywhere.line}</p>
              <div className="getrow">
                <a className="getit not-android" href="#get" onClick={goToEnd}>
                  <Apple />
                  {L.getIt}
                </a>
                <Link className="getit only-android" href={WAITLIST}>
                  Join the Android waitlist
                  <I icon={ArrowRight} w="bold" />
                </Link>
                <span className="caps not-android">{L.androidSoon}</span>
                <span className="caps only-android">On iPhone now</span>
              </div>
            </div>
            <div className="hint" aria-hidden>
              <span>Scroll</span>
              <i />
            </div>

            <div className="wrap">
              <div className="text hB">
                <div className="appmark desk-only">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/eureka/icon.png" alt="" />
                  <span>Eureka</span>
                </div>
                <h2 className="s-title">
                  {L.onePlace.title} <span className="mark">{L.onePlace.mark.replace(" ", " ")}</span>
                </h2>
                <p className="s-copy">{L.onePlace.line}</p>
                <Badges className="bdg" />
                <Waitlist className="wl" />
              </div>
              <div className="slot ph" aria-hidden>
                <div className="fit" data-w="424" data-h="896" data-max="0.95">
                  <div className="glow" />
                  <div className="fit-in">
                    <Phone>
                      <div className="topbar">
                        <I icon={ArrowsOutSimple} />
                        <span className="r">
                          <I icon={MagnifyingGlass} />
                          <I icon={GearSix} />
                        </span>
                      </div>
                      <div className="home">
                        <div className="sc date">Friday · 24 October</div>
                        <div className="head">
                          <I icon={Lightbulb} w="bold" />
                          <h4>Ideas</h4>
                        </div>
                        <div className="count later">
                          <span className="c-i">0 ideas</span> · <span className="c-t">0 thoughts</span> this week
                        </div>
                        <div className="chips later">
                          <span className="on">All</span>
                          <span>App</span>
                          <span>Business</span>
                          <span>Story</span>
                          <span>Song</span>
                          <span>Recipe</span>
                          <span>Event</span>
                        </div>
                        <div className="sc label app-label later">Recent</div>
                        <div className="empty">Nothing here yet.</div>
                        <div className="rows">
                          {IDEAS.map((it) => (
                            <div className="row" data-id={it.id} key={it.id}>
                              <span className="sign" />
                              <I icon={it.icon} w="bold" className="ico" style={hue(it.hue)} />
                              <div className="ttl">
                                <span>{it.title}</span>
                              </div>
                              <div className="ai" data-new="New idea, from what you said" data-ch={it.ch} />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="cbar">
                        <div className="capsule">
                          <I icon={Plus} />
                          <span>Capture a thought…</span>
                        </div>
                        <div className="mic">
                          <I icon={Microphone} />
                        </div>
                      </div>
                    </Phone>
                  </div>
                </div>
              </div>
            </div>

            {/* the scraps: data-row is the idea each lands in; data-o its order on a computer, data-mo on a phone (none: not on a phone) */}
            <div aria-hidden>
              <div className="frag f-chat" data-row="nb" data-o="0" data-mo="0" data-x=".15" data-y=".22" data-mx=".33" data-my=".125" data-r="-6" style={vars({ "--in": ".05s" })}>
                <div className="bubble">
                  omg the neighbor drums every night at 9. that&apos;s a song<span className="meta">11:52 PM ✓✓</span>
                </div>
              </div>
              <div className="frag f-notes" data-row="hb" data-o="1" data-mo="1" data-x=".2" data-y=".79" data-mx=".27" data-my=".8" data-r="4" style={vars({ "--in": ".2s" })}>
                <div className="n card-frag">
                  <div className="h">
                    <span>Notes</span>
                    <span>2 Oct</span>
                  </div>
                  <p>avocado app. tells u which day to eat it</p>
                </div>
              </div>
              <div className="frag f-sticky" data-row="sc" data-o="2" data-mo="2" data-x=".85" data-y=".2" data-mx=".8" data-my=".205" data-r="7" style={vars({ "--in": ".12s" })}>
                <div className="n">dog cakes?? peanut butter + banana</div>
              </div>
              <div className="frag f-mail" data-row="nb" data-o="3" data-mo="3" data-x=".39" data-y=".86" data-mx=".74" data-my=".83" data-r="3" style={vars({ "--in": ".32s" })}>
                <div className="n card-frag">
                  <div className="h">
                    <span>Draft</span>
                    <span>Tue</span>
                  </div>
                  <div className="ln">
                    To: <b>me</b>
                  </div>
                  <div className="ln">
                    Subject: <b>idea</b>
                  </div>
                  <p>verse: he only ever learned one fill...</p>
                </div>
              </div>
              <div className="frag f-todo" data-row="ky" data-o="4" data-mo="4" data-x=".9" data-y=".5" data-mx=".79" data-my=".655" data-r="-8" style={vars({ "--in": ".26s" })}>
                <div className="n card-frag">
                  <b>Lisbon</b>
                  <ul>
                    <li>tram 28 (mom&apos;s wish)</li>
                    <li>custard tarts x10</li>
                  </ul>
                </div>
              </div>
              <div className="frag f-voice" data-row="lh" data-o="5" data-mo="5" data-x=".79" data-y=".78" data-mx=".3" data-my=".725" data-r="-4" style={vars({ "--in": ".38s" })}>
                <div className="n">
                  <span className="play">
                    <I icon={Play} w="fill" />
                  </span>
                  <span className="wave">
                    {WAVE.map((h, i) => (
                      <b key={i} className={i < 8 ? "p" : ""} style={{ height: h }} />
                    ))}
                  </span>
                  <span className="dur">0:42</span>
                </div>
              </div>
              <div className="frag f-remind desk-only" data-row="sc" data-o="6" data-x=".52" data-y=".11" data-r="-2" style={vars({ "--in": ".08s" })}>
                <div className="n card-frag">
                  <span className="ic">
                    <I icon={Bell} w="fill" />
                  </span>
                  <div>
                    <div className="h">
                      <span>Reminder</span>
                      <span>now</span>
                    </div>
                    <p>ask Dana (vet): peanut butter ok for dogs?</p>
                  </div>
                </div>
              </div>
              <div className="frag f-napkin" data-row="fo" data-o="7" data-mo="6" data-x=".115" data-y=".5" data-mx=".24" data-my=".275" data-r="6" style={vars({ "--in": ".16s" })}>
                <div className="n">soup: 1 cup = her small mug. weigh it!!</div>
              </div>
              <div className="frag f-book desk-only" data-row="lh" data-o="8" data-x=".64" data-y=".87" data-r="-5" style={vars({ "--in": ".44s" })}>
                <div className="n card-frag">
                  <div className="art">
                    <span className="tower">
                      <I icon={Clock} w="fill" />
                    </span>
                  </div>
                  <p>
                    <I icon={BookmarkSimple} w="fill" />
                    how tower clocks get repaired
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 2. Ideas grow up ============ */}
        <section className="stage s2" data-s="2">
          <div className="pin">
            <div className="wrap">
              <div className="text">
                <div className="s-eyebrow">
                  <b>02</b> {L.grows.eyebrow}
                </div>
                <h2 className="s-title">{L.grows.title}</h2>
                <p className="s-copy">{L.grows.line}</p>
                <ol className="beats desk-only">
                  {SAID_TODAY.map((q, i) => (
                    <li key={q}>
                      <q>{q}</q>
                      <span>{L.grows.beats[i]}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="slot ph" aria-hidden>
                <div className="fit" data-w="424" data-h="896" data-max="0.95">
                  <div className="glow" />
                  <div className="fit-in">
                    <Phone>
                      <div className="topbar">
                        <I icon={CaretLeft} />
                        <span className="r">
                          <I icon={Export} />
                        </span>
                      </div>
                      <div className="pgscroll">
                        <div className="pg">
                          <I icon={Avocado} w="bold" className="pg-ico" />
                          <h4 className="pg-title">Is it ripe yet app</h4>
                          <p className="pg-one">Tells you which day to eat each avocado.</p>
                          <div className="sc pg-facts">
                            App · Open · <span className="n">3</span> thoughts · since 2 Oct
                          </div>
                          <div className="ailine">
                            <span className="w">
                              <Spark />
                              <span className="t">AI is changing the page</span>
                            </span>
                            <span className="d">
                              <Spark />
                              <span className="t">AI made 1 change</span>
                              <b>Undo</b>
                            </span>
                          </div>
                          <div className="sc pg-h">The idea</div>
                          <ul className="dash">
                            <li>Photograph the avocado when you buy it.</li>
                            <li>On the day it&apos;s ready, your phone pings you.</li>
                          </ul>
                          <div className="sc pg-h">Features</div>
                          <ul className="box">
                            <li>
                              <Box />
                              <span className="tx">Photo when you buy it</span>
                            </li>
                            <li className="recap">
                              <Box />
                              <span className="tx">Ping on the ripe day</span>
                            </li>
                            <li className="friends unfold">
                              <Box />
                              <span className="tx" data-full="Banana mode" />
                            </li>
                          </ul>
                          <div className="qwrap unfold">
                            <div className="sc pg-h">Open questions</div>
                            <ul className="dash">
                              <li className="q1">
                                <span className="tx" data-full="How does it know which fruit it is?" />
                              </li>
                            </ul>
                          </div>
                          <div className="sc pg-h">What you said</div>
                          <div className="log">
                            {[...SAID_BEFORE, ...SAID_TODAY.map((q) => ["24 Oct", q])].map(([d, q], i) => (
                              <div className="e" key={i}>
                                <span className="sc d">{d}</span>
                                <q>{q}</q>
                              </div>
                            ))}
                            <div className="all">
                              Show all <span className="n">3</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="cbar">
                        <div className="capsule">
                          <I icon={Plus} />
                          <span className="ph2">Add to this idea…</span>
                          <span className="typed" />
                        </div>
                        <div className="mic">
                          <I icon={Microphone} />
                        </div>
                      </div>
                    </Phone>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 3. Just say it ============ */}
        <section className="stage s3" data-s="3">
          <div className="pin">
            <div className="wrap flip">
              <div className="slot v3" aria-hidden>
                <div className="fit" data-w="480" data-h="450" data-max="1.1">
                  <div className="glow g3" style={vars({ "--gw": "125%" })} />
                  <div className="fit-in">
                    <div className="v3box">
                      <div className="listen paper">
                        <div className="lhead">
                          <span className="rec" />
                          <span className="sc">Listening</span>
                          <span className="sc tm">0:00</span>
                        </div>
                        <p className="words">
                          <span className="phd">Say it out loud, in English…</span>
                          {SPOKEN.split(" ").map((w, i) => (
                            <Fragment key={i}>
                              <span className="w">{w}</span>{" "}
                            </Fragment>
                          ))}
                        </p>
                      </div>
                      <div className="filed paper">
                        <div className="lead">
                          <Spark />
                          <I icon={MusicNotes} w="bold" />
                        </div>
                        <div className="top">
                          <span className="is-filing">Filing…</span>
                          <span className="is-done">Added to Neighbor drum song</span>
                        </div>
                        <div className="bot">
                          <span className="said is-filing">“…he finally plays a different fill”</span>
                          <span className="ai is-done">Bridge: he finally plays a new fill</span>
                        </div>
                        <div className="act">
                          <span>Undo</span>
                          <span>Move</span>
                        </div>
                      </div>
                      <div className="note3">
                        <span>
                          {L.say.note[0]}
                          <br />
                          {L.say.note[1]}
                        </span>
                        <svg viewBox="0 0 62 66">
                          <path d="M4 8c22-2 42 10 46 46" />
                          <path d="M41 45l9 11 8-13" />
                        </svg>
                      </div>
                      <div className="bar3 calls">
                        <div className="disc">
                          <I icon={Trash} />
                        </div>
                        <div className="capsule">
                          <span className="rest">
                            <I icon={Plus} />
                            <span>Capture a thought…</span>
                          </span>
                          <span className="live">
                            <span className="level">
                              {Array.from({ length: 38 }, (_, i) => (
                                <b key={i} />
                              ))}
                            </span>
                            <span className="tm2">0:00</span>
                          </span>
                        </div>
                        <div className="btn">
                          <div className="halo" />
                          <div className="mic">
                            <I icon={Microphone} />
                          </div>
                          <div className="stop">
                            <I icon={Stop} w="fill" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text">
                <div className="s-eyebrow">
                  <b>03</b> {L.say.eyebrow}
                </div>
                <h2 className="s-title">{L.say.title}</h2>
                <p className="s-copy">{L.say.line}</p>
                <ul className="facts desk-only">
                  {[Microphone, GlobeSimple, ArrowsSplit].map((icon, i) => (
                    <li key={i}>
                      <I icon={icon} />
                      {L.say.facts[i]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 4. Old notes ============ */}
        <section className="stage s4" data-s="4">
          <div className="pin">
            <div className="wrap">
              <div className="text">
                <div className="s-eyebrow">
                  <b>04</b> {L.notes.eyebrow}
                </div>
                <h2 className="s-title">{L.notes.title}</h2>
                <p className="s-copy">{L.notes.line}</p>
              </div>
              <div className="slot v4" aria-hidden>
                <div className="fit" data-w="680" data-h="610" data-mw="380" data-mh="680" data-max="1">
                  <div className="glow" style={vars({ "--gw": "115%" })} />
                  <div className="fit-in">
                    <div className="v4box">
                      <div className="chat">
                        <div className="chat-h">
                          <I icon={CaretLeft} className="back" />
                          <span className="av">
                            <I icon={Lightbulb} w="fill" />
                          </span>
                          <div>
                            <b>my ideas</b>
                            <small>300 messages · since 2019</small>
                          </div>
                        </div>
                        <div className="chat-b">
                          <span className="day">12 Mar 2023</span>
                          {CHAT.map(([text, time], i) => (
                            <div className="bub" data-i={i} key={i}>
                              {text}
                              <s>{time}</s>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="nbk dots">
                        <div className="hd">
                          <I icon={Lightbulb} w="bold" />
                          <h4>Ideas</h4>
                        </div>
                        <div className="sc label app-label">Recent</div>
                        <div className="rows">
                          {SORTED.map((it, i) => (
                            <div className="row" data-i={i} key={i}>
                              <span className="sign bulb" />
                              <I icon={it.icon} w="bold" className="ico" style={hue(it.hue)} />
                              <div className="ttl">
                                <span>{it.title}</span>
                              </div>
                              <div className="ai">From your old notes</div>
                            </div>
                          ))}
                        </div>
                        <div className="sc more" />
                        <div className="icard" data-st="a">
                          <span className="lead">
                            <Spark />
                          </span>
                          <div className="tx">
                            <span className="ta">Sorting 300 messages…</span>
                            <span className="tb">
                              Writing pages · <span className="n">1</span> of 13
                            </span>
                            <span className="tc">Made 13 ideas from 300 messages</span>
                          </div>
                          <div className="act">
                            <span>Undo</span>
                            <span>OK</span>
                          </div>
                          <div className="line">
                            <i />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* each message's copy, which flies from the chat to its idea */}
            {CHAT.map(([text, time], i) => (
              <div className="bub flyer" data-i={i} key={i} aria-hidden>
                {text}
                <s>{time}</s>
              </div>
            ))}
          </div>
        </section>

        {/* ============ after the story ============ */}
        <section className="after reveal">
          <div className="panel">
            <h2 className="pv-head">{L.privacy.title}</h2>
            <div className="pv-grid">
              {L.privacy.points.map((pt, i) => (
                <div key={pt.title}>
                  <I icon={[ShieldCheck, MicrophoneSlash, Devices][i]} />
                  <b>{pt.title}</b>
                  <p>{pt.body}</p>
                </div>
              ))}
            </div>
            <Link className="more-link" href="/eureka/privacy">
              {L.privacy.link}
            </Link>
          </div>
        </section>

        <section className="cta" id="get">
          <div className="small-lamp" aria-hidden>
            <div className="glow" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/eureka/lamp.webp" alt="" width={132} height={132} />
          </div>
          <h2 className="s-title reveal">{L.end.title}</h2>
          <p className="s-copy reveal">{L.end.line}</p>
          <Badges className="end-badges" />
          <Waitlist />
          <p className="fine">{L.end.fine}</p>
        </section>
      </main>

      {/* a quick way in: a bar along the bottom on a phone, a badge by the theme toggle on a computer */}
      <div className="getbar">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/eureka/icon.png" alt="" />
        <div className="gb-t">
          <b>Eureka</b>
          <span className="not-android">{L.bar}</span>
        </div>
        {IOS && (
          <a className="badge not-android" href={IOS} {...externalProps(IOS)}>
            <Apple />
            <span>
              <small>Download on the</small>
              <strong>App Store</strong>
            </span>
          </a>
        )}
        <Link className="join only-android" href={WAITLIST}>
          Join the Android waitlist
        </Link>
      </div>
      <div className="gettop">
        {!PLAY && (
          <Link className="and" href={WAITLIST}>
            Android waitlist
          </Link>
        )}
        {IOS && (
          <a className="badge" href={IOS} {...externalProps(IOS)}>
            <Apple />
            <span>
              <small>Download on the</small>
              <strong>App Store</strong>
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

function Box() {
  return (
    <span className="bx">
      <svg viewBox="0 0 14 14">
        <path d="M3 7.4l2.6 2.5L11 4.2" />
      </svg>
    </span>
  );
}
