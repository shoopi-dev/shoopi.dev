/*
 * What moves Eureka's landing page (story.tsx): each stage is a tall section with a sticky "pin" the
 * size of the screen, and its progress (0..1) through the scroll drives everything drawn in it.
 * `start(root)` sets it going and returns what stops it again.
 */

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const io = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const out = (t: number) => 1 - Math.pow(1 - t, 3);
const back = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2));
const bump = (p: number, a: number, b: number) => Math.sin(Math.PI * range(p, a, b));
const isPhone = () => matchMedia("(max-width: 760px)").matches;

const SPARK =
  '<svg class="spark" viewBox="0 0 16 16"><path d="M8 2.64C8.44 5.92 10.08 7.56 13.36 8 10.08 8.44 8.44 10.08 8 13.36 7.56 10.08 5.92 8.44 2.64 8 5.92 7.56 7.56 5.92 8 2.64Z"/></svg>';
const BULB =
  '<svg class="bulbsvg" viewBox="0 0 16 16"><circle class="g" cx="8" cy="6.5" r="6.8"/><circle class="b" cx="8" cy="6.5" r="3.9"/><path d="M6.3 11.9H9.7M7 13.8H9"/></svg>';

type El = HTMLElement;
type Stage = { st: El; render: (p: number, t: number) => void; layout?: () => void; still?: number };

