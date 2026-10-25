import type { ReactNode } from "react";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";
import { fmtMoney, dayOfChallenge } from "@/lib/format";
import { getEarnings } from "@/lib/earnings";
import { home } from "@/lib/seo";

/* The share image, as the home page's first screen: who, the headline, the goal grid and the
   springboard's tiles. It reads the same live figures and app list as the page, so it redraws as
   they change (with the earnings fetch, hourly), and the home page points at it with a version
   built from those figures (shareVersion in lib/seo.ts), so X and LinkedIn fetch the new one
   instead of a stale copy. Satori draws it: flexbox only, no blur, every multi-child box flex.
   Keep the bottom-left clear: X lays the page title over it. */

export const alt = home.imageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
/* hourly, like the earnings it reads, and on its own: the day count must move even if that fetch fails */
export const revalidate = 3600;

const INK = "#111b28";
const MASK = "#db40ff";
const MASK_SOFT = [250, 232, 255];
const MASK_RGB = [219, 64, 255];

/* every read is scoped to a fixed folder: a bare join(cwd, path) makes the build trace the whole
   project into this function */
const font = (name: string) => readFile(join(process.cwd(), "assets", "fonts", name));
const image = async (path: string) => {
  const data = await readFile(join(process.cwd(), "public", path));
  return `data:image/${path.endsWith(".jpg") ? "jpeg" : "png"};base64,${data.toString("base64")}`;
};

/* the goal grid's filling square, as GoalGrid: any money shows at least 15%, and its colour
   deepens from mask-soft toward the full-square violet (color-mix by hand: Satori has none) */
function fillColor(part: number) {
  const t = 0.5 + 0.5 * part;
  const [r, g, b] = MASK_SOFT.map((c, i) => Math.round(c + (MASK_RGB[i] - c) * t));
  return `rgb(${r}, ${g}, ${b})`;
}

