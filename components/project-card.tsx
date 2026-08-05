import type { Project } from "@/data/site";
import { fmtMoney } from "@/lib/format";
import { statusDot } from "@/lib/status";
import { Pop } from "./animate";

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
  const live = p.status === "live";
  return (
    <Pop delay={delay} className="h-full">
      <article
        className={`${live ? "neon-border " : ""}glass float hover-glow flex h-full flex-col gap-3 rounded-[22px] p-4 shadow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl`}
        style={{ animationDelay: `${-index * 1.7}s`, animationDuration: `${6 + index}s` }}
      >
        {p.cover ? (
          <div className="sheen rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.cover}
              alt={`${p.name} cover`}
              className="aspect-[1200/630] w-full rounded-xl object-cover"
            />
          </div>
        ) : (
          <div className="tile-soon flex aspect-[1200/630] w-full items-center justify-center rounded-xl">
            <span className="text-4xl text-ink/25">?</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-lg">{p.emoji}</span>
          <h3 className="font-display text-lg font-bold">{p.name}</h3>
          {p.link && (
            <a
              href={p.link}
              aria-label={`Open ${p.name}`}
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-white transition-transform hover:scale-110 active:scale-95"
            >
              ↗
            </a>
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
      </article>
    </Pop>
  );
}
