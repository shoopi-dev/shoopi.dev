import type { Project } from "@/data/site";
import { fmtMoney } from "@/lib/format";
import { statusDot } from "@/lib/status";
import { Card, IconButton } from "./card";

/** jurre.me-style project card: cover, title + arrow, description, revenue pill.
    Floats idle, glows on hover. The neon ring marks live projects only. */
export function ProjectCard({
  p,
  index,
  delay = 0,
}: {
  p: Project;
  index: number;
  delay?: number;
}) {
  return (
    <Card delay={delay} index={index} ring={p.status === "live"}>
      {p.cover && (
        <div className="sheen rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.cover}
            alt={`${p.name} cover`}
            className="aspect-[1200/630] w-full rounded-xl object-cover"
          />
        </div>
      )}
      <div className="flex items-center gap-2">
        <span className="text-lg">{p.emoji}</span>
        <h3 className="font-display text-lg font-bold">{p.name}</h3>
        {p.link && (
          <IconButton href={p.link} label={`Open ${p.name}`} className="ml-auto" />
        )}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-ink/70">{p.description}</p>
      <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3 py-1 text-xs font-semibold">
        <span className={`h-2 w-2 rounded-full ${statusDot[p.status]}`} />
        {p.revenueLabel ?? (
          <>
            Revenue:{" "}
            <span className="tabular-nums">
              {p.revenue !== undefined ? fmtMoney(p.revenue, true) : "???"}
            </span>
          </>
        )}
      </span>
    </Card>
  );
}
