/*
 * What moves WordLah's landing page (play.tsx). The phone plays the demo day as a clip, over and over while it is on
 * screen: the guesses are typed, each turns its tiles over one by one and marks the keys, the Merlion's face follows
 * the round (the store screenshots' faces) and the sun rises a notch, the win turns the sky to morning and raises the
 * word card, and after a while the card goes down and the next round starts at dusk. It takes no input: it is a clip
 * to watch, not a demo to play. Below the hero: the word cards take turns, the big sun changes faces and takes pokes
 * as the app's sun does (SunPokes.kt: two giggles, two teases, then huffy, calm again 2.5 s after the last poke), the
 * board slides in, and the install bar hides while badges show.
 *
 * `start(root)` sets it going and returns what stops it again (React mounts it twice in development).
 */
import { DAY, DAY_FACES, FACES, PUZZLE } from "./game";
import { ART } from "./pieces";

type El = HTMLElement;
const KIND: Record<string, string> = { r: "right", m: "moved", o: "out" };
const RANK: Record<string, number> = { right: 3, moved: 2, out: 1 };

// the clip's timing, in ms
const TYPE_MS = 150; // between letters
const TURN_MS = 300; // between one tile turning over and the next
const AFTER_GUESS_MS = 900;
const CARD_HOLD_MS = 5200; // the word card up, before the next round
const BETWEEN_MS = 1200;

