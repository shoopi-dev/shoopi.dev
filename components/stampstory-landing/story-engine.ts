/*
 * What moves StampStory's landing page (story.tsx). The story is one tall section with a sticky stage
 * the size of the screen; how far it has scrolled, in screens, picks the stage and its progress (0..1),
 * and that alone places everything, so scrolling back plays it backwards. `start(root)` sets it going
 * and returns what stops it again.
 *
 * Kept cheap: sizes are read once per resize (layout), a frame only writes; the canvas globe is drawn
 * only while it shows and its picture has changed; the loop runs only while the story is on screen.
 */
import { stampstory } from "@/data/stampstory";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ramp = (v: number, a: number, b: number) => clamp((v - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const out = (t: number) => 1 - Math.pow(1 - t, 3);
const back = (t: number) => 1 + 2.9 * Math.pow(t - 1, 3) + 1.9 * Math.pow(t - 1, 2);
const RAD = Math.PI / 180;

type Country = {
  id: string;
  name: string;
  flag: string;
  continent: string;
  rings: [number, number][][];
  label: [number, number];
  color: number;
  dot?: [number, number];
};
type Shape = { c: Country; rings: Float32Array[]; dot: boolean; lab: [number, number, number] };
type Box = { x: number; y: number; w: number; h: number };
type El = HTMLElement;

const S = stampstory.story;
const ORDER = S.trip;
const KENYA = ORDER.indexOf("Kenya");
const SCORED = ["Europe", "Asia", "Africa", "North America", "South America", "Oceania"];
// stage lengths in screens: 0 the question, 1 memories fly in, 2 the world, 3 the passport, 4 post it, 5 a welcome
const STAGES = [1.0, 2.7, 1.3, 1.6, 1.5, 1.7];
const START = STAGES.map((_, i) => STAGES.slice(0, i).reduce((a, b) => a + b, 0));
const SUM = STAGES.reduce((a, b) => a + b, 0);
// when each country fills, in stage 1's progress: the first three get room, the rest roll in
const TF = ORDER.map((_, i) => (i < 3 ? 0.14 + i * 0.11 : lerp(0.42, 0.8, (i - 3) / (ORDER.length - 4))));
// where each memory lies at first, as fractions of the screen, with a tilt
const SCATTER = {
  desk: [[0.14, 0.2, -9], [0.84, 0.17, 8], [0.08, 0.64, -6], [0.9, 0.58, 12], [0.22, 0.86, 5], [0.79, 0.84, -10], [0.5, 0.92, -3]],
  phone: [[0.27, 0.13, -8], [0.8, 0.13, 9], [0.12, 0.88, -10], [0.89, 0.81, 12], [0.4, 0.95, 4], [0.66, 0.92, -9], [0.88, 0.97, 6]],
};
// the share card's little map is an image: the app's Sky colours in both themes
const TOY = ["#E5484D", "#FF4FA0", "#7C3AED", "#1E3A8A", "#0F766E", "#3B82F6"];

const unit = (lon: number, lat: number): [number, number, number] => {
  const cl = Math.cos(lat * RAD);
  return [cl * Math.sin(lon * RAD), Math.sin(lat * RAD), cl * Math.cos(lon * RAD)];
};

export function start(root: El): () => void {
  const $ = <T extends Element = El>(sel: string) => root.querySelector(sel) as T;
  const $$ = <T extends Element = El>(sel: string) => [...root.querySelectorAll<T>(sel)];
  const html = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.toggle("android", /Android/i.test(navigator.userAgent));

  const story = $(".story"), stage = $(".stage"), ask = $(".ask");
  const cv = $<HTMLCanvasElement>(".globe"), ctx = cv.getContext("2d")!;
  const trail = $<SVGSVGElement>(".trail"), trailPath = trail.querySelector("path")!;
  const caps = $$(".cap").map((el) => ({ el, i: +el.dataset.stage! }));
  const cnt = $(".count"), cn = $(".cn"), cnum = $(".cnum"), cword = $(".cword"), cp = $(".cp"), cc = $(".cc");
  const pieces = $$(".piece").map((el, k) => ({ el, k, name: el.dataset.country!, i: ORDER.indexOf(el.dataset.country!), w: 0, h: 0 }));
  const vPass = $(".v-passport"), passport = $(".passport"), vShare = $(".v-share");
  const phonebox = $(".phonebox"), phone = $(".phone"), screen = $(".screen"), card = $(".card");
  const postBtn = $(".post-btn"), postLabel = $(".post-label"), hearts = $$(".heart");
  const plane = $(".plane"), notif = $(".notif"), tap = $(".tap");
  const install = $(".install"), skip = $(".skip"), prog = $(".progress"), progBar = $(".progress i");
  const end = $(".end"), endBadges = $(".end-badges");
  story.dataset.stages = STAGES.join(",");

  /* ---------- the world, fetched so it stays out of the script ---------- */
  let shapes: Shape[] = [];
  let shapeOf: Record<string, Shape> = {};
  let trip: Country[] = [];
  let unwrap: number[] = [];
  const latOf = (c: Country) => clamp(c.label[1], -24, 30) * 0.8;

  /* ---------- colours, read again when the theme flips ---------- */
  let col = { dark: false, ocean: "", land: "", line: "", c: [] as string[] };
  const readColors = () => {
    const cs = getComputedStyle(root);
    const g = (n: string) => cs.getPropertyValue(n).trim();
    col = {
      dark: html.dataset.theme === "dark",
      ocean: g("--ss-ocean"),
      land: g("--ss-land"),
      line: g("--ss-line"),
      c: [1, 2, 3, 4, 5, 6].map((i) => g(`--ss-c${i}`)),
    };
    trailPath.setAttribute("stroke", col.dark ? "rgba(255,244,232,.7)" : "rgba(255,255,255,.95)");
    dirty = true;
  };

  /* ---------- the globe: unit vectors once, a rotation per frame ---------- */
  let G = { x: 0, y: 0, r: 100 };
  let rot = { sl: 0, cl: 1, sp: 0, cp: 1 };
  const setRot = (lon: number, lat: number) => {
    rot = { sl: Math.sin(lon * RAD), cl: Math.cos(lon * RAD), sp: Math.sin(lat * RAD), cp: Math.cos(lat * RAD) };
  };
  const project = (v: [number, number, number]) => {
    const x1 = v[0] * rot.cl - v[2] * rot.sl;
    const z1 = v[2] * rot.cl + v[0] * rot.sl;
    return { x: G.x + x1 * G.r, y: G.y - (v[1] * rot.cp - z1 * rot.sp) * G.r, z: z1 * rot.cp + v[1] * rot.sp };
  };
  const trace = (path: Path2D, sh: Shape, R: number, ox: number, oy: number) => {
    let any = false;
    for (const a of sh.rings) {
      const n = a.length / 3;
      let front = false;
      const pts = new Float32Array(n * 2);
      for (let i = 0; i < n; i++) {
        const x = a[i * 3], y = a[i * 3 + 1], z = a[i * 3 + 2];
        const x1 = x * rot.cl - z * rot.sl;
        const z1 = z * rot.cl + x * rot.sl;
        let px = x1, py = y * rot.cp - z1 * rot.sp;
        if (z1 * rot.cp + y * rot.sp > 0) front = true;
        else {
          // behind: pinned to the limb, so a country running round the edge still closes
          const h = Math.hypot(px, py) || 1;
          px /= h;
          py /= h;
        }
        pts[i * 2] = ox + px * R;
        pts[i * 2 + 1] = oy - py * R;
      }
      if (!front) continue;
      any = true;
      path.moveTo(pts[0], pts[1]);
      for (let i = 1; i < n; i++) path.lineTo(pts[i * 2], pts[i * 2 + 1]);
      path.closePath();
    }
    return any;
  };

  const PAD = 60;
  let DPR = 1, CW = 0, dirty = true, lastKey = "";
  type Pop = { v: [number, number, number]; t: number; color: string };
  const drawGlobe = (alpha: number, fill: Record<string, number>, pops: Pop[], key: string) => {
    const size = Math.round(G.r * 2 + PAD * 2);
    cv.style.transform = `translate(${G.x - size / 2}px, ${G.y - size / 2}px)`;
    cv.style.opacity = String(alpha);
    if (alpha <= 0.001) return;
    if (size !== CW) {
      CW = size;
      cv.width = size * DPR;
      cv.height = size * DPR;
      cv.style.width = cv.style.height = size + "px";
      dirty = true;
    }
    if (!dirty && key === lastKey) return;
    dirty = false;
    lastKey = key;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, size, size);
    const R = G.r, ox = size / 2, oy = size / 2;

    const halo = ctx.createRadialGradient(ox, oy, R * 0.9, ox, oy, R * 1.22);
    halo.addColorStop(0, col.dark ? "rgba(191,217,255,.5)" : "rgba(255,255,255,.55)");
    halo.addColorStop(1, "rgba(79,163,255,0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(ox, oy, R * 1.22, 0, 7);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(ox, oy, R, 0, 7);
    ctx.clip();
    // ocean, lit from the top left
    const og = ctx.createRadialGradient(ox - R * 0.4, oy - R * 0.45, R * 0.1, ox, oy, R * 1.05);
    if (col.dark) {
      og.addColorStop(0, "#0c1d40");
      og.addColorStop(1, col.ocean);
    } else {
      og.addColorStop(0, "#b6e6ff");
      og.addColorStop(0.55, col.ocean);
      og.addColorStop(1, "#4fb3f0");
    }
    ctx.fillStyle = og;
    ctx.fillRect(ox - R, oy - R, R * 2, R * 2);

    // plain land in one path, visited countries one by one in the palette
    const land = new Path2D();
    const visited: [Shape, number][] = [];
    for (const sh of shapes) {
      const f = fill[sh.c.name] || 0;
      if (f > 0.001) visited.push([sh, f]);
      if (f < 0.999) trace(land, sh, R, ox, oy);
    }
    ctx.fillStyle = col.land;
    ctx.fill(land, "evenodd");
    ctx.lineWidth = 0.7;
    ctx.strokeStyle = col.line;
    ctx.stroke(land);
    for (const [sh, f] of visited) {
      const p = new Path2D();
      if (!trace(p, sh, R, ox, oy)) continue;
      ctx.save();
      ctx.globalAlpha = f;
      ctx.fillStyle = col.c[sh.c.color];
      if (col.dark) {
        // at night the visited countries are city lights
        ctx.shadowColor = col.c[sh.c.color];
        ctx.shadowBlur = 14;
      }
      ctx.fill(p, "evenodd");
      ctx.shadowBlur = 0;
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = col.dark ? "rgba(255,244,232,.35)" : "rgba(255,255,255,.8)";
      ctx.stroke(p);
      ctx.restore();
    }
    // tiny places as dots
    for (const sh of shapes) {
      if (!sh.dot) continue;
      const q = project(sh.lab);
      if (q.z <= 0) continue;
      const f = fill[sh.c.name] || 0;
      ctx.beginPath();
      ctx.arc(ox + (q.x - G.x), oy + (q.y - G.y), f > 0 ? 3.2 : 1.6, 0, 7);
      ctx.fillStyle = f > 0 ? col.c[sh.c.color] : col.land;
      ctx.fill();
    }

    // limb shading, the toy gloss and, at night, a lit atmosphere
    const shade = ctx.createRadialGradient(ox - R * 0.3, oy - R * 0.35, R * 0.35, ox, oy, R);
    shade.addColorStop(0, "rgba(0,0,0,0)");
    shade.addColorStop(0.75, col.dark ? "rgba(0,0,10,.18)" : "rgba(10,50,140,.06)");
    shade.addColorStop(1, col.dark ? "rgba(0,0,10,.6)" : "rgba(10,50,140,.32)");
    ctx.fillStyle = shade;
    ctx.fillRect(ox - R, oy - R, R * 2, R * 2);
    const gl = ctx.createRadialGradient(ox - R * 0.42, oy - R * 0.52, 0, ox - R * 0.42, oy - R * 0.52, R * 0.62);
    gl.addColorStop(0, `rgba(255,255,255,${col.dark ? 0.22 : 0.55})`);
    gl.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gl;
    ctx.beginPath();
    ctx.ellipse(ox - R * 0.42, oy - R * 0.52, R * 0.55, R * 0.4, -0.6, 0, 7);
    ctx.fill();
    if (col.dark) {
      const at = ctx.createRadialGradient(ox, oy, R * 0.8, ox, oy, R);
      at.addColorStop(0, "rgba(120,170,255,0)");
      at.addColorStop(1, "rgba(150,195,255,.42)");
      ctx.fillStyle = at;
      ctx.fillRect(ox - R, oy - R, R * 2, R * 2);
    }
    ctx.restore();
    ctx.beginPath();
    ctx.arc(ox, oy, R - 0.5, 0, 7);
    ctx.lineWidth = col.dark ? 1.6 : 1.2;
    ctx.strokeStyle = col.dark ? "rgba(191,217,255,.7)" : "rgba(255,255,255,.7)";
    ctx.stroke();

    // landing rings
    for (const p of pops) {
      if (p.t <= 0 || p.t >= 1) continue;
      const q = project(p.v);
      if (q.z <= 0) continue;
      ctx.beginPath();
      ctx.arc(ox + (q.x - G.x), oy + (q.y - G.y), 4 + out(p.t) * 20, 0, 7);
      ctx.lineWidth = 2.5 * (1 - p.t);
      ctx.strokeStyle = p.color;
      ctx.globalAlpha = 1 - p.t;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  };

  /* ---------- the passport and the card, filled once the world is here ---------- */
  const total: Record<string, number> = {}, have: Record<string, number> = {};
  let barFills: El[] = [], stampEls: { el: El; r: number }[] = [];
  const fillPassport = (world: Country[]) => {
    world.forEach((c) => (total[c.continent] = (total[c.continent] || 0) + 1));
    trip.forEach((c) => (have[c.continent] = (have[c.continent] || 0) + 1));
    $(".bars").innerHTML = SCORED.map(
      (k) => `<div class="bar"><span>${k}</span><div class="track"><div class="fill"></div></div><em>${have[k] || 0}/${total[k]}</em></div>`,
    ).join("");
    const st = (k: string) => `${have[k] || 0}/${total[k]}`;
    const STAMPS = [
      { b: "Wanderer", ic: "5", c: 2, r: -8 },
      { b: "Explorer", ic: "10", c: 6, r: 6 },
      { b: "Europe", s: st("Europe"), c: 1, r: -4 },
      { b: "Asia", s: st("Asia"), c: 3, r: 9 },
      { b: "Africa", s: st("Africa"), c: 5, r: -10 },
      { b: "North<br>America", s: st("North America"), c: 4, r: 5 },
      { b: "South<br>America", s: st("South America"), c: 2, r: -6 },
      { b: "Oceania", s: st("Oceania"), c: 6, r: 8 },
    ];
    $(".stamps").innerHTML = STAMPS.map(
      (x) =>
        `<div class="stamp" style="--ink:var(--ss-c${x.c})"><div>${x.ic ? `<span class="ic">${x.ic}</span>` : ""}<b>${x.b}</b>${x.s ? `<small>${x.s}</small>` : ""}</div></div>`,
    ).join("");
    barFills = $$(".bars .fill");
    stampEls = $$(".stamps .stamp").map((el, k) => ({ el, r: STAMPS[k].r }));
    $(".flags").innerHTML = trip.map((c) => `<span>${c.flag}</span>`).join("");
    // the card's little world
    const m = $<HTMLCanvasElement>(".mini"), x = m.getContext("2d")!;
    const W = m.width, H = m.height;
    const tripSet = new Set(ORDER);
    const pt = (lo: number, la: number) => [((lo + 180) / 360) * W, ((90 - la) / 180) * H * 1.18 - H * 0.05];
    for (const c of world) {
      if (c.continent === "Antarctica") continue;
      x.beginPath();
      for (const r of c.rings)
        r.forEach(([lo, la], i) => {
          const [px, py] = pt(lo, la);
          if (i) x.lineTo(px, py);
          else x.moveTo(px, py);
        });
      x.fillStyle = tripSet.has(c.name) ? TOY[c.color] : "#cfe0c4";
      x.fill("evenodd");
      x.lineWidth = 0.6;
      x.strokeStyle = "#ffffff";
      x.stroke();
    }
  };

  /* ---------- sizes, read once per resize ---------- */
  let W = 0, H = 0, desk = false, V: Box[] = [], storyTop = 0, endTop = 0;
  let nw = 0, nh = 0, cntW = 0, passScale = 1, phoneScale = 1;
  const layout = () => {
    W = stage.clientWidth;
    H = stage.clientHeight;
    desk = W >= 900;
    DPR = Math.min(2, devicePixelRatio || 1);
    if (desk) {
      const left = Math.max(56, (W - 1240) / 2 + 24) + Math.min(W * 0.4, 470);
      const v = { x: left + 24, y: 72, w: W - left - 24 - Math.max(40, (W - 1240) / 2), h: H - 104 };
      V = [v, v, v, v, v, v];
    } else {
      // on a phone each stage's picture starts under its own caption, so it gets all the room there is
      const below = (i: number) => {
        const c = caps[i - 1].el;
        return c.offsetTop + c.offsetHeight + 14;
      };
      const box = (top: number) => ({ x: 0, y: top, w: W, h: H - top - 76 });
      const g = box(Math.max(below(1), below(2)));
      V = [g, g, g, box(below(3)), box(below(4)), box(below(5))];
    }
    for (const [el, i] of [[vPass, 3], [vShare, 4]] as [El, number][]) {
      const v = V[i];
      Object.assign(el.style, { left: v.x + "px", top: v.y + "px", width: v.w + "px", height: v.h + "px" });
    }
    passScale = Math.min((V[3].w - 24) / 340, V[3].h / passport.offsetHeight, desk ? 1.3 : 1.12);
    phoneScale = Math.min((V[4].h - 64) / 500, (V[4].w - 40) / 250, desk ? 1.25 : 1.1);
    phone.style.transform = `scale(${phoneScale})`;
    Object.assign(phonebox.style, { width: 250 * phoneScale + "px", height: 500 * phoneScale + "px" });
    // a 9:16 card fits the phone's width, as a story app shows it on a taller phone
    card.style.transform = `scale(${screen.clientWidth / 270})`;
    pieces.forEach((p) => {
      p.w = p.el.offsetWidth;
      p.h = p.el.offsetHeight;
    });
    nw = notif.offsetWidth;
    nh = notif.offsetHeight;
    cntW = cnt.offsetWidth;
    story.style.height = (SUM + 1) * H + "px";
    storyTop = story.getBoundingClientRect().top + scrollY;
    endTop = end.getBoundingClientRect().top + scrollY;
    dirty = true;
  };

  /* ---------- a frame: everything placed from the scroll position ---------- */
  const lp = (u: number, i: number) => clamp((u - START[i]) / STAGES[i]);
  const t0 = performance.now();
  let endBadgesIn = false, endShown = false;
  let lastPosted: boolean | null = null;
  const frame = (now: number) => {
    const time = reduced ? 0 : (now - t0) / 1000;
    let u = clamp((scrollY - storyTop) / H, 0, SUM);
    const offRaw = (scrollY - storyTop) / H - SUM;
    // reduced motion: each stage holds its telling end state
    if (reduced) {
      let i = 0;
      while (i < STAGES.length - 1 && u >= START[i + 1]) i++;
      u = START[i] + STAGES[i] * (i === 0 ? 0.3 : 0.85); // the opening's telling state is the question itself
    }
    const p0 = lp(u, 0), p1 = lp(u, 1), p2 = lp(u, 2), p3 = lp(u, 3), p4 = lp(u, 4), p5 = lp(u, 5);
    const inS = (i: number) => (u >= START[i] && u < START[i] + STAGES[i]) || (i === 5 && u >= START[5]);

    // the question
    const askOut = ramp(p0, 0.45, 0.82);
    ask.style.opacity = String(1 - askOut);
    ask.style.transform = `translateY(${-askOut * 60}px) scale(${1 - askOut * 0.06})`;
    ask.style.visibility = askOut >= 1 ? "hidden" : "visible";

    // captions hand over to the next one
    for (const { el, i } of caps) {
      const leaving = i < 5 && u >= START[i + 1];
      const on = u < START[i] ? 0 : leaving ? 1 - ramp(lp(u, i + 1), 0, 0.04) : ramp(lp(u, i), i === 1 ? 0.07 : 0.04, i === 1 ? 0.15 : 0.11);
      el.style.opacity = String(on);
      el.style.transform = `translateY(${(1 - on) * (leaving ? -24 : 24)}px)`;
      el.style.visibility = on < 0.01 ? "hidden" : "visible";
    }

    // the globe
    const viz = inS(5) ? V[5] : V[1];
    const R = Math.min(viz.w * (desk ? 0.34 : 0.41), viz.h * (desk ? 0.35 : 0.37));
    let galpha = 0, scale = 1, dy = 0;
    if (u < START[1]) galpha = ramp(p0, 0.84, 1);
    if (u >= START[1] && u < START[3]) galpha = 1;
    if (inS(2)) scale = lerp(1, 1.1, ease(p2));
    if (inS(3)) {
      const k = ease(ramp(p3, 0, 0.3));
      scale = lerp(1.1, 0.45, k);
      dy = -k * viz.h * 0.3;
      galpha = 1 - ramp(p3, 0.05, 0.28);
    }
    if (inS(5)) {
      galpha = ramp(p5, 0.05, 0.15);
      scale = 1.04;
    }
    if (!shapes.length) galpha = 0;
    G = { x: viz.x + viz.w / 2, y: viz.y + viz.h * (desk ? 0.47 : 0.44) + dy, r: R * scale };

    let lon = 175, lat = 22;
    if (shapes.length) {
      if (u < START[2]) {
        const q = p1;
        if (q <= TF[0]) {
          const k = ease(q / TF[0]);
          lon = lerp(175, unwrap[0], k);
          lat = lerp(22, latOf(trip[0]), k);
        } else {
          let i = 0;
          while (i < trip.length - 1 && q > TF[i + 1]) i++;
          if (i >= trip.length - 1) {
            lon = unwrap[i];
            lat = latOf(trip[i]);
          } else {
            const k = ease(ramp(q, TF[i], TF[i + 1]));
            lon = lerp(unwrap[i], unwrap[i + 1], k);
            lat = lerp(latOf(trip[i]), latOf(trip[i + 1]), k);
          }
        }
      } else if (u < START[5]) {
        const k = ease(p2);
        lon = unwrap[unwrap.length - 1] + 360 * k;
        lat = lerp(latOf(trip[trip.length - 1]), 14, k);
      } else {
        const k = ease(ramp(p5, 0, 0.4));
        lon = lerp(-5, 34, k);
        lat = lerp(18, 4, k);
      }
    }
    setRot(lon, lat);

    const fill: Record<string, number> = {}, pops: Pop[] = [];
    trip.forEach((c, i) => {
      let f = 1;
      if (u < START[2]) {
        f = ramp(p1, TF[i] - 0.004, TF[i] + 0.02);
        pops.push({ v: shapeOf[c.name].lab, t: ramp(p1, TF[i], TF[i] + 0.07), color: col.c[c.color] });
      }
      if (i === KENYA && inS(5)) {
        f = ramp(p5, 0.68, 0.72);
        pops.push({ v: shapeOf[c.name].lab, t: ramp(p5, 0.68, 0.8), color: col.c[c.color] });
      }
      fill[c.name] = f;
    });
    drawGlobe(galpha, fill, reduced ? [] : pops, `${u.toFixed(5)}|${G.r.toFixed(1)}|${shapes.length}`);

    // the count, and what joins it
    const n = trip.filter((c) => fill[c.name] >= 0.5).length;
    let cal = 0;
    if (u >= START[1] && u < START[3]) cal = ramp(p1, 0.06, 0.14);
    if (inS(2)) cal = 1;
    if (inS(3)) cal = 1 - ramp(p3, 0, 0.15);
    if (inS(5)) cal = ramp(p5, 0.12, 0.2);
    if (!shapes.length) cal = 0;
    cnum.textContent = String(n);
    cword.textContent = n === 1 ? S.count.one : S.count.many;
    const extra = inS(2) ? ramp(p2, 0.25, 0.4) : inS(3) ? 1 : 0;
    const extra2 = inS(2) ? ramp(p2, 0.38, 0.53) : inS(3) ? 1 : 0;
    for (const [el, v] of [[cp, extra], [cc, extra2]] as [El, number][]) {
      el.style.display = v > 0 ? "" : "none";
      el.style.opacity = String(v);
      el.style.transform = `scale(${0.6 + 0.4 * back(v)})`;
    }
    let beat = 0;
    if (u < START[2]) for (let i = 0; i < TF.length; i++) beat = Math.max(beat, Math.sin(Math.PI * ramp(p1, TF[i], TF[i] + 0.03)));
    if (inS(5)) beat = Math.max(beat, Math.sin(Math.PI * ramp(p5, 0.68, 0.74)));
    cn.style.transform = `scale(${1 + 0.08 * beat})`;
    cnt.style.opacity = String(cal);
    cnt.style.visibility = cal < 0.01 ? "hidden" : "visible";
    cnt.style.transform = `translate(${G.x - cntW / 2}px, ${G.y + G.r + (desk ? 28 : 22)}px)`;

    // memories: scattered, then round the globe, then each lands on its country
    for (const pc of pieces) {
      const L = desk ? SCATTER.desk[pc.k] : SCATTER.phone[pc.k];
      const bob = Math.sin(time * 1.1 + pc.k * 1.7);
      let x = L[0] * W + p0 * (pc.k % 2 ? 18 : -18) + bob * 4;
      let y = L[1] * H - p0 * 26 + Math.cos(time * 0.9 + pc.k) * 4;
      let r = L[2] + bob * 1.5;
      let sc = desk ? 1 : 0.6, op = 1;
      const ga = ease(ramp(p1, 0, 0.07));
      if (ga > 0) {
        // over the sides and the top, clear of the count under the globe and of the caption
        const ang = (-205 + pc.k * (desk ? 38 : 37)) * RAD;
        const orb = G.r * (desk ? 1.3 : 1.22);
        const os = desk ? 0.56 : 0.42;
        const lo = desk ? viz.x : 0, hi = desk ? viz.x + viz.w : W;
        const ox = clamp(G.x + Math.cos(ang) * orb, lo + (pc.w * os) / 2 + 8, hi - (pc.w * os) / 2 - 8);
        const oy = G.y + Math.sin(ang) * orb;
        x = lerp(x, ox, ga);
        y = lerp(y, oy, ga);
        sc = lerp(sc, os, ga);
        r = lerp(r, r * 0.6, ga);
      }
      const sh = shapeOf[pc.name];
      const a = TF[pc.i] - (pc.i < 3 ? 0.07 : 0.05);
      const f = ease(ramp(p1, a, TF[pc.i]));
      if (f > 0 && sh) {
        const q = project(sh.lab);
        x = lerp(x, q.x, f);
        y = lerp(y, q.y - Math.sin(f * Math.PI) * 40, f);
        sc = lerp(sc, 0.12, f);
        r = lerp(r, r + 30, f);
        op = 1 - ramp(f, 0.75, 1);
      }
      if (u >= START[2]) op = 0;
      pc.el.style.opacity = String(op);
      pc.el.style.visibility = op < 0.01 ? "hidden" : "visible";
      pc.el.style.transform = `translate(${x - pc.w / 2}px, ${y - pc.h / 2}px) rotate(${r}deg) scale(${sc})`;
    }

    // the passport stays, filled, until the share takes over
    const ppGo = inS(4) ? ease(ramp(p4, 0, 0.1)) : 0;
    const ppIn = inS(3) ? ease(ramp(p3, 0.14, 0.32)) : inS(4) ? 1 - ppGo : 0;
    vPass.style.opacity = String(ppIn);
    vPass.style.visibility = ppIn < 0.01 ? "hidden" : "visible";
    passport.style.transform = `translateY(${inS(4) ? -ppGo * 50 : (1 - ppIn) * 50}px) scale(${passScale * (0.94 + 0.06 * ppIn)})`;
    const p3h = inS(4) ? 1 : p3;
    barFills.forEach((b, k) => {
      const v = out(ramp(p3h, 0.3 + k * 0.03, 0.48 + k * 0.03));
      b.style.width = ((v * (have[SCORED[k]] || 0)) / total[SCORED[k]]) * 100 + "%";
    });
    stampEls.forEach(({ el, r }, k) => {
      const v = ramp(p3h, 0.44 + k * 0.045, 0.49 + k * 0.045);
      el.style.opacity = v > 0 ? "1" : "0";
      el.style.transform = `rotate(${r + (1 - v) * 14}deg) scale(${v > 0 ? lerp(2.3, 1, out(v)) * (1 + 0.06 * Math.sin(Math.PI * ramp(v, 0.7, 1))) : 0})`;
      el.style.filter = `blur(${(1 - v) * 1.5}px)`;
    });

    // the share stays, posted, until the welcome takes over
    const shGo = inS(5) ? ease(ramp(p5, 0, 0.1)) : 0;
    const shIn = inS(4) ? ease(ramp(p4, 0.06, 0.18)) : inS(5) ? 1 - shGo : 0;
    const p4h = inS(5) ? 1 : p4;
    vShare.style.opacity = String(shIn);
    vShare.style.visibility = shIn < 0.01 ? "hidden" : "visible";
    phonebox.style.transform = `translateY(${inS(5) ? -shGo * 40 : (1 - shIn) * 30}px) scale(${0.94 + 0.06 * shIn})`;
    const drop = ramp(p4h, 0.18, 0.44);
    const land = Math.sin(Math.PI * ramp(p4h, 0.42, 0.5));
    card.style.translate = `0 ${(1 - out(drop)) * -560}px`;
    card.style.rotate = `${(1 - out(drop)) * -9}deg`;
    card.style.scale = `${1 + land * 0.03} ${1 - land * 0.04}`;
    card.style.opacity = drop > 0 ? "1" : "0";
    const bIn = ramp(p4h, 0.46, 0.56), press = Math.sin(Math.PI * ramp(p4h, 0.6, 0.68));
    postBtn.style.opacity = String(bIn);
    postBtn.style.transform = `translateY(${(1 - out(bIn)) * 16}px) scale(${1 - press * 0.08})`;
    const posted = p4h >= 0.66;
    if (posted !== lastPosted) {
      lastPosted = posted;
      postLabel.textContent = posted ? postLabel.dataset.posted! : postLabel.dataset.post!;
      postBtn.classList.toggle("done", posted);
    }
    hearts.forEach((h, k) => {
      const t = ramp(p4h, 0.68 + k * 0.05, 0.86 + k * 0.05);
      h.style.opacity = t > 0 ? String(Math.min(1, t * 4)) : "0";
      h.style.transform = `translate(${Math.sin(t * 5 + k) * 8}px, ${-out(t) * (70 + k * 26)}px) scale(${t > 0 ? 0.6 + 0.4 * back(Math.min(1, t * 3)) : 0})`;
    });

    // a welcome: the plane lands, the banner drops, a tap stamps Kenya
    const vz = V[5];
    const kq = shapeOf.Kenya ? project(shapeOf.Kenya.lab) : { x: G.x, y: G.y, z: 1 };
    const fl = ramp(p5, 0.14, 0.42);
    const sx = vz.x + vz.w * (desk ? 0.06 : 0.04), sy = vz.y + vz.h * 0.08;
    const qx0 = (sx + kq.x) / 2 + vz.w * 0.12, qy0 = Math.min(sy, kq.y) - vz.h * 0.12;
    const bz = (t: number) => [
      (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * qx0 + t * t * kq.x,
      (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * qy0 + t * t * kq.y,
    ];
    const e = ease(fl);
    const [px, py] = bz(e), [qx, qy] = bz(Math.min(1, e + 0.01));
    plane.style.opacity = String(inS(5) && fl > 0 ? 1 - ramp(p5, 0.42, 0.47) : 0);
    plane.style.transform = `translate(${px}px, ${py}px) rotate(${Math.atan2(qy - py, qx - px)}rad) scale(${lerp(1, 0.45, e)})`;
    if (inS(5) && fl > 0) {
      let d = `M${sx.toFixed(1)} ${sy.toFixed(1)}`;
      for (let k = 1; k <= 24; k++) {
        const [a, b] = bz((e * k) / 24);
        d += ` L${a.toFixed(1)} ${b.toFixed(1)}`;
      }
      trailPath.setAttribute("d", d);
      trail.style.opacity = String(1 - ramp(p5, 0.5, 0.6));
    } else trail.style.opacity = "0";
    const nIn = inS(5) ? back(ramp(p5, 0.44, 0.52)) : 0;
    const nGo = inS(5) ? ease(ramp(p5, 0.6, 0.69)) : 0;
    const nx = vz.x + vz.w / 2 - nw / 2, ny = vz.y + (desk ? 4 : -6);
    const nOp = inS(5) ? ramp(p5, 0.44, 0.48) * (1 - ramp(nGo, 0.6, 1)) : 0;
    notif.style.opacity = String(nOp);
    notif.style.visibility = nOp < 0.01 ? "hidden" : "visible";
    notif.style.transform = `translate(${lerp(nx, kq.x - nw / 2, nGo)}px, ${lerp(ny - (1 - nIn) * 60, kq.y - nh / 2, nGo)}px) scale(${1 - nGo * 0.85})`;
    const tp = ramp(p5, 0.54, 0.62);
    tap.style.opacity = String(inS(5) ? Math.sin(Math.PI * tp) : 0);
    tap.style.transform = `translate(${nx + nw * 0.7}px, ${ny + nh * 0.55}px) scale(${1 - 0.3 * Math.sin(Math.PI * ramp(tp, 0.4, 0.8))})`;

    // the stage fades as it unpins, so nothing is left cut off above the ending
    stage.style.opacity = String(reduced ? (offRaw > 0 ? 0 : 1) : 1 - ramp(offRaw, 0, 0.3));

    // the quick way in, the skip and the progress line
    install.classList.toggle("off", askOut < 0.6 || endBadgesIn);
    skip.classList.toggle("off", askOut < 0.6 || endShown || offRaw > 0.2);
    prog.classList.toggle("on", askOut >= 0.6 && offRaw <= 0 && !endShown);
    progBar.style.transform = `scaleX(${clamp((u - START[1]) / (SUM - START[1]))})`;
  };

  /* ---------- the loop runs while the story is on screen; a scroll elsewhere asks for one frame ---------- */
  let raf = 0, alive = true, storyIn = true;
  const tick = (now: number) => {
    raf = 0;
    if (!alive) return;
    frame(now);
    if (storyIn) raf = requestAnimationFrame(tick);
  };
  const kick = () => {
    if (!raf && alive) raf = requestAnimationFrame(tick);
  };

  const observers: IntersectionObserver[] = [];
  const watch = (el: Element, fn: (on: boolean) => void, opts?: IntersectionObserverInit) => {
    const o = new IntersectionObserver((es) => es.forEach((x) => fn(x.isIntersecting)), opts);
    o.observe(el);
    observers.push(o);
  };
  watch(story, (on) => {
    storyIn = on;
    kick();
  });
  watch(endBadges, (on) => {
    endBadgesIn = on;
    kick();
  });
  watch(end, (on) => {
    endShown = on;
    kick();
  }, { rootMargin: "0px 0px -30% 0px" });
  // the ending fades up as it comes into view
  $$(".end .reveal").forEach((el) => watch(el, (on) => on && el.classList.add("in"), { threshold: 0.15 }));

  const go = (top: number) => scrollTo({ top, behavior: reduced ? "instant" : "smooth" });
  skip.onclick = () => go(endTop - H * 0.06);
  $(".again").onclick = () => go(0);

  const theme = new MutationObserver(() => {
    readColors();
    kick();
  });
  theme.observe(html, { attributes: true, attributeFilter: ["data-theme"] });

  // the guesses play in turn; with reduced motion the markup's end state stays
  let guessTimer = 0;
  if (!reduced) {
    const g = $$(".bubble .g");
    const states = [[0, 0, 0], [1, 0, 0], [2, 1, 0], [2, 2, 1], [2, 2, 1], [2, 2, 1]];
    let i = 0;
    guessTimer = window.setInterval(() => {
      i = (i + 1) % states.length;
      states[i].forEach((v, k) => {
        g[k].classList.toggle("on", v > 0);
        g[k].classList.toggle("x", v > 1);
      });
    }, 850);
  }

  const onResize = () => {
    layout();
    kick();
  };
  const onScroll = () => kick();
  addEventListener("resize", onResize);
  addEventListener("scroll", onScroll, { passive: true });

  readColors();
  const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
  fonts.then(() => {
    if (!alive) return;
    layout();
    root.classList.add("ready");
    kick();
  });
  fetch("/stampstory/world.json")
    .then((r) => r.json() as Promise<Country[]>)
    .then((world) => {
      if (!alive) return;
      shapes = world.map((c) => ({
        c,
        rings: c.rings.map((r) => {
          const a = new Float32Array(r.length * 3);
          r.forEach(([lo, la], i) => a.set(unit(lo, la), i * 3));
          return a;
        }),
        dot: !!c.dot,
        lab: unit(...(c.dot || c.label)),
      }));
      shapeOf = Object.fromEntries(shapes.map((sh) => [sh.c.name, sh]));
      trip = ORDER.map((n) => shapeOf[n].c);
      let prev: number | null = null;
      unwrap = trip.map((c) => {
        let lon = c.label[0];
        if (prev !== null) {
          while (lon - prev > 180) lon -= 360;
          while (lon - prev < -180) lon += 360;
        }
        prev = lon;
        return lon;
      });
      fillPassport(world);
      layout();
      kick();
    })
    .catch(() => {});

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    observers.forEach((o) => o.disconnect());
    theme.disconnect();
    clearInterval(guessTimer);
    removeEventListener("resize", onResize);
    removeEventListener("scroll", onScroll);
  };
}