export default async function OpengraphImage() {
  const [bold, mono, monoSemi, monoBold, earnings] = await Promise.all([
    font("BricolageGrotesque-Bold.ttf"),
    font("JetBrainsMono-Medium.ttf"),
    font("JetBrainsMono-SemiBold.ttf"),
    font("JetBrainsMono-Bold.ttf"),
    getEarnings(),
  ]);
  // 2 across up to two apps, 3 up to seven, then 4: twelve tiles is all the image holds
  const apps = site.apps.filter((a) => a.status !== "soon" && a.icon).slice(0, 10);
  const [avatar, gaia, bee, ...icons] = await Promise.all([
    image("avatar.jpg"),
    image("icons/gaia.png"),
    image("icons/babees.png"),
    ...apps.map((a) => image(a.icon!)),
  ]);

  const square = site.goal / 100;
  const full = Math.min(100, Math.floor(earnings.total / square));
  const part = full < 100 ? earnings.total / square - full : 0;
  const withCents = (n: number) => n < 100 || Math.round(n * 100) % 100 !== 0;
  const day = dayOfChallenge(site.startDate);

  // the apps, the next one's slot and the Also folder: four fit 2x2 with badges; more go 3 or 4 across, smaller
  const tiles = apps.length + 2;
  const many = tiles > 4;
  const T = tiles <= 4 ? 132 : tiles <= 9 ? 96 : 74; // tile size
  const radius = Math.round(T * 0.235);
  const mini = Math.round(T * 0.3);
  const tileShadow = "0 20px 40px -14px rgba(17,27,40,0.5)";

  const label = (text: string, soft = false) => (
    <div style={{ display: "flex", fontSize: T < 90 ? 13 : many ? 16 : 19, fontWeight: 500, color: soft ? "rgba(17,27,40,0.45)" : INK }}>
      {text}
    </div>
  );
  const badge = (text: string, live: boolean) =>
    many ? null : (
      <div
        style={{
          display: "flex",
          borderRadius: 999,
          padding: "3px 12px",
          fontSize: 16,
          fontWeight: 600,
          background: live ? "#e0f6e3" : "#e8ecf2",
          color: live ? "#007031" : "#525c69",
        }}
      >
        {text}
      </div>
    );
  const app = (key: string, tile: ReactNode, name: ReactNode, b: ReactNode) => (
    <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      {tile}
      {name}
      {b}
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          gap: 56,
          padding: "60px 70px",
          color: INK,
          fontFamily: "JetBrains Mono",
          // the aurora, as washes: Satori has no blur
          backgroundColor: "#f8fafd",
          backgroundImage: [
            "radial-gradient(520px 420px at 8% 12%, rgba(219,64,255,0.20), rgba(219,64,255,0) 70%)",
            "radial-gradient(620px 520px at 92% 40%, rgba(0,148,255,0.24), rgba(0,148,255,0) 70%)",
            "radial-gradient(520px 360px at 40% 110%, rgba(236,89,104,0.12), rgba(236,89,104,0) 70%)",
            "linear-gradient(160deg, #f8fafd 0%, #eef5ff 55%, #fbf0ff 100%)",
          ].join(", "),
        }}
      >
        {/* left: who, the headline, the goal */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={avatar} width={76} height={76} style={{ borderRadius: 22, objectFit: "cover" }} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontFamily: "Bricolage Grotesque", fontSize: 34, fontWeight: 700 }}>
                {site.fullName}
              </div>
              <div style={{ display: "flex", fontSize: 20, color: "rgba(17,27,40,0.6)" }}>@sho0pi · shoopi.dev</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Bricolage Grotesque",
              fontSize: 50,
              fontWeight: 700,
              letterSpacing: -1.6,
              lineHeight: 1.15,
            }}
          >
            <div style={{ display: "flex", color: "rgba(17,27,40,0.55)" }}>Follow my journey of making</div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  padding: "0 6px",
                  borderRadius: 3,
                  backgroundImage: "linear-gradient(180deg, rgba(249,219,173,0) 52%, #f9dbad 52%)",
                }}
              >
                {`${fmtMoney(site.goal)}/mo`}
              </div>
              <div style={{ display: "flex" }}>{" while I sleep,"}</div>
            </div>
            <div style={{ display: "flex" }}>before 30.</div>
          </div>

          {/* the goal, as the page's widget */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              padding: "22px 24px",
              borderRadius: 28,
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.55))",
              border: "1.5px solid rgba(255,255,255,0.9)",
              boxShadow: "0 18px 50px rgba(17,27,40,0.12)",
            }}
          >
            {/* the figures sit up here, not under the grid: X lays the page title over the bottom-left */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div style={{ display: "flex", fontSize: 15, fontWeight: 600, letterSpacing: 0.5, color: "rgba(17,27,40,0.7)" }}>
                {`GOAL · EACH SQUARE = ${fmtMoney(square)}/MO`}
              </div>
              <div style={{ display: "flex", fontSize: 17, color: "rgba(17,27,40,0.6)" }}>
                <div style={{ display: "flex", fontWeight: 700, color: INK }}>
                  {fmtMoney(earnings.total, withCents(earnings.total))}
                </div>
                {`/mo · day ${day}`}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {Array.from({ length: 5 }, (_, r) => (
                <div key={r} style={{ display: "flex", gap: 5 }}>
                  {Array.from({ length: 20 }, (_, c) => {
                    const i = r * 20 + c;
                    return (
                      <div
                        key={c}
                        style={{
                          display: "flex",
                          position: "relative",
                          width: 22,
                          height: 22,
                          borderRadius: 4,
                          overflow: "hidden",
                          background: i < full ? MASK : "#e8ecf2",
                          border: i === full ? `2.5px solid ${MASK}` : "none",
                        }}
                      >
                        {i === full && part > 0 && (
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              bottom: 0,
                              height: `${15 + 85 * part}%`,
                              background: fillColor(part),
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right: the springboard's tiles */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: 360,
            flexShrink: 0,
            gap: tiles <= 4 ? "30px 44px" : tiles <= 9 ? "18px 22px" : "14px 14px",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {apps.map((a, i) =>
            app(
              a.name,
              <img src={icons[i]} width={T} height={T} style={{ borderRadius: radius, boxShadow: tileShadow }} alt="" />,
              label(a.name),
              badge("Available now", true),
            ),
          )}
          {app(
            "soon",
            <div
              style={{
                display: "flex",
                width: T,
                height: T,
                borderRadius: radius,
                alignItems: "center",
                justifyContent: "center",
                fontSize: Math.round(T / 3),
                color: "rgba(17,27,40,0.3)",
                backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.85), rgba(255,255,255,0.55))",
                boxShadow: tileShadow,
              }}
            >
              ?
            </div>,
            label("???", true),
            badge("Coming soon", false),
          )}
          {app(
            "also",
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: T,
                height: T,
                borderRadius: radius,
                padding: `${Math.round(T * 0.13)}px ${Math.round(T * 0.12)}px`,
                gap: Math.round(T * 0.09),
                backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))",
                boxShadow: tileShadow,
              }}
            >
              <img src={gaia} width={mini} height={mini} style={{ borderRadius: Math.round(mini * 0.27), background: "#fff" }} alt="" />
              <div
                style={{
                  display: "flex",
                  width: mini,
                  height: mini,
                  borderRadius: Math.round(mini * 0.27),
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#0078d0",
                  color: "#fff",
                  fontSize: Math.round(mini * 0.42),
                  fontWeight: 700,
                }}
              >
                {"<>"}
              </div>
              <img src={bee} width={mini} height={mini} style={{ borderRadius: Math.round(mini * 0.27), background: "#fff" }} alt="" />
            </div>,
            label("Also"),
            badge("Side projects", false),
          )}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage Grotesque", data: bold, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
        { name: "JetBrains Mono", data: monoSemi, weight: 600, style: "normal" },
        { name: "JetBrains Mono", data: monoBold, weight: 700, style: "normal" },
      ],
    },
  );
}
