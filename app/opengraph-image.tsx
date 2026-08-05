import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";

export const alt = "Itay Blokh (sho0pi) - $1M from apps before 30";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const avatar = await readFile(join(process.cwd(), "public/avatar.png"));
  const avatarSrc = `data:image/png;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
          padding: 80,
          background:
            "linear-gradient(135deg, #f3eefb 0%, #ddd0f7 35%, #c5e6fb 70%, #e6d5fa 100%)",
          color: "#16121f",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={avatarSrc} width={96} height={96} style={{ borderRadius: 26 }} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 700 }}>{site.fullName}</span>
            <span style={{ fontSize: 26, color: "#6b6479" }}>@{site.handle} · shoopi.dev</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 92, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05 }}>
            $1,000,000 before 30.
          </span>
          <span style={{ fontSize: 32, color: "#6b6479" }}>
            Building apps in public - every dollar, every failure.
          </span>
        </div>

        {/* progress grid motif */}
        <div style={{ display: "flex", gap: 8 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              style={{
                width: 34,
                height: 12,
                borderRadius: 4,
                background: i === 0 ? "#9333ea" : "rgba(22,18,31,0.12)",
              }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