export function start(root: El): () => void {
  const $ = <T extends Element = El>(s: string, r: ParentNode = root) => r.querySelector(s) as T;
  const $$ = <T extends Element = El>(s: string, r: ParentNode = root) => [...r.querySelectorAll<T>(s)];
  const svgOf = (el: Element) => el.firstElementChild as SVGElement;

  // an Android phone is offered the waitlist in place of the App Store
  root.classList.toggle("android", /Android/i.test(navigator.userAgent));
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ----- scale each drawn piece into its slot -----
  function fitAll() {
    const ph = isPhone();
    $$(".fit").forEach((f) => {
      const slot = f.parentElement!;
      const w = +((ph && f.dataset.mw) || f.dataset.w!);
      const h = +((ph && f.dataset.mh) || f.dataset.h!);
      const s = Math.min(slot.clientWidth / w, slot.clientHeight / h, +(f.dataset.max || 1));
      f.style.width = w * s + "px";
      f.style.height = h * s + "px";
      const inn = $(".fit-in", f);
      inn.style.width = w + "px";
      inn.style.height = h + "px";
      inn.style.transform = `scale(${s})`;
    });
  }

  // ----- 1. everywhere, then one place -----
  const S1 = ((): Stage => {
    const st = $(".s1"), pin = $(".pin", st), hA = $(".hA", st), hint = $(".hint", st), hB = $(".hB", st), hglow = $(".hglow", st);
    const fit = $(".fit", st), home = $(".home", st), cI = $(".c-i", st), cT = $(".c-t", st);
    const badges = $(".bdg", st), wait = st.querySelector<El>(".waitlist");
    const rows = $$(".row", st).map((r) => ({ el: r, id: r.dataset.id!, sign: $(".sign", r), ai: $(".ai", r), ttl: $(".ttl span", r) }));
    const frags = $$(".frag", st);
    type Item = { el: El; L: number; id: string; i: number; x: number; y: number; r: number; w: number; h: number };
    let plan: { items: Item[]; first: Record<string, number>; second: Record<string, number>; ph: boolean; dx: number; dy: number } | null = null;

    function layout() {
      const ph = isPhone();
      const active = frags.filter((f) => (ph ? f.dataset.mo != null : true));
      frags.forEach((f) => (f.style.display = active.includes(f) ? "" : "none"));
      active.sort((a, b) => (ph ? +a.dataset.mo! - +b.dataset.mo! : +a.dataset.o! - +b.dataset.o!));
      const n = active.length;
      const first: Record<string, number> = {}, second: Record<string, number> = {};
      const items = active.map((f, i) => {
        const L = 0.36 + (i * 0.4) / (n - 1);
        const id = f.dataset.row!;
        if (first[id] == null) first[id] = L;
        else if (second[id] == null) second[id] = L;
        const card = f.firstElementChild as El;
        return {
          el: f, L, id, i,
          x: +(ph ? f.dataset.mx! : f.dataset.x!), y: +(ph ? f.dataset.my! : f.dataset.y!), r: +f.dataset.r!,
          w: card.offsetWidth, h: card.offsetHeight,
        };
      });
      // how far the phone stands from the middle of the screen, so it can come in there first
      fit.style.transform = "none";
      const pr = pin.getBoundingClientRect(), fr = fit.getBoundingClientRect();
      const dx = pr.left + pr.width / 2 - (fr.left + fr.width / 2);
      const dy = ph ? pr.top + pr.height / 2 + 20 - (fr.top + fr.height / 2) : 0;
      plan = { items, first, second, ph, dx, dy };
    }

    function render(p: number, t: number) {
      if (!plan) return;
      const { items, first, second, ph } = plan;
      const a = io(range(p, 0.03, 0.18));
      hA.style.opacity = String(1 - a);
      hA.style.transform = `translateY(${-50 * a}px) scale(${1 - 0.06 * a})`;
      hA.classList.toggle("gone", a > 0.5);
      hglow.style.opacity = String(1 - range(p, 0.08, 0.26));
      hint.style.opacity = String(1 - range(p, 0, 0.04));
      // the phone comes in where the words were, once they have gone
      const e = out(range(p, 0.17, 0.36));
      const mid = 1 - io(range(p, 0.7, 0.86));
      fit.style.opacity = String(e);
      fit.style.transform = `translate(${plan.dx * mid}px, ${plan.dy * mid + (1 - e) * 110}px) scale(${0.92 + 0.08 * e})`;
      const b = out(range(p, 0.74, 0.88));
      hB.style.opacity = String(b);
      hB.style.transform = `translateY(${(1 - b) * 26}px)`;
      const bb = out(range(p, 0.8, 0.94));
      badges.style.opacity = String(bb);
      badges.style.transform = `translateY(${(1 - bb) * 12}px)`;
      if (wait) wait.style.opacity = String(bb);

      // rows land as their first scrap does; a second turns the new idea's bulb into AI's spark
      let ideas = 0;
      for (const r of rows) {
        const L = first[r.id];
        if (L == null) {
          r.el.style.opacity = "0";
          continue;
        }
        if (p >= L) ideas++;
        const ra = out(range(p, L - 0.012, L + 0.03));
        r.el.style.opacity = String(ra);
        r.el.style.transform = `translateY(${(1 - ra) * 10}px)`;
        const L2 = second[r.id];
        const changed = L2 != null && p >= L2;
        const kind = changed ? "spark" : "bulb";
        if (r.sign.dataset.k !== kind) {
          r.sign.innerHTML = changed ? SPARK : BULB;
          r.sign.dataset.k = kind;
          r.sign.classList.toggle("bulb", !changed);
          r.ai.textContent = (changed ? r.ai.dataset.ch : r.ai.dataset.new) ?? "";
        }
        const land = changed ? L2 : L;
        const pop = back(range(p, land, land + 0.045));
        svgOf(r.sign).style.transform = `scale(${0.4 + 0.6 * pop})`;
        svgOf(r.sign).style.opacity = String(range(p, land - 0.002, land + 0.012));
        const rg = range(p, land, land + 0.06);
        r.sign.style.setProperty("--ring-o", String(rg > 0 && rg < 1 ? (1 - rg) * 0.8 : 0));
        r.sign.style.setProperty("--ring-s", String(0.5 + rg * 1.4));
        r.el.style.setProperty("--hl", (range(p, land + 0.008, land + 0.06) * 100).toFixed(1) + "%");
        const w = range(p, land + 0.03, land + 0.075);
        r.ai.style.opacity = w > 0 ? "1" : "0";
        r.ai.style.clipPath = `inset(0 ${(100 - w * 100).toFixed(1)}% 0 0)`;
      }
      const thoughts = items.filter((it) => p >= it.L).length;
      cI.textContent = ideas + (ideas === 1 ? " idea" : " ideas");
      cT.textContent = thoughts + (thoughts === 1 ? " thought" : " thoughts");
      home.classList.toggle("has", ideas > 0);

      // the scraps drift where they lie, then fly into their idea's row
      const pr = pin.getBoundingClientRect();
      const targets: Record<string, { x: number; y: number; h: number }> = {};
      for (const r of rows) {
        const s = r.ttl.getBoundingClientRect();
        targets[r.id] = { x: s.left + Math.min(s.width, 160) / 2 - pr.left, y: s.top + s.height / 2 - pr.top, h: s.height };
      }
      const s0 = ph ? 0.66 : 1;
      for (const it of items) {
        const tt = range(p, it.L - 0.2, it.L);
        const k = io(tt);
        const tg = targets[it.id];
        const sx = it.x * pr.width, sy = it.y * pr.height;
        const free = 1 - tt;
        const dx = Math.sin(t / 2600 + it.i * 1.7) * 8 * free;
        const dy = Math.cos(t / 3100 + it.i * 1.1) * 10 * free;
        const dr = Math.sin(t / 3700 + it.i) * 1.8 * free;
        const cx = lerp(sx, tg.x, k) + dx;
        const cy = lerp(sy, tg.y, k) - Math.sin(Math.PI * k) * (ph ? 40 : 80) + dy;
        const sEnd = clamp((tg.h * 1.5) / it.h, 0.1, 0.5);
        const sc = lerp(s0, sEnd, k) * (1 + 0.05 * bump(tt, 0, 0.25));
        const rot = lerp(it.r, 0, k) + dr;
        it.el.style.transform = `translate(${(cx - it.w / 2).toFixed(1)}px, ${(cy - it.h / 2).toFixed(1)}px) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
        it.el.style.opacity = String(tt >= 1 ? 0 : 1 - range(tt, 0.72, 1));
      }
    }
    return { st, layout, render };
  })();

  // ----- 2. ideas grow up -----
  const S2 = ((): Stage => {
    const st = $(".s2");
    const scroll = $(".pgscroll", st), pg = $(".pg", st), facts = $(".pg-facts .n", st);
    const lineW = $(".ailine .w", st), lineD = $(".ailine .d", st), sparkW = $<SVGElement>(".ailine .w svg", st);
    const typed = $(".capsule .typed", st), hint = $(".capsule .ph2", st);
    const friends = $(".friends", st), recap = $(".recap", st), qwrap = $(".qwrap", st), q1 = $(".q1", st);
    const fTx = $(".tx", friends), qTx = $(".tx", q1), rTx = $(".tx", recap), rBx = $(".bx", recap);
    const logs = $$(".log .e", st), allN = $(".log .all .n", st);
    const beats = $$(".beats li", st);
    const said = $$(".beats q", st).map((q) => q.textContent ?? "");
    const S = [0.06, 0.37, 0.68];
    const caret = '<span class="caret"></span>';

    const typeIn = (el: El, k: number) => {
      const full = el.dataset.full ?? "";
      const n = Math.round(full.length * k);
      el.innerHTML = full.slice(0, n) + (k > 0 && k < 1 ? caret : "");
    };
    const unfold = (el: El, k: number) => {
      el.style.height = k >= 1 ? "auto" : el.scrollHeight * out(k) + "px";
      el.style.opacity = String(out(k));
    };

    function render(p: number, t: number) {
      // which thought is being said, typed into the bar
      let typing: { k: number; f: number } | null = null, sent = 0;
      S.forEach((s, k) => {
        if (p >= s && p < s + 0.085) typing = { k, f: range(p, s, s + 0.075) };
        if (p >= s + 0.085) sent = k + 1;
      });
      const now = typing as { k: number; f: number } | null;
      if (now) {
        typed.textContent = said[now.k].slice(0, Math.round(said[now.k].length * now.f));
        typed.insertAdjacentHTML("beforeend", caret);
        hint.style.display = "none";
      } else {
        typed.textContent = "";
        hint.style.display = "";
      }
      facts.textContent = String(3 + sent);
      allN.textContent = String(3 + sent);

      // the line over the page: working, then what it made
      let working = false, made = false;
      S.forEach((s) => {
        if (p >= s + 0.085 && p < s + 0.13) working = true;
        if (p >= s + 0.13) made = true;
      });
      lineW.classList.toggle("on", working);
      lineD.classList.toggle("on", made && !working);
      sparkW.style.transform = `rotate(${(t / 6) % 360}deg) scale(${1 + 0.18 * Math.sin(t / 160)})`;

      // the changes, one at a time; only the latest is AI's violet
      const latest = S.reduce((acc, s, k) => (p >= s + 0.13 ? k : acc), -1);
      unfold(friends, range(p, S[0] + 0.13, S[0] + 0.16));
      typeIn(fTx, range(p, S[0] + 0.15, S[0] + 0.24));
      friends.classList.toggle("ai", latest === 0);
      rBx.style.setProperty("--fill", String(back(range(p, S[1] + 0.13, S[1] + 0.16))));
      rBx.style.setProperty("--tick", String(range(p, S[1] + 0.15, S[1] + 0.18)));
      rTx.style.setProperty("--strike", String(io(range(p, S[1] + 0.18, S[1] + 0.22))));
      recap.classList.toggle("ai", latest === 1);
      recap.classList.toggle("done-l", latest > 1);
      unfold(qwrap, range(p, S[2] + 0.13, S[2] + 0.17));
      typeIn(qTx, range(p, S[2] + 0.16, S[2] + 0.26));
      q1.classList.toggle("ai", latest === 2);

      // what you said: the newest three, the oldest folding away as one comes
      const f = S.reduce((acc, s) => acc + range(p, s + 0.085, s + 0.125), 0);
      logs.forEach((el, i) => {
        const v = clamp(f + 3 - i) * clamp(i - f + 1);
        el.style.height = v >= 1 ? "auto" : el.scrollHeight * out(v) + "px";
        el.style.opacity = String(out(v));
      });

      // keep the change in sight above the bar
      const room = 874 - 104 - 128;
      scroll.style.transform = `translateY(${-Math.max(0, pg.offsetHeight - room)}px)`;

      beats.forEach((li, i) => {
        const on = now ? now.k === i : i === Math.max(0, latest);
        li.classList.toggle("on", on);
        li.classList.toggle("past", !on && i < (now ? now.k : latest + 1));
      });
    }
    return { st, render };
  })();

  // ----- 3. just say it -----
  const S3 = ((): Stage => {
    const st = $(".s3");
    const listen = $(".listen", st), phd = $(".phd", st), tm = $(".lhead .tm", st);
    const filed = $(".filed", st), bar = $(".bar3", st), tm2 = $(".tm2", st), note = $(".note3", st), g3 = $(".g3", st);
    const sp = $<SVGElement>(".lead svg", filed);
    const ws = $$(".words .w", st);
    const bars = $$(".level b", st);
    const R0 = 0.1, R1 = 0.7;

    function render(p: number, t: number) {
      const rec = p >= R0 && p < R1;
      bar.classList.toggle("rec", rec);
      bar.classList.toggle("calls", p < R0);
      const nk = range(p, R0 - 0.05, R0 - 0.005);
      note.style.opacity = String(1 - nk);
      note.style.transform = `translateY(${-10 * nk}px)`;
      const sec = Math.floor(range(p, R0, R1) * 9);
      tm.textContent = tm2.textContent = "0:0" + sec;
      // the card rises out of the bar, and gives way to the filing card once stopped
      const up = out(range(p, R0 - 0.02, R0 + 0.06));
      const down = io(range(p, R1, R1 + 0.06));
      listen.style.opacity = String(up * (1 - down));
      listen.style.transform = `translateY(${(1 - up) * 40 + down * 30}px) scale(${(0.9 + 0.1 * up) * (1 - 0.06 * down)})`;
      // the light gathers round the card while it listens, and rests low by the bar before and after
      g3.style.top = `${lerp(76, 44, up * (1 - down))}%`;
      g3.style.left = `${lerp(78, 50, up * (1 - down))}%`;
      g3.style.width = `${lerp(80, 125, up * (1 - down))}%`;
      const fin = out(range(p, R1 + 0.03, R1 + 0.09));
      filed.style.opacity = String(fin);
      filed.style.transform = `translateY(${(1 - fin) * 24}px)`;
      filed.classList.toggle("done", p >= R1 + 0.15);
      sp.style.rotate = p < R1 + 0.15 ? `${(t / 5) % 360}deg` : "0deg";

      const n = ws.length;
      ws.forEach((w, i) => {
        const at = R0 + 0.05 + (i * (R1 - R0 - 0.1)) / n;
        const k = range(p, at, at + 0.012);
        w.style.opacity = String(k);
        w.style.setProperty("--g", (k * (1 - range(p, at + 0.012, at + 0.09))).toFixed(3));
      });
      phd.style.opacity = p < R0 + 0.05 ? "1" : "0";

      // the level moves with the voice while recording
      bars.forEach((b, i) => {
        const v = rec ? 0.25 + 0.75 * Math.abs(Math.sin(t / 140 + i * 0.9) * Math.sin(t / 410 + i * 0.37)) : 0.15;
        b.style.height = (4 + v * 22).toFixed(1) + "px";
      });
    }
    // with less motion: the moment it hears you, every word in
    return { st, render, still: 0.69 };
  })();

  // ----- 4. old notes -----
  const S4 = ((): Stage => {
    const st = $(".s4"), pin = $(".pin", st);
    const chat = $(".chat", st), bubs = $$(".chat .bub", st), flyers = $$(".flyer", st), more = $(".more", st);
    const rows = $$(".nbk .row", st).map((r) => ({ el: r, i: +r.dataset.i!, sign: $(".sign", r), ai: $(".ai", r), ttl: $(".ttl span", r) }));
    const icard = $(".icard", st), icN = $(".icard .tb .n", st), icSpark = $<SVGElement>(".icard .lead svg", st);
    rows.forEach((r) => (r.sign.innerHTML = BULB));
    const T = (i: number) => 0.2 + i * 0.065;

    function render(p: number, t: number) {
      const shown = rows.filter((r) => r.el.offsetParent !== null);
      const pr = pin.getBoundingClientRect();
      bubs.forEach((b, i) => {
        const fl = flyers[i];
        const row = rows[i];
        const visible = b.offsetParent !== null && row.el.offsetParent !== null;
        const tt = range(p, T(i) - 0.14, T(i));
        if (!visible || tt <= 0) {
          fl.style.opacity = "0";
          b.style.opacity = "";
          return;
        }
        b.style.opacity = String(1 - 0.7 * range(tt, 0, 0.3));
        const a = b.getBoundingClientRect();
        const z = row.ttl.getBoundingClientRect();
        fl.style.width = b.offsetWidth + "px";
        const w = b.offsetWidth, h = b.offsetHeight;
        const k = io(tt);
        const cx = lerp(a.left + a.width / 2, z.left + Math.min(z.width, 150) / 2, k) - pr.left;
        const cy = lerp(a.top + a.height / 2, z.top + z.height / 2, k) - pr.top - Math.sin(Math.PI * k) * 40;
        const sc = lerp(a.width / w, (z.height * 1.4) / h, k);
        fl.style.transform = `translate(${cx - w / 2}px, ${cy - h / 2}px) scale(${sc})`;
        fl.style.opacity = String(tt >= 1 ? 0 : 1 - range(tt, 0.7, 1));
      });
      rows.forEach((r) => {
        const L = T(r.i);
        const ra = out(range(p, L - 0.015, L + 0.03));
        r.el.style.opacity = String(ra);
        r.el.style.transform = `translateY(${(1 - ra) * 10}px)`;
        const pop = back(range(p, L, L + 0.05));
        const s = svgOf(r.sign);
        s.style.transform = `scale(${0.3 + 0.7 * pop})`;
        s.style.opacity = String(range(p, L - 0.002, L + 0.015));
        const rg = range(p, L, L + 0.06);
        r.sign.style.setProperty("--ring-o", String(rg > 0 && rg < 1 ? (1 - rg) * 0.8 : 0));
        r.sign.style.setProperty("--ring-s", String(0.5 + rg * 1.4));
        r.el.style.setProperty("--hl", (range(p, L + 0.01, L + 0.06) * 100).toFixed(1) + "%");
        const w = range(p, L + 0.03, L + 0.07);
        r.ai.style.opacity = w > 0 ? "1" : "0";
        r.ai.style.clipPath = `inset(0 ${(100 - w * 100).toFixed(1)}% 0 0)`;
      });
      more.textContent = `and ${13 - shown.length} more ideas`;
      more.style.opacity = String(out(range(p, T(6) + 0.02, T(6) + 0.08)));
      const c = range(p, 0.66, 0.84);
      chat.style.opacity = String(1 - 0.35 * c);
      chat.style.transform = `scale(${1 - 0.03 * c})`;

      // the import's card: sorting, then a page at a time, then done
      let st4 = "a", fill = 0.33 * out(range(p, 0.04, 0.3));
      if (p >= 0.3) {
        st4 = "b";
        const k = range(p, 0.3, 0.8);
        icN.textContent = String(Math.max(1, Math.ceil(k * 13)));
        fill = 0.33 + 0.67 * k;
      }
      if (p >= 0.84) st4 = "c";
      icard.dataset.st = st4;
      icard.style.setProperty("--fill", fill.toFixed(3));
      const spk = back(range(p, 0.84, 0.9));
      icSpark.style.transform = st4 === "c" ? `scale(${0.3 + 0.7 * spk})` : `rotate(${(t / 5) % 360}deg) scale(${1 + 0.15 * Math.sin(t / 170)})`;
    }
    return { st, render };
  })();

  const stages = [S1, S2, S3, S4];
  const progress = (el: El) => {
    const r = el.getBoundingClientRect();
    const total = el.offsetHeight - innerHeight;
    return total > 0 ? clamp(-r.top / total) : 1;
  };

  // ----- the quick way in: shown after a moment, away while the page's own badges are in sight -----
  const bar = $(".getbar"), top = $(".gettop"), ownS1 = $(".s1 .bdg"), ownEnd = $(".end-badges");
  let barReady = false;
  const inSight = (el: El, pad = 0) => {
    const r = el.getBoundingClientRect();
    return r.height > 0 && r.top < innerHeight - pad && r.bottom > pad;
  };
  // what fades up at the end is checked here too, since an observer can miss a jump straight to the bottom
  const reveals = $$(".reveal");
  function updateBar() {
    for (const el of reveals) if (!el.classList.contains("in") && inSight(el, 40)) el.classList.add("in");
    const own = (progress(S1.st) >= 0.76 && inSight(ownS1)) || inSight(ownEnd, 40);
    const show = barReady && !own;
    bar.classList.toggle("show", show);
    top.classList.toggle("show", show);
  }

  const layoutAll = () => {
    fitAll();
    S1.layout!();
  };
  const renderStill = () => stages.forEach((s) => s.render(s.still ?? 1, 0));

  let raf = 0, alive = true;
  const timers: number[] = [];
  function frame(now: number) {
    updateBar();
    for (const s of stages) {
      const r = s.st.getBoundingClientRect();
      if (r.bottom < -40 || r.top > innerHeight + 40) continue;
      s.render(progress(s.st), now);
    }
    raf = requestAnimationFrame(frame);
  }
  const onResize = () => {
    layoutAll();
    updateBar();
    if (still) renderStill();
  };

  const ready = Promise.all([
    document.fonts.ready,
    new Promise<void>((r) => (document.readyState === "complete" ? r() : addEventListener("load", () => r(), { once: true }))),
  ]);
  ready.then(() => {
    if (!alive) return;
    if (still) root.classList.add("still");
    layoutAll();
    root.classList.add("ready");
    // the quick way in slides up after a moment
    timers.push(
      window.setTimeout(() => {
        barReady = true;
        updateBar();
      }, still ? 0 : 1400),
    );
    if (still) renderStill();
    else raf = requestAnimationFrame(frame);
    // late layout (an image, a font) can change sizes a little
    timers.push(window.setTimeout(layoutAll, 700));
  });
  addEventListener("scroll", updateBar, { passive: true });
  addEventListener("resize", onResize);

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    timers.forEach(clearTimeout);
    removeEventListener("scroll", updateBar);
    removeEventListener("resize", onResize);
  };
}
