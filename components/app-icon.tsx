import type { Project } from "@/data/site";
import { fmtMoney } from "@/lib/format";
import { statusDot } from "@/lib/status";
import { externalProps } from "@/lib/link";
import { Pop } from "./animate";

/** springboard tile: glossy squircle for live apps, dark glass "?" for coming soon */
export function AppIcon({ p, delay = 0 }: { p: Project; delay?: number }) {
  const soon = p.status === "soon";
  const icon = (
    <Pop delay={delay} className="flex flex-col items-center gap-1.5">
      <div
        className={`float hover-glow relative flex h-16 w-16 items-center justify-center rounded-[27%] text-3xl transition-transform duration-200 hover:scale-105 active:scale-95 ${
          soon ? "tile-soon" : "tile-glossy"
        }`}
        style={{ animationDelay: `${-delay * 2.3}s`, animationDuration: "5s" }}
      >
        {!soon && <span className="glow rounded-[27%]" />}
        {!soon && <span className="sheen absolute inset-0 rounded-[27%]" aria-hidden />}
        {soon ? (
          <span className="text-xl text-ink/30">?</span>
        ) : p.icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.icon} alt="" className="h-full w-full rounded-[27%] object-cover" />
        ) : (
          p.emoji
        )}
        <span
          className={`absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full ring-2 ring-black/20 ${statusDot[p.status]}`}
          title={p.status}
        />
      </div>
      <span className="max-w-18 truncate text-xs font-medium">{soon ? "???" : p.name}</span>
      <span className="text-xs tabular-nums text-ink/60">
        {p.status === "live" && p.revenue !== undefined ? fmtMoney(p.revenue) : p.status}
      </span>
    </Pop>
  );
  return p.link ? (
    <a href={p.link} {...externalProps(p.link)} className="block">
      {icon}
    </a>
  ) : (
    icon
  );
}