export function start(root: El): () => void {
  const $ = <T extends El = El>(s: string, el: ParentNode = root) => el.querySelector<T>(s)!;
  const $$ = <T extends El = El>(s: string, el: ParentNode = root) => [...el.querySelectorAll<T>(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // everything this run starts, so stop() can take it back
  let dead = false;
  const timers = new Set<number>();
  const later = (fn: () => void, ms: number) => {
    const t = window.setTimeout(() => {
      timers.delete(t);
      if (!dead) fn();
    }, ms);
    timers.add(t);
    return t;
  };
  const sleep = (ms: number) => new Promise<void>((r) => later(r, ms));
  const every = (fn: () => void, ms: number) => {
    const t = window.setInterval(fn, ms);
    timers.add(t);
  };
  const undo: (() => void)[] = [];
  const restart = (el: El, cls: string) => {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  };
  const watch = (el: El, fn: (seen: boolean) => void, threshold = 0.2) => {
    const io = new IntersectionObserver(([e]) => fn(e.isIntersecting), { threshold });
    io.observe(el);
    undo.push(() => io.disconnect());
  };
  const once = (el: El, fn: () => void, threshold = 0.25) => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      fn();
    }, { threshold });
    io.observe(el);
    undo.push(() => io.disconnect());
  };

  // ---- the round in the phone, as a clip ----
  const screen = $(".screen");
  const title = $(".topbar .title");
  const sunbox = $(".sunbox");
  const sunImg = $<HTMLImageElement>(".wl-sun img", sunbox);
  const rows = $$(".boardbox .wl-row");
  const keys = $$(".deck .key[data-key]");
  const keyFor = (k: string) => keys.find((b) => b.dataset.key === k)!;
  const face = (f: string) => (sunImg.src = `${ART}/merlion_${f}.webp`);
  const setSun = (top: number) => screen.style.setProperty("--sun-top", `${top}px`);

  const setTile = (t: El, letter: string, kind: string) => {
    t.className = t.className.replace(/k-\w+/, `k-${kind}`);
    t.querySelector("b")!.textContent = letter;
  };
  const tile = (row: number, i: number) => rows[row].children[i] as El;

  const reset = () => {
    rows.forEach((r) =>
      [...r.children].forEach((t) => {
        (t as El).classList.remove("bump", "turn");
        setTile(t as El, "", "empty");
      }),
    );
    screen.classList.remove("won", "done");
    keys.forEach((k) => k.classList.remove("right", "moved", "out"));
    title.textContent = `Puzzle ${PUZZLE}`;
    setSun(112);
    face("happy");
  };

  /** Marks the keys a guess has taught, never lowering one (right beats moved beats out). */
  const markKeys = (guess: string, marks: string) =>
    [...guess].forEach((ch, i) => {
      const k = keyFor(ch);
      const mark = KIND[marks[i]];
      const now = ["right", "moved", "out"].find((c) => k.classList.contains(c));
      if (!now || RANK[mark] > RANK[now]) {
        k.classList.remove("right", "moved", "out");
        k.classList.add(mark);
      }
    });

  /** The day's round at its end, at once: for reduced motion. */
  const solved = () => {
    reset();
    DAY.forEach(([guess, marks], r) => {
      [...guess].forEach((ch, i) => setTile(tile(r, i), ch, KIND[marks[i]]));
      markKeys(guess, marks);
    });
    title.textContent = `Solved in ${DAY.length}`;
    screen.classList.add("won", "done");
    setSun(70);
    face("delighted");
  };

  // the clip runs only while the phone is on screen, and finishes its round before it rests
  let visible = false;
  watch($(".phone"), (seen) => (visible = seen));
  const whenVisible = async () => {
    while (!visible && !dead) await sleep(400);
  };

  const round = async () => {
    for (const [r, [guess, marks]] of DAY.entries()) {
      for (const [i, ch] of [...guess].entries()) {
        const t = tile(r, i);
        setTile(t, ch, "typed");
        restart(t, "bump");
        await sleep(TYPE_MS + (i % 2) * 40);
      }
      await sleep(320);
      [...guess].forEach((ch, i) => {
        const t = tile(r, i);
        t.style.setProperty("--i", String(i));
        t.classList.remove("bump");
        restart(t, "turn");
        later(() => setTile(t, ch, KIND[marks[i]]), i * TURN_MS + 250);
      });
      await sleep(5 * TURN_MS + 300);
      markKeys(guess, marks);
      face(DAY_FACES[r]);
      setSun(112 - (r + 1) * 9);
      restart(sunbox, "hop");
      await sleep(AFTER_GUESS_MS);
    }
    // the win: morning, the sun up with sparks, then the word card
    title.textContent = `Solved in ${DAY.length}`;
    screen.classList.add("won");
    setSun(70);
    await sleep(1500);
    screen.classList.add("done");
    await sleep(CARD_HOLD_MS);
    screen.classList.remove("done");
    await sleep(900);
  };

  if (reduced) solved();
  else
    (async () => {
      reset();
      await sleep(900);
      while (!dead) {
        await whenVisible();
        if (dead) return;
        await round();
        if (dead) return;
        reset();
        await sleep(BETWEEN_MS);
      }
    })();

  // ---- a poke on the big sun: a flipbook of 28 frames in rows of 7 at 30 a second, fetched on the first poke ----
  const flipFrame = (el: El, f: number) => {
    el.style.backgroundPosition = `${((f % 7) / 6) * 100}% ${(Math.floor(f / 7) / 3) * 100}%`;
  };
  const playFlip = (el: El, clip: string) =>
    new Promise<void>((done) => {
      el.style.backgroundImage = `url(${ART}/${clip}.webp)`;
      if (reduced) {
        flipFrame(el, 14);
        return done();
      }
      const t0 = performance.now();
      const step = (t: number) => {
        if (dead) return done();
        const f = Math.min(27, Math.floor((t - t0) / (1000 / 30)));
        flipFrame(el, f);
        if (f < 27) requestAnimationFrame(step);
        else done();
      };
      requestAnimationFrame(step);
    });

  const poke = $(".poke");
  const label = $(".count", poke);
  const flip = $(".wl-flip", poke);
  let pokes = 0;
  let calm = 0;
  let pokeTimer = 0;
  const onPoke = async () => {
    pokes = performance.now() - calm > 2500 ? 1 : pokes + 1;
    calm = performance.now();
    const clip = pokes <= 2 ? "giggle" : pokes <= 4 ? "tease" : "huff";
    label.textContent = pokes <= 2 ? "Hee hee" : pokes <= 4 ? "Bleh!" : "Okay, enough lah";
    poke.classList.add("poking");
    if (!reduced) restart(poke, "hop");
    clearTimeout(pokeTimer);
    await playFlip(flip, clip);
    pokeTimer = later(() => {
      poke.classList.remove("poking");
      label.textContent = "Tap him again";
    }, clip === "giggle" ? 300 : 1600);
  };
  poke.addEventListener("click", onPoke);
  undo.push(() => poke.removeEventListener("click", onPoke));

  // his faces on their own, between pokes
  const big = $<HTMLImageElement>(".wl-sun img", poke);
  const faces = FACES.filter((f) => f !== "angry" && f !== "sad");
  let fi = 0;
  if (!reduced)
    every(() => {
      if (poke.classList.contains("poking")) return;
      fi = (fi + 1) % faces.length;
      big.src = `${ART}/merlion_${faces[fi]}.webp`;
    }, 1500);

  // ---- below the hero ----
  $$(".reveal").forEach((el) => (reduced ? el.classList.add("in") : once(el, () => el.classList.add("in"), 0.15)));

  // the word cards take turns
  const cards = $$(".cards .wl-card");
  const dots = $$(".cards .dots i");
  let ci = 0;
  if (!reduced)
    every(() => {
      ci = (ci + 1) % cards.length;
      cards.forEach((c, i) => c.classList.toggle("on", i === ci));
      dots.forEach((d, i) => d.classList.toggle("on", i === ci));
    }, 4200);

  // today's board slides in
  const boardpiece = $(".boardpiece");
  if (reduced) boardpiece.classList.add("in");
  else once(boardpiece, () => boardpiece.classList.add("in"), 0.3);

  // the install bar, hidden while the page's own badges show
  const bar = $(".install");
  const seen = new Set<Element>();
  const io = new IntersectionObserver(
    (es) => {
      es.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      bar.classList.toggle("hide", seen.size > 0);
    },
    { threshold: 0.01 },
  );
  $$("[data-badges]").forEach((b) => io.observe(b));
  undo.push(() => io.disconnect());

  return () => {
    dead = true;
    timers.forEach((t) => {
      clearTimeout(t);
      clearInterval(t);
    });
    undo.forEach((f) => f());
  };
}
