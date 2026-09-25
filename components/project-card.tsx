import type { Project } from "@/data/site";
import { fmtMoney } from "@/lib/format";
import { statusDot } from "@/lib/status";
import { Card } from "./card";

/** project card: inset cover, title, description, status chip. The whole card
    is the link, so the arrow is a hint rather than a button. Status lives in
    the chip's dot - no ring, no float. */
export function ProjectCard({ p, delay = 0 }: { p: Project; delay?: number }) {
  const label =
    p.revenueLabel ??
    (p.revenue !== undefined ? `Revenue: ${fmtMoney(p.revenue, true)}/mo` : "Coming soon");

  return (
    <Card delay={delay} href={p.link}>
      {p.cover && (
        <div className="sheen rounded-[14px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.cover}
            alt=""
            className="aspect-[1200/630] w-full rounded-[14px] object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 px-2.5 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-lg">{p.emoji}</span>
          <h3 className="font-display text-lg font-bold">{p.name}</h3>
          {p.link && (
            <span className="ml-auto text-ink/40" aria-hidden>
              ↗
            </span>
          )}
        </div>
        <p className="flex-1 text-sm leading-relaxed text-ink/70">{p.description}</p>
        <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/65 px-2.5 py-1 text-xs font-medium text-ink/70">
          <span className={`h-1.5 w-1.5 rounded-full ${statusDot[p.status]}`} />
          {label}
        </span>
      </div>
    </Card>
  );
}
